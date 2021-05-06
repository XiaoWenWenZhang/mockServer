import * as fs from 'fs'
import * as http from 'http'

http.createServer((req, res) => {
    const mockData = getMockData();
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')

    if (req.url === '/task/list') {
        res.end(JSON.stringify(mockData.find(data => data.url === req.url).data));
    }

    if (req.url === '/task/delete') {
        res.end()
    }
}).listen(8082);

function getList() {
    getMockData().find(data => data.url === '/task/list')
}

function getMockData() {
    delete require.cache[require.resolve('./mock')]
    return require('./mock');
}