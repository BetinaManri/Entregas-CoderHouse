const { optionsSql } = require("../config/mySql");
const knex = require("knex")(optionsSql);


class ContenedorProd {
    constructor(tableName) {
        this.tableName = tableName
    }

    
    async save(prod) {
        try {
            await knex(this.tableName)
                .insert(prod)
                .then(() => {
                    console.log("Producto guardado en la base de datos");
                }).catch((e) => {
                    console.log(e);
                });
        }
        catch (error) {
            throw new Error(error);
        }
    }

    
    async getById(id) {
        try {
            return await knex
                .from(this.tableName)
                .select('*')
                .where({ id: id })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            throw new Error(error);
        }
    }

    
    async getAll() {
        try {
            return await knex
                .from(this.tableName)
                .select("*")
                .catch((e) => {
                    console.log(e);
                });
        }
        catch (error) {
            throw new Error(error);
        }
    }

    
    async deleteById(idEliminado) {
        try {
            await knex(this.tableName)
                .where({ id: idEliminado })
                .del()
                .then(() => {
                    console.log("data deleted");
                }).catch((e) => {
                    console.log(e);
                });
        }
        catch (error) {
            throw new Error(error)
        }
    }
    
    async updateById(idAActualizar, update) {
        try {
            knex(this.tableName)
                .where({ id: idAActualizar })
                .update(update)
                .then(() => {
                    console.log("data updated");
                }).catch((e) => {
                    console.log(e);
                });
        }
        catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ContenedorProd;