// models/Restaurant.js
const db = require('../db');

const Restaurant = {
  /**
   * Get all restaurants
   */
  findAll: async (filters = {}) => {
    try {
      const query = db('restaurants')
        .select(
          'restaurants.*',
          db.raw('(SELECT GROUP_CONCAT(category) FROM restaurant_categories WHERE restaurant_id = restaurants.id) as categories')
        );
      
      if (filters.popular) {
        query.where('popular', true);
      }

      if (filters.category) {
        query.whereExists(function() {
          this.select(1)
            .from('restaurant_categories')
            .whereRaw('restaurant_categories.restaurant_id = restaurants.id')
            .where('category', filters.category);
        });
      }

      return await query;
    } catch (error) {
      console.error('Error in Restaurant.findAll:', error);
      throw error;
    }
  },

  /**
   * Get restaurant by ID
   */
  findById: async (id) => {
    try {
      const restaurant = await db('restaurants')
        .where('id', id)
        .first();
      
      if (restaurant) {
        // Get categories
        const categories = await db('restaurant_categories')
          .where('restaurant_id', id)
          .select('category');
        
        restaurant.categories = categories.map(c => c.category);
      }

      return restaurant;
    } catch (error) {
      console.error('Error in Restaurant.findById:', error);
      throw error;
    }
  },

  /**
   * Create new restaurant
   */
  create: async (restaurantData) => {
    try {
      const { categories, ...restaurantDetails } = restaurantData;
      
      // Insert restaurant and get ID
      const [restaurantId] = await db('restaurants').insert(restaurantDetails);
      
      // Add categories if provided
      if (categories && categories.length > 0) {
        const categoryInserts = categories.map(category => ({
          restaurant_id: restaurantId,
          category
        }));
        
        await db('restaurant_categories').insert(categoryInserts);
      }
      
      return await Restaurant.findById(restaurantId);
    } catch (error) {
      console.error('Error in Restaurant.create:', error);
      throw error;
    }
  },

  /**
   * Update restaurant
   */
  update: async (id, restaurantData) => {
    try {
      const { categories, ...restaurantDetails } = restaurantData;
      
      // Update restaurant details
      await db('restaurants')
        .where('id', id)
        .update(restaurantDetails);
      
      // Update categories if provided
      if (categories) {
        // Delete existing categories
        await db('restaurant_categories')
          .where('restaurant_id', id)
          .del();
        
        // Add new categories
        if (categories.length > 0) {
          const categoryInserts = categories.map(category => ({
            restaurant_id: id,
            category
          }));
          
          await db('restaurant_categories').insert(categoryInserts);
        }
      }
      
      return await Restaurant.findById(id);
    } catch (error) {
      console.error('Error in Restaurant.update:', error);
      throw error;
    }
  },

  /**
   * Delete restaurant
   */
  delete: async (id) => {
    try {
      // Categories will be deleted automatically due to CASCADE constraint
      return await db('restaurants')
        .where('id', id)
        .del();
    } catch (error) {
      console.error('Error in Restaurant.delete:', error);
      throw error;
    }
  }
};

module.exports = Restaurant;