import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  private baseCommentUrl = 'http://localhost:8080/comment'


  constructor(
    private http: HttpClient,
  ) { }

  createComment(cmt: Comment, postId: number, userId: number): Observable<Object>{
   return this.http.post(`${this.baseCommentUrl}/create/${postId}/${userId}`, cmt);


  }

  deleteComment(commentId: number, postId: number): Observable<Object>{
    return this.http.delete(`${this.baseCommentUrl}/delete/${postId}/${commentId}`);
  }

  editComment(commentId: number, editComment: Comment): Observable<Object>{
    return this.http.put(`${this.baseCommentUrl}/edit/${commentId}`, editComment);
  }
}
