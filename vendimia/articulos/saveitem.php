<?php
include("../database_conection.php");
$info = json_decode(file_get_contents("php://input"));
if(count($info)>0)
{
	$clave = mysqli_real_escape_string($conn,$info->clave);
	$descripcion = mysqli_real_escape_string($conn,$info->descripcion);
	$modelo = mysqli_real_escape_string($conn,$info->modelo);
	$precio = mysqli_real_escape_string($conn,$info->precio);
	$existencia = mysqli_real_escape_string($conn,$info->existencia);
	$id = mysqli_real_escape_string($conn,$info->id);
	$opcion = mysqli_real_escape_string($conn,$info->opcion);
	
	if($opcion=='1')
	{
		$query = "INSERT INTO cat_articulos(clave,descripcion,modelo,precio,existencia)
				VALUES ('$clave','$descripcion','$modelo','$precio','$existencia')";	
	}else{
		$query = "UPDATE cat_articulos SET descripcion = '$descripcion',modelo = '$modelo', 
				precio = '$precio',existencia = '$existencia' WHERE id = $id";
		
	}
	if(mysqli_query($conn,$query))
	{
		echo "Exito";
	}else{
		echo "Fallo ".$query;
	}
}

 ?>