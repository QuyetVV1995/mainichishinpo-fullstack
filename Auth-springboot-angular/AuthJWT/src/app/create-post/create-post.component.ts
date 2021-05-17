
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../model/comment';

import { Post } from '../model/post';
import { Tag } from '../model/tag';
import { User } from '../model/user';
import { PostService } from '../_services/post.service';
import { TagService } from '../_services/tag.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { from } from 'rxjs';
import { Role } from '../model/role';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  post: Post = new Post();
  tags: Tag[];
  user: User;
  selectedFile: File;
  imageSrc: string;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  model: string = '';
  uploadForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });

  @ViewChild('editor') editor;
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'],
      ['image', 'code-block']
    ]
  };


  constructor(
    private tagService: TagService,
    private tokenStoreService: TokenStorageService,
    private postService: PostService,
    private router: Router
  ) { }
  get f(){
    return this.uploadForm.controls;
  }

  ngOnInit(): void {
    this.tagService.getAllTag().subscribe(data => {
      this.tags = data;
    });
    this.post.tag = [];
    this.user = this.tokenStoreService.getUser();
  }

  changeEditor(event: EditorChangeContent | EditorChangeSelection){
    console.log(event);
  }

  onSubmit(){
    this.post.user = this.user;
    this.post.create_at = new Date();
    this.createPost();
  }

  onChange(tagCheck: Tag){
    this.post.tag.push(tagCheck);
  }

  uploadFile(){
   const formData = new FormData();
   formData.append('file', this.selectedFile, this.selectedFile.name);
   this.postService.uploadFile(formData).subscribe(() => {
   });
  }

  public onFileChange(event) {
    //Select File
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

    }
    // this.selectedFile = event.target.files[0];
    // this.uploadFile();
  }

  createPost(){

    this.post.title = this.uploadForm.value.title;
    this.post.content = this.uploadForm.value.content;

    console.log(this.post);

    this.postService.createPost(this.post).subscribe(() => {
      if(this.user.roles.toString() == "ROLE_WRITER"){
        this.gotoManagePost();
      }
      if(this.user.roles.toString() == "ROLE_ADMIN"){
        this.gotoAdminManagePost();
      }
    });
  }

  gotoManagePost(){
    this.router.navigate(['post']);
  }

  gotoAdminManagePost(){
    this.router.navigate(['admin-post']);
  }

}
