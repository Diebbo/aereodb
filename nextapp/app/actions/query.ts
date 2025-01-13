'use server'

import excQuery from "../lib/db"

export const create = async (q: string, params?: string[]) => {
  
}

export const update = async (q: string, params?: string[]) => {
  
}

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
        break
    }
  } catch (error) {
    console.error('Retrieve error:', error)
    throw error
  }
}

export const remove = async (q: string, params?: string[]) => {
  try {
    switch (q) {
      case 'd-aereo':
        return (await excQuery(`
          DELETE FROM aereo WHERE numeroDiSerie = ?;
        `, params))
      case 'd-volo':
        return (await excQuery(`
          DELETE FROM volo WHERE numeroVolo = ?;
        `, params))
      case 'd-documento':
        return (await excQuery(`
          DELETE FROM documento WHERE tipo = ? AND numero = ?;
        `, params))
      case 'd-lavoratore':
        return (await excQuery(`
          DELETE FROM dipendente WHERE matricola = ?;
        `, params))
      case 'd-servizio':
        return (await excQuery(`
          DELETE FROM servizio WHERE id = ?;
        `, params))
      default:
        console.log('Delete inesistente')
        break
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPK = async (param: string) => {
  try {
    return (await (excQuery(`SELECT * FROM ${param};`)))
  } catch (error) {
    console.error(error)
    throw error
  }
}
