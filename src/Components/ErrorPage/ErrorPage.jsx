import React from 'react';
import { useRouteError, Link, useNavigate } from 'react-router';
import { FaExclamationTriangle, FaHome, FaRedo, FaBug } from 'react-icons/fa';

const ErrorPage = ({ 
  error = null, 
  errorInfo = null, 
  onReset = null, 
  onGoHome = null,
  type = "boundary" 
}) => {
  const routeError = useRouteError();
  const navigate = useNavigate();
  
  // Determine error type and message
  let errorTitle = "Something went wrong!";
  let errorMessage = "An unexpected error has occurred.";
  let statusCode = null;

  if (type === "route" && routeError) {
    if (isRouteErrorResponse(routeError)) {
      statusCode = routeError.status;
      errorTitle = `${routeError.status} Error`;
      errorMessage = routeError.statusText || "Page not found";
    } else if (routeError instanceof Error) {
      errorMessage = routeError.message;
    }
  } else if (error) {
    errorMessage = error.message;
    
    // Handle specific error types
    if (error.message.includes('413')) {
      errorTitle = "Payload Too Large";
      errorMessage = "The data you're trying to send is too large. Please try again with smaller data.";
    } else if (error.message.includes('404')) {
      errorTitle = "Not Found";
      errorMessage = "The requested resource was not found.";
    } else if (error.message.includes('500')) {
      errorTitle = "Server Error";
      errorMessage = "There was a problem with the server. Please try again later.";
    } else if (error.message.includes('network') || error.message.includes('Network')) {
      errorTitle = "Network Error";
      errorMessage = "Unable to connect to the server. Please check your internet connection.";
    }
  }

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {errorTitle}
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {errorMessage}
        </p>

        {/* Status Code */}
        {statusCode && (
          <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <code className="text-sm text-gray-700">
              Error Code: {statusCode}
            </code>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaRedo className="text-sm" />
            Try Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaHome className="text-sm" />
            Go Home
          </button>
        </div>

        {/* Development Error Details */}
        {process.env.NODE_ENV === 'development' && errorInfo && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 justify-center">
              <FaBug className="text-xs" />
              Development Error Details
            </summary>
            <div className="mt-2 p-3 bg-red-50 rounded-lg overflow-auto max-h-40">
              <pre className="text-xs text-red-700 whitespace-pre-wrap">
                {error && error.toString()}
                {'\n'}
                {errorInfo.componentStack}
              </pre>
            </div>
          </details>
        )}

        {/* Support Contact */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;