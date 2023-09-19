import app from './server'
import pc from 'picocolors'
import { version } from '../package.json'
import { findPort } from './utils/findPort'
import { DEFAULT_PORT } from './config'

const args = process.argv.slice(2)

if (args.length === 1 && ['-v', '--version'].includes(args[0]) ) {
    console.log(`v${version}`)
    process.exit()
}

if (args.length === 1 && ['-h', '--help'].includes(args[0])) {
    console.log(pc.green(pc.bold('svg-preview-pro')) + pc.dim(' preview svg files in one page.\n'))
    console.log(pc.bgCyan(`svg-preview --port ${DEFAULT_PORT} (by default)`))
    console.log(pc.yellow('\ncheck https://github.com/eloen1998/svg-preview for more documentation.'))
    process.exit()
}

let port
if (['-p', '--port'].includes(args[0])) {
    port = parseInt(args[2])
}
findPort(port || DEFAULT_PORT).then((port) => {
    app.listen(port, () => {
        console.log('Server is running on:')
        console.log(pc.yellow(`                     ${pc.underline(`http://localhost:${port}`)}\n`))
        // console.log(pc.yellow(`                     ${pc.underline(`http://127.0.0.1:${port}`)}\n`))
        // console.log(
        //     pc.dim(pc.green('  ➜')) +
        //       pc.dim('  press ') +
        //       pc.bold('s') +
        //       pc.dim(' to show server directory path.')
        // )
    })
})

const onInput = async (input: string) => {
    // ctrl+c or ctrl+d
    if (input === '\x03' || input === '\x04') {
        process.exit(1)
    }

    if (input === 's') {
        console.log(`   Server directory path is: ${pc.underline(process.cwd())}`)
    }
}

process.stdin.setRawMode(true)

process.stdin.on('data', onInput).setEncoding('utf8').resume()