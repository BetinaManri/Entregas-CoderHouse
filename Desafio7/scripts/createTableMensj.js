const knexSqlite = require("knex")({
    client: "sqlite3",
    connection: { filename: "../DB/ecommerce.sqlite" },
    useNullAsDefault: true,
})

//Crear tabla de Mensajes
knexSqlite.schema.createTable("mensajes", (table) => {
    table.string("Nombre");
    table.string("Hora");
    table.string("Mensaje");
    table.increments("id");
}).then(()=>{
    console.log("table created");
}).catch((err)=>{
    console.log(err);
});
 