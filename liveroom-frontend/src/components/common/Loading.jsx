import React from 'react';

const Loading = ({ size = 'medium', text = 'Loading...', overlay = false }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const containerClasses = overlay 
    ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        {text && (
          <p className={`${overlay ? 'text-white' : 'text-gray-600'} text-sm font-medium`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

// Alternative dot loading animation
const DotLoading = ({ text = 'Loading', color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600'
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex space-x-2">
        <div className={`w-3 h-3 ${colorClasses[color]} rounded-full animate-bounce`}></div>
        <div className={`w-3 h-3 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
        <div className={`w-3 h-3 ${colorClasses[color]} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-gray-600 text-sm font-medium">{text}</span>
    </div>
  );
};

// Pulse loading animation
const PulseLoading = ({ text = 'Loading content...' }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse">
          <div className="w-full h-full bg-blue-600 rounded-full animate-ping opacity-75"></div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
};

// Skeleton loading for content
const SkeletonLoading = ({ lines = 3, width = 'full' }) => {
  const widthClasses = {
    full: 'w-full',
    half: 'w-1/2',
    third: 'w-1/3',
    quarter: 'w-1/4'
  };

  return (
    <div className="animate-pulse">
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 bg-gray-200 rounded ${widthClasses[width]} ${
              index === lines - 1 ? 'w-3/4' : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Export all loading components
Loading.Dot = DotLoading;
Loading.Pulse = PulseLoading;
Loading.Skeleton = SkeletonLoading;

export default Loading;