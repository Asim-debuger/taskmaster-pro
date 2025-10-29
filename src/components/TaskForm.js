// export function TaskForm({ taskToEdit = null, onSave, onCancel }) {
//   // returns DOM element
//   const form = document.createElement("form");
//   form.className = "card";

//   const title = taskToEdit ? taskToEdit.title : "";
//   const notes = taskToEdit ? (taskToEdit.notes || "") : "";
//   const date = taskToEdit ? (taskToEdit.date || "") : "";
//   const time = taskToEdit ? (taskToEdit.time || "") : "";
//   const priority = taskToEdit ? (taskToEdit.priority || "low") : "low";
//   const category = taskToEdit ? (taskToEdit.category || "") : "";
//   const repeat = taskToEdit ? (taskToEdit.repeat || "") : "";
//   const attachment = taskToEdit ? (taskToEdit.attachment || "") : "";

//   form.innerHTML = `
//     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
//       <strong>${taskToEdit ? "Edit Task" : "Add Task"}</strong>
//       <div>
//         ${taskToEdit ? `<button type="button" class="small-btn" id="cancelBtn">Cancel</button>` : ""}
//       </div>
//     </div>
//     <div class="form-row">
//       <input id="title" type="text" placeholder="Task title" value="${escapeHtml(title)}" required />
//       <select id="priority">
//         <option ${priority==="low"? "selected":""} value="low">Low</option>
//         <option ${priority==="medium"? "selected":""} value="medium">Medium</option>
//         <option ${priority==="high"? "selected":""} value="high">High</option>
//       </select>
//     </div>
//     <div class="form-row">
//       <input id="date" type="date" value="${escapeHtml(date)}" />
//       <input id="time" type="time" value="${escapeHtml(time)}" />
//       <input id="category" type="text" placeholder="Category" value="${escapeHtml(category)}" />
//       <select id="repeat">
//         <option ${repeat===""? "selected":""} value="">No repeat</option>
//         <option ${repeat==="daily"? "selected":""} value="daily">Daily</option>
//         <option ${repeat==="weekly"? "selected":""} value="weekly">Weekly</option>
//         <option ${repeat==="monthly"? "selected":""} value="monthly">Monthly</option>
//       </select>
//     </div>
//     <div class="form-row">
//       <textarea id="notes" placeholder="Notes (optional)">${escapeHtml(notes)}</textarea>
//       <input id="attachment" type="file" />
//     </div>
//     <div style="display:flex;gap:8px">
//       <button type="submit">${taskToEdit ? "Save changes" : "Add Task"}</button>
//     </div>
//   `;

//   // helpers to escape injected values
//   function getVal(id){ return form.querySelector(`#${id}`).value; }

//   // if Cancel present
//   const cancelBtn = form.querySelector("#cancelBtn");
//   if(cancelBtn && onCancel) cancelBtn.addEventListener("click", (e)=> { e.preventDefault(); onCancel(); });

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const file = form.querySelector("#attachment").files[0];
//     // NOTE: to keep storage small we save only file name. For real app you'd upload or store base64.
//     const newTask = {
//       id: taskToEdit ? taskToEdit.id : Date.now(),
//       title: getVal("title").trim(),
//       notes: getVal("notes").trim(),
//       date: getVal("date") || "",
//       time: getVal("time") || "",
//       priority: getVal("priority"),
//       category: getVal("category").trim(),
//       repeat: getVal("repeat"),
//       attachment: file ? file.name : attachment || null,
//       completed: taskToEdit ? !!taskToEdit.completed : false,
//       createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString()
//     };
//     onSave(newTask);
//     form.reset();
//   });

//   return form;
// }

// // small helper to avoid XSS in value attributes
// function escapeHtml(s=""){
//   return String(s).replaceAll('"', "&quot;").replaceAll("'", "&#39;").replaceAll("<","&lt;").replaceAll(">","&gt;");
// }















