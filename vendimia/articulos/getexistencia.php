<?php
include("../database_conection.php");
$info = json_decode(file_get_contents("php://input"));
if(count($info)>0)
{
	$id = mysqli_real_escape_string($conn,$info->id);
    $query = "SELECT id,existencia FROM cat_articulos WHERE id= $id";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result)>0)
    {
    	$row = mysqli_fetch_array($result);
    	echo json_encode($row);
    }else{
    	echo 'no hay datos';
    }
}

?>