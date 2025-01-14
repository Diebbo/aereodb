'use client'

import { useState, useEffect } from "react";
import { update, selectAllFrom, selectCommercials, selectSecurities, selectParkings } from "../actions/query";
import { datetimeToString, datetimeToDateString } from "../lib/date";
import {
  Form,
  Input,
  ButtonGroup,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

export default function Update({ q }: { q: string }) {
  const [error, setError] = useState<any>('')
  // campi dei form
  const [gestore, setGestore] = useState<string>('')
  const [numAddetti, setNumAddetti] = useState<string>('')
  const [tipo, setTipo] = useState<string>('')
  const [linea, setLinea] = useState<string>('')
  const [costo, setCosto] = useState<string>('')
  const [partenza, setPartenza] = useState<string>('')
  const [arrivo, setArrivo] = useState<string>('')
  const [numero, setNumero] = useState<string>('')
  const [scadenza, setScadenza] = useState<string>('')
  const [stato, setStato] = useState<string>('')
  const [stipendio, setStipendio] = useState<string>('')
  const [tempoAttesa, setTempoAttesa] = useState<string>('')
  const [postiOccupati, setPostiOccupati] = useState<string>('')
  const [selected, setSelected] = useState<string>('')
  // dati per le PKs
  const [commercials, setCommercials] = useState<any>([])
  const [securities, setSecurities] = useState<any>([])
  const [transports, setTransports] = useState<any>([])
  const [flights, setFlights] = useState<any>([])
  const [documents, setDocuments] = useState<any>([])
  const [bags, setBags] = useState<any>([])
  const [employees, setEmployees] = useState<any>([])
  const [parkings, setParkings] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (q == 'u-serv-commerciale') setCommercials(await selectCommercials())
        if (q == 'u-serv-sicurezza' || q == 'u-attesa') setSecurities(await selectSecurities())
        if (q == 'u-serv-trasporto') setTransports(await selectAllFrom('servizio_trasporto'))
        if (q == 'u-volo') setFlights(await selectAllFrom('volo'))
        if (q == 'u-documento') setDocuments(await selectAllFrom('documento'))
        if (q == 'u-bagaglio') setBags(await selectAllFrom('bagaglio'))
        if (q == 'u-stipendio') setEmployees(await selectAllFrom('dipendente'))
        if (q == 'u-parcheggi') setParkings(await selectParkings())
        setError('')
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const prepareFields = () => {
      switch (q) {
        case 'u-serv-commerciale':
          setGestore(commercials.filter((c: any) => c.id == selected)[0]?.gestore || '')
          break
        case 'u-serv-sicurezza':
          setNumAddetti(securities.filter((s: any) => s.id == selected)[0]?.numeroAddettiRichiesti || '')
          break
        case 'u-serv-trasporto':
          const f = transports.filter((t: any) => t.id == selected)[0]
          setTipo(f?.tipo || '')
          setLinea(f?.linea || '')
          setCosto(f?.costoPerPersona || '')
          break
        case 'u-volo':
          const v = flights.filter((f: any) => f.numeroVolo == selected)[0]
          setPartenza(v?.partenza ? datetimeToString(v?.partenza) : '')
          setArrivo(v?.arrivo ? datetimeToString(v?.arrivo) : '')
          console.log('partenza:', partenza)
          break
        case 'u-documento':
          const d = documents.filter((d: any) => `${d.tipo},${d.numero}` == selected)[0]
          setTipo(d?.tipo || '')
          setNumero(d?.numero || '')
          setScadenza(d?.scadenza ? datetimeToDateString(d?.scadenza) : '')
          break
        case 'u-bagaglio':
          setStato(bags.filter((b: any) => b.id == selected)[0]?.stato || '')
          break
        case 'u-stipendio':
          setStipendio(employees.filter((e: any) => e.matricola == selected)[0]?.stipendio || '')
          break
        case 'u-attesa':
          setTempoAttesa(securities.filter((s: any) => s.id == selected)[0]?.tempoMedioAttesa || '')
          break
        case 'u-parcheggi':
          setPostiOccupati(parkings.filter((p: any) => `${p.longitudine},${p.latitudine}` == selected)[0].postiOccupati || '')
          break
      }
    }

    prepareFields()
  }, [selected])

  const fetchDb = async (params: string[]) => {
    try {
      await update(q, params)
      setError('')
      alert('Modifica eseguita correttamente')
    } catch (error) {
      setError(error)
      console.error(error)
    }
  }

  const renderServCommercialeForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([gestore, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Servizio commerciale"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {commercials.map((c: any) => (
            <SelectItem key={c.id} textValue={`${c.nome}, (${c.descrizione}), ${c.gestore}`}>
              {c.nome}, ({c.descrizione}), {c.gestore}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Nuovo gestore"
          value={gestore}
          onChange={(e) => setGestore(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderServSicurezzaForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([numAddetti, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Servizio sicurezza"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {securities.map((s: any) => (
            <SelectItem key={s.id} textValue={`${s.nome}, (${s.descrizione}), ${s.numeroAddettiRichiesti} addetti`}>
              {s.nome}, ({s.descrizione}), {s.numeroAddettiRichiesti} addetti
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Addetti richiesti"
          value={numAddetti}
          onChange={(e) => setNumAddetti(e.target.value)}
          isRequired
          min={0}
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderServTrasportoForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([tipo, linea, costo, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Servizio trasporto"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {transports.map((t: any) => (
            <SelectItem key={t.id} textValue={`${t.tipo} ${t.linea} - ${t.costoPerPersona} €`}>
              {t.tipo} {t.linea} - {t.costoPerPersona} €
            </SelectItem>
          ))}
        </Select>
        <Select
          className="flex-1"
          label="Nuovo tipo"
          isRequired
          isDisabled={selected == ''}
          selectedKeys={[tipo]}
          onChange={e => setTipo(e.target.value)}
        >
          <SelectItem key='navetta'>Navetta</SelectItem>
          <SelectItem key='bus'>Bus</SelectItem>
          <SelectItem key='treno'>Treno</SelectItem>
          <SelectItem key='tram'>Tram</SelectItem>
          <SelectItem key='taxi'>Taxi</SelectItem>
        </Select>
        <Input
          label="Nuova linea"
          value={linea}
          onChange={(e) => setLinea(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <Input
          type="number"
          step={0.1}
          label="Nuovo costo"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderVoloForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([partenza, arrivo, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Volo"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {flights.map((f: any) => (
            <SelectItem key={f.numeroVolo} textValue={`${f.numeroVolo}, ${f.partenza.toLocaleString('it-IT')} - ${f.arrivo.toLocaleString('it-IT')} (${f.nomeCompagnia})`}>
              {f.numeroVolo}, {f.partenza.toLocaleString('it-IT')} - {f.arrivo.toLocaleString('it-IT')} ({f.nomeCompagnia})
            </SelectItem>
          ))}
        </Select>
        <Input
          type="datetime-local"
          label="Nuova partenza"
          value={partenza}
          onChange={(e) => setPartenza(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <Input
          type="datetime-local"
          label="Nuovo arrivo"
          value={arrivo}
          onChange={(e) => setArrivo(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderDocumentoForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([tipo, numero, scadenza].concat(selected.split(',')))
        }}
      >
        <Select
          className="flex-1"
          label="Documento"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {documents.map((d: any) => (
            <SelectItem key={d.tipo + ',' + d.numero} textValue={`${d.tipo}, ${d.numero}, ${d.scadenza} - ${d.codiceFiscale}`}>
              {d.tipo}, {d.numero}, {d.scadenza} - {d.codiceFiscale}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Nuovo tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <Input
          label="Nuovo numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <Input
          type="date"
          label="Nuova scadenza"
          value={scadenza}
          onChange={(e) => setScadenza(e.target.value)}
          isRequired
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderBagaglioForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([stato, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Bagaglio"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {bags.map((b: any) => (
            <SelectItem key={b.id} textValue={`${b.numeroBiglietto}, ${b.descrizione} (${b.stato})`}>
              {b.numeroBiglietto}, {b.descrizione} ({b.stato})
            </SelectItem>
          ))}
        </Select>
        <Select
          className="flex-1"
          label="Nuovo stato"
          isRequired
          isDisabled={selected == ''}
          selectedKeys={[stato]}
          onChange={e => setStato(e.target.value)}
        >
          <SelectItem key='integro'>Integro</SelectItem>
          <SelectItem key='danneggiato'>Danneggiato</SelectItem>
          <SelectItem key='disperso'>Disperso</SelectItem>
        </Select>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderStipendioForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([stipendio, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Dipendente"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {employees.map((e: any) => (
            <SelectItem key={e.matricola} textValue={`${e.matricola} (${e.codiceFiscale}), ${e.stipendio} €`}>
              {e.matricola} ({e.codiceFiscale}), {e.stipendio} €
            </SelectItem>
          ))}
        </Select>
        <Input
          type="number"
          label="Nuovo stipendio"
          value={stipendio}
          onChange={(e) => setStipendio(e.target.value)}
          isRequired
          min={0}
          step={10}
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderAttesaForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([tempoAttesa, selected])
        }}
      >
        <Select
          className="flex-1"
          label="Servizio sicurezza"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {securities.map((s: any) => (
            <SelectItem key={s.id} textValue={`${s.nome}, (${s.descrizione}) - ${s.tempoMedioAttesa} min`}>
              {s.nome}, ({s.descrizione}) - {s.tempoMedioAttesa} min
            </SelectItem>
          ))}
        </Select>
        <Input
          type="number"
          label="Tempo attesa aggiornato"
          value={tempoAttesa}
          onChange={(e) => setTempoAttesa(e.target.value)}
          isRequired
          min={0}
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderParcheggiForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([postiOccupati].concat(selected.split(',')))
        }}
      >
        <Select
          className="flex-1"
          label="Parcheggio"
          isRequired
          selectedKeys={[selected]}
          onChange={e => setSelected(e.target.value)}
        >
          {parkings.map((p: any) => (
            <SelectItem key={p.longitudine + ',' + p.latitudine} textValue={`${p.nome}, occupazione ${p.postiOccupati}/${p.postiDisponibili}`}>
              {p.nome}, occupazione {p.postiOccupati}/{p.postiDisponibili}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="number"
          label="Posti occupati aggiornato"
          value={postiOccupati}
          onChange={(e) => setPostiOccupati(e.target.value)}
          isRequired
          min={0}
          isDisabled={selected == ''}
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Aggiorna</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderForm = () => {
    switch (q) {
      case 'u-serv-commerciale': return renderServCommercialeForm()
      case 'u-serv-sicurezza': return renderServSicurezzaForm()
      case 'u-serv-trasporto': return renderServTrasportoForm()
      case 'u-volo': return renderVoloForm()
      case 'u-documento': return renderDocumentoForm()
      case 'u-bagaglio': return renderBagaglioForm()
      case 'u-stipendio': return renderStipendioForm()
      case 'u-attesa': return renderAttesaForm()
      case 'u-parcheggi': return renderParcheggiForm()
      default: return null
    }
  }

  return (
    <div>
      {error ? <span className="error">error</span> : (
        <div>
          {renderForm()}
        </div>
      )}
    </div>
  );
};
