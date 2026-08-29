document.addEventListener('DOMContentLoaded', () => {
    // كود تغيير الثيم
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-theme`);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme', !isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // كود عرض العناصر المخفية (مثال)
    document.querySelectorAll(".more-btn").forEach(button => {
        const targetClass = button.getAttribute("data-target");
        const hiddenItems = document.querySelectorAll(`.${targetClass}`);
        hiddenItems.forEach(item => item.style.display = "none");

        button.addEventListener("click", () => {
            hiddenItems.forEach(item => item.style.display = "");
            button.style.display = "none";
        });
    });
});
