import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/admin/login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { NgChartsModule } from 'ng2-charts';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      NgChartsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'vi'  // Đặt mặc định là tiếng Việt
      })
    )
  ]
}).catch(err => console.error(err));
