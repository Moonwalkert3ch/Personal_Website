require('dotenv').config(); // Load environment variables

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from root directory
app.use(express.static(__dirname));

// Configure Nodemailer with environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Route to handle sending emails
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${name}: ${subject}`,
    text: message,
  };

// test email config


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('An error occurred while sending the email.');
    }
    res.status(200).send('Your message has been sent successfully!');
  });
});

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 for other routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
