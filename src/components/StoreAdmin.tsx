import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function StoreAdmin() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('products')
        .insert([
          {
            name: formData.name,
            price: formData.price,
            description: formData.description,
            image: formData.imageUrl,
          },
        ]);

      if (error) throw error;

      // Reset form after successful submission
      setFormData({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
      });

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="min-h-screen pt-20 bg-primary">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">Store Admin</h1>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-primary/50 p-6 rounded-lg border border-textSecondary/20">
            <div className="mb-4">
              <label htmlFor="name" className="block text-textPrimary mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-primary border border-textSecondary/20 text-textPrimary"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-textPrimary mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full p-2 rounded bg-primary border border-textSecondary/20 text-textPrimary"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-textPrimary mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-primary border border-textSecondary/20 text-textPrimary h-32"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="imageUrl" className="block text-textPrimary mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 rounded bg-primary border border-textSecondary/20 text-textPrimary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary/90 transition-colors"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}