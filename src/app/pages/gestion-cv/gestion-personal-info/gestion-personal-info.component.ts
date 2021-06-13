import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from 'src/app/api/candidat.service';
import { Candidat } from 'src/app/models/candidat';
import { Location } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-gestion-personal-info',
  templateUrl: './gestion-personal-info.component.html',
  styleUrls: ['./gestion-personal-info.component.css'],
})
export class GestionPersonalInfoComponent implements OnInit {
  
  cv_id: string;
  candidat = new Candidat();
  submitted: boolean = false;
  civilites = ['M', 'Mme', 'Mlle'];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidatservice: CandidatService,
    private location: Location,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {
    this.candidat = JSON.parse(localStorage.getItem('candidat'));
    this.cv_id=this.route.snapshot.paramMap.get('cv_id');
  }

    //      IMAGE COMPRESSION              //

    localUrl: any;
    localCompressedURl: any;
    sizeOfOriginalImage: number;
    sizeOFCompressedImage: number;
  
    handleFileInput(files: FileList) {
      var fileName: any;
      var fileToUpload = files.item(0);
      if (fileToUpload) {
        console.log("FILEEEE: ", fileToUpload);
        fileName = fileToUpload.name;
        const reader = new FileReader();
        reader.readAsDataURL(fileToUpload);
        reader.onload = () => {
          this.localUrl = reader.result;
          if (fileToUpload.size > 100000) {
            this.compressFile(this.localUrl, fileName);
          }
        };
      }
    }
  
    imgResultBeforeCompress: string;
    imgResultAfterCompress: string;
  
    compressFile(image, fileName) {
      var orientation = -1;
      this.sizeOfOriginalImage =this.imageCompress.byteCount(image) / (1024 * 1024);
      console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
      this.imageCompress
        .compressFile(image, orientation, 50, 50)
        .then((result) => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          console.log("Compressed image: ", this.localCompressedURl);
          this.candidat.image = this.localCompressedURl;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
          console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(
            this.imgResultAfterCompress.split(',')[1]
          );
  
          //imageFile created below is the new compressed file which can be send to API in form data
          const imageFile = new File([result], imageName, { type: 'image/jpeg' });
        });
  
    }
  
    dataURItoBlob(dataURI) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
    }

  nextPage() {
      this.candidatservice.update(this.candidat, this.candidat.id).subscribe(res=>{
        this.router.navigate(['gestion-cv/professional',this.cv_id]);
        localStorage.setItem("candidat",JSON.stringify(this.candidat));
      });

    this.submitted = true;
  }
  previousPage(){
    this.location.back()
  }
}
