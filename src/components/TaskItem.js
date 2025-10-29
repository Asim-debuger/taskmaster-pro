// export function TaskItem(task, { onToggle, onDelete, onEdit }) {
//   const li = document.createElement("li");
//   li.className = "task-item card " + (task.completed ? "completed" : "");
//   li.innerHTML = `
//     <div>
//       <div style="display:flex;gap:8px;align-items:center">
//         <input type="checkbox" class="chk" ${task.completed ? "checked" : ""}/>
//         <div>
//           <div class="title" style="font-weight:600">${escape(task.title)}</div>
//           <div class="meta">
//             <span class="badge">${task.priority}</span>
//             ${task.category ? `<span class="badge">${escape(task.category)}</span>` : ""}
//             ${task.date ? `<span class="badge">${escape(task.date)} ${task.time||""}</span>` : ""}
//             ${task.repeat ? `<span class="badge">🔁 ${task.repeat}</span>` : ""}
//           </div>
//         </div>
//       </div>
//       ${task.notes ? `<div class="note">${escape(task.notes)}</div>` : ""}
//       ${task.attachment ? `<div class="note">📎 ${escape(task.attachment)}</div>` : ""}
//     </div>
//     <div class="controls">
//       <button class="small-btn edit-btn">Edit</button>
//       <button class="small-btn delete-btn">Delete</button>
//     </div>
//   `;

//   li.querySelector(".chk").addEventListener("change", () => onToggle(task.id));
//   li.querySelector(".delete-btn").addEventListener("click", () => onDelete(task.id));
//   li.querySelector(".edit-btn").addEventListener("click", () => onEdit(task));

//   return li;
// }

// function escape(s=""){ return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;"); }














// import React from 'react';

// const TaskItem = ({ task, toggleTaskCompletion, editTask, deleteTask, restoreTask, showBin }) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const isOverdue = () => {
//     if (!task.dueDate || task.completed) return false;
//     return new Date(task.dueDate) < new Date();
//   };

//   const isReminderDue = () => {
//     if (!task.reminderDate || task.completed) return false;
//     return new Date(task.reminderDate) <= new Date();
//   };

//   const handleDelete = () => {
//     if (showBin) {
//       // Permanent deletion from bin
//       deleteTask(task.id, true);
//       window.showAppNotification('Task permanently deleted', 'success');
//     } else {
//       // Move to bin
//       deleteTask(task.id, false);
//       window.showAppNotification('Task moved to bin', 'info');
//     }
//   };

//   const handleRestore = () => {
//     restoreTask(task.id);
//     window.showAppNotification('Task restored', 'success');
//   };

//   return (
//     <li className={`task-item ${task.completed ? 'task-completed' : ''}`}>
//       <input
//         type="checkbox"
//         className="task-checkbox"
//         checked={task.completed}
//         onChange={() => toggleTaskCompletion(task.id)}
//       />
      
//       <div style={{ flex: 1 }}>
//         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
//           <h3 style={{ margin: 0, flex: 1 }}>{task.title}</h3>
          
//           {task.priority !== 'medium' && (
//             <span className={`badge ${task.priority}`}>
//               <span className={`priority-indicator priority-${task.priority}`}></span>
//               {task.priority} priority
//             </span>
//           )}
//         </div>
        
//         {task.description && (
//           <p style={{ margin: '8px 0', color: '#64748b' }}>{task.description}</p>
//         )}
        
//         <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
//           {task.category && (
//             <span className="badge category">
//               <i className="fas fa-tag"></i>
//               {task.category}
//             </span>
//           )}
          
//           {task.dueDate && (
//             <span className={`badge date ${isOverdue() ? 'high' : ''}`}>
//               <i className={`fas ${isOverdue() ? 'fa-exclamation-circle' : 'fa-calendar'}`}></i>
//               {formatDate(task.dueDate)}
//               {isOverdue() && ' (Overdue)'}
//             </span>
//           )}
          
//           {task.reminderDate && (
//             <span className={`badge reminder ${isReminderDue() ? 'high' : ''}`}>
//               <i className={`fas ${isReminderDue() ? 'fa-bell' : 'fa-bell'}`}></i>
//               {formatDate(task.reminderDate)}
//               {isReminderDue() && ' (Reminder!)'}
//             </span>
//           )}
          
//           {task.repeat !== 'none' && (
//             <span className="badge repeat">
//               <i className="fas fa-repeat"></i>
//               Repeats {task.repeat}
//             </span>
//           )}
//         </div>
//       </div>
      
//       <div className="controls" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
//         {showBin ? (
//           <>
//             <button className="small-btn" onClick={handleRestore} title="Restore Task">
//               <i className="fas fa-undo"></i>
//             </button>
//             <button className="small-btn" onClick={handleDelete} title="Delete Permanently">
//               <i className="fas fa-trash"></i>
//             </button>
//           </>
//         ) : (
//           <>
//             {!task.completed && (
//               <button className="small-btn" onClick={() => editTask(task)} title="Edit Task">
//                 <i className="fas fa-edit"></i>
//               </button>
//             )}
//             <button className="small-btn" onClick={handleDelete} title="Delete Task">
//               <i className="fas fa-trash"></i>
//             </button>
//           </>
//         )}
//       </div>
//     </li>
//   );
// };

// export default TaskItem;















////////⬇️⬇️ :-

export function TaskItem(task, { onToggle, onDelete, onEdit }) {
  const li = document.createElement("li");
  li.className = "task-item card " + (task.completed ? "completed" : "");
  li.innerHTML = `
    <div>
      <div style="display:flex;gap:8px;align-items:center">
        <input type="checkbox" class="chk" ${task.completed ? "checked" : ""}/>
        <div>
          <div class="title" style="font-weight:500">${escapeHtml(task.title)}</div>
          ${task.notes ? `<div class="notes">${escapeHtml(task.notes)}</div>` : ""}
          <div class="meta">
            ${task.category ? `<span class="category">${escapeHtml(task.category)}</span>` : ""}
            ${task.priority ? `<span class="priority ${task.priority}">${task.priority}</span>` : ""}
            ${task.date ? `<span class="date"><i class="far fa-calendar"></i> ${formatDate(task.date)}</span>` : ""}
            ${task.time ? `<span class="time"><i class="far fa-clock"></i> ${task.time}</span>` : ""}
            ${task.repeat ? `<span class="repeat"><i class="fas fa-repeat"></i> ${task.repeat}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="icon-btn edit-btn"><i class="fas fa-edit"></i></button>
        <button class="icon-btn delete-btn"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `;

  // Add event listeners
  li.querySelector(".chk").addEventListener("change", () => onToggle(task.id));
  li.querySelector(".edit-btn").addEventListener("click", () => onEdit(task.id));
  li.querySelector(".delete-btn").addEventListener("click", () => onDelete(task.id));

  return li;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}