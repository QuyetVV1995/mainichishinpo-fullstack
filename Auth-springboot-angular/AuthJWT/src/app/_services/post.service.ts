import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { Post } from '../model/post';
import { catchError, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Kotoba } from '../model/kotoba.model';

export interface PostData{
  content: Post[],
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
  },
  totalPages: number,
  totalElements: number,
  numberOfElements: number
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL = "http://localhost:8080/post";

  constructor(
    private http: HttpClient,

  ) { }

  getListKotoba():Observable<Kotoba[]>{
    return this.http.get<Kotoba[]>(`${this.baseURL}/kotoba`);
  }

  getPostById(postId: number): Observable<Post>{
    return this.http.get<Post>(`${this.baseURL}/detail/${postId}`);
  }

  uploadExcel(form: FormData): Observable<Object>{
    return this.http.post(`${this.baseURL}/excel-file`, form);
  }

  uploadFile(form: FormData): Observable<Object>{
    return this.http.post(`${this.baseURL}/upload`, form);
  }

  downloadFile(imageName: string): Observable<Object>{
    return this.http.get(`${this.baseURL}/download/${imageName}`);
  }

  getAllPostByUserId(userId: number): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseURL}/allPost/${userId}`);
  }

  createPost(post: Post): Observable<Object>{
    console.log(post);
    return this.http.post(`${this.baseURL}/create`,  {
      title: post.title,
      content: post.content,
      create_at: post.create_at,
      tags: post.tag
    });
  }

  updatePostById(postId: number, post: Post): Observable<Object>{
    return this.http.put(`${this.baseURL}/edit/${postId}`, {
      title: post.title,
      content: post.content,
      tags: post.tag
    });
  }

  deletePostById(postId: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${postId}`);
  }

  getPosts(page: number, size: number): Observable<PostData>{
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get(`${this.baseURL}/all`, {params}).pipe(
      map((post: PostData) => post),
      catchError(err => throwError(err))
    );
  }

}
