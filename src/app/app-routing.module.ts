import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './components/app.component';


const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' }, 
  { path: '/app', redirectTo: 'app', pathMatch: 'full' }, 
  { path: '/about', redirectTo: 'about', pathMatch: 'full' }, 
  { path: 'app', component: AppComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
