const STORAGE_KEY = 'goal-calendar-data-v1';
const BACKUP_KEY = 'goal-calendar-data-backup-v1';

const state = {
  viewDate: new Date(),
  data: loadData(),
};

const el = {
  goalForm: document.getElementById('goalForm'),
  taskForm: document.getElementById('taskForm'),
  goalTitle: document.getElementById('goalTitle'),
  goalDescription: document.getElementById('goalDescription'),
  goalTargetDate: document.getElementById('goalTargetDate'),
  goalTargetTasks: document.getElementById('goalTargetTasks'),
  taskTitle: document.getElementById('taskTitle'),
  taskNotes: document.getElementById('taskNotes'),
  taskGoalId: document.getElementById('taskGoalId'),
  taskDueDate: document.getElementById('taskDueDate'),
  totalGoals: document.getElementById('totalGoals'),
  totalTasks: document.getElementById('totalTasks'),
  completedTasks: document.getElementById('completedTasks'),
  overallProgress: document.getElementById('overallProgress'),
  goalsList: document.getElementById('goalsList'),
  tasksList: document.getElementById('tasksList'),
  goalProgressChart: document.getElementById('goalProgressChart'),
  calendarGrid: document.getElementById('calendarGrid'),
  calendarMonthLabel: document.getElementById('calendarMonthLabel'),
  prevMonthBtn: document.getElementById('prevMonthBtn'),
  nextMonthBtn: document.getElementById('nextMonthBtn'),
  taskFilterGoal: document.getElementById('taskFilterGoal'),
  restoreBackupBtn: document.getElementById('restoreBackupBtn'),
  clearDataBtn: document.getElementById('clearDataBtn'),
  weatherWidget: document.getElementById('weatherWidget'),
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { goals: [], tasks: [] };
    const parsed = JSON.parse(raw);
    return {
      goals: Array.isArray(parsed.goals) ? parsed.goals : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
    };
  } catch {
    return { goals: [], tasks: [] };
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function getBackup() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function snapshotData(reason = 'backup') {
  localStorage.setItem(BACKUP_KEY, JSON.stringify({
    reason,
    savedAt: new Date().toISOString(),
    data: state.data,
  }));
}

function updateRestoreButton() {
  if (!el.restoreBackupBtn) return;
  const backup = getBackup();
  el.restoreBackupBtn.disabled = !backup;
  el.restoreBackupBtn.textContent = backup ? 'Restore Backup' : 'No Backup Yet';
}

function goalTaskStats(goalId) {
  const tasks = state.data.tasks.filter(task => task.goalId === goalId);
  const completed = tasks.filter(task => task.completed).length;
  return { total: tasks.length, completed };
}

function overallStats() {
  const totalGoals = state.data.goals.length;
  const totalTasks = state.data.tasks.length;
  const completedTasks = state.data.tasks.filter(task => task.completed).length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return { totalGoals, totalTasks, completedTasks, progress };
}

function renderStats() {
  const stats = overallStats();
  el.totalGoals.textContent = stats.totalGoals;
  el.totalTasks.textContent = stats.totalTasks;
  el.completedTasks.textContent = stats.completedTasks;
  el.overallProgress.textContent = `${stats.progress}%`;
}

function renderGoalOptions() {
  const options = ['<option value="">No goal</option>']
    .concat(state.data.goals.map(goal => `<option value="${goal.id}">${escapeHtml(goal.title)}</option>`));
  el.taskGoalId.innerHTML = options.join('');
  el.taskFilterGoal.innerHTML = ['<option value="">All tasks</option>']
    .concat(state.data.goals.map(goal => `<option value="${goal.id}">${escapeHtml(goal.title)}</option>`))
    .join('');
}

function renderGoals() {
  if (!state.data.goals.length) {
    el.goalsList.innerHTML = 'No goals yet.';
    return;
  }

  el.goalsList.innerHTML = state.data.goals.map(goal => {
    const stats = goalTaskStats(goal.id);
    const target = Number(goal.targetTasks || 0) || Math.max(stats.total, 1);
    const progress = Math.min(100, Math.round((stats.completed / target) * 100));
    return `
      <div class="goal-card">
        <div class="goal-header">
          <div>
            <strong>${escapeHtml(goal.title)}</strong>
            <div class="goal-meta">${goal.targetDate ? `Target: ${goal.targetDate}` : 'No target date'} · ${stats.completed}/${target} tasks complete</div>
          </div>
          <button class="delete-btn" data-delete-goal="${goal.id}">Delete</button>
        </div>
        ${goal.description ? `<p>${escapeHtml(goal.description)}</p>` : ''}
        <div class="progress-line"><div style="width:${progress}%"></div></div>
      </div>`;
  }).join('');
}

function renderTasks() {
  const filter = el.taskFilterGoal.value;
  let tasks = [...state.data.tasks];
  if (filter) tasks = tasks.filter(task => task.goalId === filter);
  tasks.sort((a, b) => (a.completed === b.completed ? (a.dueDate || '').localeCompare(b.dueDate || '') : Number(a.completed) - Number(b.completed)));

  if (!tasks.length) {
    el.tasksList.innerHTML = 'No tasks yet.';
    return;
  }

  el.tasksList.innerHTML = tasks.map(task => {
    const goal = state.data.goals.find(g => g.id === task.goalId);
    return `
      <div class="task-card">
        <div class="task-header">
          <div>
            <strong>${escapeHtml(task.title)}</strong>
            <div class="task-meta">${goal ? `Goal: ${escapeHtml(goal.title)} · ` : ''}${task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}</div>
          </div>
          <span class="badge ${task.completed ? 'done' : ''}">${task.completed ? 'Done' : 'Open'}</span>
        </div>
        ${task.notes ? `<p>${escapeHtml(task.notes)}</p>` : ''}
        <div class="task-actions">
          <button class="toggle-done" data-toggle-task="${task.id}">${task.completed ? 'Mark Open' : 'Mark Done'}</button>
          <button class="delete-btn" data-delete-task="${task.id}">Delete</button>
        </div>
      </div>`;
  }).join('');
}

function renderChart() {
  if (!state.data.goals.length) {
    el.goalProgressChart.className = 'chart-bars empty-state';
    el.goalProgressChart.textContent = 'No goals yet.';
    return;
  }

  el.goalProgressChart.className = 'chart-bars';
  el.goalProgressChart.innerHTML = state.data.goals.map(goal => {
    const stats = goalTaskStats(goal.id);
    const target = Number(goal.targetTasks || 0) || Math.max(stats.total, 1);
    const progress = Math.min(100, Math.round((stats.completed / target) * 100));
    return `
      <div class="chart-row">
        <span>${escapeHtml(goal.title)}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${progress}%"></div></div>
        <strong>${progress}%</strong>
      </div>`;
  }).join('');
}

function tasksForDate(dateIso) {
  return state.data.tasks.filter(task => task.dueDate === dateIso);
}

function goalsForDate(dateIso) {
  return state.data.goals.filter(goal => goal.targetDate === dateIso);
}

function renderCalendar() {
  const year = state.viewDate.getFullYear();
  const month = state.viewDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  el.calendarMonthLabel.textContent = first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const today = todayIso();
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const dayTasks = tasksForDate(iso);
    const dayGoals = goalsForDate(iso);
    const doneTasks = dayTasks.filter(task => task.completed);
    days.push(`
      <div class="calendar-day ${d.getMonth() !== month ? 'other-month' : ''} ${iso === today ? 'today' : ''}">
        <div class="day-number">${d.getDate()}</div>
        <div class="day-badges">
          ${dayGoals.slice(0, 2).map(goal => `<div class="badge goal">🎯 ${escapeHtml(goal.title)}</div>`).join('')}
          ${dayTasks.slice(0, 2).map(task => `<div class="badge ${task.completed ? 'done' : ''}">${task.completed ? '✓' : '•'} ${escapeHtml(task.title)}</div>`).join('')}
          ${doneTasks.length > 2 ? `<div class="badge done">+${doneTasks.length - 2} done</div>` : ''}
        </div>
      </div>`);
  }
  el.calendarGrid.innerHTML = days.join('');
}

