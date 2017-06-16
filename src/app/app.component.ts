import { Component, OnInit } from '@angular/core';
import { IOrder } from "./models/order.model";
import { OrderService } from "./services/order.service";
import { IMenu } from "./models/menu.model";
import { MenuService } from "./services/menu.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app works!';
  orders: IOrder[];
  chickenMenu: IMenu[];
  burgerMenu: IMenu[];
  dessertMenu: IMenu[];
  Menu: IMenu[];
  //total price 
  totalPrice: number;
  tva: number = 0.2;
  priceTva: number;
  totalTva: number;
  remise: number = 0;
  categories: Array<any>;
  frmRemise: FormGroup;
  frmSearch: FormGroup;
  ngOnInit(): void {
    this.categories = this.getCategories();
    this.frmRemise = new FormGroup({
      remiseValue: new FormControl('', [
        Validators.required,
      ])
    });
    this.frmSearch = new FormGroup({
      textSearch: new FormControl('', Validators.maxLength(12))
    });
  }
  totalCalc() {
    this.totalPrice = this._orderService.GetTotalOrderPrice() - this.remise;
    this.priceTva = this.totalPrice * this.tva;
    this.totalTva = this.totalPrice + this.priceTva;
  }
  showRemise() {
    return true;
  }
  hideRemise() {
    return false;
  }
  onRemise() {
    /*if (this.remise == 0) {
      this.remise = this.frmRemise.value.remiseValue;
      this.totalPrice = this.totalPrice - this.remise;
      this.totalCalc();
    } else {*/
    let oldremise = this.remise;
    let newRemise = this.frmRemise.value.remiseValue;
    this.remise = newRemise;
    this.totalCalc();
    /* }*/
  }
  currentDate: string = new Date().toLocaleDateString();
  getCategories() {
    return this.categories = this._menuService.getCategories();
  }
  getMenuOfCategory(categoryName: string) {
    this.Menu = this._menuService.GetMenu(categoryName);
  }
  constructor(
    private _orderService: OrderService,
    private _menuService: MenuService) {
    this.orders = this._orderService.GetOrders();
    this.chickenMenu = this._menuService.GetMenu('chicken');
    this.burgerMenu = this._menuService.GetMenu('burger');
    this.dessertMenu = this._menuService.GetMenu('dessert');
    this.Menu = this._menuService.GetMenuAll();
    this.totalCalc();
    console.log('test me: ' + this.categories);

    console.log("burger menu", this.burgerMenu);
  }
  onSearch(text: string) {
    this.Menu = this._menuService.GetMenu(text);
  }
  onAdd(key) {
    this._orderService.AddOrder(key);
    this.totalCalc();
  }

  // add item to order
  onAddToOrder(key) {
    console.log(key);
    this._orderService.AddToOrder(key);
    this.totalCalc();
  }
  //clear order
  onClearOrders() {
    this._orderService.ClearOrder();
    this.totalCalc();
  }

  //check ouut
  onCheckout() {
    this.totalCalc();
    let total = this.totalTva;
    this._orderService.ClearOrder();
    this.priceTva = 0;
    this.totalTva = 0;
    this.remise = 0;
    return alert("Total Price : " + total + "\nThank You!");


  }
  // minus item from order --
  onMinus(key) {
    this._orderService.MinusOrder(key);

    this.totalCalc();
  }

  // delete item from order
  onRemoveOrder(key) {
    this._orderService.DeleteOder(key);

    this.totalCalc();
  }




}
