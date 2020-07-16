<?php
//eliminar
require_once('conexion.php');

if(isset($_POST['item_edit'])){
	$conexion=conex();
	$valor=$_POST['item_edit'];
	//echo '¡Edítalo en los campos de arriba!';
	$telf=intval($_POST['telf']);
	$nom_cont=$_POST['nomb'];
	$consulta_mysql=$conexion->query("UPDATE contenido SET nomb_contacto = '".$nom_cont."',
	num_telf = ".$telf." WHERE id = ".$valor."");
}

/*
if(isset($_POST['bot_ed'])){

		$telf=intval($_POST['telf']);
		$nom_cont=$_POST['nomb'];
		$valor=intval($_POST['item_class']);
		//$consulta_mysql=$conexion->query("UPDATE contenido SET nomb_contacto = '".$nom_cont."',
		//num_telf = ".$telf." WHERE id = ".$valor."");
		echo $telf, $nom_cont, $valor;
	//header("Location: index.php?nombre=CONTACTOS&valor2=".$valor.");
}*/

?>