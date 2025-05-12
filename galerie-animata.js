

window.addEventListener("load", function() {

    const galerie = document.getElementById("galerie-animata");
    if (galerie) {
        const imagini = galerie.querySelectorAll("img");
        if (imagini.length > 0) {
            let index = 0;
            imagini[index].classList.add("active");
            
            setInterval(() => {
                imagini[index].classList.remove("active");

                imagini[index].style.transform = "scaleY(0) rotate(360deg)";
                
                index = (index + 1) % imagini.length;

                imagini[index].classList.add("active");
                imagini[index].style.transform = "scaleY(1) rotate(0deg)";
            }, 3000);  
        }
    }

    initGrid();
});

function initGrid() {

    const gridContainer = document.getElementById("galerie-grid");
    if (!gridContainer) {
        const galerieSection = document.getElementById("sectiune-galerie");
        if (galerieSection) {
            const newGridContainer = document.createElement("div");
            newGridContainer.id = "galerie-grid";
            galerieSection.appendChild(newGridContainer);
            
            populateGrid(newGridContainer);
        }
    } else {

        if (gridContainer.children.length === 0) {
            populateGrid(gridContainer);
        }

        addGridInteractions(gridContainer);
    }
}

function populateGrid(container) {

    const galerieAnimata = document.getElementById("galerie-animata");
    if (!galerieAnimata) return;
    
    const imaginiOriginale = galerieAnimata.querySelectorAll("img");
    if (imaginiOriginale.length === 0) return;

    imaginiOriginale.forEach(img => {

        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";

        const gridImg = document.createElement("img");
        const originalSrc = img.getAttribute("src");
        gridImg.src = originalSrc.replace(".png", "_mediu.png");
        gridImg.alt = img.getAttribute("alt") || "Imagine galerie";

        const infoDiv = document.createElement("div");
        infoDiv.className = "info";
        

        const title = document.createElement("h3");
        title.textContent = img.getAttribute("alt") || "Imagine galerie";

        const description = document.createElement("p");
        description.textContent = "Descriere imagine";

        infoDiv.appendChild(title);
        infoDiv.appendChild(description);
        gridItem.appendChild(gridImg);
        gridItem.appendChild(infoDiv);

        container.appendChild(gridItem);
    });
}

function addGridInteractions(container) {
    const gridItems = container.querySelectorAll(".grid-item");
    
    gridItems.forEach(item => {

        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px)";
            this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
        });

        item.addEventListener("click", function() {
            const img = this.querySelector("img");
            const title = this.querySelector("h3").textContent;

            console.log(`Imagine selectată: ${title}`);
        });
    });
}
