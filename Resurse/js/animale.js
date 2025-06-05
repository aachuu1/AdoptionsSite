window.onload = function() {
    let rangeInput = document.getElementById("inp-pret");
    let infoRange = document.getElementById("infoRange");
    
    rangeInput.oninput = function() {
        infoRange.innerHTML = "(" + this.value + ")";
    };

    let btn = document.getElementById("filtrare");
    btn.onclick = function() {
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
        let animale = document.getElementsByClassName("animal");
        let vectRadio = document.getElementsByName("gr_rad");
        let inpVarsta = null;
        let minVarsta = null;
        let maxVarsta = null;
        for (let rad of vectRadio) {
            if (rad.checked) {
                inpVarsta = rad.value;
                if (inpVarsta != "toate") {
                    [minVarsta, maxVarsta] = inpVarsta.split(":");
                    minVarsta = parseInt(minVarsta);
                    maxVarsta = parseInt(maxVarsta);
                }
                break;
            }
        }
        let varstMinima = parseInt(document.getElementById("inp-pret").value.trim());
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase();

        for (let animal of animale) { 
            animal.style.display = "none";
            
            let nume = animal.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = nume.startsWith(inpNume);

            let varsta = parseInt(animal.getElementsByClassName("val-varsta")[0].innerHTML.trim());
            let cond2 = (inpVarsta == "toate") || (minVarsta <= varsta && varsta < maxVarsta);

            let cond3 = (varstMinima <= varsta);

            let categorie = animal.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond4 = (inpCategorie == 'toate' || inpCategorie == categorie);

            if (cond1 && cond2 && cond3 && cond4) {
                animal.style.display = "block";
            }
        }
    }

    let btnSortCresc = document.getElementById("sortCrescNume");
    let btnSortDescresc = document.getElementById("sortDescrescNume");

    btnSortCresc.onclick = function() {
        sorteazaAnimale(1);
    }

    btnSortDescresc.onclick = function() {
        sorteazaAnimale(-1); 
    }

    function sorteazaAnimale(sens) {
        let animale = Array.from(document.getElementsByClassName("animal"));
        let container = animale[0]?.parentElement; 

        animale.sort(function(a, b) {
            let varstaA = parseInt(a.getElementsByClassName("val-varsta")[0].innerHTML.trim());
            let varstaB = parseInt(b.getElementsByClassName("val-varsta")[0].innerHTML.trim());

            if (varstaA != varstaB) {
                return sens * (varstaA - varstaB);
            } else {
                let numeA = a.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
                let numeB = b.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
                return sens * numeA.localeCompare(numeB);
            }
        });

        for (let animal of animale) {
            container.appendChild(animal);
        }
    }

    let btnCalculeaza = document.getElementById("btn-calculeaza");

    function calculeazaSuma() {
        let checkboxes = document.getElementsByClassName("select-cos");
        let animale = document.getElementsByClassName("animal");

        let numarSelectate = 0;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                numarSelectate++;
            }
        }

        let divRezultat = document.createElement("div");
        divRezultat.style.position = "fixed";
        divRezultat.style.bottom = "10px";
        divRezultat.style.right = "10px";
        divRezultat.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        divRezultat.style.color = "white";
        divRezultat.style.padding = "10px";
        divRezultat.style.borderRadius = "8px";
        divRezultat.style.zIndex = "1000";
        divRezultat.innerHTML = "Numărul de animale selectate pentru adopție: " + numarSelectate;

        document.body.appendChild(divRezultat);

        setTimeout(function() {
            divRezultat.remove();
        }, 3000);
    }

    btnCalculeaza.onclick = calculeazaSuma;

    document.addEventListener("keydown", function(event) {
        if (event.altKey && event.code === "KeyC") {
            event.preventDefault(); 
            calculeazaSuma();
        }
    });
    
    let btnResetare = document.getElementById("resetare");
    btnResetare.onclick = function() {
        if (confirm("Sigur vrei să resetezi filtrele?")) {
            
            document.getElementById("inp-nume").value = "";
            document.getElementById("inp-pret").value = "0";
            document.getElementById("inp-categorie").value = "toate";
            
            infoRange.innerHTML = "(0)";

            let vectRadio = document.getElementsByName("gr_rad");
            for (let rad of vectRadio) {
                if (rad.value === "toate") {
                    rad.checked = true;
                } else {
                    rad.checked = false;
                }
            }

            let animale = document.getElementsByClassName("animal");
            for (let animal of animale) {
                animal.style.display = "block";
            }
            let checkboxes = document.getElementsByClassName("select-cos");
            for (let checkbox of checkboxes) {
                checkbox.checked = false;
            }
        }
    };
}