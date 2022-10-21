const express = require("express")
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbconfig.js")
app.use(express.json());
const userRoute = require("./routes/userRoutes")
const mobuserRoute = require("./routes/mobuserRoutes")
const path = require("path")

// whenever api req is coming with word user, go and search api endpoints in the userRoute
app.use("/api/user" , userRoute);
app.use("/api/mobuser", mobuserRoute)

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use('/'. express.static("client/build"))
   
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client/build/index.html"))
    })
}


app.listen(port,  () => {
    console.log(`Node Server running on port   ${port}`)})





