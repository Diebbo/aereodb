'use client'

import { useState, useEffect } from "react";
import { retrieve } from "../actions/query";

export default function Retrieve({ q }: { q: string }) {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<any>('')

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const data = await retrieve(q)
        setError('')
        setResult(data)
      } catch (error) {
        setError(error)
      }
    }

    fetchDb()
  }, [])

  return (
    <div>
      {error ? <p>error</p> : <p>ciao</p>}
    </div>
  );
};
