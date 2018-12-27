var vendimiaControllers = angular.module('vendimiaControllers', []);


vendimiaControllers.controller('ventasCtrl', function($scope, $http) {
    
    $scope.date = new Date();
	
	$scope.id = '';
	$scope.folio = '';
	$scope.id_cliente = '';
	$scope.rfc = '';
	$scope.id_articulo = 0;
	$scope.modelo = '';
	$scope.precio = 0;
	$scope.articulos = [];
	$scope.tasafinanciamiento = 0;
	$scope.plazomaximo = 0;
	$scope.porcenganche = 0;
	$scope.enganche = 0;
	$scope.bonificacion = 0;
	$scope.total = 0;
	$scope.mensualidades = [];
	 $scope.searchText = '';
	  $scope.searchItem = '';
	//mostrar pantalla listado
	$scope.listado = function() {
		//mostrar datos
		$http.get("ventas/listaventas.php")
		.then(function (response) {
		    console.log(response);
		    if( (typeof response.data === "object") && (response.data !== null) )
            {
		         $scope.ventas = response.data;
            }else{
                $scope.ventas = {};
            }
		    
		});
		$scope.isnuevo = false;
		$scope.islistado = true;
		
    };
	$scope.listado();
	
	//mostrar pantalla nueva venta
	$scope.addventa = function() {
		//recuprar folio
    	$http({
           method: 'post',
           url: 'folios/getfolio.php',
           data: {tipo:'3'}
         }).then(function successCallback(response) {
           $scope.folio = response.data;
         });
         
		//recuprar informacion general
		$http.get("configeneral/getconfig.php")
		.then(function (response) {
		    console.log(response.data);
		    if( (typeof response.data === "object") && (response.data !== null) )
            {
                console.log("tiene datos");
                $scope.tasafinanciamiento = response.data.tasa_financiamiento;
    		    $scope.porcenganche = response.data.porc_enganche;
    		    $scope.plazomaximo = response.data.plazo_maximo;
            }else{
                 console.log("nooo tiene datos");
            }
		});
		
		$scope.isnuevo = true;
		$scope.islistado = false;
		$scope.id = '';
		$scope.folio = '';
    };
	
	//autocomplete clentes
   $scope.fetchCustomer = function(){
      var searchText_len = $scope.searchText.trim().length;

      // Check search text length
      if(searchText_len >= 3){
         $http({
           method: 'post',
           url: 'clientes/getClientes.php',
           data: {searchText:$scope.searchText}
         }).then(function successCallback(response) {
             console.log(response.data);
           $scope.searchResult = response.data;
         });
      }else{
         $scope.searchResult = {};
      }
                
   }

   // Set value to search box
   $scope.setValue = function(index,$event){
      $scope.searchText = $scope.searchResult[index].clave + " " + $scope.searchResult[index].nombre;
      $scope.id_cliente = $scope.searchResult[index].id;
      $scope.rfc = $scope.searchResult[index].rfc;
      $scope.searchResult = {};
      $event.stopPropagation();
   }

   $scope.searchboxClicked = function($event){
      $event.stopPropagation();
   }

   $scope.containerClicked = function(){
      $scope.searchResult = {};
   }
	
	
	//autocomplete articulos
   $scope.fetchItems = function(){
      var searchItem_len = $scope.searchItem.trim().length;

      // Check search text length
      if(searchItem_len >= 3){
         $http({
           method: 'post',
           url: 'articulos/getArticulos.php',
           data: {searchText:$scope.searchItem}
         }).then(function successCallback(response) {
           $scope.searchResult2 = response.data;
         });
      }else{
         $scope.searchResult2 = {};
      }
                
   }

   // Set value to search box
   $scope.setValue2 = function(index,$event){
      $scope.searchItem = $scope.searchResult2[index].descripcion;
      $scope.id_articulo = $scope.searchResult2[index].id;
      $scope.modelo = $scope.searchResult2[index].modelo;
      $scope.precio = $scope.searchResult2[index].precio;
      $scope.existencia = $scope.searchResult2[index].existencia;
      $scope.searchResult2 = {};
      $event.stopPropagation();
   }

   $scope.searchboxClicked2 = function($event){
      $event.stopPropagation();
   }

   $scope.containerClicked2 = function(){
      $scope.searchResult2 = {};
   }
   
   //agregar fila a tabla de articulos
   $scope.addArticulo = function(){
       
       if($scope.id_articulo > 0)
       {
           $scope.articulos.push({
            id: $scope.id_articulo,
            descripcion: $scope.searchItem,
            modelo: $scope.modelo,
            precio: $scope.precio,
            existencia: $scope.existencia,
            importe: 0,
            cantidad: 0,
            preciocalculado:0,
            cantidadant:0,
        });
        
        //reiniciar las validaciones
	    //$scope.formData = {};
        //$scope.frmVentas.$setPristine();
        $scope.frmVentas.articulo.$setUntouched();
        //mostrar mas datos
        $scope.iscalculos = true;
        $scope.isbotonescalculos = true;
        
        $scope.id_articulo = '';
    	$scope.modelo = '';
    	$scope.precio = '';
    	$scope.searchItem = '';
       }else{
           alert("Seleccione un articulo para agregar");
       }
    }
	
	$scope.addCantidad = function(item){
	    
	    $scope.difcantidad =  item.cantidad -  item.cantidadant;
	    //recuperar existencia
	    $http.get("articulos/getexistencia.php")
		.then(function (response) {
		    console.log(response.data);
		    if( (typeof response.data === "object") && (response.data !== null) )
            {
                console.log("tiene datos");
                $scope.existencia = response.data.existencia;
            }else{
                 console.log("nooo tiene datos");
                $scope.existencia = 0;
            }
		    
		});
	    
	    //validar la existencia
	    if($scope.existencia >= $scope.difcantidad)
	    {
	        //restar existencia del articulo
	        $http.post("articulos/updateexistencia.php",
			{
				'cantidad':$scope.difcantidad,
				'id':item.id,
				'opcion':'1',
			}).then(function successCallback(response) {
				console.log("Bien hecho");
			  }, function errorCallback(response) {
				console.log("Error al actualizar")
			  });
	        //realizar calculos
	        item.preciocalculado = item.precio * (1 + ($scope.tasafinanciamiento * $scope.plazomaximo)/100);
	        item.importe = item.preciocalculado * item.cantidad;
	        item.existencia -=$scope.difcantidad;
	        item.cantidadant = item.cantidad;
	        
	        $scope.engancheitem = ($scope.porcenganche/100) * item.importe;
	        $scope.bonificacionitem = $scope.engancheitem * (($scope.tasafinanciamiento * $scope.plazomaximo)/100);
	        $scope.totalitem = (item.importe - $scope.engancheitem - $scope.bonificacionitem);
	        
	        $scope.enganche = $scope.enganche + $scope.engancheitem;
	        $scope.bonificacion = $scope.bonificacion + $scope.bonificacionitem;
	        $scope.total = $scope.total + $scope.totalitem;
	        
	        console.log( $scope.articulos);
	    }else{
          alert('El artículo seleccionado no cuenta con existencia, favor de verificar');
          if( item.cantidadant == 0)
          {
              var index = $scope.articulos.indexOf(item);
              $scope.articulos.splice(index, 1);
              console.log( $scope.articulos);
          }else{
              item.cantidad = item.cantidadant;
          }
        }
    };

    $scope.deleteitem = function(item){
        if (confirm("¿Seguro que desea eliminar?")) {
            console.log('eliminar');
            var index = $scope.articulos.indexOf(item);
            console.log(index);
            console.log(item);
            $http.post("articulos/updateexistencia.php",
    			{
    				'cantidad':item.cantidad,
    				'id':item.id,
    				'opcion':'2',
    			}).then(function successCallback(response) {
    				console.log("Bien hecho");
    			  }, function errorCallback(response) {
    				console.log("Error al actualizar")
    			  });
    	        //realizar calculos
    	    $scope.engancheaux = ($scope.porcenganche/100) * item.importe;
    	    $scope.bonificacionaux = $scope.engancheaux * (($scope.tasafinanciamiento * $scope.plazomaximo)/100);
    	    $scope.totalaux =item.importe - $scope.engancheaux - $scope.bonificacionaux;
    	    
    	    $scope.enganche -= $scope.engancheaux;
    	    $scope.bonificacion -= $scope.bonificacionaux;
    	    $scope.total -=  $scope.totalaux;
    	    
    	    $scope.articulos.splice(index, 1);
       }
    }
    
    $scope.siguiente = function(){
        //validar que seleccionara cliente, articulo y la cantidad sea mayor de 0
        if($scope.id_cliente==0 || $scope.articulos.length == 0)
        {
            alert("Los datos ingresados no son correctos, favor de verificar");
        }
        else{
            //realizar calculos
            $scope.plazos = [3,6,9,12];
            $scope.contado = $scope.total / (1+(($scope.tasafinanciamiento * $scope.plazomaximo)/100));
            
            angular.forEach($scope.plazos, function(value, key) {
                console.log(value);
                console.log(key);
                  $scope.totalpagar =Math.round(( $scope.contado * (1+(($scope.tasafinanciamiento * value)/100)) )* 100.0) / 100.0;
                  $scope.abonos =  Math.round(($scope.totalpagar / value )* 100.0) / 100.0;
                  $scope.ahorro = Math.round(($scope.total - $scope.totalpagar )* 100.0) / 100.0;
                  
                  $scope.mensualidades.push({
                        meses: value,
                        descripcion: value+" ABONOS DE",
                        abono: $scope.abonos,
                        totalpagar: "TOTAL A PAGAR $"+$scope.totalpagar,
                        ahorro: "SE AHORRA $"+$scope.ahorro,
                        tipomeses:false,
                    });
                });
           
           //mostrar los datos
           	$scope.ismensualidades = true;
           	$scope.isbotonescalculos = false;
        }
    }
    
	//guardar venta
	$scope.guardar = function() {
        console.log("guardar");
        
        $scope.cantmeses = 0;
        angular.forEach($scope.mensualidades, function(value, key) {
            if(value.tipomeses == true)
            {
                console.log("estos meses");
                $scope.cantmeses = value.meses;
            }
        });
            
		if( $scope.cantmeses == 0)
		{
			alert("Debe seleccionar un plazo para realizar el pago de su compra");
		}else{
			$http.post("ventas/saveventa.php",
			{
			    'folio':$scope.folio,
				'id_cliente':$scope.id_cliente,
				'articulos':$scope.articulos,
				'total':$scope.total,
				'enganche':$scope.enganche,
				'bonificacion':$scope.bonificacion,
				'mensualidades':$scope.cantmeses,
				'estatus':'1',
			}).then(function successCallback(response) {
				alert("Bien hecho, tu venta ha sido registrada correctamente");
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				alert("Error al guardar la venta")
			  });
		}
		
    };
    
    $scope.cancelarventa = function()
    {
        //eliminar folio y regresar al listado
        $http.post("folios/deletefolio.php",{'tipo':3,'folio':$scope.folio})
			.then(function successCallback(response) {
				console.log("Eliminado");
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				console.log("Error al eliminar el folio")
				return false;
			  });
        $scope.listado();
    }
	
});//fin controller

