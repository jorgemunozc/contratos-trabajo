import axios from 'axios'

function cargarRegiones(): Promise<Region[]> {
  return axios.get<Region[]>('https://apis.digital.gob.cl/dpa/regiones')
    .then((response) => {
      const dataRegiones = response.data
      const listaRegiones: Region[] = dataRegiones.map((region) => {
        return {
          nombre: region.nombre,
          codigo: region.codigo
        }
      })
      return listaRegiones
    })
    .catch(() => [])
}

export { cargarRegiones }
