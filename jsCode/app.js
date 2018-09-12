firebase.initializeApp({
    apiKey: "AIzaSyDZQPI_DkvJYAZP6ySwU4x0v34RoUXUyu0",
    authDomain: "prestacasa-1758e.firebaseapp.com",
    databaseURL: "https://prestacasa-1758e.firebaseio.com",
    projectId: "prestacasa-1758e",
    storageBucket: "prestacasa-1758e.appspot.com",
    messagingSenderId: "315948810598"
  });

  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  //Crear Documentos
  function guardar(){
      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var fecha = document.getElementById('fecha').value;

    db.collection("Usuarios").add({
        Nombre: nombre,
        Apellido: apellido,
        Fecha: fecha,
    })
    .then(function(docRef) {
        //alert("El prestamo ha sido registrado");
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';


    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

  //Leer documentos
  var tabla = document.getElementById('tabla');
  db.collection("Usuarios").onSnapshot((querySnapshot) => {
      tabla.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Nombre}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Apellido}</td>
            <td>${doc.data().Fecha}</td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido}','${doc.data().Fecha}')">Editar</button></td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          </tr>
        `
    });
});

//Borrar Documentos
function eliminar(id){
    db.collection("Usuarios").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


//Editar Documentos
function editar(id,nombre,apellido,fecha){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';

    boton.onclick= function(){

        var washingtonRef = db.collection("Usuarios").doc(id);

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;
        
        return washingtonRef.update({
            Nombre: nombre,
            Apellido: apellido,
            Fecha: fecha,
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML="Agregar";
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}


function Lunes(){
    ficha = document.getElementById('Lunes');
    db.collection("Prestamos").where("DiaDePago", "==", 1)
        .get()
        .then(function(querySnapshot) {
            ficha.innerHTML='';
            querySnapshot.forEach(function(doc) {
                
                console.log(doc.id, " => ", doc.data().Cliente);
                document.getElementById('Lunes').innerHTML += `
                
                <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
                    <div class="packages">
                        
                        <h1>${doc.data().Cliente}</h1>
                        <b>${doc.data().Cantidad}</b>
                        <p>${doc.data().FechaPrimerPago}</p>
                        <a href="#calendario" onclick="Calendario('${doc.data().Cliente}','${doc.data().PagoTotal}','${doc.data().FechaPrimerPago}','${doc.data().PagoSemanal}')" class="btn btn-success">Ver</a>
    
                    </div>
                </div>
                
                `
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function Martes(){
    ficha = document.getElementById('Lunes');
    db.collection("Prestamos").where("DiaDePago", "==", 2)
        .get()
        .then(function(querySnapshot) {
            ficha.innerHTML='';
            querySnapshot.forEach(function(doc) {
                
                console.log(doc.id, " => ", doc.data().Cliente);
                document.getElementById('Lunes').innerHTML += `
                
                <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
                    <div class="packages">
                        
                        <h1>${doc.data().Cliente}</h1>
                        <b>${doc.data().Cantidad}</b>
                        <p>${doc.data().FechaPrimerPago}</p>
                        <a href="#calendario" onclick="Calendario('${doc.data().Cliente}','${doc.data().PagoTotal}','${doc.data().FechaPrimerPago}','${doc.data().PagoSemanal}')" class="btn btn-success">Ver</a>
    
                    </div>
                </div>
                
                `
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function Miercoles(){
    ficha = document.getElementById('Lunes');
    db.collection("Prestamos").where("DiaDePago", "==", 3)
        .get()
        .then(function(querySnapshot) {
            ficha.innerHTML='';
            querySnapshot.forEach(function(doc) {
                
                console.log(doc.id, " => ", doc.data().Cliente);
                document.getElementById('Lunes').innerHTML += `
                
                <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
                    <div class="packages">
                        
                        <h1>${doc.data().Cliente}</h1>
                        <b>${doc.data().Cantidad}</b>
                        <p>${doc.data().FechaPrimerPago}</p>
                        <a href="#calendario" onclick="Calendario('${doc.data().Cliente}','${doc.data().PagoTotal}','${doc.data().FechaPrimerPago}','${doc.data().PagoSemanal}')" class="btn btn-success">Ver</a>
    
                    </div>
                </div>
                
                `
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function Jueves(){
    ficha = document.getElementById('Lunes');
    db.collection("Prestamos").where("DiaDePago", "==", 4)
        .get()
        .then(function(querySnapshot) {
            ficha.innerHTML='';
            querySnapshot.forEach(function(doc) {
                
                console.log(doc.id, " => ", doc.data().Cliente);
                document.getElementById('Lunes').innerHTML += `
                
                <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
                    <div class="packages">
                        
                        <h1>${doc.data().Cliente}</h1>
                        <b>${doc.data().Cantidad}</b>
                        <p>${doc.data().FechaPrimerPago}</p>
                        <a href="#calendario" onclick="Calendario('${doc.data().Cliente}','${doc.data().PagoTotal}','${doc.data().FechaPrimerPago}','${doc.data().PagoSemanal}')" class="btn btn-success">Ver</a>
    
                    </div>
                </div>
                
                `
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function Viernes(){
    ficha = document.getElementById('Lunes');
    db.collection("Prestamos").where("DiaDePago", "==", 5)
        .get()
        .then(function(querySnapshot) {
            ficha.innerHTML='';
            querySnapshot.forEach(function(doc) {
                
                console.log(doc.id, " => ", doc.data().Cliente);
                document.getElementById('Lunes').innerHTML += `
                
                <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
                    <div class="packages">
                        
                        <h1>${doc.data().Cliente}</h1>
                        <b>${doc.data().Cantidad}</b>
                        <p>${doc.data().FechaPrimerPago}</p>
                        <a href="#calendario" onclick="Calendario('${doc.data().Cliente}','${doc.data().PagoTotal}','${doc.data().FechaPrimerPago}','${doc.data().PagoSemanal}')" class="btn btn-success">Ver</a>
    
                    </div>
                </div>
                
                `
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

function Sabado(){
    ficha = document.getElementById('Lunes');
    db.collection("Prestamos").where("DiaDePago", "==", 6)
        .get()
        .then(function(querySnapshot) {
            ficha.innerHTML='';
            querySnapshot.forEach(function(doc) {
                
                console.log(doc.id, " => ", doc.data().Cliente);
                document.getElementById('Lunes').innerHTML += `
                
                <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
                    <div class="packages">
                        
                        <h1>${doc.data().Cliente}</h1>
                        <b>${doc.data().Cantidad}</b>
                        <p>${doc.data().FechaPrimerPago}</p>
                        <a href="#calendario" onclick="Calendario('${doc.data().Cliente}','${doc.data().PagoTotal}','${doc.data().FechaPrimerPago}','${doc.data().PagoSemanal}')" class="btn btn-success">Ver</a>
    
                    </div>
                </div>
                
                `
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}



function Calendario(cliente,cantidad,fecha,pago){

document.getElementById('Calendario').innerHTML='';
var contador = 1;
for (let i = 0; i < cantidad; i++) {

    

    document.getElementById('Calendario').innerHTML += 
    
        `
                    
        <div class="col-lg-3 col-md-3 wow flipInY" data-wow-delay="1.2s">
            <div class="packages">
                
                <h1>Pago Num: ${contador}</h1>
                <h3>${cliente}</h3>
                <b>${cantidad}</b>
                <p>${fecha}</p>
                <p>${pago}</p>
                <a href="#calendario" onclick="" class="btn btn-success">Pagar</a>
    
            </div>
        </div>
        
        `
        cantidad = cantidad-pago;
        contador += 1;

        if(cantidad<pago){
            pago = cantidad;
        }

      
      

        
        

}
        
        
   
}