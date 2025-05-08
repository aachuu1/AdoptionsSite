const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
v=[10,27,23,44,15]

app.set('view engine', 'ejs');
app.use('/Resurse/Imagini', express.static(path.join(__dirname, 'Resurse/Imagini')));
app.set('views', path.join(__dirname, 'views'));

console.log("Folderul proiectului: ", __dirname);
console.log("Calea fisierului index.js: ", __filename);
console.log("Folderul curent de lucru: ", process.cwd());

app.set("view engine", "ejs");

const obGlobal = {
    obErori: null,
    imagini: null
};

function initImagini() {
    let continutFisier = fs.readFileSync(path.join(__dirname, "json/galerie.json")).toString("utf-8");
    let obImagini = JSON.parse(continutFisier);
    
    let vectorImagini = obImagini.imagini.map(function(elem) {
        return {
            fisier: elem.cale_imagine,
            fisier_mediu: elem.cale_imagine.replace(".png", "_mediu.png"),
            descriere: elem.descriere,
            titlu: elem.titlu,
            sfert_ora: elem.sfert_ora,

            intervale_zile: determinaraZileDupaSfert(elem.sfert_ora)
        };
    });
    
    obGlobal.imagini = vectorImagini;
    console.log("Imagini inițializate:", obGlobal.imagini.length);
}

function determinaraZileDupaSfert(sfert) {

    const sfertNr = parseInt(sfert);
    
    switch(sfertNr) {
        case 1:
            return [["luni", "marti"]];
        case 2:
            return [["miercuri", "joi"]];
        case 3:
            return [["vineri", "sambata"]];
        case 4:
            return [["duminica", "duminica"]];
        default:
            return [["luni", "duminica"]]; 
    }
}

app.get(["/", "/index", "/home"], function(req, res) {
    res.render("pagini/index", { ip: req.ip, imagini: obGlobal.imagini });
});

function initErori() {
    let continut = fs.readFileSync(path.join(__dirname, "./json/erori.json")).toString("utf-8");
    obGlobal.obErori = JSON.parse(continut);
    
    obGlobal.obErori.eroare_default.imagine = path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine);
    for (let eroare of obGlobal.obErori.info_erori) {
        eroare.imagine = path.join(obGlobal.obErori.cale_baza, eroare.imagine);
    }
}

initErori();
initImagini();

function afisareEroare(res, identificator, titlu, text, imagine) {
    let eroare = obGlobal.obErori.info_erori.find(function(elem) { 
        return elem.identificator == identificator;
    });
    
    if (eroare) {
        if (eroare.status)
            res.status(identificator);
        var titluCustom = titlu || eroare.titlu;
        var textCustom = text || eroare.text;
        var imagineCustom = imagine || eroare.imagine;
    }
    else {
        var err = obGlobal.obErori.eroare_default;
        var titluCustom = titlu || err.titlu;
        var textCustom = text || err.text;
        var imagineCustom = imagine || err.imagine;
    }
    
    res.render("pagini/eroare", {
        titlu: titluCustom,
        text: textCustom,
        imagine: imagineCustom
    });
}

app.use('/Resurse/Imagini', express.static(path.join(__dirname, 'Resurse/Imagini')));

app.get("/Resurse/*", function(req, res, next) {
    if (req.url.endsWith('/')) {
        afisareEroare(res, 403);
    } else {
        next();
    }
});

app.use("/Resurse", express.static(path.join(__dirname, "Resurse")));

app.get("/favicon.ico", function(req, res) {
    res.sendFile(path.join(__dirname, "Resurse/Imagini/favicon/favicon.ico"));
});

app.get("/despre", function(req, res) {
    res.render("pagini/despre");
});

app.get("/index/a", function(req, res) {
    res.render("pagini/index");
});
app.get('/galerie-animata', (req, res) => {
    res.render('pagini/galerie-animata', {
        imagini: obGlobal.imagini,
        cale_galerie: "../Resurse/Imagini"
    });
});
app.get("/cerere", function(req, res) {
    res.send("<p style='color:blue'>Buna ziua</p>");
});

app.get("/fisier", function(req, res, next) {
    res.sendFile(path.join(__dirname, "package.json"));
});

app.get("/abc", function(req, res, next) {
    res.write("Data curenta: ");
    next();
});

app.get("/abc", function(req, res, next) {
    res.write((new Date())+"");
    res.end();
    next();
});

app.get("/abc", function(req, res, next) {
    console.log("------------");
});

app.get("/*ejs", function(req, res, next) {
    afisareEroare(res, 400);
});

app.get("/*", function(req, res, next) {
    try {
        res.render("pagini" + req.url, function(err, rezultatRandare) {
            if (err) {
                if (err.message.startsWith("Failed to lookup view")) {
                    afisareEroare(res, 404);
                }
                else {
                    afisareEroare(res);
                }
            }
            else {
                console.log(rezultatRandare);
                res.send(rezultatRandare);
            }
        });
    }
    catch (errRandare) {
        if (errRandare.message.startsWith("Cannot find module")) {
            afisareEroare(res, 404);
        }
        else {
            afisareEroare(res);
        }
    }
});

const vect_foldere = ["temp", "json"];
for (let folder of vect_foldere) {
    let folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Folder creat: ${folderPath}`);
    }
}

app.listen(8080);
console.log("Serverul a pornit");