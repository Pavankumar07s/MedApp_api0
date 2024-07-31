const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

exports.OTPgenerator = async (req, res) => {
  // Function to generate a random 4-digit OTP using the crypto library
  function generateOTP() {
    return crypto.randomInt(1000, 10000).toString(); // Generates a random integer between 1000 and 9999
  }

  const OTP = generateOTP();

  // Function to create a PDF document with the OTP
  async function createPDF(otp) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    page.drawText(`Your OTP code is: ${otp}`, {
      x: 50,
      y: 300,
      size: 30,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  const pdfBytes = await createPDF(OTP);

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

  // Function to send the OTP email with PDF attachment
  async function sendOTP(email, pdfBuffer) {
    let mailOptions = {
      from: "pawankumar14662693@gmail.com", // Sender address
      to: email, // List of receivers
      subject: "Your OTP Code", // Subject line
      text: `Your OTP code is ${OTP}`, // Plain text body
      html: `<p>Your OTP code is <b>${OTP}</b></p><p>Please provide the OTP to change the Aadhaar Card information</p>`, // HTML body
      attachments: [
        {
          filename: "OTP.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
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
    await sendOTP(recipientEmail, pdfBytes);
  } else {
    res.status(400).send({ error: "Recipient email is required" });
  }
};
