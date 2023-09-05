import path from 'path'
import express from 'express'
import render from './core/index'
import { findPort } from './utils/findPort'

const app = express()
const defaultPort = 3000

const baseDir = process.cwd()

app.get('/*', (req, res) => {
    const dirPath = path.join(baseDir, req.url)
    const html = render(dirPath)
    res.send(html)
})

findPort(defaultPort).then(port => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})