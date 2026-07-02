// فتح/إغلاق القائمة الجانبية
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

// تغيير اللغة
function toggleLanguage(lang) {
  if (lang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }
}

// زر الدخول للمنصة
const enterBtn = document.querySelector('.enter-btn');
if (enterBtn) {
  enterBtn.addEventListener('click', function() {
    // تحويل لصفحة لوحة التحكم
    window.location.href = "dashboard.html";
  });
}
