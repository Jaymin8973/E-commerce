import React from 'react';
import { Star, TrendingUp, Clock } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Performance</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Rating</span>
          </div>
          <span className="text-sm font-bold">4.8/5</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Fulfillment Rate</span>
          </div>
          <span className="text-sm font-bold">98.5%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Avg. Response</span>
          </div>
          <span className="text-sm font-bold">2.3 hrs</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;