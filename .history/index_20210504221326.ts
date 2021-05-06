import fs from 'fs';
import http from 'http'

http.createServer((req, res) => {
    res.end('hello world');
}).listen(8082);