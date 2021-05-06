import fs from 'fs';
import http from 'http'

http.createServer('0.0.0.0', (req, res) => {
    res.end('hello world');
}).listen(8082);