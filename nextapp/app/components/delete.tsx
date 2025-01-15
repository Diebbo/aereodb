'use client'

import { useState, useEffect } from "react";
import { remove, selectAllFrom } from "../actions/query";
import {
  Alert,
  Form,
  Button,
  Select,
  SelectItem
} from '@nextui-org/react'

export default function Delete({ q }: { q: string }) {
  const [success, setSuccess] = useState<string>('')
  const [error, setError] = useState<string>('')
  // collezione per scegliere quale riga eliminare
  const [entities, setEntities] = useState<any>([])
  // riga selezionata da eliminare
  const [selectedEntity, setSelectedEntity] = useState<string>('')

  // prende l'elenco delle righe presenti
  useEffect(() => {
    const fetchData = async () => {
      try {
        setEntities(await selectAllFrom(q.split('-')[1]))
        setError('')
      } catch (error) {
        console.error(error)
        setError('fetchData error')
        setTimeout(() => {
          setError('')
        }, 4000);
      }
    }

    fetchData()
  }, [])

  /**
   * Esegue la query di eliminazione
   */
  const fetchDb = async () => {
    try {
      await remove(q, selectedEntity.split(','))
      setError('')
      setSuccess('Eliminazione eseguita correttamente')
    } catch (error) {
      console.error(error)
      setSuccess('')
      setError("Errore nell'eliminazione")
    }
  }

  /**
   * Renderizza il select per scegliere l'aereo da eliminare
   * 
   * @returns componente Select
   */
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
          <SelectItem 
            key={ent.numeroDiSerie}
            textValue={`${ent.numeroDiSerie} - ${ent.modello}`}
          >
            {ent.numeroDiSerie} - {ent.modello}
          </SelectItem>
        ))}
      </Select>
    )
  }

  /**
   * Renderizza il select per scegliere il volo da eliminare
   * 
   * @returns componente Select
   */
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
          <SelectItem 
            key={ent.numeroVolo}
            textValue={`${ent.numeroVolo} (${ent.nomeCompagnia})`}
          >
            {ent.numeroVolo} ({ent.nomeCompagnia})
          </SelectItem>
        ))}
      </Select>
    )
  }

  /**
   * Renderizza il select per scegliere il documento da eliminare
   * 
   * @returns componente Select
   */
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
          <SelectItem
            key={ent.tipo + ',' + ent.numero}
            textValue={`${ent.tipo} - ${ent.numero}`}
          >
            {ent.tipo} - {ent.numero}
          </SelectItem>
        ))}
      </Select>
    )
  }

  /**
   * Renderizza il select per scegliere il lavoratore da eliminare
   * 
   * @returns componente Select
   */
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
          <SelectItem
            key={ent.matricola}
            textValue={`${ent.matricola} - ${ent.codiceFiscale}`}
          >
            {ent.matricola} - {ent.codiceFiscale}
          </SelectItem>
        ))}
      </Select>
    )
  }

  /**
   * Renderizza il select per scegliere il servizio da eliminare
   * 
   * @returns componente Select
   */
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
          <SelectItem
            key={ent.id}
            textValue={`${ent.id} - ${ent.nome}`}
          >
            {ent.id} - {ent.nome}
          </SelectItem>
        ))}
      </Select>
    )
  }

  /**
   * Decide quale select renderizzare in base alla query da eseguire
   * 
   * @returns componente Select da mostrare all'utente
   */
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
      {error ? (
        <div key='danger' className="w-full flex items-center my-3 fade-in">
          <Alert color='danger' variant="solid" title={error} />
        </div>
      ) : success ? (
        <div key='success' className="w-full flex items-center my-3 fade-in">
          <Alert color='success' variant="solid" title={success} />
        </div>
      ) : (
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
