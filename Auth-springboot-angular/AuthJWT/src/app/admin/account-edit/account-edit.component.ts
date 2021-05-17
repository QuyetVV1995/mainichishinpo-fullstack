import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  user: User = new User();
  roleList: Role[];
  id: number;
  constructor(
    private route:ActivatedRoute,
    private accService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.accService.getAccById(this.id).subscribe(data => {
      this.user = data;
    });
    this.accService.getRole().subscribe(data => {
      this.roleList = data;
    });
    this.user.roles = [];
  }

  onChange(role: Role){

    this.user.roles.splice(0,1,role);
    console.log(this.user.roles)
  }

  onSubmit(){
    this.accService.updateAcc(this.user.id, this.user).subscribe(() => {
      this.gotoAdminManageAccount();
    });
  }

  gotoAdminManageAccount(){
    this.router.navigate(['admin-account']);
  }



}
