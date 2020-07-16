
<?php
require_once('conexion.php');

//Mostrar fechas

function mostrar_fecha(){
	$conexion=conex();
	$consulta_mysql=$conexion->query("select tarea,fecha from contenido");            
	while($fila= mysqli_fetch_row($consulta_mysql)){
		if($fila[0]!=""){
			$numEntero=strtotime($fila[1]);
			//echo  strtotime($fila[1])."<br />";
			$anio = date("Y", $numEntero);
			$mes = date("m", $numEntero);
			$dia = date("d", $numEntero);
			//echo $anio, $mes, $dia;
		}
	}
}

//Mostrar contactos
function contactos(){
$conexion=conex();
$consulta_mysql=$conexion->query("select nomb_contacto,num_telf,id from contenido");            
while($fila= mysqli_fetch_row($consulta_mysql)){
	if($fila[1]!=0){
	$mensaje="<div class='alert alert-success' id='".$fila[2]."' style='display:none;'></div><br />";        
				
	echo "<span name='".$fila[2]."'>".$fila[0]."------".$fila[1]."</span><a class='editando' href='#' id='".$fila[1]."' name='".$fila[2]."'><i class='fa fa-pen m-2 text-secondary' title='Editar' aria-hidden='true'></i></a><a class='borrando' href='#' name='".$fila[2]."'><i class='fas fa-trash-alt text-danger' title='Eliminar'></i></a>
	".$mensaje;
}
}
}

//Mostrar tareas
function tareas(){
	$conexion=conex();
	$consulta_mysql=$conexion->query("select tarea,fecha,id from contenido");            
	while($fila= mysqli_fetch_row($consulta_mysql)){
	if($fila[0]!=""){
		$mensaje="<div class='alert alert-success' id='".$fila[2]."' style='display:none;'></div><br />";        				
		echo "<span name='".$fila[2]."'>".$fila[0]."------".$fila[1] ."</span><a class='editando' href='#' name='".$fila[2] ."'></a><a class='borrando' href='#' name='".$fila[2]."'><i class='fas fa-trash-alt text-danger' title='Eliminar'></i></a>
	".$mensaje;
	}
}
}
//Eliminar dato
if(isset($_POST['item_id'])){
	$conexion=conex();
	$valor=intval($_POST['item_id']);
	$borra=$conexion->query("delete from contenido where id=".$valor."");
	echo 'Eliminado';
}

