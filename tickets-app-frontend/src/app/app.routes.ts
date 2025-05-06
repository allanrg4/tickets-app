import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AgentComponent } from './pages/agent/agent.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ResolverComponent } from './pages/resolver/resolver.component';

export const routes: Routes = [
{
    path: 'login', component: LoginComponent
},
{
    path:'agent', component: AgentComponent
},
{
    path:'admin', component: AdminComponent
},
{
    path: 'resolver', component: ResolverComponent
},
{ path: '**', redirectTo: 'login' }
];
