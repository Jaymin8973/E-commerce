import React, { useEffect, useState } from 'react';
import { TrendingUp, ShoppingCart, Package, Users, AlertTriangle, Star, DollarSign, TrendingDown } from 'lucide-react';
import MetricCard from '../shared/MetricCard';
import Chart from '../shared/Chart';
import RecentOrders from '../features/dashboard/RecentOrders';
import InventoryAlerts from '../features/dashboard/InventoryAlerts';
import PerformanceMetrics from '../features/dashboard/PerformanceMetrics';
import { apiService, type DashboardStats } from '../../services/api';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    apiService.getDashboardStats()
      .then(data => { if (isMounted) setStats(data); })
      .catch(err => { if (isMounted) setError(err?.message || 'Failed to load stats'); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const metrics = [
    {
      title: "Total Products",
      value: stats ? String(stats.totalProducts) : (loading ? '…' : '—'),
      change: "",
      icon: Package,
      trend: "up",
      description: error ? 'Error loading' : 'From database'
    },
    {
      title: "Orders",
      value: stats ? String(stats.totalOrders) : (loading ? '…' : '—'),
      change: "",
      icon: ShoppingCart,
      trend: "up",
      description: error ? 'Error loading' : 'From database'
    },
    {
      title: "Revenue",
      value: stats ? `₹${(stats.totalRevenue || 0).toLocaleString()}` : (loading ? '…' : '—'),
      change: "",
      icon: DollarSign,
      trend: "up",
      description: error ? 'Error loading' : 'Completed orders'
    },
    {
      title: "Low Stock",
      value: stats ? String(stats.lowStockProducts) : (loading ? '…' : '—'),
      change: "",
      icon: AlertTriangle,
      trend: "down",
      description: error ? 'Error loading' : '< 10 units'
    },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro Max", sales: 45, revenue: "₹60,70,500" },
    { name: "Samsung Galaxy S24", sales: 38, revenue: "₹47,49,962" },
    { name: "MacBook Pro 16\"", sales: 22, revenue: "₹54,97,800" },
    { name: "AirPods Pro", sales: 67, revenue: "₹13,40,000" },
    { name: "iPad Air", sales: 29, revenue: "₹17,40,000" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            trend={metric.trend}
            description={metric.description}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-black text-white rounded-md">Daily</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Weekly</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Monthly</button>
            </div>
          </div>
          <Chart type="line" />
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <button className="text-sm text-black hover:underline">View Details</button>
          </div>
          <Chart type="doughnut" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <span className="text-sm text-gray-600">Processing (40%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Shipped (30%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Delivered (20%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending (10%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div className="space-y-6">
          <InventoryAlerts />
          <PerformanceMetrics />
          
          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Top Products</h2>
              <button className="text-sm text-black hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;