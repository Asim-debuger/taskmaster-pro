// import { loadTasks, saveTasks, loadTheme, saveTheme } from "./utils/storage.js";
// import { TaskForm } from "./components/TaskForm.js";
// import { TaskList } from "./components/TaskList.js";
// import { TaskFilters } from "./components/TaskFilters.js";

// export function App(root){
//   let tasks = loadTasks();
//   let filters = { search:"", priority:"", category:"" };
//   let editingTask = null;
//   let theme = loadTheme();
//   document.body.classList.toggle("dark", theme==="dark");

//   // ask for notification permission once
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission().catch(()=>{});
//   }

//   // periodic reminder checker
//   function checkReminders(){
//     const now = new Date();
//     tasks.forEach(t => {
//       if(t.completed) return;
//       if(t.date && t.time){
//         const dt = new Date(`${t.date}T${t.time}`);
//         const diff = dt - now;
//         // notify if within next 60s and not earlier than 0
//         if(diff <= 60000 && diff > 0 && !t._notified){
//           if (Notification.permission === "granted") {
//             new Notification("Task reminder", { body: t.title });
//           } else {
//             // fallback small browser alert (non blocking)
//             console.log("Reminder:", t.title);
//           }
//           t._notified = true; // avoid repeat
//         }
//       }
//     });
//   }
//   setInterval(checkReminders, 30000);

//   // recurring handling: when a recurring task is completed we create next occurrence
//   function handleRecurringOnComplete(task){
//     if(!task.repeat || !task.date) return;
//     const base = new Date(task.date);
//     let next = new Date(base);
//     if(task.repeat === "daily") next.setDate(base.getDate() + 1);
//     if(task.repeat === "weekly") next.setDate(base.getDate() + 7);
//     if(task.repeat === "monthly") next.setMonth(base.getMonth() + 1);
//     const nextTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random()*1000),
//       date: next.toISOString().split("T")[0],
//       completed: false,
//       createdAt: new Date().toISOString()
//     };
//     // don't copy _notified flag
//     delete nextTask._notified;
//     tasks.push(nextTask);
//   }

//   // render function
//   function render(){
//     root.innerHTML = `
//       <header>TaskMaster Pro</header>
//       <div class="container">
//         <div id="formArea"></div>
//         <div id="filterArea"></div>
//         <div id="listArea"></div>
//         <div id="footerArea"></div>
//       </div>
//     `;
//     const formArea = root.querySelector("#formArea");
//     const filterArea = root.querySelector("#filterArea");
//     const listArea = root.querySelector("#listArea");
//     const footer = root.querySelector("#footerArea");

//     // Show either Add form or Edit form
//     const formComp = editingTask
//       ? TaskForm({ taskToEdit: editingTask, onSave: handleSaveEdit, onCancel: ()=>{ editingTask=null; render(); } })
//       : TaskForm({ onSave: handleAdd });

//     formArea.appendChild(formComp);

//     // Filters
//     filterArea.appendChild(TaskFilters({
//       state: filters,
//       onFilterChange: (f)=> { filters = f; render(); },
//       onThemeToggle: toggleTheme,
//       onExport: exportTasks,
//       onImportAll: importTasks
//     }));

//     // apply filters
//     let visible = tasks.slice().filter(t => {
//       if(filters.priority && t.priority !== filters.priority) return false;
//       if(filters.category && (!t.category || t.category.toLowerCase() !== filters.category)) return false;
//       if(filters.search && !t.title.toLowerCase().includes(filters.search) && !(t.notes||"").toLowerCase().includes(filters.search)) return false;
//       return true;
//     });

//     // sort by date -> priority -> createdAt
//     visible.sort((a,b) => {
//       if(a.date && b.date) {
//         if(a.date !== b.date) return new Date(a.date) - new Date(b.date);
//       } else if(a.date) return -1;
//       else if(b.date) return 1;
//       const pr = { high:0, medium:1, low:2 };
//       if(pr[a.priority] !== pr[b.priority]) return pr[a.priority] - pr[b.priority];
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     });

//     listArea.appendChild(TaskList(visible, {
//       onToggle: toggleComplete,
//       onDelete: deleteTask,
//       onEdit: startEdit
//     }));

//     footer.innerHTML = `<div class="small">Tasks: ${tasks.length} · Visible: ${visible.length}</div>`;
//   }

//   // handlers
//   function handleAdd(task){
//     tasks.push(task);
//     saveTasks(tasks);
//     render();
//   }

//   function startEdit(task){
//     editingTask = task;
//     render();
//   }

//   function handleSaveEdit(updated){
//     tasks = tasks.map(t => t.id === updated.id ? updated : t);
//     saveTasks(tasks);
//     editingTask = null;
//     render();
//   }

//   function toggleComplete(id){
//     tasks = tasks.map(t => {
//       if(t.id === id){
//         const updated = {...t, completed: !t.completed};
//         // if now completed and was recurring -> create next occurrence
//         if(!t.completed && updated.completed){
//           handleRecurringOnComplete(t);
//         }
//         // reset notification flag when toggling to incomplete
//         if(!updated.completed) delete updated._notified;
//         return updated;
//       }
//       return t;
//     });
//     saveTasks(tasks);
//     render();
//   }

//   function deleteTask(id){
//     if(!confirm("Delete this task?")) return;
//     tasks = tasks.filter(t => t.id !== id);
//     saveTasks(tasks);
//     render();
//   }

//   function toggleTheme(){
//     theme = theme === "light" ? "dark" : "light";
//     saveTheme(theme);
//     document.body.classList.toggle("dark", theme === "dark");
//   }

//   function exportTasks(){
//     const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "taskmaster-tasks.json";
//     a.click();
//   }

//   function importTasks(parsed){
//     if(!Array.isArray(parsed)) { alert("Import expects an array of tasks"); return; }
//     if(!confirm(`Import ${parsed.length} tasks and replace current tasks?`)) return;
//     tasks = parsed;
//     saveTasks(tasks);
//     render();
//   }

//   // initial render
//   render();
// }





















// import { loadTasks, saveTasks, loadTheme, saveTheme } from "./utils/storage.js";
// import { TaskForm } from "./components/TaskForm.js";
// import { TaskList } from "./components/TaskList.js";
// import { TaskFilters } from "./components/TaskFilters.js";
// import { StatsPanel } from "./components/StatsPanel.js";

// export function App(root) {
//   let tasks = loadTasks();
//   let filters = { search: "", priority: "", category: "", status: "all" };
//   let editingTask = null;
//   let theme = loadTheme();
//   document.body.classList.toggle("dark", theme === "dark");

//   // Ask for notification permission once
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission().catch(() => {});
//   }

//   // Periodic reminder checker
//   function checkReminders() {
//     const now = new Date();
//     tasks.forEach(t => {
//       if (t.completed) return;
//       if (t.date && t.time) {
//         const dt = new Date(`${t.date}T${t.time}`);
//         const diff = dt - now;
//         // Notify if within next 60s and not earlier than 0
//         if (diff <= 60000 && diff > 0 && !t._notified) {
//           if (Notification.permission === "granted") {
//             new Notification("Task Reminder", { 
//               body: `"${t.title}" is due soon!`,
//               icon: '/favicon.ico'
//             });
//           } else {
//             // Fallback browser alert
//             console.log("Reminder:", t.title);
//           }
//           t._notified = true; // Avoid repeat
//         }
//       }
//     });
//   }
//   setInterval(checkReminders, 30000);

