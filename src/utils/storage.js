// // minimal LocalStorage wrapper + helpers
// export const TASKS_KEY = "tm_tasks_v1";
// export const THEME_KEY = "tm_theme_v1";

// export function saveTasks(tasks){
//   localStorage.setItem(TASKS_KEY, JSON.stringify(tasks || []));
// }

// export function loadTasks(){
//   try{
//     const x = localStorage.getItem(TASKS_KEY);
//     return x ? JSON.parse(x) : [];
//   }catch(e){ return []; }
// }

// export function saveTheme(theme){
//   localStorage.setItem(THEME_KEY, theme);
// }
// export function loadTheme(){
//   return localStorage.getItem(THEME_KEY) || "light";
// }










// // Local storage utilities
// export function loadTasks() {
//   try {
//     const stored = localStorage.getItem("taskmaster-tasks");
//     return stored ? JSON.parse(stored) : [];
//   } catch (e) {
//     console.error("Failed to load tasks:", e);
//     return [];
//   }
// }

// export function saveTasks(tasks) {
//   try {
//     localStorage.setItem("taskmaster-tasks", JSON.stringify(tasks));
//   } catch (e) {
//     console.error("Failed to save tasks:", e);
//   }
// }

// export function loadTheme() {
//   try {
//     return localStorage.getItem("taskmaster-theme") || "light";
//   } catch (e) {
//     console.error("Failed to load theme:", e);
//     return "light";
//   }
// }

// export function saveTheme(theme) {
//   try {
//     localStorage.setItem("taskmaster-theme", theme);
//   } catch (e) {
//     console.error("Failed to save theme:", e);
//   }
// }














// ////////////⬇️⬇️now 1:-
// export function loadTasks() {
//   try {
//     const stored = localStorage.getItem("taskmaster-tasks");
//     return stored ? JSON.parse(stored) : [];
//   } catch (e) {
//     console.error("Failed to load tasks:", e);
//     return [];
//   }
// }

// export function saveTasks(tasks) {
//   try {
//     localStorage.setItem("taskmaster-tasks", JSON.stringify(tasks));
//   } catch (e) {
//     console.error("Failed to save tasks:", e);
//   }
// }

// export function loadTheme() {
//   try {
//     return localStorage.getItem("taskmaster-theme") || "light";
//   } catch (e) {
//     console.error("Failed to load theme:", e);
//     return "light";
//   }
// }

// export function saveTheme(theme) {
//   try {
//     localStorage.setItem("taskmaster-theme", theme);
//   } catch (e) {
//     console.error("Failed to save theme:", e);
//   }
// }










export function loadTasks() {
  try {
    const stored = localStorage.getItem("taskmaster-tasks");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load tasks:", e);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem("taskmaster-tasks", JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks:", e);
  }
}

export function loadBin() {
  try {
    const stored = localStorage.getItem("taskmaster-bin");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load bin:", e);
    return [];
  }
}

export function saveBin(binTasks) {
  try {
    localStorage.setItem("taskmaster-bin", JSON.stringify(binTasks));
  } catch (e) {
    console.error("Failed to save bin:", e);
  }
}

export function loadTheme() {
  try {
    return localStorage.getItem("taskmaster-theme") || "light";
  } catch (e) {
    console.error("Failed to load theme:", e);
    return "light";
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem("taskmaster-theme", theme);
  } catch (e) {
    console.error("Failed to save theme:", e);
  }
}