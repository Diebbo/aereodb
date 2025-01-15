'use client'

import { useState, useEffect } from "react";
import { retrieve, selectAllFrom } from "../actions/query";
import {
  Alert,
  Button,
  Form,
  Select,
  SelectItem
} from "@nextui-org/react";

export default function Retrieve({ q }: { q: string }) {
  const [error, setError] = useState<string>('')
  // dati da visualizzare
  const [data, setData] = useState<any>(undefined)
  // elenco degli aeroporti
  const [airports, setAirports] = useState<any>([])
  // aeroporto selezionato
  const [selectedAirport, setSelectedAirport] = useState<string>('')

  // prende l'elenco degli aeroporti se serve
  useEffect(() => {
    const fetchAirports = async () => {
      if (needsAirport()) {
        try {
          setAirports(await selectAllFrom('aeroporto'))
          setError('')
        } catch (error) {
          console.error(error)
          setError('fetchAirports error')
          setTimeout(() => {
            setError('')
          }, 4000);
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
  const needsAirport = () => {
    return(
      q == 'r-partenze' ||
      q == 'r-arrivi' ||
      q == 'r-lav-aeroporto' ||
      q.includes('serv') ||
      q == 'r-parcheggi'
    )
  }

  /**
   * Esegue la query di ricerca
   */
  const fetchDb = async () => {
    try {
      if (needsAirport()) {
        setData(await retrieve(q, selectedAirport.split(',')))
      } else {
        setData(await retrieve(q, []))
      }
      setError('')
    } catch (error) {
      console.error(error)
      setError('Errore nella ricerca')
    }
  }

  return (
    <div>
      {error ? (
        <div key='danger' className="w-full flex items-center my-3 fade-in">
          <Alert color='danger' variant="solid" title={error} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-md fade-in">
          <Form
            className="flex flex-col items-center gap-4 w-full max-w-md"
            validationBehavior="native"
            onSubmit={(e) => {
              e.preventDefault()
              fetchDb()
            }}
          >
            {needsAirport() && <Select
              className="flex-1 min-w-36"
              label="Aeroporto"
              isRequired
              selectedKeys={[selectedAirport]}
              onChange={e => setSelectedAirport(e.target.value)}
            >
              {airports.map((a: any) => (
                <SelectItem
                  key={a.IATA + ',' + a.ICAO}
                  textValue={`${a.IATA} - ${a.ICAO}`}
                >
                  {a.IATA} - {a.ICAO}
                </SelectItem>
              ))}
            </Select>}
            <Button type='submit' color="primary">Esegui ricerca</Button>
          </Form>

          {data ? (
            <div>
              {data.length === 0 ? (
                <div className="my-16">
                  <p>Nessun risultato</p>
                </div>
              ) : (
                <table className="border-1 border-black border-collapse">
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key: string) => (
                        <th key={key} className="border-1 border-black p-5">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row: any, i: number) => (
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
          ) : null}
        </div>
      )}
    </div>
  );
};
