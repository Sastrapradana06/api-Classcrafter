const supabase = require("../lib/supabase");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select()
      .eq("email", email)
      .single();
    if (error) {
      res
        .status(404)
        .json({ status: false, message: "Gagal login, email salah" });
    }

    const match = await comparePassword(password, data.password);
    if (!match) {
      res
        .status(404)
        .json({ status: false, message: "Gagal login, password salah" });
    } else {
      const dataUser = {
        id: data.id,
        name: data.name,
        jabatan: data.jabatan,
        email: data.email,
        notel: data.notel,
        jekel: data.jekel,
        image: data.image,
      };
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = jwt.sign({ name: dataUser.name }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        status: true,
        message: "Berhasil login",
        data: dataUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login };
