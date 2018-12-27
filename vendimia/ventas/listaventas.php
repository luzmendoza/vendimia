<?php

include("../database_conection.php");
$output = array();
$query = "SELECT v.id,v.folio,v.id_cliente,v.total,v.estatus,v.fecha,c.clave,c.nombre,c.apellido_paterno,
        c.apellido_materno FROM ventas AS v INNER JOIN cat_clientes AS c on v.id_cliente = c.id ORDER BY v.id ";

$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result)>0)
{
	while($row = mysqli_fetch_array($result))
	{
		$output[]=$row;
	}
	echo json_encode($output);
}else{
	echo 'no hay datos';
}

?>