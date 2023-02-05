#! /usr/bin/env node
const { Command } = require('commander')
const package = require('../package.json')
const chalk = require('chalk')
const minimist = require('minimist')
const { version } = package
const program = new Command()

program.usage('<command>')

program.version(
    `bigscreen-vue-cli ${version}`,
    "-v, -version",
    "output the current pri version"
)

program
    .command("create <app-name>")
    .description("create a new bigscreen-vue-project.")
    .alias("c")
    .action((name, options) => {
        if (minimist(process.argv.slice(3))._.length > 1) {
            const info = `Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored. `;
            console.log(chalk.yellow(info));
        }
        require('../lib/create')(name, options)
    })

// 必须放在最后一行！！
program.parse(process.argv)

