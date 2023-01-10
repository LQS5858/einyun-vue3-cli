const inquirer = require('inquirer')
const { downloadTemplate } = require('./downloadTemplate')
const { gitPath } = require('../config')
const path = require('path')
const logger = require('./logger')
const { updateJsonFile } = require('../utils/updateJson')


export const create = (proName) => {
    const env = process.env.NODE_ENV
    const questions = [
        {
            name: 'name',
            message: 'project name',
            default: proName ? proName : 'einyun-vue3-project'
        },
        {
            name: 'version',
            message: 'project version',
            default: '1.0.0',
        }
    ]
    inquirer.prompt(questions).then(answer => {
        logger.info('answer', answer)
        let { name } = answer || {}
        downloadTemplate(gitPath, name).then(() => {
            const filePath = path.resolve(process.cwd(), `./${name}/package.json`)
            updateJsonFile(filePath, answer)
        })
    })
}

