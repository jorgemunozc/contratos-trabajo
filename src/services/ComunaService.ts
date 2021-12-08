import axios from 'axios'

export function cargarComunas(codRegion: string): Promise<Comuna[]> {
  const url = `https://apis.digital.gob.cl/dpa/regiones/${codRegion}/comunas`
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
