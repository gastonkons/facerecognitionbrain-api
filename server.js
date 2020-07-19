const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profiles = require('./controllers/profiles');
const image = require('./controllers/image');



// Knex js nos permite conectarnos a Postgres SQL
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => console.log(`app is running on port ${port}`))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
  res.json('this is working')
})

//Signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

//Signin - Otra forma de hacerlo
// app.post('/signin', signin.handleSignin( db, bcrypt))
// y el modulo debe ser así:
// const handleSignin = (db, bcrypt) => (req, res) => {
//    Contenido
// }

//Register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

//Profile/ID
app.get('/profiles/:id', (req, res) => { profiles.handleProfiles(req, res, db)})

//Image
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

//Api Call
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})