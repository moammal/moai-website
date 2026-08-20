// التحقق من حالة المستخدم عند فتح الصفحة
const user = localStorage.getItem('moUser');
const loginBtn = document.getElementById('login-btn');
const userNameSpan = document.getElementById('user-name');

if (user) {
    // إذا كان المستخدم مسجل الدخول (إخفاء زر Login وإظهار الاسم)
    loginBtn.style.display = 'none';
    userNameSpan.style.display = 'inline';
    
    // زر تسجيل الخروج بجانب الاسم
    userNameSpan.innerHTML = `👋 ${user} <a href="#" id="logout-btn" style="color: #f5e6a8; margin-left: 10px; font-weight: bold; text-decoration: none;">(Logout)</a>`;
    
    // إضافة وظيفة للزر عند الضغط
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('moUser'); // مسح بيانات المستخدم
        window.location.reload(); // إعادة تحميل الصفحة لتختفي
    });
} else {
    // إذا لم يكن مسجل الدخول (إظهار زر Login)
    loginBtn.style.display = 'inline-block';
    userNameSpan.style.display = 'none';
}