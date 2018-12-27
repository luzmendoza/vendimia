<?php

include("../database_conection.php");

$data = json_decode(file_get_contents("php://input"));

$search = $data->searchText;

// Fetch 5 records
//$sel = mysqli_query($conn,"select * from cat_clientes where nombre like '%".$search."%' limit 5");
$sel = mysqli_query($conn,"SELECT concat_ws(' ', nombre, apellido_paterno, apellido_materno) as nombre, id,clave, rfc FROM  cat_clientes WHERE concat_ws(' ', nombre, apellido_paterno, apellido_materno) LIKE '%".$search."%' ");

$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("nombre"=>$row['nombre'],"id"=>$row['id'],"clave"=>$row['clave'],"rfc"=>$row['rfc']);
}

echo json_encode($data);

?>