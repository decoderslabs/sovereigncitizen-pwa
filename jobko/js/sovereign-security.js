(function () {
  "use strict";

  var NS = "SovSec";

  function bufferToBase64(buf) {
    var bytes = new Uint8Array(buf);
    var binary = "";
    for (var i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function base64ToBuffer(b64) {
    var binary = atob(b64);
    var len = binary.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function getSessionKeyMaterial() {
    // ephemeral passphrase per session; regenerated each load to avoid at-rest key
    var keyHex = sessionStorage.getItem(NS + ":k");
    if (!keyHex) {
      var rand = new Uint8Array(32);
      crypto.getRandomValues(rand);
      keyHex = Array.from(rand).map(function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
      sessionStorage.setItem(NS + ":k", keyHex);
    }
    var raw = new Uint8Array(keyHex.match(/.{1,2}/g).map(function (h) { return parseInt(h, 16); }));
    return crypto.subtle.importKey("raw", raw, { name: "PBKDF2" }, false, ["deriveKey"]);
  }

  function deriveAesKey(salt) {
    return getSessionKeyMaterial().then(function (km) {
      return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
        km,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    });
  }

  function encryptObject(storageKey, obj) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var salt = crypto.getRandomValues(new Uint8Array(16));
    return deriveAesKey(salt).then(function (aesKey) {
      var plaintext = new TextEncoder().encode(JSON.stringify(obj));
      return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, aesKey, plaintext).then(function (cipher) {
        var payload = {
          iv: bufferToBase64(iv),
          salt: bufferToBase64(salt),
          cipher: bufferToBase64(cipher)
        };
        localStorage.setItem(storageKey, JSON.stringify(payload));
        return true;
      });
    });
  }

  function decryptObject(storageKey) {
    var raw = localStorage.getItem(storageKey);
    if (!raw) return Promise.resolve(null);
    try {
      var payload = JSON.parse(raw);
      var iv = new Uint8Array(base64ToBuffer(payload.iv));
      var salt = new Uint8Array(base64ToBuffer(payload.salt));
      var cipher = base64ToBuffer(payload.cipher);
      return deriveAesKey(salt).then(function (aesKey) {
        return crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, aesKey, cipher).then(function (plain) {
          var txt = new TextDecoder().decode(plain);
          return JSON.parse(txt);
        }).catch(function () { return null; });
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  function clear(storageKey) {
    localStorage.removeItem(storageKey);
  }

  window.SovereignSecurity = {
    saveEncrypted: encryptObject,
    loadDecrypted: decryptObject,
    clear: clear
  };
})();


