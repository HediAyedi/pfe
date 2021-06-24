import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from 'src/app/api/candidat.service';
import { Candidat } from 'src/app/models/candidat';
import { Location } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

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
  fileToUpload: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private candidatservice: CandidatService,
    private location: Location,
    private storage: AngularFireStorage,
    private imageCompress: NgxImageCompressService,
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
      document.getElementById('compression').style.display = "block";
      document.getElementById('image').style.display = "none";
      var fileName: any;
      this.fileToUpload = files.item(0);
      if (this.fileToUpload) {
        console.log("FILEEEE: ", this.fileToUpload);
        fileName = this.fileToUpload.name;
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
          this.localUrl = reader.result;
          if (this.fileToUpload.size > 100000) {
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
          this.fileToUpload = imageBlob;
          console.log("Blob compressed: ", imageBlob);
          document.getElementById('compression').style.display = "none";
          document.getElementById('image').style.display = "block";
  
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
    document.getElementById('loader').style.display = "block";
    document.getElementById('confirm').style.display = "none";

    if (this.fileToUpload) {
      let datenow = new Date();
      var path_image = "/images/" + datenow + this.candidat.nom;
      const fileref = this.storage.ref(path_image);
      this.storage
        .upload(path_image, this.fileToUpload)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileref.getDownloadURL().subscribe((url) => {
              this.candidat.image = url;
              console.log(url);

              this.candidatservice.update(this.candidat, this.candidat.id).subscribe(res=>{

                this.router.navigate(['candidat/gestion-cv/professional',this.cv_id]);
                localStorage.setItem('candidat', JSON.stringify(this.candidat));
                document.getElementById('loader').style.display = "none";
                document.getElementById('confirm').style.display = "block";

              }, err => {
        
                document.getElementById('loader').style.display = "none";
                document.getElementById('confirm').style.display = "block";
              }
              );

            });
          })
        )
        .subscribe();
    }
    else {

      this.candidatservice.update(this.candidat, this.candidat.id).subscribe(res=>{

        this.router.navigate(['candidat/gestion-cv/professional',this.cv_id]);
        localStorage.setItem("candidat",JSON.stringify(this.candidat));
        document.getElementById('loader').style.display = "none";
      }, err => {
        console.log(err);
        document.getElementById('loader').style.display = "none";
      }
      );
    }

    this.submitted = true;
  }
  previousPage(){
    this.location.back()
  }
}
