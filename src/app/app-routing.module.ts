import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // home route
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/pages/home/home.module').then((m) => m.HomeModule)
      }
    ]
  },

  // details route
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'details/:plotId',
        loadChildren: () =>
          import('./views/pages/details/details.module').then(
            (m) => m.DetailsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
