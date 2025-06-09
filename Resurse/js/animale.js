window.onload = function () {
    const K = 5; 
    let currentPage = 1;

    let rangeInput = document.getElementById("inp-pret");
    let infoRange = document.getElementById("infoRange");

    rangeInput.oninput = function () {
        infoRange.innerHTML = "(" + this.value + ")";
    };

    function filtreaza() {
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
                    [minVarsta, maxVarsta] = inpVarsta.split(":").map(Number);
                }
                break;
            }
        }

        let pretMinim = parseInt(document.getElementById("inp-pret").value.trim());
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase();
        let pretExact = document.getElementById("inp-pret-exact").value;
        let greutateMinima = document.getElementById("inp-greutate").value;
        let tipAnimal = document.getElementById("inp-tip-animal").value.trim().toLowerCase();
        let culoare = document.getElementById("inp-culoare").value.trim().toLowerCase();
        let descriereCautata = document.getElementById("inp-descriere").value.trim().toLowerCase();
        let dataCautata = document.getElementById("inp-data").value;
        let chkIeftin = document.getElementById("chk-ieftin").checked;
        let chkSterilizat = document.getElementById("chk-sterilizat").checked;
        let chkFaraBoli = document.getElementById("chk-fara-boli").checked;
        let selectModPrezentare = document.getElementById("inp-mod-prezentare");
        let moduriSelectate = Array.from(selectModPrezentare.selectedOptions).map(opt => opt.value.toLowerCase());

        let vreoAfisare = false;
        let animaleFiltrate = [];

        for (let animal of animale) {
            animal.style.display = "none";

            let nume = animal.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = nume.startsWith(inpNume);

            let pret = parseFloat(animal.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let cond2 = (inpVarsta == "toate") || (minVarsta <= pret && pret < maxVarsta);
            let cond3 = (pretMinim <= pret);

            let categorie = animal.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond4 = (inpCategorie == 'toate' || inpCategorie == categorie);

            let cond5 = true;
            if (pretExact && pretExact.trim() !== "") {
                cond5 = (pret == parseFloat(pretExact));
            }

            let cond6 = true;
            if (greutateMinima && greutateMinima.trim() !== "") {
                let greutate = parseInt(animal.getElementsByClassName("val-greutate")[0].innerHTML.trim());
                cond6 = (greutate >= parseInt(greutateMinima));
            }

            let cond7 = true;
            if (tipAnimal && tipAnimal !== 'toate') {
                let tip = animal.getElementsByClassName("val-tip")[0].innerHTML.trim().toLowerCase();
                cond7 = (tip === tipAnimal);
            }

            let cond8 = true;
            if (culoare && culoare !== 'toate') {
                let culoareAnimal = animal.getElementsByClassName("val-culoare")[0].innerHTML.trim().toLowerCase();
                cond8 = (culoareAnimal === culoare);
            }

            let cond9 = true;
            if (descriereCautata) {
                let descriere = animal.getElementsByClassName("val-desc")[0].innerHTML.trim().toLowerCase();
                let boli = "";
                let elemBoli = animal.getElementsByClassName("val-boli");
                if (elemBoli.length > 0) {
                    boli = elemBoli[0].innerHTML.trim().toLowerCase();
                }
                cond9 = descriere.includes(descriereCautata) || boli.includes(descriereCautata);
            }

            let cond10 = true;
            if (dataCautata) {
                let dataElement = animal.getElementsByClassName("val-data")[0];
                if (dataElement) {
                    let dataAnimal = dataElement.innerHTML.trim();
                    let [zi, luna, an] = dataAnimal.split('.');
                    let dataStandard = `${an}-${luna.padStart(2, '0')}-${zi.padStart(2, '0')}`;
                    cond10 = (dataStandard === dataCautata);
                }
            }

            let cond11 = true;
            if (chkIeftin) {
                cond11 = (pret < minVarsta);
            }

            let cond12 = true;
            if (chkSterilizat) {
                let sterilizat = animal.getElementsByClassName("val-sterilizat")[0].innerHTML.trim().toLowerCase();
                cond12 = (sterilizat === 'da');
            }

            let cond13 = true;
            if (chkFaraBoli) {
                let elemBoli = animal.getElementsByClassName("val-boli");
                cond13 = (elemBoli.length === 0 || elemBoli[0].innerHTML.trim() === "");
            }

            let cond14 = true;
            if (moduriSelectate.length > 0 && !moduriSelectate.includes('toate')) {
                let modPrezentare = animal.getElementsByClassName("val-mod")[0].innerHTML.trim().toLowerCase();
                cond14 = moduriSelectate.includes(modPrezentare);
            }

            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8 && cond9 && cond10 && cond11 && cond12 && cond13 && cond14) {
                animaleFiltrate.push(animal);
                vreoAfisare = true;
            }
        }

        let mesaj = document.getElementById("mesaj-filtrare");
        if (!vreoAfisare) {
            mesaj.innerHTML = "Nu există produse conform filtrării curente.";
            mesaj.style.display = "block";
        } else {
            mesaj.style.display = "none";
        }

        updatePagination(animaleFiltrate);
    }

    function updatePagination(animaleFiltrate) {
        const totalPages = Math.ceil(animaleFiltrate.length / K);
        const paginationContainer = document.getElementById("pagination");

        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.innerHTML = i;
            button.className = i === currentPage ? "pagination-btn active" : "pagination-btn";
            button.onclick = function () {
                currentPage = i;
                showPage(animaleFiltrate, currentPage, K);
                updatePagination(animaleFiltrate);
            };
            paginationContainer.appendChild(button);
        }

        showPage(animaleFiltrate, currentPage, K);
    }

    function showPage(animaleFiltrate, page, perPage) {
        let allAnimale = document.getElementsByClassName("animal");
        for (let animal of allAnimale) {
            animal.style.display = "none";
        }

        let start = (page - 1) * perPage;
        let end = start + perPage;

        for (let i = start; i < end && i < animaleFiltrate.length; i++) {
            animaleFiltrate[i].style.display = "block";
        }
    }

    document.getElementById("inp-nume").oninput = filtreaza;
    document.getElementById("inp-pret").oninput = filtreaza;
    document.getElementById("inp-categorie").onchange = filtreaza;
    document.getElementById("inp-pret-exact").oninput = filtreaza;
    document.getElementById("inp-greutate").oninput = filtreaza;
    document.getElementById("inp-tip-animal").onchange = filtreaza;
    document.getElementById("inp-culoare").onchange = filtreaza;
    document.getElementById("inp-descriere").oninput = filtreaza;
    document.getElementById("inp-data").onchange = filtreaza;
    document.getElementById("chk-ieftin").onchange = filtreaza;
    document.getElementById("chk-sterilizat").onchange = filtreaza;
    document.getElementById("chk-fara-boli").onchange = filtreaza;
    document.getElementById("inp-mod-prezentare").onchange = filtreaza;

    let vectRadio = document.getElementsByName("gr_rad");
    for (let rad of vectRadio) {
        rad.onchange = filtreaza;
    }

    let btnSortCresc = document.getElementById("sortCrescNume");
    let btnSortDescresc = document.getElementById("sortDescrescNume");

    btnSortCresc.onclick = function () {
        sorteazaAnimale(1);
    }

    btnSortDescresc.onclick = function () {
        sorteazaAnimale(-1);
    }

    function sorteazaAnimale(sens) {
        let animale = Array.from(document.getElementsByClassName("animal"));
        let container = animale[0]?.parentElement;

        animale.sort(function (a, b) {
            let pretA = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let pretB = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML.trim());

            if (pretA != pretB) {
                return sens * (pretA - pretB);
            } else {
                let numeA = a.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
                let numeB = b.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
                return sens * numeA.localeCompare(numeB);
            }
        });

        for (let animal of animale) {
            container.appendChild(animal);
        }

        filtreaza();
    }

    let btnCalculeaza = document.getElementById("btn-calculeaza");

    function calculeazaSuma() {
        let checkboxes = document.getElementsByClassName("select-cos");
        let animale = document.getElementsByClassName("animal");

        let numarSelectate = 0;
        let sumaPreturi = 0;

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                numarSelectate++;
                let pretElement = animale[i].getElementsByClassName("val-pret")[0];
                let pret = parseFloat(pretElement.innerHTML.trim());
                sumaPreturi += pret;
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
        divRezultat.innerHTML = "Numărul de animale selectate pentru adopție: " + numarSelectate + "<br/>Suma totală: " + sumaPreturi.toFixed(2) + " lei";

        document.body.appendChild(divRezultat);

        setTimeout(function () {
            divRezultat.remove();
        }, 4000);
    }

    btnCalculeaza.onclick = calculeazaSuma;

    document.addEventListener("keydown", function (event) {
        if (event.altKey && event.code === "KeyC") {
            event.preventDefault();
            calculeazaSuma();
        }
    });

    let btnResetare = document.getElementById("resetare");
    btnResetare.onclick = function () {
        if (confirm("Sigur vrei să resetezi filtrele?")) {
            document.getElementById("inp-nume").value = "";
            document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
            document.getElementById("inp-categorie").value = "toate";
            document.getElementById("inp-pret-exact").value = "";
            document.getElementById("inp-greutate").value = "";
            document.getElementById("inp-tip-animal").value = "toate";
            document.getElementById("inp-culoare").value = "toate";
            document.getElementById("inp-descriere").value = "";
            document.getElementById("inp-data").value = "";

            let rangeMin = document.getElementById("inp-pret").min;
            infoRange.innerHTML = "(" + rangeMin + ")";

            let vectRadio = document.getElementsByName("gr_rad");
            for (let rad of vectRadio) {
                rad.checked = (rad.value === "toate");
            }

            document.getElementById("chk-ieftin").checked = false;
            document.getElementById("chk-sterilizat").checked = false;
            document.getElementById("chk-fara-boli").checked = false;

            let selectModPrezentare = document.getElementById("inp-mod-prezentare");
            for (let option of selectModPrezentare.options) {
                option.selected = false;
            }

            currentPage = 1; 
            filtreaza(); 
        }
    };

    filtreaza();
};