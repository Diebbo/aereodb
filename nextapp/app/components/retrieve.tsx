'use client'

import { useState, useEffect } from "react";
import { retrieve, getPK } from "../actions/query";
import { Button, Form, Select, SelectItem } from "@nextui-org/react";

export default function Retrieve({ q }: { q: string }) {
  const [result, setResult] = useState<any>([])
  const [error, setError] = useState<any>('')
  const [airports, setAirports] = useState<any>([])
  const [selectedAirport, setSelectedAirport] = useState<string>('')

  useEffect(() => {
    const fetchAirports = async () => {
      if (needsPK()) {
        try {
          const data = await getPK('aeroporto')
          console.log('dati', data)
          setError('')
          setAirports(data)
        } catch (error) {
          setError(error)
        }
      }
    }

    fetchAirports()
  }, [])

  /**
   * Controlla se la query ha bisogno del parametro aeroporto
   * 
   * @returns true se serve la ricerca aggiuntiva
   */
  const needsPK = () => {
    return(
      q == 'r-partenze' ||
      q == 'r-arrivi' ||
      q == 'r-lav-aeroporto' ||
      q == 'r-serv-aeroporto' ||
      q == 'r-serv-sicurezza' ||
      q == 'r-serv-trasporto' ||
      q == 'r-parcheggi'
    )
  }

  const fetchDb = async () => {
    try {
      const data = needsPK() ? await retrieve(q, selectedAirport.split(',')) : await retrieve(q)
      console.log(data)
      setError('')
      setResult(data)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      {error ? <span className="error">error</span> : (
        <div>
          <Form
            validationBehavior="native"
            onSubmit={(e) => {
              e.preventDefault()
              fetchDb()
            }}
          >
            {needsPK() && <Select
              label="Aeroporto"
              isRequired
              selectedKeys={[selectedAirport]}
              onChange={e => setSelectedAirport(e.target.value)}
            >
              {airports.map((a: any) => (
                <SelectItem key={a.IATA + ',' + a.ICAO}>{a.IATA} - {a.ICAO}</SelectItem>
              ))}
              </Select>}
            <Button type='submit' color="primary">Esegui</Button>
          </Form>
          {result.length === 0 ? (
            <p>Nessun risultato</p>
          ) : (
            <table className="border-1 border-black border-collapse">
              <thead>
                <tr>
                  {Object.keys(result[0]).map((key: string) => (
                    <th key={key} className="border-1 border-black p-5">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row: any, i: number) => (
                  <tr key={i}>
                    {Object.values(row).map((value: any, j: number) => (
                      <td key={j} className="border-1 border-black align-center p-5">{`${value}`}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
