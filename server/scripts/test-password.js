const bcrypt = require('bcryptjs');

// The hash from the update_passwords.sql file
const storedHash = '$2a$10$xCknF7XOcH7yg/XSKLavTuMY9qBxHRoAQMvMiHm8Vay1eqTVhYJJy';
const password = 'azerty';

async function testPasswordMatch() {
  try {
    console.log('Testing password comparison...');
    console.log(`Password: ${password}`);
    console.log(`Stored hash: ${storedHash}`);
    
    const isMatch = await bcrypt.compare(password, storedHash);
    console.log(`Match result: ${isMatch}`);
    
    // Generate a new hash for comparison
    const newHash = await bcrypt.hash(password, 10);
    console.log(`Newly generated hash: ${newHash}`);
    
    const isNewMatch = await bcrypt.compare(password, newHash);
    console.log(`New match result: ${isNewMatch}`);
  } catch (error) {
    console.error('Error testing password:', error);
  }
}

testPasswordMatch(); 