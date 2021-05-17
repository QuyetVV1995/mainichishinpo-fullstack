import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { AccountCreateComponent } from './admin/account-create/account-create.component';
import { AccountEditComponent } from './admin/account-edit/account-edit.component';
import { ListAccountComponent } from './admin/list-account/list-account.component';
import { ListPostComponent } from './admin/list-post/list-post.component';
import { AdvComponent } from './advertisement/adv.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HomeComponent } from './home/home.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent},
  { path: 'post', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'post-detail/:id', component: PostDetailComponent},
  { path: 'create-post', component: CreatePostComponent},
  { path: 'edit-post/:id', component: EditPostComponent},
  { path: 'admin-account', component: ListAccountComponent},
  { path: 'admin-post', component: ListPostComponent},
  { path: 'admin-account-create', component: AccountCreateComponent},
  { path: 'admin-account-edit/:id', component:AccountEditComponent},
  { path: 'import-excel', component: ImportExcelComponent},
  { path: 'adv', component: AdvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
