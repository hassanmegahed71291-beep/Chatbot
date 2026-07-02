function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

function toggleLanguage(lang) {
  if (lang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }
}

const enterBtn = document.querySelector('.enter-btn');
if (enterBtn) {
  enterBtn.addEventListener('click', function() {
    window.location.href = "dashboard.html";
  });
}
