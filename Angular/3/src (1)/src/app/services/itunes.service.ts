import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs'; //RxJs è una famosa libreria Javascript - Reactive Extensions for Javascript. Parliamo di Reactive Programming o Programmazione Reattiva. quando parliamo di programmazione reattiva e di RxJs diciamo che uno degli oggetti più importanti di questa libreria è l'Observable. Questo oggetto rappresentsa un flusso di dati che viene restituito in un intervallo di tempo 

//HttpClient è una risorsa che espone i metodi gt, post, etc necessari per fare le request / respponse ajax
import { HttpClient } from '@angular/common/http';
import { Ibrano } from '../models/Ibrano';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {

  constructor(private http: HttpClient) {}

  mandaCanzoneEvent = new EventEmitter<Ibrano>();
  mandaAudioEvent = new EventEmitter<HTMLAudioElement>();

  private apiRootUrl:string = "https://itunes.apple.com/search?" //la parte "costante" della stringa di richiesta

  makeRequest(request:string, opzioneScelta:number):Observable<any>{
    console.log(`${this.apiRootUrl}term=${request}&media=music&limit=${opzioneScelta}`);
    return this.http.get(`${this.apiRootUrl}term=${request}&media=music&limit=${opzioneScelta}`);
  }

  mandaBrano (brano:Ibrano) {
    this.mandaCanzoneEvent.emit(brano);
  }

  mandaAudio (canzone:HTMLAudioElement) {
    this.mandaAudioEvent.emit(canzone)
  }


}
