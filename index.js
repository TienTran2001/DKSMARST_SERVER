const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect.js');
const dotenv = require('dotenv');
dotenv.config();
const initRoutes = require('./routes');
const { scheduleJob } = require('./services/emailService.js');
console.log('cổng: ', process.env.PORT);
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

setInterval(async () => {
  console.log('Nhắc đi đăng kiểm');
  await scheduleJob();
}, 86400000 * 5);
