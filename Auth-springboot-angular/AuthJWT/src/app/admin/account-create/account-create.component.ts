import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  user: User = new User();
  roleList: Role[];

  constructor(
    private accService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accService.getRole().subscribe(data => {
      this.roleList = data;
    });
    this.user.roles = [];
  }

  onSubmit(){
    this.accService.createAcc(this.user).subscribe(() => {
      this.gotoAdminManageAccount();
    });
  }

  gotoAdminManageAccount(){
    this.router.navigate(['admin-account']);
  }

  onChange(role: Role){
    this.user.roles.push(role);
  }
}
