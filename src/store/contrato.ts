import { reactive } from "vue";

const store = {
  state: reactive({
    empleador: {
      esPersonaJuridica: true,
      razonSocial: '',
      rut: '',
      domicilio: '',
      region: '',
      comuna: '',
      nombreRepLegal: '',
      rutRepLegal: '',
      cargoRepLegal: ''
    },
    trabajador: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nacionalidad: '',
      estadoCivil: '',
      sexo: '',
      direccion: '',
      comuna: '',
      region: ''
    },
    contrato: {
      funciones: [],
      direccionLabores: '',
      regionLabores: '',
      comunaLabores: '',
      horasJornada: 0,//numero positivo no mayor a 24*7

    }
  })
}