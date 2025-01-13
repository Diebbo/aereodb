'use client'

import { useState, useEffect } from "react";
import { update } from "../actions/query";

export default function Update({ q }: { q: string }) {
  const [result, setResult] = useState<any>([])
  const [error, setError] = useState<any>('')

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const data = await update(q)
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
      {/* {error ? <span className="error">error</span> : (
        
      )} */}
    </div>
  );
};
