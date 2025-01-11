-- Popola la tabella aeroporto
INSERT INTO aeroporto (IATA, ICAO, nome, provincia, stato, postiAereoPasseggeri, postiAereoCargo) VALUES
('FCO', 'LIRF', 'Aeroporto di Roma Fiumicino', 'Roma', 'Italia', 50, 20),
('MXP', 'LIMC', 'Aeroporto di Milano Malpensa', 'Milano', 'Italia', 40, 15),
('BLQ', 'LIPE', 'Aeroporto di Bologna', 'Bologna', 'Italia', 30, 10);

-- Popola la tabella compagnia
INSERT INTO compagnia (nome, sede) VALUES
('Alitalia', 'Roma'),
('Ryanair', 'Dublino'),
('Lufthansa', 'Francoforte');

-- Popola la tabella persona
INSERT INTO persona (codiceFiscale, nome, cognome, dataNascita, nazionalita, numeroTelefono, email) VALUES
('RSSMRA80A01H501U', 'Mario', 'Rossi', '1980-01-01', 'Italiana', '3331234567', 'mario.rossi@example.com'),
('VRDLGI85B02F205X', 'Luigi', 'Verdi', '1985-02-02', 'Italiana', '3337654321', 'luigi.verdi@example.com'),
('BNCLRA90C03D123Z', 'Chiara', 'Bianchi', '1990-03-03', 'Italiana', '3331122334', 'chiara.bianchi@example.com');

-- Popola la tabella aereo
INSERT INTO aereo (numeroDiSerie, tipologia, modello, postiPasseggeri, postiPersonale, volumeStiva, nomeCompagnia) VALUES
('A123456789', 'Passeggeri', 'Airbus A320', 180, 10, 500, 'Alitalia'),
('B987654321', 'Cargo', 'Boeing 747', 0, 15, 2000, 'Lufthansa'),
('C192837465', 'Passeggeri', 'Embraer E190', 100, 8, 300, 'Ryanair');

-- Popola la tabella volo
INSERT INTO volo (numeroVolo, partenza, arrivo, numeroBiglietti, IATAArrivo, ICAOArrivo, IATAPartenza, ICAOPartenza) VALUES
('AZ1234', '2025-01-15 10:00:00', '2025-01-15 12:00:00', 150, 'MXP', 'LIMC', 'FCO', 'LIRF'),
('FR5678', '2025-01-16 14:00:00', '2025-01-16 16:30:00', 100, 'BLQ', 'LIPE', 'FCO', 'LIRF'),
('LH9101', '2025-01-17 09:00:00', '2025-01-17 11:30:00', 80, 'FCO', 'LIRF', 'MXP', 'LIMC');

-- Popola la tabella pacco
INSERT INTO pacco (peso, altezza, larghezza, spessore, contenuto, stato, numeroVolo, codiceFiscale) VALUES
(10.5, 50, 30, 20, 'Elettronica', 'integro', 'AZ1234', 'RSSMRA80A01H501U'),
(15.0, 60, 40, 25, 'Abbigliamento', 'danneggiato', 'FR5678', 'VRDLGI85B02F205X'),
(8.2, 45, 35, 15, 'Libri', 'integro', 'LH9101', 'BNCLRA90C03D123Z');

-- Popola la tabella passeggero
INSERT INTO passeggero (numeroBiglietto, classeViaggio, posto, numeroVolo) VALUES
('P12345', 'Economy', '12A', 'AZ1234'),
('P67890', 'Business', '1B', 'FR5678'),
('P54321', 'Economy', '22C', 'LH9101');

-- Popola la tabella bagaglio
INSERT INTO bagaglio (peso, altezza, larghezza, spessore, stato, descrizione, animale, numeroBiglietto) VALUES
(20.0, 70, 50, 30, 'integro', 'Valigia grande', FALSE, 'P12345'),
(8.0, 40, 30, 20, 'danneggiato', 'Zaino', FALSE, 'P67890'),
(5.5, 35, 25, 15, 'integro', 'Borsa a mano', TRUE, 'P54321');

-- Popola la tabella dipendente
INSERT INTO dipendente (matricola, dataAssunzione, stipendio, codiceFiscale) VALUES
('D12345', '2020-01-01', 2500, 'RSSMRA80A01H501U'),
('D67890', '2018-06-15', 3000, 'VRDLGI85B02F205X'),
('D54321', '2022-09-01', 2000, 'BNCLRA90C03D123Z');

-- Popola la tabella documento
INSERT INTO documento (tipo, numero, scadenza, numeroBiglietto, matricola) VALUES
('Passaporto', 'X12345678', '2030-12-31', 'P12345', NULL),
('CartaIdentita', 'Y98765432', '2028-05-15', NULL, 'D67890'),
('PermessoDiSoggiorno', 'Z54321678', '2027-08-20', 'P54321', NULL);
