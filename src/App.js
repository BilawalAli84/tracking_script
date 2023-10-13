// import React, { useLayoutEffect, useState } from 'react';

// function generateSessionId(length) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// function App() {
//   console.log("hi");
//   const [userLocation, setUserLocation] = useState(null); // Store user's location here

//   useLayoutEffect(() => {
//     // Get the current URL
//     const url = window.location.href;

//     // Get referring URL (if available)
//     const referrer = document.referrer;

//     // Get URL parameters
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     const params = Object.fromEntries(urlSearchParams.entries());

//     // Generate a random session ID and store it in local storage
//     const newSessionId = generateSessionId(20);
//     localStorage.setItem('session_id', newSessionId);

//     // Get cookies data
//     const cookies = document.cookie;

//     // Get local storage data
//     const lsData = {};
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       const value = localStorage.getItem(key);
//       lsData[key] = value;
//     }

//     // Get user's location using Geolocation API (only if userLocation is initially null)
//     if (userLocation === null && 'geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setUserLocation(location); // Store the location in the state
//         },
//         (error) => {
//           console.error('Error getting user location: ' + error.message);
//         }
//       );
//     } else if (userLocation === null) {
//       console.error('Geolocation is not supported by this browser.');
//     }

//     // Log all collected data at the end
//     console.log("Current URL: " + url);
//     console.log("Referring URL: " + referrer);
//     console.log("URL Parameters: ", params);
//     console.log("Session Data (Session ID): ", newSessionId);
//     console.log("Cookies Data: ", cookies);
//     console.log("Local Storage Data: ", lsData);
//     if (userLocation) {
//       console.log("User Location: Latitude: " + userLocation.latitude + ", Longitude: " + userLocation.longitude);
//     }
//     return;
//   }, []); // Remove userLocation from the dependency array

//   // You can leave the return empty or remove it completely
//   return null;
// }

// export default App;
// import React, { useEffect } from "react";

// function generateSessionId(length) {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// function logInputValues() {
//   const inputElements = document.querySelectorAll("input");
//   inputElements.forEach(function (inputElement) {
//     console.log(
//       `Input Value on Page Load - ${inputElement.name}: ${inputElement.value}`
//     );
//   });
// }

// function sendDataToApi(
//   sessionId,
//   currentUrl,
//   referringUrl,
//   urlParameters,
//   inputValues
// ) {
//   const apiUrl = "https://tracking-backend-sooty.vercel.app/track_down";
//   const dataToSend = {
//     session_id: sessionId,
//     current_url: currentUrl,
//     reference_url: referringUrl,
//     url_parameters: urlParameters,
//     input_values: inputValues,
//   };

//   fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(dataToSend),
//   })
//     .then(function (response) {
//       if (response.ok) {
//         console.log("Data sent to the API successfully.");
//       } else {
//         console.error("Error sending data to the API:", response.statusText);
//       }
//     })
//     .catch(function (error) {
//       console.error("Error sending data to the API:", error);
//     });
// }

// function getInputValues() {
//   const inputElements = document.querySelectorAll("input");
//   const inputValues = {};

//   inputElements.forEach(function (inputElement) {
//     inputValues[inputElement.name] = inputElement.value;
//   });

//   return inputValues;
// }

// const App = () => {
//   useEffect(() => {
//     const sessionId = generateSessionId(20);
//     const currentUrl = window.location.href;
//     const referringUrl = document.referrer;
//     const urlParameters = {};
//     const urlSearchParams = new URLSearchParams(window.location.search);

//     urlSearchParams.forEach(function (value, key) {
//       urlParameters[key] = value;
//     });

//     const inputValues = getInputValues();

//     logInputValues();
//     sendDataToApi(
//       sessionId,
//       currentUrl,
//       referringUrl,
//       urlParameters,
//       inputValues
//     );

//     document.addEventListener("click", logInputValues);

//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         function (position) {
//           const userLocation = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           console.log("User Location: ", userLocation);
//         },
//         function (error) {
//           console.error("Error getting user location: " + error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }

//     return () => {
//       document.removeEventListener("click", logInputValues);
//     };
//   }, []);

//   return <div>{/* Your React component content */}</div>;
// };

// export default App;
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
      {/* Your React component content */}
    </div>
  );
}

export default App;