// export function TaskForm({ taskToEdit, onSave, onCancel }) {
//   const form = document.createElement("div");
//   form.className = "card";
//   form.innerHTML = `
//     <h2>${taskToEdit ? "Edit Task" : "Add New Task"}</h2>
//     <form id="taskForm">
//       <div class="form-row">
//         <input type="text" id="title" placeholder="Task title" required>
//       </div>
//       <div class="form-row">
//         <textarea id="notes" placeholder="Notes (optional)"></textarea>
//       </div>
//       <div class="form-row">
//         <select id="priority">
//           <option value="low">Low Priority</option>
//           <option value="medium">Medium Priority</option>
//           <option value="high">High Priority</option>
//         </select>
//         <select id="category">
//           <option value="">No Category</option>
//           <option value="work">Work</option>
//           <option value="personal">Personal</option>
//           <option value="shopping">Shopping</option>
//           <option value="health">Health</option>
//           <option value="education">Education</option>
//         </select>
//         <input type="date" id="date">
//         <input type="time" id="time">
//       </div>
//       <div class="form-row">
//         <select id="repeat">
//           <option value="">No Repeat</option>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//         <button type="submit">
//           <i class="fas ${taskToEdit ? 'fa-save' : 'fa-plus'}"></i>
//           ${taskToEdit ? "Update Task" : "Add Task"}
//         </button>
//         ${taskToEdit ? `<button type="button" id="cancelBtn" class="small-btn">Cancel</button>` : ""}
//       </div>
//     </form>
//   `;

//   // Pre-fill if editing
//   if (taskToEdit) {
//     setTimeout(() => {
//       form.querySelector("#title").value = taskToEdit.title || "";
//       form.querySelector("#notes").value = taskToEdit.notes || "";
//       form.querySelector("#priority").value = taskToEdit.priority || "medium";
//       form.querySelector("#category").value = taskToEdit.category || "";
//       form.querySelector("#date").value = taskToEdit.date || "";
//       form.querySelector("#time").value = taskToEdit.time || "";
//       form.querySelector("#repeat").value = taskToEdit.repeat || "";
//     }, 0);
//   }

//   // Handle form submission
//   form.querySelector("#taskForm").addEventListener("submit", e => {
//     e.preventDefault();
//     const title = form.querySelector("#title").value.trim();
//     if (!title) return;

//     const task = {
//       title,
//       notes: form.querySelector("#notes").value.trim(),
//       priority: form.querySelector("#priority").value,
//       category: form.querySelector("#category").value,
//       date: form.querySelector("#date").value,
//       time: form.querySelector("#time").value,
//       repeat: form.querySelector("#repeat").value
//     };

//     onSave(task);
//   });

//   // Handle cancel
//   if (taskToEdit) {
//     form.querySelector("#cancelBtn").addEventListener("click", onCancel);
//   }

//   return form;
// }















// //////⬇️⬇️now1:-

// export function TaskForm({ taskToEdit, onSave, onCancel }) {
//   const form = document.createElement("div");
//   form.className = "card";
//   form.innerHTML = `
//     <h2>${taskToEdit ? "Edit Task" : "Add New Task"}</h2>
//     <form id="taskForm">
//       <div class="form-row">
//         <input type="text" id="title" placeholder="Task title" required>
//       </div>
//       <div class="form-row">
//         <textarea id="notes" placeholder="Notes (optional)"></textarea>
//       </div>
//       <div class="form-row">
//         <select id="priority">
//           <option value="low">Low Priority</option>
//           <option value="medium">Medium Priority</option>
//           <option value="high">High Priority</option>
//         </select>
//         <select id="category">
//           <option value="">No Category</option>
//           <option value="work">Work</option>
//           <option value="personal">Personal</option>
//           <option value="shopping">Shopping</option>
//           <option value="health">Health</option>
//           <option value="education">Education</option>
//         </select>
//         <input type="date" id="date">
//         <input type="time" id="time">
//       </div>
//       <div class="form-row">
//         <select id="repeat">
//           <option value="">No Repeat</option>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//         <button type="submit">
//           <i class="fas ${taskToEdit ? 'fa-save' : 'fa-plus'}"></i>
//           ${taskToEdit ? "Update Task" : "Add Task"}
//         </button>
//         ${taskToEdit ? `<button type="button" id="cancelBtn" class="small-btn">Cancel</button>` : ""}
//       </div>
//     </form>
//   `;

