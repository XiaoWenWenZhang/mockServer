import * as fs from 'fs'
import * as http from 'http'

http.createServer((req, res) => {
    const mockData = require('./mock');
    res.setHeader('Content-Type', 'text/application;charset=UTF-8')

    if (req.url === '/task/list') {
        res.end(JSON.stringify(mockData.find(data => data.url === req.url).data));
    }
}).listen(8082);