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

    const { error } = await supabase.storage
      .from("profile-siswa-classcrafter")
      .upload(`${idUser}/${file.originalname}`, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal Upload Profile, Server Error" });
    }

    const { data: urlImage, error: urlError } = supabase.storage
      .from("profile-siswa-classcrafter")
      .getPublicUrl(`${idUser}/${file.originalname}`);

    // console.log({ publicURL, urlError });

    if (urlError) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal mendapatkan URL gambar" });
    }

    const { data, error: erroUpdate } = await supabase
      .from("data-siswa")
      .update({ image: urlImage.publicUrl })
      .eq("id", idUser)
      .select();

    if (erroUpdate) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal Upload Profile, Server Error" });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil memperbarui image profile",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

module.exports = { uploadProfile };
