#! /usr/bin/env node
const chalk = require('chalk')
const ora = require('ora')
const symbols = require('log-symbols')
const download = require('download-git-repo')
const path = require('path')
const execa = require('execa')

async function create (projectName, options) {
    const cwd = process.cwd()
    const targetDir = path.resolve(cwd, projectName || '.')
    console.log(`✨  Creating project in ${chalk.yellow(targetDir)}.`)
    console.log(chalk.green('\n Start generating... \n'))
    // 出现加载图标
    const spinner = ora('Downloading...')
    spinner.start()
    download(`direct:https://github.com/snowLeopard93/bigscreen-vue-template`, `./${projectName}`, { clone: true }, (err) => {
        //TODO 处理异常
        spinner.succeed()
        const command = 'npm install'
        runCommand(command, targetDir, projectName)
    })
}

async function runCommand(command, cwd, projectName) {
    const spinner1 = ora('Installing dependencies...')
    spinner1.start()
    return new Promise((resolve, reject) => {
        const child = execa(command, [], {
          cwd,
          stdio: ['inherit']
        })

        child.stdout.on('data', buffer => {
            process.stdout.write(buffer)
        })

        child.on('close', code => {
          if (code !== 0) {
            spinner.fail()
            reject(new Error(`command failed: ${command} ${args.join(' ')}`))
            return
          }

          // 结束加载图标
          spinner1.succeed()
          console.log(chalk.green(symbols.success), chalk.green('Generation completed!'))
          console.log('\n 👉  Get started with the following commands:\n\n')
          console.log(chalk.cyan(` ${chalk.gray('$')} cd ${projectName}\n`))
          console.log(chalk.cyan(` ${chalk.gray('$')} ${'npm run serve'}`))
          resolve()
        })
      })
}

module.exports = (...args) => {
    return create(...args)
}