import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ListAccountComponent } from './admin/list-account/list-account.component';
import { ListPostComponent } from './admin/list-post/list-post.component';
import { AccountCreateComponent } from './admin/account-create/account-create.component';
import { AccountEditComponent } from './admin/account-edit/account-edit.component'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FilterPipe} from './shared/filter.pipe';
import {MatInputModule} from '@angular/material/input';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { AdvetisementService } from './_services/advetisement.service';
import { AdvComponent } from './advertisement/adv.component';
import { HeroJobAdComponent } from './advertisement/hero-job-ad.component';
import { AdBannerComponent } from './advertisement/ad-banner.component';
import { AdDirective } from './advertisement/ad.directive';
import { KotobaComponent } from './advertisement/kotoba.component';
import { QuillModule} from 'ngx-quill'
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    PostDetailComponent,
    CreatePostComponent,
    CreatePostComponent,
    EditPostComponent,
    ListAccountComponent,
    ListPostComponent,
    AccountCreateComponent,
    AccountEditComponent,
    FilterPipe,
    ImportExcelComponent,
    AdvComponent,
    AdBannerComponent,
    AdDirective,
    HeroJobAdComponent,
    KotobaComponent

  ],
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule, ChartsModule, FontAwesomeModule,MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule, MatGridListModule,MatToolbarModule, MatIconModule,
    MatInputModule,
    QuillModule.forRoot()
  ],
  providers: [authInterceptorProviders, AdvetisementService]
})
export class AppModule { }
