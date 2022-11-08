const handlebars = require("express-handlebars");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const productsRouter = require("./src/routes/routerProd") 
const ContenedorMensj = require("./src/models/classMensj.js");
const

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const contMens = new ContenedorMensj("mensajes");

app.set("view engine", "hbs");
app.set("views", "./views");

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

httpServer.listen(8080, () => console.log("Servidor Levantado en puerto 8080"));


app.use("/", productsRouter);


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

