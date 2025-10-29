// import { TaskItem } from "./TaskItem.js";

// export function TaskList(tasks, handlers){
//   const ul = document.createElement("ul");
//   ul.className = "task-list card";
//   if(!tasks.length){ ul.innerHTML = `<div style="padding:12px;color:#666">No tasks found</div>`; return ul; }
//   tasks.forEach(t => ul.appendChild(TaskItem(t, handlers)));
//   return ul;
// }








// export function TaskList(tasks, { onToggle, onDelete, onEdit }) {
//   const container = document.createElement("div");
  
//   if (tasks.length === 0) {
//     container.innerHTML = `
//       <div class="card empty-state">
//         <i class="fas fa-clipboard-list"></i>
//         <h3>No tasks found</h3>
//         <p>Try changing your filters or add a new task</p>
//       </div>
//     `;
//     return container;
//   }

//   const ul = document.createElement("ul");
//   ul.className = "task-list";

//   tasks.forEach(task => {
//     const li = document.createElement("li");
//     li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
//     // Format date for display
//     let dateDisplay = "";
//     if (task.date) {
//       const dateObj = new Date(task.date);
//       dateDisplay = dateObj.toLocaleDateString(undefined, { 
//         weekday: 'short', 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     }

//     li.innerHTML = `
//       <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
//       <div class="task-content">
//         <div class="task-title">${escapeHtml(task.title)}</div>
//         ${task.notes ? `<div class="note">${escapeHtml(task.notes)}</div>` : ''}
//         <div class="meta">
//           ${task.date ? `<span class="badge date"><i class="fas fa-calendar"></i> ${dateDisplay}</span>` : ''}
//           ${task.time ? `<span class="badge date"><i class="fas fa-clock"></i> ${task.time}</span>` : ''}
//           ${task.priority ? `<span class="badge ${task.priority}"><span class="priority-indicator priority-${task.priority}"></span> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>` : ''}
//           ${task.category ? `<span class="badge category"><i class="fas fa-tag"></i> ${escapeHtml(task.category)}</span>` : ''}
//           ${task.repeat ? `<span class="badge repeat"><i class="fas fa-redo"></i> ${task.repeat.charAt(0).toUpperCase() + task.repeat.slice(1)}</span>` : ''}
//         </div>
//       </div>
//       <div class="controls">
//         <button class="small-btn edit-btn"><i class="fas fa-edit"></i> Edit</button>
//         <button class="small-btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
//       </div>
//     `;

//     // Event handlers
//     li.querySelector(".task-checkbox").addEventListener("change", () => onToggle(task.id));
//     li.querySelector(".delete-btn").addEventListener("click", () => onDelete(task.id));
//     li.querySelector(".edit-btn").addEventListener("click", () => onEdit(task.id));

//     ul.appendChild(li);
//   });

//   container.appendChild(ul);
//   return container;
// }

// function escapeHtml(text) {
//   const div = document.createElement('div');
//   div.textContent = text;
//   return div.innerHTML;
// }























// import React, { useState } from 'react';
// import TaskItem from './TaskItem';

// const TaskList = ({ 
//   tasks, 
//   toggleTaskCompletion, 
//   editTask, 
//   deleteTask, 
//   restoreTask,
//   showBin = false 
// }) => {
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter tasks based on status and search query
//   const filteredTasks = tasks.filter(task => {
//     const matchesStatus = showBin 
//       ? task.deleted 
//       : filter === 'all' 
//         ? true 
//         : filter === 'completed' 
//           ? task.completed 
//           : !task.completed;
    
//     const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          task.category.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return matchesStatus && matchesSearch;
//   });

//   // Sort tasks based on selected criteria
//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     switch (sortBy) {
//       case 'title':
//         return a.title.localeCompare(b.title);
//       case 'priority':
//         const priorityOrder = { high: 3, medium: 2, low: 1 };
//         return priorityOrder[b.priority] - priorityOrder[a.priority];
//       case 'dueDate':
//         return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
//       case 'createdAt':
//       default:
//         return new Date(b.createdAt) - new Date(a.createdAt);
//     }
//   });

