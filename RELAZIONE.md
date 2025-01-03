<h1 align="center"> Gestione aeroportuale </h1>
<p align="center"> 2024-12-27 </p>

<p align="center">
    Diego Barbieri <br>
    0001080333 <br>
    <diego.barbieri5@studio.unibo.it <br>
</p>
<p align="center">
    Ivan De Simone <br>
    0001069314 <br>
    ivan.desimone@studio.unibo.it<br>
</p>

# Indice

1. [Analisi dei requisiti](#analisi-dei-requisiti)
    1. [Requisiti in linguaggio naturale](#requisiti-in-linguaggio-naturale)
    2. [Glossario dei termini](#glossario-dei-termini)
    3. [Eliminazione delle Ambiguità](#eliminazione-delle-ambiguità)
    4. [Strutturazione dei requisiti](#strutturazione-dei-requisiti)
    5. [Specifica operazioni](#specifica-operazioni)
2. [Progettazione concettuale](#progettazione-concettuale)
    1. [Identificazione delle entità e relazioni](#identificazione-delle-entità-e-relazioni)
    2. [Scheletro dello schema ER](#scheletro-dello-schema-er)
    3. [Sviluppo delle componenti](#sviluppo-delle-componenti)
    4. [Unione delle componenti](#unione-delle-componenti)
    5. [Dizionario dei dati](#dizionario-dei-dati)
    6. [Regole aziendali](#regole-aziendali)
3. [Progettazione logica](#progettazione)
    1. [Tavole dei volumi e operazioni](#tavole-dei-volumi-e-operazioni)
    2. [Ristrutturazione schema logico](#ristrutturazione-schema-logico)
    3. [Normalizzazione](#normalizzazione)
    4. [Traduzione in modello relazionale](#traduzione-in-modello-relazionale)
4. [Codifica sql](#codifica-sql)
    1. [DDL](#ddl)
    2. [Codifica operazioni](#codifica-operazioni)
5. [Testing](#test)


## Analisi dei requisiti
### Requisiti in linguaggio naturale

Si vuole realizzare una base di dati per la gestione di aeroporti, con particolare attenzione alla gestione dei voli, dei passeggeri, dei lavoratori e dei servizi connessi. Nello specifico, si vuole memorizzare informazioni riguardanti aerei di tipologie cargo e passeggeri, i voli che essi effettuano, le merci e i passeggeri che viaggiano su di essi, i lavoratori che operano negli aeroporti e i servizi offerti da questi ultimi.

Per gli aeroporti sarà necessario mantenere il codice identificativo IATA e ICAO, il nome completo, la città e lo stato di appartenenza, il numero di posti aereo, separati in passeggeri e cargo. Oltre a ciò è fondamentale memorizzare i servizi offerti e i servizi di sicurezza. Riguardo gli aerei si vuole memorizzare la tipologia (passeggeri o cargo), il modello, l'identificativo, la compagnia aerea che lo possiede e la capienza.

Per quanto riguarda la gestione dei voli passeggeri, si vogliono memorizzare informazioni sui passeggeri tra le quali generalità (nome, cognome, data di nascita, nazionalità, un recapito telefonico e un indirizzo email), le compagnie aeree di cui sono clienti insieme al numero di km viaggiati con esse, i loro documenti di identità registrati ed i bagagli che trasportano. I bagagli si suddividono in bagagli a mano e bagagli da stiva. Di entrambi si vuole memorizzare il peso, le dimensioni (altezza, larghezza e profondità) e lo stato(disperso, danneggiato o integro). Dei bagagli da stiva si vuole inoltre mantenere una breve descrizione e un flag se è un animale. I voli devono essere memorizzati con il numero di volo, la data e l'ora di partenza e di arrivo, la compagnia aerea che lo opera, l'aereo utilizzato, l'aeroporto di partenza e di arrivo ed il personale a bordo.

Per quello che riguarda i voli cargo, si vogliono memorizzare numero di volo, data e ora di partenza e di arrivo contestualmente all'aeroporto, la compagnia logistica che lo opera, l'aereo utilizzato, il personale a bordo ed informazioni sul carico trasportato. Nello specifico, dei singoli pacchi si vuole memorizzare il peso, dimensioni (altezza, larghezza e profondità), contenuto e stato (medesimo del bagaglio).

La base di dati deve inoltre tenere traccia di tutti i dipendenti, distinguendo tra lavoratori degli aeroporti e lavoratori delle compagnie aeree/logistiche. I lavoratori presentano generalità uguali a quelle dei passeggeri, ma si vuole memorizzare anche la compagnia per cui lavorano, il ruolo che essi ricoprono e il loro stipendio.

Tra i servizi offerti dagli aeroporti si vuole memorizzare informazioni riguardanti le lounge, i parcheggi, i ristoranti e i negozi. Delle lounge si vuole mantenere la compagnia aerea che la mette a disposizione ed i posti disponibili. Dei parcheggi si vuole memorizzare l’ubicazione, il numero di posti disponibili, il costo orario ed il numero di posti occupati. Sarà inoltre necessario salvare tutti i servizi di trasporto che collegano l'aeroporto ai servizi esterni ad esso ed alle ulteriori infrastrutture urbanistiche. Dei ristoranti e dei negozi si vuole memorizzare il nome e il tipo di cucina o merce venduta. Gli esercizi commerciali possono essere gestiti da terzi, in tal caso si vuole memorizzare il nome del gestore. Per tutti i servizi è cruciale memorizzare i dipendenti.  I servizi di sicurezza devono essere memorizzati separatamente. Più precisamente, si vuole memorizzare il nome del servizio, il tempo medio di attesa e il numero di addetti, facendo distinzione tra addetti di sicurezza e addetti di controllo.

### Glossario dei termini

| Termine | Descrizione | Sinonimi | Collegamenti | 
| --------------- | --------------- | --------------- | --------------- | 
| Aeroporto | stazione di transito di aerei| - | Voli, Compagnie, Lavoratori, Servizi, Trasporti |
| Volo | descrizione transito tra due aeroporti distinti | - | Compagnia, Lavoratori, Aeroporti, Aereo |
| Areo | mezzo di trasporto | - | Passeggero, Volo, Lavoratori (hostess, pilota), Aeroporti, volo |
| Passeggero | cliente per una compagnia aerea, presente su almeno un volo | cliente | Volo, Identità | 
| Identità | si distinguono diversi tipi di documenti, come carta d’identità e/o passaporti. | documento | Passeggero, Lavoratore |
| Lavoratore | rappresenta il personale dell’aeroporto, tra cui piloti, hostess e steward. | hostess, steward, impiegato | Aeroporto, Volo, Compagnia, Servizi commerciali |
| Bagaglio | oggetto trasportabile in una tratta aerea e ne rappresenta il peso e la tipologia | valigia, borsa, zaino | Passeggero, Lavoratore |
| Compagnia aerea | gestisce il trasporto passeggeri. | - | Voli, Aerei |
| Compagnia logistica | si occupa della gestione degli aerei cargo e del trasporto merci. | - | Voli |
| Servizi commerciali | attività come ristorazione, negozi e altre strutture a servizio dei passeggeri. | - | Aeroporto |
| Servizi di sicurezza | servizi di controllo delle attività ordinarie all'interno dell'aeroporto | controllo bagagli, controllo documenti. | Aeroporto |
| Parcheggi |  aree di sosta per veicoli  | - | Aeroporto, Servizi di trasporto |
| Servizi di trasporto | mezzi di collegamento a servizi esterni all'aeroporto. | taxi, navette | Aeroporto, servizio commerciali, parcheggi |

### Eliminazione delle Ambiguità

- **Parcheggi**: per ubicazione si intende longitudine e latitudine, per posti disponibili si intende il numero di posti totali, per posti occupati si intende il numero di posti attualmente occupati.

### Strutturazione dei requisiti

#### *Frasi di carattere generale*

Si vuole realizzare una base di dati per la gestione di aeroporti, con particolare attenzione alla gestione dei voli, dei passeggeri, dei lavoratori e dei servizi connessi. Nello specifico, si vuole memorizzare informazioni riguardanti aerei di tipologie cargo e passeggeri, i voli che essi effettuano, le merci e i passeggeri che viaggiano su di essi, i lavoratori che operano negli aeroporti e i servizi offerti da questi ultimi.

#### *Frasi relative agli aeroporti*

Per gli aeroporti sarà necessario mantenere il codice identificativo IATA e ICAO, il nome completo, la città e lo stato di appartenenza, il numero di posti aereo, separati in passeggeri e cargo. Oltre a ciò è fondamentale memorizzare i servizi offerti e i servizi di sicurezza. Riguardo gli aerei si vuole memorizzare la tipologia (passeggeri o cargo), il modello, l'identificativo, la compagnia aerea che lo possiede e la capienza.


#### *Frasi relative ai passeggeri*

Per quanto riguarda la gestione dei voli passeggeri, si vogliono memorizzare informazioni sui passeggeri tra le quali generalità (nome, cognome, data di nascita, nazionalità, un recapito telefonico e un indirizzo email), le compagnie aeree di cui sono clienti insieme al numero di km viaggiati con esse, i loro documenti di identità registrati ed i bagagli che trasportano. 


#### *Frasi relative ai bagagli*

I bagagli si suddividono in bagagli a mano e bagagli da stiva. Di entrambi si vuole memorizzare il peso, le dimensioni (altezza, larghezza e profondità) e lo stato(disperso, danneggiato o integro). Dei bagagli da stiva si vuole inoltre mantenere una breve descrizione e un flag se è un animale.

#### *Frasi relative ai voli*

I voli devono essere memorizzati con il numero di volo, la data e l'ora di partenza e di arrivo, la compagnia aerea che lo opera, l'aereo utilizzato, l'aeroporto di partenza e di arrivo ed il personale a bordo.

#### *Frasi relative ai voli cargo*


Per quello che riguarda i voli cargo, si vogliono memorizzare numero di volo, data e ora di partenza e di arrivo contestualmente all'aeroporto, la compagnia logistica che lo opera, l'aereo utilizzato, il personale a bordo ed informazioni sul carico trasportato. Nello specifico, dei singoli pacchi si vuole memorizzare il peso, dimensioni (altezza, larghezza e profondità), contenuto e stato (medesimo del bagaglio).

#### *Frasi relative ai lavoratori*

La base di dati deve inoltre tenere traccia di tutti i dipendenti, distinguendo tra lavoratori degli aeroporti e lavoratori delle compagnie aeree/logistiche. I lavoratori presentano generalità uguali a quelle dei passeggeri, ma si vuole memorizzare anche la compagnia per cui lavorano, il ruolo che essi ricoprono e il loro stipendio.

#### *Frasi relative ai servizi*

Tra i servizi offerti dagli aeroporti si vuole memorizzare informazioni riguardanti le lounge, i parcheggi, i ristoranti e i negozi. Delle lounge si vuole mantenere la compagnia aerea che la mette a disposizione ed i posti disponibili. 



**Parcheggi** 

Dei parcheggi si vuole memorizzare l’ubicazione, il numero di posti disponibili, il costo orario ed il numero di posti occupati. 

**Servizi di trasporto**

Sarà inoltre necessario salvare tutti i servizi di trasporto che collegano l'aeroporto ai servizi esterni ad esso ed alle ulteriori infrastrutture urbanistiche.

**Servizi commerciali**

Dei ristoranti e dei negozi si vuole memorizzare il nome e il tipo di cucina o merce venduta. Gli esercizi commerciali possono essere gestiti da terzi, in tal caso si vuole memorizzare il nome del gestore. 

**Servizi di sicurezza** 

I servizi di sicurezza devono essere memorizzati separatamente. Più precisamente, si vuole memorizzare il nome del servizio, il tempo medio di attesa e il numero di addetti, facendo distinzione tra addetti di sicurezza e addetti di controllo.

### Specifica operazioni

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

## Riferimenti
- [voli al giorno](https://in3giorni.com/faq/quanti-aerei-decollano-da-malpensa-ogni-giorno)
- [voli in partenza al secondo](https://www.mytripmap.it/quanti-aerei-ci-sono-ora-in-volo-mappa-in-tempo-reale/)
- [codice aeroportuale IATA](https://it.wikipedia.org/wiki/Codice_aeroportuale_IATA)

