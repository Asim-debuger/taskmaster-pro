export function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

export function isOverdue(dateStr) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return date < new Date().setHours(0, 0, 0, 0);
}

export function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}