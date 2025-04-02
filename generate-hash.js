const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync('azerty', 10);
console.log('Bcrypt hash for "azerty":');
console.log(hash); 