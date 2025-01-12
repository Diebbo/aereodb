-- Popola la tabella aeroporto
INSERT INTO aeroporto (IATA, ICAO, nome, provincia, stato, postiAereoPasseggeri, postiAereoCargo)
VALUES 
  ('FCO', 'LIRF', 'Leonardo da Vinci', 'Roma', 'Italia', 1000, 200),
  ('MXP', 'LIMC', 'Malpensa', 'Milano', 'Italia', 800, 150),
  ('VCE', 'LIPZ', 'Marco Polo', 'Venezia', 'Italia', 500, 100);

-- Popola la tabella compagnia
INSERT INTO compagnia (nome, sede)
VALUES 
  ('Alitalia', 'Roma'),
  ('Ryanair', 'Dublino'),
  ('EasyJet', 'Londra');

-- Popola la tabella persona
INSERT INTO persona (codiceFiscale, nome, cognome, dataNascita, nazionalita, numeroTelefono, email)
VALUES 
  ('RSSMRA85M01H501T', 'Mario', 'Rossi', '1985-01-01', 'Italiana', '3312345678', 'mario.rossi@example.com'),
  ('VRDLGI90F10H501V', 'Luigi', 'Verdi', '1990-06-10', 'Italiana', '3398765432', 'luigi.verdi@example.com'),
  ('BNCLRA75T20H501X', 'Clara', 'Bianchi', '1975-12-20', 'Italiana', '3481122334', 'clara.bianchi@example.com'),
  ('SMTTNS80L15H501Y', 'Antonio', 'Smith', '1980-07-15', 'Statunitense', '3475566778', 'antonio.smith@example.com'),
  ('HLCKRN88K01H501Z', 'Karen', 'Holmes', '1988-11-01', 'Britannica', '3453344556', 'karen.holmes@example.com'),
  ('DVLJHN92A20H501W', 'John', 'Doe', '1992-01-20', 'Canadese', '3492233445', 'john.doe@example.com');

-- Popola la tabella aereo
INSERT INTO aereo (numeroDiSerie, tipologia, modello, postiPasseggeri, postiPersonale, volumeStiva, nomeCompagnia)
VALUES 
  ('A12345', 'Passeggeri', 'Boeing 737', 150, 5, 200, 'Alitalia'),
  ('B67890', 'Cargo', 'Airbus A300', 0, 3, 500, 'Ryanair'),
  ('C11223', 'Passeggeri', 'Embraer 190', 100, 4, 150, 'EasyJet');

-- Popola la tabella volo
INSERT INTO volo (numeroVolo, partenza, arrivo, IATAArrivo, ICAOArrivo, IATAPartenza, ICAOPartenza)
VALUES 
  ('AZ1234', '2025-01-15 10:00:00', '2025-01-15 12:00:00', 'MXP', 'LIMC', 'FCO', 'LIRF'),
  ('RY5678', '2025-01-16 14:00:00', '2025-01-16 16:30:00', 'VCE', 'LIPZ', 'FCO', 'LIRF'),
  ('EZ9101', '2025-01-17 08:00:00', '2025-01-17 10:30:00', 'FCO', 'LIRF', 'MXP', 'LIMC');

-- Popola la tabella pacco
INSERT INTO pacco (peso, altezza, larghezza, spessore, contenuto, stato, numeroVolo)
VALUES 
  (10.50, 40, 30, 20, 'Elettronica', 'integro', 'AZ1234'),
  (25.00, 60, 50, 40, 'Vestiti', 'danneggiato', 'RY5678'),
  (5.20, 20, 15, 10, 'Documenti', 'integro', 'EZ9101');

-- Popola la tabella passeggero
INSERT INTO passeggero (numeroBiglietto, classeViaggio, posto, codiceFiscale, numeroVolo)
VALUES 
  ('B12345', 'Economy', '12A', 'RSSMRA85M01H501T', 'AZ1234'),
  ('B67890', 'Business', '1C', 'VRDLGI90F10H501V', 'RY5678'),
  ('B11223', 'First', '1A', 'BNCLRA75T20H501X', 'EZ9101');

-- Popola la tabella bagaglio
INSERT INTO bagaglio (peso, altezza, larghezza, spessore, stato, descrizione, animale, numeroBiglietto)
VALUES 
  (23.5, 80, 50, 30, 'integro', 'Valigia grande', FALSE, 'B12345'),
  (15.2, 60, 40, 20, 'danneggiato', 'Zaino', FALSE, 'B67890'),
  (7.8, 40, 30, 20, 'integro', 'Trolley', FALSE, 'B11223');

-- Popola la tabella dipendente
INSERT INTO dipendente (matricola, dataAssunzione, stipendio, codiceFiscale)
VALUES 
  ('D00123', '2020-01-01', 3000, 'SMTTNS80L15H501Y'),
  ('D00456', '2019-05-10', 2800, 'HLCKRN88K01H501Z'),
  ('D00789', '2021-07-15', 3200, 'DVLJHN92A20H501W');

