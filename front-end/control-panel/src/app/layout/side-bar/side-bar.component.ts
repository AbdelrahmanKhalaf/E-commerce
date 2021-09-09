import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public token:any;
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

  }

}