//focus
vendimiaControllers.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '=focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === true) { 
          //console.log('trigger',value);
          //$timeout(function() {
            element[0].focus();
            scope.trigger = false;
          //});
        }
      });
    }
  };
});

vendimiaControllers.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});



vendimiaControllers.controller('configeneralCtrl', function($scope, $http) {
    
    $scope.date = new Date();
	
	$scope.tasa_financiamiento = '';
	$scope.porc_enganche = '';
	$scope.plazo_maximo = '';
	//mostrar pantalla listado
	$scope.listado = function() {
		//mostrar datos
		$http.get("configeneral/getconfig.php")
		.then(function (response) {
		    console.log(response.data);
		    if( (typeof response.data === "object") && (response.data !== null) )
            {
                console.log("tiene datos");
                $scope.tasa_financiamiento = response.data.tasa_financiamiento;
    		    $scope.porc_enganche = response.data.porc_enganche;
    		    $scope.plazo_maximo = response.data.plazo_maximo;
    		    $scope.opcion = 2;
            }else{
                 console.log("nooo tiene datos");
                  $scope.opcion = 1;
            }
		    
		});
		
    };
	$scope.listado();
	
	
	
	$scope.guardar = function() {
        console.log("guardar");
        var continuar = true;
		if($scope.tasa_financiamiento == '')
		{
			alert("No es posible continuar, debe ingresar tasa de financiamiento");
			continuar = false;
		}
		else if($scope.porc_enganche == '')
		{
			alert("No es posible continuar, debe ingresar porcentaje de enganche");
		}
		else if($scope.plazo_maximo == '')
		{
			alert("No es posible continuar, debe ingresar plazo máximo");
		}else{
			$http.post("configeneral/saveconfig.php",
			{
				'tasa_financiamiento':$scope.tasa_financiamiento,
				'porc_enganche':$scope.porc_enganche,
				'plazo_maximo':$scope.plazo_maximo,
				'opcion':$scope.opcion,
			}).then(function successCallback(response) {
				alert("Bien hecho. La configuración ha sido registrada.");
				
				//reiniciar las validaciones
        	    $scope.formData = {};
                $scope.frmGeneral.$setPristine();
                $scope.frmGeneral.$setUntouched();
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				alert("Error al guardar configuracion general")
			  });
		}
    };
	
});

