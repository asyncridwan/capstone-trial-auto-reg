const dns = require("dns")
const nodemailer =
require("nodemailer")

dns.setDefaultResultOrder("ipv4first")

const transporter =
nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

console.log("Email transporter configured for user:", process.env.EMAIL_USER ? "[configured]" : "[missing]")

exports.sendEmail = async (
  to,
  subject,
  text
) => {
  console.log(`Attempting to send email to ${to} with subject: ${subject}`)

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  }

  try {
    const info = await transporter.sendMail(mailOptions)

    console.log(`Email sent successfully to ${to} with subject: ${subject}`, info)
    return info
  } catch (error) {
    console.error(`Failed to send email to ${to} with subject: ${subject}`, error)
    throw error
  }
}