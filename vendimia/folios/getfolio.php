<?php
include("../database_conection.php");
$info = json_decode(file_get_contents("php://input"));
if(count($info)>0)
{
    $tipo = $info->tipo;
    $query = "SELECT max(consecutivo)+1 as consecutivo FROM cat_folios WHERE tipo_folio= '$tipo'";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result)>0)
    {
    	$row = mysqli_fetch_array($result);
    	$consecutivo = $row['consecutivo'];
    	if($consecutivo==null)
    	{
    	    $consecutivo =1;
    	}
    	$folio =  str_pad($consecutivo, 5, "0", STR_PAD_LEFT); 
        
        $query = "INSERT INTO cat_folios (tipo_folio,folio,consecutivo) VALUES ('$tipo','$folio','$consecutivo')";
        $result = mysqli_query($conn, $query); 
        
        echo $folio;
    	
    }else{
    	echo 'no hay datos';
    }
    
}

?>