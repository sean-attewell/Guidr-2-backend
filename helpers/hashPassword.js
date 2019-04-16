const bcrypt = require('bcryptjs');

module.exports = password => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};