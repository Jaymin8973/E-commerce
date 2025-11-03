import React, { useEffect, useState } from 'react';
import { Eye, Package, Truck } from 'lucide-react';
import { apiService, type Order } from '../../../services/api';

const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    apiService.getOrders()
      .then(data => { if (isMounted) setOrders(data.slice(0, 5)); })
      .catch(err => { if (isMounted) setError(err?.message || 'Failed to load orders'); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <Eye className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-yellow-600 bg-yellow-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <button className="text-sm text-black hover:underline">View all</button>
      </div>
      {loading && <p className="text-sm text-gray-500">Loading orders...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer_name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">₹{(order.total_amount || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-sm text-gray-500">No recent orders</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;