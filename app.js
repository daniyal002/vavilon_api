const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
// const fs = require('fs');
// const https = require('https');

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

  // const options = {
  //   key: fs.readFileSync('/etc/letsencrypt/live/kinovavilon.ru/privkey.pem'),
  //   cert: fs.readFileSync('/etc/letsencrypt/live/kinovavilon.ru/cert.pem')
  // };

  
  
   
const port = 5000;


 
// https.createServer(options,app).listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}!`)
})