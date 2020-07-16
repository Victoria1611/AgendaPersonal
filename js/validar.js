

$(document).ready(function() {
		
	
//SI HACEMOS CLICK EN ACEPTAR DE REGISTRO2.PHP---------------------------------------------
	$("#env_r").click(function() {
		var dni_, nombre_, apellidos_, n_pueblo, email_, fecha_n, password_, cpassword_, cont;
         dni_ = $("#dni").val();
         nombre_ = $("#nombre").val();
         apellidos_ = $("#apellidos").val();
         n_pueblo = $("#select_pue").val();
         email_ = $("#email").val();
         fecha_n = $("#fechaN").val();
         password_ = $("#password").val();
         cpassword_ = $("#cpassword").val();
         cont = 0;
		 
		//DNI
		if (nif(dni_)) {
            $("#dni").css({
                'border-color': 'green'
            });
            cont++;
        } else {
           $("#dni").css({
                'border-color': 'red'
            });			
        }		
		//NOMBRE
        if (validar_nombre(nombre_)) {
            $("#nombre").css({
                'border-color': 'green'
            });
            cont++;
        } else {
            $("#nombre").css({
                'border-color': 'red'
            });
        }
        //APELLIDOS
        if (validar_nombre(apellidos_)) {
            $("#apellidos").css({
                'border-color': 'green'
            });
            cont++;
        } else {
            $("#apellidos").css({
                'border-color': 'red'
            });
        }
        //EMAIL
        if (validarEmail(email_)) {
            $("#email").css({
                'border-color': 'green'
            });
            cont++;
        } else {
            $("#email").css({
                'border-color': 'red'
            });
        }
		//EDAD
        if (edad(fecha_n)) {
            $("#fechaN").css({
                'border-color': 'green'
            });
            cont++;
        } else {
            $("#fechaN").css({
                'border-color': 'red'
            });
        }
		//CONTRASEÑA
        if (validar_contrasenas(password_,cpassword_)) {
            $("#cpassword").css({
                'border-color': 'green'
            });
            $("#password").css({
                'border-color': 'green'
            });
            cont++;
        } else {
            $("#cpassword").css({
                'border-color': 'red'
            });
            $("#password").css({
                'border-color': 'red'
            });
        }
		
		if(cont==6||cont==6&&validarEmail(email_)==false){
			var parametros = {
			"dni_": dni_,
			"nombre_": nombre_,
			"apellidos_": apellidos_,
			"n_pueblo": n_pueblo,
			"email_": email_,
			"fecha_n": fecha_n,
			"password_": password_,
			"cpassword_": cpassword_,
			"env_r":"env_r"
			};
			
			 $.ajax({
			"data": parametros,
			"url": "../php/comprobarUsuario.php",
			"method": "POST"
			}).done(function(response){
				$("#m_c_registro").html(response);
			});
		}
		else{
			$("#m_c_registro").html('<span class="text-danger">RELLENA LOS CAMPOS VACIOS</span>');
		}
	});
	

//EDITAR PERFIL--------------------------------------------------------------
$("#env_ed").click(function() {

	var nombre,apellidos,email,fecha_n,pass,pass2,pass_N,pass2_N,cont;
	nombre=$("#nombre").val();
    apellidos = $("#apellidos").val();     
    email = $("#email").val();
    fecha_n = $("#fechaN").val();
    pass = $("#password").val();
	pass_N = $("#password_N").val();
    pass2_N = $("#cpassword_N").val();
    cont = 0;	
	
	//NOMBRE
    if(nombre==""){
		cont++;
		}
	else{
		if (validar_nombre(nombre)) {
			cont++;
		}
		else{
			$("#nombre").css({
				'border-color': 'red'
			});
		}
	}
	    
    //APELLIDOS 
    if(apellidos==""){
		cont++;
		}
	else{
		if (validar_nombre(apellidos)) {
			cont++;
		}
		else{
			$("#apellidos").css({
				'border-color': 'red'
			});
		}
	}

    //EMAIL
    if(email==""){
		cont++;
		}
	else{
		if (validarEmail(email)) {
			cont++;
		}
		else{
			$("#email").css({
				'border-color': 'red'
			});
		}
	}
	//EDAD
	if(fechaN==""||fechaN=="[object HTMLInputElement]"){
		cont++;
	}
	else{
		if (edad(fecha_n)) {
			cont++;
		}
		else{
			$("#fechaN").css({
				'border-color': 'red'
			});
		}
	}
   
	
	//CONTRASEÑAS 2	
	if(pass_N==""&&pass2_N==""){
		cont++;
	}
	else{
		if (validar_contrasenas(pass_N,pass2_N)) {
			cont++;
		}
		else{
			$("#cpassword_N").css({
                'border-color': 'red'
            });
            $("#password_N").css({
                'border-color': 'red'
            });
		}
	}
	
	
	var parametros = {
        "nombre": nombre,
		"apellidos": apellidos,
		"email": email,
		"fecha_n": fecha_n,
		"pass": pass,
		"pass_N": pass_N,
		"pass2_N": pass2_N
		};
		
		$.ajax({
        "data": parametros,
        "url": "../php/manejoDatos.php",
        "method": "POST"
		}).done(function(response){
			$("#mens_edit").html(response);
		});
	

});
	

//SI HACEMOS CLICK EN ACEPTAR DE LOGIN2.PHP---------------------------------------
    $("#env_l").click(function() {
	var dni_, password_, pass2, cont;
         dni_ = $("#dni").val();
         password_ = $("#password").val();
		 pass2="";
         cont = 0;
				
        if (nif(dni_)&&validar_contrasenas(password_,pass2)) {
            cont++;
        } 

        if (cont == 1) { //Si la validación es correcta...
		   var parametros = {
			"dni_": dni_,
			"password_": password_,
			"env_l": "env_l"
			};
			
		    $.ajax({
			"data": parametros,
			"url": "../php/comprobarUsuario.php",
			"method": "POST"
			}).done(function(response){
			//alert(response);
				if(response==1){
					location.href='http://localhost/proyecto/index.php';
					//location.href='http://www.promocionatupueblo.com.mialias.net/index.php';
				}
				else{
					$("#m_e").html(response);
				}
				
			});
	   
        } else {
			$("#m_e").html('ERROR EN EL DNI');	   
        }

  });

//VALIDAR REGISTRO DEL PUEBLO-----------------------------------------------------------------
$("#env_p").click(function() {
	var dni, nombre, cp, pass, pass2, cont;
     dni = $("#dni_p").val();
     nombre = $("#select_pue").val(); //nombre_p
     cp = $("#cp").val();
     pass = $("#password_pue").val();
     cont = 0;

		if (nif(dni)) {
			cont++;
			$("#dni_p").css({
                'border-color': 'green'
            });
		}
		else{
			$("#dni_p").css({
                'border-color': 'red'
            });
		}
		
		if (validar_contrasenas(pass,pass)) {
			cont++;
		}
		else{
			$("#password_pue").css({
                'border-color': 'red'
            });
			
		}
		
		if (validarCodigoPostal(cp)) {
			cont++;
			$("#cp").css({
                'border-color': 'green'
            });
		}
		else{
			$("#cp").css({
                'border-color': 'red'
            });
			
		}

		var parametros = {
        "dni": dni,
		"nombre": nombre,
		"cp": cp,
		"pass": pass
		};
		
		$.ajax({
        "data": parametros,
        "url": "php/comprobarPueblo.php",
        "method": "POST"
		}).done(function(response){
			$("#menDatos").html(response);
		});
});


});

