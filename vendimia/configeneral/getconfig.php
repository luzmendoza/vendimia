<?php
include("../database_conection.php");
//$output = array();
$query = "SELECT * FROM config_general";
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result)>0)
{
	/*while($row = mysqli_fetch_array($result))
	{
		$output[]=$row;
	}*/
	$row = mysqli_fetch_array($result);
	echo json_encode($row);
}else{
	echo 'no hay datos';
}

?>