const supabase = require("../lib/supabase");
const { hashPassword } = require("../utils");

const getSiswa = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select()
      .order("id", { ascending: true });
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal mengambil data siswa" });
    }
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const insertSiswa = async (req, res) => {
  const data = req.body;
  if (!data)
    return res
      .status(400)
      .json({ status: false, message: "Data tidak boleh kosong" });

  const password = data.jabatan.replace(" ", "");
  const hash = await hashPassword(password);
  const dataInsert = { ...data, password: hash };
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .insert(dataInsert)
      .select();
    if (error) {
      return res.status(500).json({
        status: false,
        message: "Gagal menambahkan data siswa, email siswa sudah ada",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data siswa",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const deleteSiswa = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-siswa")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data siswa" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data siswa" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const updateSiswa = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .update({
        name: req.body.name,
        tanggal_lahir: req.body.tanggal_lahir,
        email: req.body.email,
        notel: req.body.notel,
        jabatan: req.body.jabatan,
        nama_ortu: req.body.nama_ortu,
        alamat: req.body.alamat,
        jekel: req.body.jekel,
        image: req.body.image,
      })
      .eq("id", req.body.id)
      .select();
    if (error) {
      return res.status(401).json({
        status: false,
        message: "Gagal perbarui data siswa, email siswa sudah ada",
      });
    }
    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data siswa tidak ditemukan" });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data siswa berhasil diperbarui",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const getSiswaId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select()
      .eq("id", req.params.id);
    if (error) {
      return res
        .status(500)
        .json({ status: false, message: "Gagal mengambil data siswa" });
    }

    if (data && data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data siswa tidak ditemukan" });
    } else {
      return res.status(200).json({ status: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

module.exports = {
  getSiswa,
  insertSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswaId,
};
