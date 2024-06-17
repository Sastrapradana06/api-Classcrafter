const supabase = require("../lib/supabase");

const getKas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-kas")
      .select()
      .order("id", { ascending: true });
    if (error) {
      return res
        .status(401)
        .json({ status: false, message: "Gagal mengambil data kas" });
    }
    return res.status(200).json({
      status: true,
      message: "Berhasil mengambil data kas",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const insertKas = async (req, res) => {
  const dataInsert = req.body;
  try {
    const { data, error } = await supabase
      .from("data-kas")
      .insert(dataInsert)
      .select();
    if (error) {
      return res.status(401).json({
        status: false,
        message: "Gagal menambahkan data kas, email kas sudah ada",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data kas",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const getKasId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-kas")
      .select()
      .eq("id", req.params.id);

    if (error) {
      return res
        .status(401)
        .json({ status: false, message: "Gagal mengambil data kas" });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data kas tidak ditemukan" });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil mengambil data kas",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ status: false, message: error });
  }
};

const getKasByStatus = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-kas")
      .select()
      .eq("status", req.params.status);

    if (error) {
      return res
        .status(401)
        .json({ status: false, message: "Gagal mengambil data kas" });
    }

    if (data.length === 0) {
      return res.status(404).json({
        status: false,
        message: `Data dengan status ${req.params.status}  tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: true,
      message: `Berhasil mengambil data kas dengan status ${req.params.status}`,
      data: data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ status: false, message: error });
  }
};

const updateKas = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-kas")
      .update({
        status: req.body.status,
        nominal: req.body.nominal,
        tgl_transaksi: req.body.tgl_transaksi,
        user: req.body.user,
        jabatan: req.body.jabatan,
        deskripsi: req.body.deskripsi,
      })
      .eq("id", req.body.id);

    if (error) {
      return res
        .status(401)
        .json({ status: false, message: "Gagal memperbarui data kas" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Berhasil memperbarui data kas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const deleteKas = async (req, res) => {
  try {
    const { error } = await supabase
      .from("data-kas")
      .delete()
      .eq("id", req.params.id);

    if (error) {
      return res
        .status(401)
        .json({ status: false, message: "Gagal menghapus data kas" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data kas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

const deleteKasRecords = async (req, res) => {
  const { ids } = req.body;
  try {
    const { error } = await supabase.from("data-kas").delete().in("id", ids);

    if (error) {
      return res
        .status(404)
        .json({ status: false, message: "Gagal menghapus data kas" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Berhasil menghapus data kas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error });
  }
};

module.exports = {
  getKas,
  insertKas,
  getKasId,
  getKasByStatus,
  updateKas,
  deleteKas,
  deleteKasRecords,
};
