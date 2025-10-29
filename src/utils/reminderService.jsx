// Utility functions for handling reminders
export const scheduleReminderNotification = (task) => {
  if (!task.reminderDate || task.completed) return;
  
  const reminderTime = new Date(task.reminderDate).getTime();
  const now = Date.now();
  
  if (reminderTime > now) {
    const timeout = reminderTime - now;
    
    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('TaskMaster Pro Reminder', {
          body: `Reminder: ${task.title}`,
          icon: '/assets/icon-192x192.png'
        });
      }
      
      // Also show in-app notification
      if (window.showAppNotification) {
        window.showAppNotification(`Reminder: ${task.title}`, 'warning');
      }
    }, timeout);
  }
};

export const requestNotificationPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission();
  }
};

export const checkAndNotifyReminders = (tasks) => {
  const now = new Date();
  
  tasks.forEach(task => {
    if (task.reminderDate && !task.completed && !task.reminderNotified) {
      const reminderTime = new Date(task.reminderDate);
      
      if (reminderTime <= now) {
        // Show notification
        if (window.showAppNotification) {
          window.showAppNotification(`Reminder: ${task.title}`, 'warning');
        }
        
        // Return updated task with notification flag
        return { ...task, reminderNotified: true };
      }
    }
    return task;
  });
};

export const formatReminderTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date - now;
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);
  
  if (diffMins < 0) {
    return 'Past due';
  } else if (diffMins < 60) {
    return `in ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  } else {
    return `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }
};