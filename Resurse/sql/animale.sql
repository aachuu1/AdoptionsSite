drop table animale;
drop type if exists categ_animale;
drop type if exists tipuri_animale;

create type categ_animale as enum('domestic', 'acvatic', 'exotic');
create type tipuri_animale as enum('caine', 'pisica', 'iepure', 'peste', 'broaste');

create table if not exists animale(
    id serial primary key,
    nume varchar(50) unique not null,
    descriere text,
    varsta int,
    categorie categ_animale default 'domestic',
    tip_animal tipuri_animale default 'pisica',
    imagine varchar(300),
    data_adaugare timestamp default current_timestamp
);

insert into animale(nume, descriere, varsta, categorie, tip_animal, imagine) values
('Pandi', 'O pisica linistita, perfecta pentru oamenii mai retrasi!', 3, 'domestic', 'pisica', 'pandi.png'),
('Pedro', 'Un pisoi iubaret si plin de energie!', 2, 'domestic', 'pisica', 'pedro.png'),
('Pisu', 'O pisica linistita, perfecta pentru oamenii mai retrasi!', 4, 'domestic', 'pisica', 'pisu.png'),
('Titu', 'O pisica foarte iubareata', 3, 'domestic', 'pisica', 'pisu.png'),
('Mitzunel', 'Un pisic pus pe nazbatii', 2, 'domestic', 'pisica', 'mitzunel.png'),
('Puffy', 'Un catel plin de energie si gata sa infrunte orice', 6, 'domestic', 'caine', 'puffy.png'),
('Tita', 'O catelusa perfecta pentru oamenii retrasi', 8, 'domestic', 'caine', 'tita.png'),
('Hector', 'O broasca testoasa foarte plimbareata', 10, 'exotic', 'broaste', 'hector.png'),
('Lucky', 'Un catel norocos', 4, 'domestic', 'caine', 'lucky.png');

create user ana_stoichita with encrypted password 'sefumeu09';
grant all privileges on database proiect to ana_stoichita;
grant all privileges on all tables in schema public to ana_stoichita;
grant all privileges on all sequences in schema public to ana_stoichita;

drop table animale;