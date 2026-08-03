const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('healy-labs-theme');

function setTheme(theme) {
    const isLight = theme === 'light';
    root.classList.toggle('light-mode', isLight);
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    localStorage.setItem('healy-labs-theme', isLight ? 'light' : 'dark');
}

setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
    setTheme(root.classList.contains('light-mode') ? 'dark' : 'light');
});

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[data-tab-panel]')];

function activateTab(name, focusPanel = false) {
    const activeTab = tabs.find((tab) => tab.dataset.tab === name);
    const activePanel = panels.find((panel) => panel.dataset.tabPanel === name);

    if (!activeTab || !activePanel) return;

    tabs.forEach((tab) => {
        const selected = tab === activeTab;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
        const selected = panel === activePanel;
        panel.classList.toggle('is-active', selected);
        panel.hidden = !selected;
    });

    window.scrollTo({ top: 0, behavior: 'auto' });
    if (focusPanel) activePanel.focus({ preventScroll: true });
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));

    tab.addEventListener('keydown', (event) => {
        const lastIndex = tabs.length - 1;
        let nextIndex = index;

        if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
        if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = lastIndex;

        if (nextIndex !== index || event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex].dataset.tab);
        }
    });
});

document.querySelectorAll('.tab-jump[data-tab-target]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        activateTab(trigger.dataset.tabTarget, true);
    });
});

if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        observer.observe(item);
    });
}

document.getElementById('year').textContent = new Date().getFullYear();
