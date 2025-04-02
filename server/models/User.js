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
      const { 
        restaurateurProfile, 
        livreurProfile, 
        password,
        ...userDetails 
      } = userData;

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Start a transaction
      return await db.transaction(async (trx) => {
        // Insert user
        const [userId] = await trx('users').insert({
          ...userDetails,
          password: hashedPassword
        });
        
        // If restaurateur, create profile
        if (userDetails.role === 'restaurateur' && restaurateurProfile) {
          const { restaurants, cuisineSpeciality, ...profileDetails } = restaurateurProfile;
          
          // Insert restaurateur profile
          const [profileId] = await trx('restaurateur_profiles').insert({
            user_id: userId,
            description: profileDetails.description || null,
            business_hours: profileDetails.businessHours || null,
            is_verified: profileDetails.isVerified || false
          });
          
          // Insert cuisine specialities if provided
          if (cuisineSpeciality && cuisineSpeciality.length > 0) {
            const specialityInserts = cuisineSpeciality.map(speciality => ({
              restaurateur_profile_id: profileId,
              speciality
            }));
            
            await trx('restaurateur_specialities').insert(specialityInserts);
          }
          
          // Link restaurants if provided
          if (restaurants && restaurants.length > 0) {
            const restaurantLinks = restaurants.map(restaurantId => ({
              restaurateur_profile_id: profileId,
              restaurant_id: restaurantId
            }));
            
            await trx('restaurateur_restaurants').insert(restaurantLinks);
          }
        }
        
        // If livreur, create profile
        if (userDetails.role === 'livreur' && livreurProfile) {
          const { currentLocation, ...profileDetails } = livreurProfile;
          
          await trx('livreur_profiles').insert({
            user_id: userId,
            vehicle_type: profileDetails.vehicleType || 'vélo',
            license_number: profileDetails.licenseNumber || null,
            is_available: profileDetails.isAvailable || false,
            location_lat: currentLocation?.coordinates[1] || 0,
            location_lng: currentLocation?.coordinates[0] || 0,
            rating_average: profileDetails.ratings?.average || 0,
            rating_count: profileDetails.ratings?.count || 0
          });
        }
        
        // Return the created user
        return await User.findById(userId);
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
        ...userDetails 
      } = userData;

      // Start a transaction
      return await db.transaction(async (trx) => {
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
            
            // Update profile
            await trx('restaurateur_profiles')
              .where('id', profileId)
              .update({
                description: profileDetails.description !== undefined ? profileDetails.description : existingProfile.description,
                business_hours: profileDetails.businessHours !== undefined ? profileDetails.businessHours : existingProfile.business_hours,
                is_verified: profileDetails.isVerified !== undefined ? profileDetails.isVerified : existingProfile.is_verified
              });
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
            // Update profile
            await trx('livreur_profiles')
              .where('id', existingProfile.id)
              .update({
                vehicle_type: profileDetails.vehicleType !== undefined ? profileDetails.vehicleType : existingProfile.vehicle_type,
                license_number: profileDetails.licenseNumber !== undefined ? profileDetails.licenseNumber : existingProfile.license_number,
                is_available: profileDetails.isAvailable !== undefined ? profileDetails.isAvailable : existingProfile.is_available,
                location_lat: currentLocation?.coordinates[1] !== undefined ? currentLocation.coordinates[1] : existingProfile.location_lat,
                location_lng: currentLocation?.coordinates[0] !== undefined ? currentLocation.coordinates[0] : existingProfile.location_lng,
                rating_average: profileDetails.ratings?.average !== undefined ? profileDetails.ratings.average : existingProfile.rating_average,
                rating_count: profileDetails.ratings?.count !== undefined ? profileDetails.ratings.count : existingProfile.rating_count
              });
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
        
        // Return the updated user
        return await User.findById(id);
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
    return await bcrypt.compare(password, hashedPassword);
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
    }
  } catch (error) {
    console.error('Error adding profile data:', error);
    throw error;
  }
}

module.exports = User;