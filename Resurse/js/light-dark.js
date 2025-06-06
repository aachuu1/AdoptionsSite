const themeToggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

let currentTheme = 'light';


root.setAttribute('data-theme', currentTheme);
updateIcon(currentTheme);

themeToggleBtn.addEventListener('click', () => {

  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  root.setAttribute('data-theme', currentTheme);
  updateIcon(currentTheme);
});

function updateIcon(theme) {
  const icon = document.getElementById('theme-icon');
  
  if (theme === 'light') {
      
    icon.src = 'Resurse/Imagini/night-mode.png';
    icon.alt = 'Schimbă la modul întunecat';
  } else {

    icon.src = 'Resurse/Imagini/day-mode.png';
    icon.alt = 'Schimbă la modul luminos';
  }
}