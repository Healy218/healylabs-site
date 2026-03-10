// Theme toggle
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark-mode');
}

toggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Scroll reveal
const reveals = document.querySelectorAll('.scroll-reveal');
const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => obs.observe(el));

// Notify Me buttons
document.querySelectorAll('.merch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.textContent = 'Added ✓';
        btn.style.opacity = '0.6';
        setTimeout(() => {
            btn.textContent = 'Notify Me';
            btn.style.opacity = '';
        }, 2000);
    });
});
