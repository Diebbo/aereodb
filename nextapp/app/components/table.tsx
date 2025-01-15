'use client'

import { useState, useEffect } from "react";
import { selectAllFrom } from "../actions/query";
import { datetimeToString } from "../lib/date";
import {
  Alert,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react'

export default function Tables({ q }: { q: string }) {
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
                <Table>
                  <TableHeader>
                    {Object.keys(data[0]).map((k) =>
                      <TableColumn key={k}>{k}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody>
                    {data.map((row: any, i: number) =>
                      <TableRow key={i}>
                        {(v) => <TableCell>
                          {
                            getKeyValue(row, v) instanceof Date ? 
                            datetimeToString(getKeyValue(row, v)) :
                            getKeyValue(row, v)
                          }
                        </TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