-- Popola la tabella documento
INSERT INTO documento (tipo, numero, scadenza, codiceFiscale)
VALUES 
  ('Passaporto', 'AA1234567', '2030-01-01', 'RSSMRA85M01H501T'),
  ('CartaIdentità', 'CI987654', '2028-06-15', 'VRDLGI90F10H501V'),
  ('Patente', 'B12345', '2025-12-31', 'BNCLRA75T20H501X');
  ('CartaIdentità', 'FS4516', '2027-07-15', 'SMTTNS80L15H501Y');
  ('CartaIdentità', 'HW414WR', '2028-01-05', 'HLCKRN88K01H501Z');
  ('Patente', 'B987654', '2026-11-20', 'DVLJHN92A20H501W');

-- Popola la tabella servizio
INSERT INTO servizio (id, nome, descrizione, locazione, IATA, ICAO)
VALUES 
  (1, 'Check-in', 'Servizio di check-in', 'Terminal 1', 'FCO', 'LIRF'),
  (2, 'Sicurezza', 'Controlli di sicurezza', 'Terminal 2', 'MXP', 'LIMC'),
  (3, 'Duty-Free', 'Negozio di articoli esenti da tasse', 'Area commerciale', 'VCE', 'LIPZ');

-- Popola la tabella servizio_sicurezza
INSERT INTO servizio_sicurezza (id, tempoMedioAttesa, numeroAddettiRichiesti)
VALUES 
  (2, 15, 10);

-- Popola la tabella servizio_commerciale
INSERT INTO servizio_commerciale (id, nome, tipo, gestore)
VALUES 
  (3, 'Duty-Free', 'Negozio', 'RetailCorp');

-- Popola la tabella parcheggio
INSERT INTO parcheggio (longitudine, latitudine, postiDisponibili, costoOrario, postiOccupati, id)
VALUES 
  (41.8000, 12.2500, 500, 2.50, 100, 1),
  (45.6300, 8.7200, 300, 3.00, 150, 2),
  (45.5100, 12.3600, 200, 2.00, 50, 3);

-- Popola la tabella ristorante
INSERT INTO ristorante (id, tipoCucina)
VALUES 
  (1, 'Italiana'),
  (2, 'Internazionale'),
  (3, 'Fast Food');

-- Popola la tabella negozio
INSERT INTO negozio (id, tipoMerce)
VALUES 
  (1, 'Elettronica'),
  (2, 'Abbigliamento'),
  (3, 'Souvenir');

-- Popola la tabella lounge
INSERT INTO lounge (id, postiDisponibili, nomeCompagnia)
VALUES 
  (1, 50, 'Alitalia'),
  (2, 30, 'Ryanair'),
  (3, 40, 'EasyJet');

-- Popola la tabella servizio_trasporto
INSERT INTO servizio_trasporto (id, tipo, linea, costoPerPersona)
VALUES 
  (1, 'bus', 'Linea 1', 5.00),
  (2, 'treno', 'Linea 2', 8.50),
  (3, 'taxi', 'Linea 3', 15.00);

-- Popola la tabella trasporto_parcheggio
INSERT INTO trasporto_parcheggio (id, longitudine, latitudine, frequenza, intervallo)
VALUES 
  (1, 41.8000, 12.2500, 'minutaria', 15),
  (2, 45.6300, 8.7200, 'giornaliera', 3),
  (3, 45.5100, 12.3600, 'minutaria', 5);

-- Popola la tabella lavoro_servizio
INSERT INTO lavoro_servizio (matricola, id, mansione, oraInizio, oraFine)
VALUES 
  ('D00123', 1, 'Check-in', '2024-01-05 08:00:00', '2024-01-05 10:00:00'),
  ('D00456', 2, 'Sicurezza', '2024-01-06 09:00:00', '2024-01-06 17:00:00'),
  ('D00789', 3, 'Assistente commerciale', '2024-01-07 10:00:00', '2024-01-07 18:00:00');

-- Popola la tabella lavoro_volo
INSERT INTO lavoro_volo (matricola, numeroVolo, mansione, oraInizio, oraFine)
VALUES 
  ('D00123', 'AZ1234', 'Hostess', '2024-01-05 10:00:00', '2024-01-05 12:00:00'),
  ('D00456', 'RY5678', 'Pilota', '2024-01-06 09:00:00', '2024-01-06 17:00:00'),
  ('D00789', 'EZ9101', 'Tecnico', '2024-01-07 9:00:00', '2024-01-07 16:00:00');

-- Adding redundant data
UPDATE volo
SET numeroPasseggeri = (SELECT COUNT(numeroBiglietto) FROM passeggero WHERE passeggero.numeroVolo = volo.numeroVolo);
