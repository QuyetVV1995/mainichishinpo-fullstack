import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../model/post';
import { Tag } from '../model/tag';
import { User } from '../model/user';
import { PostService } from '../_services/post.service';
import { TagService } from '../_services/tag.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  post: Post = new Post();
  tags: Tag[];
  user: User;
  id: number;

  constructor(
    private tagService: TagService,
    private tokenStoreService: TokenStorageService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tagService.getAllTag().subscribe(data => {
      this.tags = data;
    });
    this.id = this.route.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe(data => {
      this.post = data;
      this.post.tag = [];
    });
    this.user = this.tokenStoreService.getUser();
  }

  onSubmit(){
      this.postService.updatePostById(this.post.id, this.post).subscribe(() => {
        if(this.user.roles.toString() == "ROLE_WRITER"){
          this.gotoManagePost();
        }
        if(this.user.roles.toString() == "ROLE_ADMIN"){
          this.gotoAdminManagePost();
        }
      });
  }

  onChange(tagCheck: Tag){
    this.post.tag.push(tagCheck);
  }

  gotoManagePost(){
    this.router.navigate(['post']);
  }

  gotoAdminManagePost(){
    this.router.navigate(['admin-post']);
  }

}
