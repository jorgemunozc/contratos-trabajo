import { EstadoCivil, RotacionTurnos } from '@/enums';
import store from '@/store/contrato';

//Generar informacion para testeo de componentes

function cargarFakeInfo(): void {
  const trabajador = fakeTrabajador()
  const empleador = fakeEmpleador()
  const condiciones = fakeCondiciones()
  store.state.trabajador = trabajador
  store.state.empleador = empleador
  store.state.condicionesContractuales = condiciones
}

function fakeTrabajador(): Trabajador {
  return {
    nombre: 'Donald',
    apellidoMaterno: 'Trump',
    apellidoPaterno: 'Gonzales',
    comuna: {codigo: '1', nombre: 'Fake City'},
    direccion: 'Fake address',
    estadoCivil: EstadoCivil.Divorciado,
    fechaNac: Date.now().toString(),
    nacionalidad: 'boliviana',
    region: {codigo: '8', nombre: 'Cacalandia'},
    run: '122333-4',
    sexo: 'masculino'
  }
}

function fakeEmpleador(): Empleador {
  return {
    razonSocial: 'FAlsitos Asociados',
    rut: '696969-8',
    esPersonaJuridica: true,
    cargoRepLegal: '',
    nombreRepLegal: '',
    rutRepLegal: '',
    comuna: {codigo: '105', nombre:'Otra city'},
    region: {codigo: '1', nombre: 'The first one'},
    domicilio: 'no tiene casa :('
  }
}


function fakeCondiciones(): CondicionesContractuales {
  return {
    comunaLabores: {codigo: '23', nombre: 'Comuna 2'},
    direccionLabores: 'direccion labores',
    cargo: 'Arreador de vacas',
    funciones: ['funcion1', 'funcion2', 'funcion3'],
    horasJornada: 45,
    periodicidadSueldo: 'mensual',
    regionLabores: {codigo: '10', nombre: 'region lejana'},
    sueldoBase: 10000,
    jornada: RotacionTurnos.ManTarde,
    horario: {
      sinTurno: [['sin turno']],
      manhana: [['manhana']],
      noche: [['tarde']],
      tarde: [['nocheee']]
    }
  }
}

export default cargarFakeInfo
