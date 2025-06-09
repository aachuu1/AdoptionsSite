DROP TABLE IF EXISTS animale;
DROP TYPE IF EXISTS categ_animale;
DROP TYPE IF EXISTS tipuri_animale;
DROP TYPE IF EXISTS mod_prezentare;
CREATE TYPE categ_animale AS ENUM ('domestic', 'acvatic', 'exotic');
CREATE TYPE tipuri_animale AS ENUM ('caine', 'pisica', 'iepure', 'peste', 'broaste');
CREATE TYPE mod_prezentare AS ENUM ('blana scurta', 'blana lunga', 'par mediu', 'fara blana', 'altul');
CREATE TABLE IF NOT EXISTS animale (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(50) UNIQUE NOT NULL,
    descriere TEXT,
    imagine VARCHAR(300),
    categorie categ_animale DEFAULT 'domestic',
    tip_animal tipuri_animale DEFAULT 'pisica',
    mod_prezentare mod_prezentare DEFAULT 'altul',
    pret NUMERIC(10, 2),
    greutate INT,
    data_adaugare DATE DEFAULT CURRENT_DATE,
    culoare VARCHAR(100),
    boli TEXT,  
    sterilizat BOOLEAN DEFAULT FALSE
);

INSERT INTO animale(nume, descriere, greutate, categorie, tip_animal, imagine, mod_prezentare, pret, culoare, boli, sterilizat)
VALUES
('Pandi', 'O pisica linistita, perfecta pentru oamenii mai retrasi!', 3, 'domestic', 'pisica', 'pandi.png', 'blana lunga', 100.00, 'gri', 'rinita', TRUE),
('Pedro', 'Un pisoi iubaret si plin de energie!', 2, 'domestic', 'pisica', 'pedro.png', 'blana scurta', 150.00, 'negru', '', FALSE),
('Pisu', 'O pisica linistita, perfecta pentru oamenii mai retrasi!', 4, 'domestic', 'pisica', 'pisu.png', 'blana lunga', 130.00, 'alb', 'otita', TRUE),
('Titu', 'O pisica foarte iubareata', 3, 'domestic', 'pisica', 'titu.png', 'par mediu', 120.00, 'portocaliu', '', FALSE),
('Mitzunel', 'Un pisic pus pe nazbatii', 2, 'domestic', 'pisica', 'mitzunel.png', 'blana scurta', 140.00, 'tigrat', '', TRUE),
('Puffy', 'Un catel plin de energie si gata sa infrunte orice', 6, 'domestic', 'caine', 'puffy.png', 'blana lunga', 200.00, 'alb', 'diabet', TRUE),
('Tita', 'O catelusa perfecta pentru oamenii retrasi', 8, 'domestic', 'caine', 'tita.png', 'blana scurta', 210.00, 'maro', '', TRUE),
('Hector', 'O broasca testoasa foarte plimbareata', 10, 'exotic', 'broaste', 'hector.png', 'fara blana', 80.00, 'verde', '', FALSE),
('Lucky', 'Un catel norocos', 4, 'domestic', 'caine', 'lucky.png', 'par mediu', 190.00, 'negru', '', FALSE);
('Foxy', 'O vulpe domesticita, jucausa si inteligenta.', 7, 'exotic', 'pisica', 'foxy.png', 'blana lunga', 300.00, 'roscat', '', TRUE),
('Rex', 'Un caine de paza curajos si loial.', 10, 'domestic', 'caine', 'rex.png', 'blana scurta', 250.00, 'negru', 'alergii', TRUE),
('Snow', 'Un iepure alb ca zapada, foarte bland.', 2, 'domestic', 'iepure', 'snow.png', 'blana lunga', 95.00, 'alb', '', FALSE),
('Zippy', 'Un peste rapid si foarte colorat.', 1, 'acvatic', 'peste', 'zippy.png', 'fara blana', 60.00, 'albastru', '', FALSE),
('Toto', 'O broasca glumeata si foarte linistita.', 5, 'exotic', 'broaste', 'toto.png', 'fara blana', 85.00, 'verde', 'ciuperca piele', FALSE);
('Luna', 'Pisica eleganta si misterioasa, cu ochi verzi patrunzatori.', 3, 'domestic', 'pisica', 'luna.png', 'blana lunga', 160.00, 'gri inchis', '', TRUE),
('Bruno', 'Caine jucaus, perfect pentru familii cu copii.', 9, 'domestic', 'caine', 'bruno.png', 'par mediu', 230.00, 'maro deschis', '', TRUE),
('Whiskers', 'Pisoi curios si foarte energic.', 2, 'domestic', 'pisica', 'whiskers.png', 'blana scurta', 145.00, 'negru-alb', 'otita', FALSE),
('Cleo', 'Broasca miniaturala, perfecta pentru acvarii mici.', 1, 'exotic', 'broaste', 'cleo.png', 'fara blana', 70.00, 'verde deschis', '', FALSE),
('Fluffy', 'Iepure mare si pufos, foarte bland cu copiii.', 4, 'domestic', 'iepure', 'fluffy.png', 'blana lunga', 115.00, 'gri-alb', '', TRUE),
('Bubbles', 'Pestisor mic, ideal pentru bazine comunitare.', 1, 'acvatic', 'peste', 'bubbles.png', 'fara blana', 45.00, 'rosu', '', FALSE);


CREATE USER ana_stoichita WITH ENCRYPTED PASSWORD 'sefumeu09';
GRANT ALL PRIVILEGES ON DATABASE proiect TO ana_stoichita;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ana_stoichita;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ana_stoichita;

REVOKE ALL PRIVILEGES ON DATABASE proiect FROM ana_stoichita;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM ana_stoichita;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM ana_stoichita;
