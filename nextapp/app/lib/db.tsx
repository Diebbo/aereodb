import mysql from 'mysql2/promise'
import 'dotenv/config'

// TODO: usare le env variables

// connessione al DB
const connection = await mysql.createConnection({
  host: 'mariadb',
  user: 'myuser',
  password: 'mypassword',
  database: 'aereodb',
  port: 3306
})

/**
 * Esegue una query sul DB
 * 
 * @param q query da eseguire
 * @returns risultato della query
 */
const query = async (q: string) => {
  try {
    const [rows, fields] = await connection.execute(q)
    return rows
  } catch (error) {
    console.error("Query error:", error)
    throw error
  }
}

export default query;
