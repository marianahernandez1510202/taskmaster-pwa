const fs = require('fs');
const path = require('path');

console.log('🔍 Validando configuración de PWA...\n');

let errors = 0;
let warnings = 0;

function validateManifest() {
  console.log('📄 Validando manifest.json...');
  const manifestPath = path.join(__dirname, '..', 'manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    console.error('  ❌ manifest.json no encontrado');
    errors++;
    return;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
    required.forEach(field => {
      if (!manifest[field]) {
        console.error(`  ❌ Campo requerido faltante: ${field}`);
        errors++;
      } else {
        console.log(`  ✅ ${field}: ${typeof manifest[field] === 'object' ? 'configurado' : manifest[field]}`);
      }
    });

    if (manifest.icons && manifest.icons.length >= 2) {
      const has192 = manifest.icons.some(icon => icon.sizes === '192x192');
      const has512 = manifest.icons.some(icon => icon.sizes === '512x512');
      
      if (has192 && has512) {
        console.log('  ✅ Íconos 192x192 y 512x512 presentes');
      } else {
        console.error('  ❌ Faltan íconos requeridos (192x192 y 512x512)');
        errors++;
      }
    } else {
      console.error('  ❌ Se requieren al menos 2 íconos');
      errors++;
    }

  } catch (e) {
    console.error('  ❌ Error al parsear manifest.json:', e.message);
    errors++;
  }
}

function validateServiceWorker() {
  console.log('\n🔧 Validando service-worker.js...');
  const swPath = path.join(__dirname, '..', 'service-worker.js');
  
  if (!fs.existsSync(swPath)) {
    console.error('  ❌ service-worker.js no encontrado');
    errors++;
    return;
  }

  const swContent = fs.readFileSync(swPath, 'utf8');
  
  const events = ['install', 'activate', 'fetch'];
  events.forEach(event => {
    if (swContent.includes(`addEventListener('${event}'`)) {
      console.log(`  ✅ Evento '${event}' implementado`);
    } else {
      console.error(`  ❌ Evento '${event}' no encontrado`);
      errors++;
    }
  });

  if (swContent.includes('caches.open') && swContent.includes('cache.addAll')) {
    console.log('  ✅ Estrategia de caché implementada');
  } else {
    console.error('  ❌ No se encontró implementación de caché');
    errors++;
  }
}

function validateIndexHTML() {
  console.log('\n📝 Validando index.html...');
  const indexPath = path.join(__dirname, '..', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('  ❌ index.html no encontrado');
    errors++;
    return;
  }

  const htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  if (htmlContent.includes('rel="manifest"')) {
    console.log('  ✅ Link al manifest presente');
  } else {
    console.error('  ❌ Link al manifest no encontrado');
    errors++;
  }

  if (htmlContent.includes('name="theme-color"')) {
    console.log('  ✅ Meta tag theme-color presente');
  } else {
    console.warn('  ⚠️  Meta tag theme-color no encontrado');
    warnings++;
  }

  if (htmlContent.includes('name="viewport"')) {
    console.log('  ✅ Meta tag viewport presente');
  } else {
    console.error('  ❌ Meta tag viewport no encontrado');
    errors++;
  }

  if (htmlContent.includes('serviceWorker.register')) {
    console.log('  ✅ Registro de Service Worker presente');
  } else {
    console.error('  ❌ Registro de Service Worker no encontrado');
    errors++;
  }
}

validateManifest();
validateServiceWorker();
validateIndexHTML();

console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN DE VALIDACIÓN');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('✅ ¡Todo perfecto! Tu PWA está correctamente configurada.');
} else {
  if (errors > 0) {
    console.log(`❌ Errores encontrados: ${errors}`);
  }
  if (warnings > 0) {
    console.log(`⚠️  Advertencias: ${warnings}`);
  }
}

console.log('='.repeat(50) + '\n');

process.exit(errors > 0 ? 1 : 0);