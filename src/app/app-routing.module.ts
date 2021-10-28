import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './components/app.component';


const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' }, // redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
