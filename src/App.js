import React, { useEffect, useRef } from 'react';

function generateSessionId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function logInputValues() {
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach(function (inputElement) {
    console.log(`Input Value on Page Load - ${inputElement.name}: ${inputElement.value}`);
  });
}

function sendDataToApi(sessionId, currentUrl, referringUrl, urlParameters, inputValues) {
  const apiUrl = "https://tracking-backend-sooty.vercel.app/track_down";
  const dataToSend = {
    session_id: sessionId,
    current_url: currentUrl,
    reference_url: referringUrl,
    url_parameters: urlParameters,
    input_values: inputValues,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Data sent to the API successfully.");
      } else {
        console.error("Error sending data to the API:", response.statusText);
      }
    })
    .catch(function (error) {
      console.error("Error sending data to the API:", error);
    });
}

function getInputValues() {
  const inputElements = document.querySelectorAll('input');
  const inputValues = {};

  inputElements.forEach(function (inputElement) {
    inputValues[inputElement.name] = inputElement.value;
  });

  return inputValues;
}

const App = () => {
  const hasSentData = useRef(false);

  useEffect(() => {
    if (!hasSentData.current) {
      const sessionId = generateSessionId(20);
      const currentUrl = window.location.href;
      const referringUrl = document.referrer;
      const urlParameters = {};
      const urlSearchParams = new URLSearchParams(window.location.search);

      urlSearchParams.forEach(function (value, key) {
        urlParameters[key] = value;
      });

      const inputValues = getInputValues();

      logInputValues();
      sendDataToApi(sessionId, currentUrl, referringUrl, urlParameters, inputValues);

      hasSentData.current = true;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log("User Location: ", userLocation);
      }, function (error) {
        console.error("Error getting user location: " + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const clickHandler = () => {
      logInputValues();
    };

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;