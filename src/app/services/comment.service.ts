import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@intefaces/Reviews';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  BASE_URL: string = environment.backend_base_url;

  private ReviewsSubject = new BehaviorSubject<Message[] | null>(null);
  get reviews$(): Observable<Message[] | null> {
    return this.ReviewsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  getCommentsByProduct(productId: number): Observable<Message[]> {
    return this.http
      .get<Message[]>(`${this.BASE_URL}/reviews?product=${productId}`)
      .pipe(tap((reviews) => this.ReviewsSubject.next(reviews)));
  }

  createComment(review: Review, product: number) {
    return this.http.post(`${this.BASE_URL}/reviews/${product}`, review);
  }

  updateReviewsObs(review: Message) {
    let reviewsList = null;
    this.reviews$.subscribe((res) => (reviewsList = res));
    if (reviewsList !== null)
      this.ReviewsSubject.next([...reviewsList, review]);
  }
}

export interface Message {
  id?: number;
  comment: string;
  stars: number;
  username: string;
}
