import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

import {MaterialInstanse, MaterialService} from "../shared/classes/material.service";
import {OrderService} from "./order.service";
import {OrderPosition} from "../shared/interfaces";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  isRoot: boolean;
  modal: MaterialInstanse;
  @ViewChild('modal') modalRef: ElementRef;

  constructor(private router: Router, private order: OrderService) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }
  
  ngOnDestroy() {
    this.modal.destroy();
  }
  
  ngAfterViewInit() {
   this.modal = MaterialService.initModal(this.modalRef);
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.modal.close();
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }
}
