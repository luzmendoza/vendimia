<?php
include("../database_conection.php");
$info = json_decode(file_get_contents("php://input"));
if(count($info)>0)
{
    $folio = mysqli_real_escape_string($conn,$info->folio);
	$id_cliente = mysqli_real_escape_string($conn,$info->id_cliente);
	$articulos = $info->articulos;
	$total = mysqli_real_escape_string($conn,$info->total);
	$enganche = mysqli_real_escape_string($conn,$info->enganche);
	$bonificacion = mysqli_real_escape_string($conn,$info->bonificacion);
	$mensualidades = mysqli_real_escape_string($conn,$info->mensualidades);
	$estatus = mysqli_real_escape_string($conn,$info->estatus);

	$query = "INSERT INTO ventas(folio,id_cliente,total,enganche,bonificacion,mensualidades,estatus)
			VALUES ('$folio','$id_cliente','$total','$enganche','$bonificacion','$mensualidades','$estatus')";	

	if(mysqli_query($conn,$query))
	{
		foreach($articulos AS $art){
		   	$query = "INSERT INTO ventas_detalle(id_venta,id_articulo,cantidad)
		        VALUES ('$idR','$art->id','$art->cantidad')";
		    mysqli_query($conn,$query);
		}	
		
		echo "Exito";
	}else{
		echo "Fallo ".$query;
	}
}

 ?>