import supabase from "../lib/supabase";

const getGuru = async (req, res) => {
  const { tema, judul, siswa, catatan } = req.body;
  console.log({ tema, judul, siswa, catatan });

  return res
    .status(404)
    .json({ status: false, message: "Gagal mengambil data guru" });
};

export { getGuru };
