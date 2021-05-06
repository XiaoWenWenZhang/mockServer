import * as http from 'http'

http.createServer((req, res) => {
    res.end('hello world');
}).listen(8082);