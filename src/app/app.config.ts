import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { UserService } from './UserService/user.service';
import { provideHttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    UserService,
    provideHttpClient(),
    AgGridAngular,
     provideRouter(routes)]
};
