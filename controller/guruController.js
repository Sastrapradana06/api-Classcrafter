const supabase = require("../lib/supabase");

const insertGuru = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-guru")
      .insert(req.body)
      .select();
    console.log({ data, error });
    if (error) {
      res.status(404).json({
        status: false,
        message: "Gagal menambahkan data guru, nama guru sudah ada",
      });
    }
    res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data guru",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateGuru = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  try {
    const { data, error } = await supabase
      .from("data-guru")
      .update({
        name: req.body.name,
        jekel: req.body.jekel,
        mapel: req.body.mapel,
        jadwal: req.body.jadwal,
      })
      .eq("id", req.body.id)
      .select();
    if (error) {
      res
        .status(404)
        .json({ status: false, message: "Gagal perbarui data guru" });
    }
    res.status(200).json({
      status: true,
      message: "Data guru berhasil diperbarui",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteGuru = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-guru")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data guru" });
    }
    res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data guru" });
  } catch (error) {
    console.log(error);
  }
};
const getGuru = async (req, res) => {
  try {
    const { data, error } = await supabase.from("data-guru").select();
    if (error) {
      res
        .status(404)
        .json({ status: false, message: "Gagal mengambil data guru" });
    }
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error);
  }
};

const getGuruId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-guru")
      .select()
      .eq("id", req.params.id);
    if (error) {
      res
        .status(500)
        .json({ status: false, message: "Gagal mengambil data guru" });
    }

    if (data.length === 0) {
      res
        .status(404)
        .json({ status: false, message: "Data guru tidak ditemukan" });
    } else {
      res.status(200).json({ status: true, data: data });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGuru,
  getGuruId,
  insertGuru,
  updateGuru,
  deleteGuru,
};
