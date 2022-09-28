const socket = io.connect();
const DateTime = luxon.DateTime 
socket.on("messages",(data)=>{
    render(data);
});

socket.on("tablaActualizada",(data)=>{
    const html2 = data.map((ele)=>{
        return `<tr id="${ele.id}">
                <td>${ele.nombre}</td>
                <td>$${ele.precio}</td>  
                <td><img width="50" src="${ele.url}" alt="not found"></td>
     </tr>`
    }).join(" ");
    document.getElementById("tablaProductos").innerHTML=html2;
});

function render(data){
    const html = data.map((elemento)=>{
        return `<div>
                    <b style="color:blue">${elemento.author}</b>
                    [<span style="color:brown">${DateTime.fromISO(elemento.date).toFormat("dd/MM/yyyy HH:mm:ss")}</span>]:
                    <i style="color:green">${elemento.text}</i></div>
        `;
    }).join(" ");
    document.getElementById("mensajes").innerHTML=html;
};

function addMessage(e){
    const mensajes={
        author: document.getElementById("username").value,
        date: DateTime.now().toISO(),
        text:  document.getElementById("texto").value ,
    };
    document.getElementById("texto").value="";
    socket.emit("new-message",mensajes);
    return false;
};

