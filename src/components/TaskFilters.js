// export function TaskFilters({ state, onFilterChange, onThemeToggle, onExport, onImportAll }) {
//   const div = document.createElement("div");
//   div.className = "card";

//   const placeholderSearch = state.search || "";
//   div.innerHTML = `
//     <div class="form-row">
//       <input id="search" type="text" placeholder="Search tasks..." value="${escape(placeholderSearch)}"/>
//       <select id="priorityFilter">
//         <option value="">All priorities</option>
//         <option value="high" ${state.priority==="high"?"selected":""}>High</option>
//         <option value="medium" ${state.priority==="medium"?"selected":""}>Medium</option>
//         <option value="low" ${state.priority==="low"?"selected":""}>Low</option>
//       </select>
//       <input id="categoryFilter" type="text" placeholder="Category" value="${escape(state.category||"")}"/>
//       <button id="themeBtn" class="small-btn">Toggle Theme</button>
//     </div>
//     <div style="display:flex;gap:8px;margin-top:8px">
//       <button id="exportBtn" class="small-btn">Export JSON</button>
//       <input id="importFile" type="file" />
//     </div>
//   `;

//   function readFilters(){
//     onFilterChange({
//       search: div.querySelector("#search").value.toLowerCase(),
//       priority: div.querySelector("#priorityFilter").value,
//       category: div.querySelector("#categoryFilter").value.trim().toLowerCase()
//     });
//   }

//   div.querySelector("#search").addEventListener("input", readFilters);
//   div.querySelector("#priorityFilter").addEventListener("change", readFilters);
//   div.querySelector("#categoryFilter").addEventListener("input", readFilters);
//   div.querySelector("#themeBtn").addEventListener("click", onThemeToggle);
//   div.querySelector("#exportBtn").addEventListener("click", onExport);
//   div.querySelector("#importFile").addEventListener("change", (e)=>{
//     const f=e.target.files[0];
//     if(!f) return;
//     const r=new FileReader();
//     r.onload = () => {
//       try{
//         const parsed = JSON.parse(r.result);
//         onImportAll(parsed);
//       }catch(err){ alert("Invalid JSON"); }
//     };
//     r.readAsText(f);
//   });

//   return div;
// }

// function escape(s=""){ return String(s).replaceAll('"','&quot;').replaceAll("<","&lt;").replaceAll(">","&gt;"); }












// export function TaskFilters({ state, onFilterChange, onThemeToggle, onExport, onImportAll, onClearCompleted }) {
//   const container = document.createElement("div");
//   container.className = "card";
  
//   container.innerHTML = `
//     <div class="task-header">
//       <h2>Filters</h2>
//       <div class="controls">
//         <button id="themeToggle" class="small-btn">
//           <i class="fas fa-moon"></i> Theme
//         </button>
//         <button id="exportBtn" class="small-btn">
//           <i class="fas fa-download"></i> Export
//         </button>
//         <label for="importInput" class="small-btn" style="cursor:pointer;">
//           <i class="fas fa-upload"></i> Import
//           <input type="file" id="importInput" accept=".json" style="display:none;">
//         </label>
//         <button id="clearCompletedBtn" class="small-btn">
//           <i class="fas fa-broom"></i> Clear Completed
//         </button>
//       </div>
//     </div>
//     <div class="form-row">
//       <input type="text" id="search" placeholder="Search tasks..." value="${state.search || ''}">
//       <select id="priorityFilter">
//         <option value="">All Priorities</option>
//         <option value="high">High Priority</option>
//         <option value="medium">Medium Priority</option>
//         <option value="low">Low Priority</option>
//       </select>
//       <select id="categoryFilter">
//         <option value="">All Categories</option>
//         <option value="work">Work</option>
//         <option value="personal">Personal</option>
//         <option value="shopping">Shopping</option>
//         <option value="health">Health</option>
//         <option value="education">Education</option>
//       </select>
//       <select id="statusFilter">
//         <option value="all">All Tasks</option>
//         <option value="active">Active Only</option>
//         <option value="completed">Completed Only</option>
//       </select>
//     </div>
//   `;

