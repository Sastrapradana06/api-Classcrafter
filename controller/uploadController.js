const supabase = require("../lib/supabase");
const fs = require("fs");
const path = require("path");

const uploadProfile = async (req, res) => {
  const file = req.file;
  const idUser = req.body.idUser;

  if (!file) {
    return res
      .status(404)
      .json({ status: false, message: "File tidak ditemukan" });
  }
  try {
    const filePath = file.path;
    const fileBuffer = fs.readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from("profile-siswa-classcrafter")
      .upload(`public/${idUser}`, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal Upload Profile" });
    }

    const { data: publicURL, error: urlError } = supabase.storage
      .from("profile-siswa-classcrafter")
      .getPublicUrl(`public/${idUser}`);

    // console.log({ publicURL, urlError });

    if (urlError) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal mendapatkan URL gambar" });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil Upload Profile",
      url: publicURL,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

module.exports = { uploadProfile };
