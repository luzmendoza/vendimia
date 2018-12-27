<?php

include("../database_conection.php");
$output = array();
$query = "SELECT * FROM cat_articulos ORDER BY id";
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