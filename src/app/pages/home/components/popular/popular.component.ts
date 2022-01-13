import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import {
  concat,
  fromEvent,
  interval,
  MonoTypeOperatorFunction,
  Observable,
  range,
  Subscription,
  take,
  tap,
  timer,
} from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('direct') direct: any;
  @Input() height = 500;
  @Input() isFullScreen = false;
  items: ICarouselItem[]; //Observable<ICarouselItem[]> | null = null; //
  items$: Observable<any>;
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  // mouseMove$: Subscription;
  // listener: () => void;

  constructor(private renderer: Renderer2, productService: ProductsService) {
    this.items$ = productService.popProductsAction$;
    this.items = [];
    productService.popProductsAction$.subscribe(
      (res: ICarouselItem[]) => (this.items = res)
    );
    productService.getPopularProducts().subscribe();
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`; //500px for default
    // this.mouseMove$ = fromEvent(document, 'click')
    //   .pipe(
    //     tap(
    //       (e: any) => console.log(`Cords: ${e.clientX}`),
    //       (err) => console.log(err),
    //       () => console.log('complete')
    //     )
    //   )
    //   .subscribe();
    // this.listener = () => console.log('not implemnted');
  }
  ngOnInit() {
    // const el = document.getElementById('elemento');
    // if (el) {
    //   this.listener = this.renderer.listen('document', 'click', (e) => {
    //     console.log('listen click', e.clientX);
    //   });
    // }
    // const timer = interval(1000).pipe(take(4));
    // const rango = range(1, 10);
    // const result = concat(timer, rango);
    // result.subscribe((x) => console.log(x));
  }
  ngAfterViewInit() {
    // const el = this.direct.nativeElement;
    // console.log(el);
    // if (el) {
    //   const mouseMove$ = fromEvent(el, 'click');
    //   mouseMove$.subscribe((e: any) => {
    //     console.log(`Cords: ${e.clientX}`);
    //   });
    // }
  }

  ngOnDestroy() {
    // this.listener(); //end listener
    // this.mouseMove$.unsubscribe();
  }

  //work step
  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find((i) => i.id === 0)!.marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      //es posible seguir
      finalPercentage = -100 * nextPosition;
    } else {
      //retornar al primero
      nextPosition = 0;
    }
    this.items.find((i) => i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find((i) => i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }
}

export interface ICarouselItem {
  id: number;
  product: Product;
  order?: string;
  marginLeft?: number;
}
