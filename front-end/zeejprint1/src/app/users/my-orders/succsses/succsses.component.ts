import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-succsses',
  templateUrl: './succsses.component.html',
  styleUrls: ['./succsses.component.css']
})
export class SuccssesComponent implements OnInit {
  public name :any
  constructor(private order: ProdactsService, private route: ActivatedRoute, private router: Router) { }
  public session_id: any;
  ngOnInit(): void {

  }

}
