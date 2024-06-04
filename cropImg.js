//entrada visualizacion https://www.ampa.pru/proyectos/ampaPruebas/recortarImagen/
let lines = [];
function loadImage(input) {

  // Verificar si se seleccionó un archivo
  if (input.files && input.files.length > 0) {

    // Obtener el archivo seleccionado
    const file = input.files[0];
    let img;

    // Crear un lector de archivos
    const reader = new FileReader();

    // Leer el archivo como una URL de datos
    reader.onload = function (event) {
      // Crear un elemento de imagen
      img = new Image();
      img.src = event.target.result;
      
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center center';

      // Mostrar la imagen original
      const originalImage = document.getElementById('originalImage');
      const divWidth = originalImage.clientWidth;
      const divHeight = originalImage.clientHeight;
      img.style.width = divWidth + 'px';
      img.style.height = divHeight + 'px';
      console.log(divWidth, divHeight);
      originalImage.innerHTML = '';
      originalImage.appendChild(img);
      console.log(img)
    };

    reader.readAsDataURL(file);

  } else {
    console.log("No se ha seleccionado ningún archivo");
  }

}
document.getElementById("previsualizar").addEventListener("click", showCroppedImagePreview);
let imageInput = document.getElementById("imageInput").addEventListener("change", function () { loadImage(this); });
document.getElementById("editar").addEventListener("click", function () {
  let originalImage = document.getElementById("originalImage");
  //creacion checkboxes de las cuatro esquinas

  let upLeftCheckbox = document.createElement("input");
  upLeftCheckbox.type = "checkbox";
  upLeftCheckbox.id = "upLeftCheckbox";
  upLeftCheckbox.draggable = "true";
  //upLeftCheckbox.disabled = false;
  upLeftCheckbox.style.position = "absolute";
  upLeftCheckbox.style.top = "150px";
  upLeftCheckbox.style.left = "150px";
  originalImage.appendChild(upLeftCheckbox);

  let upRightCheckbox = document.createElement("input");
  upRightCheckbox.type = "checkbox";
  upRightCheckbox.id = "upRightCheckbox";
  upRightCheckbox.draggable = "true";
  //upRightCheckbox.disabled = true;
  upRightCheckbox.style.position = "absolute";
  upRightCheckbox.style.top = "150px";
  upRightCheckbox.style.left = "350px";
  originalImage.appendChild(upRightCheckbox);

  let downLeftCheckbox = document.createElement("input");
  downLeftCheckbox.type = "checkbox";
  downLeftCheckbox.id = "downLeftCheckbox";
  downLeftCheckbox.draggable = "true";
  //downLeftCheckbox.disabled = true;
  downLeftCheckbox.style.position = "absolute";
  downLeftCheckbox.style.top = "350px";
  downLeftCheckbox.style.left = "150px";
  originalImage.appendChild(downLeftCheckbox);

  let downRightCheckbox = document.createElement("input");
  downRightCheckbox.type = "checkbox";
  downRightCheckbox.id = "downRightCheckbox";
  downRightCheckbox.draggable = "true";
  //downRightCheckbox.disabled = true;
  downRightCheckbox.style.position = "absolute";
  downRightCheckbox.style.top = "350px";
  downRightCheckbox.style.left = "350px";
  originalImage.appendChild(downRightCheckbox);


  //creacion de lineas perimetrales
  let upLine = document.createElement("div");
  upLine.id = "upLine";
  // Set styles for upLine based on checkbox position
  upLine.style.position = "absolute";
  // upLine.style.top = "150px";
  // upLine.style.left = "150px";
  upLine.style.backgroundColor = "grey";
  // upLine.style.width = "200px";
  upLine.style.height = "1px";
  upLine.style.zIndex = 2;  // Bring to front

  let rightLine = document.createElement('div');
  rightLine.id = 'rightLine';
  rightLine.style.position = "absolute";
  rightLine.style.width = "1px";
  rightLine.style.backgroundColor = "grey";
  rightLine.style.zIndex = 2;
  // Dejaremos el setLinePositions para más adelante

  let downLine = document.createElement('div');
  downLine.id = 'downLine';
  downLine.style.position = "absolute";
  downLine.style.height = "1px";
  downLine.style.backgroundColor = "grey";
  downLine.style.zIndex = 2;
  // Dejaremos el setLinePositions para más adelante

  let leftLine = document.createElement('div');
  leftLine.id = 'lefttLine';
  leftLine.style.position = "absolute";
  leftLine.style.width = "1px";
  leftLine.style.backgroundColor = "grey";
  leftLine.style.zIndex = 2;
  // Dejaremos el setLinePositions para más adelante

  // Anexamos las líneas al elemento padre
  originalImage.appendChild(upLine);
  originalImage.appendChild(rightLine);
  originalImage.appendChild(downLine);
  originalImage.appendChild(leftLine);

  lines = [upLine, rightLine, downLine, leftLine];

  setLinePositions(upLeftCheckbox, upRightCheckbox, downLeftCheckbox, downRightCheckbox, lines)
  moveCheckboxes();

});


