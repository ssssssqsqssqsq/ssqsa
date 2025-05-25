import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 'basic',
    name: 'free Boost',
    description: 'Boost Gratuit, Mettre en avant sont serveur.',
    price: 0,
    features: [
      '48-hour server promotion',
      'Basic analytics',
      'Standard support'
    ],
    icon: <Zap className="w-6 h-6 text-purple-400" />
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    description: 'Montre ta visibilité pour ton serveur discord',
    price: 1.30,
    features: [
      '1-Week server promotion',
      'Advanced analytics',
      'Priority support',
      'Custom server banner'
    ],
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    popular: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate Boost',
    description: 'Maximum boost, hyper visibilité',
    price: 4.50,
    features: [
      'Infinity day server promotion',
      'Premium analytics',
      '24/7 VIP support',
      'Custom server banner',
      'Featured server status'
    ],
    icon: <Shield className="w-6 h-6 text-emerald-400" />
  }
];

const ShopPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handlePurchase = (productId: string) => {
    setSelectedProduct(productId);
    toast.success('Coming soon! This feature is under development.');
  };

  return (
    <div className="min-h-screen bg-[#0F0518] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Boost Your Server
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the perfect boost package to enhance your server's visibility and grow your community faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className={`relative bg-[#1A0F2E] rounded-xl overflow-hidden ${
                  product.popular ? 'border-2 border-purple-500' : ''
                }`}
                whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)' }}
                transition={{ duration: 0.3 }}
              >
                {product.popular && (
                  <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#2D1B4E] rounded-lg mb-4">
                    {product.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-300 mb-4">{product.description}</p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">${product.price}</span>
                    <span className="text-gray-400 ml-1">/boost</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handlePurchase(product.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      selectedProduct === product.id
                        ? 'bg-purple-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Purchase Boost
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-300 mb-6">
              Contact us for custom packages tailored to your server's specific needs.
            </p>
            <motion.button
              className="bg-transparent border-2 border-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Contact form coming soon!')}
            >
              Contact Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;