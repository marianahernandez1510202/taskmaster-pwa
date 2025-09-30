// app.js - Versión Vanilla JavaScript (sin React)

class TaskMasterApp {
  constructor() {
    this.isOnline = navigator.onLine;
    this.menuOpen = false;
    this.currentView = 'home';
    this.tasks = [];
    this.init();
  }

  init() {
    this.loadTasks();
    this.setupEventListeners();
    this.render();
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('pwa-tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    } else {
      this.tasks = [
        { id: 1, title: 'Completar proyecto PWA', completed: false, priority: 'alta' },
        { id: 2, title: 'Revisar documentación', completed: true, priority: 'media' },
        { id: 3, title: 'Probar modo offline', completed: false, priority: 'alta' }
      ];
      this.saveTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('pwa-tasks', JSON.stringify(this.tasks));
  }

  setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.render();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.render();
    });
  }

  addTask(title) {
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        priority: 'media'
      };
      this.tasks.push(newTask);
      this.saveTasks();
      this.render();
    }
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
    this.render();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.render();
  }

  changeView(view) {
    this.currentView = view;
    this.menuOpen = false;
    this.render();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.render();
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="min-h-screen bg-black flex flex-col">
        ${this.renderHeader()}
        <div class="flex-1 flex">
          ${this.renderSidebar()}
          ${this.renderOverlay()}
          ${this.renderMainContent()}
        </div>
        ${this.renderFooter()}
      </div>
    `;

    this.attachEventListeners();
  }

  renderHeader() {
    return `
      <header class="bg-gray-900 border-b-2 border-green-500 sticky top-0 z-50 shadow-lg shadow-green-500/50">
        <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button id="menuBtn" class="p-2 hover:bg-green-900 rounded-lg lg:hidden text-green-400">
              ☰
            </button>
            <h1 class="text-xl font-bold text-green-400">TaskMaster <span class="text-green-600">PWA</span></h1>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold ${this.isOnline ? 'text-green-400' : 'text-green-600'}">
              ${this.isOnline ? '🌐 Online' : '📡 Offline'}
            </span>
          </div>
        </div>
      </header>
    `;
  }

  renderSidebar() {
    const activeClass = (view) => this.currentView === view
      ? 'bg-green-600 text-black border-2 border-green-400 shadow-lg shadow-green-500/50'
      : 'hover:bg-green-900 text-green-400 border-2 border-transparent hover:border-green-500';

    return `
      <nav class="${this.menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r-2 border-green-500 shadow-lg shadow-green-500/30 transition-transform duration-300 ease-in-out flex flex-col mt-16 lg:mt-0">
        <div class="p-4 space-y-2 flex-1">
          <button data-view="home" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeClass('home')}">
            🏠 <span>Inicio</span>
          </button>
          <button data-view="tasks" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeClass('tasks')}">
            ✅ <span>Tareas</span>
          </button>
          <button data-view="settings" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${activeClass('settings')}">
            ⚙️ <span>Configuración</span>
          </button>
        </div>
      </nav>
    `;
  }

  renderOverlay() {
    return this.menuOpen ? `<div id="overlay" class="fixed inset-0 bg-black bg-opacity-80 z-30 lg:hidden"></div>` : '';
  }

  renderMainContent() {
    let content = '';
    switch (this.currentView) {
      case 'home':
        content = this.renderHome();
        break;
      case 'tasks':
        content = this.renderTasks();
        break;
      case 'settings':
        content = this.renderSettings();
        break;
    }

    return `<main class="flex-1 p-4 lg:p-8 max-w-6xl mx-auto w-full">${content}</main>`;
  }

  renderHome() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    return `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 rounded-lg p-6 text-green-400 border-2 border-green-500 shadow-lg shadow-green-500/50">
          <h2 class="text-2xl font-bold mb-2 text-green-300">Bienvenido a tu Gestor de Tareas</h2>
          <p class="text-green-400">Organiza tu día de manera eficiente</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-900 rounded-lg p-4 border-2 border-green-500 shadow-lg shadow-green-500/30">
            <div class="text-3xl font-bold text-green-400">${total}</div>
            <div class="text-green-300">Total de tareas</div>
          </div>
          <div class="bg-gray-900 rounded-lg p-4 border-2 border-green-500 shadow-lg shadow-green-500/30">
            <div class="text-3xl font-bold text-green-400">${completed}</div>
            <div class="text-green-300">Completadas</div>
          </div>
          <div class="bg-gray-900 rounded-lg p-4 border-2 border-green-500 shadow-lg shadow-green-500/30">
            <div class="text-3xl font-bold text-green-400">${pending}</div>
            <div class="text-green-300">Pendientes</div>
          </div>
        </div>
      </div>
    `;
  }

  renderTasks() {
    const tasksHTML = this.tasks.length === 0
      ? '<div class="text-center py-12 text-green-600"><p>No hay tareas. ¡Agrega una para comenzar!</p></div>'
      : this.tasks.map(task => `
          <div class="bg-gray-900 rounded-lg p-4 border-2 border-green-500 flex items-center gap-4 hover:shadow-lg hover:shadow-green-500/50 transition-all">
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-task-id="${task.id}" class="task-checkbox w-5 h-5 cursor-pointer accent-green-500">
            <div class="flex-1">
              <div class="font-medium ${task.completed ? 'line-through text-green-700' : 'text-green-400'}">
                ${task.title}
              </div>
              <div class="text-xs text-green-600 mt-1">
                Prioridad: <span class="font-semibold">${task.priority}</span>
              </div>
            </div>
            <button data-delete-id="${task.id}" class="delete-btn text-green-500 hover:text-green-300 p-2 hover:bg-green-900 rounded transition-colors">
              🗑️
            </button>
          </div>
        `).join('');

    return `
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-green-400">Mis Tareas</h2>
        
        <div class="flex gap-2">
          <input id="newTaskInput" type="text" placeholder="Nueva tarea..." class="flex-1 px-4 py-2 bg-gray-900 border-2 border-green-500 rounded-lg text-green-400 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400">
          <button id="addTaskBtn" class="bg-green-600 text-black px-6 py-2 rounded-lg hover:bg-green-500 flex items-center gap-2 font-bold border-2 border-green-400 shadow-lg shadow-green-500/50 transition-all">
            ➕ Agregar
          </button>
        </div>

        <div class="space-y-2">
          ${tasksHTML}
        </div>
      </div>
    `;
  }

  renderSettings() {
    return `
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-green-400">Configuración</h2>
        <div class="bg-gray-900 rounded-lg p-6 border-2 border-green-500 shadow-lg shadow-green-500/30 space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-green-800">
            <div>
              <div class="font-medium text-green-400">Estado de conexión</div>
              <div class="text-sm text-green-600">
                ${this.isOnline ? 'Conectado a internet' : 'Modo offline activo'}
              </div>
            </div>
            <div class="px-3 py-1 rounded-full text-sm font-bold ${this.isOnline ? 'bg-green-900 text-green-400 border border-green-500' : 'bg-gray-800 text-green-600 border border-green-700'}">
              ${this.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
          
          <div class="flex items-center justify-between py-3 border-b border-green-800">
            <div>
              <div class="font-medium text-green-400">Datos almacenados</div>
              <div class="text-sm text-green-600">${this.tasks.length} tareas en localStorage</div>
            </div>
          </div>

          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium text-green-400">Versión de la aplicación</div>
              <div class="text-sm text-green-600">v1.0.0 - PWA App Shell</div>
            </div>
          </div>
        </div>

       
      </div>
    `;
  }

  renderFooter() {
    return `
      <footer class="bg-gray-900 border-t-2 border-green-500 py-4 shadow-lg shadow-green-500/30">
        <div class="max-w-6xl mx-auto px-4 text-center text-sm text-green-500">
          <p>© 2025 TaskMaster PWA - Aplicación Web Progresiva con App Shell</p>
          <p class="mt-1 text-xs text-green-700">Funciona offline gracias a Service Workers y caché</p>
        </div>
      </footer>
    `;
  }

  attachEventListeners() {
    // Menu button
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => this.toggleMenu());
    }

    // Overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.toggleMenu());
    }

    // Navigation buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.changeView(e.currentTarget.dataset.view);
      });
    });

    // Add task
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTaskInput');
    if (addTaskBtn && newTaskInput) {
      addTaskBtn.addEventListener('click', () => {
        this.addTask(newTaskInput.value);
      });
      newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.addTask(newTaskInput.value);
        }
      });
    }

    // Toggle tasks
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.toggleTask(Number(e.target.dataset.taskId));
      });
    });

    // Delete tasks
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.deleteTask(Number(e.currentTarget.dataset.deleteId));
      });
    });
  }
}

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TaskMasterApp();
  });
} else {
  new TaskMasterApp();
}