const bcrypt = require("bcrypt");

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

module.exports = { hashPassword, comparePassword };
