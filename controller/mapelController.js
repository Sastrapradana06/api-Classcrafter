const supabase = require("../lib/supabase");

const getMapel = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-mapel")
      .select()
      .order("id", { ascending: true });
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal mengambil data mapel" });
    }
    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const insertMapel = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-mapel")
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
        message: "Gagal, nama mapel sudah tersedia",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data mapel",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const deleteMapel = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-mapel")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data mapel" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data mapel" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const deleteMapelRecords = async (req, res) => {
  const { ids } = req.body;
  try {
    const { error } = await supabase.from("data-mapel").delete().in("id", ids);

    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data mapel" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data mapel" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const updateMapel = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-mapel")
      .update({
        mapel: req.body.mapel,
        jam: req.body.jam,
        durasi: req.body.durasi,
        hari: req.body.hari,
        nama_guru: req.body.nama_guru,
      })
      .eq("id", req.body.id)
      .select();
    if (error) {
      return res.status(500).json({
        status: false,
        message: "Gagal perbarui data mapel, mapel sudah ada",
      });
    }
    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data mapel tidak ditemukan" });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data mapel berhasil diperbarui",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const getMapelId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-mapel")
      .select()
      .eq("id", req.params.id);
    if (error) {
      return res
        .status(500)
        .json({ status: false, message: "Gagal mengambil data mapel" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data mapel tidak ditemukan" });
    } else {
      return res.status(200).json({ status: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

module.exports = {
  getMapel,
  insertMapel,
  deleteMapel,
  updateMapel,
  getMapelId,
  deleteMapelRecords,
};
