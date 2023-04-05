const inquirer = require('inquirer')
import prompts from 'prompts'
import { choices } from '../config'
const { downloadTemplate } = require('./downloadTemplate')
const { version, } = require('../config')
const path = require('path')
const logger = require('./logger')
const { updateJsonFile } = require('../utils/updateJson')




export const create = (proName) => {
    const env = process.env.NODE_ENV
    const questions = [
        {
            name: 'name',
            type: 'text',
            message: 'Project name:',
            initial: proName ? proName : "vue3-reactive"
        },
        {
            type: 'select',
            name: 'gitPath',
            message: 'Pick a gitpath',
            choices,
            initial: 0
        },
        {
            type: "text",
            name: 'version',
            message: 'project version',
            initial: version,
            version
        }
    ]
    prompts(questions).then(answer => {
        logger.info('answer', answer)
        const { name, gitPath } = answer || {}
        downloadTemplate(gitPath, name).then(() => {
            const filePath = path.resolve(process.cwd(), `./${name}/package.json`)
            updateJsonFile(filePath, answer)
        })
    })
}

