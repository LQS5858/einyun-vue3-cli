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
            default: proName ? proName : 'express-project'
        },
        {
            name: 'version',
            message: '项目版本号',
            default: '1.0.0',
        }
    ]
    inquirer.prompt(questions).then(answer => {
        logger.info('answer', answer)
        console.log('env', env);
        let { name } = answer || {}
        downloadTemplate(gitPath, name).then(() => {
            const filePath = path.resolve(process.cwd(), `./${name}/package.json`)
            updateJsonFile(filePath, answer)
        })
    })
}

