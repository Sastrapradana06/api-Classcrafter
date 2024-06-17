const supabase = require("../lib/supabase");
const fs = require("fs");
const path = require("path");
const { extractFilePath } = require("../utils");

const uploadProfile = async (req, res) => {
  const file = req.file;
  const idUser = req.body.idUser;
  const urlImgLama = req.body.urlImgLama;

  if (!file) {
    return res
      .status(404)
      .json({ status: false, message: "File tidak ditemukan" });
  }
  try {
    const filePath = file.path;
    const fileBuffer = fs.readFileSync(filePath);

    if (urlImgLama != "") {
      const url = extractFilePath(urlImgLama, idUser);
      const { error } = await supabase.storage
        .from("profile-siswa-classcrafter")
        .remove([`${idUser}/${url}`]);

      if (error) {
        return res.status(404).json({
          status: false,
          message: "Gagal update foto Profile, Server Error",
        });
      }
    }

    const { error } = await supabase.storage
      .from("profile-siswa-classcrafter")
      .upload(`${idUser}/${file.originalname}`, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) {
      return res.status(404).json({
        status: false,
        message: "Gagal Update Foto Profile, Server Error",
      });
    }

    const { data: urlImage, error: urlError } = supabase.storage
      .from("profile-siswa-classcrafter")
      .getPublicUrl(`${idUser}/${file.originalname}`);

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

    fs.unlinkSync(filePath);

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

const deleteProfile = async (req, res) => {
  const idUser = req.body.idUser;
  const urlImgLama = req.body.urlImgLama;

  if (!urlImgLama || !idUser) {
    return res
      .status(404)
      .json({ status: false, message: "Files tidak ditemukan" });
  }

  try {
    const { error: erroUpdate } = await supabase
      .from("data-siswa")
      .update({ image: "" })
      .eq("id", idUser);

    if (erroUpdate) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal update user, Server Error" });
    }

    const url = extractFilePath(urlImgLama, idUser);
    const { error } = await supabase.storage
      .from("profile-siswa-classcrafter")
      .remove([`${idUser}/${url}`]);

    if (error) {
      return res.status(404).json({
        status: false,
        message: "Gagal delete foto Profile, Server Error",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil menghapus image profile",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

module.exports = { uploadProfile, deleteProfile };
