import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { Kotoba } from '../model/kotoba.model';
import { Post } from '../model/post';
import { PostData, PostService } from '../_services/post.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageEvent: PageEvent;
  dataSource: PostData = null;
  displayedColums: string[] = ['id', 'title', 'content', 'username', 'create_at'];
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  kotobas: Kotoba[];

  constructor(private userService: UserService,
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.postService.getPosts(0,9).pipe(
      tap(),
      map((postData: PostData) => this.dataSource = postData)
    ).subscribe(
    );

    this.postService.getListKotoba().subscribe(data => {
      this.kotobas = data;
    });


  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;
    this.postService.getPosts(page, size).pipe(
      tap(),
      map((postData: PostData) => this.dataSource = postData)
    ).subscribe();
  }

}
