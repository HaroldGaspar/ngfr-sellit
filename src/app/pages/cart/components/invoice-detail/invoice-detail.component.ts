import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';
import * as actions from 'src/app/store/user.action';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit, AfterViewInit {
  total$ = this.shopingCartServiceService.totalAction$;
  cart$ = this.shopingCartServiceService.cartAction$;

  @ViewChild('jval') n: any;
  count$: Observable<number> | null = null;
  constructor(
    private shopingCartServiceService: ShopingCartServiceService,
    private store: Store<{ count: number }>
  ) {}

  ngOnInit(): void {
    this.count$ = this.store.pipe(select('count'));
  }

  ngAfterViewInit() {}

  increment() {
    this.store.dispatch(actions.inc());
  }
  decrement() {
    this.store.dispatch(actions.dec());
  }
  saltar() {
    this.store.dispatch(actions.saltar({ num: this.n.nativeElement.value }));
  }
}
