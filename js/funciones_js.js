$(document).ready(function() {

	nombre_url();
	mensajeRegistrado();
	actu_scroll();
	imagenes_slider();
	eliminar();
	
//Ocultamos subir contenido si no esta registrado el pueblo y si no hemos iniciado sesión-----
	if(!document.getElementById('regis_enlace')&&!document.getElementById('entrar')){
		document.getElementById('subir_datos').style.visibility = "visible";
	}
	if(!document.getElementById('regis_enlace')&&!document.getElementById('entrar')){
		document.getElementById('mensajeActivo').style.visibility = "visible";
	}	

	var CargaMens;
	var CargaNum;

	$(".chatActivo").click(function(){
		$.ajaxSetup({"cache":false});
		CargaMens=setInterval("cargarMensaje()",2000);
		CargaNum=setInterval("mensajeSinLeer()",2000);
	});

	$(".chatIn").click(function(){
		CargaNum=setInterval("mensajeSinLeer()",3000);
		clearInterval(CargaMens);
	});

	
});

var eliminar=function(){
	$('.borrando').on('click', function(e) {
		e.preventDefault();
        var item_id = $(this).attr('name');
		var parametro= {
		"item_id": item_id
		};
		$('[name='+item_id+']').remove();
		
       $.ajax({
	 
            type: "POST",
            url: "php/manejoDatos.php",
            data: parametro,
            success: function(response) {
	
                $('#'+item_id).empty();
                $('#'+item_id).append(response).fadeIn(3000);
				$('#'+item_id).fadeOut("slow");
			}
	   });
    });
	
}

var imagenes_slider=function(){
	$(".sliderPrincipal").backstretch([
		'img/panoramic-1.jpg',
		'img/panoramic-2.jpg',
		'img/panoramic-3.jpg',
		'img/panoramic-4.jpg',
		'img/panoramic-5.jpg'
		], {duration: 4000, fade: 1000});
}

var actu_scroll= function(){
$('#bot_baja').on('click',function(){	
    //Pongo el scroll al final
    $("#conversacionContenedor").animate({ scrollTop: $('#conversacionContenedor').prop("scrollHeight")}, 1000);

});
}


var mensajeRegistrado= function(){
$("#bot_chat").on("click",function(e){
	e.preventDefault();
	var mensaje=$("#mensaje").val();
	var parametro= {
		"mensaje": mensaje
		};

	$.ajax({
			"method": "POST",
			"url": "php/chat.php",
			"data": parametro
		}).done(function(info){
			$("#mensaje").val("");
		});
});
	
}


var cargarMensaje= function(){
	var menCa='';
	var parametro= {
		"menCa": menCa
	};
	$.ajax({
		"method":"POST",
		"data": parametro,
		"url":"php/chat.php"
		}).done(function(info){
			$("#conversacionContenedor").html(info);
			$("#conversacionContenedor p:last-child").css({"background-color":"lightgreen"});
			$("#conversacionContenedor p").addClass("p-1");			
	});		
}


var mensajeSinLeer= function(){	
	var menSL='';
	var parametro= {
		"menSL": menSL
	};
	$.ajax({
		"method":"POST",
		"data": parametro,
		"url":"php/chat.php"		
		}).done(function(info){
			$("#numMensaje2").html(info);
			$("#numMensaje2_").html(info);
	});		
}



