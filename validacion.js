$(document).ready(function() {
	eliminar();
	editar();
});


function editaYa(){
	var item_edit = $('[name='+"boto_ed"+']').attr('id');
	var nom=document.getElementById("nomb_").value;
	var tele=document.getElementById("tel").value;
	location.href='http://localhost/index.php?nombre=CONTACTOS&valorEd='+item_edit+'&nomb='+nom+'&telef='+tele;
	//location.href='http://localhost/index.php?nombre=CONTACTOS&valorEd='+item_edit+'&nomb='+nom+'&telef='+tele;

}

var editar=function(){
	$('.editando').on('click', function(e) {
		e.preventDefault();
        var item_edit = $(this).attr('name');//id
		var item = $(this).attr('id');//num
				
		$('[name='+"bot_gu"+']').attr("name","boto_ed");
		$('[name='+"boto_ed"+']').attr("id",item_edit);
		$('[name='+"boto_ed"+']').attr("value","Editar contacto");
		$('[name='+"boto_ed"+']').attr("type","button");
		$('[name='+"boto_ed"+']').attr("onclick","editaYa()");
		document.getElementById("nomb_").value="NUEVO NOMBRE";
		document.getElementById("tel").value=item;	   
    });
	
}

		
var eliminar=function(){
	$('.borrando').on('click', function(e) {
		e.preventDefault();
        var item_id = $(this).attr('name');
		var parametro= {
		"item_id": item_id
		};
		$('[name='+item_id+']').remove();
		
       $.ajax({ 
            "method": "POST",
            "url": "calendario.php",
            "data": parametro,
            success: function(response) {
	
                $('#'+item_id).empty();
                $('#'+item_id).append(response).fadeIn(3000);
				$('#'+item_id).fadeOut("slow");
			}
	   });
    });
	
}