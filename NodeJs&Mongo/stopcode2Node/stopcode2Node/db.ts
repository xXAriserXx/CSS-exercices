import { MongoClient } from "mongodb";
import { IPerson } from "./models/IModels";

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("StopAndCode2");

export const coda = db.collection<IPerson>("coda")