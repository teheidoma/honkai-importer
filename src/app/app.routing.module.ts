import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppPageWishComponent} from "./app-page-wish/app-page-wish.component";
import {AppPageTimeComponent} from "./app-page-time/app-page-time.component";
import {AppPageHomeComponent} from "./app-page-home/app-page-home.component"; // CLI imports router

const routes: Routes = [
  {path: '', component: AppPageHomeComponent},
  {path: 'wish/standard', component: AppPageWishComponent, data: {gacha_type: 1}},
  {path: 'wish/event', component: AppPageWishComponent, data: {gacha_type: 11}},
  {path: 'wish/weapon', component: AppPageWishComponent, data: {gacha_type: 12}},
  {path: 'time', component: AppPageTimeComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
