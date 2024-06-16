const supabase = require("../lib/supabase");

const insertGuru = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-guru")
      .insert(req.body)
      .select();

    if (error) {
      if (error.code === "PGRST204") {
        return res.status(404).json({
          status: false,
          message: "Data yang ada masukkan tidak valid",
        });
      }
      return res.status(500).json({
        status: false,
        message: "Gagal, nama guru sudah tersedia",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data guru",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, message: error });
  }
};

const updateGuru = async (req, res) => {
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
      return res
        .status(404)
        .json({ status: false, message: "Gagal perbarui data guru" });
    }
    return res.status(200).json({
      status: true,
      message: "Data guru berhasil diperbarui",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, message: error });
  }
};

const deleteGuru = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-guru")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data guru" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data guru" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, message: error });
  }
};
const getGuru = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-guru")
      .select()
      .order("id", { ascending: true });
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal mengambil data guru" });
    } else {
      return res.status(200).json({ status: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, message: error });
  }
};

const getGuruId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-guru")
      .select()
      .eq("id", req.params.id);
    if (error) {
      return res
        .status(500)
        .json({ status: false, message: "Gagal mengambil data guru" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data guru tidak ditemukan" });
    } else {
      return res.status(200).json({ status: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

module.exports = {
  getGuru,
  getGuruId,
  insertGuru,
  updateGuru,
  deleteGuru,
};
