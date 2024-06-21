const express = require("express")
const model = require("./model")
const app = express() 
const cors =require("cors")
app.use(cors())

app.use(express.urlencoded({extended:true}));

 app.get("/movies", async (request, response) => {
    try {
        let movies = await model.Movie.find()
        response.json(movies)
    }catch(error) {
        response.status(400).send("Generic Error")        
    }
 });

 app.post("/movies", async function (request,response) {
    const data = request.body;
    try{
        let newMovie = new model.Movie({
            movie: data.movie,
            length: data.length,
            description: data.description,
        });
    let error = newMovie.validateSync();
    if (error) {
        response.status(400).json(error)
        return;
    }
    await newMovie.save()
    response.status(201).json(newMovie);
    }catch(error) {
        response.status(400).send("Generic Error");
    }
 });

 app.delete("/movies/:id", async (request,response) => {
    try{
        let isDeleted = await model.Movie.findOneAndDelete({
            _id: req.params.id,
       });
       if(!isDeleted){
        res.status(404).send("could not find movie")
        return;
       }
       res.status(204).send("movie deleted")
    }catch(error){
        res.status(400).send("Generic error");
    }
 });

 app.get("/movies/:id", async (request,response) => {
    try{
        let isGet = await model.Movie.findOne({_id: request.params.id})
        if(!isGet){
            response.status(404).send("Movie has not been found")
            return
        }
        response.json(movie)
    }catch(error) {
        res.status(400).send("Generic error")
    }
 });

app.put("/movies/:id", async (request,response) => {
    try{
        const updatedMovie = {
            movie: request.body.movie,
            length: request.body.length,
            description: request.body.description
        };
        let putMovie = await model.Movie.findOneAndUpdate({_id:request.params.id},updatedMovie,{new:true,},);
        if(!putMovie){
            response.status(404).send("NO YOU CANT")
            return;
        }
        response.status(204).json(updatedMovie)
        }catch(error){
            response.status(400).send("generic error");
        }
});
app.listen(8080,() => {
    console.log("server is running on http://localhost:8080");
});