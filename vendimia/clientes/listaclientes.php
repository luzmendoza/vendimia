<?php

include("../database_conection.php");
//$conn = mysqli_connect("localhost","id8298531_eliuzi", "D4yan24s","id8298531_vendimia");
$output = array();
$query = "SELECT * FROM cat_clientes ORDER BY id";
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