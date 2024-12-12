import {IStanza} from '../models/IStanze'

export const stanze: IStanza[]= [
    {
        id: 1,
        tipologia: "singola",
        descrizione: "Stanza singola non finestrata",
        prezzo: 70,
        disponibile: true,
        button: undefined,
    },
    {
        id: 2,
        tipologia: "singola",
        descrizione: "Stanza singola vista piscina",
        prezzo: 50,
        disponibile: true,
        button: undefined,
    },
    {
        id: 3,
        tipologia: "doppia",
        descrizione: "Stanza doppia matrimoniale",
        prezzo: 80,
        disponibile: true,
        button: undefined,
    },
    {
        id: 4,
        tipologia: "tripla",
        descrizione: "Stanza tripla con matrimoniale e letto singolo",
        prezzo: 140,
        disponibile: true,
        button: undefined,
    },
    {
        id: 5,
        tipologia: "doppia",
        descrizione: "Stanza doppia con due letti singoli",
        prezzo: 80,
        disponibile: true,
        button: undefined,
    },
    {
        id: 6,
        tipologia: "tripla",
        descrizione: "Stanza tripla con tre letti singoli",
        prezzo: 120,
        disponibile: true,
        button: undefined,
    }
]