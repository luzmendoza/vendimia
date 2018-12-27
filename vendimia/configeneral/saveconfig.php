<?php
include("../database_conection.php");
$info = json_decode(file_get_contents("php://input"));
if(count($info)>0)
{
	$tasa_financiamiento = mysqli_real_escape_string($conn,$info->tasa_financiamiento);
	$porc_enganche = mysqli_real_escape_string($conn,$info->porc_enganche);
	$plazo_maximo = mysqli_real_escape_string($conn,$info->plazo_maximo);
	$opcion = mysqli_real_escape_string($conn,$info->opcion);
	
	if($opcion=='1')
	{
	
		$query = "INSERT INTO config_general(tasa_financiamiento,porc_enganche,plazo_maximo)
				VALUES ('$tasa_financiamiento','$porc_enganche','$plazo_maximo')";	
	}else{
		$query = "UPDATE config_general SET tasa_financiamiento = '$tasa_financiamiento',porc_enganche = '$porc_enganche', plazo_maximo = '$plazo_maximo'";
		
	}
	if(mysqli_query($conn,$query))
	{
		echo "Exito";
	}else{
		echo "Fallo ".$query;
	}
}

 ?>