function renderWeather(weatherItems) {
  if (!weatherItems || !weatherItems.length) {
    el.weatherWidget.className = 'weather-grid empty-state';
    el.weatherWidget.textContent = 'Weather unavailable right now.';
    return;
  }

  el.weatherWidget.className = 'weather-grid';
  el.weatherWidget.innerHTML = weatherItems.map(item => {
    const days = (item.forecast || []).slice(0, 3).map(day => `
      <div class="forecast-day">
        <div>${escapeHtml(day.label)}</div>
        <div>${escapeHtml(day.icon || '')}</div>
        <strong>${escapeHtml(day.max)}° / ${escapeHtml(day.min)}°</strong>
      </div>
    `).join('');

    return `
      <div class="weather-card">
        <h3>${escapeHtml(item.name)}</h3>
        <div class="weather-now">${escapeHtml(item.temp)}° ${escapeHtml(item.icon || '')}</div>
        <div>${escapeHtml(item.desc || '')}</div>
        <div class="weather-meta">Feels like ${escapeHtml(item.feelsLike)}° , humidity ${escapeHtml(item.humidity)}% , wind ${escapeHtml(item.wind)}</div>
        <div class="forecast-strip">${days}</div>
      </div>
    `;
  }).join('');
}

async function loadWeather() {
  try {
    const res = await fetch('/weather');
    const data = await res.json();
    renderWeather(data.locations || []);
  } catch {
    renderWeather([]);
  }
}

