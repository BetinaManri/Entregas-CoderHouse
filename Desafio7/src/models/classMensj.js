const { json } = require("express");
const {optionsLite} =require ("../config/sqlite")
const knex = require ("knex")(optionsLite)


class ContenedorMensj {
    //tomo base de datoos
    constructor(baseDatosMensj) {
        this.baseDatosMensj = baseDatosMensj;
    }

    saveMensaje(mensajes) {
        try {
            knex(this.baseDatosMensj)
                .insert(mensajes)
                .then(()=>{
                    console.log("Mensaje guardado en la base de datos")
                }).catch((e)=>{
                    console.log(e);
                });
        }
        catch (error) {
            throw new Error(error);
        }
    }

    getAll(){
        try {
            return knex
                .from(this.baseDatosMensj)
                .select("*")
                .catch((e)=>{
                    console.log(e)
                });
        } catch (error) {
            throw new Error (error)
        }
    }
}

module.exports=ContenedorMensj