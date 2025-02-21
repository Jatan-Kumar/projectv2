import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Developer T-Shirt",
    price: 29.99,
    description: "Comfortable cotton t-shirt with a cool developer design",
    image: "https://via.placeholder.com/300x300"
  },
  {
    id: 2,
    name: "Code Mug",
    price: 14.99,
    description: "Ceramic mug with programming syntax design",
    image: "https://via.placeholder.com/300x300"
  },
  {
    id: 3,
    name: "Laptop Stickers Pack",
    price: 9.99,
    description: "Set of 10 programming-themed vinyl stickers",
    image: "https://via.placeholder.com/300x300"
  }
];

export default function Store() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen pt-20 bg-primary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-textPrimary">Developer Store</h1>
            <div className="relative">
              <FiShoppingCart className="text-2xl text-textPrimary" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-primary/50 p-6 rounded-lg border border-textSecondary/20"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold text-textPrimary mb-2">{product.name}</h2>
                <p className="text-textSecondary mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-secondary font-bold">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary/90 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}