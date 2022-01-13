import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Review } from '@intefaces/Reviews';
import { Message, CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  review: Message = { comment: '', stars: 0, username: '' };
  reviewForm;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {
    this.productId = +(route.snapshot.paramMap.get('id') || 1);

    this.reviewForm = this.fb.group({
      stars: ['', [Validators.required]],
      comment: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  ngOnInit(): void {}

  get fm() {
    return this.reviewForm.controls;
  }

  addComent() {
    const tk = localStorage.getItem('token');
    if (tk) {
      const username = JSON.parse(atob(tk.split('.')[1])).username;
      const review: Review = {
        username,
        stars: this.fm['stars'].value,
        comment: this.fm['comment'].value,
      };
      this.commentService
        .createComment(review, this.productId)
        // .pipe((res) => this.commentService.updateReviewsObs(review))
        .subscribe();
      this.commentService.updateReviewsObs(review);
    }
  }
}
