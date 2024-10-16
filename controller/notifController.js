const nodemailer = require("nodemailer");
const { capitalizeEachWord } = require("../utils");
const supabase = require("../lib/supabase");
require("dotenv").config();

const userEmail = process.env.EMAIL_AKUN;
const userPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: userPass,
  },
});

function emailSend(email, subject, judul, text) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: "klimamalik14@gmail.com",
      to: email,
      subject: subject.toUpperCase(),
      html: `<strong>Judul: ${capitalizeEachWord(
        judul
      )}</strong><br><br>${text}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject({ status: false, message: "Invalid", error: error });
      } else {
        resolve({ status: true, message: "Success", data: info });
      }
    });
  });
}

const getEmailSiswa = async () => {
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select("email")
      .order("id", { ascending: true });
    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handleSendNotif = async (req, res) => {
  const { tema, judul, catatan } = req.body;

  try {
    let emailSuccess = 0;
    let message = `Berhasil mengirim email ke semua siswa`;
    const siswa = await getEmailSiswa();
    if (siswa && siswa.length > 0) {
      for (const item of siswa) {
        const emailProcess = await emailSend(item.email, tema, judul, catatan);
        if (emailProcess.status) emailSuccess += 1;
      }
    }

    if (emailSuccess < siswa.length)
      message = `Berhasil mengirim email ke ${emailSuccess} siswa`;

    res.status(200).json({ status: true, message: message });
  } catch (error) {
    console.error("Error in handleSendNotif:", error);
    res
      .status(500)
      .json({ status: false, message: "Gagal mengirim email", error: error });
  }
};

module.exports = { handleSendNotif };
