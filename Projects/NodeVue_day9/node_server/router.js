const express = require('express');

const router = express.Router();

// 导入业余逻辑模块
const ctrl = require('./controller.js');

router
    .get('/', (req, res) => {
        res.send('欢迎访问 Node 服务器数据 API 接口');
    })
    // 注册新用户
    .post('/api/register', ctrl.registerNewUser);

module.exports = router;