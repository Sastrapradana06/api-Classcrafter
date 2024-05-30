const supabase = require("../lib/supabase");
const { hashPassword } = require("../utils");

const getSiswa = async (req, res) => {
  try {
    const { data, error } = await supabase.from("data-siswa").select();
    if (error) {
      res
        .status(404)
        .json({ status: false, message: "Gagal mengambil data siswa" });
    }
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error);
  }
};

const insertSiswa = async (req, res) => {
  const data = req.body;
  const hash = await hashPassword(data.jabatan);
  const dataInsert = { ...data, password: hash };
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .insert(dataInsert)
      .select();
    if (error) {
      res.status(500).json({
        status: false,
        message: "Gagal menambahkan data siswa, email siswa sudah ada",
      });
    }
    res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data siswa",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSiswa = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-siswa")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data siswa" });
    }
    res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data siswa" });
  } catch (error) {
    console.log(error);
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
      if (error.code === "23505") {
        res.status(500).json({
          status: false,
          message: "Gagal perbarui data siswa, email siswa sudah ada",
        });
      }
      res
        .status(500)
        .json({ status: false, message: "Gagal perbarui data siswa" });
    }
    if (data.length === 0) {
      res
        .status(404)
        .json({ status: false, message: "Data siswa tidak ditemukan" });
    } else {
      res.status(200).json({
        status: true,
        message: "Data siswa berhasil diperbarui",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSiswaId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select()
      .eq("id", req.params.id);
    if (error) {
      res
        .status(500)
        .json({ status: false, message: "Gagal mengambil data siswa" });
    }

    if (data.length === 0) {
      res
        .status(404)
        .json({ status: false, message: "Data siswa tidak ditemukan" });
    } else {
      res.status(200).json({ status: true, data: data });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSiswa,
  insertSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswaId,
};
