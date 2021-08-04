require('colors')
const inquirer = require('inquirer')
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer')

const Tareas = require('./models/Tareas')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  do {
    //Imprimir menu interactivo
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ')
        tareas.crearTarea(desc)
        console.log({ desc })
        break
      case '2':
        console.log(tareas.listadoArr)
        break
    }

    if (opt !== '0') await pausa()
  } while (opt !== '0')
}

main()
