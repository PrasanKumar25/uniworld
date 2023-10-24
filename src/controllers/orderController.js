

const db = require("../models/dbConfig");


async function createOrder(req, res) {
  const { customer_name, customer_email, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Items list is empty." });
  }

 
  db.beginTransaction(async (err) => {
    if (err) {
      return res.status(500).json({ message: "Error starting transaction." });
    }

    try {
     
      let totalPrice = 0;

      for (const item of items) {
        const { product_id, quantity } = item;

        const product = await getProductFromDatabase(product_id);

        if (!product) {
          return db.rollback(() => {
            res.status(400).json({ message: "Product not found." });
          });
        }

        if (product.stock_quantity < quantity) {
          return db.rollback(() => {
            res
              .status(400)
              .json({
                message: "Insufficient stock for product_id: " + product_id,
              });
          });
        }

       
        const itemPrice = product.price * quantity;
        totalPrice += itemPrice;

        
        await updateProductStock(product_id, product.stock_quantity - quantity);
      }

      const order_id = await createOrderInDatabase(
        customer_name,
        customer_email,
        totalPrice
      );

      
      for (const item of items) {
        const { product_id, quantity } = item;
        await createOrderItemInDatabase(order_id, product_id, quantity);
      }

      
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            res
              .status(500)
              .json({ message: "Error committing the transaction." });
          });
        }
        res.status(201).json({ message: "Order created successfully." });
      });
    } catch (error) {
      
      db.rollback(() => {
        res.status(500).json({ message: "Error creating the order." });
      });
    }
  });
}


module.exports = {
  createOrder,
};
