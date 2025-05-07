// Îmbunătățirea fișierului galerie.js pentru a include și funcționalitatea grid

window.addEventListener("load", function() {
    // Funcționalitate pentru galeria animată (codul existent)
    const galerie = document.getElementById("galerie-animata");
    if (galerie) {
        const imagini = galerie.querySelectorAll("img");
        if (imagini.length > 0) {
            let index = 0;
            imagini[index].classList.add("active");
            
            setInterval(() => {
                imagini[index].classList.remove("active");
                
                // Aplicăm transformarea pentru animația de ieșire
                imagini[index].style.transform = "scaleY(0) rotate(360deg)";
                
                index = (index + 1) % imagini.length;
                
                // Adăugăm clasa active și aplicăm transformarea pentru animația de intrare
                imagini[index].classList.add("active");
                imagini[index].style.transform = "scaleY(1) rotate(0deg)";
            }, 3000);  // Schimbă imaginea la fiecare 3 secunde
        }
    }
    
    // Funcționalitate pentru grid nou adăugată
    initGrid();
});

// Funcție pentru inițializarea grid-ului
function initGrid() {
    // Verificăm dacă există un container pentru grid
    const gridContainer = document.getElementById("galerie-grid");
    if (!gridContainer) {
        // Dacă nu există, îl creăm și îl adăugăm după galeria animată
        const galerieSection = document.getElementById("sectiune-galerie");
        if (galerieSection) {
            const newGridContainer = document.createElement("div");
            newGridContainer.id = "galerie-grid";
            galerieSection.appendChild(newGridContainer);
            
            // Populăm grid-ul cu imaginile existente
            populateGrid(newGridContainer);
        }
    } else {
        // Dacă există deja, verificăm dacă trebuie repopulat
        if (gridContainer.children.length === 0) {
            populateGrid(gridContainer);
        }
        
        // Adăugăm evenimente de interacțiune pentru elementele grid-ului
        addGridInteractions(gridContainer);
    }
}

// Funcție pentru popularea grid-ului cu imagini
function populateGrid(container) {
    // Verificăm dacă putem lua imaginile din galeria animată
    const galerieAnimata = document.getElementById("galerie-animata");
    if (!galerieAnimata) return;
    
    const imaginiOriginale = galerieAnimata.querySelectorAll("img");
    if (imaginiOriginale.length === 0) return;
    
    // Pentru fiecare imagine din galeria animată, creăm un element grid
    imaginiOriginale.forEach(img => {
        // Creăm elementul grid
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        
        // Creăm imaginea pentru grid (versiunea medie)
        const gridImg = document.createElement("img");
        // Înlocuim calea imaginii pentru a folosi versiunea medie (dacă există)
        const originalSrc = img.getAttribute("src");
        gridImg.src = originalSrc.replace(".png", "_mediu.png");
        gridImg.alt = img.getAttribute("alt") || "Imagine galerie";
        
        // Creăm containerul pentru informații
        const infoDiv = document.createElement("div");
        infoDiv.className = "info";
        
        // Adăugăm titlul (dacă există în atributul alt)
        const title = document.createElement("h3");
        title.textContent = img.getAttribute("alt") || "Imagine galerie";
        
        // Adăugăm o descriere simplă
        const description = document.createElement("p");
        description.textContent = "Descriere imagine";
        
        // Asamblăm elementele
        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        gridItem.appendChild(gridImg);
        gridItem.appendChild(infoDiv);
        
        // Adăugăm elementul în container
        container.appendChild(gridItem);
    });
}

// Funcție pentru adăugarea interacțiunilor grid-ului
function addGridInteractions(container) {
    const gridItems = container.querySelectorAll(".grid-item");
    
    gridItems.forEach(item => {
        // Adăugăm efectul de hover prin JavaScript
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px)";
            this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
        });
        
        // Adăugăm funcționalitatea de click pentru vizualizare detaliată (opțional)
        item.addEventListener("click", function() {
            const img = this.querySelector("img");
            const title = this.querySelector("h3").textContent;
            
            // Aici puteți implementa un lightbox sau o altă formă de vizualizare detaliată
            // De exemplu, puteți deschide imaginea în dimensiune mare
            console.log(`Imagine selectată: ${title}`);
        });
    });
}