//   // Recurring handling: when a recurring task is completed we create next occurrence
//   function handleRecurringOnComplete(task) {
//     if (!task.repeat || !task.date) return;
//     const base = new Date(task.date);
//     let next = new Date(base);
//     if (task.repeat === "daily") next.setDate(base.getDate() + 1);
//     if (task.repeat === "weekly") next.setDate(base.getDate() + 7);
//     if (task.repeat === "monthly") next.setMonth(base.getMonth() + 1);
//     const nextTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       date: next.toISOString().split("T")[0],
//       completed: false,
//       createdAt: new Date().toISOString()
//     };
//     // Don't copy _notified flag
//     delete nextTask._notified;
//     tasks.push(nextTask);
//   }

//   // Render function
//   function render() {
//     root.innerHTML = `
//       <header>
//         <i class="fas fa-tasks"></i>
//         TaskMaster Pro
//       </header>
//       <div class="container">
//         <div id="statsArea"></div>
//         <div id="formArea"></div>
//         <div id="filterArea"></div>
//         <div id="listArea"></div>
//         <div id="footerArea"></div>
//       </div>
//     `;
    
//     const statsArea = root.querySelector("#statsArea");
//     const formArea = root.querySelector("#formArea");
//     const filterArea = root.querySelector("#filterArea");
//     const listArea = root.querySelector("#listArea");
//     const footer = root.querySelector("#footerArea");

//     // Show stats panel
//     statsArea.appendChild(StatsPanel(tasks));

//     // Show either Add form or Edit form
//     const formComp = editingTask
//       ? TaskForm({ 
//           taskToEdit: editingTask, 
//           onSave: handleSaveEdit, 
//           onCancel: () => { editingTask = null; render(); } 
//         })
//       : TaskForm({ onSave: handleAdd });

//     formArea.appendChild(formComp);

//     // Filters
//     filterArea.appendChild(TaskFilters({
//       state: filters,
//       onFilterChange: (f) => { filters = f; render(); },
//       onThemeToggle: toggleTheme,
//       onExport: exportTasks,
//       onImportAll: importTasks,
//       onClearCompleted: clearCompletedTasks
//     }));

//     // Apply filters
//     let visible = tasks.slice().filter(t => {
//       if (filters.priority && t.priority !== filters.priority) return false;
//       if (filters.category && (!t.category || t.category.toLowerCase() !== filters.category.toLowerCase())) return false;
//       if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase()) && 
//           !(t.notes || "").toLowerCase().includes(filters.search.toLowerCase())) return false;
//       if (filters.status === "active" && t.completed) return false;
//       if (filters.status === "completed" && !t.completed) return false;
//       return true;
//     });

//     // Sort by date -> priority -> createdAt
//     visible.sort((a, b) => {
//       if (a.date && b.date) {
//         if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
//       } else if (a.date) return -1;
//       else if (b.date) return 1;
      
//       const pr = { high: 0, medium: 1, low: 2 };
//       if (pr[a.priority] !== pr[b.priority]) return pr[a.priority] - pr[b.priority];
      
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     });

//     listArea.appendChild(TaskList(visible, {
//       onToggle: toggleComplete,
//       onDelete: deleteTask,
//       onEdit: editTask
//     }));

//     // Footer
//     footer.innerHTML = `
//       <footer class="small">
//         <p>${tasks.length} total tasks • ${tasks.filter(t => t.completed).length} completed</p>
//       </footer>
//     `;
//   }

//   // Event handlers
//   function handleAdd(task) {
//     const newTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       createdAt: new Date().toISOString(),
//       completed: false
//     };
//     tasks.push(newTask);
//     saveTasks(tasks);
//     render();
//   }

//   function handleSaveEdit(updated) {
//     const idx = tasks.findIndex(t => t.id === editingTask.id);
//     if (idx !== -1) {
//       tasks[idx] = { ...tasks[idx], ...updated };
//       saveTasks(tasks);
//     }
//     editingTask = null;
//     render();
//   }

