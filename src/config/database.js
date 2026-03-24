import { connect } from "mongoose";
import { env } from "./env.js";

export default class mongoSingleton {
    static #instance;
    constructor(){
        connect(env.MONGO_URL);
    }

    static getInstance(){
        if(this.#instance){
            console.log("Ya existe una conexion a db");
            return this.#instance;
        }else{
            this.#instance = new mongoSingleton();
            console.log("Conectado a db");
            return this.#instance;
        }
    }
}