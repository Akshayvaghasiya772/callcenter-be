const express = require('express');  // Correct way to import express
const app = express();  // Create an instance of the express app
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
var corsOptions = {
    origin: "*"
  };
  app.use(cors(corsOptions));
  const errorMiddleware = require('./middleware/error-middleware');
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL).then(() => {
  console.log("Successfully connect to MongoDB.");
})  
// Define a route handler for the root path
app.get('/',async(req, res) => {
    try {
      res.send("ok");
    } catch (error) {
      console.error(error)
      res.send("failed");
    }
  });

  app.post('/test',async(req, res) => {
    try {
      res.send("ok11");
    } catch (error) {
      console.error(error)
      res.send("failed");
    }
  });
  


// routes
app.use("/api/staff",  require('./routes/staff'));
// app.use('/api/category', require('./routes/category.routes'))
// app.use('/api/receipt', require('./routes/receipt.routes'))


app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`server is running on ${PORT}`);
})
