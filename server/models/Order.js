// models/Order.js
const db = require('../db');

const Order = {
  /**
   * Find order by ID
   */
  findById: async (id) => {
    try {
      const order = await db('orders')
        .where('orders.id', id)
        .first();
      
      if (order) {
        // Get order items
        const items = await db('order_items')
          .select(
            'order_items.*',
            'dishes.nom as dish_name',
            'dishes.image as dish_image'
          )
          .leftJoin('dishes', 'order_items.dish_id', 'dishes.id')
          .where('order_items.order_id', id);
        
        order.items = items.map(item => ({
          dish: {
            id: item.dish_id,
            nom: item.dish_name,
            image: item.dish_image
          },
          quantity: item.quantity,
          price: item.price,
          customization: item.customization
        }));
      }
      
      return order;
    } catch (error) {
      console.error('Error in Order.findById:', error);
      throw error;
    }
  },

  /**
   * Find orders by user ID
   */
  findByUser: async (userId) => {
    try {
      const orders = await db('orders')
        .select(
          'orders.*',
          'restaurants.nom as restaurant_name'
        )
        .leftJoin('restaurants', 'orders.restaurant_id', 'restaurants.id')
        .where('orders.user_id', userId)
        .orderBy('orders.created_at', 'desc');
      
      // Get items for each order
      for (const order of orders) {
        const items = await db('order_items')
          .select(
            'order_items.*',
            'dishes.nom as dish_name',
            'dishes.image as dish_image'
          )
          .leftJoin('dishes', 'order_items.dish_id', 'dishes.id')
          .where('order_items.order_id', order.id);
        
        order.items = items.map(item => ({
          dish: {
            id: item.dish_id,
            nom: item.dish_name,
            image: item.dish_image
          },
          quantity: item.quantity,
          price: item.price,
          customization: item.customization
        }));
      }
      
      return orders;
    } catch (error) {
      console.error('Error in Order.findByUser:', error);
      throw error;
    }
  },

  /**
   * Find orders by restaurant ID
   */
  findByRestaurant: async (restaurantId) => {
    try {
      const orders = await db('orders')
        .select(
          'orders.*',
          'users.first_name as user_first_name',
          'users.last_name as user_last_name'
        )
        .leftJoin('users', 'orders.user_id', 'users.id')
        .where('orders.restaurant_id', restaurantId)
        .orderBy('orders.created_at', 'desc');
      
      // Get items for each order
      for (const order of orders) {
        const items = await db('order_items')
          .select(
            'order_items.*',
            'dishes.nom as dish_name',
            'dishes.image as dish_image'
          )
          .leftJoin('dishes', 'order_items.dish_id', 'dishes.id')
          .where('order_items.order_id', order.id);
        
        order.items = items.map(item => ({
          dish: {
            id: item.dish_id,
            nom: item.dish_name,
            image: item.dish_image
          },
          quantity: item.quantity,
          price: item.price,
          customization: item.customization
        }));
      }
      
      return orders;
    } catch (error) {
      console.error('Error in Order.findByRestaurant:', error);
      throw error;
    }
  },

  /**
   * Create a new order
   */
  create: async (orderData) => {
    try {
      const { items, deliveryAddress, ...orderDetails } = orderData;
      
      // Start a transaction
      return await db.transaction(async (trx) => {
        // Insert order
        const [orderId] = await trx('orders').insert({
          ...orderDetails,
          delivery_street: deliveryAddress?.street || null,
          delivery_city: deliveryAddress?.city || null,
          delivery_zip_code: deliveryAddress?.zipCode || null,
          delivery_country: deliveryAddress?.country || null
        });
        
        // Insert order items
        if (items && items.length > 0) {
          const itemInserts = items.map(item => ({
            order_id: orderId,
            dish_id: item.dish,
            quantity: item.quantity,
            price: item.price,
            customization: item.customization || null
          }));
          
          await trx('order_items').insert(itemInserts);
        }
        
        // Return the created order
        return await Order.findById(orderId);
      });
    } catch (error) {
      console.error('Error in Order.create:', error);
      throw error;
    }
  },

  /**
   * Update order status
   */
  updateStatus: async (id, status) => {
    try {
      await db('orders')
        .where('id', id)
        .update({ status });
      
      return await Order.findById(id);
    } catch (error) {
      console.error('Error in Order.updateStatus:', error);
      throw error;
    }
  },

  /**
   * Update order
   */
  update: async (id, orderData) => {
    try {
      const { items, deliveryAddress, ...orderDetails } = orderData;
      
      // Start a transaction
      return await db.transaction(async (trx) => {
        // Update order details
        if (Object.keys(orderDetails).length > 0) {
          await trx('orders')
            .where('id', id)
            .update(orderDetails);
        }
        
        // Update delivery address if provided
        if (deliveryAddress) {
          await trx('orders')
            .where('id', id)
            .update({
              delivery_street: deliveryAddress.street,
              delivery_city: deliveryAddress.city,
              delivery_zip_code: deliveryAddress.zipCode,
              delivery_country: deliveryAddress.country
            });
        }
        
        // Update items if provided
        if (items) {
          // Delete existing items
          await trx('order_items')
            .where('order_id', id)
            .del();
          
          // Insert new items
          if (items.length > 0) {
            const itemInserts = items.map(item => ({
              order_id: id,
              dish_id: item.dish,
              quantity: item.quantity,
              price: item.price,
              customization: item.customization || null
            }));
            
            await trx('order_items').insert(itemInserts);
          }
        }
        
        // Return the updated order
        return await Order.findById(id);
      });
    } catch (error) {
      console.error('Error in Order.update:', error);
      throw error;
    }
  },

  /**
   * Delete order
   */
  delete: async (id) => {
    try {
      // Related items will be deleted automatically due to CASCADE constraint
      return await db('orders')
        .where('id', id)
        .del();
    } catch (error) {
      console.error('Error in Order.delete:', error);
      throw error;
    }
  }
};

module.exports = Order;