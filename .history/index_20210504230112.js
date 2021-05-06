var fs = require('fs');
var path = require('path');
var http = require('http');
http.createServer(test).listen(8082);
var mockPath = path.resolve(__dirname, './mock.js');
function test(req, res) {
    var mockData = getMockData();
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    getRequestBody(req).then(function (data) {
        if (req.url === '/task/delete') {
            var list = mockData.find((function (item) { return item.url === '/task/list'; })).data;
            var taskId = data.taskId;
            var index = list.findIndex(function (item) { return item.taskId === taskId; });
            console.log(index);
            if (index > 0) {
                list.splice(index, 1);
            }
            fs.writeFileSync(mockPath, 'module.exports=' + JSON.stringify({ test: 1 }));
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
            resolve(JSON.parse(message));
        });
    });
}
