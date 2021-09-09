import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public token:any;
  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

  }

}