//   function toggleComplete(id) {
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//       task.completed = !task.completed;
//       if (task.completed) {
//         handleRecurringOnComplete(task);
//       }
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function deleteTask(id) {
//     if (confirm("Are you sure you want to delete this task?")) {
//       tasks = tasks.filter(t => t.id !== id);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function editTask(id) {
//     editingTask = { ...tasks.find(t => t.id === id) };
//     render();
//   }

//   function toggleTheme() {
//     theme = theme === "light" ? "dark" : "light";
//     document.body.classList.toggle("dark", theme === "dark");
//     saveTheme(theme);
//   }

//   function exportTasks() {
//     const data = JSON.stringify(tasks, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `taskmaster-export-${new Date().toISOString().slice(0,10)}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }

//   function importTasks(file) {
//     const reader = new FileReader();
//     reader.onload = e => {
//       try {
//         const imported = JSON.parse(e.target.result);
//         if (Array.isArray(imported)) {
//           // Merge with existing, avoid duplicates by ID
//           const existingIds = tasks.map(t => t.id);
//           const newTasks = imported.filter(t => !existingIds.includes(t.id));
//           tasks = [...tasks, ...newTasks];
//           saveTasks(tasks);
//           render();
//           alert(`Imported ${newTasks.length} tasks successfully.`);
//         } else {
//           alert("Invalid file format: expected an array of tasks.");
//         }
//       } catch (err) {
//         alert("Failed to parse file: " + err.message);
//       }
//     };
//     reader.readAsText(file);
//   }

//   function clearCompletedTasks() {
//     if (confirm("Are you sure you want to delete all completed tasks?")) {
//       tasks = tasks.filter(t => !t.completed);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   // Initial render
//   render();
// }


















// import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import StatsPanel from './components/StatsPanel';
// import NotificationToast from './components/NotificationToast';

// function App() {
//   const [activeTab, setActiveTab] = useState('tasks');
//   const [tasks, setTasks] = useState([]);
//   const [deletedTasks, setDeletedTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     const savedDeletedTasks = localStorage.getItem('deletedTasks');
//     const savedDarkMode = localStorage.getItem('darkMode');
    
//     if (savedTasks) setTasks(JSON.parse(savedTasks));
//     if (savedDeletedTasks) setDeletedTasks(JSON.parse(savedDeletedTasks));
//     if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    
//     // Set dark mode class on body
//     if (JSON.parse(savedDarkMode)) {
//       document.body.classList.add('dark');
//     }
    
//     // Set up global notification function
//     window.showAppNotification = (message, type = 'info') => {
//       const id = Date.now().toString();
//       setNotifications(prev => [...prev, { id, message, type }]);
      
//       // Auto remove notification after 5 seconds
//       setTimeout(() => {
//         setNotifications(prev => prev.filter(n => n.id !== id));
//       }, 5000);
//     };
//   }, []);

//   // Save data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
//     localStorage.setItem('darkMode', JSON.stringify(darkMode));
//   }, [tasks, deletedTasks, darkMode]);

//   // Check for reminders
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       tasks.forEach(task => {
//         if (task.reminderDate && !task.completed && !task.reminderNotified) {
//           const reminderTime = new Date(task.reminderDate);
//           if (reminderTime <= now) {
//             // Show notification
//             window.showAppNotification(`Reminder: ${task.title}`, 'warning');
            
//             // Mark as notified to prevent repeated notifications
//             setTasks(prev => prev.map(t => 
//               t.id === task.id ? { ...t, reminderNotified: true } : t
//             ));
//           }
//         }
//       });
//     }, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, [tasks]);

//   const addTask = (task) => {
//     setTasks([task, ...tasks]);
//     setActiveTab('tasks');
//   };

//   const updateTask = (updatedTask) => {
//     setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
//     setEditingTask(null);
//   };

//   const toggleTaskCompletion = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId 
//         ? { 
//             ...task, 
//             completed: !task.completed,
//             completedAt: !task.completed ? new Date().toISOString() : undefined
//           } 
//         : task
//     ));
//   };

//   const editTask = (task) => {
//     setEditingTask(task);
//     setActiveTab('add');
//   };

//   const cancelEdit = () => {
//     setEditingTask(null);
//   };

//   const deleteTask = (taskId, permanent = false) => {
//     if (permanent) {
//       // Permanent deletion from bin
//       setDeletedTasks(deletedTasks.filter(task => task.id !== taskId));
//     } else {
//       // Move task to bin
//       const taskToDelete = tasks.find(task => task.id === taskId);
//       if (taskToDelete) {
//         setDeletedTasks([...deletedTasks, { ...taskToDelete, deletedAt: new Date().toISOString() }]);
//         setTasks(tasks.filter(task => task.id !== taskId));
//       }
//     }
//   };

//   const restoreTask = (taskId) => {
//     const taskToRestore = deletedTasks.find(task => task.id === taskId);
//     if (taskToRestore) {
//       const { deletedAt, ...restoredTask } = taskToRestore;
//       setTasks([restoredTask, ...tasks]);
//       setDeletedTasks(deletedTasks.filter(task => task.id !== taskId));
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.body.classList.toggle('dark');
//   };

//   const removeNotification = (id) => {
//     setNotifications(notifications.filter(n => n.id !== id));
//   };

//   return (
//     <div className="App">
//       <Header 
//         activeTab={activeTab} 
//         setActiveTab={setActiveTab} 
//         darkMode={darkMode}
//         toggleDarkMode={toggleDarkMode}
//       />
      
//       <div className="container">
//         {activeTab === 'add' && (
//           <TaskForm 
//             addTask={addTask} 
//             editingTask={editingTask}
//             updateTask={updateTask}
//             cancelEdit={cancelEdit}
//           />
//         )}
        
//         {activeTab === 'tasks' && (
//           <TaskList 
//             tasks={tasks} 
//             toggleTaskCompletion={toggleTaskCompletion}
//             editTask={editTask}
//             deleteTask={deleteTask}
//           />
//         )}
        
//         {activeTab === 'bin' && (
//           <TaskList 
//             tasks={deletedTasks}
//             deleteTask={deleteTask}
//             restoreTask={restoreTask}
//             showBin={true}
//           />
//         )}
        
//         {activeTab === 'stats' && (
//           <StatsPanel tasks={tasks} deletedTasks={deletedTasks} />
//         )}
//       </div>
      
//       <NotificationToast 
//         notifications={notifications}
//         removeNotification={removeNotification}
//       />
//     </div>
//   );
// }

// export default App;




















// import { loadTasks, saveTasks, loadTheme, saveTheme } from "./utils/storage.js";
// import { TaskForm } from "./components/TaskForm.js";
// import { TaskList } from "./components/TaskList.js";
// import { TaskFilters } from "./components/TaskFilters.js";
// import { StatsPanel } from "./components/StatsPanel.js";

// export function App(root) {
//   let tasks = loadTasks();
//   let filters = { search: "", priority: "", category: "", status: "all" };
//   let editingTask = null;
//   let theme = loadTheme();
//   document.body.classList.toggle("dark", theme === "dark");

//   // Ask for notification permission once
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission().catch(() => {});
//   }

//   // Periodic reminder checker
//   function checkReminders() {
//     const now = new Date();
//     tasks.forEach(t => {
//       if (t.completed) return;
//       if (t.date && t.time) {
//         const dt = new Date(`${t.date}T${t.time}`);
//         const diff = dt - now;
//         // Notify if within next 60s and not earlier than 0
//         if (diff <= 60000 && diff > 0 && !t._notified) {
//           if (Notification.permission === "granted") {
//             new Notification("Task Reminder", { 
//               body: `"${t.title}" is due soon!`,
//               icon: '/favicon.ico'
//             });
//           } else {
//             // Fallback browser alert
//             console.log("Reminder:", t.title);
//           }
//           t._notified = true; // Avoid repeat
//         }
//       }
//     });
//   }
//   setInterval(checkReminders, 30000);

//   // Recurring handling: when a recurring task is completed we create next occurrence
//   function handleRecurringOnComplete(task) {
//     if (!task.repeat || !task.date) return;
//     const base = new Date(task.date);
//     let next = new Date(base);
//     if (task.repeat === "daily") next.setDate(base.getDate() + 1);
//     if (task.repeat === "weekly") next.setDate(base.getDate() + 7);
//     if (task.repeat === "monthly") next.setMonth(base.getMonth() + 1);
//     const nextTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       date: next.toISOString().split("T")[0],
//       completed: false,
//       createdAt: new Date().toISOString()
//     };
//     // Don't copy _notified flag
//     delete nextTask._notified;
//     tasks.push(nextTask);
//   }

//   // Render function
//   function render() {
//     root.innerHTML = `
//       <header>
//         <i class="fas fa-tasks"></i>
//         TaskMaster Pro
//       </header>
//       <div class="container">
//         <div id="statsArea"></div>
//         <div id="formArea"></div>
//         <div id="filterArea"></div>
//         <div id="listArea"></div>
//         <div id="footerArea"></div>
//       </div>
//     `;
    
//     const statsArea = root.querySelector("#statsArea");
//     const formArea = root.querySelector("#formArea");
//     const filterArea = root.querySelector("#filterArea");
//     const listArea = root.querySelector("#listArea");
//     const footer = root.querySelector("#footerArea");

//     // Show stats panel
//     statsArea.appendChild(StatsPanel(tasks));

//     // Show either Add form or Edit form
//     const formComp = editingTask
//       ? TaskForm({ 
//           taskToEdit: editingTask, 
//           onSave: handleSaveEdit, 
//           onCancel: () => { editingTask = null; render(); } 
//         })
//       : TaskForm({ onSave: handleAdd });

//     formArea.appendChild(formComp);

//     // Filters
//     filterArea.appendChild(TaskFilters({
//       state: filters,
//       onFilterChange: (f) => { filters = f; render(); },
//       onThemeToggle: toggleTheme,
//       onExport: exportTasks,
//       onImportAll: importTasks,
//       onClearCompleted: clearCompletedTasks
//     }));

//     // Apply filters
//     let visible = tasks.slice().filter(t => {
//       if (filters.priority && t.priority !== filters.priority) return false;
//       if (filters.category && (!t.category || t.category.toLowerCase() !== filters.category.toLowerCase())) return false;
//       if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase()) && 
//           !(t.notes || "").toLowerCase().includes(filters.search.toLowerCase())) return false;
//       if (filters.status === "active" && t.completed) return false;
//       if (filters.status === "completed" && !t.completed) return false;
//       return true;
//     });

//     // Sort by date -> priority -> createdAt
//     visible.sort((a, b) => {
//       if (a.date && b.date) {
//         if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
//       } else if (a.date) return -1;
//       else if (b.date) return 1;
      
//       const pr = { high: 0, medium: 1, low: 2 };
//       if (pr[a.priority] !== pr[b.priority]) return pr[a.priority] - pr[b.priority];
      
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     });

//     listArea.appendChild(TaskList(visible, {
//       onToggle: toggleComplete,
//       onDelete: deleteTask,
//       onEdit: editTask
//     }));

//     // Footer
//     footer.innerHTML = `
//       <footer class="small">
//         <p>${tasks.length} total tasks • ${tasks.filter(t => t.completed).length} completed</p>
//       </footer>
//     `;
//   }

//   // Event handlers
//   function handleAdd(task) {
//     const newTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       createdAt: new Date().toISOString(),
//       completed: false
//     };
//     tasks.push(newTask);
//     saveTasks(tasks);
//     render();
//   }

//   function handleSaveEdit(updated) {
//     const idx = tasks.findIndex(t => t.id === editingTask.id);
//     if (idx !== -1) {
//       tasks[idx] = { ...tasks[idx], ...updated };
//       saveTasks(tasks);
//     }
//     editingTask = null;
//     render();
//   }

//   function toggleComplete(id) {
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//       task.completed = !task.completed;
//       if (task.completed) {
//         handleRecurringOnComplete(task);
//       }
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function deleteTask(id) {
//     if (confirm("Are you sure you want to delete this task?")) {
//       tasks = tasks.filter(t => t.id !== id);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function editTask(id) {
//     editingTask = { ...tasks.find(t => t.id === id) };
//     render();
//   }

//   function toggleTheme() {
//     theme = theme === "light" ? "dark" : "light";
//     document.body.classList.toggle("dark", theme === "dark");
//     saveTheme(theme);
//   }

//   function exportTasks() {
//     const data = JSON.stringify(tasks, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `taskmaster-export-${new Date().toISOString().slice(0,10)}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }

//   function importTasks(file) {
//     const reader = new FileReader();
//     reader.onload = e => {
//       try {
//         const imported = JSON.parse(e.target.result);
//         if (Array.isArray(imported)) {
//           // Merge with existing, avoid duplicates by ID
//           const existingIds = tasks.map(t => t.id);
//           const newTasks = imported.filter(t => !existingIds.includes(t.id));
//           tasks = [...tasks, ...newTasks];
//           saveTasks(tasks);
//           render();
//           alert(`Imported ${newTasks.length} tasks successfully.`);
//         } else {
//           alert("Invalid file format: expected an array of tasks.");
//         }
//       } catch (err) {
//         alert("Failed to parse file: " + err.message);
//       }
//     };
//     reader.readAsText(file);
//   }

//   function clearCompletedTasks() {
//     if (confirm("Are you sure you want to delete all completed tasks?")) {
//       tasks = tasks.filter(t => !t.completed);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   // Initial render
//   render();
// }

























// import { loadTasks, saveTasks, loadTheme, saveTheme, loadBin, saveBin } from "./utils/storage.js";
// import { TaskForm } from "./components/TaskForm.js";
// import { TaskList } from "./components/TaskList.js";
// import { TaskFilters } from "./components/TaskFilters.js";
// import { StatsPanel } from "./components/StatsPanel.js";
// import { BinPanel } from "./components/BinPanel.js";

// export function App(root) {
//   let tasks = loadTasks();
//   let binTasks = loadBin();
//   let filters = { search: "", priority: "", category: "", status: "all", view: "tasks" };
//   let editingTask = null;
//   let theme = loadTheme();
//   document.body.classList.toggle("dark", theme === "dark");

//   // Ask for notification permission once
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission().catch(() => {});
//   }

//   // Periodic reminder checker
//   function checkReminders() {
//     const now = new Date();
//     tasks.forEach(t => {
//       if (t.completed) return;
//       if (t.reminderDate && t.reminderTime) {
//         const reminderDateTime = new Date(`${t.reminderDate}T${t.reminderTime}`);
//         const diff = reminderDateTime - now;
//         // Notify if within next 60s and not earlier than 0
//         if (diff <= 60000 && diff > 0 && !t._notified) {
//           if (Notification.permission === "granted") {
//             new Notification("Task Reminder", { 
//               body: `"${t.title}" has a reminder set for now!`,
//               icon: '/favicon.ico'
//             });
//           } else {
//             // Fallback browser alert
//             console.log("Reminder:", t.title);
//           }
//           t._notified = true; // Avoid repeat
//           saveTasks(tasks);
//         }
//       }
//     });
//   }
//   setInterval(checkReminders, 30000);

//   // Recurring handling: when a recurring task is completed we create next occurrence
//   function handleRecurringOnComplete(task) {
//     if (!task.repeat || !task.date) return;
//     const base = new Date(task.date);
//     let next = new Date(base);
//     if (task.repeat === "daily") next.setDate(base.getDate() + 1);
//     if (task.repeat === "weekly") next.setDate(base.getDate() + 7);
//     if (task.repeat === "monthly") next.setMonth(base.getMonth() + 1);
//     const nextTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       date: next.toISOString().split("T")[0],
//       completed: false,
//       createdAt: new Date().toISOString()
//     };
//     // Don't copy _notified flag
//     delete nextTask._notified;
//     tasks.push(nextTask);
//   }

//   // Render function
//   function render() {
//     root.innerHTML = `
//       <header>
//         <i class="fas fa-tasks"></i>
//         TaskMaster Pro
//       </header>
//       <div class="container">
//         <div id="statsArea"></div>
//         <div id="viewTabs" class="view-tabs"></div>
//         <div id="formArea"></div>
//         <div id="filterArea"></div>
//         <div id="contentArea"></div>
//         <div id="footerArea"></div>
//       </div>
//     `;
    
//     const statsArea = root.querySelector("#statsArea");
//     const viewTabs = root.querySelector("#viewTabs");
//     const formArea = root.querySelector("#formArea");
//     const filterArea = root.querySelector("#filterArea");
//     const contentArea = root.querySelector("#contentArea");
//     const footer = root.querySelector("#footerArea");

//     // View tabs
//     viewTabs.innerHTML = `
//       <button class="view-tab ${filters.view === 'tasks' ? 'active' : ''}" data-view="tasks">
//         <i class="fas fa-list"></i> Tasks
//       </button>
//       <button class="view-tab ${filters.view === 'bin' ? 'active' : ''}" data-view="bin">
//         <i class="fas fa-trash"></i> Bin (${binTasks.length})
//       </button>
//     `;

//     viewTabs.querySelectorAll(".view-tab").forEach(tab => {
//       tab.addEventListener("click", () => {
//         filters.view = tab.dataset.view;
//         render();
//       });
//     });

//     // Show stats panel only in tasks view
//     if (filters.view === "tasks") {
//       statsArea.appendChild(StatsPanel(tasks));
//     } else {
//       statsArea.innerHTML = "";
//     }

//     // Show either Add form or Edit form (only in tasks view)
//     if (filters.view === "tasks") {
//       const formComp = editingTask
//         ? TaskForm({ 
//             taskToEdit: editingTask, 
//             onSave: handleSaveEdit, 
//             onCancel: () => { editingTask = null; render(); } 
//           })
//         : TaskForm({ onSave: handleAdd });

//       formArea.appendChild(formComp);
//     } else {
//       formArea.innerHTML = "";
//     }

//     // Filters
//     filterArea.appendChild(TaskFilters({
//       state: filters,
//       onFilterChange: (f) => { filters = f; render(); },
//       onThemeToggle: toggleTheme,
//       onExport: exportTasks,
//       onImportAll: importTasks,
//       onClearCompleted: clearCompletedTasks
//     }));

//     // Show appropriate content based on view
//     if (filters.view === "tasks") {
//       // Apply filters
//       let visible = tasks.slice().filter(t => {
//         if (filters.priority && t.priority !== filters.priority) return false;
//         if (filters.category && (!t.category || t.category.toLowerCase() !== filters.category.toLowerCase())) return false;
//         if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase()) && 
//             !(t.notes || "").toLowerCase().includes(filters.search.toLowerCase())) return false;
//         if (filters.status === "active" && t.completed) return false;
//         if (filters.status === "completed" && !t.completed) return false;
//         return true;
//       });

//       // Sort by date -> priority -> createdAt
//       visible.sort((a, b) => {
//         if (a.date && b.date) {
//           if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
//         } else if (a.date) return -1;
//         else if (b.date) return 1;
        
//         const pr = { high: 0, medium: 1, low: 2 };
//         if (pr[a.priority] !== pr[b.priority]) return pr[a.priority] - pr[b.priority];
        
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       });

