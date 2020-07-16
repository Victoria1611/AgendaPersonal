<?php
	
function conex(){
	$mysql_server="localhost";
	$mysql_login="root";
	$mysql_pass="victoria";
	$base_datos='agenda';
	
	$conexion=new mysqli($mysql_server,$mysql_login,$mysql_pass,$base_datos)or die('Error de conexion a mysql: ' . $conexion->error.'<br />');
	return $conexion;
}

?>