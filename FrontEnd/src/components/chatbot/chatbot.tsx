// // src/components/ChatBot.tsx
// import React, { useEffect, useRef, useState } from 'react';

// const CHAT_DIV_ID = 'company-npf-chatbot';

// const ChatBot: React.FC = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const scriptLoaded = useRef(false);

//   useEffect(() => {
//     if (isChatOpen && !scriptLoaded.current) {
//       // Create the chatbot div if it doesn't exist
//       if (!document.getElementById(CHAT_DIV_ID)) {
//         const chatDiv = document.createElement('div');
//         chatDiv.className = 'npf_chatbots';
//         chatDiv.id = CHAT_DIV_ID;
//         chatDiv.setAttribute('data-w', '06db5a84b38148f2a2d3ab09cb15529d');
//         chatDiv.style.display = 'none'; // company requirement
//         document.body.appendChild(chatDiv);
//       }
//       // Inject the chatbot script
//       const script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.async = true;
//       script.src =
//         'https://chatbot.in5.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/513161f38605af463/06db5a84b38148f2a2d3ab09cb15529d';
//       document.body.appendChild(script);
//       scriptLoaded.current = true; // Prevent multiple injections
//     }
//     // If you want to remove the chatbot completely on close, uncomment below:
//     /*
//     return () => {
//       if (!isChatOpen) {
//         const chatDiv = document.getElementById(CHAT_DIV_ID);
//         if (chatDiv) chatDiv.remove();
//         scriptLoaded.current = false;
//       }
//     };
//     */
//   }, [isChatOpen]);

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <button
//         className="bg-[#ffaf00] text-[#142143] px-4 py-2 rounded-full shadow-lg font-bold"
//         onClick={() => setIsChatOpen(!isChatOpen)}
//       >
//         {isChatOpen ? 'Hide ChatBot' : 'Chat with us'}
//       </button>
//       {/* The actual chatbot UI will be injected and managed by the company's script */}
//     </div>
//   );
// };

// export default ChatBot;

// src/components/ChatBot.tsx
import { useEffect } from 'react';

const CHAT_DIV_ID = 'company-npf-chatbot';

const ChatBot = () => {
  useEffect(() => {
    // Inject the chatbot div only if not already present
    if (!document.getElementById(CHAT_DIV_ID)) {
      const chatDiv = document.createElement('div');
      chatDiv.className = 'npf_chatbots';
      chatDiv.id = CHAT_DIV_ID;
      chatDiv.setAttribute('data-w', '06db5a84b38148f2a2d3ab09cb15529d');
      chatDiv.style.display = 'none'; // Per their docs
      document.body.appendChild(chatDiv);
    }
    // Inject the script only if not already present
    if (!document.querySelector(`script[src*="niaachtbtscpt.js"]`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://chatbot.in5.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/513161f38605af463/06db5a84b38148f2a2d3ab09cb15529d';
      document.body.appendChild(script);
    }
  }, []);

  // No visible UI; the Nia bot widget will appear automatically per their design
  return null;
};

export default ChatBot;

