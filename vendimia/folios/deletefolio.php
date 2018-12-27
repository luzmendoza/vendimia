<?php
include("../database_conection.php");
$data = json_decode(file_get_contents("php://input"));
if(count($data)>0)
{
	$tipo = $data->tipo;
	$folio = $data->folio;
	$query = "DELETE FROM cat_folios WHERE tipo_folio = '$tipo' AND folio = '$folio'";
	if(mysqli_query($conn,$query))
	{
		echo "Exito";
	}else{
		echo "Fallo";
	}
}

 ?>