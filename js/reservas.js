var Reserva = function(horario,cantidadDePersonas,precioPorPersona,codigoDeDescuento){
    this.horario= horario;
    this.cantidadDePersonas= cantidadDePersonas;
    this.precioPorPersona= precioPorPersona;
    this.codigoDeDescuento= codigoDeDescuento;
}

Reserva.prototype.calcularPrecioTotal = function(){
    let codigo = this.codigoDeDescuento;
    let precioBase = this.calcularPrecioBase()
    let descuentoPorCantidad = this.calcularDescuentosPorCantidad(precioBase)
    let descuentoPorCodigo = this.calcularDescuentosCodigo(precioBase)
    return precioBase - descuentoPorCantidad - descuentoPorCodigo;
}

Reserva.prototype.calcularPrecioBase = function(){
    if(!this.cantidadDePersonas || !this.precioPorPersona) 
        return "No es una reserva valida"
    return this.cantidadDePersonas * this.precioPorPersona;
}

Reserva.prototype.calcularDescuentosCodigo = function(precioBase){
    
    let cupones = {DES15: 0.15*precioBase, DES200: 200, DES1: this.precioPorPersona};
    //Se calcula descuento por cupon aplicado
    if(cupones[this.codigoDeDescuento])
        return cupones[this.codigoDeDescuento]
    else 
        return 0;
}

Reserva.prototype.calcularDescuentosPorCantidad = function(precioBase){
    let descuentoPorCantidad = 0;
    //Se calcula descuento por rango de personas
    switch (true) {
        case (this.cantidadDePersonas < 4):
            break;
        case (this.cantidadDePersonas <= 6):
            descuentoPorCantidad = precioBase*0.05
            break;
        case (this.cantidadDePersonas <= 8):
            descuentoPorCantidad = precioBase*0.1
            break;
        case (this.cantidadDePersonas > 8):
            descuentoPorCantidad = precioBase*0.15
            break;
    }
    return descuentoPorCantidad;
}