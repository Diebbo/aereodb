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
          VALUES (?, ?, ?, ?, ?, ?, ?);
        `, params)
        break
      case 'c-volo':
        return (await excQuery(`
          INSERT INTO volo (numeroVolo, partenza, arrivo, IATAArrivo, ICAOArrivo, IATAPartenza, ICAOPartenza, nomeCompagnia, aereo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, params))
      case 'c-passeggero':
        await excQuery(`
          INSERT INTO passeggero (numeroBiglietto, classeViaggio, posto, codiceFiscale, numeroVolo)
          VALUES (?, ?, ?, ?, ?);
        `, params)
        break
      case 'c-lavoratore':
        await excQuery(`
          INSERT INTO dipendente (matricola, dataAssunzione, stipendio, codiceFiscale)
          VALUES (?, ?, ?, ?);
        `, params)
        break
      case 'c-bagaglio':
        await excQuery(`
          INSERT INTO bagaglio (peso, altezza, larghezza, spessore, stato, descrizione, animale, numeroBiglietto)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, params)
        break
      case 'c-pacco':
        await excQuery(`
          INSERT INTO pacco (peso, altezza, larghezza, spessore, contenuto, stato, numeroVolo)
          VALUES (?, ?, ?, ?, ?, ?, ?);
        `, params)
        break
      case 'c-compagnia':
        await excQuery(`
          INSERT INTO compagnia (nome, sede) 
          VALUES (?, ?);
        `, params)
        break
      default:
        console.log('Create inesistente')
        return 'Sei un babbo'
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
export const update = async (q: string, params?: string[]) => {
  try {
    switch (q) {
      case 'u-serv-commerciale':
        return (await excQuery(`
          
        `, params))
      case 'u-serv-sicurezza':
        return (await excQuery(`
          
        `, params))
      case 'u-serv-trasporto':
        return (await excQuery(`
          
        `, params))
      case 'u-volo':
        return (await excQuery(`
          
        `, params))
      case 'u-documento':
        return (await excQuery(`
          
        `, params))
      case 'u-bagaglio':
        return (await excQuery(`
          
        `, params))
      case 'u-stipendio':
        return (await excQuery(`
          
        `, params))
      case 'u-attesa':
        return (await excQuery(`
          
        `, params))
      case 'u-parcheggi':
        return (await excQuery(`
          
        `, params))
      default:
        console.log('Update inesistente')
        return 'Sei un babbo'
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
export const retrieve = async (q: string, params?: string[]) => {
  try {
    switch (q) {
      case 'r-partenze':
        return (await excQuery(`
          SELECT numeroVolo, partenza, arrivo, nomeCompagnia, numeroPasseggeri, provincia, a.nome AS luogoDestinazione
          FROM volo AS v JOIN aeroporto AS a ON v.IATAArrivo = a.IATA AND v.ICAOArrivo = a.ICAO
          WHERE v.IATAPartenza = ? AND v.ICAOPartenza = ?;
        `, params))
      case 'r-arrivi':
        return (await excQuery(`
          SELECT numeroVolo, partenza, arrivo, nomeCompagnia, numeroPasseggeri, provincia, a.nome AS luogoPartenza
          FROM volo AS v JOIN aeroporto AS a ON v.IATAPartenza = a.IATA AND v.ICAOPartenza = a.ICAO
          WHERE v.IATAArrivo = ? AND v.ICAOArrivo = ?;
        `, params))
      case 'r-lav-aeroporto':
        return (await excQuery(`
          SELECT p.nome, p.cognome, d.matricola, d.dataAssunzione, d.stipendio, ls.mansione, s.nome AS lavoro
          FROM persona AS p NATURAL JOIN dipendente AS d NATURAL JOIN lavoro_servizio AS ls JOIN servizio AS s ON ls.id = s.id
          WHERE IATA = ? AND ICAO = ?;
        `, params))
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
          SELECT s.nome, s.descrizione, s.locazione, a.nome, a.provincia
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
          WHERE a.IATA = ? AND a.ICAO = ?;
        `, params))
      case 'r-serv-sicurezza':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome, a.provincia, ss.tempoMedioAttesa, ss.numeroAddettiRichiesti
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
                            JOIN servizio_sicurezza AS ss ON s.id = ss.id
          WHERE a.IATA = ? AND a.ICAO = ?;
        `, params))
      case 'r-serv-trasporto':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome, a.provincia, st.tipo, st.linea, st.costoPerPersona
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
                            JOIN servizio_trasporto AS st ON s.id = st.id
          WHERE a.IATA = ? AND a.ICAO = ?;
        `, params))
      case 'r-parcheggi':
        return (await excQuery(`
          SELECT s.nome, s.descrizione, s.locazione, a.nome AS aeroporto, a.provincia, p.postiDisponibili, p.postiOccupati, p.costoOrario
          FROM servizio AS s JOIN aeroporto AS a ON s.IATA = a.IATA AND s.ICAO = a.ICAO
                            JOIN parcheggio AS p ON s.id = p.id
          WHERE a.IATA = ? AND a.ICAO = ?;
        `, params))
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
export const remove = async (q: string, params?: string[]) => {
  try {
    switch (q) {
      case 'd-aereo':
        await excQuery(`
          DELETE FROM aereo WHERE numeroDiSerie = ?;
        `, params)
        break
      case 'd-volo':
        await excQuery(`
          DELETE FROM volo WHERE numeroVolo = ?;
        `, params)
        break
      case 'd-documento':
        await excQuery(`
          DELETE FROM documento WHERE tipo = ? AND numero = ?;
        `, params)
        break
      case 'd-dipendente':
        await excQuery(`
          DELETE FROM dipendente WHERE matricola = ?;
        `, params)
        break
      case 'd-servizio':
        await excQuery(`
          DELETE FROM servizio WHERE id = ?;
        `, params)
        break
      default:
        console.log('Delete inesistente')
        return 'Sei un babbo'
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
