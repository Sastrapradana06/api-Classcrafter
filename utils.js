const bcrypt = require("bcrypt");

const capitalizeEachWord = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

async function hashPassword(jabatan) {
  const hash = await bcrypt.hash(jabatan, 10);
  return hash;
}

async function comparePassword(plainPassword, hash) {
  try {
    const match = await bcrypt.compare(plainPassword, hash);
    return match;
  } catch (err) {
    throw new Error("Error comparing password: " + err.message);
  }
}

function extractFilePath(url, idUser) {
  const newUrl = url.replace(
    `https://skfxqnwtdgazmbpbptmi.supabase.co/storage/v1/object/public/profile-siswa-classcrafter/${idUser}/`,
    ""
  );
  if (newUrl.includes("%20")) {
    const result = newUrl.replace("%20", " ");
    return result;
  } else {
    return newUrl;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  extractFilePath,
  capitalizeEachWord,
};
