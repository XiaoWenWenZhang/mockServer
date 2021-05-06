import * as fs from 'fs'
import * as http from 'http'

http.createServer(async function(req, res) {
    const mockData = getMockData();
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')
    const data = await getRequestBody(req);
    

    if (req.url === '/task/delete') {
        const list = mockData.find('/task/list');
        const taskId = data.taskId;

        const index = list.findIndex(function (item) {return item.taskId === taskId});
        if (index > 0) {
            list.splice(index, 1);
        }

        fs.writeFileSync('./mock.js', JSON.stringify(mockData));
    }

    res.end(JSON.stringify(mockData.find(function(data) {
        return data.url === req.url;
    })));
}).listen(8082);

function getMockData() {
    delete require.cache[require.resolve('./mock')]
    return require('./mock');
}

function getRequestBody(req: http.IncomingMessage) {
    return new Promise<any>(resolve => {
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