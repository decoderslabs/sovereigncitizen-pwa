(function () {
  "use strict";

  var LANGUAGE_KEY = "sovereign_lang";
  var currentLang = localStorage.getItem(LANGUAGE_KEY) || "en";

  var dict = {
    en: {
      sc_title: "SovereignCitizen",
      pan_title: "PAN Application (Form 49A / Instant e-PAN)",
      passport_title: "Passport Application Preparation (Normal Scheme)",
      aadhaar_number: "Aadhaar Number",
      full_name_aadhaar: "Full name (as per Aadhaar)",
      dob: "Date of Birth",
      residential_address: "Residential Address",
      email: "Communication Email ID",
      application_type: "Application Type",
      application_type_epan: "Instant e-PAN (FREE)",
      application_type_physical: "Physical PAN (fee approx. ₹107)",
      declaration_multi_pan: "I declare that I do not hold any other PAN.",
      save_continue: "Save & Continue",
      generate_output: "Generate Output",
      go_official_portal: "Go to official portal",
      cost_section: "Official Cost",
      cost_free: "₹0 (Instant e-PAN)",
      cost_physical_pan: "Approx. ₹107 (Physical PAN)",
      tooltip_aadhaar: "Mandatory for e-KYC and Instant e-PAN generation.",
      tooltip_fullname: "Must match your name exactly as per your Aadhaar card to avoid application rejection and unnecessary charges.",
      tooltip_dob: "If applying for Instant e-PAN, ensure you are not a minor.",
      tooltip_address: "Use the address reflected on your Proof of Address (PoA). Utility bills should be recent (less than 3 months old).",
      tooltip_email: "Your e-PAN (the soft copy) will be sent to this email address within 48 hours.",
      tooltip_app_type: "Instant e-PAN is FREE and quick but only provides a soft copy. Physical Card requires a nominal fee and dispatch.",
      tooltip_multi_pan: "Holding multiple PANs is strictly illegal and can result in heavy penalties.",
      rpo: "Regional Passport Office (RPO)",
      is_minor: "Is Applicant a Minor?",
      family_details: "Applicant Family Details",
      present_address_proof: "Present Address Proof",
      fee_reminder: "Passport Fee Reminder",
      appointment_guide: "Appointment Scheduling Guide",
      tip_minor: "If Minor, Annexure D is MANDATORY. The fee is lower, and validity is shorter (5 years or till age 18).",
      tip_rpo: "Select the RPO based on your current residential address. This cannot be changed later.",
      tip_present_address: "Gather at least two proofs of address (e.g., Water Bill + Bank Passbook) that are current and reflect the selected RPO jurisdiction.",
      cost_passport_normal: "₹1,500 (Normal, 36 pages)",
      tip_fee_pay_gateway: "Pay ONLY on the official MEA Passport Seva Portal gateway to secure your appointment. Do not pay any agent a markup.",
      tip_appointment: "After completing the form and paying online, select the nearest PSK/POPSK and book your mandatory appointment.",
      clear_sensitive: "Clear Sensitive Data"
    },
    hi: {
      sc_title: "SovereignCitizen",
      pan_title: "पैन आवेदन (फॉर्म 49A / इंस्टेंट ई-पैन)",
      passport_title: "पासपोर्ट आवेदन तैयारी (सामान्य योजना)",
      aadhaar_number: "आधार नंबर",
      full_name_aadhaar: "पूरा नाम (आधार के अनुसार)",
      dob: "जन्म तिथि",
      residential_address: "निवास पता",
      email: "संचार ईमेल आईडी",
      application_type: "आवेदन प्रकार",
      application_type_epan: "इंस्टेंट ई-पैन (मुफ़्त)",
      application_type_physical: "फिजिकल पैन (लगभग ₹107)",
      declaration_multi_pan: "मैं घोषित करता/करती हूँ कि मेरे पास कोई अन्य पैन नहीं है।",
      save_continue: "सेव करें और आगे बढ़ें",
      generate_output: "आउटपुट बनाएं",
      go_official_portal: "आधिकारिक पोर्टल पर जाएं",
      cost_section: "सरकारी शुल्क",
      cost_free: "₹0 (इंस्टेंट ई-पैन)",
      cost_physical_pan: "लगभग ₹107 (फिजिकल पैन)",
      tooltip_aadhaar: "ई-केवाईसी और इंस्टेंट ई-पैन के लिए यह अनिवार्य है।",
      tooltip_fullname: "अस्वीकार से बचने के लिए नाम आधार कार्ड के अनुसार बिल्कुल मेल खाना चाहिए।",
      tooltip_dob: "इंस्टेंट ई-पैन के लिए आवेदक नाबालिग नहीं होना चाहिए।",
      tooltip_address: "पते के प्रमाण (PoA) पर दर्शाया पता ही उपयोग करें। यूटिलिटी बिल 3 माह से अधिक पुराना नहीं होना चाहिए।",
      tooltip_email: "आपका ई-पैन 48 घंटों के भीतर इस ईमेल पर भेजा जाएगा।",
      tooltip_app_type: "इंस्टेंट ई-पैन मुफ़्त और तेज़ है पर केवल सॉफ़्ट कॉपी देता है। फिजिकल कार्ड के लिए नाममात्र शुल्क और डिस्पैच होता है।",
      tooltip_multi_pan: "एक से अधिक पैन रखना अवैध है और भारी जुर्माना लग सकता है।",
      rpo: "क्षेत्रीय पासपोर्ट कार्यालय (RPO)",
      is_minor: "क्या आवेदक नाबालिग है?",
      family_details: "परिवार विवरण",
      present_address_proof: "वर्तमान पते का प्रमाण",
      fee_reminder: "पासपोर्ट शुल्क अनुस्मारक",
      appointment_guide: "अपॉइंटमेंट बुकिंग मार्गदर्शन",
      tip_minor: "नाबालिग के लिए परिशिष्ट-डी अनिवार्य है। शुल्क कम और वैधता 5 वर्ष/18 वर्ष तक।",
      tip_rpo: "वर्तमान पते के आधार पर RPO चुनें। बाद में बदला नहीं जा सकता।",
      tip_present_address: "कम से कम दो PoA (जैसे, पानी का बिल + बैंक पासबुक) रखें जो चयनित RPO क्षेत्र को दर्शाते हों।",
      cost_passport_normal: "₹1,500 (सामान्य, 36 पृष्ठ)",
      tip_fee_pay_gateway: "केवल आधिकारिक MEA पासपोर्ट सेवा पोर्टल पर भुगतान करें। एजेंट को कोई अतिरिक्त शुल्क न दें।",
      tip_appointment: "फॉर्म पूरा कर और भुगतान के बाद निकटतम PSK/POPSK पर अनिवार्य अपॉइंटमेंट बुक करें।",
      clear_sensitive: "संवेदनशील डेटा हटाएँ"
    }
  };

  function applyTranslations() {
    var elements = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < elements.length; i++) {
      var key = elements[i].getAttribute("data-i18n");
      var txt = (dict[currentLang] && dict[currentLang][key]) || key;
      if (elements[i].placeholder !== undefined && elements[i].hasAttribute("data-i18n-placeholder")) {
        elements[i].placeholder = txt;
      } else {
        elements[i].textContent = txt;
      }
    }
    document.documentElement.setAttribute("lang", currentLang === "hi" ? "hi" : "en");
  }

  function setLanguage(lang) {
    currentLang = lang === "hi" ? "hi" : "en";
    localStorage.setItem(LANGUAGE_KEY, currentLang);
    applyTranslations();
  }

  window.SovereignI18N = {
    setLanguage: setLanguage,
    getLanguage: function () { return currentLang; },
    t: function (key) {
      return (dict[currentLang] && dict[currentLang][key]) || key;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else {
    applyTranslations();
  }
})();


