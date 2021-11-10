import axios from 'axios'

interface RegionInfo {
  nombre: string
  codigo: string
}

function cargarRegiones(): Promise<RegionInfo[] | []> {
  return axios.get<Record<string, string>[]>('https://apis.digital.gob.cl/dpa/regiones')
    .then((response) => {
      const dataRegiones = response.data
      const listaRegiones: RegionInfo[] = []
      for (const region of dataRegiones) {
        listaRegiones.push({
          nombre: region.nombre,
          codigo: region.codigo
        })
      }
      return listaRegiones
    })
    .catch(() => [])
}

export { cargarRegiones, RegionInfo }
