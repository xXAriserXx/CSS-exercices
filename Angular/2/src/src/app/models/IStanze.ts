export interface IStanza {
    id: number
    tipologia: "singola" | "doppia" | "tripla"
    descrizione: string
    prezzo: number
    disponibile: boolean
    button: undefined | HTMLButtonElement
}

