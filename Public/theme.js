const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIconImg = document.querySelector('.theme-icon img');
    themeIconImg.src = theme === 'light' ? 'dark_mode.png' : 'light_mode.png';
    themeIconImg.alt = theme === 'light' ? 'Dark Mode' : 'Light Mode';
}