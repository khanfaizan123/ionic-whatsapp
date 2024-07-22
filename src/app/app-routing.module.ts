import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
 
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepagePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'selectcontact',
    loadChildren: () => import('./pages/selectcontact/selectcontact.module').then(m => m.SelectcontactPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-chat',
    loadChildren: () => import('./pages/user-chat/user-chat.module').then(m => m.UserChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