//SACAR PARTE DE LA URL DESPUES DE (?)-------------------------------------------------------
function nombre_url(){
	var loc = document.location.href;
    if (loc.indexOf('?') > 0) {
        var getString = loc.split('?')[1];
						
		switch (getString) {			
			case 'olv=olv#popup2'://Olvidar contraseña-------------------------------------
				document.getElementById('formuOlv').style.display = "block";
				document.getElementsByClassName('cerrar_olv')[0].style.display = "block";
			break;
			
			case 'hist=hist#popup2'://Mostrar formulario historia--------------------------
				document.getElementById('formuHist').style.display = "block";
				document.getElementById('mens6').style.display = "block";
				document.getElementsByClassName('cerrar_his')[0].style.display = "block";
			break;
			
			case 'fot=fot#popup2'://Mostrar forumulario foto-------------------------------
				document.getElementById('formuFoto').style.display = "block";
				document.getElementById('foto_').style.display = "block";
				document.getElementById('bot_sub').style.display = "block";
				document.getElementsByClassName('cerrar_fot')[0].style.display = "block";
			break;
			
			case '#inf'://Tab info activa y scroll-----------------------------------------
				eliminar_activo();
				$(".inf_cla").addClass("active");
				$("#inf").addClass("active");
				$("#inf").addClass("show");	
				$('html, body').animate({
					scrollTop: $("#inf").offset().top
				}, 2000);
			break;
			
			case '#fot'://Tab galeria activa y scroll--------------------------------------
				eliminar_activo();
				$(".gale_cla").addClass("active");
				$("#gale").addClass("active");
				$("#gale").addClass("show");	
				$('html, body').animate({
					scrollTop: $("#gale").offset().top
				}, 2000);
			break;			
		}
    }	
}

