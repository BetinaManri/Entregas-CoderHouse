const handlebars = require("express-handlebars");
const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { Socket } = require("dgram");

const app = express();


const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, () => console.log("servidor Levantado"));

app.use(express.static("./public"));


const Contenedor = require("./api/Clase");
const nombreDelArchivo = "Productos";
const cont = new Contenedor(nombreDelArchivo);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");


//GET '/api/productos' -> devuelve todos los productos
app.get("/", async (req, res) => {
     /* res.json({ Productos: await cont.getAll() }); */
     let productos = await cont.getAll();
    res.render("formulario", { productos });
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
app.get("/:id", async (req, res) => {
    const productos = req.params.id
    const productosPorID = await cont.getById(productos)
    if (isNaN(productos)) {
        res.json({ error: "401 El parametro no es un número" });
    } else {
        productosPorID == null  
            ? res.json({ error: "404 Producto no encontrado" })
            : res.json(productosPorID);
    }
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
app.post("/", async (req, res) => {
    const producto = req.body
    /* res.json(productoAgregado); */
    /* const productoAgregado= */ await cont.save(producto)
    let productos =await cont.getAll()
    io.local.emit("tablaActualizada", productos)
    res.redirect("/");    
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
app.put("/:id", async (req, res) => {
    let idAActualizar = parseInt(req.params.id);
    const producto = req.body;
    if (isNaN(idAActualizar)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        const idBuscado = await cont.getById(idAActualizar)
        if (idBuscado == null) {
            res.json({ error: "404 El producto que usted desea actualizar no existe" })
        } else {
            res.json(await cont.updateById(idAActualizar, producto));
        }
    }
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
app.delete("/:id", async (req, res) => {
    let idEliminado = parseInt(req.params.id)
    const idBuscado = await cont.getById(idEliminado)
    if (isNaN(idEliminado)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        if (idBuscado === null) {
            res.json({ error: "404 El producto que usted desea eliminar no existe" })
        } else {
            await cont.deleteById(idEliminado)
            res.json(`201 Producto con id: ${idEliminado} fue eliminado`);
        }
    }
});


const ArchivoDeMensaje = "Mensajes";
const contMens = new Contenedor(ArchivoDeMensaje);

let messages = [];
async function cargarMensaje(){
    messages= await contMens.getAll() 
};

cargarMensaje();

io.on("connection", (socket)=>{
    console.log("se conecto un usuario");
    socket.emit("messages", messages);

    socket.on("new-message",(data)=>{
        messages.push(data);
        contMens.saveMensaje(messages);
        io.sockets.emit("messages",messages)
    })
});



