import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 5000;
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
      // console.log(g);
  
      const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json',{
        params: {
       q: 'London',
      days: '3'
        },
      headers:{
        'x-rapidapi-key': '1a49b74c09msh288b9dd982fa390p134f96jsnc0e36cb6ee94', // Replace with your actual API key
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      }});
      const data = response.data;
      console.log(data);
  
      res.render("index.ejs",{
        result:data,
        // city:result.location.city,
        // temperature:result.current_observation.condition.temperature,
        // pres:result.current_observation.atmosphere.pressure,
        // hum:result.current_observation.atmosphere.humidity,
        // sit:result.current_observation.condition.text,
        // speed:result.current_observation.wind.speed,

      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,  
      });
    }
  });


  app.post("/submit", async (req, res) => {
    // res.sendStatus(201);
    // if(req.body.city!=''){
    try {
      var ci=req.body.city;
      console.log(req.body);
   
      const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json',{
        params: {
          
             q:`${ci}`,
             days: '3'
        },
      headers:{
        'x-rapidapi-key': '1a49b74c09msh288b9dd982fa390p134f96jsnc0e36cb6ee94', // Replace with your actual API key
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      }});
      const data = response.data;
      console.log(data.location.city);
  
      res.render("index.ejs",{
        result:data,
        

      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,  
      });
    }

  
  });




  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  