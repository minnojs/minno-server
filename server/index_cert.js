const express     = require('express');
const app        = express();



module.exports = {app};
const cors = require('cors');

app.use(cors({
    credentials: true, origin: true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'Access-Control-Allow-Credentials': true,
    'optionsSuccessStatus': 204
}));


const basePathRouter = express.Router();


basePathRouter.use('', express.static(''));


app.listen(8080, function() {
    console.log({message:'Minno-server Started on PORT ' + 80});
});

