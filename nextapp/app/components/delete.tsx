'use client'

import { useState, useEffect } from "react";
import { remove, selectAllFrom } from "../actions/query";
import { Form, Button, Select, SelectItem } from '@nextui-org/react'

export default function Delete({ q }: { q: string }) {
  const [error, setError] = useState<any>('')
  const [entities, setEntities] = useState<any>([])
  const [selectedEntity, setSelectedEntity] = useState<string>('')

  useEffect(() => {
    const fetchPK = async () => {
      try {
        const data = await selectAllFrom(q.split('-')[1])
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
      await remove(q, selectedEntity.split(','))
      setError('')
      alert('Eliminazione eseguita correttamente')
    } catch (error) {
      setError(error)
    }
  }

  const renderAereoSelect = () => {
    return(
      <Select
        className="flex-1 min-w-40"
        label="Aereo"
        isRequired
        selectedKeys={[selectedEntity]}
        onChange={e => setSelectedEntity(e.target.value)}
      >
        {entities.map((ent: any) => (
          <SelectItem key={ent.numeroDiSerie}>{ent.numeroDiSerie}</SelectItem>
        ))}
      </Select>
    )
  }

  const renderVoloSelect = () => {
    return(
      <Select
        className="flex-1 min-w-40"
        label="Volo"
        isRequired
        selectedKeys={[selectedEntity]}
        onChange={e => setSelectedEntity(e.target.value)}
      >
        {entities.map((ent: any) => (
          <SelectItem key={ent.numeroVolo}>{ent.numeroVolo}</SelectItem>
        ))}
      </Select>
    )
  }

  const renderDocumentoSelect = () => {
    return(
      <Select
        className="flex-1 min-w-40"
        label="Documento"
        isRequired
        selectedKeys={[selectedEntity]}
        onChange={e => setSelectedEntity(e.target.value)}
      >
        {entities.map((ent: any) => (
          <SelectItem key={ent.tipo + ',' + ent.numero}>{ent.tipo},{ent.numero}</SelectItem>
        ))}
      </Select>
    )
  }

  const renderLavoratoreSelect = () => {
    return(
      <Select
        className="flex-1 min-w-40"
        label="Dipendente"
        isRequired
        selectedKeys={[selectedEntity]}
        onChange={e => setSelectedEntity(e.target.value)}
      >
        {entities.map((ent: any) => (
          <SelectItem key={ent.matricola}>{ent.matricola}</SelectItem>
        ))}
      </Select>
    )
  }

  const renderServizioSelect = () => {
    return(
      <Select
        className="flex-1 min-w-40"
        label="Servizio"
        isRequired
        selectedKeys={[selectedEntity]}
        onChange={e => setSelectedEntity(e.target.value)}
      >
        {entities.map((ent: any) => (
          <SelectItem key={ent.id}>{ent.id}</SelectItem>
        ))}
      </Select>
    )
  }

  const renderSelect = () => {
    switch (q) {
      case 'd-aereo': return renderAereoSelect()
      case 'd-volo': return renderVoloSelect()
      case 'd-documento': return renderDocumentoSelect()
      case 'd-dipendente': return renderLavoratoreSelect()
      case 'd-servizio': return renderServizioSelect()
      default: return null
    }
  }

  return (
    <div>
      {error ? <span className="error">error</span> : (
        <div>
          <Form
            className="flex flex-col items-center gap-4 w-full max-w-md"
            validationBehavior="native"
            onSubmit={(e) => {
              e.preventDefault()
              fetchDb()
            }}
          >
            {renderSelect()}
            <Button type='submit' color="primary">Elimina</Button>
          </Form>
        </div>
      )}
    </div>
  );
};