//   if (tasks.length === 0) {
//     return (
//       <div className="card">
//         <div className="empty-state">
//           <i className="fas fa-inbox"></i>
//           <h3>No tasks yet</h3>
//           <p>{showBin ? 'Your bin is empty' : 'Start by adding a new task'}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
//         <h2>{showBin ? 'Deleted Tasks' : 'Your Tasks'}</h2>
        
//         <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}
//           />
          
//           {!showBin && (
//             <select 
//               value={filter} 
//               onChange={(e) => setFilter(e.target.value)}
//               style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}
//             >
//               <option value="all">All Tasks</option>
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//             </select>
//           )}
          
//           <select 
//             value={sortBy} 
//             onChange={(e) => setSortBy(e.target.value)}
//             style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}
//           >
//             <option value="createdAt">Sort by: Newest</option>
//             <option value="title">Sort by: Title</option>
//             <option value="priority">Sort by: Priority</option>
//             <option value="dueDate">Sort by: Due Date</option>
//           </select>
//         </div>
//       </div>

//       {sortedTasks.length === 0 ? (
//         <div className="empty-state" style={{ padding: '40px 20px' }}>
//           <i className="fas fa-search"></i>
//           <h3>No tasks found</h3>
//           <p>Try adjusting your search or filter criteria</p>
//         </div>
//       ) : (
//         <ul className="task-list">
//           {sortedTasks.map(task => (
//             <TaskItem
//               key={task.id}
//               task={task}
//               toggleTaskCompletion={toggleTaskCompletion}
//               editTask={editTask}
//               deleteTask={deleteTask}
//               restoreTask={restoreTask}
//               showBin={showBin}
//             />
//           ))}
//         </ul>
//       )}

//       {!showBin && filteredTasks.length > 0 && (
//         <div style={{ marginTop: '16px', color: '#64748b', fontSize: '0.9rem' }}>
//           {filter === 'all' && `${tasks.filter(t => !t.completed).length} active, ${tasks.filter(t => t.completed).length} completed`}
//           {filter === 'active' && `${filteredTasks.length} active tasks`}
//           {filter === 'completed' && `${filteredTasks.length} completed tasks`}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;

















// //////////////⬇️⬇️now1:-
// import { TaskItem } from "./TaskItem.js";

// export function TaskList(tasks, { onToggle, onDelete, onEdit }) {
//   const container = document.createElement("div");
//   container.className = "task-list";
  
//   if (tasks.length === 0) {
//     container.innerHTML = `
//       <div class="empty-state">
//         <i class="far fa-check-circle"></i>
//         <p>No tasks found</p>
//       </div>
//     `;
//     return container;
//   }
  
//   const ul = document.createElement("ul");
//   tasks.forEach(task => {
//     ul.appendChild(TaskItem(task, { onToggle, onDelete, onEdit }));
//   });
//   container.appendChild(ul);
  
//   return container;
// }















// export function TaskList(tasks, { onToggle, onDelete, onEdit }) {
//   const container = document.createElement("div");
  
//   if (tasks.length === 0) {
//     container.innerHTML = `
//       <div class="card empty-state">
//         <i class="fas fa-clipboard-list"></i>
//         <h3>No tasks found</h3>
//         <p>Try changing your filters or add a new task</p>
//       </div>
//     `;
//     return container;
//   }

//   const ul = document.createElement("ul");
//   ul.className = "task-list";

//   tasks.forEach(task => {
//     const li = document.createElement("li");
//     li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
//     // Format date for display
//     let dateDisplay = "";
//     if (task.date) {
//       const dateObj = new Date(task.date);
//       dateDisplay = dateObj.toLocaleDateString(undefined, { 
//         weekday: 'short', 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     }
    
//     // Check if reminder is set
//     const hasReminder = task.reminderDate && task.reminderTime;
//     let reminderDisplay = "";
//     if (hasReminder) {
//       const reminderDate = new Date(`${task.reminderDate}T${task.reminderTime}`);
//       reminderDisplay = reminderDate.toLocaleString(undefined, {
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     }

