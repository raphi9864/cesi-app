-- Update all users to have the password 'azerty'
-- The following is the correct bcrypt hash for 'azerty' that works with bcryptjs

UPDATE users SET password = '$2a$10$7H1EAlwVBNaQMZ5sSUcNzuehTBvBhWMfRnU0rFzeSykEqfLD3dfye';

-- If you want to update specific users instead, use:
-- UPDATE users SET password = '$2a$10$7H1EAlwVBNaQMZ5sSUcNzuehTBvBhWMfRnU0rFzeSykEqfLD3dfye' WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8); 