const supabase = require("../lib/supabase");
const { comparePassword } = require("../utils");

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
      const dataSiswa = {
        id: data.id,
        name: data.name,
        email: data.email,
        notel: data.notel,
        jekel: data.jekel,
        image: data.image,
      };
      res
        .status(200)
        .json({ status: true, message: "Berhasil login", data: dataSiswa });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login };
