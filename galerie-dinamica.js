document.addEventListener('DOMContentLoaded', () => {
    const galerie = document.getElementById('galerie-animata');

    // Generăm un număr par între 6 și 12
    const numarImagini = Math.floor(Math.random() * 4) * 2 + 6;

    // Simulăm JSON-ul imaginilor
    const imagini = Array.from({ length: 15 }, (_, i) => `/resurse/imagini/imagine${i + 1}.jpg`);

    // Selectăm imagini distincte
    const imaginiSelectate = imagini.sort(() => 0.5 - Math.random()).slice(0, numarImagini);

    // Adăugăm imaginile în galerie
    imaginiSelectate.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slide');
        if (index === 0) img.classList.add('active');
        galerie.appendChild(img);
    });

    // Animație ciclică
    let currentIndex = 0;
    const slides = document.querySelectorAll('#galerie-animata img');
    setInterval(() => {
        if (!galerie.matches(':hover')) {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }
    }, 3000);
});
