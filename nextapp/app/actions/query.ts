'use server'

import excQuery from "../lib/db"

/**
 * Esegue una query di inserimento dati
 * 
 * @param q tipo di query da eseguire
 * @param params parametri della query
 * @returns risultato della query
 */
export const create = async (q: string, params: string[]) => {
  try {
    switch (q) {
      case 'c-aeroporto':
        await excQuery(`
          INSERT INTO aeroporto (IATA, ICAO, nome, provincia, stato, postiAereoPasseggeri, postiAereoCargo)
          VALUES ('${params[0]}', '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}', ${params[5]}, ${params[6]});
        `)
        break
      case 'c-volo':
        await excQuery(`
          INSERT INTO volo (numeroVolo, partenza, arrivo, IATAArrivo, ICAOArrivo, IATAPartenza, ICAOPartenza, nomeCompagnia, aereo)
          VALUES ('${params[0]}', '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}', '${params[5]}', '${params[6]}', '${params[7]}', '${params[8]}');
        `)
        break
      case 'c-passeggero':
        await excQuery(`
          INSERT INTO passeggero (numeroBiglietto, classeViaggio, posto, codiceFiscale, numeroVolo)
          VALUES ('${params[0]}', '${params[1]}', '${params[2]}', '${params[3]}', '${params[4]}');
        `)
        break
      case 'c-lavoratore':
        await excQuery(`
          INSERT INTO dipendente (matricola, dataAssunzione, stipendio, codiceFiscale)
          VALUES ('${params[0]}', '${params[1]}', ${params[2]}, '${params[3]}');
        `)
        break
      case 'c-bagaglio':
        await excQuery(`
          INSERT INTO bagaglio (peso, altezza, larghezza, spessore, stato, descrizione, animale, numeroBiglietto)
          VALUES (${params[0]}, ${params[1]}, ${params[2]}, ${params[3]}, '${params[4]}', '${params[5]}', ${params[6]}, '${params[7]}');
        `)
        break
      case 'c-pacco':
        await excQuery(`
          INSERT INTO pacco (peso, altezza, larghezza, spessore, contenuto, stato, numeroVolo)
          VALUES (${params[0]}, ${params[1]}, ${params[2]}, ${params[3]}, '${params[4]}', '${params[5]}', '${params[6]}');
        `)
        break
      case 'c-compagnia':
        await excQuery(`
          INSERT INTO compagnia (nome, sede) 
          VALUES ('${params[0]}', '${params[1]}');
        `)
        break
      default:
        console.log('Create inesistente')
    }
  } catch (error) {
    console.error('Create error:', error)
    throw error
  }
}

/**
 * Esegue una query di aggiornamento dati
 * 
 * @param q tipo di query da eseguire
 * @param params parametri della query
 * @returns risultato della query
 */