//       contentArea.appendChild(TaskList(visible, {
//         onToggle: toggleComplete,
//         onDelete: deleteTask,
//         onEdit: editTask
//       }));
//     } else {
//       // Show bin content
//       contentArea.appendChild(BinPanel(binTasks, {
//         onRestore: restoreTask,
//         onDeletePermanently: deletePermanently
//       }));
//     }

//     // Footer
//     footer.innerHTML = `
//       <footer class="small">
//         <p>${tasks.length} total tasks • ${tasks.filter(t => t.completed).length} completed</p>
//       </footer>
//     `;
//   }

//   // Event handlers
//   function handleAdd(task) {
//     const newTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       createdAt: new Date().toISOString(),
//       completed: false
//     };
//     tasks.push(newTask);
//     saveTasks(tasks);
//     render();
//   }

//   function handleSaveEdit(updated) {
//     const idx = tasks.findIndex(t => t.id === editingTask.id);
//     if (idx !== -1) {
//       tasks[idx] = { ...tasks[idx], ...updated };
//       saveTasks(tasks);
//     }
//     editingTask = null;
//     render();
//   }

//   function toggleComplete(id) {
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//       task.completed = !task.completed;
//       if (task.completed) {
//         handleRecurringOnComplete(task);
//       }
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function deleteTask(id) {
//     if (confirm("Are you sure you want to delete this task?")) {
//       const taskToDelete = tasks.find(t => t.id === id);
//       if (taskToDelete) {
//         // Move to bin
//         binTasks.push({
//           ...taskToDelete,
//           deletedAt: new Date().toISOString()
//         });
//         saveBin(binTasks);
        
//         // Remove from tasks
//         tasks = tasks.filter(t => t.id !== id);
//         saveTasks(tasks);
//         render();
//       }
//     }
//   }

//   function restoreTask(id) {
//     const taskToRestore = binTasks.find(t => t.id === id);
//     if (taskToRestore) {
//       // Remove from bin
//       binTasks = binTasks.filter(t => t.id !== id);
//       saveBin(binTasks);
      
//       // Add back to tasks
//       const { deletedAt, ...restoredTask } = taskToRestore;
//       tasks.push(restoredTask);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function deletePermanently(id) {
//     if (confirm("Are you sure you want to permanently delete this task? This action cannot be undone.")) {
//       binTasks = binTasks.filter(t => t.id !== id);
//       saveBin(binTasks);
//       render();
//     }
//   }

//   function editTask(id) {
//     editingTask = { ...tasks.find(t => t.id === id) };
//     render();
//   }

//   function toggleTheme() {
//     theme = theme === "light" ? "dark" : "light";
//     document.body.classList.toggle("dark", theme === "dark");
//     saveTheme(theme);
//   }

//   function exportTasks() {
//     const data = JSON.stringify(tasks, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `taskmaster-export-${new Date().toISOString().slice(0,10)}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }

//   function importTasks(file) {
//     const reader = new FileReader();
//     reader.onload = e => {
//       try {
//         const imported = JSON.parse(e.target.result);
//         if (Array.isArray(imported)) {
//           // Merge with existing, avoid duplicates by ID
//           const existingIds = tasks.map(t => t.id);
//           const newTasks = imported.filter(t => !existingIds.includes(t.id));
//           tasks = [...tasks, ...newTasks];
//           saveTasks(tasks);
//           render();
//           alert(`Imported ${newTasks.length} tasks successfully.`);
//         } else {
//           alert("Invalid file format: expected an array of tasks.");
//         }
//       } catch (err) {
//         alert("Failed to parse file: " + err.message);
//       }
//     };
//     reader.readAsText(file);
//   }

//   function clearCompletedTasks() {
//     if (confirm("Are you sure you want to delete all completed tasks?")) {
//       // Move completed tasks to bin first
//       const completedTasks = tasks.filter(t => t.completed);
//       completedTasks.forEach(task => {
//         binTasks.push({
//           ...task,
//           deletedAt: new Date().toISOString()
//         });
//       });
//       saveBin(binTasks);
      
//       // Remove from tasks
//       tasks = tasks.filter(t => !t.completed);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   // Initial render
//   render();
// }

























// import { loadTasks, saveTasks, loadTheme, saveTheme, loadBin, saveBin } from "./utils/storage.js";
// import { TaskForm } from "./components/TaskForm.js";
// import { TaskList } from "./components/TaskList.js";
// import { TaskFilters } from "./components/TaskFilters.js";
// import { StatsPanel } from "./components/StatsPanel.js";
// import { BinPanel } from "./components/BinPanel.js";
// import { showToast } from "./components/Toast.js";

// export function App(root) {
//   let tasks = loadTasks();
//   let binTasks = loadBin();
//   let filters = { search: "", priority: "", category: "", status: "all", view: "tasks" };
//   let editingTask = null;
//   let theme = loadTheme();
//   document.body.classList.toggle("dark", theme === "dark");

//   // Ask for notification permission once
//   if ("Notification" in window && Notification.permission !== "granted") {
//     Notification.requestPermission().catch(() => {});
//   }

//   // Periodic reminder checker
//   function checkReminders() {
//     const now = new Date();
//     tasks.forEach(t => {
//       if (t.completed) return;
//       if (t.reminderDate && t.reminderTime) {
//         const reminderDateTime = new Date(`${t.reminderDate}T${t.reminderTime}`);
//         const diff = reminderDateTime - now;
//         // Notify if within next 60s and not earlier than 0
//         if (diff <= 60000 && diff > 0 && !t._notified) {
//           // Show toast notification
//           showToast({
//             title: "Task Reminder",
//             message: `"${t.title}" has a reminder set for now!`,
//             taskId: t.id,
//             onOpen: () => {
//               // Scroll to and highlight the task
//               editingTask = t;
//               render();
//               const taskElement = document.querySelector(`[data-task-id="${t.id}"]`);
//               if (taskElement) {
//                 taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 taskElement.classList.add('highlighted');
//                 setTimeout(() => {
//                   taskElement.classList.remove('highlighted');
//                 }, 3000);
//               }
//             },
//             onDismiss: () => {
//               // Just mark as notified
//               t._notified = true;
//               saveTasks(tasks);
//             }
//           });
          
//           t._notified = true; // Avoid repeat
//           saveTasks(tasks);
//         }
//       }
//     });
//   }
//   setInterval(checkReminders, 30000);

//   // Recurring handling: when a recurring task is completed we create next occurrence
//   function handleRecurringOnComplete(task) {
//     if (!task.repeat || !task.date) return;
//     const base = new Date(task.date);
//     let next = new Date(base);
//     if (task.repeat === "daily") next.setDate(base.getDate() + 1);
//     if (task.repeat === "weekly") next.setDate(base.getDate() + 7);
//     if (task.repeat === "monthly") next.setMonth(base.getMonth() + 1);
//     const nextTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       date: next.toISOString().split("T")[0],
//       completed: false,
//       createdAt: new Date().toISOString()
//     };
//     // Don't copy _notified flag
//     delete nextTask._notified;
//     tasks.push(nextTask);
//   }

//   // Render function
//   function render() {
//     root.innerHTML = `
//       <header>
//         <i class="fas fa-tasks"></i>
//         TaskMaster Pro
//       </header>
//       <div class="container">
//         <div id="statsArea"></div>
//         <div id="viewTabs" class="view-tabs"></div>
//         <div id="formArea"></div>
//         <div id="filterArea"></div>
//         <div id="contentArea"></div>
//         <div id="footerArea"></div>
//       </div>
//       <div id="toastContainer" class="toast-container"></div>
//     `;
    
//     const statsArea = root.querySelector("#statsArea");
//     const viewTabs = root.querySelector("#viewTabs");
//     const formArea = root.querySelector("#formArea");
//     const filterArea = root.querySelector("#filterArea");
//     const contentArea = root.querySelector("#contentArea");
//     const footer = root.querySelector("#footerArea");

//     // View tabs
//     viewTabs.innerHTML = `
//       <button class="view-tab ${filters.view === 'tasks' ? 'active' : ''}" data-view="tasks">
//         <i class="fas fa-list"></i> Tasks
//       </button>
//       <button class="view-tab ${filters.view === 'bin' ? 'active' : ''}" data-view="bin">
//         <i class="fas fa-trash"></i> Bin (${binTasks.length})
//       </button>
//     `;

//     viewTabs.querySelectorAll(".view-tab").forEach(tab => {
//       tab.addEventListener("click", () => {
//         filters.view = tab.dataset.view;
//         render();
//       });
//     });

//     // Show stats panel only in tasks view
//     if (filters.view === "tasks") {
//       statsArea.appendChild(StatsPanel(tasks));
//     } else {
//       statsArea.innerHTML = "";
//     }

//     // Show either Add form or Edit form (only in tasks view)
//     if (filters.view === "tasks") {
//       const formComp = editingTask
//         ? TaskForm({ 
//             taskToEdit: editingTask, 
//             onSave: handleSaveEdit, 
//             onCancel: () => { editingTask = null; render(); } 
//           })
//         : TaskForm({ onSave: handleAdd });

//       formArea.appendChild(formComp);
//     } else {
//       formArea.innerHTML = "";
//     }

//     // Filters
//     filterArea.appendChild(TaskFilters({
//       state: filters,
//       onFilterChange: (f) => { filters = f; render(); },
//       onThemeToggle: toggleTheme,
//       onExport: exportTasks,
//       onImportAll: importTasks,
//       onClearCompleted: clearCompletedTasks
//     }));

//     // Show appropriate content based on view
//     if (filters.view === "tasks") {
//       // Apply filters
//       let visible = tasks.slice().filter(t => {
//         if (filters.priority && t.priority !== filters.priority) return false;
//         if (filters.category && (!t.category || t.category.toLowerCase() !== filters.category.toLowerCase())) return false;
//         if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase()) && 
//             !(t.notes || "").toLowerCase().includes(filters.search.toLowerCase())) return false;
//         if (filters.status === "active" && t.completed) return false;
//         if (filters.status === "completed" && !t.completed) return false;
//         return true;
//       });

//       // Sort by date -> priority -> createdAt
//       visible.sort((a, b) => {
//         if (a.date && b.date) {
//           if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
//         } else if (a.date) return -1;
//         else if (b.date) return 1;
        
//         const pr = { high: 0, medium: 1, low: 2 };
//         if (pr[a.priority] !== pr[b.priority]) return pr[a.priority] - pr[b.priority];
        
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       });

