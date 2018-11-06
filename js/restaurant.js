var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioAReservar) {
    return this.horarios = this.horarios.filter( 
        opcionesDeHorarios =>  horarioAReservar !==  opcionesDeHorarios 
        )
}  

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    return this.promedio(this.calificaciones) ;
}

Restaurant.prototype.promedio = function(numerosEnArray) {
    if(numerosEnArray.length === 0 ) return 0;
    let promedio = this.sumatoria(numerosEnArray) / numerosEnArray.length;
    return Math.round(promedio * 10) / 10;
}

Restaurant.prototype.sumatoria = function(numerosEnArray) {
    let sumatoriaDeNumeros = numerosEnArray.reduce(
        (acumulador, valorActual)=> acumulador+valorActual
        )
    return sumatoriaDeNumeros;
}




