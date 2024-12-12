import { Component, ViewChild } from '@angular/core';
import { ItunesService } from '../services/itunes.service';
import { Ibrano } from '../models/Ibrano';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>; 

  constructor (private itunes:ItunesService) {}

  dati:Array<Ibrano>;
  opzioneScelta:number = 5;
  numeroOpzioni:Array<number> = [5, 10, 15, 20];
  request:string;
  inRiproduzione:boolean = false;
  durata:number;
  volume:number = 100;
  progresso:number;
  artista:string;
  nomeCanzone:string;
  genereInRiproduzione:string = "";

  makeRequest () :void {
    this.audio.nativeElement.pause();
    this.itunes.makeRequest(this.request, this.opzioneScelta).subscribe({
      next: (data) => {
        console.log(data)
        this.dati = data.results.map((item) => ({
          artista: item.artistName,
          nomeCanzone: item.trackName,
          immagineUrl: item.artworkUrl100,
          immagineUrlCopia: item.artworkUrl100,
          audioUrl: item.previewUrl,
          icona: "play.png",
          genere: item.primaryGenreName,
        }))

        this.dati = this.dati.slice(0, this.opzioneScelta)
      },
      error: (err) => {console.log(err)},
      complete: () => {console.log("completo")}
    })
  }



  play (brano) :void {
    brano.icona = "play.png";
    this.artista = brano.artista;
    this.nomeCanzone = brano.nomeCanzone;
    this.genereInRiproduzione = brano.genere ;
    if (this.audio.nativeElement.src == "" || this.audio.nativeElement.src !== brano.audioUrl) {  
      this.audio.nativeElement.src = brano.audioUrl;
      this.audio.nativeElement.play() ;
      this.inRiproduzione = true;
      brano.icona = "pause.png";
    } else if(this.inRiproduzione == false) {                            
      this.audio.nativeElement.play() ;
      this.inRiproduzione = true;
      brano.icona = "pause.png";
    } else {                                                              
      this.audio.nativeElement.pause() ;
      this.inRiproduzione = false;
      brano.icona = "play.png";
    }
    this.dati.filter(item => item != brano).forEach(item => {item.icona = "play.png"});
  }

  caricato () :void {
    this.durata = this.audio.nativeElement.duration;
  }

  aggiornamento() :void {
    this.progresso = (this.audio.nativeElement.currentTime/this.durata) * 100;
  }

  clickBarra (event:MouseEvent): void {
    const progressBar = event.currentTarget as HTMLElement;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left; 
    const width = progressBar.clientWidth; 
    const percentage = clickX / width; 
    const newTime = percentage * this.durata; 
    this.audio.nativeElement.currentTime = newTime; 
    this.progresso = percentage * 100; 
  }


  clickVolume(event: MouseEvent): void {
    const progressBar = event.currentTarget as HTMLElement;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left; 
    const width = progressBar.clientWidth; 
    const percentage = clickX / width; 
    const newVolume = Math.min(Math.max(percentage, 0), 1); 
    this.audio.nativeElement.volume = newVolume; 
    this.volume = newVolume * 100; 
}

  muta () :void {
    this.audio.nativeElement.volume = 0;
    this.volume = 0
  }
}
