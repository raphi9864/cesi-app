// models/Dish.js
const db = require('../db');

const Dish = {
  /**
   * Get all dishes
   */
  findAll: async (filters = {}) => {
    try {
      const query = db('dishes')
        .select(
          'dishes.*',
          'restaurants.nom as restaurant'
        )
        .leftJoin('restaurants', 'dishes.restaurant_id', 'restaurants.id');
      
      if (filters.restaurantId) {
        query.where('dishes.restaurant_id', filters.restaurantId);
      }
      
      if (filters.categorie) {
        query.where('dishes.categorie', filters.categorie);
      }
      
      if (filters.popular) {
        query.where('dishes.popular', true);
      }

      return await query;
    } catch (error) {
      console.error('Error in Dish.findAll:', error);
      throw error;
    }
  },

  /**
   * Get dish by ID
   */
  findById: async (id) => {
    try {
      return await db('dishes')
        .select(
          'dishes.*',
          'restaurants.nom as restaurant'
        )
        .leftJoin('restaurants', 'dishes.restaurant_id', 'restaurants.id')
        .where('dishes.id', id)
        .first();
    } catch (error) {
      console.error('Error in Dish.findById:', error);
      throw error;
    }
  },

  /**
   * Create new dish
   */
  create: async (dishData) => {
    try {
      const [dishId] = await db('dishes').insert(dishData);
      return await Dish.findById(dishId);
    } catch (error) {
      console.error('Error in Dish.create:', error);
      throw error;
    }
  },

  /**
   * Update dish
   */
  update: async (id, dishData) => {
    try {
      await db('dishes')
        .where('id', id)
        .update(dishData);
      
      return await Dish.findById(id);
    } catch (error) {
      console.error('Error in Dish.update:', error);
      throw error;
    }
  },

  /**
   * Delete dish
   */
  delete: async (id) => {
    try {
      return await db('dishes')
        .where('id', id)
        .del();
    } catch (error) {
      console.error('Error in Dish.delete:', error);
      throw error;
    }
  },

  /**
   * Get dish categories by restaurant
   */
  getCategoriesByRestaurant: async (restaurantId) => {
    try {
      const categories = await db('dishes')
        .where('restaurant_id', restaurantId)
        .distinct('categorie')
        .select('categorie');
      
      return categories.map(c => c.categorie);
    } catch (error) {
      console.error('Error in Dish.getCategoriesByRestaurant:', error);
      throw error;
    }
  }
};

module.exports = Dish;