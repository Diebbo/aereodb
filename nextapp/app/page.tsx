'use client'

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
  // operazione CRUD da eseguire
  const [crud, setCrud] = React.useState<string>('')
  // query da eseguire
  const [query, setQuery] = React.useState<string>('')
  // componente dei risultati da mostrare
  const [crudComponent, setCrudComponent] = React.useState<string[]>(['', ''])  // [crud, op]

  /**
   * Svuota i campi del form e nasconde il componente risultati
   * 
   * @param event evento di reset
   */
  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setCrudComponent(['', ''])
    setCrud('')
    setQuery('')
  }

  /**
   * Manda in esecuzione l'operazione selezionata
   * 
   * @param event evento di submit
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setCrudComponent([crud, query])
  }

  return (
    <div className="flex flex-col items-center">
      <Form
        className="flex flex-col items-center gap-6 w-full max-w-md my-12"
        validationBehavior="native"
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row w-full gap-4">
          <Select
            className="flex-1"
            label="Operazione CRUD"
            isRequired
            selectedKeys={[crud]}
            onChange={e => {
              setQuery('')
              setCrud(e.target.value)
            }}
          >
            <SelectItem key='c'>Inserimento</SelectItem>
            <SelectItem key='r'>Ricerca</SelectItem>
            <SelectItem key='u'>Modifica</SelectItem>
            <SelectItem key='d'>Eliminazione</SelectItem>
          </Select>
          {crud && <Select
            className="flex-1"
            label="Query"
            isRequired
            selectedKeys={[query]}
            onChange={e => setQuery(e.target.value)}
          >
            <SelectSection
              title="Inserimento"
              hidden={crud != 'c'}
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
              hidden={crud != 'r'}
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
              hidden={crud != 'u'}
            >
              <SelectItem key="u-serv-commerciale">Gestore servizio commerciale</SelectItem>
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
              hidden={crud != 'd'}
            >
              <SelectItem key="d-aereo">Smantellamento aereo</SelectItem>
              <SelectItem key="d-volo">Cancellazione volo</SelectItem>
              <SelectItem key="d-documento">Invalidazione documenti di identità</SelectItem>
              <SelectItem key="d-lavoratore">Licenziamento lavoratore</SelectItem>
              <SelectItem key="d-servizio">Chiusura servizio</SelectItem>
            </SelectSection>
          </Select>}
        </div>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Esegui</Button>
        </ButtonGroup>
      </Form>
      {crudComponent[0] == 'c' && <Create q={crudComponent[1]} />}
      {crudComponent[0] == 'r' && <Retrieve q={crudComponent[1]} />}
      {crudComponent[0] == 'u' && <Update q={crudComponent[1]} />}
      {crudComponent[0] == 'd' && <Delete q={crudComponent[1]} />}
    </div>
  );
}
