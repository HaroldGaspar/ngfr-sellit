import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentService, Message } from 'src/app/services/comment.service';

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css'],
})
export class ProductCommentComponent implements OnInit {
  coments$: Observable<Message[] | null>;
  product: number;

  constructor(private commentService: CommentService, route: ActivatedRoute) {
    this.product = +route.snapshot.paramMap.get('id')! || 1;

    this.coments$ = this.commentService.reviews$;
    this.commentService.getCommentsByProduct(this.product).subscribe();
  }

  ngOnInit(): void {}
}