//   // Set current values
//   setTimeout(() => {
//     container.querySelector("#priorityFilter").value = state.priority || "";
//     container.querySelector("#categoryFilter").value = state.category || "";
//     container.querySelector("#statusFilter").value = state.status || "all";
//   }, 0);

//   // Add event listeners
//   container.querySelector("#search").addEventListener("input", e => {
//     onFilterChange({ ...state, search: e.target.value });
//   });

//   container.querySelector("#priorityFilter").addEventListener("change", e => {
//     onFilterChange({ ...state, priority: e.target.value });
//   });

//   container.querySelector("#categoryFilter").addEventListener("change", e => {
//     onFilterChange({ ...state, category: e.target.value });
//   });

//   container.querySelector("#statusFilter").addEventListener("change", e => {
//     onFilterChange({ ...state, status: e.target.value });
//   });

//   container.querySelector("#themeToggle").addEventListener("click", onThemeToggle);
//   container.querySelector("#exportBtn").addEventListener("click", onExport);
//   container.querySelector("#importInput").addEventListener("change", e => {
//     if (e.target.files.length > 0) {
//       onImportAll(e.target.files[0]);
//       e.target.value = ""; // Reset input
//     }
//   });
//   container.querySelector("#clearCompletedBtn").addEventListener("click", onClearCompleted);

//   return container;
// }
















////////⬇️⬇️ now 1:-

export function TaskFilters({ state, onFilterChange, onThemeToggle, onExport, onImportAll, onClearCompleted }) {
  const container = document.createElement("div");
  container.className = "card";
  
  container.innerHTML = `
    <div class="task-header">
      <h2>Filters</h2>
      <div class="controls">
        <button id="themeToggle" class="small-btn">
          <i class="fas fa-moon"></i> Theme
        </button>
        <button id="exportBtn" class="small-btn">
          <i class="fas fa-download"></i> Export
        </button>
        <label for="importInput" class="small-btn" style="cursor:pointer;">
          <i class="fas fa-upload"></i> Import
          <input type="file" id="importInput" accept=".json" style="display:none;">
        </label>
        <button id="clearCompletedBtn" class="small-btn">
          <i class="fas fa-broom"></i> Clear Completed
        </button>
      </div>
    </div>
    <div class="form-row">
      <input type="text" id="search" placeholder="Search tasks..." value="${state.search || ''}">
      <select id="priorityFilter">
        <option value="">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <select id="categoryFilter">
        <option value="">All Categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
        <option value="health">Health</option>
        <option value="education">Education</option>
      </select>
      <select id="statusFilter">
        <option value="all">All Tasks</option>
        <option value="active">Active Only</option>
        <option value="completed">Completed Only</option>
      </select>
    </div>
  `;

  // Set current values
  setTimeout(() => {
    container.querySelector("#priorityFilter").value = state.priority || "";
    container.querySelector("#categoryFilter").value = state.category || "";
    container.querySelector("#statusFilter").value = state.status || "all";
  }, 0);

  // Add event listeners
  container.querySelector("#search").addEventListener("input", e => {
    onFilterChange({ ...state, search: e.target.value });
  });

  container.querySelector("#priorityFilter").addEventListener("change", e => {
    onFilterChange({ ...state, priority: e.target.value });
  });

  container.querySelector("#categoryFilter").addEventListener("change", e => {
    onFilterChange({ ...state, category: e.target.value });
  });

  container.querySelector("#statusFilter").addEventListener("change", e => {
    onFilterChange({ ...state, status: e.target.value });
  });

  container.querySelector("#themeToggle").addEventListener("click", onThemeToggle);
  container.querySelector("#exportBtn").addEventListener("click", onExport);
  container.querySelector("#importInput").addEventListener("change", e => {
    if (e.target.files.length > 0) {
      onImportAll(e.target.files[0]);
      e.target.value = ""; // Reset input
    }
  });
  container.querySelector("#clearCompletedBtn").addEventListener("click", onClearCompleted);

  return container;
}