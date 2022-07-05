$('#boton').click(function () {
    // GET AJAX
    var lista = $('#lista');

    $.get('http://localhost:5000/amigos', data => {
      
      for (let i = 0; i < data.length; i++){
        lista.append(`<li>${data[i].name}</li>`)
        //var li = document.createElement("li")
        //li.innerText = data[i].name
        //lista.appendChild(li)
      }

    });

  });


$('#search').click(() => {
  // creo una variable llamo al elemento y me guardo el valor de lo que este en imput
  let idamigo = $('#input').val();

  $.get(`http://localhost:5000/amigos/${idamigo}`, (data) => {
    $("#amigo").text(`nombre: ${data.name} Edad: ${data.age}`);
  });
});

$("#delete").click (() => {
  let idDelete = $("#inputDelete").val();

  $.ajax({
    url: `http://localhost:5000/amigos/${idDelete}`, 
    type: "DELETE",
    success: (data) => {
      $("#success").text(`Amigo con id ${idDelete} borrado con exito`);
    }, 
  });
});

