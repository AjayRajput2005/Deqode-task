import React from 'react';
import { FiExternalLink, FiLink } from 'react-icons/fi';

const SourceCard = ({ source, index }) => {
  const getHostname = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Source';
    }
  };

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Source Number Badge */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-md">
              {index}
            </span>
            <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
              {source.title}
            </h4>
          </div>
          
          {/* Snippet */}
          {source.snippet && (
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 ml-10 mb-2">
              {source.snippet}
            </p>
          )}

          {/* URL */}
          <div className="flex items-center space-x-2 ml-10">
            <FiLink className="text-gray-400 flex-shrink-0" size={12} />
            <span className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors truncate">
              {getHostname(source.url)}
            </span>
          </div>
        </div>

        {/* External Link Icon */}
        <div className="ml-3 flex-shrink-0">
          <div className="p-2 bg-blue-50 group-hover:bg-blue-100 rounded-lg transition-colors">
            <FiExternalLink className="text-blue-500 group-hover:text-blue-600 transition-colors" size={16} />
          </div>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </a>
  );
};

export default SourceCard;