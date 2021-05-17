import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartScales, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { map, tap } from 'rxjs/operators';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostData, PostService } from 'src/app/_services/post.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  user: User = new User();
  dataSource: PostData = null;
  lengthIndex: number[];
  pageEvent: PageEvent;
  displayedColums: string[] = ['id', 'title', 'content', 'username', 'create_at'];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      yAxes:[{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
  ];


  constructor(
    private postService: PostService,
    private tokenStoreService: TokenStorageService,
    private router: Router,
    private accService: AccountService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStoreService.getUser();
    this.postService.getPosts(0,10).pipe(
      tap(),
      map((postData: PostData) => this.dataSource = postData)
    ).subscribe();

    this.chartJS();
  }

  chartJS(){
    // reset label and data Chart
    this.lengthIndex = [];
    this.barChartLabels = [];
    this.accService.getAll().subscribe(dataAcc => {
      dataAcc.forEach(element => {
        this.postService.getAllPostByUserId(element.id).subscribe(dataPost => {
          this.lengthIndex.push(dataPost.length);
          this.barChartLabels.push(element.username);
        });
      });
      this.barChartData = [{
        data: this.lengthIndex,
        label: "Manage Post"
      }];
    });
  }


  onCreatePost(){
    this.router.navigate(['create-post']);
  }

  onEditPost(postId: number){
    this.router.navigate(['edit-post', postId]);
  }

  deletePost(postId: number){
    this.postService.deletePostById(postId).subscribe(() => {
      this.gotoAdminPost();
    });
  }

  gotoAdminPost(){
     this.postService.getPosts(0,10).pipe(
      tap(),
      map((postData: PostData) => this.dataSource = postData)
    ).subscribe();
    this.chartJS();
    this.router.navigate(['admin-post']);
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
