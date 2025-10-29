export function BinPanel(binTasks, { onRestore, onDeletePermanently }) {
  const container = document.createElement("div");
  container.className = "card";
  
  if (binTasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-trash"></i>
        <h3>Bin is Empty</h3>
        <p>Deleted tasks will appear here</p>
      </div>
    `;
    return container;
  }
  
  container.innerHTML = `
    <h2>Deleted Tasks</h2>
    <p class="small">Tasks in bin will be permanently deleted after 30 days</p>
  `;
  
  const ul = document.createElement("ul");
  ul.className = "task-list";
  
  binTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    
    const deletedDate = new Date(task.deletedAt);
    const daysAgo = Math.floor((new Date() - deletedDate) / (1000 * 60 * 60 * 24));
    
    li.innerHTML = `
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.notes ? `<div class="note">${escapeHtml(task.notes)}</div>` : ''}
        <div class="meta">
          ${task.priority ? `<span class="badge ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>` : ''}
          ${task.category ? `<span class="badge category">${escapeHtml(task.category)}</span>` : ''}
          <span class="badge deleted">Deleted ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago</span>
        </div>
      </div>
      <div class="controls">
        <button class="small-btn restore-btn"><i class="fas fa-undo"></i> Restore</button>
        <button class="small-btn delete-btn"><i class="fas fa-trash"></i> Delete Permanently</button>
      </div>
    `;
    
    li.querySelector(".restore-btn").addEventListener("click", () => onRestore(task.id));
    li.querySelector(".delete-btn").addEventListener("click", () => onDeletePermanently(task.id));
    
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