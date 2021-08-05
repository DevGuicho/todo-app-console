const Tarea = require('./Tarea')

class Tareas {
  constructor() {
    this._listado = {}
  }

  completarTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((task) => {
      this._listado[task.id] = { ...task }
    })
  }

  get listadoArr() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push({ ...tarea })
    })
    return listado
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  listadoCompleto() {
    const tareas = this.listadoArr
    tareas.forEach((tarea, index) => {
      console.log(
        `${`${index}`.green}. ${tarea.desc} :: ${
          tarea.completadoEn ? 'Completado'.green : 'Pendiente'.red
        } `
      )
    })
  }

  listarPendientes(completadas = true) {
    const tareas = this.listadoArr
    let index = 0
    tareas.forEach((tarea) => {
      if (completadas && tarea.completadoEn) {
        console.log(
          `${`${index}`.green}. ${tarea.desc} :: ${tarea.completadoEn.green} `
        )
        index++
      }
      if (!completadas && !tarea.completadoEn) {
        console.log(`${`${index}`.green}. ${tarea.desc} :: ${'Pendiente'.red} `)
        index++
      }
    })
  }
}

module.exports = Tareas
