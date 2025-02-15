const mongoose = require("mongoose")
const express = require('express')
const Product = require("./module/product.module.js");
const productRoute = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors"); 
const app = express();
const dotenv = require("dotenv");
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Chigemezu: Welcome to Backend');
})


// routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoutes);

app.use(cors());

dotenv.config();


app.listen(process.env, () => {
    console.log("server is running in port 5000")
})

mongoose.connect(
    "mongodb+srv://chigemezuoparaa:yVi8PHxbBTd7xKSX@cluster0.aetf8.mongodb.net/"
).then(() => {
    console.log("Database connected");
})
.catch(() => {
    console.log("Database not connected");
});
