const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'mansi.1148@zenmonk.tech',
    pass: 'c r g v f r p r k x c f n z u z',
  },
});

// Route to send email using POST request
app.post('/send-email', async (req, res) => {
  const emailData = {
    name: req.body.name || 'Subscriber',
    report_id: req.body.report_id || '123456',
    url: 'https://website.com',
  };

  // Render the EJS template with data
  ejs.renderFile(
    path.join(__dirname, 'emailTemplate.ejs'),
    emailData,
    (err, html) => {
      if (err) {
        console.log('Error rendering EJS template:', err);
        return res.status(500).send('Error rendering email template');
      }

      const mailOptions = {
        from: 'mansi.1148@zenmonk.tech',
        to: req.body.email, // dynamic recipient email
        subject: 'Informe añadido',
        html: html,
      };
console.log("mailOptions",mailOptions)
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const express = require('express');
// const nodemailer = require('nodemailer');
// require('dotenv').config()
// const express = require('express');
// const { Resend }  = require('resend');



// // import express, { Request, Response } from 'express';

// const resend = new Resend('re_XM7MwciY_KBgzVqveoVm9vLufZAkhpJiD');
// const app = express();

// app.post('/', async (req ,res) => {
//   try {
//     const data = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['delivered@resend.dev'],
//       subject: 'Hello World',
//       html: '<strong>it works!</strong>',
//     });

//     res.status(200).json(data);
//   } catch(error) {
//     console.log("error",error)
//     res.status(400).json(error);
//   }
// })

// app.listen(3000, () => {
//   // if (!process.env.RESEND_API_KEY) {
//   //   throw `Abort: You need to define RESEND_API_KEY in the .env file.`;
//   // }
  
//   console.log('Listening on http://localhost:3000');
// });