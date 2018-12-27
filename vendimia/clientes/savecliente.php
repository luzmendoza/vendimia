<?php
//$conn = mysqli_connect("localhost","root", "","vendimia");
include("../database_conection.php");
$info = json_decode(file_get_contents("php://input"));
if(count($info)>0)
{
	$clave = mysqli_real_escape_string($conn,$info->clave);
	$nombre = mysqli_real_escape_string($conn,$info->nombre);
	$apellidopaterno = mysqli_real_escape_string($conn,$info->apellido_paterno);
	$apellidomaterno = mysqli_real_escape_string($conn,$info->apellido_materno);
	$rfc = mysqli_real_escape_string($conn,$info->rfc);
	$id = mysqli_real_escape_string($conn,$info->id);
	$opcion = mysqli_real_escape_string($conn,$info->opcion);
	
	if($opcion=='1')
	{
	
		$query = "INSERT INTO cat_clientes(clave,nombre,apellido_paterno,apellido_materno,rfc)
				VALUES ('$clave','$nombre','$apellidopaterno','$apellidomaterno','$rfc')";	
	}else{
		$query = "UPDATE cat_clientes SET nombre = '$nombre',apellido_paterno = '$apellidopaterno', 
				apellido_materno = '$apellidomaterno',rfc = '$rfc' WHERE id = $id";
		
	}
	if(mysqli_query($conn,$query))
	{
		echo "Exito";
	}else{
		echo "Fallo ".$query;
	}
}

 ?>