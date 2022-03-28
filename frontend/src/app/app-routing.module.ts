import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
      },

    ]
  },
  {
    path: 'agent',
    loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./supervisor/supervisor.module').then(m => m.SupervisorModule)
  },
  { path: '**', component: RootComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
