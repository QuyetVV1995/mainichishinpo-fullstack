import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../model/comment';
import { Post } from '../model/post';
import { User } from '../model/user';
import { CommentService } from '../_services/comment.service';
import { PostService } from '../_services/post.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  id: number;
  post: Post = new Post();
  user: User = new User();
  isLogin = false;
  newComment: Comment = new Comment() ;
  editComment: Comment = new Comment ;
  isEdit = false;
  editCommentId: number;
  editorText = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private tokenStoreService: TokenStorageService,
    private commentService: CommentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe(data => {
      this.post = data;
      this.editorText = data.content;

    });
    this.user = this.tokenStoreService.getUser();
    this.isLogin = !!this.user.id;
  }

  onSubmit(){
    this.saveComment();
  }

  private saveComment(){
    this.commentService.createComment(this.newComment, this.post.id, this.user.id).subscribe(data => {
      this.gotoPostDetail();
    }),
    error => console.log(error);
  }

  gotoPostDetail(){
    this.postService.getPostById(this.id).subscribe(data => {
      this.post = data;
    });
    this.newComment = new Comment();
    this.router.navigate(['post-detail', this.post.id]);
  }

  deleteComment(commentId: number){
    this.commentService.deleteComment(commentId, this.post.id).subscribe(data => {
      this.gotoPostDetail();
    }),
    error => console.log(error);
  }

  onEditSubmit(commentId: number){
    this.updateComment(commentId);
  }

  updateComment(commentId: number){
    this.commentService.editComment(commentId, this.editComment).subscribe(data => {
      this.gotoPostDetail();
    }),
    error => console.log(error);
  }

  toggleEdit(editCommentId: number){
    console.log(editCommentId);
    this.editCommentId = editCommentId;
    this.isEdit = !this.isEdit;
  }

}
