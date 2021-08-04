const inquirer = require('inquirer')
require('colors')

const menuOpts = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea Hacer?',
    choices: [
      {
        value: '1',
        name: '1. Crear tarea'
      },
      {
        value: '2',
        name: '2. Listar tareas'
      },
      {
        value: '3',
        name: '4. Listar tareas completadas'
      },
      {
        value: '4',
        name: '4. Listar tareas pendientes'
      },
      {
        value: '5',
        name: '5. Completar tarea(s)'
      },
      {
        value: '6',
        name: '6. Borrar tarea'
      },
      {
        value: '0',
        name: '0. Salir'
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('=========================='.green)
  console.log('  Seleccione una Opción'.green)
  console.log('==========================\n'.green)

  const { opcion } = await inquirer.prompt(menuOpts)
  return opcion
}

const pausa = async () => {
  console.log('\n')
  await inquirer.prompt({
    type: 'input',
    name: 'pause',
    message: `Precione ${'ENTER'.green} para continuar`
  })
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]
  const { desc } = await inquirer.prompt(question)
  return desc
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput
}