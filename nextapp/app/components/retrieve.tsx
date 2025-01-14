'use client'

import { useState, useEffect } from "react";
import { retrieve, selectAllFrom } from "../actions/query";
import { Button, Form, Select, SelectItem } from "@nextui-org/react";

export default function Retrieve({ q }: { q: string }) {
  const [result, setResult] = useState<any>(undefined)
  const [error, setError] = useState<any>('')
  const [airports, setAirports] = useState<any>([])
  const [selectedAirport, setSelectedAirport] = useState<string>('')

  useEffect(() => {
    const fetchAirports = async () => {
      if (needsPK()) {
        try {
          const data = await selectAllFrom('aeroporto')
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
      q.includes('serv') ||
      q == 'r-parcheggi'
    )
  }

  const fetchDb = async () => {
    try {
      const data = needsPK() ? await retrieve(q, selectedAirport.split(',')) : await retrieve(q)
      setError('')
      setResult(data)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      {error && <span className="error">error</span>}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <Form
          className="flex flex-col items-center gap-4 w-full max-w-md"
          validationBehavior="native"
          onSubmit={(e) => {
            e.preventDefault()
            fetchDb()
          }}
        >
          {needsPK() && <Select
            className="flex-1 min-w-36"
            label="Aeroporto"
            isRequired
            selectedKeys={[selectedAirport]}
            onChange={e => setSelectedAirport(e.target.value)}
          >
            {airports.map((a: any) => (
              <SelectItem key={a.IATA + ',' + a.ICAO} textValue={`${a.IATA} - ${a.ICAO}`}>
                {a.IATA} - {a.ICAO}
              </SelectItem>
            ))}
            </Select>}
          <Button type='submit' color="primary">Esegui ricerca</Button>
        </Form>
        {result ? (<div>
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
        </div>) : null}
      </div>
    </div>
  );
};
