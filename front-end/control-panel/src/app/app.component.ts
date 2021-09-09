import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './shard/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'control-panel';
  public token:any;
  public chackeLogin :any
  constructor(private auth: AuthService , private route : ActivatedRoute , private router: Router) { }
  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      this.router.navigate(["/auth/login"])
    }
    this.token = localStorage.getItem('token');

  }
}
