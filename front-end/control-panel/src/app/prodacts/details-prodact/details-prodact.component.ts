import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-details-prodact',
  templateUrl: './details-prodact.component.html',
  styleUrls: ['./details-prodact.component.css']
})
export class DetailsProdactComponent implements OnInit {
  public Id :any;
  public prodact:any
  public error:any;
  public errorMessage:any;
  public message:any
  public imge:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public size:any;
  public Chack:any
  constructor(private route : ActivatedRoute   , private prodactServies : ProdactsService , private router :Router) { }

  ngOnInit(): void {
    this.Chack = false
    this.Id = this.route.snapshot.paramMap.get('id')
    this.prodactServies.detailsProdact(this.Id).subscribe((res:any)=>{
      this.prodact = res.prodact[0]
      console.log(res);

    },(err:any)=>{
      this.error = err.error.error_en
      this.error = err.error.error
    })
  }
  fileSlecet(event:any){
    this.Chack = true
    this.imageChangedEvent = event;
  }
  imageCropped(event:any) {
    this.croppedImage = event.base64;
    const fileBeforCrop = this.imageChangedEvent.target.files[0]
    this.size = fileBeforCrop.size
    this.imge = new File([event.file],fileBeforCrop.name,{type:fileBeforCrop.type})
      }
  fileUpload(){
    const fd = new  FormData();
    fd.append('img',this.imge ,this.imge.name )
    this.prodactServies.addimg(fd,this.Id).subscribe((res:any)=>{
      this.prodact.img = res.prodact[0].img
      console.log(res);
      this.Chack = false
    },(err)=>{
      console.log(err);
    })
  }
  delete(idImge:any){
    this.prodactServies.deleteimg(this.Id,idImge).subscribe((res:any)=>{
      this.prodact.img = res.prodact[0].img
    },(err)=>{

      console.log(err);

    })

  }

}