function setLinePositions(upLeftCheckbox, upRightCheckbox, downLeftCheckbox, downRightCheckbox, lines) {
  const parentElement = upLeftCheckbox.parentElement;

  // Obtén los estilos de margen del padre (asumiendo que son consistentes para todos los lados)
  //const parentMargin = window.getComputedStyle(parentElement).getPropertyValue('margin-top');

  const relativeTopUp = upLeftCheckbox.offsetTop + 6;
  const relativeTopDown = downLeftCheckbox.offsetTop + 6;
  const relativeLeft = upLeftCheckbox.offsetLeft;

  // Posiciones de las líneas considerando márgenes (reemplaza '10px' con el valor de margen real)
  lines[0].style.top = relativeTopUp + 'px';
  lines[0].style.left = 6 + Math.min(upLeftCheckbox.offsetLeft, upRightCheckbox.offsetLeft) + 'px';
  lines[0].style.width = Math.abs(upRightCheckbox.offsetLeft - upLeftCheckbox.offsetLeft) + 'px';

  lines[1].style.top = relativeTopUp + 'px';
  lines[1].style.left = 6 + Math.min(upLeftCheckbox.offsetLeft, upRightCheckbox.offsetLeft) + 'px';
  lines[1].style.height = Math.abs(downLeftCheckbox.offsetTop - upLeftCheckbox.offsetTop) + "px";  // Alto entre ambos


  lines[2].style.top = relativeTopDown + 'px';
  lines[2].style.left = 6 + Math.min(downLeftCheckbox.offsetLeft, downRightCheckbox.offsetLeft) + 'px';
  lines[2].style.width = Math.abs(downRightCheckbox.offsetLeft - downLeftCheckbox.offsetLeft) + 'px';

  lines[3].style.top = relativeTopUp + 'px';
  lines[3].style.left = 6 + Math.min(upRightCheckbox.offsetLeft, downRightCheckbox.offsetLeft) + 'px';
  lines[3].style.height = Math.abs(downLeftCheckbox.offsetTop - upLeftCheckbox.offsetTop) + "px";  // Alto entre ambos
  console.log("estoy en setLinePositions");

}
function moveCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  for (const checkbox of checkboxes) {
    let isDragging = false;
    let initialX = null;
    let initialY = null;

    checkbox.addEventListener('mousedown', function (event) {
      isDragging = true;
      initialX = event.clientX - checkbox.offsetLeft;
      initialY = event.clientY - checkbox.offsetTop;

      checkbox.style.position = 'absolute'; // Establecer la posición absoluta
    });
    document.addEventListener('mousemove', function (event) {
      if (isDragging) {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;

        checkbox.style.left = `${deltaX}px`;
        checkbox.style.top = `${deltaY}px`;

        // Obtener los checkboxes adyacentes
        const topLeftCheckbox = checkboxes[0];
        const topRightCheckbox = checkboxes[1];
        const bottomLeftCheckbox = checkboxes[2];
        const bottomRightCheckbox = checkboxes[3];


        // Sincronizar el movimiento de los checkboxes adyacentes
        if (checkbox === topLeftCheckbox) {
          topRightCheckbox.style.top = topLeftCheckbox.style.top;
          bottomLeftCheckbox.style.left = topLeftCheckbox.style.left;
        } else if (checkbox === topRightCheckbox) {
          topLeftCheckbox.style.top = topRightCheckbox.style.top;
          bottomRightCheckbox.style.left = topRightCheckbox.style.left;
        } else if (checkbox === bottomLeftCheckbox) {
          topLeftCheckbox.style.left = bottomLeftCheckbox.style.left;
          bottomRightCheckbox.style.top = bottomLeftCheckbox.style.top;
        } else if (checkbox === bottomRightCheckbox) {
          topRightCheckbox.style.left = bottomRightCheckbox.style.left;
          bottomLeftCheckbox.style.top = bottomRightCheckbox.style.top;
        }
        setLinePositions(topLeftCheckbox, topRightCheckbox, bottomLeftCheckbox, bottomRightCheckbox, lines);
        // topLeftCheckbox.addEventListener('change', showCroppedImagePreview);
        // bottomRightCheckbox.addEventListener('change', showCroppedImagePreview);


      }
    });


    document.addEventListener('mouseup', function () {

      isDragging = false;
    });
  }
}
function showCroppedImagePreview() {
  console.log("Estoy en showCroppedImagePreview");
  const checkbox1 = document.getElementById('upLeftCheckbox');
  const checkbox2 = document.getElementById('downRightCheckbox');

  const x = checkbox1.offsetLeft;
  const y = checkbox1.offsetTop;
  const width = checkbox2.offsetLeft - checkbox1.offsetLeft;
  const height = checkbox2.offsetTop - checkbox1.offsetTop;
  
  // Obtén el elemento de imagen original
  const originalImage = document.getElementById('originalImage').querySelector('img');
let w = originalImage.width;
let h = originalImage.height;
const renderedSize = originalImage.width + " × " +  originalImage.height;
const renderedAspectRatio = originalImage.width + "∶" + originalImage.height;
const intrinsicSize =originalImage.naturalWidth + " × " + originalImage.naturalHeight + " px";
const intrinsicAspectRatio = originalImage.naturalWidth + "∶" + originalImage.naturalHeight;
const fileSize = (originalImage.fileSize / 1024).toFixed(2) + " KB";
let divDatos = document.getElementById('datosImg');

divDatos.innerHTML = "w: " + w + " h: " + h   +
"\n renderedSize: " + renderedSize + " \n renderedAspectRatio: " + renderedAspectRatio + "" +
"\n intrinsicSize: " + intrinsicSize + "\n intrinsicAspectRatio: " + intrinsicAspectRatio + "" +
"\n fileSize: " + fileSize + "\n width cuadro: " + width + " height cuadro: " + height +"\ncheckbox1left"+x+"checkbox1top"+y+"checkbox2left"+checkbox2.offsetLeft+"checkbox2top"+checkbox2.offsetTop;
 //introducir la imagen para enviarla al servidor
 //obtener los datos de la imagen original para enviarlos al servidor

 const imageUrl = originalImage.src;

 // Obtener los datos de la imagen en formato Blob
 fetch(imageUrl)
   .then(response => response.blob())
   .then(blob => {
     // Convertir el objeto Blob a base64
     const reader = new FileReader();
     reader.onloadend = function() {
       const imageBase64 = reader.result;
 
       // Crear el objeto FormData y agregar los datos
       const data = new FormData();
       data.append('upLeftCheckbox', x);
       data.append('downRightCheckbox', y);
       data.append('width', width);
       data.append('height', height);
       data.append('originalImage', imageBase64);
       data.append('imageWidth', originalImage.naturalWidth);
       data.append('imageHeight', originalImage.naturalHeight);
 
       // Enviar los datos al servidor utilizando una solicitud AJAX
       peticionAsincrona(data);
     };
     reader.readAsDataURL(blob);
   })
   .catch(error => {
     console.error('Error al obtener los datos de la imagen:', error);
   });

}
function peticionAsincrona(data) {
  $.ajax({
      url: './crearImagen.php',
      type: 'POST',
      contentType: false,
      data: data,
      processData: false,
      cache: false,
  }).done(function(response) {
    var imageBase64 = response;
    // imageBase64 = imageBase64.replace(/[^A-Za-z0-9+/=]/g, '');
    // console.log(imageBase64)
    // Crear un elemento de imagen en el frontend
    //let img = new Image();
    let img = document.createElement('img');
    img.src =   response;
    console.log(response)
   //document.getElementsByTagName("body")[0].appendChild(img);
    document.getElementById('croppedImage').appendChild(img);
  
  });
}
// var imagen = document.getElementById("preview").src;
// console.log(imagen)

