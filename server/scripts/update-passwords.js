// Script to update all user passwords to a known value
const db = require('../db');

async function updatePasswords() {
  try {
    console.log('Updating all user passwords to "azerty"...');
    
    // The hash we generated and tested
    const passwordHash = '$2a$10$7H1EAlwVBNaQMZ5sSUcNzuehTBvBhWMfRnU0rFzeSykEqfLD3dfye';
    
    // Update all users
    const result = await db('users')
      .update({ password: passwordHash });
    
    console.log(`Successfully updated ${result} user passwords`);

    // Verify by retrieving a user
    const user = await db('users')
      .select('id', 'email', 'password')
      .first();
    
    console.log('Sample user:');
    console.log(`ID: ${user.id}, Email: ${user.email}`);
    console.log(`Password hash: ${user.password}`);
    
    // Close the connection
    await db.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating passwords:', error);
    process.exit(1);
  }
}

updatePasswords(); 