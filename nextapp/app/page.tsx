'use client'

import type { Selection } from "@nextui-org/react"

import Image from "next/image"
import React from 'react'
import { 
  Form,
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
  const [op, setOp] = React.useState<Selection>(new Set([]))
  const [entity, setEntity] = React.useState<Selection>(new Set([]))
  const [comp, setComp] = React.useState<string>('')
  const [val, setVal] = React.useState<string>('')

  const handleOpChange = (newOp: Selection) => {
    setOp(newOp)
    setEntity(new Set([]))
  }

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setComp('')
    setVal('')
    setOp(new Set([]))
    setEntity(new Set([]))
  }

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
          className="flex w-60 flex-wrap md:flex-nowrap gap-4"
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <Select
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
            label="Entità"
            isRequired
            selectedKeys={entity}
            onSelectionChange={setEntity}
          >
            <SelectSection
              title="Inserimento"
              hidden={Array.from(op)[0] != 'c'}
            >
              <SelectItem key='aeroporto'>Nuovo aeroporto</SelectItem>
              <SelectItem key='volo'>Nuovo volo</SelectItem>
              <SelectItem key='passeggero'>Nuovo passeggero</SelectItem>
              <SelectItem key='lavoratore'>Nuovo lavoratore</SelectItem>
              <SelectItem key='bagaglio'>Nuovo bagaglio</SelectItem>
              <SelectItem key='pacco'>Nuovo pacco</SelectItem>
              <SelectItem key='compagnia'>Nuova compagnia</SelectItem>
            </SelectSection>
            <SelectSection
              title="Ricerca"
              hidden={Array.from(op)[0] != 'r'}
            >
              <SelectItem key="partenze">Voli in partenza</SelectItem>
              <SelectItem key="arrivi">Voli in arrivo</SelectItem>
              <SelectItem key="lav-aeroporto">Lavoratori aeroportuali</SelectItem>
              <SelectItem key="lav-comp-aeree">Lavoratori compagnie aeree</SelectItem>
              <SelectItem key="lav-comp-log">Lavoratori compagnie logistiche</SelectItem>
              <SelectItem key="passeggeri">Passeggeri</SelectItem>
              <SelectItem key="bagagli">Bagagli</SelectItem>
              <SelectItem key="merci">Merci trasportate</SelectItem>
              <SelectItem key="serv-aeroporto">Servizi aeroportuali</SelectItem>
              <SelectItem key="serv-sicurezza">Servizi di sicurezza</SelectItem>
              <SelectItem key="serv-trasporto">Servizi di trasporto</SelectItem>
              <SelectItem key="parcheggi">Stato parcheggi</SelectItem>
            </SelectSection>
            <SelectSection
              title="Modifica"
              hidden={Array.from(op)[0] != 'u'}
            >
              <SelectItem key="serv-commerciale">Esercizio commerciale aeroportuale</SelectItem>
              <SelectItem key="serv-sicurezza">Servizio di sicurezza</SelectItem>
              <SelectItem key="serv-trasporto">Servizio di trasporto</SelectItem>
              <SelectItem key="volo">Volo</SelectItem>
              <SelectItem key="documento">Documenti di identità</SelectItem>
              <SelectItem key="bagaglio">Stato bagaglio</SelectItem>
              <SelectItem key="stipendio">Stipendio lavoratore</SelectItem>
              <SelectItem key="attesa">Tempo di attesa controlli</SelectItem>
              <SelectItem key="parcheggi">Posti nei parcheggi</SelectItem>
            </SelectSection>
            <SelectSection
              title="Eliminazione"
              hidden={Array.from(op)[0] != 'd'}
            >
              <SelectItem key="aereo">Smantellamento aereo</SelectItem>
              <SelectItem key="volo">Cancellazione volo</SelectItem>
              <SelectItem key="documento">Invalidazione documenti di identità</SelectItem>
              <SelectItem key="lavoratore">Licenziamento lavoratore</SelectItem>
              <SelectItem key="bagaglio">Smarrimento bagaglio</SelectItem>
            </SelectSection>
          </Select>}
          <div>
            <Button type='reset'>Reset</Button>
            <Button type="submit">Esegui</Button>
          </div>
        </Form>
        {comp == 'c' && <Create e={val} />}
        {comp == 'r' && <Retrieve e={val} />}
        {comp == 'u' && <Update e={val} />}
        {comp == 'd' && <Delete e={val} />}
      </main>
    </div>
  );
}
