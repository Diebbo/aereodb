import Image from "next/image"
import clsx from 'clsx'
import { 
  Form,
  Button,
  Select,
  SelectItem
} from '@nextui-org/react'

export default function Home() {
  const operations = [
    { key: 'c', label: 'Inserimento'},
    { key: 'r', label: 'Ricerca'},
    { key: 'u', label: 'Modifica'},
    { key: 'd', label: 'Eliminazione'},
  ]

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
        <Form className="flex flex-row items-center">
          <Select label="Seleziona l'operazione">
            {operations.map((o) => (
              <SelectItem key={o.key}>{o.label}</SelectItem>
            ))}
          </Select>
          <Button type='reset'>Reset</Button>
          <Button type="submit">Esegui</Button>
        </Form>
      </main>
    </div>
  );
}
