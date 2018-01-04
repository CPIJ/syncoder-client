import { Client } from "../model/client";

export class LocalContext {
    static set loggedInClient(client: Client) {
        localStorage.setItem("loggedInClient", JSON.stringify(client))
    }

    static get loggedInClient(): Client {
        return JSON.parse(localStorage.getItem("loggedInClient"));
    }
}
