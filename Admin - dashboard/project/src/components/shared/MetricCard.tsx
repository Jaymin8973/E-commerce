import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, trend, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="min-w-0 mr-4">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 truncate">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {trend === 'up' ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        {description && (
          <span className="text-sm text-gray-500 ml-1 truncate">{description}</span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;