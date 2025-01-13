-- MariaDB script

-- Drop the database if it exists
DROP DATABASE IF EXISTS aereodb;

-- Create the database
CREATE DATABASE aereodb;

-- Use the database
USE aereodb;

-- No deps

CREATE TABLE aeroporto (
    IATA CHAR(3) NOT NULL,
    ICAO CHAR(4) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    stato VARCHAR(50) NOT NULL,
    postiAereoPasseggeri INT NOT NULL,
    postiAereoCargo INT NOT NULL,
    PRIMARY KEY (IATA, ICAO)
);

CREATE TABLE compagnia (
    nome VARCHAR(50) NOT NULL,
    sede VARCHAR(50) NOT NULL,
    PRIMARY KEY (nome)
);

CREATE TABLE persona (
    codiceFiscale CHAR(16) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    dataNascita DATE NOT NULL,
    nazionalita VARCHAR(50) NOT NULL,
    numeroTelefono CHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY (codiceFiscale)
);

-- With deps

CREATE TABLE aereo (
    numeroDiSerie CHAR(10) NOT NULL,
    tipologia VARCHAR(50) NOT NULL,
    modello VARCHAR(50) NOT NULL,
    postiPasseggeri INT NOT NULL,
    postiPersonale INT NOT NULL,
    volumeStiva INT NOT NULL,
    nomeCompagnia VARCHAR(50),
    PRIMARY KEY (numeroDiSerie),
    FOREIGN KEY (nomeCompagnia) REFERENCES compagnia(nome) ON DELETE SET NULL
);

CREATE TABLE volo (
    numeroVolo CHAR(6) NOT NULL,
    partenza DATETIME NOT NULL,
    arrivo DATETIME NOT NULL,
    IATAArrivo CHAR(3) NOT NULL,
    ICAOArrivo CHAR(4) NOT NULL,
    IATAPartenza CHAR(3) NOT NULL,
    ICAOPartenza CHAR(4) NOT NULL,
    nomeCompagnia VARCHAR(50) NOT NULL,
    aereo CHAR(10) NOT NULL,
    numeroPasseggeri INT DEFAULT 0,
    PRIMARY KEY (numeroVolo),
    FOREIGN KEY (IATAArrivo, ICAOArrivo) REFERENCES aeroporto(IATA, ICAO),
    FOREIGN KEY (IATAPartenza, ICAOPartenza) REFERENCES aeroporto(IATA, ICAO),
    FOREIGN KEY (nomeCompagnia) REFERENCES compagnia(nome) ON DELETE CASCADE,
    FOREIGN KEY (aereo) REFERENCES aereo(numeroDiSerie)
);

CREATE TABLE pacco (
    id INT NOT NULL AUTO_INCREMENT,
    peso DECIMAL(5, 2) NOT NULL,
    altezza INT NOT NULL,
    larghezza INT NOT NULL,
    spessore INT NOT NULL,
    contenuto VARCHAR(50) NOT NULL,
    stato ENUM('integro', 'danneggiato', 'disperso') DEFAULT 'integro',
    numeroVolo CHAR(6) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (numeroVolo) REFERENCES volo(numeroVolo) ON DELETE CASCADE
);


CREATE TABLE passeggero (
    numeroBiglietto CHAR(6) NOT NULL,
    classeViaggio VARCHAR(50) NOT NULL,
    posto VARCHAR(50) NOT NULL,
    codiceFiscale CHAR(16) NOT NULL,
    numeroVolo CHAR(6) NOT NULL,
    PRIMARY KEY (numeroBiglietto),
    FOREIGN KEY (codiceFiscale) REFERENCES persona(codiceFiscale) ON DELETE CASCADE,
    FOREIGN KEY (numeroVolo) REFERENCES volo(numeroVolo) ON DELETE CASCADE
);

CREATE TABLE bagaglio (
    id INT NOT NULL AUTO_INCREMENT,
    peso DECIMAL(5,2) NOT NULL,
    altezza INT NOT NULL,
    larghezza INT NOT NULL,
    spessore INT NOT NULL,
    stato ENUM('integro', 'danneggiato', 'disperso') DEFAULT 'integro',
    descrizione VARCHAR(50) NOT NULL,
    animale BOOLEAN NOT NULL,
    numeroBiglietto CHAR(6) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (numeroBiglietto) REFERENCES passeggero(numeroBiglietto)
);

