import bodyParser from 'body-parser';
import cors from 'cors';
import { dirname } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { getUserById } from './models/user.server.js';

const app = express()
const port = 3000
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Specify the directory where your templates are located
app.set('views', __dirname + '/views');
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use('/styles', express.static(__dirname + '/styles'));


// get routes
app.get('/', (req, res) => res.render('index'));

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const user = await getUserById(userId);

  res.render('user', { user }); // Render the EJS template with the user data
});

// end 
app.listen(process.env.PORT || port, () => console.log(`Peter's app listening at http://localhost:${port}`))