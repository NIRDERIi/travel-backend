const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

require("dotenv").config();

router.post("/", async (req, res) => {
  const { name, email, phone, offerTitle } = req.body;

  if (!name || !email || !phone || !offerTitle) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or another SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password if Gmail
      },
    });

    await transporter.sendMail({
      from: `"אתר נסיעות" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // You receive it
      subject: `📩 New Booking for ${offerTitle}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>שם:</strong> ${name}</p>
        <p><strong>אימייל:</strong> ${email}</p>
        <p><strong>טלפון:</strong> ${phone}</p>
        <p><strong>הצעה:</strong> ${offerTitle}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
