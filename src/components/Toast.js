// export function showToast({ title, message, taskId, onOpen, onDismiss }) {
//   // Create toast container if it doesn't exist
//   let toastContainer = document.getElementById('toastContainer');
//   if (!toastContainer) {
//     toastContainer = document.createElement('div');
//     toastContainer.id = 'toastContainer';
//     toastContainer.className = 'toast-container';
//     document.body.appendChild(toastContainer);
//   }

//   // Create toast element
//   const toast = document.createElement('div');
//   toast.className = 'toast';
//   toast.dataset.taskId = taskId;
  
//   toast.innerHTML = `
//     <div class="toast-header">
//       <strong class="toast-title">${title}</strong>
//       <button class="toast-close">&times;</button>
//     </div>
//     <div class="toast-body">
//       <p>${message}</p>
//     </div>
//     <div class="toast-actions">
//       <button class="toast-action-btn open-btn">Open Task</button>
//       <button class="toast-action-btn dismiss-btn">Dismiss</button>
//     </div>
//   `;

//   // Add event listeners
//   toast.querySelector('.open-btn').addEventListener('click', () => {
//     if (onOpen) onOpen();
//     removeToast(toast);
//   });

//   toast.querySelector('.dismiss-btn').addEventListener('click', () => {
//     if (onDismiss) onDismiss();
//     removeToast(toast);
//   });

//   toast.querySelector('.toast-close').addEventListener('click', () => {
//     removeToast(toast);
//   });

//   // Auto remove after 10 seconds
//   const autoRemove = setTimeout(() => {
//     removeToast(toast);
//   }, 10000);

//   // Add to container
//   toastContainer.appendChild(toast);

//   // Animate in
//   setTimeout(() => {
//     toast.classList.add('show');
//   }, 10);

//   function removeToast(toastElement) {
//     clearTimeout(autoRemove);
//     toastElement.classList.remove('show');
//     setTimeout(() => {
//       if (toastElement.parentNode) {
//         toastElement.parentNode.removeChild(toastElement);
//       }
//     }, 300);
//   }
// }

















export function showToast({ title, message, taskId, onOpen, onDismiss }) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.dataset.taskId = taskId;
  
  // Add countdown timer
  let timeLeft = 120; // 2 minutes in seconds
  const updateTimer = () => {
    toast.querySelector('.toast-timer').textContent = `Closing in ${timeLeft}s`;
    timeLeft--;
    
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      removeToast(toast);
    }
  };
  
  toast.innerHTML = `
    <div class="toast-header">
      <strong class="toast-title">${title}</strong>
      <span class="toast-timer">Closing in ${timeLeft}s</span>
      <button class="toast-close">&times;</button>
    </div>
    <div class="toast-body">
      <p>${message}</p>
    </div>
    <div class="toast-actions">
      <button class="toast-action-btn open-btn">Open Task</button>
      <button class="toast-action-btn dismiss-btn">Dismiss</button>
    </div>
  `;

  // Start timer
  const timerInterval = setInterval(updateTimer, 1000);

  // Add event listeners
  toast.querySelector('.open-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    if (onOpen) onOpen();
    removeToast(toast);
  });

  toast.querySelector('.dismiss-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    if (onDismiss) onDismiss();
    removeToast(toast);
  });

  toast.querySelector('.toast-close').addEventListener('click', () => {
    clearInterval(timerInterval);
    removeToast(toast);
  });

  // Auto remove after 2 minutes (120 seconds)
  const autoRemove = setTimeout(() => {
    clearInterval(timerInterval);
    removeToast(toast);
  }, 120000);

  // Add to container
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  function removeToast(toastElement) {
    clearTimeout(autoRemove);
    clearInterval(timerInterval);
    toastElement.classList.remove('show');
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
    }, 300);
  }
}