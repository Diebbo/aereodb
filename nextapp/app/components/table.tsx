'use client'

import { useState, useEffect } from "react";
import { selectAllFrom } from "../actions/query";

export default function Table({ q }: { q: string }) {
  const [error, setError] = useState<any>('')
  const [data, setData] = useState<any>(undefined)

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const result = await selectAllFrom(q.split('-')[1])
        setError('')
        setData(result)
      } catch (error) {
        setError(error)
        console.error(error)
      }
    }

    fetchDb()
  }, [])

  // TODO: controllare il caso in cui apri e i dati non ci sono ancora

  return (
    <div>
      {error ? <span className="error">error</span> : (
        <div>
          {(data && data?.length === 0) ? (
            <p>Nessun risultato</p>
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
      )}
    </div>
  );
};
