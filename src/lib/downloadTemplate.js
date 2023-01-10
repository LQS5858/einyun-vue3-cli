const download = require('download-git-repo')
const path = require('path')
const logger = require('./logger')
const ora = require('ora')

export const downloadTemplate = (gitPath = 'LQS5858/express-awilix-templates', name = 'express-cli') => {
    let loading = ora('downloading template ...');
    return new Promise((resolve, reject) => {
        loading.start()
        download(gitPath, path.resolve(process.cwd(), `./${name}`), { clone: true }, err => {
            if (err) {
                logger.error(err)
                loading.fail()
                reject(err)
            } else {
                logger.info('Template download succeed')
                loading.succeed()
                resolve('Template download succeed')
            }
        })
    })
}