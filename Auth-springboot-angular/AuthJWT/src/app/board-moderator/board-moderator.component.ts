import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/post';
import { Tag } from '../model/tag';
import { User } from '../model/user';
import { PostService } from '../_services/post.service';
import { TagService } from '../_services/tag.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss']
})
export class BoardModeratorComponent implements OnInit {

  user: User = new User();
  posts: Post[];


  constructor(
    private postService: PostService,
    private tokenStoreService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStoreService.getUser();

    this.postService.getAllPostByUserId(this.user.id).subscribe(data => {
      this.posts = data;
    });
  }


  onImportExcel(){
    this.router.navigate(['import-excel']);
  }
  onCreatePost(){
    this.router.navigate(['create-post']);
  }

  onEditPost(postId: number){
    this.router.navigate(['edit-post', postId]);
  }

  deletePost(postId: number){
    this.postService.deletePostById(postId).subscribe(() => {
      this.gotoManagePost();
    });
  }

  gotoManagePost(){
    this.postService.getAllPostByUserId(this.user.id).subscribe(data => {
      this.posts = data;
    });
    this.router.navigate(['post']);
  }

}
