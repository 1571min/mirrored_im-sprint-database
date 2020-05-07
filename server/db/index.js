// const mysql = require('mysql');

// // process.env로 시작하는 모든 변수들은 환경 변수(environmental variables)입니다.
// // 환경 변수는 터미널에서 다음 명령을 이용하여 설정할 수 있습니다.
// // export DATABASE_SPRINT_PASSWORD=your_password_here
// const password = process.env.DATABASE_SPRINT_PASSWORD;

// const host = 'localhost';

// module.exports = {
//   connection: mysql.createConnection({
//     host: host,
//     user: 'root',
//     password: password,
//     port: 3306,
//     database: 'chat',
//   }),
// };

const Sequelize = require('sequelize');

const password = process.env.DATABASE_SPRINT_PASSWORD;

var db = new Sequelize('chat', 'root', password, {
  host: 'localhost',
  dialect: 'mysql',
});
const Users = db.define('users', {
  username: Sequelize.STRING,
});

var Messages = db.define('messages', {
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
});

Users.sync();
Messages.sync();

module.exports = {
  db,
};

// 데이터베이스 연결을 만들고, 연결 객체를 export 하세요.
// 연결에 필요한 몇가지 정보가 있습니다. 먼저 user는 root, 패스워드는 위 password 변수를 사용하세요.
// 그리고 실제로 연결할 데이터베이스의 위치(host)는 host 변수를 사용하세요.
// 데이터베이스 이름(database)은 "chat"로 지정하세요.
