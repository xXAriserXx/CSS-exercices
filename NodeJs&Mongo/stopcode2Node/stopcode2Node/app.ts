import express from "express"
import cors from "cors"
import { codaWs } from "./api";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/coda", codaWs)

app.listen(3000, () => {
    console.log("Backend avviato e in ascolto sulla porta 3000")
}) 