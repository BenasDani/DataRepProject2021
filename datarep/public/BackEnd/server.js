const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Genre, Accept");
    next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Connects to mongodb
const myConnectionString = 'mongodb+srv://admin:benasdani@cluster0.njan1.mongodb.net/games?retryWrites=true&w=majority';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(myConnectionString);
}

//Schema for documents in db
const Schema = mongoose.Schema;
var gameSchema = new Schema({
    Game: String,
    PGRating: String,
    Genre: String,
    GameCover: String
})
//interacts with db
var gameModel = mongoose.model("game", gameSchema)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Listening GET 
app.get('/api/games', (req, res) => {
    gameModel.find((err,data) =>{
        res.json(data)
    })

})

app.get('/api/games/:id', (req,res)=>{
    console.log(req.params.id);

    gameModel.findById(req.params.id, (err,data) =>{
        res.json(data);
    })
})

app.put('/api/games/:id', (req, res) => {
    console.log("Update game: " + req.params.id);
    console.log(req.body);
    gameModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })
})

//Listening post
app.post('/api/games', (req, res) => {
    console.log('Game has been received!')
    console.log(req.body.Game)
    console.log(req.body.PGRating)
    console.log(req.body.Genre)
    console.log(req.body.GameCover)

    gameModel.create({
        Game: req.body.Game,
        PGRating: req.body.PGRating,
        Genre: req.body.Genre,
        GameCover: req.body.GameCover
    })

   //makes sure data isnt sent multiple times
    res.send('Data Sent!')
})


app.delete('/api/games/:id', (req, res) => {
    console.log("Delete Game: " + req.params.id);
    gameModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})