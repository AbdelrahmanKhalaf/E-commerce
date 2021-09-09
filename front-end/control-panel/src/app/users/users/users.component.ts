import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shard/servises/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: any = [];
  public errorMessage:any;
  constructor(private userServe : UsersService) { }

  ngOnInit(): void {
    this.userServe.getUsers().subscribe((res:any)=>{
      console.log(res);
      this.users = res
    },(err:any)=>{
      console.log(err);
      if (err.status === 500) {
        this.errorMessage = err.error;
      }

    })
  }

}
