var fs = require('fs');
var path = require('path');
var http = require('http');
var app = http.createServer(handle).listen(8082);
var mockPath = path.resolve(__dirname, './mock.js');
function handle(req, res) {
    var mockData = getMockData();
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    getRequestBody(req).then(function (data) {
        if (req.method === 'OPTIONS') {
            return res.end();
        }
        if (req.url === '/task/delete') {
            var list = mockData.find((function (item) { return item.url === '/task/list'; })).data;
            var taskId = data.taskId;
            var index = list.findIndex(function (item) { return item.taskId === taskId; });
            if (index >= 0) {
                list.splice(index, 1);
            }
            fs.writeFileSync(mockPath, 'module.exports=' + JSON.stringify(mockData));
        }
        if (req.url === '/task/create') {
            var list = mockData.find((function (item) { return item.url === '/task/list'; })).data;
            var id = 'id_' + Date.now();
            var task = data;
            task.id = id;
            console.log('22', task);
            list.push(task);
            fs.writeFileSync(mockPath, 'module.exports=' + JSON.stringify(mockData));
        }
        if (req.url === '/task/update') {
            var list = mockData.find((function (item) { return item.url === '/task/list'; })).data;
            var taskId = data.taskId;
            var index = list.findIndex(function (item) { return item.taskId === taskId; });
            if (index >= 0) {
                list.splice(index, 1, data);
            }
            fs.writeFileSync(mockPath, 'module.exports=' + JSON.stringify(mockData));
        }
        res.end(JSON.stringify(mockData.find(function (data) {
            return data.url === req.url;
        })));
    });
}
function getMockData() {
    delete require.cache[require.resolve('./mock')];
    return require('./mock');
}
function getRequestBody(req) {
    return new Promise(function (resolve) {
        var message = '';
        req.on('data', function (chunk) {
            message += (chunk || '').toString();
        });
        req.on('end', function (data) {
            message += (data || '').toString();
            if (message.trim()) {
                resolve(JSON.parse(message));
            }
            else {
                resolve({});
            }
        });
    });
}
