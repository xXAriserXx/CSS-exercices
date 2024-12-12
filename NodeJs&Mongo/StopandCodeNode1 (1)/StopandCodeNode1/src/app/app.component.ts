import { Component } from '@angular/core'; 
import { QueueService } from './service/queue.service';
import { catchError, concatMap, EMPTY } from 'rxjs';

interface res { //interfaccia che prevede il tipo di dato che la response del backend emette
  message:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

constructor (private queue:QueueService) {} ///injection del QueueService per gestire le richieste http lato client


nome:string; //proprieta' del componente assocciato alla form tramite cui poi si invia il dato tramite il service al server
cognome:string; //come il nome
coda:any // proprieta' del componente associato al numero di posti disponibile tramite il service che dialoga con il server
message:string //proprieta' del componente a cui viene assegnato il valore della response del server tramite il service
type:string //proprieta' del componente a cui viene associato il successo o il fallimento di una richiesta http 
disponibili:number  // proprieta' del componente a cui viene associato il numero dei posti disponibili

ngOnInit() {
  this.queue.getList().subscribe(data => this.coda = data); //serve ad aggiornare la coda gia' al primo caricamento del componente
  this.close(); //serve ad aggiornare i posti disponibili gia' al primo caricamento del componente
}

emitMessage (message, type) { //funzione che semplifica l'assegnazione del messaggio e dello stato della richiesta quando si effettua una richiesta tramite il service
  this.message = message, 
  this.type = type
}


add() { //funzione che gestisce l'aggiunta di una persona alla alla coda
  this.queue.add(this.nome, this.cognome).pipe( // Pipe e' un metodo di rxjs che permette di usare piu' operatori (concatMap, catchError, EMPTY) per gestire il risultato di un'observable che e' in poche parole e' un oggetto che permette di gestire un flusso di dati in modo non istantaneo (asincrono)
    concatMap((res:res) => { //praticamente con concatMap posso gestire prima la response di this.queue.add() e poi posso restituire un nuovo observable che in questo caso avviera' this.queue.add()
      this.emitMessage(res.message, "Successo") //funzione emitMessagge() che assegna alle proprieta' 'message' e 'type' i parametri immessi quindi la response della richiesta e la stringa 'successo'
      return this.queue.getList(); // Viene restituito l'observable che verra' fornito da this.queue.getList()
    }),
    catchError((error) => { //catchError gestisce gli errori sia della richiesta di add() che di quelli di getList(). In questo in node sono stati gestiti solo gli errori della richiesta di add()
      if (error.status === 400 && error.error.message) { //Se lo stato dell'errore e' 400 ed esiste nella response dell'errore esiste una proprieta' chiamata messagge allora viene emesso message e type tramite la funzione emitMessage()
        console.error(error.error.message); 
        this.emitMessage(error.error.message, "Errore")
      }
      return EMPTY; //come con concatMap anche catchError restituisce un nuovo observable in caso di errore, ma dato che non voglio che succeda nulla resituisco EMPTY che e' praticamente un observable che non emette dati e si completa istantaneamente
    })
    ).subscribe(data => { //sottoscrizione all'observable che assegna alla coda il valore aggiornato
      this.coda = data;
      this.close() //funzione close per aggiornare il numero di posti disponibili
    })
}

  removePerson () { //funzione che gestisce la rimozione della prima persona nella coda
    this.queue.removePerson().pipe( //Utilizzo pipe per poter poi usare concatMap che mi permette di poi richiamare this.queue.getList() come fatto in precedenza
      concatMap((res:res) => { //processo analogo a quello usato per add
        this.emitMessage(res.message, "Successo")
        return this.queue.getList()
      }), 
      catchError((error) => { //gestione dell'errore meno precisa rispetto a come si e' svolta nella funzione add()
        this.emitMessage(error.error.message, "Errore");
        return EMPTY
      })
    ).subscribe(data => {
      this.coda = data;
      this.close()
    })
  }

  shuffle () { //stesso procedimento l'unica differenza e' che viene richiamata il metodo shuffleQueue() della queueService che mischia la coda
    this.queue.shuffleQueue().pipe(
      concatMap((res:res) => {
        this.emitMessage(res.message, "Successo")
        return this.queue.getList()
      }),
      catchError((error) => {
        this.emitMessage(error.error.message, "Errore")
        return EMPTY
      })
    ).subscribe(data => {
      this.coda = data;
      this.close()}
    )
  }

  close () { //funzione che aggiorna il valore della proprieta' 'disponibili' del componente
    this.queue.close().subscribe(
      data => this.disponibili = Number(data)
    )
  }


}
