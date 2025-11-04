import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {  type Product } from '../../services/api';
import ProductApi from '../../services/productApi';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const productId = Number(id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID');
      return;
    }
    let isMounted = true;
    setLoading(true);
    setError(null);
    ProductApi.getProductById(productId)
      .then((data) => { if (isMounted) console.log(data), setProduct(data); })
      .catch((err) => { if (isMounted) setError(err?.message || 'Failed to load product'); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, [productId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Detail</h1>
          <p className="text-gray-500 mt-1">View product information</p>
        </div>
        <Link to="/products" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Back to Products</Link>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading product...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && product && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start space-x-6">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/240'}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-lg border"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/240'; }}
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-700">{product.description || 'No description'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-900">{product.Category.name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-sm font-medium text-gray-900">₹{(product.sellingPrice || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="text-sm font-medium text-gray-900">{product.totalStock || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">{product.createdAt ? new Date(product.createdAt).toLocaleString() : '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Updated</p>
                  <p className="text-sm font-medium text-gray-900">{product.updatedAt ? new Date(product.updatedAt).toLocaleString() : '—'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
