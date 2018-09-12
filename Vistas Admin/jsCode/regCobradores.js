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
  guardarA = function(){

      var nombre = document.getElementById('nombre').value;
      var apellidoP = document.getElementById('apellidoP').value;
      var apellidoM = document.getElementById('apellidoM').value;
      var pass = document.getElementById('pass').value;
      var edad = document.getElementById('edad').value;
      var telefono = document.getElementById('telefono').value;
      var email = document.getElementById('email').value;
      var sexo = document.getElementById('sexo').value;
      const auth = firebase.auth();
      //Añadimos el evento del sign Up
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));


    if(document.getElementById('pass').value != document.getElementById('pass2').value){
        alert('Las contraseñas no coinciden');
        document.getElementById('pass').value = '';
        document.getElementById('pass2').value = '';
        document.getElementById('pass').focus();

    }else{

        if(
            document.getElementById('nombre').value == '' ||
            document.getElementById('apellidoP').value == '' ||
            document.getElementById('apellidoM').value == '' ||
            document.getElementById('pass').value == '' ||
            document.getElementById('pass2').value == '' ||
            document.getElementById('edad').value == '' ||
            document.getElementById('telefono').value == '' ||
            document.getElementById('email').value == '' ||
            document.getElementById('sexo').value == ''
        ){
            alert("Porfavor llene los campos faltantes para continuar");
        }else{
            db.collection("Agentes").add({
                Nombre: nombre,
                ApellidoP: apellidoP,
                ApellidoM: apellidoM,
                Password:pass,
                Edad:edad,
                Telefono:telefono,
                Email:email,
                Sexo:sexo,
            })
            .then(function(docRef) {
                alert("El Agente ha sido registrado");
                document.getElementById('nombre').value = '';
                document.getElementById('apellidoP').value = '';
                document.getElementById('apellidoM').value = '';
                document.getElementById('pass').value = '';
                document.getElementById('pass2').value = '';
                document.getElementById('edad').value = '';
                document.getElementById('telefono').value = '';
                document.getElementById('email').value = '';

            })
            .catch(function(error) {
                alert("El agente no se pudo registrar, intentelo de nuevo");
                console.error("Error adding document: ", error);
            });
        }
    }
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("Agentes").onSnapshot((querySnapshot) =>{
    tabla.innerHTML = '';
    querySnapshot.forEach((doc)=>{

        console.log(`${doc.id} => ${doc.data().Nombre}`);
        document.getElementById('tabla').innerHTML += `
        <tr>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().ApellidoP}</td>
            <td>${doc.data().ApellidoM}</td>
            <td>${doc.data().Password}</td>
            <td>${doc.data().Edad}</td>
            <td>${doc.data().Telefono}</td>
            <td>${doc.data().Email}</td>
            <td>${doc.data().Sexo}</td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().ApellidoP}','${doc.data().ApellidoM}','${doc.data().Password}','${doc.data().Edad}','${doc.data().Telefono}','${doc.data().Email}','${doc.data().Sexo}')">Editar</button></td>
            <td><button class="btn btn-danger"  onclick="eliminar('${doc.id}')">Eliminar</button></td>
          </tr>
        `
    });
});

//Editar Documentos
function editar(id,nombre,apellidoP,apellidoM,pass,edad,telefono,email,sexo){
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellidoP').value = apellidoP;
    document.getElementById('apellidoM').value = apellidoM;
    document.getElementById('pass').value = pass;
    document.getElementById('edad').value = edad;
    document.getElementById('telefono').value = telefono;
    document.getElementById('email').value = email;
    document.getElementById('sexo').value = sexo;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';

    boton.onclick= function(){

        var washingtonRef = db.collection("Agentes").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellidoP = document.getElementById('apellidoP').value;
        var apellidoM = document.getElementById('apellidoM').value;
        var pass = document.getElementById('pass').value;
        var edad = document.getElementById('edad').value;
        var telefono = document.getElementById('telefono').value;
        var email = document.getElementById('email').value;
        var sexo = document.getElementById('sexo').value;


        return washingtonRef.update({
                Nombre: nombre,
                ApellidoP: apellidoP,
                ApellidoM: apellidoM,
                Password:pass,
                Edad:edad,
                Telefono:telefono,
                Email:email,
                Sexo:sexo,
        })
        .then(function() {
            console.log("Document successfully updated!");
            document.getElementById('nombre').value = '';
            document.getElementById('apellidoP').value = '';
            document.getElementById('apellidoM').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('pass2').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('email').value = '';
            boton.innerHTML="Agregar";
            boton.onclick = guardarA;
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}






//Borrar Documentos
function eliminar(id){
   
    var mensaje;
    var opcion = confirm("¿Esta seguro que desea eliminar este Agente?");
    if (opcion == true) {
        db.collection("Agentes").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
	}
	    
	
}
