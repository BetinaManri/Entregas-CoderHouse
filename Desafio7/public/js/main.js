const socket = io.connect();
const DateTime = luxon.DateTime 
socket.on("messages",(data)=>{
    render(data);
});

socket.on("tablaActualizada",(data)=>{
    const html2 = data.map((ele)=>{
        return `<td>${ele.Nombre}</td>
                <td>${ele.Precio}</td>  
                <td><img width="50" src="${ele.URL}" alt="not found"></td>        
     </tr>`
    }).join(" ");
    document.getElementById("tablaProductos").innerHTML=html2;
});

function render(data){
    const html = data.map((elemento)=>{
        return `<div>
                    <b style="color:blue">${elemento.Nombre}</b>
                    [<span style="color:brown">${DateTime.fromISO(elemento.Hora).toFormat("dd/MM/yyyy HH:mm:ss")}</span>]:
                    <i style="color:green">${elemento.Mensaje}</i></div>
        `;
    }).join(" ");
    document.getElementById("mensajes").innerHTML=html;
};

function addMessage(e){
    const mensajes={
        Nombre: document.getElementById("username").value,
        Hora: DateTime.now().toISO(),
        Mensaje:  document.getElementById("texto").value ,
    };
    document.getElementById("texto").value="";
    socket.emit("new-message",mensajes);
    return false;
};

