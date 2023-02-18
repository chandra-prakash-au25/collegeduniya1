
const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors=require('cors')
app.use(cors())
const route = require("./routes/routes");
try {
    mongoose.connect('mongodb+srv://chandra:chandra@cluster0.wpffovp.mongodb.net/?retryWrites=true&w=majority',  () =>
    console.log("connected"));    
    }
catch (error) { 
    console.log("could not connect");    
    }


app.get("/api/projects", route.project_all);
app.post("/api/project",route.project_create);
app.get("/api/project",route.project_details);
app.delete("/api/project/del", route.project_delete);
app.post("/api/project/update", route.project_update);
    
app.get("/api/compaigns", route.compaign_all);
app.post("/api/compaign",route.compaign_create);
app.get("/api/compaign",route.compaign_details);
app.delete("/api/compaign/del", route.compaign_delete);
app.post("/api/compaign/update", route.compaign_update);
app.get("/api/project/stats", route.project_stats);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})