// // Quitar el prefijo data:image/jpg;base64,
// imagen = imagen.replace(/^data:image\/\w+;base64,/, "");
// // Convertir la cadena a un array de bytes
// var bytes = atob(imagen);
// var array = [];
// for (var i = 0; i < bytes.length; i++) {
//     array.push(bytes.charCodeAt(i));
// }
// // Crear un objeto Blob con el tipo de la imagen
// var blob = new Blob([new Uint8Array(array)], {
//     message: ("estoy en variable blob"),
//     type: selectedFile.type
// });


// // Crear un objeto FormData para enviar el Blob como un archivo
// let data = new FormData();
// let metadatos = {
//     title: $("#title").val(),
//     alt: $("#desc").val(),
//     desL: $("#descL").val(),
// }
// let metadatosJSON = JSON.stringify(metadatos);
// data.append("metadatos", metadatosJSON);
// data.append("imagen", blob, selectedFile.name);
// peticionAsincrona(data);
// function showCroppedImagePreview() {
//   console.log("Estoy en showCroppedImagePreview");
//   const checkbox1 = document.getElementById('upLeftCheckbox');
//   const checkbox2 = document.getElementById('downRightCheckbox');

//   const x = checkbox1.offsetLeft;
//   const y = checkbox1.offsetTop;
//   const width = checkbox2.offsetLeft - checkbox1.offsetLeft;
//   const height = checkbox2.offsetTop - checkbox1.offsetTop;
  
