'use client'

import React from "react";
import query from "../lib/db";
import { QueryResult } from "mysql2";

type RetrieveProps = {
  e: string
};

const Retrieve: React.FC<RetrieveProps> = async ({ e }) => {
  const [result, setResult] = React.useState<QueryResult>()

  const excQuery = async () => {
    switch (e) {
      case 'r-partenze':
        setResult(await query('SELECT * FROM aeroporto AS a, volo AS v WHERE a.IATA = v.IATAPartenza AND a.ICAO = v.ICAOPartenza ORDER BY a.nome'))
        break
      case 'r-arrivi':
        setResult(await query('SELECT * FROM aeroporto AS a, volo AS v WHERE a.IATA = v.IATAArrivo AND a.ICAO = v.ICAOArrivo ORDER BY a.nome'))
        break
      case 'r-lav-aeroporto':
      case 'r-lav-comp-aeree':
      case 'r-lav-comp-log':
      case 'r-passeggeri':
      case 'r-bagagli':
      case 'r-merci':
        setResult(await query('SELECT * FROM pacco'))
        break
      case 'r-serv-aeroporto':
      case 'r-serv-sicurezza':
      case 'r-serv-trasporto':
      case 'r-parcheggi':
    }
  }
  return (
    <div onLoad={excQuery}>
      <p>{e}</p>
    </div>
  );
};

export default Retrieve;
