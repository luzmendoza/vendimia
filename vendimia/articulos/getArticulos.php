<?php

include("../database_conection.php");

$data = json_decode(file_get_contents("php://input"));

$search = $data->searchText;

// Fetch 5 records
$sel = mysqli_query($conn,"select * from cat_articulos where descripcion like '%".$search."%' limit 5");

$data = array();

while ($row = mysqli_fetch_array($sel)) {
 $data[] = array("descripcion"=>$row['descripcion'],"id"=>$row['id'],"modelo"=>$row['modelo'],"precio"=>$row['precio'],"existencia"=>$row['existencia'],"clave"=>$row['clave']);
}

echo json_encode($data);

?>