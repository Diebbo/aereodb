'use client'

import { useState, useEffect } from "react";
import { remove, getPK } from "../actions/query";
import { Form, Button, Select, SelectItem } from '@nextui-org/react'

export default function Delete({ q }: { q: string }) {
  const [result, setResult] = useState<any>()
  const [error, setError] = useState<any>('')
  const [entities, setEntities] = useState<any>([])
  const [selectedEntity, setSelectedEntity] = useState<string>('')

  useEffect(() => {
    const fetchPK = async () => {
      let pk: string = ''
      switch(q) {
        case 'd-aereo':
          pk = 'aereo'
          break
        case 'd-volo':
          pk = 'volo'
          break
        case 'd-documento':
          pk = 'documento'
          break
        case 'd-lavoratore':
          pk = 'dipendente'
          break
        case 'd-servizio':
          pk = 'servizio'
          break
      }

      try {
        const data = await getPK(pk)
        setError('')
        setEntities(data)
      } catch (error) {
        setError(error)
      }
    }

    fetchPK()
  }, [])

  const fetchDb = async () => {
    try {
      const res = await remove(q, selectedEntity.split(','))
      setError('')
      setResult(res)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      {error ? <span className="error">error</span> : (
        <div>
          <Form
            validationBehavior="native"
            onSubmit={(e) => {
              e.preventDefault()
              fetchDb()
            }}
          >
            {q == 'd-aereo' && <Select
              label="Aereo"
              isRequired
              selectedKeys={[selectedEntity]}
              onChange={e => setSelectedEntity(e.target.value)}
            >
              {entities.map((ent: any) => (
                <SelectItem key={ent.numeroDiSerie}>{ent.numeroDiSerie}</SelectItem>
              ))}
            </Select>}
            {q == 'd-volo' && <Select
              label="Volo"
              isRequired
              selectedKeys={[selectedEntity]}
              onChange={e => setSelectedEntity(e.target.value)}
            >
              {entities.map((ent: any) => (
                <SelectItem key={ent.numeroVolo}>{ent.numeroVolo}</SelectItem>
              ))}
            </Select>}
            {q == 'd-documento' && <Select
              label="Documento"
              isRequired
              selectedKeys={[selectedEntity]}
              onChange={e => setSelectedEntity(e.target.value)}
            >
              {entities.map((ent: any) => (
                <SelectItem key={ent.tipo + ',' + ent.numero}>{ent.tipo} - {ent.numero}</SelectItem>
              ))}
            </Select>}
            {q == 'd-lavoratore' && <Select
              label="Dipendente"
              isRequired
              selectedKeys={[selectedEntity]}
              onChange={e => setSelectedEntity(e.target.value)}
            >
              {entities.map((ent: any) => (
                <SelectItem key={ent.matricola}>{ent.matricola}</SelectItem>
              ))}
            </Select>}
            {q == 'd-servizio' && <Select
              label="Servizio"
              isRequired
              selectedKeys={[selectedEntity]}
              onChange={e => setSelectedEntity(e.target.value)}
            >
              {entities.map((ent: any) => (
                <SelectItem key={ent.id}>{ent.id}</SelectItem>
              ))}
            </Select>}
            <Button type='submit' color="primary">Elimina</Button>
          </Form>
        </div>
      )}
    </div>
  );
};
