import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import {OrderService} from "./services/order.service";
import {MenuService} from "./services/menu.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,ReactiveFormsModule, 
  ],
  providers: [OrderService,
  MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