//Actualizar/editar contacto
if(isset($_REQUEST['valorEd'])&&isset($_REQUEST['nomb'])&&isset($_REQUEST['telef'])){
	$conexion=conex();
	$consulta_mysql=$conexion->query("UPDATE contenido SET nomb_contacto = '".$_REQUEST['nomb']."',
	num_telf = ".$_REQUEST['telef']." WHERE id = ".$_REQUEST['valorEd']."");
	header("Location: index.php?nombre=CONTACTOS");
}


//Insertar tarea
if(isset($_POST['bot_tar'])){
	if ($_POST['conten']!=""&&$_POST['fecha']!=""){
	$conexion=conex();
			$nombre=null;
			$telef=0;
			$tarea=$_POST['conten'];
			$fecha=$_POST['fecha'];
			$consulta_mysql=$conexion->query("insert into contenido (nomb_contacto,tarea,num_telf,fecha) values ('$nombre','$tarea',$telef,'$fecha')");			
		}
		header("Location: index.php?nombre=TAREAS");
}


//Insertar contactos
	if(isset($_POST['bot_gu'])){
			if ($_POST['nomb']!=""&&$_POST['tel']!=""&&!isset($_POST['item_edit'])){
			$nombre=$_POST['nomb'];
			$telef=intval($_POST['tel']);
			$tarea=null;
			$conexion=conex();
			$consulta_mysql=$conexion->query("insert into contenido (nomb_contacto,tarea,num_telf,fecha) values ('$nombre','$tarea',$telef,now())");			
		
		}
		header("Location: index.php?nombre=CONTACTOS");
	}
	

?>
<?php
function calend(){
?>
<table class="table border" border="0" cellpadding="6">

<?php

date_default_timezone_set('Europe/Madrid');
setlocale(LC_TIME,"esp");

if(isset($_GET['mes2'])){
	$mes=$_GET['mes2'];
	$ano=$_GET['ano2'];
	if($_GET['mes2']>12){
		$ano=$_GET['ano2']+1;
		$mes=1;
		$_GET['mes2']=1;
	}
	
}
else{
	$mes=date ("m");
	$ano=date ("Y");
}

$empieza=1;
$semana_santa=date ("d",easter_date($ano));
$semana_santa_mes=date ("m",easter_date($ano));

$ultimo_dia= date("d",mktime(0,0,0, $mes+1,0,$ano));

$primer_dia= 1;
$primer_dia_letra= date("D",mktime(0,0,0, $mes,$empieza,$ano));

$mes_letra=  ucwords(strftime("%B",mktime(0,0,0, $mes,$empieza,$ano)));

if($primer_dia_letra=="Mon"){
	$numero_dia=1;
}
if($primer_dia_letra=="Tue"){
	$numero_dia=2;
}
if($primer_dia_letra=="Wed"){
	$numero_dia=3;
}
if($primer_dia_letra=="Thu"){
	$numero_dia=4;
}
if($primer_dia_letra=="Fri"){
	$numero_dia=5;
}
if($primer_dia_letra=="Sat"){
	$numero_dia=6;
}
if($primer_dia_letra=="Sun"){
	$numero_dia=7;
}

if($numero_dia>=5){
	$filas=6;
}
else{
	$filas=5;
}
?>
<td colspan="7" style="text-align:center;background-color:#28bcec;font-weight: bold;"><a href="?mes2=<?php echo $mes-1?>&ano2=<?php echo $ano?>&nombre=<?php echo 'CALENDARIO'?>"><i class="fa fa-arrow-left mr-3" aria-hidden="true"></i></a><?php echo $mes_letra?> de <?php echo $ano ?><a href="?mes2=<?php echo $mes+1 ?>&ano2=<?php echo $ano ?>&nombre=<?php echo 'CALENDARIO'?>"><i class="fa fa-arrow-right ml-3" aria-hidden="true"></i></a></td>
<tr>

<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Lunes</td>
<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Martes</td>
<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Miércoles</td>
<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Jueves</td>
<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Viernes</td>
<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Sábado</td>
<td class="text-center" style="background-color:#94e5ff;font-weight: bold;">Domingo</td>
<tr>

<?php

for($i=1;$i<=$filas;$i++){
	
	for($j=1;$j<=7;$j++){
	
		$conexion=conex();
			$consulta_mysql=$conexion->query("select tarea,fecha from contenido");            
			while($fila= mysqli_fetch_row($consulta_mysql)){
				if($fila[0]!=""){
				
					$numEntero=strtotime($fila[1]);
					$anio = date("Y", $numEntero);
					$mesEn = date("m", $numEntero);
					$diaEn = date("d", $numEntero);
					if($mesEn==$mes){
						if($primer_dia==$diaEn){
						
						?>
						
						<td class="bg-info" style="text-align:center;">
						<?php
						echo "<a class='text-dark' href='index.php?nombre=TAREAS'>EVENTO<br />".$primer_dia++."</a>";
						$j++;
						?>
						</td>
						<?php
						}
					}
					//echo $anio, $mes, $dia;
				}
			}
			
		if($j==7||$primer_dia==1&&$mes==1||$primer_dia==1&&$mes==5||$primer_dia==15&&$mes==8||
		$primer_dia==12&&$mes==10||$primer_dia==1&&$mes==11||$primer_dia==6&&$mes==12||
		$primer_dia==8&&$mes==12||$primer_dia==9&&$mes==12||$primer_dia==25&&$mes==12||
		$semana_santa==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-1==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-2==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-3==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-4==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-5==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-6==$primer_dia&&$mes==$semana_santa_mes||$semana_santa-7==$primer_dia&&$mes==$semana_santa_mes){


?>
			<td style="background-color:#73f7bf;text-align:center;">
<?php
		}
		
		
		else{	
?>
			
			
			<td style="text-align:center;">
<?php
		}	
		
		//if(){
			/*$conexion=conex();
			$consulta_mysql=$conexion->query("select tarea,fecha from contenido");            
			while($fila= mysqli_fetch_row($consulta_mysql)){
				if($fila[0]!=""){
				
					$numEntero=strtotime($fila[1]);
					$anio = date("Y", $numEntero);
					$mesEn = date("m", $numEntero);
					$dia = date("d", $numEntero);
					if($mesEn==$mes){
						if($primer_dia==$dia){
						$color="bg-info";
						?>
						
						<td class="bg-info" style="text-align:center;">
						<?php
						}
					}
					//echo $anio, $mes, $dia;
				}
			}*/
		//}
		
		
		if($j<$numero_dia&&$i==1){
			echo " ";
		}
		else{
	
			if ($primer_dia<=$ultimo_dia&&$primer_dia!=null){ ?>
			
				<a href="index.php?nombre=TAREAS&dia=<?php echo $primer_dia;?>&mes=<?php echo $mes;?>" name="<?php echo $primer_dia;?>"> <?php echo $primer_dia;
				$primer_dia++;
			}
			else{
				$primer_dia=null;?>
				<a href="index.php?nombre=TAREAS&dia=<?php echo $primer_dia;?>&mes=<?php echo $mes;?>" name="<?php echo $primer_dia;?>"> <?php echo $primer_dia;
				}

		}
	}
?>


<tr>
<?php
}

?>
</a>
</td>
</tr>
</tr>
</tr>
</table>

<?php
}
?>
