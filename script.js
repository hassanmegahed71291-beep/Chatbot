function setLanguage(lang) {
  if (lang === "ar") {
    document.querySelector("header h1").textContent = "QAI ONE - الجودة الرقمية الأولى";
    document.querySelector(".tagline").textContent = "الجودة العالمية ببساطة";
    document.querySelector(".founder").textContent = "المؤسس: Hassan Megahed";
    document.querySelector("#about h2").textContent = "عن المنصة";
    document.querySelector("#about p").textContent = "QAI ONE هي منصة عالمية لإدارة الجودة الرقمية والتدريب.";
  } else {
    document.querySelector("header h1").textContent = "QAI ONE - Digital Quality First";
    document.querySelector(".tagline").textContent = "Global Quality, Simplified";
    document.querySelector(".founder").textContent = "Founder: Hassan Megahed";
    document.querySelector("#about h2").textContent = "About the Platform";
    document.querySelector("#about p").textContent = "QAI ONE is a global platform for digital quality management and training.";
  }
}
