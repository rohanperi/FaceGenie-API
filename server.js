const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'rohan7734',
	  password : 'peri',
	  database : 'smart-brain'
	}
  });

const app = express();

// ----NEW EXPRESS UPDATE COMES WITH THIS SO WE DON'T HAVE TO USE BODY-PARSER! 
app.use(express.json());
app.use(cors());

app.get('/', (req,res) =>  { res.send(database.users) })
// /signin -- also uses advanced function feature of calling this twice with (req,res) the second time (either way works this or not)
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register',  (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})
app.get('/profile/:id', (req, res,) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>  {
	console.log(`app is running on port ${process.env.PORT}`);
})

/* -------FIGURING OUT API ENDPOINTS--------
/ --> res = this is working
/signin --> POST = success/fail
/register -->POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/