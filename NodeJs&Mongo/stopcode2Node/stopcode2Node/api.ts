import express from "express";
import { coda } from "./db";
import { Filter, ObjectId } from "mongodb";
import { IPerson } from "./models/IModels";

const router = express.Router();

router.post("", async (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({ msg:"inserisci un nome" })
        return
    } 

    if (!req.body.cognome) {
        res.status(400).send({ msg:"inserisci un cognome" })
        return
    }

    try {
        
        const persona = await coda.insertOne({
            nome: req.body.nome,
            cognome: req.body.cognome,
            data: new Date(),
            servito: false
        })
        res.send ({ msg: persona.insertedId })

    }
    catch (e) {
        console.error(e);
        res.status(500).send({ esito: false })



    }
})

router.get("", async (req, res) => {
    const filter: Filter<IPerson> = {};

    const limit = 5
    let skip = 0
    let sort = {}

    if (req.query.servito) {
        if (req.query.servito === "true") {
            filter.servito = true;
        } 
        if (req.query.servito === "false") {
            filter.servito = false;
        }
    }

    if (req.query.sort_by) {
        sort = {
            [req.query.sort_by as string]: (req.query.sort_dir == "desc" ? -1 : 1)
        }
    }

    try {
        const response =  await coda.find (
            filter,
            {
                limit,
                skip,
                sort
            }
        ).toArray()
        res.send(response)
    } 
    catch (e) {
        res.status(500).send({ msg: "Impossibile leggere la coda" })
    }
})

router.get("/count", async (req, res) => {

    try {
        const nonServiti = await coda.countDocuments({servito : false})
        const serviti = await coda.countDocuments({servito : true})

        res.send({ 
            da_servire: nonServiti,
            servite: serviti
         })
    }
    catch (e) {
        res.status(500).send("errore")
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const oid = new ObjectId(req.params.id)
        const persona = await coda.findOneAndUpdate(
            { _id: oid},
            { $set: { servito: true }}
        ) 
        if (!persona) {
            res.status(404).send({ msg: "non trovato"})
            return
        }
        res.send({ msg:`${persona.nome} ${persona.cognome} e' stato servito`})
    } 
    catch {
        res.status(400).send({ msg: "identificativo non valido" })
    }
}) 









export const codaWs = router