export const update = async (q: string, params: string[]) => {
  try {
    switch (q) {
      case 'u-serv-commerciale':
        await excQuery(`
          UPDATE servizio_commerciale SET gestore = '${params[0]}' WHERE id = ${params[1]};
        `)
        break
      case 'u-serv-sicurezza':
        await excQuery(`
          UPDATE servizio_sicurezza SET numeroAddettiRichiesti = ${params[0]} WHERE id = ${params[1]};
        `)
        break
      case 'u-serv-trasporto':
        await excQuery(`
          UPDATE servizio_trasporto SET tipo = '${params[0]}', linea = '${params[1]}', costoPerPersona = ${params[2]} WHERE id = ${params[3]};
        `)
        break
      case 'u-volo':
        await excQuery(`
          UPDATE volo SET partenza = '${params[0]}', arrivo = '${params[1]}' WHERE numeroVolo = '${params[2]}';
        `)
        await excQuery(`
          UPDATE volo SET numeroPasseggeri = (SELECT COUNT(numeroBiglietto) FROM passeggero WHERE passeggero.numeroVolo = volo.numeroVolo);
        `)
        break
      case 'u-documento':
        await excQuery(`
          UPDATE documento SET tipo = '${params[0]}', numero = '${params[1]}', scadenza = '${params[2]}' WHERE tipo = '${params[3]}' AND numero = '${params[4]}';
        `)
        break
      case 'u-bagaglio':
        await excQuery(`
          UPDATE bagaglio SET stato = '${params[0]}' WHERE id = ${params[1]};
        `)
        break
      case 'u-stipendio':
        await excQuery(`
          UPDATE dipendente SET stipendio = ${params[0]} WHERE matricola = '${params[1]}';
        `)
        break
      case 'u-attesa':
        await excQuery(`
          UPDATE servizio_sicurezza SET tempoMedioAttesa = ${params[0]} WHERE id = ${params[1]};
        `)
        break
      case 'u-parcheggi':
        await excQuery(`
          UPDATE parcheggio SET postiOccupati = ${params[0]} WHERE longitudine = '${params[1]}' AND latitudine = '${params[2]}';
        `)
        break
      default:
        console.log('Update inesistente')
    }
  } catch (error) {
    console.error('Update error:', error)
    throw error
  }
}

/**
 * Esegue una query di ricerca dati
 * 
 * @param q tipo di query da eseguire
 * @param params parametri della query
 * @returns risultato della query
 */
export const retrieve = async (q: string, params: string[]) => {
  try {
    switch (q) {
      case 'r-partenze':
        return (await excQuery(`
          SELECT numeroVolo, partenza, arrivo, nomeCompagnia, numeroPasseggeri, provincia, a.nome AS luogoDestinazione
          FROM volo AS v JOIN aeroporto AS a ON v.IATAArrivo = a.IATA AND v.ICAOArrivo = a.ICAO
          WHERE v.IATAPartenza = '${params[0]}' AND v.ICAOPartenza = '${params[1]}';
        `))
      case 'r-arrivi':
        return (await excQuery(`
          SELECT numeroVolo, partenza, arrivo, nomeCompagnia, numeroPasseggeri, provincia, a.nome AS luogoPartenza
          FROM volo AS v JOIN aeroporto AS a ON v.IATAPartenza = a.IATA AND v.ICAOPartenza = a.ICAO
          WHERE v.IATAArrivo = '${params[0]}' AND v.ICAOArrivo = '${params[1]}';
        `))
      case 'r-lav-aeroporto':
        return (await excQuery(`
          SELECT p.nome, p.cognome, d.matricola, d.dataAssunzione, d.stipendio, ls.mansione, s.nome AS lavoro
          FROM persona AS p NATURAL JOIN dipendente AS d NATURAL JOIN lavoro_servizio AS ls JOIN servizio AS s ON ls.id = s.id
          WHERE IATA = '${params[0]}' AND ICAO = '${params[1]}';
        `))
      case 'r-lav-comp-aeree':
        return (await excQuery(`
          SELECT p.nome, p.cognome, d.matricola, d.dataAssunzione, d.stipendio, lv.mansione, v.nomeCompagnia
          FROM persona AS p NATURAL JOIN dipendente AS d NATURAL JOIN lavoro_volo AS lv NATURAL JOIN volo AS v JOIN aereo AS a ON v.aereo = a.numeroDiSerie
          WHERE a.tipologia = 'passeggeri';
        `))
      case 'r-lav-comp-log':
        return (await excQuery(`
          SELECT p.nome, p.cognome, d.matricola, d.dataAssunzione, d.stipendio, lv.mansione, v.nomeCompagnia
          FROM persona AS p NATURAL JOIN dipendente AS d NATURAL JOIN lavoro_volo AS lv NATURAL JOIN volo AS v JOIN aereo AS a ON v.aereo = a.numeroDiSerie
          WHERE a.tipologia = 'cargo';
        `))
      case 'r-passeggeri':
        return (await excQuery(`
          SELECT numeroBiglietto, nome, cognome, nazionalita, classeViaggio, posto, numeroVolo
          FROM persona NATURAL JOIN passeggero;
        `))
      case 'r-bagagli':
        return (await excQuery(`
          SELECT nome, cognome, numeroBiglietto, descrizione, stato
          FROM persona NATURAL JOIN passeggero NATURAL JOIN bagaglio;
        `))
      case 'r-merci':
        return (await excQuery(`
          SELECT * FROM pacco;
        `))
      case 'r-serv-aeroporto':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome AS aeroporto, a.provincia
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
          WHERE a.IATA = '${params[0]}' AND a.ICAO = '${params[1]}';
        `))
      case 'r-serv-sicurezza':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome, a.provincia, ss.tempoMedioAttesa, ss.numeroAddettiRichiesti
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
                            JOIN servizio_sicurezza AS ss ON s.id = ss.id
          WHERE a.IATA = '${params[0]}' AND a.ICAO = '${params[1]}';
        `))
      case 'r-serv-trasporto':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome, a.provincia, st.tipo, st.linea, st.costoPerPersona
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
                            JOIN servizio_trasporto AS st ON s.id = st.id
          WHERE a.IATA = '${params[0]}' AND a.ICAO = '${params[1]}';
        `))
      case 'r-parcheggi':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome AS aeroporto, a.provincia, p.postiDisponibili, p.postiOccupati, p.costoOrario
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
                            JOIN parcheggio AS p ON s.id = p.id
          WHERE a.IATA = '${params[0]}' AND a.ICAO = '${params[1]}';
        `))
      default:
        console.log('Retrieve inesistente')
        return 'Sei un babbo'
    }
  } catch (error) {
    console.error('Retrieve error:', error)
    throw error
  }
}

