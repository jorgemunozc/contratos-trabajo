import { reactive } from 'vue'

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
      run: '',
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
      horasJornada: 0
    }
  })
}

export default store
