// KommunicateChat.js
import React, { useEffect } from 'react';

function KommunicateChat() {
  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = {
        "appId": "3b2c266c3293f0aa4c33d943f8f2a4d23",
        "popupWidget": true,
        "automaticChatOpenOnNavigation": true
      };
      var s = document.createElement("script"); 
      s.type = "text/javascript"; 
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; 
      h.appendChild(s);
      window.kommunicate = m; 
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return null; // This component doesn't render anything visible
}

export default KommunicateChat;