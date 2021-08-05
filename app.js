require('colors')
const inquirer = require('inquirer')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const {
  inquirerMenu,
  pausa,
  leerInput,
  borrarTarea,
  confirmar,
  checklist
} = require('./helpers/inquirer')

const Tareas = require('./models/Tareas')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  const tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    //Imprimir menu interactivo
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ')
        tareas.crearTarea(desc)
        break
      case '2':
        tareas.listadoCompleto()
        break
      case '3':
        tareas.listarPendientes(true)
        break
      case '4':
        tareas.listarPendientes(false)
        break
      case '5':
        const ids = await checklist(tareas.listadoArr)
        tareas.completarTareas(ids)
        break
      case '6':
        const id = await borrarTarea(tareas.listadoArr)
        if (id === '0') break
        const ok = await confirmar('¿Esta seguro de borrar esta tarea?')
        if (ok) {
          tareas.borrarTarea(id)
          console.log('Tarea borrada exitosamente')
        }
        break
    }

    guardarDB(tareas.listadoArr)
    if (opt !== '0') await pausa()
  } while (opt !== '0')
  console.clear()
}

main()
