import net from 'net'
function tryPort(port:number) {
    return new Promise((resolve)=>{
        const server = net.createServer().listen(port)
        server.on('listening',function() {
            server.close()
            resolve(port)
        })
        server.on('error', function () {
            resolve(false)
        })
    })
}
export async function findPort(port: number) {
    for (let i = 0; i < 100; i++) {
        const res = await tryPort(port + i)
        if (res) {
            return res
        }
    }
    throw new Error(`端口${port}-${port + 100}被占用`)
}