function renderAll() {
  renderStats();
  renderGoalOptions();
  renderGoals();
  renderTasks();
  renderChart();
  renderCalendar();
  saveData();
  updateRestoreButton();
}

function addGoal(event) {
  event.preventDefault();
  snapshotData('before add goal');
  state.data.goals.unshift({
    id: uid(),
    title: el.goalTitle.value.trim(),
    description: el.goalDescription.value.trim(),
    targetDate: el.goalTargetDate.value || '',
    targetTasks: Number(el.goalTargetTasks.value || 0),
    createdAt: new Date().toISOString(),
  });
  el.goalForm.reset();
  el.goalTargetTasks.value = 5;
  renderAll();
}

function addTask(event) {
  event.preventDefault();
  snapshotData('before add task');
  state.data.tasks.unshift({
    id: uid(),
    title: el.taskTitle.value.trim(),
    notes: el.taskNotes.value.trim(),
    goalId: el.taskGoalId.value || '',
    dueDate: el.taskDueDate.value || '',
    completed: false,
    completedAt: '',
    createdAt: new Date().toISOString(),
  });
  el.taskForm.reset();
  renderAll();
}

function handleClicks(event) {
  const toggleTask = event.target.closest('[data-toggle-task]');
  const deleteTask = event.target.closest('[data-delete-task]');
  const deleteGoal = event.target.closest('[data-delete-goal]');

  if (toggleTask) {
    const task = state.data.tasks.find(t => t.id === toggleTask.dataset.toggleTask);
    if (task) {
      snapshotData('before toggle task');
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : '';
      renderAll();
    }
    return;
  }

  if (deleteTask) {
    snapshotData('before delete task');
    state.data.tasks = state.data.tasks.filter(t => t.id !== deleteTask.dataset.deleteTask);
    renderAll();
    return;
  }

  if (deleteGoal) {
    snapshotData('before delete goal');
    const goalId = deleteGoal.dataset.deleteGoal;
    state.data.goals = state.data.goals.filter(g => g.id !== goalId);
    state.data.tasks = state.data.tasks.map(task => task.goalId === goalId ? { ...task, goalId: '' } : task);
    renderAll();
  }
}

function clearData() {
  if (!confirm('Clear all goals and tasks?')) return;
  snapshotData('before clear all data');
  state.data = { goals: [], tasks: [] };
  renderAll();
}

function restoreBackup() {
  const backup = getBackup();
  if (!backup?.data) {
    alert('No backup is available yet.');
    return;
  }
  if (!confirm(`Restore backup from ${new Date(backup.savedAt).toLocaleString()}? Current data will be replaced.`)) return;
  localStorage.setItem(BACKUP_KEY, JSON.stringify({
    reason: 'before restore backup',
    savedAt: new Date().toISOString(),
    data: state.data,
  }));
  state.data = {
    goals: Array.isArray(backup.data.goals) ? backup.data.goals : [],
    tasks: Array.isArray(backup.data.tasks) ? backup.data.tasks : [],
  };
  renderAll();
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

el.goalForm.addEventListener('submit', addGoal);
el.taskForm.addEventListener('submit', addTask);
el.taskFilterGoal.addEventListener('change', renderTasks);
el.prevMonthBtn.addEventListener('click', () => { state.viewDate.setMonth(state.viewDate.getMonth() - 1); renderCalendar(); });
el.nextMonthBtn.addEventListener('click', () => { state.viewDate.setMonth(state.viewDate.getMonth() + 1); renderCalendar(); });
el.restoreBackupBtn.addEventListener('click', restoreBackup);
el.clearDataBtn.addEventListener('click', clearData);
document.body.addEventListener('click', handleClicks);

renderAll();
loadWeather();
setInterval(loadWeather, 30 * 60 * 1000);
