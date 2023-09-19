import path from 'path'
import fs from 'fs'
import express from 'express'
import render from './core/index'

const app = express()

const baseDir = process.cwd()

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(404)
})

app.get('/*', (req, res) => {
    try {
        const dirPath = path.join(baseDir, req.url)
        const stat = fs.statSync(dirPath)
        
        if (stat.isDirectory()) {
            const html = render(dirPath)
            res.send(html)
        }
        if (stat.isFile()) {
            const stream = fs.createReadStream(dirPath)
            stream.pipe(res)
        }
    } catch (err) {
        res.sendStatus(404)
    }
})

export default app