//   // Pre-fill if editing
//   if (taskToEdit) {
//     setTimeout(() => {
//       form.querySelector("#title").value = taskToEdit.title || "";
//       form.querySelector("#notes").value = taskToEdit.notes || "";
//       form.querySelector("#priority").value = taskToEdit.priority || "medium";
//       form.querySelector("#category").value = taskToEdit.category || "";
//       form.querySelector("#date").value = taskToEdit.date || "";
//       form.querySelector("#time").value = taskToEdit.time || "";
//       form.querySelector("#repeat").value = taskToEdit.repeat || "";
//     }, 0);
//   }

//   // Handle form submission
//   form.querySelector("#taskForm").addEventListener("submit", e => {
//     e.preventDefault();
//     const title = form.querySelector("#title").value.trim();
//     if (!title) return;

//     const task = {
//       title,
//       notes: form.querySelector("#notes").value.trim(),
//       priority: form.querySelector("#priority").value,
//       category: form.querySelector("#category").value,
//       date: form.querySelector("#date").value,
//       time: form.querySelector("#time").value,
//       repeat: form.querySelector("#repeat").value
//     };

//     onSave(task);
//   });

//   // Handle cancel
//   if (taskToEdit) {
//     form.querySelector("#cancelBtn").addEventListener("click", onCancel);
//   }

//   return form;
// }











export function TaskForm({ taskToEdit, onSave, onCancel }) {
  const form = document.createElement("div");
  form.className = "card";
  form.innerHTML = `
    <h2>${taskToEdit ? "Edit Task" : "Add New Task"}</h2>
    <form id="taskForm">
      <div class="form-row">
        <input type="text" id="title" placeholder="Task title" required>
      </div>
      <div class="form-row">
        <textarea id="notes" placeholder="Notes (optional)"></textarea>
      </div>
      <div class="form-row">
        <select id="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select id="category">
          <option value="">No Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
        </select>
        <input type="date" id="date">
        <input type="time" id="time">
      </div>
      <div class="form-row">
        <select id="repeat">
          <option value="">No Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div class="form-row">
        <h3>Reminder</h3>
        <input type="date" id="reminderDate">
        <input type="time" id="reminderTime">
      </div>
      <div class="form-row">
        <button type="submit">
          <i class="fas ${taskToEdit ? 'fa-save' : 'fa-plus'}"></i>
          ${taskToEdit ? "Update Task" : "Add Task"}
        </button>
        ${taskToEdit ? `<button type="button" id="cancelBtn" class="small-btn">Cancel</button>` : ""}
      </div>
    </form>
  `;

  // Pre-fill if editing
  if (taskToEdit) {
    setTimeout(() => {
      form.querySelector("#title").value = taskToEdit.title || "";
      form.querySelector("#notes").value = taskToEdit.notes || "";
      form.querySelector("#priority").value = taskToEdit.priority || "medium";
      form.querySelector("#category").value = taskToEdit.category || "";
      form.querySelector("#date").value = taskToEdit.date || "";
      form.querySelector("#time").value = taskToEdit.time || "";
      form.querySelector("#repeat").value = taskToEdit.repeat || "";
      form.querySelector("#reminderDate").value = taskToEdit.reminderDate || "";
      form.querySelector("#reminderTime").value = taskToEdit.reminderTime || "";
    }, 0);
  }

  // Handle form submission
  form.querySelector("#taskForm").addEventListener("submit", e => {
    e.preventDefault();
    const title = form.querySelector("#title").value.trim();
    if (!title) return;

    const task = {
      title,
      notes: form.querySelector("#notes").value.trim(),
      priority: form.querySelector("#priority").value,
      category: form.querySelector("#category").value,
      date: form.querySelector("#date").value,
      time: form.querySelector("#time").value,
      repeat: form.querySelector("#repeat").value,
      reminderDate: form.querySelector("#reminderDate").value,
      reminderTime: form.querySelector("#reminderTime").value
    };

    onSave(task);
  });

  // Handle cancel
  if (taskToEdit) {
    form.querySelector("#cancelBtn").addEventListener("click", onCancel);
  }

  return form;
}