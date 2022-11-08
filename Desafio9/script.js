
 (function runScriptSqlite() {
    const knex = require('knex')({
        client: 'sqlite3',
        connection: { filename: './DB/ecommerce.sqlite' },
        useNullAsDefault: true,
    });


    knex.schema.hasTable('mensajes')
        .then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('mensajes', (table) => {
                    //table.string('author').notNullable();
                    //table.string('text').notNullable();
                    table.string('entities').notNullable();
                    table.string('result').notNullable();
                    table.increments('idNum');
                });
            } else {
                console.log('Table "mensajes" exists..')
            };
        })
        .then(() => {
            console.log('Command executed ..');
        })
        .catch((e) => {
            console.log(e);
        }).finally(() => {
            knex.destroy();
            console.log('Ending sqlite3 secuence ..');
            console.log('<------------------------->');
            //process.exit(0);
        });
    /* (function selectMsg() {
        knex
            .from('mensajes')
            .select('*')
            .then((rows) => {
                console.log(rows);
            });
    })(); */

})();

(function runScriptMysql() {

    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '12345',
            database: 'ecommerceProd'
        },
    });


    knex.schema.hasTable('productos')
        .then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('productos', (table) => {
                    table.string("title").notNullable();
                    table.float("price").notNullable();
                    table.string("thumbnail").notNullable();
                    table.increments("id");
                })
            } else {
                console.log(`Table "productos" exists..`);
            };
        })
        .then(() => {
            console.log('Command executed ..');
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            knex.destroy();
            console.log('Ending mysql secuence ..');
            
        });
})();