CREATE TABLE dipendente (
    matricola CHAR(6) NOT NULL,
    dataAssunzione DATE NOT NULL,
    stipendio INT NOT NULL,
    codiceFiscale CHAR(16) NOT NULL,
    PRIMARY KEY (matricola),
    FOREIGN KEY (codiceFiscale) REFERENCES persona(codiceFiscale) ON DELETE CASCADE,
    CHECK (stipendio > 0)
);

CREATE TABLE documento (
    tipo VARCHAR(50) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    scadenza DATE NOT NULL,
    codiceFiscale CHAR(16) NOT NULL,
    PRIMARY KEY (tipo, numero),
    FOREIGN KEY (codiceFiscale) REFERENCES persona(codiceFiscale) ON DELETE CASCADE
);

CREATE TABLE servizio (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descrizione VARCHAR(50) NOT NULL,
    locazione VARCHAR(50) NOT NULL,
    IATA CHAR(3) NOT NULL,
    ICAO CHAR(4) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (IATA, ICAO) REFERENCES aeroporto(IATA, ICAO)
);

CREATE TABLE servizio_sicurezza (
    tempoMedioAttesa INT,
    numeroAddettiRichiesti INT CHECK (numeroAddettiRichiesti > 0),
    id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE
);

CREATE TABLE servizio_commerciale (
    tipo VARCHAR(50) NOT NULL,
    gestore VARCHAR(50) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE
);

CREATE TABLE parcheggio (
    longitudine DECIMAL(10, 8) NOT NULL,
    latitudine DECIMAL(10, 8) NOT NULL,
    postiDisponibili INT NOT NULL,
    costoOrario DECIMAL(5, 2) NOT NULL,
    postiOccupati INT NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (longitudine, latitudine),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE,
    CHECK (postiOccupati <= postiDisponibili)
);

CREATE TABLE ristorante (
    tipoCucina VARCHAR(50) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE
);

CREATE TABLE negozio (
    tipoMerce VARCHAR(50) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE
);

CREATE TABLE lounge (
    postiDisponibili INT NOT NULL,
    id INT NOT NULL,
    nomeCompagnia VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE,
    FOREIGN KEY (nomeCompagnia) REFERENCES compagnia(nome)
);

CREATE TABLE servizio_trasporto (
    tipo ENUM('navetta', 'bus', 'treno', 'tram', 'taxi') NOT NULL,
    linea VARCHAR(50) NOT NULL,
    costoPerPersona DECIMAL(5, 2) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES servizio(id) ON DELETE CASCADE
);

CREATE TABLE trasporto_parcheggio (
    id INT NOT NULL,
    longitudine DECIMAL(10, 8) NOT NULL,
    latitudine DECIMAL(10, 8) NOT NULL,
    frequenza ENUM('minutaria', 'oraria', 'giornaliera') NOT NULL,
    intervallo INT NOT NULL,
    PRIMARY KEY (id, longitudine, latitudine),
    FOREIGN KEY (id) REFERENCES servizio_trasporto(id) ON DELETE CASCADE,
    FOREIGN KEY (longitudine, latitudine) REFERENCES parcheggio(longitudine, latitudine) ON DELETE CASCADE
);

CREATE TABLE lavoro_servizio (
    matricola CHAR(6) NOT NULL,
    id INT NOT NULL,
    mansione VARCHAR(50) NOT NULL,
    oraInizio DATETIME NOT NULL,
    oraFine DATETIME NOT NULL,
    PRIMARY KEY (matricola, id),
    FOREIGN KEY (matricola) REFERENCES dipendente(matricola),
    FOREIGN KEY (id) REFERENCES servizio(id),
    CHECK (oraInizio <= oraFine)
);

CREATE TABLE lavoro_volo(
    matricola CHAR(6) NOT NULL,
    numeroVolo CHAR(6) NOT NULL,
    mansione VARCHAR(50) NOT NULL,
    oraInizio DATETIME NOT NULL,
    oraFine DATETIME NOT NULL,
    PRIMARY KEY (matricola, numeroVolo),
    FOREIGN KEY (matricola) REFERENCES dipendente(matricola),
    FOREIGN KEY (numeroVolo) REFERENCES volo(numeroVolo) ON DELETE CASCADE,
    CHECK (oraInizio <= oraFine)
);

