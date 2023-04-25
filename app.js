const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const io = require('socket.io');
const WebSocket = require('ws')

const moviesRouter = require('./routes/movies.js');
const sessionRouter = require('./routes/sessions.js');
const orderRouter = require('./routes/orders.js');

const Movies = require('./Models/Movies.js');
const Sessions = require('./Models/Sessions.js');
const Orders = require('./Models/Orders.js');

const app = express();
app.use(cors({
  origin: ['https://localhost:80', 'https://90.156.210.4:80', 'https://kinovavilon.ru'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // добавьте методы, используемые в вашем приложении
}));

app.use(express.json());
app.use('/', moviesRouter, sessionRouter, orderRouter);

const sequelize = new Sequelize('cinema', 'postgres', 'daniyalou', {
  host: 'localhost',
  dialect: 'postgres',
});

// Отношения
Movies.hasMany(Sessions);
Sessions.belongsTo(Movies);

Sessions.hasMany(Orders);
Orders.belongsTo(Sessions);

// Синхронизация моделей и базы данных
sequelize
  .sync({ alter: true })
  .then(() => console.log('Models synchronized with database.'))
  .catch((err) =>
    console.error('Error synchronizing models with database:', err)
  );

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/kinovavilon.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/kinovavilon.ru/cert.pem')
};

// Создаем https сервер
const server = https.createServer(options, app);

const socketIo = io(server, {
  cors: {
    origin: ['https://localhost:3000', 'https://kinovavilon.ru'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});

// Подключаемся к сокету
socketIo.on('connection', (socket) => {
  console.log('a user connected');

  // Обрабатываем события от клиента
  socket.on('eventFromClient', (data) => {
    console.log(data);
    io.emit('eventFromServer', 'Hello from server');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
