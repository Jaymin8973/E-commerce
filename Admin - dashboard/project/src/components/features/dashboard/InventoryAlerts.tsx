import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import { apiService, type Product } from '../../../services/api';

const InventoryAlerts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    apiService.getProducts()
      .then(data => { if (isMounted) setProducts(data); })
      .catch(err => { if (isMounted) setError(err?.message || 'Failed to load inventory'); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const lowStock = useMemo(() => products.filter(p => (p.stock || 0) < 10).slice(0, 5), [products]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold">Inventory Alerts</h2>
        <a href="/products" className="ml-auto text-sm text-blue-600 hover:underline">View all</a>
      </div>
      {loading && <p className="text-sm text-gray-500">Loading low-stock products...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-3">
          {lowStock.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-500">Category: {p.category || '-'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-orange-600">{p.stock} left</p>
                <p className="text-xs text-gray-500">Min: 10</p>
              </div>
            </div>
          ))}
          {lowStock.length === 0 && (
            <p className="text-sm text-gray-500">All good! No low-stock items.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;