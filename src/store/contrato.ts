import { deepCloneArray } from '@/utils/array'
import { reactive } from 'vue'
import * as Enums from '@/enums'

const store = {
  state: reactive<ContratoTrabajo>({
    comunaCelebracion: {} as Comuna,
    empleador: {
      esPersonaJuridica: false,
      razonSocial: '',
      rut: '',
      domicilio: '',
      region: {} as Region,
      comuna: {} as Comuna,
      nombreRepLegal: '',
      rutRepLegal: '',
      // cargoRepLegal: ''
    },
    trabajador: {
      run: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nacionalidad: '',
      estadoCivil: Enums.EstadoCivil.Casado,
      sexo: '',
      domicilio: '',
      fechaNac: '',
      comuna: {} as Comuna,
      region: {} as Region
    },
    condicionesContractuales: {
      fechaIngreso: '',
      sueldoBase: 0,
      periodicidadSueldo: '',
      cargo: '',
      funciones: [],
      direccionLabores: '',
      regionLabores: {} as Region,
      comunaLabores: {} as Comuna,
      horasJornada: 0,
      jornada: null,
      horario: {
        [Enums.Turno.Manhana]: [],
        [Enums.Turno.Tarde]: [],
        [Enums.Turno.Noche]: [],
        [Enums.Turno.SinTurno]: []
      }
    }
  }),
  get<P extends keyof Omit<ContratoTrabajo, 'comunaCelebracion'>, SP extends keyof ContratoTrabajo[P]>(prop: P, subProp: SP): ContratoTrabajo[P][SP]{
    return this.state[prop][subProp]
  },

  set<P extends keyof ContratoTrabajo, SP extends keyof ContratoTrabajo[P]>(prop: P, subProp: SP, value: ContratoTrabajo[P][SP]): void {
    this.state[prop][subProp] = value
  },

  getPropEmpleador(prop: EmpleadorKeys) : Empleador[EmpleadorKeys] {
    return this.state.empleador[prop]
  },

  actualizarHorario(horarioAModificar: Turno, nuevoHorario: ArregloHorario) : void {
    const copiaHorario: ArregloHorario = deepCloneArray(nuevoHorario)
    this.state.condicionesContractuales.horario[horarioAModificar] = copiaHorario
  },

  obtenerHorarios(): Record<Turno, ArregloHorario> {
    return this.state.condicionesContractuales.horario
  },

  obtenerHorarioTurno(turno: Turno): ArregloHorario {
    return this.state.condicionesContractuales.horario[turno]
  },

  obtenerHorariosJornada(tipoJornada: RotacionTurnos | null): Partial<Horarios> {
    const horarios = this.state.condicionesContractuales.horario
    const resultado: Partial<Horarios> = {}
    if (!tipoJornada) {
      return resultado
    }
    switch (tipoJornada) {
      case Enums.RotacionTurnos.ManTarde:
        resultado[Enums.Turno.Manhana] = horarios[Enums.Turno.Manhana]
        resultado[Enums.Turno.Tarde] = horarios[Enums.Turno.Tarde]
        break;
      case Enums.RotacionTurnos.ManNoche:
        resultado[Enums.Turno.Manhana] = horarios[Enums.Turno.Manhana]
        resultado[Enums.Turno.Noche] = horarios[Enums.Turno.Noche]
        break;
      case Enums.RotacionTurnos.TardeNoche:
        resultado[Enums.Turno.Tarde] = horarios[Enums.Turno.Tarde]
        resultado[Enums.Turno.Noche] = horarios[Enums.Turno.Noche]
        break;
      case Enums.RotacionTurnos.ManTardeNoche:
        resultado[Enums.Turno.Manhana] = horarios[Enums.Turno.Manhana]
        resultado[Enums.Turno.Tarde] = horarios[Enums.Turno.Tarde]
        resultado[Enums.Turno.Noche] = horarios[Enums.Turno.Noche]
        break;
      default:
        resultado[Enums.Turno.SinTurno] = horarios[Enums.Turno.SinTurno]
    }
    Object.values(resultado).forEach((horario) => {
      if (horario) {
        horario[8].sort((a,b) => Number(a) - Number(b))
      }
    })
    return resultado
  },

  obtenerTipoJornada(): RotacionTurnos | '' {
    return this.state.condicionesContractuales.jornada || ''
  },

  actualizarTipoJornada(jornada:  RotacionTurnos | ''): void{
    if (jornada === '') {
      this.state.condicionesContractuales.jornada = null
    } else {
      this.state.condicionesContractuales.jornada = jornada
    }
  },

  quitarHorariosQueNoSonDeJornadaActual(): void {
    const jornadaActual = this.state.condicionesContractuales.jornada
    switch(jornadaActual){
      case Enums.RotacionTurnos.Fijo:
        this.eliminarTurno(Enums.Turno.Manhana)
        this.eliminarTurno(Enums.Turno.Tarde)
        this.eliminarTurno(Enums.Turno.Noche)
        break
      case Enums.RotacionTurnos.ManNoche:
        this.eliminarTurno(Enums.Turno.SinTurno)
        this.eliminarTurno(Enums.Turno.Tarde)
        break
      case Enums.RotacionTurnos.ManTarde:
        this.eliminarTurno(Enums.Turno.SinTurno)
        this.eliminarTurno(Enums.Turno.Noche)
        break
      case Enums.RotacionTurnos.ManTardeNoche:
        this.eliminarTurno(Enums.Turno.SinTurno)
        break
      case Enums.RotacionTurnos.TardeNoche:
        this.eliminarTurno(Enums.Turno.SinTurno)
        this.eliminarTurno(Enums.Turno.Manhana)
        break
      default:
        this.eliminarTodosLosTurnos()
    }
  },

  eliminarTodosLosTurnos(): void {
  this.eliminarTurno(Enums.Turno.Manhana)
  this.eliminarTurno(Enums.Turno.Tarde)
  this.eliminarTurno(Enums.Turno.Noche)
  this.eliminarTurno(Enums.Turno.SinTurno)
  },

  eliminarTurno(turno: Turno) : void {
    this.state.condicionesContractuales.horario[turno].length = 0
  },

  tieneHorarioTurno(turno: Turno): boolean {
    return this.state.condicionesContractuales.horario[turno].length > 0
  },


  obtenerDiasTurno(turno: Turno): string[] {
    if (this.tieneHorarioTurno(turno)) {
      return this.state.condicionesContractuales.horario[turno][8]
    }
    return []
  },

  actualizarDiasTurno(turno: Turno, nuevosDias: string[]): void {
    this.state.condicionesContractuales.horario[turno][8] = nuevosDias.map((dia) => dia.toString())
  },

  obtenerDescripcionTipoJornada(jornada: RotacionTurnos | null): string {
    if (!jornada) {
      return ''
    }
    const keysRotaciones: string[] = Object.values(Enums.RotacionTurnos)
    const descripciones: Record<RotacionTurnos, string> = {} as Record<RotacionTurnos, string>
    for (const key of keysRotaciones) {
      switch (key) {
        case Enums.RotacionTurnos.Fijo:
          descripciones[key] = 'horario fijo y sin turnos'
          break;
        case Enums.RotacionTurnos.ManTarde:
          descripciones[key] = 'turnos rotativos de mañana y tarde'
          break;
        case Enums.RotacionTurnos.ManNoche:
          descripciones[key] = 'turnos rotativos de mañana y noche'
          break;
        case Enums.RotacionTurnos.TardeNoche:
          descripciones[key] = 'turnos rotativos de tarde y noche'
          break;
        case Enums.RotacionTurnos.ManTardeNoche:
          descripciones[key] = 'turnos rotativos de mañana, tarde y noche'
          break;
        default:
          descripciones[Enums.RotacionTurnos.Reglamento] = 'horarios de acuerdo a Reglamento Interno'
          break;
      }
    }
    return descripciones[jornada]
  },

  esJornadaArticulo22(): boolean {
    return this.state.condicionesContractuales.horasJornada === 0
      && this.state.condicionesContractuales.jornada === null
  }
}

export default store
