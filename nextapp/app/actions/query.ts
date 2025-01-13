'use server'

import excQuery from "../lib/db"

// TODO: add parameter query

export const retrieve = async (q: string) => {
  try {
    switch (q) {
      case 'r-partenze':
      case 'r-arrivi':
      case 'r-lav-aeroporto':
      case 'r-lav-comp-aeree':
      case 'r-lav-comp-log':
      case 'r-passeggeri':
      case 'r-bagagli':
      case 'r-merci':
        return (await excQuery('SELECT * FROM pacco;'))
      case 'r-serv-aeroporto':
      case 'r-serv-sicurezza':
      case 'r-serv-trasporto':
      case 'r-parcheggi':
    }
  } catch (error) {
    console.error('Retrieve error:', error)
    throw error
  }
}
