<?php
//$conn = mysqli_connect("localhost","root", "","vendimia");
include("../database_conection.php");
$data = json_decode(file_get_contents("php://input"));
if(count($data)>0)
{
	$id = $data->id;
	$query = "DELETE FROM cat_clientes WHERE id = '$id'";
	if(mysqli_query($conn,$query))
	{
		echo "Exito";
	}else{
		echo "Fallo";
	}
}

 ?>