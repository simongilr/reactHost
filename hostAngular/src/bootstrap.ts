import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { loadManifest } from '@angular-architects/module-federation';

async function loadRemoteEntries() {
  await loadManifest('assets/mf.manifest.json'); // Carga el manifest de los módulos remotos
}


if (environment.production) {
  enableProdMode();
}

  loadRemoteEntries().then(() => {
    // Inicializa la aplicación Angular
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });