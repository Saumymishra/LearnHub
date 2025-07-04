require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const { errorHandler } = require('./src/middleware/errorHandler');
const { protect } = require('./src/middleware/auth');
const upload = require('./src/middleware/upload');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LiveRoom API is running');
});

app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/user/dashboard', require('./src/routes/dashboardRoutes'));


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
