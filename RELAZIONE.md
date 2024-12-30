<h1 align="center"> Gestione areoporotuale </h1>
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

Si vuole realizzare una base di dati per la gestione di aereoporti, con particolare attenzione alla gestione dei voli, dei passeggeri, dei lavoratori e dei servizi connessi. Nello specifico, si vuole memorizzare informazioni riguardanti aerei di tipologie cargo e passeggeri, i voli che essi effettuano, i passeggeri che viaggiano su di essi, i lavoratori che operano negli aereoporti e i servizi offerti da questi ultimi.

Per quanto riguarda la gestione dei voli passeggeri, si vuole memorizzare informazioni riguardanti le generalità dei passeggeri (nome, cognome, data di nascita, nazionalità dei passeggeri, un recapito telefonico e un indirizzo email) e il loro documento di identità e il bagaglio che trasportano. I bagagli si suddividono in bagagli a mano e bagagli da stiva. Di questi ultimi si vuole memorizzare il peso e la descrizione. I voli devono essere memorizzati con il numero di volo, la data e l'ora di partenza e di arrivo, la compagnia aerea che lo opera, l'aereo utilizzato e l'aeroporto di partenza e di arrivo.

Per quello che riguarda i voli cargo, si vuole memorizzare informazioni riguardanti il carico trasportato. Nello specifico, dei singoli pacchi si vuole memorizzare il peso, dimensione e contenuto.

Verranno inoltre salvate le compagnie aeree che operano negli aereoporti. Di queste si vuole memorizzare il nome, il codice IATA e il codice ICAO.

La base di dati deve inoltre tenere traccia di tutti i dipendenti, distinguendo tra lavoratori degli aereoporti e lavoratori delle compagnie aeree. I lavoratori presentano genralità uguali a quelle dei passeggeri, ma si vuole memorizzare anche il ruolo che essi ricoprono e il loro stipendio.

Tra i servizi offerti dagli aereoporti si vuole memorizzare informazioni riguardanti i parcheggi, i ristoranti e i negozi. Dei parcheggi si vuole memorizzare il numero di posti disponibili, il costo orario, numero di posti occupati e lberi. Satà inoltre necessario salvare tutti i servizi di trasporto che collegano l'areoporto ai servizi esterni ad esso ed alle ulteriori infrastrutture urbanistiche. Dei ristoranti e dei negozi si vuole memorizzare il nome e il tipo di cucina o merce venduta. Gli esercizi commerciali possono essere gestiti da terzi, in tal caso si vuole memorizzare il nome del gestore. I servizi di sicurezza devono essere memorizzati separatamente. Più precisamente, si vuole memorizzare il nome del servizio e il numero di addetti, facendo distizione tra addetti di sicurezza e addetti di controllo.

### Glossario dei termini

| Termine | Descrizione | Sinonimi | Collegamenti | 
| --------------- | --------------- | --------------- | --------------- | 
| Areoporto | stazione di transito di aerei| - | Voli, Compagnie, Lavoratori, Servizi, Trasporti |
| Volo | descrizione transito tra due areoporti distinit | - | Compagnia, Lavoratori, Areoporti, Areo |
| Areo | mezzo di trasporto | - | Passeggero, Volo, Lavoratori (hostess, pilota), Areoporti, volo |
| Passeggero | cliente per una compagnia area, presente su almeno un volo | cliente | Volo, Identità | 
| Identità | si distinguono diversi tipi di documenti, come carta d’identità e/o passaporti. | documento | Passeggero, Lavoratore |
| Lavoratore | rappresenta il personale dell’aeroporto, tra cui piloti, hostess e steward. | hostess, steward, impiegato | Areoporto, Volo, Compagnia, Servizi commerciali |
| Bagaglio | oggetto trasportabile in una tratta aerea e ne rappresenta il peso e la tipologia | valigia, borsa, zaino | Passeggero, Lavoratore |
| Compagnia aerea | gestisce il trasporto passeggeri. | - | Voli, Aerei |
| Compagnia logistica | si occupa della gestione degli aerei cargo e del trasporto merci. | - | Voli |
| Servizi commerciali | attività come ristorazione, negozi e altre strutture a servizio dei passeggeri. | - | Areoporto |
| Servizi di sicurezza | servizi di controllo delle attività ordinarie all'interno dell'areoporto | controllo bagagli, controllo documenti. | Areoporto |
| Parcheggi |  aree di sosta per veicoli  | - | Areoporto, Servizi di trasporto |
| Servizi di trasporto | mezzi di collegamento a servizi esterni all'areoporto. | taxi, navette | Areoporto, servizio commerciali, parcheggi |

### Eliminazione delle Ambiguità

### Strutturazione dei requisiti



## Progettazione concettuale
