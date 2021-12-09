import axios from 'axios'

export function cargarComunas(codRegion: string): Promise<Comuna[]> {
  let url = `https://apis.digital.gob.cl/dpa/regiones/${codRegion}/comunas`
  if (codRegion == '-1') {
    url = 'https://apis.digital.gob.cl/dpa/comunas'
  }
  return axios.get<Comuna[]>(url)
    .then((response) => {
      const comunas = response.data
      const comunasFiltradas = comunas.map((comuna) => ({
        nombre: comuna.nombre,
        codigo: comuna.codigo
        }))

      return comunasFiltradas
    })
    .catch(() => [])
}
