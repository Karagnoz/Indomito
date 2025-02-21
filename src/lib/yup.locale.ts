import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Por favor, completa este campo",
    oneOf: "Debe ser uno de los siguientes valores: ${values}",
    notOneOf: "No puede ser uno de los siguientes valores: ${values}",
  },
  string: {
    length: "Debe tener exactamente ${length} caracteres",
    min: "Debe tener al menos ${min} caracteres",
    max: "Debe tener como máximo ${max} caracteres",
    matches: 'Debe coincidir con el siguiente formato: "${regex}"',
    email: "Debe ser un correo electrónico válido",
    url: "Debe ser una URL válida",
    trim: "No debe tener espacios en blanco al inicio o final",
    lowercase: "Debe estar en minúsculas",
    uppercase: "Debe estar en mayúsculas",
  },
  number: {
    min: "Debe ser mayor o igual a ${min}",
    max: "Debe ser menor o igual a ${max}",
    lessThan: "Debe ser menor a ${less}",
    moreThan: "Debe ser mayor a ${more}",
    positive: "Debe ser un número positivo",
    negative: "Debe ser un número negativo",
    integer: "Debe ser un número entero",
  },
  date: {
    min: "La fecha debe ser posterior a ${min}",
    max: "La fecha debe ser anterior a ${max}",
  },
  array: {
    min: "Debe tener al menos ${min} elementos",
    max: "Debe tener como máximo ${max} elementos",
  },
});
