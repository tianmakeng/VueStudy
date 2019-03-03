const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'sqlstudy',
    user: 'root',
    password: 'root'
});

module.exports = {
    // 用户名查重
    getUserByName(name, callback) {
        const sql = 'select count(*) as count from users where username=?'
        conn.query(sql, name, callback)
    },
    // 注册用户
    register(user, callback) {
        const sql = 'insert into users set ?'
        conn.query(sql, user, callback)
    }
};