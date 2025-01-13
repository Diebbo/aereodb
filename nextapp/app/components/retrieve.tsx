'use client'

import React from "react";
import query from "../lib/db";
// import { QueryResult } from "mysql2";

export default async function Retrieve({ q }: { q: string }) {
  // const [result, setResult] = React.useState<QueryResult>()

  const excQuery = async () => {
    switch (q) {
      case 'r-partenze':
        break
      case 'r-arrivi':
        break
      case 'r-lav-aeroporto':
      case 'r-lav-comp-aeree':
      case 'r-lav-comp-log':
      case 'r-passeggeri':
      case 'r-bagagli':
      case 'r-merci':
        break
      case 'r-serv-aeroporto':
      case 'r-serv-sicurezza':
      case 'r-serv-trasporto':
      case 'r-parcheggi':
    }
  }
  return (
    <div>
      <p>{q}</p>
    </div>
  );
};
