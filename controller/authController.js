const supabase = require("../lib/supabase");
const jwt = require("jsonwebtoken");
const { comparePassword, hashPassword } = require("../utils");
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
      return res
        .status(404)
        .json({ status: false, message: "Gagal login, email salah" });
    }

    console.log({ password, data: data.password });
    const match = await comparePassword(password, data.password);
    if (!match) {
      return res
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
      return res.status(200).json({
        status: true,
        message: "Berhasil login",
        data: dataUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const updatePassword = async (req, res) => {
  const { idUser, password_lama, password_baru } = req.body;
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select()
      .eq("id", idUser);
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Maaf, terjadi kesalahan" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal update, user tidak ditemukan" });
    }
    const userData = data[0];

    const match = await comparePassword(password_lama, userData.password);
    if (!match) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal update, password lama salah" });
    } else {
      const newPassword = await hashPassword(password_baru);
      const { error } = await supabase
        .from("data-siswa")
        .update({ password: newPassword })
        .eq("id", idUser);
      if (error) {
        return res
          .status(404)
          .json({ status: false, message: "Maaf, terjadi kesalahan" });
      }
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil mengubah password" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

module.exports = { login, updatePassword };
