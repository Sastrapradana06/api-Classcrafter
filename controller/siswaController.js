const supabase = require("../lib/supabase");
const { hashPassword } = require("../utils");

const getSiswa = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("data-siswa")
      .select(
        "id, name, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat, jekel, image"
      )
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
  const dataBody = req.body;

  if (!dataBody)
    return res
      .status(400)
      .json({ status: false, message: "Data tidak boleh kosong" });

  // handle multiple data
  let data = [];
  if (Array.isArray(dataBody) && dataBody.length > 0) {
    const hasPasswordKey = dataBody.some((item) =>
      item.hasOwnProperty("jabatan")
    );
    if (!hasPasswordKey) {
      return res
        .status(400)
        .json({ status: false, message: "Data yang ada masukkan tidak valid" });
    }
    for (const item of dataBody) {
      let password = item.jabatan;
      if (password.includes(" ")) password = password.replace(" ", "");

      const hash = await hashPassword(password);

      const dataInsert = {
        ...item,
        password: hash,
      };

      data.push(dataInsert);
    }
  } else {
    let password = dataBody.jabatan;
    if (password.includes(" ")) password = password.replace(" ", "");
    const hash = await hashPassword(password);
    const dataInsert = { ...dataBody, password: hash };
    data = dataInsert;
  }

  try {
    const { data: newSiswa, error } = await supabase
      .from("data-siswa")
      .insert(data)
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
        message: "Gagal, nama siswa sudah tersedia",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Berhasil menambahkan data siswa",
      data: newSiswa,
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

const deleteSiswaRecords = async (req, res) => {
  const { ids } = req.body;
  try {
    const { error } = await supabase.from("data-siswa").delete().in("id", ids);

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
      .select(
        "id, name, tanggal_lahir, email, notel, jabatan, nama_ortu, alamat, jekel, image"
      )
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
  deleteSiswaRecords,
};
