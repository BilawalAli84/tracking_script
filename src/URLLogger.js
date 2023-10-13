import React, { useEffect } from 'react';

function URLLogger() {
  useEffect(() => {
    const url = window.location.href;
    const urlParameters = window.location.search;
    console.log('Current URL:', url);
    console.log('URL Parameters:', urlParameters);
  }, []);

  return null; // This component doesn't render anything in the DOM
}

export default URLLogger;