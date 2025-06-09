const themeSelect = document.getElementById('theme-select');
const root = document.documentElement;
const icon = document.getElementById('theme-icon');

let currentTheme = localStorage.getItem('theme') || 'light';
applyTheme(currentTheme);

themeSelect.addEventListener('change', () => {
  currentTheme = themeSelect.value;
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
});

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeSelect.value = theme;
  updateIcon(theme);
}

function updateIcon(theme) {
  switch (theme) {
    case 'light':
      icon.src = 'Resurse/Imagini/day-mode.png';
      icon.alt = 'Schimbă la modul întunecat';
      break;
    case 'dark':
      icon.src = 'Resurse/Imagini/night-mode.png';
      icon.alt = 'Schimbă la modul luminos';
      break;
    case 'blue':
      icon.src = 'Resurse/Imagini/blue-mode.png';
      icon.alt = 'Schimbă la modul albastru';
      break;
    default:
      icon.src = 'Resurse/Imagini/day-mode.png';
      icon.alt = 'Schimbă tema';
  }
}
