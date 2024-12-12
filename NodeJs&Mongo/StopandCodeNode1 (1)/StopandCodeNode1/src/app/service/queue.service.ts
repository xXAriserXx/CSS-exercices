import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http:HttpClient) { }

  add (nome, cognome) {
    return this.http.post('http://localhost:3000/add', { nome: nome, cognome: cognome })
  }

  getList () {
    return this.http.get('http://localhost:3000/list')
  }

  removePerson () {
    return this.http.delete('http://localhost:3000/serve')
  }

  shuffleQueue () {
    return this.http.patch('http://localhost:3000/shuffle', null)
  }

  close () {
    return this.http.get('http://localhost:3000/close')
  }


}

/*
What do I want to do?
1-Whenever I make a post, delete, patch or list request I want to get the response that the requests sends,
2-After that I want said response to be stored and shared to the component instantly for it to display it.
3-The response stays there until a new response is made

How to achieve:
1: 

*/ 
