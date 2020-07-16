<?php
require_once('calendario.php');
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

    <title>Agenda Personal</title>

    <script src="js/jquery-3.3.1.slim.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script type="text/javascript" src="validacion.js"></script>
</head>

<body>

    <div class="container-fluid">
        <div class="row bg-light">

            <div class="col-12 col-md-4 d-flex justify-content-center align-items-center">

                <ul class="nav">
                    <li class="nav-item dropdown m-2">
                        <a class="nav-link dropdown-toggle float-right text-info" id="men" data-toggle="dropdown"
                            href="opc">
                            <i class="fas fa-align-justify"></i>
                            <span>Menu</span>
                        </a>
                        <ul class="dropdown-menu bg-light">
                            <li class="nav-item"><a class="nav-link text-info"
                                    href="index.php?nombre=CALENDARIO">Calendario</a>
                            </li>
                            <li class="nav-item"><a class="nav-link text-info"
                                    href="index.php?nombre=CONTACTOS">Contactos</a>
                            </li>
                            <li class="nav-item"><a class="nav-link text-info" href="index.php?nombre=TAREAS">Tareas</a>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>

            <div class="col-12 col-md-4 d-flex justify-content-center align-items-center">

                <div class="m-2 text-info"><?php echo $_GET['nombre']?></div>

            </div>



            <div class="col-12 col-md-4 d-flex justify-content-center align-items-center">
                <div class="m-2 text-info"><i class="fa fa-address-book" aria-hidden="true"></i>
                    Agenda personal Victoria</div>
            </div>
        </div>


    </div>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-12 contenido d-flex justify-content-center align-items-center">
                <?php 
                    if(!isset($_GET['nombre'])||$_GET['nombre']=='CALENDARIO'){
                        mostrar_fecha();
                        echo calend();}


                    if($_GET['nombre']=='CONTACTOS'){

?>
                <form role="form" id="formu" method="POST">

                    <div class="input-group">
                        <input name="nomb" id="nomb_" type="text" class="form-control"
                            placeholder="Introduce un nombre">
                        <input name="tel" id="tel" type="text" class="form-control" placeholder="Introduce un teléfono">
                        <input name="bot_gu" type="submit" value="Guardar contacto" onclick="">

                    </div>

                    <br />
                    <div class="m-auto text-center"><span class="text-info text-center">LISTA DE CONTACTOS: </span>
                        <br />
                        <?php
                echo contactos();
               
                    }
                    ?>
                    </div>
                </form>

                <br />


                <?php

                    if($_GET['nombre']=='TAREAS'){
                        
                        ?>

                <form action="calendario.php" class="m-auto text-center" role="form" id="formu2" method="POST">


                    Introduce la fecha para la tarea:
                    <input name="fecha" id="fecha_" type="date" class="form-control"><br />

                    <textarea class="form-control" name="conten" rows="4" cols="10"
                        placeholder="Escribe aquí la tarea o evento..."></textarea><br />

                    <input name="bot_tar" type="submit" value="Subir tarea"><br /><br /><br />

                    <div class="m-auto text-center"><span class="text-info">LISTA DE TAREAS: </span><br />
                        <?php
                        echo tareas();
                        }


                ?>
                    </div>

                </form>
                <br />


            </div>
        </div>
    </div>
</body>

</html>