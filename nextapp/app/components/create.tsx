'use client'

import { useState, useEffect } from "react";
import { create, selectAllFrom } from "../actions/query";
import {
  Form,
  Input,
  ButtonGroup,
  Button,
  Select,
  SelectItem,
  Checkbox
} from "@nextui-org/react";

export default function Create({ q }: { q: string }) {
  const [error, setError] = useState<any>('')
  // campi dei form
  const [iata, setIata] = useState<string>('')
  const [icao, setIcao] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [provincia, setProvincia] = useState<string>('')
  const [stato, setStato] = useState<string>('')
  const [postiAereoPasseggeri, setPostiAereoPasseggeri] = useState<string>('0')
  const [postiAereoCargo, setPostiAereoCargo] = useState<string>('0')
  const [numVolo, setNumVolo] = useState<string>('')
  const [partenza, setPartenza] = useState<string>('')
  const [arrivo, setArrivo] = useState<string>('')
  const [aeroportoPartenza, setAeroportoPartenza] = useState<string>('')
  const [aeroportoArrivo, setAeroportoArrivo] = useState<string>('')
  const [compagnia, setCompagnia] = useState<string>('')
  const [aereo, setAereo] = useState<string>('')
  const [numBiglietto, setNumBiglietto] = useState<string>('')
  const [classe, setClasse] = useState<string>('')
  const [posto, setPosto] = useState<string>('')
  const [persona, setPersona] = useState<string>('')
  const [volo, setVolo] = useState<string>('')
  const [matricola, setMatricola] = useState<string>('')
  const [assunzione, setAssunzione] = useState<string>('')
  const [stipendio, setStipendio] = useState<string>('')
  const [peso, setPeso] = useState<string>('')
  const [altezza, setAltezza] = useState<string>('')
  const [larghezza, setLarghezza] = useState<string>('')
  const [spessore, setSpessore] = useState<string>('')
  const [descrizione, setDescrizione] = useState<string>('')
  const [animale, setAnimale] = useState<boolean>(false)
  const [passeggero, setPasseggero] = useState<string>('')
  const [contenuto, setContenuto] = useState<string>('')
  const [sede, setSede] = useState<string>('')
  // dati per le FKs
  const [airports, setAirports] = useState<any>([])
  const [companies, setCompanies] = useState<any>([])
  const [planes, setPlanes] = useState<any>([])
  const [people, setPeople] = useState<any>([])
  const [flights, setFlights] = useState<any>([])
  const [passengers, setPassengers] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (q == 'c-volo') setAirports(await selectAllFrom('aeroporto'))
        if (q == 'c-volo') setCompanies(await selectAllFrom('compagnia'))
        if (q == 'c-volo') setPlanes(await selectAllFrom('aereo'))
        if (q == 'c-passeggero' || q == 'c-lavoratore') setPeople(await selectAllFrom('persona'))
        if (q == 'c-passeggero' || q == 'c-pacco') setFlights(await selectAllFrom('volo'))
        if (q == 'c-bagaglio') setPassengers(await selectAllFrom('bagaglio'))
        setError('')
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [])

  const fetchDb = async (params: string[]) => {
    try {
      await create(q, params)
      setError('')
      alert('Inserimento eseguito correttamente')
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  const renderAeroportoForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([iata, icao, nome, provincia, stato, postiAereoPasseggeri, postiAereoCargo])
        }}
      >
        <Input
          label="Codice IATA"
          value={iata}
          onChange={(e) => setIata(e.target.value)}
          maxLength={3}
          isRequired
        />
        <Input
          label="Codice ICAO"
          value={icao}
          onChange={(e) => setIcao(e.target.value)}
          maxLength={4}
          isRequired
        />
        <Input
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          isRequired
        />
        <Input
          label="Provincia"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          isRequired
        />
        <Input
          label="Stato"
          value={stato}
          onChange={(e) => setStato(e.target.value)}
          isRequired
        />
        <Input
          type="number"
          label="Posti aereo passeggeri"
          value={postiAereoPasseggeri}
          onChange={(e) => setPostiAereoPasseggeri(e.target.value)}
          min={0}
          isRequired
        />
        <Input
          type="number"
          label="Posti aereo cargo"
          value={postiAereoCargo}
          onChange={(e) => setPostiAereoCargo(e.target.value)}
          min={0}
          isRequired
        />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
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
          await fetchDb([numVolo, partenza, arrivo].concat(aeroportoArrivo.split(',')).concat(aeroportoPartenza.split(',')).concat([compagnia, aereo]))
        }}
      >
        <Input
          label="Numero volo"
          value={numVolo}
          onChange={(e) => setNumVolo(e.target.value)}
          maxLength={6}
          isRequired
        />
        <Input
          type="datetime-local"
          label="Data e ora partenza"
          value={partenza}
          onChange={(e) => setPartenza(e.target.value)}
          isRequired
        />
        <Input
          type="datetime-local"
          label="Data e ora arrivo"
          value={arrivo}
          onChange={(e) => setArrivo(e.target.value)}
          isRequired
        />
        <Select
          className="flex-1"
          label="Aeroporto partenza"
          isRequired
          selectedKeys={[aeroportoPartenza]}
          onChange={e => setAeroportoPartenza(e.target.value)}
        >
          {airports.map((a: any) => (
            <SelectItem key={a.IATA + ',' + a.ICAO} textValue={`${a.nome} (${a.provincia}, ${a.IATA} - ${a.ICAO})`}>
              {a.nome} ({a.provincia}, {a.IATA} - {a.ICAO})
            </SelectItem>
          ))}
        </Select>
        <Select
          className="flex-1"
          label="Aeroporto arrivo"
          isRequired
          selectedKeys={[aeroportoArrivo]}
          onChange={e => setAeroportoArrivo(e.target.value)}
        >
          {airports.map((a: any) => (
            <SelectItem key={a.IATA + ',' + a.ICAO} textValue={`${a.nome} (${a.provincia}, ${a.IATA} - ${a.ICAO})`}>
              {a.nome} ({a.provincia}, {a.IATA} - {a.ICAO})
            </SelectItem>
          ))}
        </Select>
        <Select
          className="flex-1"
          label="Compagnia"
          isRequired
          selectedKeys={[compagnia]}
          onChange={e => setCompagnia(e.target.value)}
        >
          {companies.map((c: any) => (
            <SelectItem key={c.nome} textValue={`${c.nome}`}>
              {c.nome}
            </SelectItem>
          ))}
        </Select>
        <Select
          className="flex-1"
          label="Aereo"
          isRequired
          selectedKeys={[aereo]}
          onChange={e => setAereo(e.target.value)}
        >
          {planes.map((p: any) => (
            <SelectItem key={p.numeroDiSerie} textValue={`${p.modello} (${p.nomeCompagnia}), ${p.tipologia}`}>
              {p.modello} ({p.nomeCompagnia}), {p.tipologia}
            </SelectItem>
          ))}
        </Select>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderPasseggeroForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([numBiglietto, classe, posto, persona, volo])
        }}
      >
        <Input
          label="Numero biglietto"
          value={numBiglietto}
          onChange={(e) => setNumBiglietto(e.target.value)}
          maxLength={6}
          isRequired
        />
        <Input
          label="Classe viaggio"
          value={classe}
          onChange={(e) => setClasse(e.target.value)}
          isRequired
        />
        <Input
          label="Posto"
          value={posto}
          onChange={(e) => setPosto(e.target.value)}
          isRequired
        />
        <Select
          className="flex-1"
          label="Persona"
          isRequired
          selectedKeys={[persona]}
          onChange={e => setPersona(e.target.value)}
        >
          {people.map((p: any) => (
            <SelectItem key={p.codiceFiscale} textValue={`${p.nome} ${p.cognome} (${p.codiceFiscale})`}>
              {p.nome} {p.cognome} ({p.codiceFiscale})
            </SelectItem>
          ))}
        </Select>
        <Select
          className="flex-1"
          label="Volo"
          isRequired
          selectedKeys={[volo]}
          onChange={e => setVolo(e.target.value)}
        >
          {flights.map((f: any) => (
            <SelectItem key={f.numeroVolo} textValue={`${f.numeroVolo} - ${f.nomeCompagnia}`}>
              {f.numeroVolo} - {f.nomeCompagnia}
            </SelectItem>
          ))}
        </Select>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderLavoratoreForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([matricola, assunzione, stipendio, persona])
        }}
      >
        <Input
          label="Matricola"
          value={matricola}
          onChange={(e) => setMatricola(e.target.value)}
          maxLength={6}
          isRequired
        />
        <Input
          type="datetime-local"
          label="Data assunzione"
          value={assunzione}
          onChange={(e) => setAssunzione(e.target.value)}
          isRequired
        />
        <Input
          type="number"
          label="Stipendio mensile"
          value={stipendio}
          onChange={(e) => setStipendio(e.target.value)}
          min={0}
          isRequired
        />
        <Select
          className="flex-1"
          label="Persona"
          isRequired
          selectedKeys={[persona]}
          onChange={e => setPersona(e.target.value)}
        >
          {people.map((p: any) => (
            <SelectItem key={p.codiceFiscale} textValue={`${p.nome} ${p.cognome} (${p.codiceFiscale})`}>
              {p.nome} {p.cognome} ({p.codiceFiscale})
            </SelectItem>
          ))}
        </Select>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
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
          await fetchDb([peso, altezza, larghezza, spessore, 'integro', descrizione, animale ? 'TRUE' : 'FALSE', passeggero])
        }}
      >
        <Input
          type="number"
          label="Peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          step={.01}
          isRequired
        />
        <Input
          type="number"
          label="Altezza"
          value={altezza}
          onChange={(e) => setAltezza(e.target.value)}
          isRequired
        />
        <Input
          type="number"
          label="Larghezza"
          value={larghezza}
          onChange={(e) => setLarghezza(e.target.value)}
          isRequired
        />
        <Input
          type="number"
          label="Spessore"
          value={spessore}
          onChange={(e) => setSpessore(e.target.value)}
          isRequired
        />
        <Input
          label="Descrizione"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
          isRequired
        />
        <Checkbox
          isSelected={animale}
          onValueChange={setAnimale}
          color="primary"
        >
          È un animale
        </Checkbox>
        <Select
          className="flex-1"
          label="Passeggero"
          isRequired
          selectedKeys={[passeggero]}
          onChange={e => setPasseggero(e.target.value)}
        >
          {passengers.map((p: any) => (
            <SelectItem key={p.numeroBiglietto} textValue={`${p.numeroBiglietto} (${p.codiceFiscale})`}>
              {p.numeroBiglietto} ({p.codiceFiscale})
            </SelectItem>
          ))}
        </Select>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderPaccoForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([peso, altezza, larghezza, spessore, contenuto, 'integro', volo])
        }}
      >
        <Input
          type="number"
          label="Peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          step={.01}
          isRequired
        />
        <Input
          type="number"
          label="Altezza"
          value={altezza}
          onChange={(e) => setAltezza(e.target.value)}
          isRequired
        />
        <Input
          type="number"
          label="Larghezza"
          value={larghezza}
          onChange={(e) => setLarghezza(e.target.value)}
          isRequired
        />
        <Input
          type="number"
          label="Spessore"
          value={spessore}
          onChange={(e) => setSpessore(e.target.value)}
          isRequired
        />
        <Input
          label="Contenuto"
          value={contenuto}
          onChange={(e) => setContenuto(e.target.value)}
          isRequired
        />
        <Select
          className="flex-1"
          label="Volo"
          isRequired
          selectedKeys={[volo]}
          onChange={e => setVolo(e.target.value)}
        >
          {flights.map((f: any) => (
            <SelectItem key={f.numeroVolo} textValue={`${f.numeroVolo} - ${f.nomeCompagnia}`}>
              {f.numeroVolo} - {f.nomeCompagnia}
            </SelectItem>
          ))}
        </Select>
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderCompagniaForm = () => {
    return(
      <Form
        className="flex flex-col items-center gap-4 w-full max-w-md"
        validationBehavior="native"
        onSubmit={async e => {
          e.preventDefault()
          await fetchDb([nome, sede])
        }}>
          <Input
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            isRequired
          />
          <Input
            label="Sede"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            isRequired
          />
        <ButtonGroup>
          <Button type='reset' color="primary" variant="flat">Reset</Button>
          <Button type='submit' color="primary">Crea</Button>
        </ButtonGroup>
      </Form>
    )
  }

  const renderForm = () => {
    switch (q) {
      case 'c-aeroporto': return renderAeroportoForm()
      case 'c-volo': return renderVoloForm()
      case 'c-passeggero': return renderPasseggeroForm()
      case 'c-lavoratore': return renderLavoratoreForm()
      case 'c-bagaglio': return renderBagaglioForm()
      case 'c-pacco': return renderPaccoForm()
      case 'c-compagnia': return renderCompagniaForm()
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
