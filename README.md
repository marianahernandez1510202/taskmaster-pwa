# 📱 TaskMaster PWA - Gestor de Tareas Cyberpunk

> Progressive Web App profesional con arquitectura App Shell, tema cyberpunk (negro y verde neón), funcionamiento offline completo y soporte multi-dispositivo.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen)
![Offline](https://img.shields.io/badge/Offline-Supported-success)
![License](https://img.shields.io/badge/license-MIT-blue)

**🌐 Demo en vivo:** [https://taskmaster-pwa.onrender.com](https://tu-app.onrender.com)

---

## 📑 Tabla de Contenidos

1. [¿Qué es esta aplicación?](#-qué-es-esta-aplicación)
2. [Características principales](#-características-principales)
3. [Demo en vivo](#-demo-en-vivo)
4. [Instalación local](#-instalación-local)
5. [Desplegar en Render](#-desplegar-en-render)
6. [Arquitectura App Shell](#-arquitectura-app-shell)
7. [Service Worker](#-service-worker)
8. [Funcionamiento offline](#-funcionamiento-offline)
9. [Personalización](#-personalización)
10. [Troubleshooting](#-troubleshooting)
11. [Contribuir](#-contribuir)
12. [Licencia](#-licencia)

---

## 🎯 ¿Qué es esta aplicación?

**TaskMaster PWA** es una Progressive Web App completa para gestionar tareas diarias con:

### ✨ Características Principales:
- 📱 **Instalable** en cualquier dispositivo (Android, iOS, Windows, Mac)
- 📴 **Funciona offline** completamente
- 🚀 **Carga instantánea** (App Shell en caché)
- 💾 **Persistencia local** de datos
- 🎨 **Tema cyberpunk** (negro y verde neón)
- 🔄 **Actualizaciones automáticas**
- 📦 **Ultra ligero** (<200KB)

### 🎨 Diseño:
- ⚫ Fondo negro puro (#000000)
- 🟢 Acentos verde neón (#22c55e)
- ✨ Efectos de resplandor y sombras
- 💫 Animaciones suaves
- 📱 Totalmente responsive

---

## 🌐 Demo en Vivo

**Accede a la aplicación desplegada:**

🔗 **[https://taskmaster-pwa.onrender.com](https://tu-app.onrender.com)**

**Pruébala:**
1. Abre el link en tu navegador
2. Prueba agregar/completar/eliminar tareas
3. Instálala en tu dispositivo (botón + en la barra)
4. Activa modo avión y verifica que funciona offline

---

## 💻 Instalación Local

### Requisitos Previos

- **Node.js** v14+ ([Descargar](https://nodejs.org/))
- **Git** ([Descargar](https://git-scm.com/))
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

### Pasos de Instalación

**1. Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/taskmaster-pwa.git
cd taskmaster-pwa
```

**2. Instalar dependencias:**
```bash
npm install
```

**3. Iniciar servidor de desarrollo:**
```bash
npm start
```

**4. Abrir en navegador:**
```
http://localhost:3000
```

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Validar configuración PWA
npm run validate

# Auditoría con Lighthouse
npm run test

# Generar reporte de auditoría
npm run audit
```

---

## 🚀 Desplegar en Render

### Método 1: Desde GitHub (Recomendado)

#### Paso 1: Preparar el Repositorio

**A) Subir código a GitHub:**

```bash
# Inicializar repositorio Git (si no lo has hecho)
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Initial commit - TaskMaster PWA"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/taskmaster-pwa.git

# Subir código
git push -u origin main
```

#### Paso 2: Crear Cuenta en Render

1. Ir a **[https://render.com](https://render.com)**
2. Click en **"Get Started for Free"**
3. Registrarse con GitHub (recomendado) o email
4. Confirmar email si es necesario

#### Paso 3: Crear Nuevo Web Service

1. En el dashboard, click **"New +"**
2. Seleccionar **"Web Service"**
3. Click **"Connect a repository"** (conectar GitHub si no lo has hecho)
4. Buscar tu repositorio: **taskmaster-pwa**
5. Click **"Connect"**

#### Paso 4: Configurar el Servicio

**Configuración básica:**

| Campo | Valor |
|-------|-------|
| **Name** | `taskmaster-pwa` (o el nombre que prefieras) |
| **Region** | Elige el más cercano (ej: Oregon, Frankfurt) |
| **Branch** | `main` |
| **Root Directory** | (dejar vacío) |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

**Plan:**
- Selecciona **"Free"** (gratis)
- 0 USD/mes
- Se apaga después de 15 min de inactividad
- Suficiente para desarrollo y demos

#### Paso 5: Variables de Entorno (Opcional)

No necesitas configurar variables de entorno para esta app básica.

#### Paso 6: Desplegar

1. Scroll down
2. Click **"Create Web Service"**
3. Espera ~2-5 minutos mientras se despliega

**Proceso de deployment:**
```
📦 Clonando repositorio...
⬇️ Instalando dependencias...
🔨 Ejecutando build...
🚀 Iniciando servidor...
✅ Deployment exitoso!
```

#### Paso 7: Obtener URL

Una vez completado, verás:
```
Your service is live at https://taskmaster-pwa.onrender.com
```

**🎉 ¡Tu PWA está en línea!**

### Método 2: Deploy Manual (Sin GitHub)

#### Paso 1: Preparar el Proyecto

**A) Instalar Render CLI:**
```bash
npm install -g render-cli
```

**B) Login:**
```bash
render login
```

#### Paso 2: Crear render.yaml

Crea un archivo `render.yaml` en la raíz:

```yaml
services:
  - type: web
    name: taskmaster-pwa
    env: node
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /
    envVars:
      - key: NODE_VERSION
        value: 18
```

#### Paso 3: Deploy

```bash
render deploy
```

### Configuración Post-Deploy

#### 1. Actualizar URLs en el Código

**En `manifest.json`:**
```json
{
  "start_url": "/",
  "scope": "/"
}
```

**En `service-worker.js`:**
```javascript
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];
```

✅ **No necesitas cambiar nada si usaste rutas relativas**

#### 2. Configurar Dominio Personalizado (Opcional)

**En Render Dashboard:**
1. Ir a tu servicio
2. Settings → Custom Domains
3. Agregar tu dominio: `taskmaster.tudominio.com`
4. Configurar DNS según instrucciones
5. Render configura HTTPS automáticamente

#### 3. Verificar HTTPS

Render provee HTTPS automáticamente:
- ✅ Certificado SSL gratis
- ✅ Renovación automática
- ✅ Redirección HTTP → HTTPS

**Verificar:**
```
https://tu-app.onrender.com
```

Debe mostrar el candado 🔒 en el navegador.

### Actualizaciones Automáticas

**Render se actualiza automáticamente cuando haces push a GitHub:**

```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización de características"
git push origin main
```

**Render automáticamente:**
1. Detecta el push
2. Clona el nuevo código
3. Ejecuta build
4. Despliega la nueva versión

**Ver logs en tiempo real:**
```
Dashboard → Tu servicio → Logs
```

### Monitoreo y Logs

**Ver logs en vivo:**
1. Dashboard → Tu servicio
2. Tab **"Logs"**
3. Ver logs en tiempo real

**Logs incluyen:**
- Peticiones HTTP
- Errores de la aplicación
- Información de deployment
- Service Worker logs

### Plan Free de Render

**Características:**
- ✅ 750 horas/mes gratis
- ✅ HTTPS incluido
- ✅ Deploy automático desde Git
- ✅ Logs en tiempo real
- ⚠️ Se apaga después de 15 min de inactividad
- ⚠️ Primer request después de inactividad toma ~30 seg

**Para mantenerla activa 24/7:**
- Upgrade a plan Starter ($7/mes)
- O usar un servicio de ping externo

### Troubleshooting Deploy

#### Error: "Build failed"

**Solución:**
```bash
# Verificar que package.json esté correcto
cat package.json

# Verificar que node_modules no esté en Git
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

#### Error: "Start command failed"

**Verificar start command:**
```json
// package.json
{
  "scripts": {
    "start": "http-server -p 3000 -c-1"
  }
}
```

**O especificar en Render:**
```
Start Command: node_modules/.bin/http-server -p $PORT -c-1
```

#### App no responde

**Verificar puerto:**
```javascript
// Render asigna puerto dinámico
const PORT = process.env.PORT || 3000;
```

**En package.json:**
```json
"start": "http-server -p ${PORT:-3000} -c-1"
```

#### Service Worker no funciona

**Verificar HTTPS:**
- Service Workers requieren HTTPS
- Render provee HTTPS automáticamente
- Verificar que la URL use `https://`

---

## 🏗️ Arquitectura App Shell

### Estructura del App Shell

```
┌─────────────────────────────────────┐
│    HEADER (Negro + Borde Verde)    │ ← Caché permanente
│  - Logo: TaskMaster PWA             │
│  - Estado: Online/Offline           │
├──────────┬──────────────────────────┤
│          │                          │
│ SIDEBAR  │   MAIN CONTENT           │
│ (Negro)  │   (Dinámico)             │
│          │                          │
│ 🏠 Inicio│   ┌──────────────────┐   │
│ ✅ Tareas│   │ Vista Home       │   │
│ ⚙️ Config│   │ o Tasks          │   │
│          │   │ o Settings       │   │
│          │   └──────────────────┘   │
├──────────┴──────────────────────────┤
│    FOOTER (Negro + Borde Verde)    │ ← Caché permanente
│    © 2025 TaskMaster PWA            │
└─────────────────────────────────────┘
```

### Componentes

**App Shell (Siempre en caché):**
- Header con navegación
- Sidebar con menú
- Footer con info
- Estilos CSS principales
- JavaScript base

**Contenido Dinámico (Cambia por vista):**
- Dashboard (Home)
- Lista de tareas (Tasks)
- Configuración (Settings)

### Ventajas del App Shell

✅ **Carga instantánea** desde caché  
✅ **Funciona offline** completamente  
✅ **UX mejorada** (usuario ve UI inmediatamente)  
✅ **Separación clara** UI vs Datos  
✅ **Actualizaciones eficientes** (solo contenido dinámico)  

---

## ⚙️ Service Worker

### ¿Qué hace?

El Service Worker permite:
- 📴 Funcionamiento offline
- ⚡ Carga instantánea (desde caché)
- 🔄 Actualizaciones en segundo plano
- 📱 Instalación como app nativa

### Estrategia: Cache First

```javascript
1. Usuario solicita archivo
   ↓
2. Service Worker intercepta
   ↓
3. ¿Está en caché?
   ├─ SÍ → Devuelve desde caché (instantáneo)
   └─ NO → Descarga de red + guarda en caché
   ↓
4. Archivo disponible offline para próximas veces
```

### Archivos en Caché

```javascript
const urlsToCache = [
  '/',                       // index.html
  '/index.html',             
  '/app.js',                 // Lógica JavaScript
  '/manifest.json',          // Manifest PWA
  '/icons/icon-192.png',     // Ícono pequeño
  '/icons/icon-512.png'      // Ícono grande
];
```

### Ciclo de Vida

```
INSTALACIÓN
    ↓
Cachea App Shell
    ↓
ACTIVACIÓN
    ↓
Limpia cachés antiguas
    ↓
FETCH
    ↓
Sirve desde caché o red
    ↓
ACTUALIZACIÓN
    ↓
Nueva versión disponible
```

### Verificar Service Worker

**Chrome DevTools:**
```
F12 → Application → Service Workers

Debe mostrar:
✅ service-worker.js
   Status: activated and is running
```

---

## 📴 Funcionamiento Offline

### ¿Cómo funciona?

**Primera visita (CON internet):**
1. Usuario visita la app
2. Service Worker se instala
3. Cachea el App Shell
4. Guarda archivos necesarios

**Siguientes visitas (SIN internet):**
1. Usuario abre la app
2. Service Worker intercepta peticiones
3. Sirve archivos desde caché
4. App funciona completamente

### Datos Persistentes

**LocalStorage para tareas:**
```javascript
// Guardar
localStorage.setItem('pwa-tasks', JSON.stringify(tasks));

// Recuperar
const tasks = JSON.parse(localStorage.getItem('pwa-tasks'));
```

**Características:**
- 💾 5-10MB de almacenamiento
- 📴 Disponible offline
- 🔄 Persiste entre sesiones
- 🔒 Por dominio

### Probar Modo Offline

**Método 1 - DevTools:**
1. F12 → Network
2. Cambiar a "Offline"
3. Recargar (F5)
4. ✅ Debe funcionar

**Método 2 - Modo Avión:**
1. Activar modo avión
2. Abrir app
3. ✅ Todo funcional

**Método 3 - Desconectar WiFi:**
1. Desconectar internet
2. Recargar app
3. Indicador "Offline" aparece
4. ✅ App completamente funcional

---

## 🎨 Personalización

### Cambiar Colores

**1. manifest.json:**
```json
{
  "theme_color": "#TU-COLOR",
  "background_color": "#TU-FONDO"
}
```

**2. index.html:**
```html
<meta name="theme-color" content="#TU-COLOR">
```

**3. Estilos en app.js:**
Buscar y reemplazar:
- `#22c55e` → Tu color primario
- `#000000` → Tu color de fondo

### Cambiar Nombre

**manifest.json:**
```json
{
  "name": "Mi App Increíble",
  "short_name": "MiApp"
}
```

**index.html:**
```html
<title>Mi App</title>
```

### Agregar Nuevas Funcionalidades

**Ejemplo: Agregar categorías a tareas**

```javascript
// Estructura de tarea extendida
{
  id: Date.now(),
  title: "Mi tarea",
  completed: false,
  priority: "alta",
  category: "trabajo",  // ← Nuevo campo
  dueDate: "2025-12-31" // ← Nuevo campo
}
```

---

## 📱 Instalación en Dispositivos

### Android (Chrome)

1. Abrir app en Chrome
2. Menú (⋮) → "Instalar aplicación"
3. Confirmar
4. ✅ Ícono en pantalla de inicio

### iOS (Safari)

1. Abrir en Safari
2. Botón Compartir → "Agregar a pantalla de inicio"
3. Confirmar
4. ✅ Ícono en pantalla de inicio

### Windows/Mac (Chrome/Edge)

1. Buscar ícono **+** en barra de direcciones
2. "Instalar TaskMaster"
3. Confirmar
4. ✅ Aplicación instalada

---

## 🐛 Troubleshooting

### Service Worker no se registra

**Solución:**
- Verificar que estés en HTTPS o localhost
- Verificar que `service-worker.js` esté en la raíz
- Revisar Console (F12) por errores

### No funciona offline

**Solución:**
1. Verificar SW activo: `DevTools → Application → Service Workers`
2. Verificar caché: `DevTools → Application → Cache Storage`
3. Visitar con internet primero, luego probar offline

### Cambios no se reflejan

**Solución:**
```javascript
// Cambiar versión de caché en service-worker.js
const CACHE_NAME = 'taskmaster-pwa-v2'; // v1 → v2
```

O hacer hard reload:
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Puerto 3000 ocupado

**Solución:**
```bash
npm start -- -p 3001
```

O editar `package.json`:
```json
"start": "http-server -p 8080 -c-1"
```

---

## 📊 Estructura del Proyecto

```
taskmaster-pwa/
├── index.html              # Página principal
├── manifest.json           # Configuración PWA
├── service-worker.js       # Service Worker
├── app.js                  # Lógica de la app
├── package.json            # Dependencias npm
├── README.md               # Esta documentación
├── .gitignore              # Archivos ignorados
│
├── icons/                  # Íconos de la app
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png       # ⚠️ OBLIGATORIO
│   ├── icon-384.png
│   └── icon-512.png       # ⚠️ OBLIGATORIO
│
└── scripts/               # Scripts de utilidad
    └── validate-pwa.js    # Validador PWA
```

---

## 🧪 Testing

### Validación Local

```bash
npm run validate
```

### Auditoría Lighthouse

```bash
npm run test
```

**O manualmente:**
1. F12 → Lighthouse
2. Seleccionar "Progressive Web App"
3. "Analyze page load"
4. Puntuación esperada: 100/100

### Pruebas Funcionales

**Checklist:**
- [ ] Agregar tarea
- [ ] Completar tarea
- [ ] Eliminar tarea
- [ ] Cambiar entre vistas
- [ ] Funciona offline
- [ ] Se puede instalar
- [ ] Datos persisten al recargar

---

## 🤝 Contribuir

### Cómo Contribuir

1. Fork el repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Guía de Estilo

**JavaScript:**
- Usar `const`/`let`, no `var`
- Nombres descriptivos
- Comentarios claros

**CSS:**
- Usar Tailwind classes
- Mantener tema cyberpunk
- Responsive first

---

## 📄 Licencia

MIT License - Libre para uso personal y comercial

```
Copyright (c) 2025 Tu Nombre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🎓 Recursos Adicionales

### Documentación

- [PWA Official Docs](https://web.dev/progressive-web-apps/)
- [Service Workers API](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/docs/Web/Manifest)

### Herramientas

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Real Favicon Generator](https://realfavicongenerator.net/)

### Tutoriales

- [Google PWA Training](https://web.dev/learn/pwa/)
- [MDN Web Docs](https://developer.mozilla.org/docs/Web/Progressive_web_apps)

---

## 💡 FAQ

### ¿Funciona sin internet?

**Sí, completamente.** Una vez que visitas la app con internet, todo el App Shell se guarda en caché y funciona 100% offline.

### ¿Cuánto espacio ocupa?

**< 200KB.** Mucho más ligera que apps nativas (50+ MB).

### ¿Se puede usar en iPhone?

**Sí.** Safari soporta PWAs, aunque con algunas limitaciones (no notificaciones push).

### ¿Es seguro?

**Sí.** Render provee HTTPS automáticamente y los datos se guardan localmente en el dispositivo.

### ¿Cuánto cuesta Render?

**Gratis** con el plan Free (suficiente para desarrollo y demos). Plans pagos desde $7/mes para producción.

---

## 📞 Soporte

### ¿Necesitas ayuda?

- 📧 **Email:** tu-email@ejemplo.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/tu-usuario/taskmaster-pwa/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/tu-usuario/taskmaster-pwa/discussions)

---

## 🎉 Agradecimientos

- **Anthropic** por Claude AI
- **Google** por las guías de PWA
- **Mozilla** por MDN docs
- **Render** por hosting gratuito
- **Comunidad Open Source**

---

<div align="center">

**Desarrollado con ❤️ como ejemplo de PWA profesional**

**Tema Cyberpunk: Negro y Verde Neón 🟢⚫**

⭐ Si te fue útil, dale una estrella en GitHub ⭐

[Ver Demo](https://taskmaster-pwa.onrender.com) • 
[Reportar Bug](https://github.com/tu-usuario/taskmaster-pwa/issues) • 
[Documentación](https://github.com/tu-usuario/taskmaster-pwa/wiki)

**Versión:** 1.0.0 | **Estado:** ✅ Producción Ready

</div>