window.onload = function () {
    const K = 8; 
    let currentPage = 1;

    let produsePastrate = new Set();
    let produseAscunseTemporar = new Set();
    let produseAscunseSession = new Set();

    let salvate = sessionStorage.getItem("produseAscunseSession");
    if (salvate) {
        produseAscunseSession = new Set(JSON.parse(salvate));
    }

    let rangeInput = document.getElementById("inp-greutate-range");
    let infoRange = document.getElementById("infoGreutateRange");

    if (rangeInput && infoRange) {
        rangeInput.oninput = function () {
            infoRange.innerHTML = "(" + this.value + " kg)";
        };
    }

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
    
        let greutateMinima = document.getElementById("inp-greutate-range") ? 
            parseInt(document.getElementById("inp-greutate-range").value.trim()) : null;
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase();
        let pretExact = document.getElementById("inp-pret-exact").value;
        let tipAnimal = document.getElementById("inp-tip-animal").value.trim().toLowerCase();
        let culoare = document.getElementById("inp-culoare").value.trim().toLowerCase();
        let descriereCautata = document.getElementById("inp-descriere").value.trim().toLowerCase();
        let dataCautata = document.getElementById("inp-data").value;
        let chkIeftin = document.getElementById("chk-ieftin").checked;
        let chkFaraBoli = document.getElementById("chk-fara-boli").checked;
        let selectModPrezentare = document.getElementById("inp-mod-prezentare");
        let moduriSelectate = Array.from(selectModPrezentare.selectedOptions).map(opt => opt.value.toLowerCase());

        let vectRadioSterilizat = document.getElementsByName("gr_rad_sterilizat");
        let filtruSterilizat = null;
        for (let rad of vectRadioSterilizat) {
            if (rad.checked) {
                filtruSterilizat = rad.value;
                break;
            }
        }

        let vreoAfisare = false;
        let animaleFiltrate = [];
        
        for (let animal of animale) {
            let idProdus = animal.getAttribute("data-id");
            
            if (produsePastrate.has(idProdus)) {
                animal.style.display = "block";
                animaleFiltrate.push(animal);
                vreoAfisare = true;
                continue;
            }

            if (produseAscunseTemporar.has(idProdus) || produseAscunseSession.has(idProdus)) {
                animal.style.display = "none";
                continue;
            }
        
            animal.style.display = "none";

            let nume = animal.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = nume.startsWith(inpNume);

            let pret = parseFloat(animal.getElementsByClassName("val-pret")[0].innerHTML.trim());
            let cond2 = (inpVarsta == "toate") || (minVarsta <= pret && pret < maxVarsta);

            let categorie = animal.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase();
            let cond4 = (inpCategorie == 'toate' || inpCategorie == categorie);

            let cond5 = true;
            if (pretExact && pretExact.trim() !== "") {
                cond5 = (pret == parseFloat(pretExact));
            }

            let cond6 = true;
            if (greutateMinima !== null) {
                let greutate = parseInt(animal.getElementsByClassName("val-greutate")[0].innerHTML.trim());
                cond6 = (greutate >= greutateMinima);
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
                let pragIeftin = parseInt(document.querySelector('input[name="gr_rad"][value*=":"]').value.split(':')[1]);
                cond11 = (pret < pragIeftin);
            }
            let cond12 = true;
            if (filtruSterilizat && filtruSterilizat !== 'toate') {
                let sterilizat = animal.getElementsByClassName("val-sterilizat")[0].innerHTML.trim().toLowerCase();
                cond12 = (sterilizat === filtruSterilizat);
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

            if (cond1 && cond2 && cond4 && cond5 && cond6 && cond7 && cond8 && cond9 && cond10 && cond11 && cond12 && cond13 && cond14) {
                animal.style.display = "block";
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

    function calculeazaSuma() {
        let checkboxes = document.getElementsByClassName("select-cos");
        let animale = document.getElementsByClassName("animal");

        let numarSelectate = 0;
        let sumaPreturi = 0;

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked && animale[i].style.display !== "none") {
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

    function initializeMiniCarousels() {
        const miniCarousels = document.querySelectorAll('.mini-carousel');
        
        miniCarousels.forEach(carousel => {
            const folder = carousel.getAttribute('data-folder');
            const img = carousel.querySelector('.mini-carousel-img');
            const counter = carousel.querySelector('.mini-counter');
            const prevBtn = carousel.querySelector('.mini-prev');
            const nextBtn = carousel.querySelector('.mini-next');
            const indicatorsContainer = carousel.querySelector('.mini-indicators');
            
            let currentImageIndex = 1;
            let maxImages = 5; 
            let availableImages = [];
            
            function checkAvailableImages() {
                availableImages = [];
                let checkPromises = [];
                
                for (let i = 1; i <= maxImages; i++) {
                    const promise = new Promise((resolve) => {
                        const testImg = new Image();
                        testImg.onload = () => resolve({ index: i, exists: true });
                        testImg.onerror = () => resolve({ index: i, exists: false });
                        testImg.src = `/resurse/imagini/${folder}/${i}.jpg`;
                    });
                    checkPromises.push(promise);
                }
                
                Promise.all(checkPromises).then(results => {
                    availableImages = results
                        .filter(result => result.exists)
                        .map(result => result.index);
                    

                    if (availableImages.length === 0) {
                        let pngPromises = [];
                        for (let i = 1; i <= maxImages; i++) {
                            const promise = new Promise((resolve) => {
                                const testImg = new Image();
                                testImg.onload = () => resolve({ index: i, exists: true });
                                testImg.onerror = () => resolve({ index: i, exists: false });
                                testImg.src = `/resurse/imagini/${folder}/${i}.png`;
                            });
                            pngPromises.push(promise);
                        }
                        
                        Promise.all(pngPromises).then(pngResults => {
                            availableImages = pngResults
                                .filter(result => result.exists)
                                .map(result => result.index);
                            updateCarouselDisplay();
                        });
                    } else {
                        updateCarouselDisplay();
                    }
                });
            }

            function updateCarouselDisplay() {
                if (availableImages.length === 0) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                    counter.textContent = '0/0';
                    return;
                }
                
                if (availableImages.length === 1) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                } else {
                    prevBtn.style.display = 'block';
                    nextBtn.style.display = 'block';
                }
                
                const currentPosition = availableImages.indexOf(currentImageIndex) + 1;
                counter.textContent = `${currentPosition}/${availableImages.length}`;
                
                indicatorsContainer.innerHTML = '';
                availableImages.forEach((imageIndex, position) => {
                    const dot = document.createElement('span');
                    dot.className = 'mini-indicator';
                    if (imageIndex === currentImageIndex) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        currentImageIndex = imageIndex;
                        updateImage();
                        updateCarouselDisplay();
                    });
                    indicatorsContainer.appendChild(dot);
                });
            }
            
            function updateImage() {
                const newSrc = `/resurse/imagini/${folder}/${currentImageIndex}.jpg`;
                img.src = newSrc;
                img.onerror = function() {
                    this.onerror = null;
                    this.src = `/resurse/imagini/${folder}/${currentImageIndex}.png`;
                };
            }
            
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (availableImages.length > 1) {
                    const currentPosition = availableImages.indexOf(currentImageIndex);
                    const newPosition = currentPosition > 0 ? currentPosition - 1 : availableImages.length - 1;
                    currentImageIndex = availableImages[newPosition];
                    updateImage();
                    updateCarouselDisplay();
                }
            });
            
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (availableImages.length > 1) {
                    const currentPosition = availableImages.indexOf(currentImageIndex);
                    const newPosition = currentPosition < availableImages.length - 1 ? currentPosition + 1 : 0;
                    currentImageIndex = availableImages[newPosition];
                    updateImage();
                    updateCarouselDisplay();
                }
            });
            
            checkAvailableImages();
        });
    }

    document.getElementById("inp-nume").oninput = filtreaza;
    if (document.getElementById("inp-greutate-range")) {
        document.getElementById("inp-greutate-range").oninput = filtreaza;
    }
    document.getElementById("inp-categorie").onchange = filtreaza;
    document.getElementById("inp-pret-exact").oninput = filtreaza;
    document.getElementById("inp-tip-animal").onchange = filtreaza;
    document.getElementById("inp-culoare").onchange = filtreaza;
    document.getElementById("inp-descriere").oninput = filtreaza;
    document.getElementById("inp-data").onchange = filtreaza;
    document.getElementById("chk-ieftin").onchange = filtreaza;
    document.getElementById("chk-fara-boli").onchange = filtreaza;
    document.getElementById("inp-mod-prezentare").onchange = filtreaza;

  
    let vectRadio = document.getElementsByName("gr_rad");
    for (let rad of vectRadio) {
        rad.onchange = filtreaza;
    }

    let vectRadioSterilizat = document.getElementsByName("gr_rad_sterilizat");
    for (let rad of vectRadioSterilizat) {
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

    let btnCalculeaza = document.getElementById("btn-calculeaza");
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
            if (document.getElementById("inp-greutate-range")) {
                let rangeInput = document.getElementById("inp-greutate-range");
                rangeInput.value = rangeInput.min;
                document.getElementById("infoGreutateRange").innerHTML = "(" + rangeInput.min + " kg)";
            }
            document.getElementById("inp-categorie").value = "toate";
            document.getElementById("inp-pret-exact").value = "";
            document.getElementById("inp-tip-animal").value = "toate";
            document.getElementById("inp-culoare").value = "toate";
            document.getElementById("inp-descriere").value = "";
            document.getElementById("inp-data").value = "";

            let vectRadio = document.getElementsByName("gr_rad");
            for (let rad of vectRadio) {
                rad.checked = (rad.value === "toate");
            }

            let vectRadioSterilizat = document.getElementsByName("gr_rad_sterilizat");
            for (let rad of vectRadioSterilizat) {
                rad.checked = (rad.value === "toate");
            }

            document.getElementById("chk-ieftin").checked = false;
            document.getElementById("chk-fara-boli").checked = false;

            let selectModPrezentare = document.getElementById("inp-mod-prezentare");
            for (let option of selectModPrezentare.options) {
                option.selected = false;
            }

            currentPage = 1; 
            filtreaza(); 
        }
    };

    let btnFiltrare = document.getElementById("filtrare");
    if (btnFiltrare) {
        btnFiltrare.onclick = filtreaza;
    }

    document.querySelectorAll(".animal").forEach(animal => {
        let idProdus = animal.getAttribute("data-id");

        if (produseAscunseSession.has(idProdus)) {
            animal.style.display = "none";
            return;
        }

        let btnPastreaza = animal.querySelector(".btn-pastreaza");
        let btnAscTemporar = animal.querySelector(".btn-ascunde-temporar");
        let btnAscSession = animal.querySelector(".btn-ascunde-session");

        if (produsePastrate.has(idProdus)) {
            btnPastreaza.classList.add("selectat");
            animal.classList.add("pastreaza");
        }

        btnPastreaza.onclick = () => {
            if (produsePastrate.has(idProdus)) {
                produsePastrate.delete(idProdus);
                btnPastreaza.classList.remove("selectat");
                animal.classList.remove("pastreaza");
            } else {
                produsePastrate.add(idProdus);
                btnPastreaza.classList.add("selectat");
                animal.classList.add("pastreaza");
            }
            filtreaza();
        };

        btnAscTemporar.onclick = () => {
            if (produseAscunseTemporar.has(idProdus)) {
                produseAscunseTemporar.delete(idProdus);
                btnAscTemporar.classList.remove("selectat");
                animal.style.display = "block";
            } else {
                produseAscunseTemporar.add(idProdus);
                btnAscTemporar.classList.add("selectat");
                animal.style.display = "none";
            }
        };

        btnAscSession.onclick = () => {
            if (produseAscunseSession.has(idProdus)) {
                produseAscunseSession.delete(idProdus);
                sessionStorage.setItem("produseAscunseSession", JSON.stringify(Array.from(produseAscunseSession)));
                btnAscSession.classList.remove("selectat");
                animal.style.display = "block";
            } else {
                produseAscunseSession.add(idProdus);
                sessionStorage.setItem("produseAscunseSession", JSON.stringify(Array.from(produseAscunseSession)));
                btnAscSession.classList.add("selectat");
                animal.style.display = "none";
            }
        };
    });

    initializeMiniCarousels();
    filtreaza();
};