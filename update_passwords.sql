-- Update all users to have the password 'azerty'
-- $2a$10$xCknF7XOcH7yg/XSKLavTuMY9qBxHRoAQMvMiHm8Vay1eqTVhYJJy is the bcrypt hash for 'azerty'

UPDATE users SET password = '$2a$10$xCknF7XOcH7yg/XSKLavTuMY9qBxHRoAQMvMiHm8Vay1eqTVhYJJy';

-- If you want to update specific users instead, use:
-- UPDATE users SET password = '$2a$10$xCknF7XOcH7yg/XSKLavTuMY9qBxHRoAQMvMiHm8Vay1eqTVhYJJy' WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8); 