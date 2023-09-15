import { Component, OnInit,Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  user: any;

  constructor(public auth: AuthService,@Inject(DOCUMENT) public document: Document,private storage: LocalStorageService) { 
    this.user= {};
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((success: any) => {
      this.user = success;
      console.log(this.user,":::user")
    });
    this.getAccessToken();
  }
  getAccessToken() {
    this.auth.getAccessTokenSilently().subscribe((res) => {
      console.log(res,":::res");
      this.storage.set("accessToken", res);
    });
  }
}
