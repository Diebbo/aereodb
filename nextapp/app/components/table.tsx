'use client'

import { useState, useEffect } from "react";
import { selectAllFrom } from "../actions/query";
import {
  Alert
} from '@nextui-org/react'

export default function Table({ q }: { q: string }) {
  const [error, setError] = useState<string>('')
  // dati da visualizzare
  const [data, setData] = useState<any>(undefined)

  // prende i dati della tabella richiesta
  useEffect(() => {
    const fetchDb = async () => {
      try {
        setData(await selectAllFrom(q.split('-')[1]))
        setError('')
      } catch (error) {
        console.error(error)
        setError('Errore durante il fetch')
        setTimeout(() => {
          setError('')
        }, 4000);
      }
    }

    fetchDb()
  }, [])

  return (
    <div>
      {error ? (
        <div key='danger' className="w-full flex items-center my-3 fade-in">
          <Alert color='danger' variant="solid" title={error} />
        </div>
      ) : (
        <div className="fade-in">
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