//   // Obtén el elemento de imagen original
//   const originalImage = document.getElementById('originalImage').querySelector('img');
// let w = originalImage.width;
// let h = originalImage.height;
// const renderedSize = originalImage.width + " × " +  originalImage.height;
// const renderedAspectRatio = originalImage.width + "∶" + originalImage.height;
// const intrinsicSize =originalImage.naturalWidth + " × " + originalImage.naturalHeight + " px";
// const intrinsicAspectRatio = originalImage.naturalWidth + "∶" + originalImage.naturalHeight;
// const fileSize = (originalImage.fileSize / 1024).toFixed(2) + " KB";
// let divDatos = document.getElementById('datosImg');

// divDatos.innerHTML = "w: " + w + " h: " + h   +
// "\n renderedSize: " + renderedSize + " \n renderedAspectRatio: " + renderedAspectRatio + "" +
// "\n intrinsicSize: " + intrinsicSize + "\n intrinsicAspectRatio: " + intrinsicAspectRatio + "" +
// "\n fileSize: " + fileSize + "\n width cuadro: " + width + " height cuadro: " + height +"\ncheckbox1left"+x+"checkbox1top"+y+"checkbox2left"+checkbox2.offsetLeft+"checkbox2top"+checkbox2.offsetTop;
//   // Crear un elemento canvas dinámicamente
//   const canvas = document.createElement('canvas');


//   // Establecer el ancho y alto del canvas
//   canvas.width = 500;
//   canvas.height = 500;

//   // Obtén el contexto 2D del canvas
//   const ctx = canvas.getContext('2d');

//   //escala de imagenes respecto al contenedor
//  let widthNewImg =  originalImage.naturalWidth/ canvas.width;
//  let heightNewImg = originalImage.naturalHeight/ canvas.height;
 

//   // Dibuja la parte recortada de la imagen en el canvas
//   //ctx.drawImage(originalImage, x, y, width , height , 0, 0, canvas.width, canvas.height);
//   ctx.drawImage(originalImage, x, y, width * widthNewImg , height * heightNewImg , 0, 0, canvas.width, canvas.height);

//   // Obtén el cuadro de previsualización
//   const croppedImageDiv = document.getElementById('croppedImage');
//   //croppedImageDiv.style.objectFit = 'contain';

//   // Elimina cualquier contenido previo del cuadro de previsualización
//   croppedImageDiv.innerHTML = '';

//   // Agrega el canvas al cuadro de previsualización
//   croppedImageDiv.appendChild(canvas);
// }