//       contentArea.appendChild(TaskList(visible, {
//         onToggle: toggleComplete,
//         onDelete: deleteTask,
//         onEdit: editTask
//       }));
//     } else {
//       // Show bin content
//       contentArea.appendChild(BinPanel(binTasks, {
//         onRestore: restoreTask,
//         onDeletePermanently: deletePermanently
//       }));
//     }

//     // Footer
//     footer.innerHTML = `
//       <footer class="small">
//         <p>${tasks.length} total tasks • ${tasks.filter(t => t.completed).length} completed</p>
//       </footer>
//     `;
//   }

//   // Event handlers
//   function handleAdd(task) {
//     const newTask = {
//       ...task,
//       id: Date.now() + Math.floor(Math.random() * 1000),
//       createdAt: new Date().toISOString(),
//       completed: false
//     };
//     tasks.push(newTask);
//     saveTasks(tasks);
//     render();
//   }

//   function handleSaveEdit(updated) {
//     const idx = tasks.findIndex(t => t.id === editingTask.id);
//     if (idx !== -1) {
//       tasks[idx] = { ...tasks[idx], ...updated };
//       saveTasks(tasks);
//     }
//     editingTask = null;
//     render();
//   }

//   function toggleComplete(id) {
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//       task.completed = !task.completed;
//       if (task.completed) {
//         handleRecurringOnComplete(task);
//       }
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function deleteTask(id) {
//     if (confirm("Are you sure you want to delete this task?")) {
//       const taskToDelete = tasks.find(t => t.id === id);
//       if (taskToDelete) {
//         // Move to bin
//         binTasks.push({
//           ...taskToDelete,
//           deletedAt: new Date().toISOString()
//         });
//         saveBin(binTasks);
        
//         // Remove from tasks
//         tasks = tasks.filter(t => t.id !== id);
//         saveTasks(tasks);
//         render();
//       }
//     }
//   }

//   function restoreTask(id) {
//     const taskToRestore = binTasks.find(t => t.id === id);
//     if (taskToRestore) {
//       // Remove from bin
//       binTasks = binTasks.filter(t => t.id !== id);
//       saveBin(binTasks);
      
//       // Add back to tasks
//       const { deletedAt, ...restoredTask } = taskToRestore;
//       tasks.push(restoredTask);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   function deletePermanently(id) {
//     if (confirm("Are you sure you want to permanently delete this task? This action cannot be undone.")) {
//       binTasks = binTasks.filter(t => t.id !== id);
//       saveBin(binTasks);
//       render();
//     }
//   }

//   function editTask(id) {
//     editingTask = { ...tasks.find(t => t.id === id) };
//     render();
//   }

//   function toggleTheme() {
//     theme = theme === "light" ? "dark" : "light";
//     document.body.classList.toggle("dark", theme === "dark");
//     saveTheme(theme);
//   }

//   function exportTasks() {
//     const data = JSON.stringify(tasks, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `taskmaster-export-${new Date().toISOString().slice(0,10)}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }

//   function importTasks(file) {
//     const reader = new FileReader();
//     reader.onload = e => {
//       try {
//         const imported = JSON.parse(e.target.result);
//         if (Array.isArray(imported)) {
//           // Merge with existing, avoid duplicates by ID
//           const existingIds = tasks.map(t => t.id);
//           const newTasks = imported.filter(t => !existingIds.includes(t.id));
//           tasks = [...tasks, ...newTasks];
//           saveTasks(tasks);
//           render();
//           alert(`Imported ${newTasks.length} tasks successfully.`);
//         } else {
//           alert("Invalid file format: expected an array of tasks.");
//         }
//       } catch (err) {
//         alert("Failed to parse file: " + err.message);
//       }
//     };
//     reader.readAsText(file);
//   }

//   function clearCompletedTasks() {
//     if (confirm("Are you sure you want to delete all completed tasks?")) {
//       // Move completed tasks to bin first
//       const completedTasks = tasks.filter(t => t.completed);
//       completedTasks.forEach(task => {
//         binTasks.push({
//           ...task,
//           deletedAt: new Date().toISOString()
//         });
//       });
//       saveBin(binTasks);
      
//       // Remove from tasks
//       tasks = tasks.filter(t => !t.completed);
//       saveTasks(tasks);
//       render();
//     }
//   }

//   // Initial render
//   render();
// }













import { loadTasks, saveTasks, loadTheme, saveTheme, loadBin, saveBin } from "./utils/storage.js";
import { TaskForm } from "./components/TaskForm.js";
import { TaskList } from "./components/TaskList.js";
import { TaskFilters } from "./components/TaskFilters.js";
import { StatsPanel } from "./components/StatsPanel.js";
import { BinPanel } from "./components/BinPanel.js";
import { showToast } from "./components/Toast.js";

export function App(root) {
  let tasks = loadTasks();
  let binTasks = loadBin();
  let filters = { search: "", priority: "", category: "", status: "all", view: "tasks" };
  let editingTask = null;
  let theme = loadTheme();
  document.body.classList.toggle("dark", theme === "dark");

  // Ask for notification permission once
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().catch(() => {});
  }

  // Check if there are any pending reminders from when the app was closed
  function checkPendingReminders() {
    const now = new Date();
    tasks.forEach(t => {
      if (t.completed) return;
      if (t.reminderDate && t.reminderTime) {
        const reminderDateTime = new Date(`${t.reminderDate}T${t.reminderTime}`);
        // Check if reminder was in the past 5 minutes but not notified
        const diff = now - reminderDateTime;
        if (diff > 0 && diff <= 300000 && !t._notified) {
          showReminderNotification(t);
          t._notified = true;
          saveTasks(tasks);
        }
      }
    });
  }

  // Show reminder notification (toast or browser notification)
  function showReminderNotification(task) {
    // If app is open, show toast
    if (document.getElementById('root') && document.getElementById('root').children.length > 0) {
      showToast({
        title: "Task Reminder",
        message: `"${task.title}" has a reminder set for now!`,
        taskId: task.id,
        onOpen: () => {
          // Scroll to and highlight the task
          editingTask = task;
          render();
          const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
          if (taskElement) {
            taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            taskElement.classList.add('highlighted');
            setTimeout(() => {
              taskElement.classList.remove('highlighted');
            }, 3000);
          }
        },
        onDismiss: () => {
          // Just mark as notified
          task._notified = true;
          saveTasks(tasks);
        }
      });
    } else {
      // If app is not open, show browser notification
      if (Notification.permission === "granted") {
        const notification = new Notification("TaskMaster Pro Reminder", {
          body: `"${task.title}" has a reminder set for now!`,
          icon: '/favicon.ico',
          tag: `task-reminder-${task.id}`
        });
        
        notification.onclick = () => {
          // Focus the app window if possible
          window.focus();
          // The actual navigation will happen when the app loads
          localStorage.setItem('pendingReminder', task.id);
        };
        
        // Auto close after 10 seconds
        setTimeout(() => {
          notification.close();
        }, 10000);
      }
    }
  }

  // Periodic reminder checker
  function checkReminders() {
    const now = new Date();
    tasks.forEach(t => {
      if (t.completed) return;
      if (t.reminderDate && t.reminderTime) {
        const reminderDateTime = new Date(`${t.reminderDate}T${t.reminderTime}`);
        const diff = reminderDateTime - now;
        // Notify if within next 60s and not earlier than 0
        if (diff <= 60000 && diff > 0 && !t._notified) {
          showReminderNotification(t);
          t._notified = true;
          saveTasks(tasks);
        }
      }
    });
  }

  // Check for pending reminders from when app was closed
  checkPendingReminders();
  
  // Set up interval for checking reminders
  setInterval(checkReminders, 30000);

  // Recurring handling: when a recurring task is completed we create next occurrence
  function handleRecurringOnComplete(task) {
    if (!task.repeat || !task.date) return;
    const base = new Date(task.date);
    let next = new Date(base);
    if (task.repeat === "daily") next.setDate(base.getDate() + 1);
    if (task.repeat === "weekly") next.setDate(base.getDate() + 7);
    if (task.repeat === "monthly") next.setMonth(base.getMonth() + 1);
    const nextTask = {
      ...task,
      id: Date.now() + Math.floor(Math.random() * 1000),
      date: next.toISOString().split("T")[0],
      completed: false,
      createdAt: new Date().toISOString()
    };
    // Don't copy _notified flag
    delete nextTask._notified;
    tasks.push(nextTask);
  }

  // Check if there's a pending reminder to navigate to when app loads
  const pendingReminderId = localStorage.getItem('pendingReminder');
  if (pendingReminderId) {
    const pendingTask = tasks.find(t => t.id === parseInt(pendingReminderId));
    if (pendingTask) {
      editingTask = pendingTask;
    }
    localStorage.removeItem('pendingReminder');
  }

  // Render function
  function render() {
    root.innerHTML = `
      <header>
        <i class="fas fa-tasks"></i>
        TaskMaster Pro
      </header>
      <div class="container">
        <div id="statsArea"></div>
        <div id="viewTabs" class="view-tabs"></div>
        <div id="formArea"></div>
        <div id="filterArea"></div>
        <div id="contentArea"></div>
        <div id="footerArea"></div>
      </div>
      <div id="toastContainer" class="toast-container"></div>
    `;
    
    const statsArea = root.querySelector("#statsArea");
    const viewTabs = root.querySelector("#viewTabs");
    const formArea = root.querySelector("#formArea");
    const filterArea = root.querySelector("#filterArea");
    const contentArea = root.querySelector("#contentArea");
    const footer = root.querySelector("#footerArea");

    // View tabs
    viewTabs.innerHTML = `
      <button class="view-tab ${filters.view === 'tasks' ? 'active' : ''}" data-view="tasks">
        <i class="fas fa-list"></i> Tasks
      </button>
      <button class="view-tab ${filters.view === 'bin' ? 'active' : ''}" data-view="bin">
        <i class="fas fa-trash"></i> Bin (${binTasks.length})
      </button>
    `;

    viewTabs.querySelectorAll(".view-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        filters.view = tab.dataset.view;
        render();
      });
    });

    // Show stats panel only in tasks view
    if (filters.view === "tasks") {
      statsArea.appendChild(StatsPanel(tasks));
    } else {
      statsArea.innerHTML = "";
    }

    // Show either Add form or Edit form (only in tasks view)
    if (filters.view === "tasks") {
      const formComp = editingTask
        ? TaskForm({ 
            taskToEdit: editingTask, 
            onSave: handleSaveEdit, 
            onCancel: () => { editingTask = null; render(); } 
          })
        : TaskForm({ onSave: handleAdd });

      formArea.appendChild(formComp);
    } else {
      formArea.innerHTML = "";
    }

    // Filters
    filterArea.appendChild(TaskFilters({
      state: filters,
      onFilterChange: (f) => { filters = f; render(); },
      onThemeToggle: toggleTheme,
      onExport: exportTasks,
      onImportAll: importTasks,
      onClearCompleted: clearCompletedTasks
    }));

    // Show appropriate content based on view
    if (filters.view === "tasks") {
      // Apply filters
      let visible = tasks.slice().filter(t => {
        if (filters.priority && t.priority !== filters.priority) return false;
        if (filters.category && (!t.category || t.category.toLowerCase() !== filters.category.toLowerCase())) return false;
        if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase()) && 
            !(t.notes || "").toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.status === "active" && t.completed) return false;
        if (filters.status === "completed" && !t.completed) return false;
        return true;
      });

      // Sort by date -> priority -> createdAt
      visible.sort((a, b) => {
        if (a.date && b.date) {
          if (a.date !== b.date) return new Date(a.date) - new Date(b.date);
        } else if (a.date) return -1;
        else if (b.date) return 1;
        
        const pr = { high: 0, medium: 1, low: 2 };
        if (pr[a.priority] !== pr[b.priority]) return pr[a.priority] - pr[b.priority];
        
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      contentArea.appendChild(TaskList(visible, {
        onToggle: toggleComplete,
        onDelete: deleteTask,
        onEdit: editTask
      }));
    } else {
      // Show bin content
      contentArea.appendChild(BinPanel(binTasks, {
        onRestore: restoreTask,
        onDeletePermanently: deletePermanently
      }));
    }

    // Footer
    footer.innerHTML = `
      <footer class="small">
        <p>${tasks.length} total tasks • ${tasks.filter(t => t.completed).length} completed</p>
      </footer>
    `;
  }

  // Event handlers
  function handleAdd(task) {
    const newTask = {
      ...task,
      id: Date.now() + Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString(),
      completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    render();
  }

  function handleSaveEdit(updated) {
    const idx = tasks.findIndex(t => t.id === editingTask.id);
    if (idx !== -1) {
      tasks[idx] = { ...tasks[idx], ...updated };
      saveTasks(tasks);
    }
    editingTask = null;
    render();
  }

  function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      if (task.completed) {
        handleRecurringOnComplete(task);
      }
      saveTasks(tasks);
      render();
    }
  }

  function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
      const taskToDelete = tasks.find(t => t.id === id);
      if (taskToDelete) {
        // Move to bin
        binTasks.push({
          ...taskToDelete,
          deletedAt: new Date().toISOString()
        });
        saveBin(binTasks);
        
        // Remove from tasks
        tasks = tasks.filter(t => t.id !== id);
        saveTasks(tasks);
        render();
      }
    }
  }

  function restoreTask(id) {
    const taskToRestore = binTasks.find(t => t.id === id);
    if (taskToRestore) {
      // Remove from bin
      binTasks = binTasks.filter(t => t.id !== id);
      saveBin(binTasks);
      
      // Add back to tasks
      const { deletedAt, ...restoredTask } = taskToRestore;
      tasks.push(restoredTask);
      saveTasks(tasks);
      render();
    }
  }

  function deletePermanently(id) {
    if (confirm("Are you sure you want to permanently delete this task? This action cannot be undone.")) {
      binTasks = binTasks.filter(t => t.id !== id);
      saveBin(binTasks);
      render();
    }
  }

  function editTask(id) {
    editingTask = { ...tasks.find(t => t.id === id) };
    render();
  }

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.body.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }

  function exportTasks() {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taskmaster-export-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importTasks(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          // Merge with existing, avoid duplicates by ID
          const existingIds = tasks.map(t => t.id);
          const newTasks = imported.filter(t => !existingIds.includes(t.id));
          tasks = [...tasks, ...newTasks];
          saveTasks(tasks);
          render();
          alert(`Imported ${newTasks.length} tasks successfully.`);
        } else {
          alert("Invalid file format: expected an array of tasks.");
        }
      } catch (err) {
        alert("Failed to parse file: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  function clearCompletedTasks() {
    if (confirm("Are you sure you want to delete all completed tasks?")) {
      // Move completed tasks to bin first
      const completedTasks = tasks.filter(t => t.completed);
      completedTasks.forEach(task => {
        binTasks.push({
          ...task,
          deletedAt: new Date().toISOString()
        });
      });
      saveBin(binTasks);
      
      // Remove from tasks
      tasks = tasks.filter(t => !t.completed);
      saveTasks(tasks);
      render();
    }
  }

  // Initial render
  render();
}