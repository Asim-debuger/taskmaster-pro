// import { App } from "./App.js";

// const root = document.getElementById("root");
// App(root);






// import { App } from "./App.js";

// const root = document.getElementById("root");
// App(root);








// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // Register service worker for PWA functionality
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('SW registered: ', registration);
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }










// import { App } from "./App.js";

// const root = document.getElementById("root");
// App(root);

// // Register service worker for PWA functionality
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then(registration => {
//         console.log('SW registered: ', registration);
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }














import { App } from "./App.js";

const root = document.getElementById("root");
App(root);

// Check if there's a pending reminder from browser notification
window.addEventListener('load', () => {
  const pendingReminderId = localStorage.getItem('pendingReminder');
  if (pendingReminderId) {
    // This will be handled by the App component
    console.log('Pending reminder for task:', pendingReminderId);
  }
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Register beforeunload to handle app closing
window.addEventListener('beforeunload', () => {
  // Save any pending reminders that might have been triggered
  // while the app was open but not yet handled
  const pendingToasts = document.querySelectorAll('.toast');
  if (pendingToasts.length > 0) {
    pendingToasts.forEach(toast => {
      const taskId = toast.dataset.taskId;
      if (taskId) {
        localStorage.setItem('pendingReminder', taskId);
      }
    });
  }
});