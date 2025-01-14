'use client'

import { useState, useEffect } from "react";
import { update, selectAllFrom } from "../actions/query";

export default function Update({ q }: { q: string }) {
  const [error, setError] = useState<any>('')
  // dati per le PKs
  const [commercials, setCommercials] = useState<any>([])
  const [securities, setSecurities] = useState<any>([])
  const [transports, setTransports] = useState<any>([])
  const [flights, setFlights] = useState<any>([])
  const [documents, setDocuments] = useState<any>([])
  const [bags, setBags] = useState<any>([])
  const [employees, setEmployees] = useState<any>([])
  const [parkings, setParkings] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (q == 'u-serv-commerciale') setCommercials(await selectAllFrom('servizio_commerciale'))
        if (q == 'u-serv-sicurezza' || q == 'u-attesa') setSecurities(await selectAllFrom('servizio_sicurezza'))
        if (q == 'u-serv-trasporto') setTransports(await selectAllFrom('servizio_trasporto'))
        if (q == 'u-volo') setFlights(await selectAllFrom('volo'))
        if (q == 'u-documento') setDocuments(await selectAllFrom('documento'))
        if (q == 'u-bagaglio') setBags(await selectAllFrom('bagaglio'))
        if (q == 'u-stipendio') setEmployees(await selectAllFrom('dipendente'))
        if (q == 'u-parcheggi') setParkings(await selectAllFrom('parcheggio'))
        setError('')
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [])

  const fetchDb = async (params: string[]) => {
    try {
      await update(q, params)
      setError('')
      alert('Modifica eseguita correttamente')
    } catch (error) {
      setError(error)
    }
  }

  // TODO: mostrare select per entita su cui modificare con i campi da modificare disabled

  return (
    <div>
      {error ? <span className="error">error</span> : (
        <div>

        </div>
      )}
    </div>
  );
};
