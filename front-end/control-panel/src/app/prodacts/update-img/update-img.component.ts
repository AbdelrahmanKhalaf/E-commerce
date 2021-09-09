import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-img',
  templateUrl: './update-img.component.html',
  styleUrls: ['./update-img.component.css']
})
export class UpdateImgComponent implements OnInit {
  public id :any;
  public idImg:any;
  public error:any;
  public errorMessage:any;
  public message:any
  public imge:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  public size:any;
  public Chack:any
  constructor(private router : Router , private user : ProdactsService , private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.idImg = this.route.snapshot.paramMap.get('idImg')
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
  update(){
    const fd = new  FormData();
    fd.append('img',this.imge ,this.imge.name )
    this.user.updateimg(fd,this.id,this.idImg).subscribe((res:any)=>{
      this.router.navigate([`/prodacts/all-prodacts/details-prodact/${this.id}`])
      this.Chack = false
    },(err)=>{

      console.log(err);

    })

  }
}
