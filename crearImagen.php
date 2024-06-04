<?php
// Verificar si se recibieron los datos esperados
if (isset($_POST['upLeftCheckbox']) && isset($_POST['downRightCheckbox']) && isset($_POST['width']) && isset($_POST['height']) && isset($_POST['originalImage'])) {
    // Obtener los datos enviados desde JavaScript
    $x = $_POST['upLeftCheckbox'];
    $y = $_POST['downRightCheckbox'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $originalImage = $_POST['originalImage'];
    $imgWidth = $_POST['imageWidth'];
    $imgHeight = $_POST['imageHeight'];
    //crear imagen en blanco
    

    // Crear una nueva imagen en blanco
    $imageBlancoCuadrada = imagecreatetruecolor(500,500);
    $imageBlancoRectangular = imagecreatetruecolor(100,500);
    // Establecer el color de fondo en blanco
    $bgColorC = imagecolorallocate($imageBlancoCuadrada, 255, 255, 255);
    $bgColorR = imagecolorallocate($imageBlancoRectangular, 255, 255, 255);
    imagefill($imageBlancoCuadrada, 0, 0, $bgColorC);
    imagefill($imageBlancoRectangular, 0, 0, $bgColorR);



    // Guardar la imagen en un archivo
    imagejpeg($imageBlancoCuadrada, './imagenes/imagen_blanco_cuadrada.jpeg');
    imagejpeg($imageBlancoRectangular, './imagenes/imagen_blanco_rectangular.jpeg');

    // Cargar la imagen original utilizando la función imagecreatefromjpeg()
    $originalImage = imagecreatefromjpeg($originalImage);
    // Copiar el área recortada de la imagen original en la imagen en blanco
    imagecopy($imageBlancoCuadrada, $originalImage, 0, 0, $x, $y, $width, $height);
    imagecopy($imageBlancoRectangular, $originalImage, 0, 0, $x, $y, $width, $height);

    // Guardar la imagen actualizada en un nuevo archivo
    $nombreImagenCuadrada = './imagenes/imagen_actualizada_cuadrada.jpeg';
    imagejpeg($imageBlancoCuadrada, $nombreImagenCuadrada);

    $nombreImagenRectangular = './imagenes/imagen_actualizada_rectangular.jpeg';
    imagejpeg($imageBlancoRectangular, $nombreImagenRectangular);

    // Liberar la memoria utilizada por la imagen
    imagedestroy($imageBlancoCuadrada);
    imagedestroy($imageBlancoRectangular);
    // Realizar las operaciones necesarias con los datos recibidos
    // ...
    //$imgNew = imagecreatetruecolor($imgWidth, $imgHeight);
    $imageC = imagecreatefromjpeg("./imagenes/imagen_blanco_cuadrada.jpeg");
    $imageR = imagecreatefromjpeg("./imagenes/imagen_blanco_rectangular.jpeg");
    //$image = imagecreatefromjpeg("http://" . $_SERVER['SERVER_NAME'] . "/imagen_blanco.jpeg");
    // $colImage = imagecolorallocate($image, 0, 0, 0);
    // $colText = imagecolorallocate($image,  0, 0, 0);
    // $text = "Ancho: $imgWidth, Alto: $imgHeight";
    // imagestring($image, 5, 10, 10, $text, $colText);

    imagejpeg($imageC, "./imagenes/imagen_blanco_cuadrada.jpeg");
    imagejpeg($imageR, "./imagenes/imagen_blanco_rectangular.jpeg");
    header('Content-Type: image/jpeg');
    //imagejpeg($image);
    $rutaImagen = "./imagenes/imagen_actualizada_cuadrada.jpeg";
    echo ($rutaImagen);
} else {
    // Si no se recibieron los datos esperados, devolver un mensaje de error
    echo 'Error al recibir los datos';
}
