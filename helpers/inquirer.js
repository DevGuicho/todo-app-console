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
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '0',
        name: `${'7.'.green} Salir`
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

const borrarTarea = async (tareas = []) => {
  const choices = tareas.map(({ desc, id }, index) => ({
    value: id,
    name: `${`${++index}`.green} ${desc}`
  }))
  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`
  })
  const { id } = await inquirer.prompt({
    type: 'list',
    name: 'id',
    message: 'Borrar',
    choices
  })
  return id
}

const confirmar = async (message) => {
  const { ok } = await inquirer.prompt({
    type: 'confirm',
    name: 'ok',
    message
  })
  return ok
}
const checklist = async (tareas = []) => {
  const choices = tareas.map(({ desc, id, completadoEn }, index) => ({
    value: id,
    name: `${`${++index}`.green} ${desc}`,
    checked: completadoEn ? true : false
  }))

  const { ids } = await inquirer.prompt({
    type: 'checkbox',
    name: 'ids',
    message: 'Selecciones',
    choices
  })
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  borrarTarea,
  confirmar,
  checklist
}
