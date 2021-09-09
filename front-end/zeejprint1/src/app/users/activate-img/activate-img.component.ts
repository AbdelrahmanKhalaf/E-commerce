import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-activate-img',
  templateUrl: './activate-img.component.html',
  styleUrls: ['./activate-img.component.css']
})
export class ActivateImgComponent implements OnInit {
  public errorMessage:any;
  public message:any
  public imge:File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public size;
  constructor(private user : ProdactsService ,private router : Router) { }

  fileSlecet(event){
    this.imageChangedEvent = event;
  }
  imageCropped(event:ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforCrop = this.imageChangedEvent.target.files[0]
    this.size = fileBeforCrop.size
    this.imge = new File([event.file],fileBeforCrop.name,{type:fileBeforCrop.type})
      }
  fileUpload(){
    const fd = new  FormData();
    fd.append('avatar',this.imge ,this.imge.name )
    this.user.cahngeImge(fd).subscribe((res:any)=>{
      this.router.navigate(['/user'])
    },(err)=>{
      console.log(err);

    })

  }

  ngOnInit(): void {
  }

}
