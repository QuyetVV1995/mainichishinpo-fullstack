import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  accounts: User[];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(data => {
      this.accounts = data;
    });
  }

  onCreateAccount(){
    this.router.navigate(['admin-account-create']);
  }

  onEditAccount(userId: number){
    this.router.navigate(['admin-account-edit', userId]);
  }

  deleteAccount(id: number){
    this.accountService.deleteAccById(id).subscribe(() => {
      this.accountService.getAll().subscribe(data => {
        this.accounts = data;
      });
      this.gotoAdminManageAccount();
    });
  }

  gotoAdminManageAccount(){
    this.router.navigate(['admin-account']);
  }
}
