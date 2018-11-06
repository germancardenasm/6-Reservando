var expect = chai.expect; 

var restauranteDePrueba = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [2, 2, 2, 2, 2])
var restauranteDePruebaSinCalificacion = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [])

describe('Prueba funcion reservarHorario', function(){
	it('Se elimina el horario reservado del listado de horarios disponibles',function(){
        var cantHorariosDisponibles = restauranteDePrueba.horarios.length;
        restauranteDePrueba.reservarHorario("15:30")
		expect(restauranteDePrueba.horarios).to.have.lengthOf(cantHorariosDisponibles-1).that.does.not.include("15:30");
    })
    it('No cambia arreglo horarios cuando se reserva un horario que no existe o no esta disponible',function(){
        var HorariosDisponibles = restauranteDePrueba.horarios;
        restauranteDePrueba.reservarHorario("10:30")
		expect(restauranteDePrueba.horarios).is.eql(HorariosDisponibles);
    })
    it('No cambia arreglo horarios cuando no se pasa parametro',function(){
        var HorariosDisponibles = restauranteDePrueba.horarios;
        restauranteDePrueba.reservarHorario()
		expect(restauranteDePrueba.horarios).is.eql(HorariosDisponibles);
	})
})


describe('Prueba funcion obtenerPuntuacion()', function(){
	it('La puntuación (que es el promedio de ellas) se calcula correctamente',function(){
        var calificaciones = restauranteDePrueba.calificaciones;
        var sum = 0;
        for(var i = 0; i<calificaciones.length; i++)
        {
            sum += calificaciones[i];
        }
		expect(restauranteDePrueba.obtenerPuntuacion()).to.be.eql(sum/calificaciones.length);
    })
    it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.',function(){
		expect(restauranteDePruebaSinCalificacion.obtenerPuntuacion()).is.eql(0);
    })
})

describe('Prueba funcion calificar()', function(){
    var calificacionesIniciales = restauranteDePrueba.calificaciones;
    it('La funcion no modifica la calificacion si no se pasa argumento',function(){
        restauranteDePrueba.calificar();
        expect(calificacionesIniciales).is.eql(restauranteDePrueba.calificaciones);
    })
    it('La funcion no admite strings',function(){
        restauranteDePrueba.calificar("a")
        expect(calificacionesIniciales.length).is.eql(restauranteDePrueba.calificaciones.length);
    })
    it('La funcion no admite valores negativos',function(){
        restauranteDePrueba.calificar(-1)
        expect(calificacionesIniciales.length).is.eql(restauranteDePrueba.calificaciones.length);
    })
    it('La funcion no admite valores mayores a 10',function(){
		restauranteDePrueba.calificar(11)
        expect(calificacionesIniciales.length).is.eql(restauranteDePrueba.calificaciones.length);
    })
    it('La funcion aprueba caso borde 1',function(){
        restauranteDePrueba.calificar(1)
        expect(restauranteDePrueba.calificaciones.pop()).is.eql(1);
    })
    it('La funcion aprueba caso borde 10',function(){
        restauranteDePrueba.calificar(10)
        expect(restauranteDePrueba.calificaciones.pop()).is.eql(10);
    })
    it('La funcion admite valores validos entre 1 y 10 y calcula bien el promedio',function(){
        restauranteDePrueba.calificar(8)
        var sum = 0;
        for(var i = 0; i<restauranteDePrueba.calificaciones.length; i++)
            sum += restauranteDePrueba.calificaciones[i];
        expect(restauranteDePrueba.obtenerPuntuacion()).is.eql(sum/restauranteDePrueba.calificaciones.length);
    })
})

describe('Prueba funcion buscarRestaurante(id)', function(){
    var listadoDePueba = new Listado(listadoDeRestaurantes)
   
    it('La funcion regresa el objeto del restaurante correcto',function(){
        expect(listadoDePueba.buscarRestaurante(10)).to.be.an("object")
        .that.have.all.keys("id","nombre","rubro","ubicacion","horarios","imagen","calificaciones")
        .that.have.property("id",10)
    })
    it('La funcion no regresa ningun restaurante si no se pasa valor',function(){
        expect(listadoDePueba.buscarRestaurante()).is.eql("No se ha encontrado ningún restaurant");
    })
    it('La funcion no regresa ningun restaurante si se pasa por valor un string',function(){
        expect(listadoDePueba.buscarRestaurante("a")).is.eql("No se ha encontrado ningún restaurant");
    })
    it('La funcion no regresa ningun restaurante si no existe el restaurante con el id buscado',function(){
        expect(listadoDePueba.buscarRestaurante(100)).is.eql("No se ha encontrado ningún restaurant");
    })

})

describe('Prueba funcion obtenerRestaurantes()', function(){
    var listadoDePueba = new Listado(listadoDeRestaurantes)
   
    it('La funcion regresa el objeto del restaurante correcto',function(){
        expect(listadoDePueba.obtenerRestaurantes("Pizza","Nueva York","12:00")[0]).to.be.an("object")
        .that.have.all.keys("id","nombre","rubro","ubicacion","horarios","imagen","calificaciones")
        .that.have.any.keys({rubro:"Pizza" , ubicacion:"Nueva York", horarios:"12:00"} )
     
    })
    it('La funcion regresa objeto vacio cuando no conicide ningun criterio',function(){
        expect(listadoDePueba.obtenerRestaurantes("Pizza","Nueva York","8:00")).to.be.an("array")
        .that.is.empty;
    })
    it('La funcion regresa objeto vacio cuando no se establece ningun criterio',function(){
        expect(listadoDePueba.obtenerRestaurantes()).to.be.an("array")
        .that.is.empty;
    })

})