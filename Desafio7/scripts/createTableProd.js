//Configuracion Productos

const { optionsSql } = require("../src/config/mySql");
const knex = require("knex")(optionsSql);

//Crear tabla Productos

knex.schema.hasTable('productos')
    .then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('productos', (table) => {
                table.string('Nombre', 50).notNullable();
                table.float('Precio', 5);
                table.string('URL');
                table.increments('id');
            })
        }
    })
    .then(() => {
        console.log('table created');
    }).catch((err) => {
        console.log(err);
    });