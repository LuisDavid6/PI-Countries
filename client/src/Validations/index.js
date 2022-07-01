export function validate(value){
    
    if(value.name){
        if(value.name.length<3) return "El nombre debe tener al menos 3 caracteres"
        if(value.name[0] === " ") return "El nombre no puede empezar con espacio"
        if(/[^a-zA-Z0-9 ]/g.test(value.name)) return "No se permite ese tipo de caracteres"
    }

    if(value.difficulty){
        if(value.difficulty === 0) return "Debe seleccionar una dificultad"
    }

    if(value.duration){
        if(value.duration <= 0) return "La duración debe ser mayor a 0"
        if(value.duration > 8) return "La duración no puede exceder las 8 horas"
    }

}