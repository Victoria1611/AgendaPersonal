<?php
	
$mysql_server="localhost";
$mysql_login="root";
$mysql_pass="victoria";

$conexion=new mysqli($mysql_server,$mysql_login,$mysql_pass) or die('Error de conexion a mysql: ' . $conexion->error.'<br />');

if (!$conexion->set_charset("utf8")) {
    printf("Error cambiando el juego de caracteres utf8: %s\n", $conexion->error);
} else {
    printf("Juego de caracteres actual: %s\n", $conexion->character_set_name());
}

if($conexion->query("Create database agenda")==1){ 
	$conexion->query("Create database agenda");
	$conexion->select_db("agenda");
	$conexion->query("Create table contenido (id int UNSIGNED NOT NULL AUTO_INCREMENT primary key,nomb_contacto VARCHAR(25),tarea TEXT,num_telf int(9),fecha DATE)");
	
	
	echo '<br />Tabla contenido creada';
}
$conexion->select_db("pueblos_cuenca");

?>