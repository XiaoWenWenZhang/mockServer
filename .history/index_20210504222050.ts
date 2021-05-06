import * as fs from 'fs'
import * as http from 'http'

http.createServer((req, res) => {
    const mockData = require('./mock');
    console.log(mockData);

    if (req.url === '/task/list') {
        res.end(JSON.stringify(mockData.find(data => data.url === req.url).data));
    }
}).listen(8082);