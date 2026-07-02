// رسالة ترحيب عند تحميل الصفحة
window.onload = function() {
  console.log("مرحبًا بك في منصة QUALIO 🚀");
  alert("أهلاً بك في منصة QUALIO - Where Quality Meets Intelligence!");
};

// فتح/إغلاق القائمة الجانبية
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}

// تغيير اللغة (عربي / إنجليزي)
function toggleLanguage(lang) {
  if (lang === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    alert("🌐 تم تغيير اللغة إلى العربية");
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    alert("🌐 Language switched to English");
  }
}

// زر الدخول للمنصة
const enterBtn = document.querySelector('.enter-btn');
if (enterBtn) {
  enterBtn.addEventListener('click', function() {
    alert("🚀 جاري الدخول إلى منصة QUALIO...");
    // هنا ممكن تضيف كود تحويل لصفحة أخرى مثلاً:
    // window.location.href = "dashboard.html";
  });
}
