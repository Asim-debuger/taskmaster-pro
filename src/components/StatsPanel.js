// export function StatsPanel(tasks) {
//   const container = document.createElement("div");
//   container.className = "stats-container";
  
//   const total = tasks.length;
//   const completed = tasks.filter(t => t.completed).length;
//   const overdue = tasks.filter(t => {
//     if (t.completed || !t.date) return false;
//     return new Date(t.date) < new Date().setHours(0,0,0,0);
//   }).length;
//   const highPriority = tasks.filter(t => t.priority === "high" && !t.completed).length;
  
//   container.innerHTML = `
//     <div class="stat-card">
//       <div class="stat-value">${total}</div>
//       <div class="stat-label">Total Tasks</div>
//     </div>
//     <div class="stat-card">
//       <div class="stat-value">${completed}</div>
//       <div class="stat-label">Completed</div>
//     </div>
//     <div class="stat-card">
//       <div class="stat-value">${overdue}</div>
//       <div class="stat-label">Overdue</div>
//     </div>
//     <div class="stat-card">
//       <div class="stat-value">${highPriority}</div>
//       <div class="stat-label">High Priority</div>
//     </div>
//   `;
  
//   return container;
// }













/////////⬇️⬇️ now1:-
export function StatsPanel(tasks) {
  const container = document.createElement("div");
  container.className = "stats-container";
  
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const overdue = tasks.filter(t => {
    if (t.completed || !t.date) return false;
    return new Date(t.date) < new Date().setHours(0,0,0,0);
  }).length;
  const highPriority = tasks.filter(t => t.priority === "high" && !t.completed).length;
  
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${total}</div>
      <div class="stat-label">Total Tasks</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${completed}</div>
      <div class="stat-label">Completed</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${overdue}</div>
      <div class="stat-label">Overdue</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${highPriority}</div>
      <div class="stat-label">High Priority</div>
    </div>
  `;
  
  return container;
}