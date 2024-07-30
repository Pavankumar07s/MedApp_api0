const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.OTPgenerator = async (req, res) => {
  // Function to generate a random 4-digit OTP using the crypto library
  function generateOTP() {
    return crypto.randomInt(1000, 10000).toString(); // Generates a random integer between 1000 and 9999
  }

  const OTP = generateOTP();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "pawankumar14662693@gmail.com", 
      pass: process.env.GAPP, 
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Function to send the OTP email
  async function sendOTP(email) {
    let mailOptions = {
      from: "pawankumar14662693@gmail.com", // Sender address
      to: email, // List of receivers
      subject: "Your OTP Code", // Subject line
      text: `Your OTP code is ${OTP}`, // Plain text body
      html: `<p>Your OTP code is <b>${OTP}</b></p><p>Please provide the OTP to change the Aadhaar Card information</p>`, // HTML body
    };

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      res.status(200).send({ message: "OTP sent successfully!" });
    } catch (error) {
      console.error("Error sending email: %s", error);
      res.status(500).send({ error: "Error sending OTP" });
    }
  }

  // Call the sendOTP function with the recipient's email
  const recipientEmail = req.body.email;
  if (recipientEmail) {
    await sendOTP(recipientEmail);
  } else {
    res.status(400).send({ error: "Recipient email is required" });
  }
};
