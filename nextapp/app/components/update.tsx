'use client'

import { useState, useEffect } from "react";
import {
  update,
  selectAllFrom,
  selectCommercials,
  selectSecurities,
  selectParkings
} from "../actions/query";
import { datetimeToString, datetimeToDateString } from "../lib/date";
import {
  Alert,
  Form,
  Input,
  ButtonGroup,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

export default function Update({ q }: { q: string }) {
  const [success, setSuccess] = useState<string>('')
  const [error, setError] = useState<string>('')
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

  // prende i dati per scegliere la riga da modificare
  useEffect(() => {
    const fetchData = async () => {
      try {
        // prende solo i dati che servono in base alla query da eseguire
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
        console.error(error)
        setError('fetchData error')
        setTimeout(() => {
          setError('')
        }, 4000);
      }
    }

    fetchData()
  }, [])

  // quando viene selezionato un elemento popola il form con i suoi valori
  useEffect(() => {
    const prepareFields = () => {
      let x: any
      switch (q) {
        case 'u-serv-commerciale':
          x = commercials.filter((c: any) => c.id == selected)[0]
          setGestore(x?.gestore || '')
          break
        case 'u-serv-sicurezza':
          x = securities.filter((s: any) => s.id == selected)[0]
          setNumAddetti(x?.numeroAddettiRichiesti || '')
          break
        case 'u-serv-trasporto':
          x = transports.filter((t: any) => t.id == selected)[0]
          setTipo(x?.tipo || '')
          setLinea(x?.linea || '')
          setCosto(x?.costoPerPersona || '')
          break
        case 'u-volo':
          x = flights.filter((f: any) => f.numeroVolo == selected)[0]
          setPartenza(x?.partenza ? datetimeToString(x?.partenza) : '')
          setArrivo(x?.arrivo ? datetimeToString(x?.arrivo) : '')
          break
        case 'u-documento':
          x = documents.filter((d: any) => `${d.tipo},${d.numero}` == selected)[0]
          setTipo(x?.tipo || '')
          setNumero(x?.numero || '')
          setScadenza(x?.scadenza ? datetimeToDateString(x?.scadenza) : '')
          break
        case 'u-bagaglio':
          x = bags.filter((b: any) => b.id == selected)[0]
          setStato(x?.stato || '')
          break
        case 'u-stipendio':
          x = employees.filter((e: any) => e.matricola == selected)[0]
          setStipendio(x?.stipendio || '')
          break
        case 'u-attesa':
          x = securities.filter((s: any) => s.id == selected)[0]
          setTempoAttesa(x?.tempoMedioAttesa || '')
          break
        case 'u-parcheggi':
          x = parkings.filter((p: any) => `${p.longitudine},${p.latitudine}` == selected)[0]
          setPostiOccupati(x?.postiOccupati || '')
          break
      }
    }

    prepareFields()
  }, [selected])

  /**
   * Esegue la query di aggiornamento
   * 
   * @param params valori da inserire nella query
   */
  const fetchDb = async (params: string[]) => {
    try {
      await update(q, params)
      setError('')
      setSuccess('Modifica eseguita correttamente')
    } catch (error) {
      console.error(error)
      setSuccess('')
      setError('Errore nella modifica')
    }
  }

  /**
   * Renderizza i bottoni di reset e submit
   * 
   * @returns ButtonGroup con i Button
   */
  const renderButtons = () => {
    return(
      <ButtonGroup>
        <Button type='reset' color="primary" variant="flat">Reset</Button>
        <Button type='submit' color="primary">Aggiorna</Button>
      </ButtonGroup>
    )
  }

  /**
   * Renderizza il form di modifica servizio commerciale
   * 
   * @returns componente Form
   */
  const renderServizioCommercialeForm = () => {
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
            <SelectItem
              key={c.id}
              textValue={`${c.nome}, (${c.descrizione}), ${c.gestore}`}
            >
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica servizio di sicurezza
   * 
   * @returns componente Form
   */
  const renderServizioSicurezzaForm = () => {
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
            <SelectItem
              key={s.id}
              textValue={`${s.nome}, (${s.descrizione}), ${s.numeroAddettiRichiesti} addetti`}
            >
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica servizio di trasporto
   * 
   * @returns componente Form
   */
  const renderServizioTrasportoForm = () => {
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
            <SelectItem
              key={t.id}
              textValue={`${t.tipo} ${t.linea} - ${t.costoPerPersona} €`}
            >
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
          <SelectItem key='navetta' textValue="Navetta">Navetta</SelectItem>
          <SelectItem key='bus' textValue="Bus">Bus</SelectItem>
          <SelectItem key='treno' textValue="Treno">Treno</SelectItem>
          <SelectItem key='tram' textValue="Tram">Tram</SelectItem>
          <SelectItem key='taxi' textValue="Taxi">Taxi</SelectItem>
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica volo
   * 
   * @returns componente Form
   */
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
            <SelectItem
              key={f.numeroVolo}
              textValue={`${f.numeroVolo}, ${datetimeToString(f.partenza)} - ${datetimeToString(f.arrivo)} (${f.nomeCompagnia})`}
            >
              {f.numeroVolo}, {datetimeToString(f.partenza)} - {datetimeToString(f.arrivo)} ({f.nomeCompagnia})
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica documento
   * 
   * @returns componente Form
   */
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
            <SelectItem
              key={d.tipo + ',' + d.numero}
              textValue={`${d.tipo}, ${d.numero}, ${datetimeToDateString(d.scadenza)} - ${d.codiceFiscale}`}
            >
              {d.tipo}, {d.numero}, {datetimeToDateString(d.scadenza)} - {d.codiceFiscale}
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica bagaglio
   * 
   * @returns componente Form
   */
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
            <SelectItem
              key={b.id}
              textValue={`${b.numeroBiglietto}, ${b.descrizione} (${b.stato})`}
            >
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
          <SelectItem key='integro' textValue="Integro">Integro</SelectItem>
          <SelectItem key='danneggiato' textValue="Danneggiato">Danneggiato</SelectItem>
          <SelectItem key='disperso' textValue="Disperso">Disperso</SelectItem>
        </Select>
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica stipendio
   * 
   * @returns componente Form
   */
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
            <SelectItem
              key={e.matricola}
              textValue={`${e.matricola} (${e.codiceFiscale}), ${e.stipendio} €`}
            >
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica attesa
   * 
   * @returns componente Form
   */
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
            <SelectItem
              key={s.id}
              textValue={`${s.nome}, (${s.descrizione}) - ${s.tempoMedioAttesa} min`}
            >
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Renderizza il form di modifica parcheggio
   * 
   * @returns componente Form
   */
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
            <SelectItem
              key={p.longitudine + ',' + p.latitudine}
              textValue={`${p.nome}, occupazione ${p.postiOccupati}/${p.postiDisponibili}`}
            >
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
        {renderButtons()}
      </Form>
    )
  }

  /**
   * Decide quale form renderizzare in base alla query da eseguire
   * 
   * @returns componente Form da mostrare all'utente
   */
  const renderForm = () => {
    switch (q) {
      case 'u-serv-commerciale': return renderServizioCommercialeForm()
      case 'u-serv-sicurezza': return renderServizioSicurezzaForm()
      case 'u-serv-trasporto': return renderServizioTrasportoForm()
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
      {error ? (
        <div key='danger' className="w-full flex items-center my-3 fade-in">
          <Alert color='danger' variant="solid" title={error} />
        </div>
      ) : success ? (
        <div key='success' className="w-full flex items-center my-3 fade-in">
          <Alert color='success' variant="solid" title={success} />
        </div>
      ) : (
        <div className="fade-in">
          {renderForm()}
        </div>
      )}
    </div>
  );
};