vendimiaControllers.controller('articulosCtrl', function($scope, $http) {
    
     $scope.date = new Date();
	
	$scope.id = '';
	$scope.clave = '';
	$scope.patterns = {
        letras: /[A-Za-z\s]/,
        decimales:/^([0-9]+\.?[0-9]{0,2})$/
      };
      
	//mostrar pantalla listado
	$scope.listado = function() {
		//mostrar datos
		$http.get("articulos/listitems.php")
		.then(function (response) {
		   
		    if( (typeof response.data === "object") && (response.data !== null) )
            {
		         $scope.articulos = response.data;
            }else{
                $scope.articulos = {};
            }
		    
		});
		$scope.isnuevo = false;
		$scope.islistado = true;
		
    };
	$scope.listado();
	
	//mostrar pantalla nuevo 
	$scope.addItem = function() {
	    //recuprar folio
    	$http({
           method: 'post',
           url: 'folios/getfolio.php',
           data: {tipo:'1'}
         }).then(function successCallback(response) {
           $scope.clave = response.data;
         });
	    
	    //reiniciar las validaciones
	    $scope.formData = {};
        $scope.frmArticulos.$setPristine();
        $scope.frmArticulos.$setUntouched();
	    
        $scope.isnuevo = true;
		$scope.islistado = false;
		$scope.opcion = '1';
		$scope.descripcion = '';
		$scope.modelo = '';
		$scope.precio = '';
		$scope.existencia = '';
		$scope.id = '';
    };
	$scope.editItem = function(id,clave,descripcion,modelo,precio,existencia) {
        $scope.isnuevo = true;
		$scope.islistado = false;
		$scope.clave = clave;
		$scope.descripcion = descripcion;
		$scope.modelo = modelo;
		$scope.precio = precio;
		$scope.existencia = existencia;
		$scope.id = id;
		$scope.opcion = '2';
    };
	
	
	$scope.guardar = function() {
        console.log("guardar");
        var continuar = true;
		if($scope.descripcion == '')
		{
			alert("No es posible continuar, debe ingresar descripcion");
			continuar = false;
		}
		else if($scope.precio == '')
		{
			alert("No es posible continuar, debe ingresar precio");
		}
		else if($scope.existencia == '')
		{
			alert("No es posible continuar, debe ingresar existencia");
		}else{
		    console.log($scope.clave);
			$http.post("articulos/saveitem.php",
			{
				'clave':$scope.clave,
				'descripcion':$scope.descripcion,
				'modelo':$scope.modelo,
				'precio':$scope.precio,
				'existencia':$scope.existencia,
				'id':$scope.id,
				'opcion':$scope.opcion,
			}).then(function successCallback(response) {
				alert("Bien hecho. El artículo ha sido registrado correctamente");
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				alert("Error al guardar el articulo")
			  });
		}
    };
	$scope.deleteItem = function(id) {
        console.log("borrar");
		if(confirm("¿Eliminar el artículo?"))
		{
			$http.post("articulos/deleteitem.php",{'id':id})
			.then(function successCallback(response) {
				alert("Eliminado");
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				alert("Error al guardar el articulo")
				return false;
			  });
		}else{
			return false;
		}
    };
	
	
	$scope.cancelar = function()
	{
	    if(confirm("¿Regresar al listado de artículos?"))
		{
	    	//eliminar folio y regresar al listado
            $http.post("folios/deletefolio.php",{'tipo':1,'folio':$scope.clave})
    			.then(function successCallback(response) {
    				console.log("Eliminado");
    				//regresar al listado
    				$scope.listado();
    			  }, function errorCallback(response) {
    				console.log("Error al eliminar el folio")
    				return false;
    			  });
            $scope.listado();
		}else{
			return false;
		}
	}
});