//ELIMINAR TABS ACTIVAS -------------------------------------------------------------------
function eliminar_activo(){
	//Para sacar el id del contenido de las tabs que esta en el href
	var tabs=$(".nav.nav-tabs .nav-item a.active").attr("href");
	//Sacar el nombre de la clase de la tab
	var tabs2=$(".nav.nav-tabs .nav-item a.active").attr("class");
	//Separa el string según espacios en blanco para obtener la clase
	tabs2 = tabs2.split(' ').slice(2, 3); 
	
	tabs=$(""+tabs+"");
	tabs2=$("."+tabs2+"");
	tabs.removeClass("active");
	tabs2.removeClass("active");
}
//VALIDAR DNI---------------------------------------------------------------------------
function nif(dni) {
    var numero;
    var letr;
    var letra;
    var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if (expresion_regular_dni.test(dni) == true) {
        numero = dni.substr(0, dni.length - 1);
        letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        //Comprueblo la letra que corresponda con el dni
        if (letra != letr.toUpperCase()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

//VALIDAR EMAIL---------------------------------------------------------------------------
function validarEmail(valor) {
    var expresion_regular_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var tamano = valor.length;

    if (tamano == 0) {
        return false;
    } else {
        if (expresion_regular_email.test(valor) == true) {
            return true;
        } else {
            return false;
        }
    }
}

//VALIDAR NOMBRE Y APELLIDO (solo contendrá letras)--------------------------------------------
function validar_nombre(nombre) {
    var reg = /^([a-z ñáéíóú]{2,60})$/i;
	if(reg.test(nombre)){
		return true;
	}
	else {
		return false;
	}
}

//VALIDAR EDAD (comprobar si es mayor de edad)-----------------------------------------------
function edad(valor) {
    var ano = valor.substr(0, 4);
    var mes = valor.substr(5, 2);
    var dia = valor.substr(8, 2);

    var fecha = new Date();
    var ano_actual = fecha.getFullYear();
    var mes_actual = fecha.getMonth() + 1;
    var dia_actual = fecha.getDate();
	
    var ed = ano_actual - ano;
    var m = mes_actual - mes;
    var d = dia_actual - dia;

    if (ano == "" || ed>80) {
        return false;
    } else {
        if (ed >= 18) {
            return true;
        }
        if (ed == 17 && m >= 0 && d >= 0) {
            return true;
        } else {
            return false;
        }
    }
}

//VALIDAR CONTRASEÑAS----------------------------------------------------------------
function validar_contrasenas(p1,p2) {

	if(p2==""){
		p2=p1;
	}

    //Que no haya espacios en blanco
    var espacios = false;
    var cont = 0;

    while (!espacios && (cont < p1.length)) {
        if (p1.charAt(cont) == " ")
            espacios = true;
        cont++;
    }

    //Que no contenga espacios en blanco
    if (espacios) {
        return false;
    }

    //Que no nos hayan dejado un campo vacío
    if (p1.length == 0 || p2.length == 0) {
        return false;
    }

    //Que ambas contraseñas coincidan
    if (p1 != p2) {
        return false;
    } else {
        return true;
    }

}

//VALIDAR CÓDIGO POSTAL--------------------------------------------------------------------
function validarCodigoPostal(codP) {
    var cp = codP;
    if (cp.length == 5 && parseInt(cp) >= 1000 && parseInt(cp) <= 52999) {
        return true;
    } else {
        return false;
    }
}

//CAMBIAR GALERIA, HISTORIA, INFO segun la búsqueda-----------------------------------------
function mostrar_in(dato){
	var buscador = document.getElementById("n_p").value;
    var parametros = {
        "dato": dato,
		"buscador": buscador
   };

    $.ajax({
        "data": parametros,
        "url": "php/funciones.php",
        "method": "POST",
        "success": function(response) {
            $("#"+dato).html(response);
        }
    });
	
}

function elimina_nodo(nodo){
	while (nodo.firstChild) {
		nodo.removeChild(nodo.firstChild);
	}
}

//BUSCAR PUEBLOS---------------------------------------------------------------------------
function buscar_pueblo() {
    var buscador = document.getElementById("n_p").value;
	var elemento=document.getElementById('datos0');
	var gale=document.getElementById('album');
	var donde_comer=document.getElementById('donde_comer');
	var monumentos=document.getElementById('monumentos');
	var alojamiento=document.getElementById('alojamiento');
	var nombre_evento=document.getElementById('nombre_evento');
	var nombre_pu=document.getElementById('nombre_pu');
	var nombre_pu2=document.getElementById('nombre_pu2');
	
    var parametros = {
        "buscador": buscador
    };
	
	elimina_nodo(nombre_pu);
	elimina_nodo(nombre_pu2);
	elimina_nodo(elemento);
	elimina_nodo(gale);
	elimina_nodo(donde_comer);
	elimina_nodo(monumentos);
	elimina_nodo(alojamiento);
	elimina_nodo(nombre_evento);
		
	mostrar_in('nombre_pu');	
	mostrar_in('nombre_pu2');
	mostrar_in('album');
	mostrar_in('datos0');
	mostrar_in('donde_comer');
	mostrar_in('monumentos');
	mostrar_in('alojamiento');
	mostrar_in('nombre_evento');
}

//SUBIR INFORMACIÓN DONDE COMER, ALOJAMIENTO-----------------------------------------
function subir_info() {	
    var com = document.getElementById("comer_").value;
	var mon=document.getElementById("visita_").value;
	var aloj=document.getElementById("aloja_").value;
	var nom_fiesta=document.getElementById("no_ev_").value;
	var fiest_i=document.getElementById("fechaFI_").value;
	var fies_f=document.getElementById("fechaFF_").value;

    var parametros = {
        "com": com,
		"mon": mon,
		"aloj": aloj,
		"nom_fiesta": nom_fiesta,
		"fiest_i": fiest_i,
		"fies_f": fies_f
    };	
	
    $.ajax({
        "data": parametros,
        "url": "php/manejoDatos.php",
        "method": "POST"
		}).done(function(response){
			$("#comer_").val("");
			$("#visita_").val("");
			$("#aloja_").val("");
			$("#no_ev_").val("");
			$("#fechaFI_").val("");
			$("#fechaFF_").val("");
			$("#m_c_info").html(response);
		});

}

//SUBIR HISTORIA-----------------------------------------------------------
function subir_hist() {	
    var texto_h = document.getElementById("mens6").value;

    var parametros = {
        "texto_h": texto_h
    };

    $.ajax({
        "data": parametros,
        "url": "php/manejoDatos.php",
        "method": "POST"
		}).done(function(response){
            $("#m_c_hist").html(response);
	
    });
}

//HE OLVIDADO MI CONTRASEÑA-----------------------------------------------------------
function olvidar() {	
    var email0 = document.getElementById("email").value;
	var dni0 = document.getElementById("dni").value;
	
    var parametros = {
		"dni0": dni0,
        "email0": email0
		
    };

    $.ajax({
        "data": parametros,
        "url": "php/manejoDatos.php",
        "method": "POST"
		}).done(function(response){
            $("#m_c_olv").html(response);
	
    });
}

function subir_fot() {	
    var foto = document.getElementById("foto_").value;

    var parametros = {
        "foto": foto
    };

    $.ajax({
        "data": parametros,
        "url": "php/manejoDatos.php",
        "method": "POST"
	});
    
}