//     li.innerHTML = `
//       <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
//       <div class="task-content">
//         <div class="task-title">${escapeHtml(task.title)}</div>
//         ${task.notes ? `<div class="note">${escapeHtml(task.notes)}</div>` : ''}
//         <div class="meta">
//           ${task.date ? `<span class="badge date"><i class="fas fa-calendar"></i> ${dateDisplay}</span>` : ''}
//           ${task.time ? `<span class="badge time"><i class="fas fa-clock"></i> ${task.time}</span>` : ''}
//           ${hasReminder ? `<span class="badge reminder"><i class="fas fa-bell"></i> ${reminderDisplay}</span>` : ''}
//           ${task.priority ? `<span class="badge ${task.priority}"><span class="priority-indicator priority-${task.priority}"></span> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>` : ''}
//           ${task.category ? `<span class="badge category"><i class="fas fa-tag"></i> ${escapeHtml(task.category)}</span>` : ''}
//           ${task.repeat ? `<span class="badge repeat"><i class="fas fa-redo"></i> ${task.repeat.charAt(0).toUpperCase() + task.repeat.slice(1)}</span>` : ''}
//         </div>
//       </div>
//       <div class="controls">
//         <button class="small-btn edit-btn"><i class="fas fa-edit"></i> Edit</button>
//         <button class="small-btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
//       </div>
//     `;

//     // Event handlers
//     li.querySelector(".task-checkbox").addEventListener("change", () => onToggle(task.id));
//     li.querySelector(".delete-btn").addEventListener("click", () => onDelete(task.id));
//     li.querySelector(".edit-btn").addEventListener("click", () => onEdit(task.id));

//     ul.appendChild(li);
//   });

//   container.appendChild(ul);
//   return container;
// }

// function escapeHtml(text) {
//   const div = document.createElement('div');
//   div.textContent = text;
//   return div.innerHTML;
// }

















export function TaskList(tasks, { onToggle, onDelete, onEdit }) {
  const container = document.createElement("div");
  
  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="card empty-state">
        <i class="fas fa-clipboard-list"></i>
        <h3>No tasks found</h3>
        <p>Try changing your filters or add a new task</p>
      </div>
    `;
    return container;
  }

  const ul = document.createElement("ul");
  ul.className = "task-list";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.taskId = task.id; // Add data attribute for toast navigation
    
    // Format date for display
    let dateDisplay = "";
    if (task.date) {
      const dateObj = new Date(task.date);
      dateDisplay = dateObj.toLocaleDateString(undefined, { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    // Check if reminder is set
    const hasReminder = task.reminderDate && task.reminderTime;
    let reminderDisplay = "";
    if (hasReminder) {
      const reminderDate = new Date(`${task.reminderDate}T${task.reminderTime}`);
      reminderDisplay = reminderDate.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.notes ? `<div class="note">${escapeHtml(task.notes)}</div>` : ''}
        <div class="meta">
          ${task.date ? `<span class="badge date"><i class="fas fa-calendar"></i> ${dateDisplay}</span>` : ''}
          ${task.time ? `<span class="badge time"><i class="fas fa-clock"></i> ${task.time}</span>` : ''}
          ${hasReminder ? `<span class="badge reminder"><i class="fas fa-bell"></i> ${reminderDisplay}</span>` : ''}
          ${task.priority ? `<span class="badge ${task.priority}"><span class="priority-indicator priority-${task.priority}"></span> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>` : ''}
          ${task.category ? `<span class="badge category"><i class="fas fa-tag"></i> ${escapeHtml(task.category)}</span>` : ''}
          ${task.repeat ? `<span class="badge repeat"><i class="fas fa-redo"></i> ${task.repeat.charAt(0).toUpperCase() + task.repeat.slice(1)}</span>` : ''}
        </div>
      </div>
      <div class="controls">
        <button class="small-btn edit-btn"><i class="fas fa-edit"></i> Edit</button>
        <button class="small-btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
      </div>
    `;

    // Event handlers
    li.querySelector(".task-checkbox").addEventListener("change", () => onToggle(task.id));
    li.querySelector(".delete-btn").addEventListener("click", () => onDelete(task.id));
    li.querySelector(".edit-btn").addEventListener("click", () => onEdit(task.id));

    ul.appendChild(li);
  });

  container.appendChild(ul);
  return container;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}