export default function obtenerFechadeDateTime(date: Date): string {
  return date.toLocaleDateString('es-CL', {timeZone: 'UTC'}).replaceAll('-', '/')
}
