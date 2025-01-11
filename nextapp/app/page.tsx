'use client'

import type { Selection } from "@nextui-org/react"

import Image from "next/image"
import React from 'react'
import { 
  Form,
  ButtonGroup,
  Button,
  Select,
  SelectItem,
  SelectSection
} from '@nextui-org/react'
import Create from "./components/create"
import Retrieve from "./components/retrieve"
import Update from "./components/update"
import Delete from "./components/delete"

export default function Home() {
  // operazione CRUD da eseguire (nel form)
  const [op, setOp] = React.useState<Selection>(new Set([]))
  // operazione specifica su cui operare (nel form)
  const [entity, setEntity] = React.useState<Selection>(new Set([]))
  // componente da mostrare
  const [comp, setComp] = React.useState<string>('')
  // operazione che il componente deve eseguire
  const [val, setVal] = React.useState<string>('')

  /**
   * Imposta una nuova operazione e svuota il campo specifico
   * 
   * @param newOp operazione CRUD selezionata
   */
  const handleOpChange = (newOp: Selection) => {
    setOp(newOp)
    setEntity(new Set([]))
  }

  /**
   * Svuota i campi del form e nasconde il componente
   * 
   * @param event evento di reset
   */
  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setComp('')
    setVal('')
    setOp(new Set([]))
    setEntity(new Set([]))
  }

  /**
   * Manda in esecuzione l'operazione desiderata
   * 
   * @param event evento di submit
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setComp(Array.from(op)[0].toString())
    setVal(Array.from(entity)[0].toString())
  }

  return (
    <div>
      <header>
        <h1 className="text-center text-5xl font-bold py-20">
          AereoDB
        </h1>
      </header>
      <main className="flex flex-col items-center">
        <Image
          className="rounded-lg"
          src="/wtc.jpg"
          alt="Immagine di aereo ed edifici"
          width={525}
          height={295} />
        <Form
          className="flex flex-col items-center gap-6 w-full max-w-md"
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row w-full gap-4">
            <Select
              className="flex-1"
              label="Operazione"
              isRequired
              selectedKeys={op}
              onSelectionChange={handleOpChange}
            >
              <SelectItem key='c'>Inserimento</SelectItem>
              <SelectItem key='r'>Ricerca</SelectItem>
              <SelectItem key='u'>Modifica</SelectItem>
              <SelectItem key='d'>Eliminazione</SelectItem>
            </Select>
            {Array.from(op).length > 0 && <Select
              className="flex-1"
              label="Entità"
              isRequired
              selectedKeys={entity}
              onSelectionChange={setEntity}
            >
              <SelectSection
                title="Inserimento"
                hidden={Array.from(op)[0] != 'c'}
              >
                <SelectItem key='c-aeroporto'>Nuovo aeroporto</SelectItem>
                <SelectItem key='c-volo'>Nuovo volo</SelectItem>
                <SelectItem key='c-passeggero'>Nuovo passeggero</SelectItem>
                <SelectItem key='c-lavoratore'>Nuovo lavoratore</SelectItem>
                <SelectItem key='c-bagaglio'>Nuovo bagaglio</SelectItem>
                <SelectItem key='c-pacco'>Nuovo pacco</SelectItem>
                <SelectItem key='c-compagnia'>Nuova compagnia</SelectItem>
              </SelectSection>
              <SelectSection
                title="Ricerca"
                hidden={Array.from(op)[0] != 'r'}
              >
                <SelectItem key="r-partenze">Voli in partenza</SelectItem>
                <SelectItem key="r-arrivi">Voli in arrivo</SelectItem>
                <SelectItem key="r-lav-aeroporto">Lavoratori aeroportuali</SelectItem>
                <SelectItem key="r-lav-comp-aeree">Lavoratori compagnie aeree</SelectItem>
                <SelectItem key="r-lav-comp-log">Lavoratori compagnie logistiche</SelectItem>
                <SelectItem key="r-passeggeri">Passeggeri</SelectItem>
                <SelectItem key="r-bagagli">Bagagli</SelectItem>
                <SelectItem key="r-merci">Merci trasportate</SelectItem>
                <SelectItem key="r-serv-aeroporto">Servizi aeroportuali</SelectItem>
                <SelectItem key="r-serv-sicurezza">Servizi di sicurezza</SelectItem>
                <SelectItem key="r-serv-trasporto">Servizi di trasporto</SelectItem>
                <SelectItem key="r-parcheggi">Stato parcheggi</SelectItem>
              </SelectSection>
              <SelectSection
                title="Modifica"
                hidden={Array.from(op)[0] != 'u'}
              >
                <SelectItem key="u-serv-commerciale">Esercizio commerciale aeroportuale</SelectItem>
                <SelectItem key="u-serv-sicurezza">Servizio di sicurezza</SelectItem>
                <SelectItem key="u-serv-trasporto">Servizio di trasporto</SelectItem>
                <SelectItem key="u-volo">Volo</SelectItem>
                <SelectItem key="u-documento">Documenti di identità</SelectItem>
                <SelectItem key="u-bagaglio">Stato bagaglio</SelectItem>
                <SelectItem key="u-stipendio">Stipendio lavoratore</SelectItem>
                <SelectItem key="u-attesa">Tempo di attesa controlli</SelectItem>
                <SelectItem key="u-parcheggi">Posti nei parcheggi</SelectItem>
              </SelectSection>
              <SelectSection
                title="Eliminazione"
                hidden={Array.from(op)[0] != 'd'}
              >
                <SelectItem key="d-aereo">Smantellamento aereo</SelectItem>
                <SelectItem key="d-volo">Cancellazione volo</SelectItem>
                <SelectItem key="d-documento">Invalidazione documenti di identità</SelectItem>
                <SelectItem key="d-lavoratore">Licenziamento lavoratore</SelectItem>
                <SelectItem key="d-bagaglio">Smarrimento bagaglio</SelectItem>
              </SelectSection>
            </Select>}
          </div>
          <ButtonGroup>
            <Button type='reset' color="primary" variant="flat">Reset</Button>
            <Button type='submit' color="primary">Esegui</Button>
          </ButtonGroup>
        </Form>
        {comp == 'c' && <Create e={val} />}
        {comp == 'r' && <Retrieve e={val} />}
        {comp == 'u' && <Update e={val} />}
        {comp == 'd' && <Delete e={val} />}
      </main>
    </div>
  );
}