/**
 * Esegue una query di eliminazione dati
 * 
 * @param q tipo di query da eseguire
 * @param params parametri della query
 * @returns risultato della query
 */
export const remove = async (q: string, params: string[]) => {
  try {
    switch (q) {
      case 'd-aereo':
        await excQuery(`
          DELETE FROM aereo WHERE numeroDiSerie = '${params[0]}';
        `)
        break
      case 'd-volo':
        await excQuery(`
          DELETE FROM volo WHERE numeroVolo = '${params[0]}';
        `)
        break
      case 'd-documento':
        await excQuery(`
          DELETE FROM documento WHERE tipo = '${params[0]}' AND numero = '${params[1]}';
        `)
        break
      case 'd-dipendente':
        await excQuery(`
          DELETE FROM dipendente WHERE matricola = '${params[0]}';
        `)
        break
      case 'd-servizio':
        await excQuery(`
          DELETE FROM servizio WHERE id = ${params[0]};
        `)
        break
      default:
        console.log('Delete inesistente')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Seleziona tutti i dati da una tabella
 * 
 * @param param tabella da cui prendere i dati
 * @returns risultato della query
 */
export const selectAllFrom = async (param: string) => {
  try {
    return (await excQuery(`SELECT * FROM ${param};`))
  } catch (error) {
    console.error('SelectAllFrom error', error)
    throw error
  }
}

/**
 * Seleziona i servizi commerciali con la loro entità padre
 * 
 * @returns risultato della query
 */
export const selectCommercials = async () => {
  try {
    return (await excQuery('SELECT * FROM servizio_commerciale NATURAL JOIN servizio'))
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Seleziona i servizi di sicurezza con la loro entità padre
 * 
 * @returns risultato della query
 */
export const selectSecurities = async () => {
  try {
    return (await excQuery('SELECT * FROM servizio_sicurezza NATURAL JOIN servizio'))
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Seleziona i parcheggi con la loro entità padre
 * 
 * @returns risultato della query
 */
export const selectParkings = async () => {
  try {
    return (await excQuery('SELECT * FROM parcheggio NATURAL JOIN servizio'))
  } catch (error) {
    console.error(error)
    throw error
  }
}
