import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IupdateProdact } from 'src/app/shard/models/prodactUpdate';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-prodact',
  templateUrl: './update-prodact.component.html',
  styleUrls: ['./update-prodact.component.css']
})
export class UpdateProdactComponent implements OnInit {
  public id :any;
  public prodact:any;
  public errorMessage: any;
  constructor(private router: Router, private route: ActivatedRoute, private ProdactSe: ProdactsService) { }

  Form = new FormGroup({

    price: new FormControl(null, [
      Validators.required,
    ]),
    sale: new FormControl(null, [
      Validators.required,
    ]),
  });
  get sale() {
    return this.Form.get('sale');
  }

  get price() {
    return this.Form.get('price');
  }
  register() {
    const DataUser: IupdateProdact = {
      price: this.price?.value,
      sale: this.sale?.value,
    };
    this.ProdactSe.updateProadact(DataUser, this.id).subscribe((res: any) => {
      this.router.navigate(['prodacts/all-prodacts'])
    }, (err: any) => {
      if (err.status === 502) {
        this.errorMessage = err.error;
      }
      if (err.status === 501) {
        this.errorMessage = err.error.error;
      }
      if (err.status === 500) {
        this.errorMessage = err.error;
      }
      if (err.status === 400) {
        this.errorMessage = err.error;
      }
      if (err.error.error_en) {
        this.errorMessage = err.error.error_en;
      }
      if (err.error.error_ar) {
        this.errorMessage = err.error.error.ar;
      }
      if (err.status === 404) {
        this.errorMessage = err.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error;
      }
    })
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.ProdactSe.detailsProdact(this.id).subscribe((res:any)=>{
      this.prodact = res.prodact[0]

    })
  }

}
