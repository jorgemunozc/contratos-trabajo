import axios from 'axios'
export interface ComunaInfo {
  codigo: string,
  nombre: string
}

export function cargarComunas (codRegion: string): Promise<ComunaInfo[] | []> {
  const url = `https://apis.digital.gob.cl/dpa/regiones/${codRegion}/comunas`
  return axios.get<Record<string, string>[]>(url)
    .then((response) => {
      const comunas = response.data
      const comunasFiltradas: ComunaInfo[] = []
      for (const comuna of comunas) {
        comunasFiltradas.push({
          codigo: comuna.codigo,
          nombre: comuna.nombre
        })
      }
      return comunasFiltradas
    })
    .catch(() => [])
}
