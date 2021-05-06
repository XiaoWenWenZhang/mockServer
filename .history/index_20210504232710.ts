import * as fs from 'fs'
import * as path from 'path'
import * as http from 'http'

const app = http.createServer(handle).listen(8082);

const mockPath = path.resolve(__dirname, './mock.js');

function handle(req, res) {
    const mockData = getMockData();
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    getRequestBody(req).then(function (data) {
        if (req.url === '/task/delete') {
            const list = mockData.find((item => item.url === '/task/list')).data;
            const taskId = data;
    
            const index = list.findIndex(function (item) {return item.taskId === taskId});
            if (index >= 0) {
                list.splice(index, 1);
            }
    
            fs.writeFileSync(mockPath, 'module.exports=' + JSON.stringify(mockData));
        }

        if (req.url === '/task/create') {
            const list = mockData.find((item => item.url === '/task/list')).data;
            const id = 'id_' + Date.now();
            const task = data.task;
            task.id = id;
            list.push(task);
            fs.writeFileSync(mockPath, 'module.exports=' + JSON.stringify(mockData));
        }
    
        res.end(JSON.stringify(mockData.find(function(data) {
            return data.url === req.url;
        })));
    });
}

function getMockData() {
    delete require.cache[require.resolve('./mock')]
    return require('./mock');
}

function getRequestBody(req: http.IncomingMessage) {
    return new Promise<any>(function (resolve){
        let message = '';
        req.on('data', (chunk) => {
            message += (chunk || '').toString();
        })

        req.on('end', (data) => {
            message += (data || '').toString();
            if (message.trim()) {
                resolve(JSON.parse(message));
            } else {
                resolve({});
            }
        })
    })
}