vendimiaControllers.controller('clientesCtrl', function($scope, $http) {
    
    $scope.date = new Date();
	
	$scope.id = '';
	$scope.clave = '';
	//mostrar pantalla listado
	$scope.listado = function() {
		//mostrar datos
		$http.get("clientes/listaclientes.php")
		.then(function (response) {
		   
		    if( (typeof response.data === "object") && (response.data !== null) )
            {
		         $scope.clientes = response.data;
            }else{
                $scope.clientes = {};
            }
		});
		$scope.isnuevo = false;
		$scope.islistado = true;
		
    };
	$scope.listado();
	
	//mostrar pantalla nuevo cliente

	$scope.addcliente = function() {
	    //recuprar folio
    	$http({
           method: 'post',
           url: 'folios/getfolio.php',
           data: {tipo:'2'}
         }).then(function successCallback(response) {
           $scope.clave = response.data;
         });
         
         //limpiar formulario para no mostrar errores anteriores
        $scope.formData = {};
        $scope.frmClientes.$setPristine();
        $scope.frmClientes.$setUntouched();
	    
        $scope.isnuevo = true;
		$scope.islistado = false;
		$scope.opcion = '1';
		$scope.nombre = '';
		$scope.apellido_paterno = '';
		$scope.apellido_materno = '';
		$scope.rfc = '';
		$scope.id = '';
		$scope.clave = '';
    };
	$scope.editcliente = function(id,clave,nombre,apellido_paterno,apellido_materno,rfc) {
        $scope.isnuevo = true;
		$scope.islistado = false;
		$scope.clave = clave;
		$scope.nombre = nombre;
		$scope.apellido_paterno = apellido_paterno;
		$scope.apellido_materno = apellido_materno;
		$scope.rfc = rfc;
		$scope.id = id;
		$scope.opcion = '2';
    };
	
	
	$scope.guardar = function() {
        console.log("guardar");
		if($scope.nombre == null)
		{
			alert("No es posible continuar, debe ingresar nombre");
		}
		else if($scope.apellido_paterno == null)
		{
			alert("No es posible continuar, debe ingresar apellido paterno");
		}
		else if($scope.apellido_materno == null)
		{
			alert("No es posible continuar, debe ingresar apellido materno");
		}
		else if($scope.rfc == null)
		{
			alert("No es posible continuar, debe ingresar rfc");
		}else{
			$http.post("clientes/savecliente.php",
			{
				'clave':$scope.clave,
				'nombre':$scope.nombre,
				'apellido_paterno':$scope.apellido_paterno,
				'apellido_materno':$scope.apellido_materno,
				'rfc':$scope.rfc,
				'id':$scope.id,
				'opcion':$scope.opcion,
			}).then(function successCallback(response) {
				alert("Bien hecho. El cliente ha sido registrado correctamente");
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				alert("Error al guardar el cliente")
			  });
		}
    };
	$scope.deletecliente = function(id) {
        console.log("borrar");
		if(confirm("¿Eliminar cliente?"))
		{
			$http.post("clientes/deletecliente.php",{'id':id})
			.then(function successCallback(response) {
				alert("Cliente Eliminado");
				//regresar al listado
				$scope.listado();
			  }, function errorCallback(response) {
				alert("Error al guardar el cliente")
				return false;
			  });
		}else{
			return false;
		}
    };
    
    $scope.cancelar = function()
    {
        if(confirm("¿Regresar al listado de clientes?"))
		{
        	//eliminar folio y regresar al listado
            $http.post("folios/deletefolio.php",{'tipo':2,'folio':$scope.clave})
    			.then(function successCallback(response) {
    				console.log("Eliminado");
    				//regresar al listado
    				$scope.listado();
    			  }, function errorCallback(response) {
    				console.log("Error al eliminar el folio")
    				return false;
    			  });
            $scope.listado();
		}else{
			return false;
		}
    }
	
});
