// models/User.js
const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  /**
   * Find user by ID
   */
  findById: async (id) => {
    try {
      const user = await db('users')
        .where('id', id)
        .first();
      
      if (user) {
        // Add role-specific profile data
        await _addProfileData(user);
      }
      
      return user;
    } catch (error) {
      console.error('Error in User.findById:', error);
      throw error;
    }
  },

  /**
   * Find user by email
   */
  findByEmail: async (email) => {
    try {
      const user = await db('users')
        .where('email', email)
        .first();
      
      if (user) {
        // Add role-specific profile data
        await _addProfileData(user);
      }
      
      return user;
    } catch (error) {
      console.error('Error in User.findByEmail:', error);
      throw error;
    }
  },

  /**
   * Create a new user
   */
  create: async (userData) => {
    try {
      // Extract fields for different user roles
      let { 
        businessHours, 
        cuisineSpeciality, 
        description,
        vehicleType,
        licenseNumber,
        confirmPassword,
        firstName,
        lastName,
        password,
        email,
        ...otherUserDetails 
      } = userData;

      if (!email) {
        throw new Error('Email is required');
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Map camelCase to snake_case for database columns
      const userDetails = {
        ...otherUserDetails,
        email,
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        is_active: true,
        created_at: new Date()
      };
      
      // Start a transaction
      return await db.transaction(async (trx) => {
        try {
          // Insert user
          await trx('users').insert(userDetails);
          
          // Find the user we just created using email (more reliable than ID)
          const createdUser = await trx('users')
            .where('email', email)
            .first();
          
          if (!createdUser) {
            throw new Error('User created but could not be retrieved');
          }
          
          const userId = createdUser.id;
          
          // If restaurateur, create profile
          if (otherUserDetails.role === 'restaurateur') {
            // Insert restaurateur profile
            const [profileId] = await trx('restaurateur_profiles').insert({
              user_id: userId,
              description: description || null,
              business_hours: businessHours || null,
              is_verified: false
            });
            
            // Insert cuisine specialities if provided
            if (cuisineSpeciality && cuisineSpeciality.length > 0) {
              // Handle single string input (comma-separated)
              let specialities = cuisineSpeciality;
              if (typeof cuisineSpeciality === 'string') {
                specialities = cuisineSpeciality.split(',').map(s => s.trim()).filter(Boolean);
              }
              
              if (specialities.length > 0) {
                const specialityInserts = specialities.map(speciality => ({
                  restaurateur_profile_id: profileId,
                  speciality
                }));
                
                await trx('restaurateur_specialities').insert(specialityInserts);
              }
            }
          }
          
          // If livreur, create profile
          if (otherUserDetails.role === 'livreur') {
            await trx('livreur_profiles').insert({
              user_id: userId,
              vehicle_type: vehicleType || 'vélo',
              license_number: licenseNumber || null,
              is_available: false,
              location_lat: 0,
              location_lng: 0,
              rating_average: 0,
              rating_count: 0
            });
          }
          
          // Add profile data to our created user
          await _addProfileData(createdUser);
          
          return createdUser;
        } catch (trxError) {
          console.error('Transaction error in User.create:', trxError);
          await trx.rollback();
          throw trxError;
        }
      });
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  },

  /**
   * Update a user
   */
  update: async (id, userData) => {
    try {
      const { 
        restaurateurProfile, 
        livreurProfile, 
        password,
        firstName,
        lastName,
        ...otherUserDetails 
      } = userData;

      // Create a properly formatted user details object
      const userDetails = { ...otherUserDetails };
      
      // Add snake_case versions of fields if present
      if (firstName !== undefined) userDetails.first_name = firstName;
      if (lastName !== undefined) userDetails.last_name = lastName;
      if (otherUserDetails.lastLogin) userDetails.last_login = otherUserDetails.lastLogin;

      // Start a transaction
      return await db.transaction(async (trx) => {
        try {
          // Update password if provided
          if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userDetails.password = hashedPassword;
          }
          
          // Update user details
          if (Object.keys(userDetails).length > 0) {
            await trx('users')
              .where('id', id)
              .update(userDetails);
          }
          
          // Get current user data to know the role
          const currentUser = await trx('users')
            .where('id', id)
            .first();
            
          if (!currentUser) {
            throw new Error('User not found');
          }
          
          // Update restaurateur profile if needed
          if (currentUser.role === 'restaurateur' && restaurateurProfile) {
            const { restaurants, cuisineSpeciality, ...profileDetails } = restaurateurProfile;
            
            // Get or create profile
            let profileId;
            const existingProfile = await trx('restaurateur_profiles')
              .where('user_id', id)
              .first();
            
            if (existingProfile) {
              profileId = existingProfile.id;
              
              // Create updated profile object with snake_case keys
              const updatedProfile = {};
              if (profileDetails.description !== undefined) updatedProfile.description = profileDetails.description;
              if (profileDetails.businessHours !== undefined) updatedProfile.business_hours = profileDetails.businessHours;
              if (profileDetails.isVerified !== undefined) updatedProfile.is_verified = profileDetails.isVerified;
              
              // Update profile
              await trx('restaurateur_profiles')
                .where('id', profileId)
                .update(updatedProfile);
            } else {
              // Create new profile
              [profileId] = await trx('restaurateur_profiles').insert({
                user_id: id,
                description: profileDetails.description || null,
                business_hours: profileDetails.businessHours || null,
                is_verified: profileDetails.isVerified || false
              });
            }
            
            // Update cuisine specialities if provided
            if (cuisineSpeciality) {
              // Remove existing specialities
              await trx('restaurateur_specialities')
                .where('restaurateur_profile_id', profileId)
                .del();
              
              // Add new specialities
              if (cuisineSpeciality.length > 0) {
                const specialityInserts = cuisineSpeciality.map(speciality => ({
                  restaurateur_profile_id: profileId,
                  speciality
                }));
                
                await trx('restaurateur_specialities').insert(specialityInserts);
              }
            }
            
            // Update restaurant links if provided
            if (restaurants) {
              // Remove existing links
              await trx('restaurateur_restaurants')
                .where('restaurateur_profile_id', profileId)
                .del();
              
              // Add new links
              if (restaurants.length > 0) {
                const restaurantLinks = restaurants.map(restaurantId => ({
                  restaurateur_profile_id: profileId,
                  restaurant_id: restaurantId
                }));
                
                await trx('restaurateur_restaurants').insert(restaurantLinks);
              }
            }
          }
          
          // Update livreur profile if needed
          if (currentUser.role === 'livreur' && livreurProfile) {
            const { currentLocation, ...profileDetails } = livreurProfile;
            
            // Get or create profile
            const existingProfile = await trx('livreur_profiles')
              .where('user_id', id)
              .first();
            
            if (existingProfile) {
              // Create updated profile object with snake_case keys
              const updatedProfile = {};
              if (profileDetails.vehicleType !== undefined) updatedProfile.vehicle_type = profileDetails.vehicleType;
              if (profileDetails.licenseNumber !== undefined) updatedProfile.license_number = profileDetails.licenseNumber;
              if (profileDetails.isAvailable !== undefined) updatedProfile.is_available = profileDetails.isAvailable;
              if (currentLocation?.coordinates[1] !== undefined) updatedProfile.location_lat = currentLocation.coordinates[1];
              if (currentLocation?.coordinates[0] !== undefined) updatedProfile.location_lng = currentLocation.coordinates[0];
              if (profileDetails.ratings?.average !== undefined) updatedProfile.rating_average = profileDetails.ratings.average;
              if (profileDetails.ratings?.count !== undefined) updatedProfile.rating_count = profileDetails.ratings.count;
              
              // Update profile
              await trx('livreur_profiles')
                .where('id', existingProfile.id)
                .update(updatedProfile);
            } else {
              // Create new profile
              await trx('livreur_profiles').insert({
                user_id: id,
                vehicle_type: profileDetails.vehicleType || 'vélo',
                license_number: profileDetails.licenseNumber || null,
                is_available: profileDetails.isAvailable || false,
                location_lat: currentLocation?.coordinates[1] || 0,
                location_lng: currentLocation?.coordinates[0] || 0,
                rating_average: profileDetails.ratings?.average || 0,
                rating_count: profileDetails.ratings?.count || 0
              });
            }
          }
          
          // Get updated user with profiles
          const updatedUser = await trx('users')
            .where('id', id)
            .first();
            
          if (!updatedUser) {
            throw new Error('User updated but could not be retrieved');
          }
          
          // Add profile data
          await _addProfileData(updatedUser);
          
          return updatedUser;
        } catch (trxError) {
          console.error('Transaction error in User.update:', trxError);
          await trx.rollback();
          throw trxError;
        }
      });
    } catch (error) {
      console.error('Error in User.update:', error);
      throw error;
    }
  },

  /**
   * Delete a user
   */
  delete: async (id) => {
    try {
      // Related profiles will be deleted automatically due to CASCADE constraint
      return await db('users')
        .where('id', id)
        .del();
    } catch (error) {
      console.error('Error in User.delete:', error);
      throw error;
    }
  },

  /**
   * Compare password with hashed password in db
   */
  comparePassword: async (password, hashedPassword) => {
    try {
      // This will handle both $2a$ (older version) and $2b$ (newer version) prefixes
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }
};

/**
 * Helper function to add role-specific profile data to user
 */
async function _addProfileData(user) {
  try {
    if (user.role === 'restaurateur') {
      const restaurateurProfile = await db('restaurateur_profiles')
        .where('user_id', user.id)
        .first();
      
      if (restaurateurProfile) {
        // Get specialities
        const specialities = await db('restaurateur_specialities')
          .where('restaurateur_profile_id', restaurateurProfile.id)
          .select('speciality');
        
        // Get associated restaurants
        const restaurantRelations = await db('restaurateur_restaurants')
          .where('restaurateur_profile_id', restaurateurProfile.id)
          .select('restaurant_id');
        
        // Map snake_case fields to camelCase for the frontend
        user.firstName = user.first_name;
        user.lastName = user.last_name;
        user.restaurateurProfile = {
          description: restaurateurProfile.description,
          businessHours: restaurateurProfile.business_hours,
          isVerified: restaurateurProfile.is_verified,
          cuisineSpeciality: specialities.map(s => s.speciality),
          restaurants: restaurantRelations.map(r => r.restaurant_id)
        };
      }
    } else if (user.role === 'livreur') {
      const livreurProfile = await db('livreur_profiles')
        .where('user_id', user.id)
        .first();
      
      if (livreurProfile) {
        // Map snake_case fields to camelCase for the frontend
        user.firstName = user.first_name;
        user.lastName = user.last_name;
        user.livreurProfile = {
          vehicleType: livreurProfile.vehicle_type,
          licenseNumber: livreurProfile.license_number,
          isAvailable: livreurProfile.is_available,
          currentLocation: {
            type: 'Point',
            coordinates: [livreurProfile.location_lng, livreurProfile.location_lat]
          },
          ratings: {
            average: livreurProfile.rating_average,
            count: livreurProfile.rating_count
          }
        };
      }
    } else {
      // For regular clients, just map the name fields
      user.firstName = user.first_name;
      user.lastName = user.last_name;
    }
  } catch (error) {
    console.error('Error adding profile data:', error);
    throw error;
  }
}

module.exports = User;