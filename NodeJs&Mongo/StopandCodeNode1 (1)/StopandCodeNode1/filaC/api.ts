import express from "express"; //express e' tipo un mini framework per gestire applicazioni web e API in NodeJs
import bodyParser from "body-parser"; //Serve per convertire i dati delle richieste in oggetti accessibili da req.body
import { IPersona } from "./models/IPersona"; //Interfaccia modello del "queue" ossia interfaccia per cui tutti gli elementi di queue devono essere in un certo modo

const app = express(); //assegno una costante alla funzione express per poterne usarne i metodi

const cors = require('cors'); //ho aggiunto il modulo cors per gestire richieste da domini diversi da localhost:3000

app.use(cors()); 
app.use(bodyParser.json()); //rendo disponibile su tutta l'app il parsing dei dati, che vuol dire convertirli da json o urlEncoded a oggetti js

const queue:IPersona[] = []; //uso const per definire la costante queue in quanto poi dovro' solo modificarne gli oggetti contenuti
let count:number = 0; //numero di persone nella fila
let limit:number = 10; //limite di persone nella fila

app.post("/add", (req, res) => { //gestione della richiesta post sull'endpoint /add
    if (count >= limit) { //se il numero di parsone e' uguale o maggiore al limite allora non viene aggiunta nessuna persona e viene mandato un messaggio di errore
        res.status(400).send( {message: "Impossibile aggiungere alla coda, limite raggiunto"} )
        return
    }
    if(!req.body.nome || req.body.nome.length <= 2){ //se il nome inserito e' vuoto o ha meno di due caratteri allora viene mandato un errore e non viene aggiunta nessuna persona
        res.status(400).send({ message: `nome non valido`})
        return
    }
    if(!req.body.cognome || req.body.cognome.length <= 2){ // stessa cosa per il cognome
        res.status(400).send({ message: `cognome non valido`})
        return
    }

    if(queue.find(x => x.firstName == req.body.nome && x.lastName == req.body.cognome)){ //Se il nome e cognome inseriti sono gia' nella cosa non si aggiunge nessuna persona e viene mandato un errore
        res.status(400).send({ message: `persona gia' esistente`})
        return
    }

    queue.push({ //Qui viene aggiunto l'oggetto che deve essere di tipo IPersona alla "queue"
        id: Math.floor((new Date().getTime())/1000), //Id generato in base a quanti secondi sono passati dal 1 Gennaio 1970
        firstName: req.body.nome, //firstName e' il nome della proprieta' dell'oggetto IPersona che fara' parte della queue
        lastName: req.body.cognome, //lastName e' il cognome della proprieta' dell'oggetto IPersona che fara' parte della queue
    }) 

    count = queue.length //Aggiorno il valore del numero di persone nella queue dopo che' e' stata aggiunta una persona
    res.status(201).send( { message: `${req.body.nome} ${req.body.cognome} e' stato aggiunto alla coda`} ); // Se tutto procede correttamente viene inviato un messaggio di successo
})

app.delete("/serve", (req, res) => { // Gestione della richiesta delete sull'endpoint /serve che rimuove la prima persona da queue
    if (queue.length < 1) { //Se la lunghezza della coda e' minore di 1 allora non e' possibile rimuovere altre persone
        res.status(400).send({ message: "Non ci sono piu' persone da servire" })
        return
    }
    res.status(200).send({ message: `${queue[0].firstName} ${queue[0].lastName} e' stato servito` }) // Messaggio di successo in caso di successo
    queue.splice(0, 1); //rimozione della prima persona nella queue
    count = queue.length; //aggiornamento del numero di persone nella coda
})

app.get("/list", (req, res) => { //gestione della richiesta list sull'endpoint /list
    res.status(200).send(queue.map(({ firstName, lastName }) => ({firstName, lastName}))) // invia come risposta la lista delle persone in coda senza l'id
})

app.patch("/shuffle", (req, res) => { //gestione della richiesta patch sull'endpoint /shuffle, mischia la coda
    if (count < 1 || queue.length < 2) {
        res.status(400).send({ message: "Non ci sono abbastanza persone da mischiare" }) //se c'e' sola una persona da mischiare esce un errore perche' no si puo' mischiare una sola persona
        return
    }
    shuffleArray(queue) //funzione che mischia queue
    res.status(200).send({ message: "La coda e' stata mischiata", queue }) // messaggio di successo
})

app.get("/close", (req, res) => { //gestione della richiesta get sull'endpoint /close, ritorna il numero di posti disponibili
    res.status(200).send((limit - count).toString()) // calcolo del numero di posti disponibili, toString() necessario per rendere piu' esplicita la conversione da numero a stringa
})

app.listen(3000, () => { //necessario per avviare il server a cui fare le richieste http
    console.log("backend avviato")
})


function shuffleArray(arr) { //funzione che mischia la coda 
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
  return arr;
}
