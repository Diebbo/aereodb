import 'dotenv/config'

// connessione al DB
const mysql = require('serverless-mysql')({
  config: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || 'aereodb',
    user: process.env.MYSQL_USER || 'myuser',
    password: process.env.MYSQL_PASSWORD || 'mypassword'
  }
})

/**
 * Esegue una query sul DB
 * 
 * @param q query da eseguire
 * @param params array di parametri della query (opzionale)
 * @returns risultato della query
 */
const excQuery = async (q: string) => {
  const results = await mysql.query(q)
  await mysql.end()
  return results
}

export default excQuery;
