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


  
//Leer clientes
    db.collection("Clientes").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            document.getElementById('clientes').innerHTML += `
            <option value="${doc.data().Nombre + ' ' + doc.data().ApellidoP + ' ' + doc.data().ApellidoM}">
                           ${doc.data().Nombre + ' ' + doc.data().ApellidoP + ' ' + doc.data().ApellidoM}
            </option>
            `
        });
    });

    


function interes(){
    var interes1 = 0;
    var cantidad1 = document.getElementById('cantidad').value;
    
    interes1 = (cantidad1*0.05)/4;

    document.getElementById('interes').value = interes1;

}

function pago(){
    
    var cantidad = document.getElementById('cantidad').value;
    var semanas = document.getElementById('semanas').value;   
    var interes = document.getElementById('interes').value;
    
    var pago = cantidad/semanas;
    var total = parseInt(pago) + parseInt(interes);

    document.getElementById('pSemanal').value = parseInt(total);

    var pTotal = (parseInt(semanas)* parseInt(interes)) + parseInt(cantidad);

    document.getElementById('pTotal').value = parseInt(pTotal);
}

//Fechas
    var myDate = new Date();
    var f = new Date();
    
    myDate.getFullYear();
    myDate.getDate();
    myDate.getMonth();

    var sunday = myDate.getDay();
    while (myDate.getDay() != sunday) {
        myDate.setDate(myDate.getDate()+1);
    }

    myDate.setDate(myDate.getDate()+7);

    document.getElementById('fecha').value = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    document.getElementById('fpPago').value = myDate.getDate() + "/" + (myDate.getMonth() +1) + "/" + myDate.getFullYear();
    var fpPago1 = myDate.getDay();



//Crear Documentos
   guardarP = function(){
      var cliente = document.getElementById('clientes').value;
      var cantidad = document.getElementById('cantidad').value;
      var fecha = document.getElementById('fecha').value;
      var fpPago = document.getElementById('fpPago').value;
      var dia = fpPago1;
      var semanas = document.getElementById('semanas').value;
      var interes = document.getElementById('interes').value;
      var pSemanal = document.getElementById('pSemanal').value;
      var pTotal = document.getElementById('pTotal').value;

    db.collection("Prestamos").add({
        Cliente: cliente,
        Cantidad: cantidad,
        Fecha: fecha,
        FechaPrimerPago: fpPago,
        DiaDePago: fpPago1,
        Semanas:semanas,
        Interes:interes,
        PagoSemanal:pSemanal,
        PagoTotal:pTotal,

    })
    .then(function(docRef) {
        alert("El Prestamo ha sido registrado");
        document.getElementById('cantidad').value = '';
        document.getElementById('semanas').value = '';
        document.getElementById('interes').value = '';
        document.getElementById('pSemanal').value = '';
        document.getElementById('pTotal').value = '';
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }


  //Leer Prestamos
  var tabla = document.getElementById('tabla');
  db.collection("Prestamos").onSnapshot((querySnapshot) =>{
      tabla.innerHTML = '';
      querySnapshot.forEach((doc)=>{
          
          console.log(`${doc.id} => ${doc.data().Cliente}`);
          document.getElementById('tabla').innerHTML += `
          <tr>
              <td>${doc.data().Cliente}</td>
              <td>${doc.data().Cantidad}</td>
              <td>${doc.data().Fecha}</td>
              <td>${doc.data().FechaPrimerPago}</td>
              <td>${doc.data().Semanas}</td>
              <td>${doc.data().Interes}</td>
              <td>${doc.data().PagoSemanal}</td>
              <td>${doc.data().PagoTotal}</td>
              <td><button class="btn btn-danger"  onclick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>
          `
      });
  });




  //Borrar documentos
function eliminar(id){
    var mensaje;
    var opcion = confirm("¿Esta seguro que desea eliminar este Prestamo?");
    if (opcion == true) {
        db.collection("Prestamos").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
	}
}

//Editar Documentos
// function editar(id,cliente,cantidad,fecha,fechaprimerpago,semanas,interes,pagosemanal,pagototal){
//     document.getElementById('nombre').value = nombre;
//     document.getElementById('apellidoP').value = apellidoP;
//     document.getElementById('apellidoM').value = apellidoM;
//     document.getElementById('edad').value = edad;
//     document.getElementById('telefono').value = telefono;
//     document.getElementById('direccion').value = direccion;
//     document.getElementById('sexo').value = sexo;

//     var boton = document.getElementById('boton');
//     boton.innerHTML = 'Actualizar';

//     boton.onclick= function(){

//         var editar = db.collection("Clientes").doc(id);
//         var nombre = document.getElementById('nombre').value;
//         var apellidoP = document.getElementById('apellidoP').value;
//         var apellidoM = document.getElementById('apellidoM').value;
//         var edad = document.getElementById('edad').value;
//         var telefono = document.getElementById('telefono').value;
//         var direccion = document.getElementById('direccion').value;
//         var sexo = document.getElementById('sexo').value;
        
        
//         return editar.update({
//                 Nombre: nombre,
//                 ApellidoP: apellidoP,
//                 ApellidoM: apellidoM,
//                 Edad:edad,
//                 Telefono:telefono,
//                 Direccion:direccion,
//                 Sexo:sexo,
//         })
//         .then(function() {
//             console.log("Document successfully updated!");
//             document.getElementById('nombre').value = '';
//             document.getElementById('apellidoP').value = '';
//             document.getElementById('apellidoM').value = '';
//             document.getElementById('edad').value = '';
//             document.getElementById('telefono').value = '';
//             document.getElementById('direccion').value = '';
//             boton.innerHTML="Agregar";
//             boton.onclick = guardarC;
            
//         }
//     )

//         .catch(function(error) {
//             // The document probably doesn't exist.
//             console.error("Error updating document: ", error);
//         });
        
//     }
    
// }



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        });
  }
  
  
  
  db.collection("Clientes").get().then(function(querySnapshot) {
    var clientes;
    var names = new Array();
      querySnapshot.forEach(function(doc) {
           
           clientes = doc.data().Nombre + ' ' + doc.data().ApellidoP+ ' ' + doc.data().ApellidoM;
           console.log(clientes)     
        
           names.push(clientes);
                  
      });
      autocomplete(document.getElementById("clientes"), names);
  });