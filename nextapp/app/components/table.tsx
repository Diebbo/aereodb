'use client'

import { useState, useEffect } from "react";
import { selectAllFrom } from "../actions/query";

export default function Table({ q }: { q: string }) {
  const [error, setError] = useState<any>('')
  const [data, setData] = useState<any>(undefined)

  console.log('TABLE - q:', q)

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

  return (
    <div>
      {error && <span className="error">Error</span>}
      {data ? (<div>
        {data.length === 0 ? (
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
      </div>) : null}
    </div>
  );
};
