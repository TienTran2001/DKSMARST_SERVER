const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect.js');
const dotenv = require('dotenv');
dotenv.config('cổng: ', process.env.PORT);
const initRoutes = require('./routes');
console.log();
const app = express();
app.use(
  cors({
    origin: '*', // thay port client ở đây
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// connect db
dbConnect();

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
