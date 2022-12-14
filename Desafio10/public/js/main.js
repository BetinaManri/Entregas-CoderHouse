const socket = io.connect();
let myTime = new Date().toLocaleString();


socket.on('productos', function (productos) {
  document.getElementById('productos').innerHTML = renderProd(productos);
});

const formProd = document.getElementById('formProd');

function addProducto(e) {
  const producto = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  };
  socket.emit('new-prod', producto);
  document.getElementById("formProd").reset();
  return false;
};


function renderProd(productos) {
  const tab = `
    {{#if contenido}}
    <div class="table-responsive">
      <table class="table table-dark">
        <tr>
          <th>Título</th>
          <th>Precio</th>
          <th>Imagen</th>
        </tr>
        {{#each productos}}
        <tr>
          <td>{{this.title}}</td>
          <td>{{this.price}}</td>
          <td><img width="80" src={{this.thumbnail}} /></td>
        </tr>
        {{/each}}
      </table>
    </div>
    {{else}}
    <h3 class="alert alert-warning">No se encontraron productos.</h3>
    {{/if}}
    `;
  var template = Handlebars.compile(tab);
  let html = template({ productos: productos, contenido: productos.length });
  return html;
}



const formMens = document.getElementById('formMens');

socket.on('messages', (data) => {
  renderMje(data);
});

function renderMje(data) {
  const html = data.map((elemento) => {
    return `<div>
                  <p1>${elemento.author.id}</p1>
                  <p2>${myTime}</p2>:
                  <p3>${elemento.text}</p3>
                  <p4><span style="color: blue; font-weight: bold;"><img src="${elemento.author.avatar}" alt="Avatar del usuario"></span></p4>
              </div>
      `;
  })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
};

function addMessage(e) {
  const mensaje = {
    id: 'mensajes',
    author: {
      id: document.getElementById('id').value,
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      edad: document.getElementById('edad').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value
    },
    text: document.getElementById('text').value
  };

  socket.emit('new-message', mensaje);
  document.getElementById("text").value = '';
  return false;
};

