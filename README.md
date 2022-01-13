## Building
ng g c layout/footer
ng g c layout/navigation
ng g c layout/skeleton


=== PAGE | DOMAIN ===

ng g m pages/product --routing
|-ng g c pages/home
|--ng g c products/components/last
|--ng g c products/components/popular
|--ng g c products/components/product
|--ng g s products/services/products
|--products/interface/product

ng g c pages/product-dt -m=pages/home
|--ng g c pages/product-dt/components/product-detail m=pages/home
|--ng g c pages/product-dt/components/product-comment -m=pages/home
|--ng g c pages/product-dt/components/comment-form -m=pages/home
ng g s services/comment

ng g m pages/mystore --routing
|--ng g c pages/mystore
|--ng g c pages/mystore/components/product-form
|--ng g c pages/mystore/components/product-list
|--ng g c pages/mystore/components/product
ng g s services/comment

ng g m pages/cart --routing
|-ng g c pages/cart
|--ng g c cart/components/cart-detail 
|--ng g c cart/components/invoice-detail -m=pages/cart
|--ng g s cart/services/cart
|--cart/interface/cart

ng g c shared/components/cart -m=shared

ng g m shared no--routing -m=app
|--ng g c products/components/nav
|--ng g d products/directives/MainBgDirectives
|--ng g p products/pipes/To10First
|--ng g c shared/components/auth-nav
|--ng g c shared/components/product-loaders -m=shared/shared

ng g m pages/auth --routing
|-ng g c pages/auth
|--ng g c pages/auth/components/login -m=pages/auth
|--ng g c pages/auth/components/register -m=pages/auth
|--ng g s pages/auth/services/auth

ng g g auth/guard
ng g i auth/interceptor

ng g m products no--routing -m=app
