import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ShopingCartServiceService } from 'src/app/services/shoping-cart-service.service';
import { Product } from '../../../../interface/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-last',
  templateUrl: './last.component.html',
  styleUrls: ['./last.component.css'],
})
export class LastComponent implements OnInit {
  latestProducts: Observable<Product[] | null>; // | null = null;
  page: number;

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShopingCartServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.page = +route.snapshot.paramMap.get('page')! || 1;
    this.latestProducts = this.productService.productsAction$;
  }

  ngOnInit(): void {
    this.getLsProducts(this.page || 0);
  }

  getLsProducts(page: number) {
    this.productService
      .getLatestProducts(page)
      // .pipe(
      //   tap((products: Product[]) => {
      //     this.latestProducts = products;
      //   })
      // )
      .subscribe();
  }

  async updatePage() {
    this.page++;
    await this.router.navigateByUrl(`/last/${this.page}`);
    console.log('page', this.page);
    this.ngOnInit();
  }
}
