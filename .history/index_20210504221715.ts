import * as fs from 'fs'
import * as http from 'http'

http.createServer((req, res) => {
    const mockData = require('./mock');
}).listen(8082);