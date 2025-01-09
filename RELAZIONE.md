<h1 align="center"> Gestione aeroportuale </h1>
<p align="center"> 2024-12-27 </p>

<p align="center">
    Diego Barbieri <br>
    0001080333 <br>
    diego.barbieri5@studio.unibo.it <br>
</p>
<p align="center">
    Ivan De Simone <br>
    0001069314 <br>
    ivan.desimone@studio.unibo.it <br>
</p>

# Indice

- [Indice](#indice)
  - [Analisi dei requisiti](#analisi-dei-requisiti)
    - [Requisiti in linguaggio naturale](#requisiti-in-linguaggio-naturale)
    - [Glossario dei termini](#glossario-dei-termini)
    - [Eliminazione delle Ambiguità](#eliminazione-delle-ambiguità)
    - [Strutturazione dei requisiti](#strutturazione-dei-requisiti)
      - [*Frasi di carattere generale*](#frasi-di-carattere-generale)
      - [*Frasi relative agli aeroporti*](#frasi-relative-agli-aeroporti)
      - [*Frasi relative agli aerei*](#frasi-relative-agli-aerei)
      - [*Frasi relative ai passeggeri*](#frasi-relative-ai-passeggeri)
      - [*Frasi relative ai bagagli*](#frasi-relative-ai-bagagli)
      - [*Frasi relative ai voli passeggeri*](#frasi-relative-ai-voli-passeggeri)
      - [*Frasi relative ai voli cargo*](#frasi-relative-ai-voli-cargo)
      - [*Frasi relative ai pacchi*](#frasi-relative-ai-pacchi)
      - [*Frasi relative ai lavoratori*](#frasi-relative-ai-lavoratori)
      - [*Frasi relative ai servizi*](#frasi-relative-ai-servizi)
    - [Specifica operazioni](#specifica-operazioni)
  - [Progettazione concettuale](#progettazione-concettuale)
    - [Identificazione delle entità e relazioni](#identificazione-delle-entità-e-relazioni)
    - [Scheletro dello schema ER (approccio top-down)](#scheletro-dello-schema-er-approccio-top-down)
    - [Sviluppo delle componenti (approccio inside-out)](#sviluppo-delle-componenti-approccio-inside-out)
    - [Unione delle componenti](#unione-delle-componenti)
    - [Dizionario dei dati](#dizionario-dei-dati)
  - [Progettazione logica](#progettazione-logica) TODO in giù
    - [Tavole dei volumi e delle operazioni](#tavole-dei-volumi-e-delle-operazioni)
    - [Ristrutturazione schema concettuale](#ristrutturazione-schema-concettuale)
    - [Normalizzazione](#normalizzazione)
    - [Traduzione verso il modello fisico](#traduzione-verso-il-modello-fisico)
  - [Codifica SQL](#codifica-sql)
    - [DDL](#ddl)
    - [DML](#dml)
  - [Testing](#testing)
  - [Riferimenti](#riferimenti)

## Analisi dei requisiti

### Requisiti in linguaggio naturale

Si vuole realizzare una base di dati per la gestione di aeroporti, con particolare attenzione alla gestione dei voli, dei passeggeri, dei lavoratori e dei servizi connessi. Nello specifico, si vuole memorizzare informazioni riguardanti aerei di tipologie cargo e passeggeri, i voli che essi effettuano, le merci e i passeggeri che viaggiano su di essi, i lavoratori che operano negli aeroporti e i servizi offerti da questi ultimi.

Per gli aeroporti sarà necessario mantenere il codice identificativo IATA e ICAO, il nome completo, la provincia e lo stato di appartenenza, il numero di posti aereo, separati in passeggeri e cargo. Oltre a ciò è fondamentale memorizzare i servizi offerti e i servizi di sicurezza. Riguardo gli aerei si vuole memorizzare la tipologia (passeggeri o cargo), il modello, l'identificativo, la compagnia aerea che lo possiede e la capienza.

Per quanto riguarda la gestione dei voli passeggeri, si vogliono memorizzare informazioni sui passeggeri tra le quali generalità (nome, cognome, data di nascita, nazionalità, un recapito telefonico e un indirizzo email), le compagnie aeree di cui sono clienti insieme al numero di km viaggiati con esse, i loro documenti di identità registrati ed i bagagli che trasportano. I bagagli si suddividono in bagagli a mano e bagagli da stiva. Di entrambi si vuole memorizzare il peso, le dimensioni (altezza, larghezza e spessore) e lo stato (disperso, danneggiato o integro). Dei bagagli da stiva si vuole inoltre mantenere una breve descrizione e un flag se è un animale. I voli devono essere memorizzati con il numero di volo, la data e l'ora di partenza e di arrivo, la compagnia aerea che lo opera, l'aereo utilizzato, l'aeroporto di partenza e di arrivo ed il personale a bordo.

Per quello che riguarda i voli cargo, si vogliono memorizzare numero di volo, data e ora di partenza e di arrivo contestualmente all'aeroporto, la compagnia logistica che lo opera, l'aereo utilizzato, il personale a bordo ed informazioni sul carico trasportato. Nello specifico, dei singoli pacchi si vuole memorizzare il peso, dimensioni (altezza, larghezza e spessore), contenuto e stato (medesimo del bagaglio).

La base di dati deve inoltre tenere traccia di tutti i dipendenti, distinguendo tra lavoratori degli aeroporti e lavoratori delle compagnie aeree/logistiche. I lavoratori presentano generalità uguali a quelle dei passeggeri, ma si vuole memorizzare anche la compagnia per cui lavorano, il ruolo che essi ricoprono e il loro stipendio.

Tra i servizi offerti dagli aeroporti si vuole memorizzare informazioni riguardanti le lounge, i parcheggi, i ristoranti e i negozi. Delle lounge si vuole mantenere la compagnia aerea che la mette a disposizione ed i posti disponibili. Dei parcheggi si vuole memorizzare l’ubicazione, il numero di posti disponibili, il costo orario ed il numero di posti occupati. Sarà inoltre necessario salvare tutti i servizi di trasporto che collegano l'aeroporto ai servizi esterni ad esso ed alle ulteriori infrastrutture urbanistiche. Dei ristoranti e dei negozi si vuole memorizzare il nome e il tipo di cucina o merce venduta. Gli esercizi commerciali possono essere gestiti da terzi, in tal caso si vuole memorizzare il nome del gestore. Per tutti i servizi è cruciale memorizzare i dipendenti.  I servizi di sicurezza devono essere memorizzati separatamente. Più precisamente, si vuole memorizzare il nome del servizio, il tempo medio di attesa e il numero di addetti, facendo distinzione tra addetti di sicurezza e addetti di controllo.

### Glossario dei termini

| Termine | Descrizione | Sinonimi | Collegamenti | 
| --------------- | --------------- | --------------- | --------------- | 
| Aeroporto | stazione di transito di aerei| - | Volo, Lavoratore, Servizio |
| Volo | transito tra due aeroporti distinti | viaggio | Aeroporto, Aereo, Lavoratore |
| Volo passeggeri | volo che trasporta persone | - | Volo, Passeggero, Compagnia aerea |
| Passeggero | cliente per una compagnia aerea, presente su almeno un volo | cliente | Volo passeggeri, Identità |
| Bagaglio | oggetto trasportabile in una tratta aerea | valigia, borsa, zaino | Passeggero, Lavoratore |
| Compagnia aerea | gestisce il trasporto passeggeri | - | Volo passeggeri, Aereo |
| Volo cargo | volo che trasporta merci | - | Volo, Pacco, Compagnia logistica |
| Pacco | contenitore per merci | - | Volo cargo |
| Compagnia logistica | si occupa della gestione degli aerei cargo e del trasporto merci | - | Volo cargo, Aereo |
| Aereo | mezzo di trasporto | aeromobile | Volo, Lavoratore (hostess, pilota), Aeroporto |
| Identità | documento che può essere di diversi tipi (carta d’identità, passaporto) | documento | Passeggero, Lavoratore |
| Lavoratore | personale dell’aeroporto o di volo, tra cui piloti, hostess e steward | hostess, steward, impiegato, dipendente | Aeroporto, Volo, Compagnia, Servizio |
| Servizio di sicurezza | servizio di controllo delle attività ordinarie all'interno dell'aeroporto | controllo bagagli, controllo documenti. | Aeroporto, Lavoratore |
| Servizio commerciale | attività come ristorazione, negozi e altre strutture a servizio dei passeggeri | - | Aeroporto, Lavoratore |
| Parcheggio | area di sosta per veicoli | - | Aeroporto, Servizio di trasporto |
| Servizio di trasporto | mezzo di collegamento a servizi esterni all'aeroporto | taxi, navetta | Aeroporto, Parcheggio |

### Eliminazione delle Ambiguità

- **Parcheggi**: per ubicazione si intende longitudine e latitudine, per posti disponibili si intende il numero di posti totali, per posti occupati si intende il numero di posti attualmente occupati.
- **Voli**: si identifica con volo un singolo viaggio tra due aeroporti, con aereo l'aeromobile utilizzato per il viaggio, con compagnia la società che opera il volo, con personale a bordo i lavoratori che operano durante il volo. Voli passeggeri e voli cargo si differenziano esclusivamente per entità trasportata e compagnia di gestione.
- **Passeggeri**: il passeggero è una persona nella base di dati, che ha comprato un biglietto per un volo, ha un documento di identità e può avere zero o più bagagli.

### Strutturazione dei requisiti

#### *Frasi di carattere generale*

Si vuole realizzare una base di dati per la gestione di aeroporti, con particolare attenzione alla gestione dei voli, dei passeggeri, dei lavoratori e dei servizi connessi. Nello specifico, si vuole memorizzare informazioni riguardanti aerei di tipologie cargo e passeggeri, i voli che essi effettuano, le merci e i passeggeri che viaggiano su di essi, i lavoratori che operano negli aeroporti e i servizi offerti da questi ultimi.

#### *Frasi relative agli aeroporti*

Per gli aeroporti sarà necessario mantenere il codice identificativo IATA e ICAO, il nome completo, la provincia e lo stato di appartenenza, il numero di posti aereo, separati in passeggeri e cargo. Oltre a ciò è fondamentale memorizzare i servizi offerti e i servizi di sicurezza.

#### *Frasi relative agli aerei*

Riguardo gli aerei si vuole memorizzare la tipologia (passeggeri o cargo), il modello, l'identificativo, la compagnia aerea che lo possiede e la capienza.

#### *Frasi relative ai passeggeri*

Per quanto riguarda la gestione dei voli passeggeri, si vogliono memorizzare informazioni sui passeggeri tra le quali generalità (nome, cognome, data di nascita, nazionalità, un recapito telefonico e un indirizzo email), le compagnie aeree di cui sono clienti insieme al numero di km viaggiati con esse, i loro documenti di identità registrati ed i bagagli che trasportano. 

#### *Frasi relative ai bagagli*

I bagagli si suddividono in bagagli a mano e bagagli da stiva. Di entrambi si vuole memorizzare il peso, le dimensioni (altezza, larghezza e spessore) e lo stato(disperso, danneggiato o integro). Dei bagagli da stiva si vuole inoltre mantenere una breve descrizione e un flag se è un animale.

#### *Frasi relative ai voli passeggeri*

I voli devono essere memorizzati con il numero di volo, la data e l'ora di partenza e di arrivo, la compagnia aerea che lo opera, l'aereo utilizzato, l'aeroporto di partenza e di arrivo ed il personale a bordo.

#### *Frasi relative ai voli cargo*

Per quello che riguarda i voli cargo, si vogliono memorizzare numero di volo, data e ora di partenza e di arrivo contestualmente all'aeroporto, la compagnia logistica che lo opera, l'aereo utilizzato, il personale a bordo ed informazioni sul carico trasportato.

#### *Frasi relative ai pacchi*

Nello specifico, dei singoli pacchi si vuole memorizzare il peso, dimensioni (altezza, larghezza e spessore), contenuto e stato (medesimo del bagaglio).

#### *Frasi relative ai lavoratori*

La base di dati deve inoltre tenere traccia di tutti i dipendenti, distinguendo tra lavoratori degli aeroporti e lavoratori delle compagnie aeree/logistiche. I lavoratori presentano generalità uguali a quelle dei passeggeri, ma si vuole memorizzare anche la compagnia per cui lavorano, il ruolo che essi ricoprono e il loro stipendio.

#### *Frasi relative ai servizi*

Tra i servizi offerti dagli aeroporti si vuole memorizzare informazioni riguardanti le lounge, i parcheggi, i ristoranti e i negozi.

Delle **lounge** si vuole mantenere la compagnia aerea che la mette a disposizione ed i posti disponibili. 

Dei **parcheggi** si vuole memorizzare l’ubicazione, il numero di posti disponibili, il costo orario ed il numero di posti occupati. 

Sarà inoltre necessario salvare tutti i **servizi di trasporto** che collegano l'aeroporto ai servizi esterni ad esso ed alle ulteriori infrastrutture urbanistiche.

Dei **ristoranti** e dei **negozi** si vuole memorizzare il nome e il tipo di cucina o merce venduta. Gli esercizi commerciali possono essere gestiti da terzi, in tal caso si vuole memorizzare il nome del gestore. 

I **servizi di sicurezza** devono essere memorizzati separatamente. Più precisamente, si vuole memorizzare il nome del servizio, il tempo medio di attesa e il numero di addetti, facendo distinzione tra addetti di sicurezza e addetti di controllo.

### Specifica operazioni

TODO: completare le stime

- Inserimenti
    - nuovo aeroporto (stima che dipende dal numero di aeroporti sotto lo stesso gestore)
    - nuovo volo (750 aerei al giorno)
    - nuovo aereo (100 all'anno)
    - nuovo passeggero (7 circa sette miliardi all'anno, contando duplicati)
    - nuovo lavoratore (1 volta al mese)
    - nuovo bagaglio (7 miliardi all'anno)
    - nuova compagnia aerea (1 ogni anno)
    - nuova compagnia logistica (1 ogni anno)

- Modifiche
    - esercizio commerciale aeroportuale
    - servizio di sicurezza
    - servizio di trasporto
    - volo: ritardo, cancellazione, cambio aereo
    - documenti di identità
    - stato bagaglio
    - stipendio lavoratore

- Cancellazioni
    - smantellamento aereo
    - cancellazione volo
    - invalidità documenti di identità
    - licenziamento lavoratore
    - smarrimento bagaglio

- Ricerche
    - voli in partenza
    - voli in arrivo
    - lavoratori aeroportuali
    - lavoratori compagnie aeree
    - lavoratori compagnie logistiche
    - passeggeri
    - bagagli
    - merci trasportate
    - servizi aeroportuali
    - servizi di sicurezza
    - servizi di trasporto
    - stato parcheggi

## Progettazione concettuale

### Identificazione delle entità e relazioni

Sono state identificate inizialmente le entità principali: aeroporto, aereo, volo, compagnia, persona, servizio. L'entità volo è specializzabile in volo passeggeri e volo cargo. Similmente l'entità compagnia può essere espressa come compagnia aerea e compagnia logistica. Sono state poi secondariamente identificate le entità passeggero e dipendente, derivate da persona, e le entità bagaglio e pacco. Oltre a ciò si suddividono i servizi in sicurezza, lounge, parcheggi, trasporti e commerciali.

### Scheletro dello schema ER (approccio top-down)

```mermaid
erDiagram
    AEROPORTO ||--|{ SERVIZIO: "dispone"
    VOLO }|--|| AEROPORTO: "parte"
    VOLO }|--|| AEROPORTO: "arriva"
    VOLO }|--|| AEREO: "usa"
    VOLO }o--o{ PERSONA: "trasporta"
    COMPAGNIA ||--|{ AEREO: "possiede" 
    COMPAGNIA ||--|{ VOLO: "organizza"
    PERSONA }|--|{ VOLO: "lavora"
    PERSONA }|--|| COMPAGNIA: "lavora"
    PERSONA }|--|| SERVIZIO: "lavora"
```

### Sviluppo delle componenti (approccio inside-out)

Servizi aeroportuali e servizi di sicurezza.

```mermaid
erDiagram 
    AEROPORTO ||--|{ SERVIZIOSICUREZZA: "fornisce"
    AEROPORTO ||--o{ SERVIZIOTRASPORTO: "fornisce"
    AEROPORTO ||--|{ SERVIZIOCOMMERCIALE: "fornisce"

    SERVIZIO ||--|| SERVIZIOSICUREZZA: "e'"
    SERVIZIO ||--|| SERVIZIOTRASPORTO: "e'"
    SERVIZIO ||--|| SERVIZIOCOMMERCIALE: "e'"
    SERVIZIO ||--|| PARCHEGGIO: "e'"
    SERVIZIOTRASPORTO }|--|{ PARCHEGGIO: "collega"

    SERVIZIOCOMMERCIALE ||--o| RISTORANTE: "composto"
    SERVIZIOCOMMERCIALE ||--o| NEGOZIO: "comprende"
```

Voli passeggeri.

```mermaid
erDiagram
    VOLO }|--|| AEREO: "usa"
    VOLO }|--|| AEROPORTO: "parte da"
    VOLO }|--|| AEROPORTO: "arriva a"

    VOLOPASSEGGERI ||--|| VOLO: "è un"
    VOLOPASSEGGERI ||--o{ PASSEGGERO: "trasporta"

    COMPAGNIA ||--|{ VOLO: "opera"
    COMPAGNIA ||--|{ AEREO: "possiede"

    PASSEGGERO ||--|| PERSONA: "è un"
    PASSEGGERO ||--|{ DOCUMENTO: "identificato da"
    PASSEGGERO ||--o{ BAGAGLIO: "trasporta"

    DIPENDENTE ||--|{ DOCUMENTO: "identificato da"
    DIPENDENTE }|--o| SERVIZIO: "lavora per"
    DIPENDENTE }|--o{ VOLOPASSEGGERI: "assegnato a"
    DIPENDENTE ||--|| PERSONA: "è un"
    DIPENDENTE }|--o| COMPAGNIA: "lavora per"

    PERSONA {
        int id PK
        string nome
        string cognome
        date dataNascita
        string numeroTelefono
        string email
    }
    DIPENDENTE {
        enum mansione
        date dataAssunzione
        float stipendio
    }
    PASSEGGERO {
        string classeViaggio
        string numeroBiglietto
    }
    DOCUMENTO {
        enum Tipo
        int numero
    }
    BAGAGLIO {
        float peso
        float altezza
        float larghezza
        float spessore
        enum stato "disperso, danneggiato o integro"
    }
    VOLOPASSEGGERI {
    }
    VOLO {
        string numeroVolo PK
        date partenza
        date arriva
    }
    AEROPORTO {
        string IATA PK
        string ICAO PK
        string nome
        string provincia
        string stato
        int postiAereoPasseggeri
        int postiAereoCargo
    }
    AEREO {
        enum tipologia "passeggeri o cargo"
        string modello
        string id PK
        int capienza "n° posti o t di stiva"
        int postiPasseggeri
        int postiPersonale
        int volumeStiva
    }

    COMPAGNIA {
        string nome PK
        string sede
    }
```

Volo e connessi (in particolare voli cargo).

```mermaid
erDiagram
    VOLO }|--|| AEROPORTO: "parte da"
    VOLO }|--|| AEROPORTO: "arriva a"
    VOLO }|--|| AEREO: usa

    COMPAGNIA ||--|{ VOLO: opera
    COMPAGNIA ||--|{ AEREO: possiede

    DIPENDENTE }|--|{ VOLO: "assegnato a"
    DIPENDENTE }|--|| COMPAGNIA: "lavora per"
    DIPENDENTE ||--|| PERSONA: "è una"

    VOLOPASSEGGERI ||--|| VOLO: "è un"

    VOLOCARGO ||--|| VOLO: "è un"
    VOLOCARGO ||--o{ PACCO: trasporta

    VOLO {
        string numeroVolo PK
        date partenza
        date arriva
    }
    AEROPORTO {
        string IATA PK
        string ICAO PK
        string nome
        string provincia
        string stato
        int postiAereoPasseggeri
        int postiAereoCargo
    }
    AEREO {
        enum tipologia "passeggeri o cargo"
        string modello
        string id PK
        int capienza "n° posti o t di stiva"
    }
    VOLOCARGO {
        string carico
    }
    PACCO {
        float peso
        float altezza
        float larghezza
        float spessore
        string contenuto
        enum stato "disperso, danneggiato o integro"
    }
```

### Unione delle componenti

TODO: unire le componenti in un unico schema (ivan)

### Dizionario dei dati

## Riferimenti
- [voli al giorno](https://in3giorni.com/faq/quanti-aerei-decollano-da-malpensa-ogni-giorno)
- [voli in partenza al secondo](https://www.mytripmap.it/quanti-aerei-ci-sono-ora-in-volo-mappa-in-tempo-reale/)
- [codice aeroportuale IATA](https://it.wikipedia.org/wiki/Codice_aeroportuale_IATA)
- [ER](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)
