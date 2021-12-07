declare enum EstadoCivil {
  Casado = 'casado/a',
  Soltero = 'soltero/a',
  Viudo = 'viudo/a',
  Divorciado = 'divorciado/a'
}

declare enum Turno {
  SinTurno = 'sinTurno',
  Manhana = 'manhana',
  Tarde = 'tarde',
  Noche = 'noche'
}

declare enum RotacionTurnos {
  Fijo = 'fijo',
  Reglamento = 'regl',
  ManTarde = 'mt',
  ManNoche = 'mn',
  TardeNoche = 'tn',
  ManTardeNoche = 'mtn'
}

declare interface ContratoTrabajo {
  empleador: Empleador,
  trabajador: Trabajador,
  condicionesContractuales: CondicionesContractuales
}

declare interface Comuna {
  codigo: string,
  nombre: string
}

declare interface Region {
  codigo: string,
  nombre: string
}

declare interface Empleador {
  esPersonaJuridica: boolean,
  razonSocial: string,
  rut: string,
  domicilio: string,
  region: Region,
  comuna: Comuna,
  nombreRepLegal: string,
  rutRepLegal: string,
  // cargoRepLegal: string
}

declare interface Trabajador {
  run: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  nacionalidad: string,
  estadoCivil: EstadoCivil,
  sexo: string,
  domicilio: string,
  fechaNac: string,
  comuna: Comuna,
  region: Region
}

declare interface CondicionesContractuales {
  sueldoBase: number,
  periodicidadSueldo: string,
  cargo: string,
  funciones: Array<string>,
  direccionLabores: string,
  regionLabores: Region,
  comunaLabores: Comuna,
  horasJornada: number,
  jornada: RotacionTurnos | null,
  horario: Horarios
}

declare type ArregloHorario = string[][]
declare type Horarios = Record<Turno, ArregloHorario>

declare type TurnoStrings = keyof typeof Turno
declare type ContratoTrabajoKeys = keyof ContratoTrabajo
declare type ContratoTrabajoSubKeys = keyof ContratoTrabajo[ContratoTrabajoKeys]
declare type EmpleadorKeys = keyof Empleador
declare type TrabajadorKeys = keyof Trabajador
declare type CondificonesKeys = keyof CondicionesContractuales
