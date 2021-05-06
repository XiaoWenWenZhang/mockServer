import * as fs from 'fs'
import * as http from 'http'

http.createServer(async (req, res) => {
    const mockData = getMockData();
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')
    const data = await getRequestBody(req);
    

    if (req.url === '/task/delete') {
        const list = mockData.find('/task/list');
        const taskId = 
    }

    res.end(JSON.stringify(mockData.find(data => data.url === req.url).data));
}).listen(8082);

function getMockData() {
    delete require.cache[require.resolve('./mock')]
    return require('./mock');
}

function getRequestBody(req: http.IncomingMessage) {
    return new Promise<string>(resolve => {
        let message = '';
        req.on('data', (chunk) => {
            message += chunk.toString();
        })

        req.on('end', (data) => {
            message += data.toString();
            resolve(JSON.parse(message));
        })
    })
}