import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BlogService } from '../../api/blog.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: [
    `
      :host ::ng-deep .p-cell-editing {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    `,
  ],
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  blog = new Blog();
  message: any;
  editing = false;
  blogs: Blog[];
  first = 0;

  rows = 5;
  fileToUpload: any;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  constructor(
    private blogService: BlogService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private storage:AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.findAll();
  }

  //Shows the form modal
  showDialog() {
    var modal = document.getElementById('blogForm');
    modal.style.display = 'block';
  }

  //Hides the form modal
  cancel() {
    var modal = document.getElementById('blogForm');
    modal.style.display = 'none';
    this.editing = false;
    this.blog = new Blog();
    document.forms[0].reset();
  }

  showEditDialog(blog) {
    this.showDialog();
    this.blog = blog;
    this.editing = true;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.message,
    });
  }

  public findAll() {
    this.blogService.getAll().subscribe(
      (data) => {
        this.blogs = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  add() {
    // console.log('blog:', this.blog);
    // console.log('Image:', this.filedata);
    document.getElementById('fluid').style.display="none";
    document.getElementById('uploading').style.display="block";
    document.getElementById('btn').style.display="none";

    let datenow= new Date();
    var path_image = "/blog_logos/" + datenow +this.blog.titre ;

      const fileref = this.storage.ref(path_image);
      
      this.storage
      .upload(path_image, this.fileToUpload)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileref.getDownloadURL().subscribe((url) => {            
            this.blog.logo=url;
            console.log(url);

            this.blogService.save(this.blog).subscribe(
              (res) => {
                this.findAll();
                this.cancel();

                document.getElementById('fluid').style.display="block";
                document.getElementById('uploading').style.display="none";
                document.getElementById('btn').style.display="block";
              },
              (err) => {
                this.message = err.error.message;

                document.getElementById('fluid').style.display="block";
                document.getElementById('uploading').style.display="none";
                document.getElementById('btn').style.display="block";
              }
            );

          });
        })
      )
      .subscribe();
      
  }

  edit() {

    document.getElementById('fluid').style.display="none";
    document.getElementById('uploading').style.display="block";
    document.getElementById('btn').style.display="none";

    let datenow= new Date();
    var path_image = "/blog_logos/" + datenow +this.blog.titre ;

      const fileref = this.storage.ref(path_image);
      if(this.fileToUpload){
        this.storage
        .upload(path_image, this.fileToUpload)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileref.getDownloadURL().subscribe((url) => {            
              this.blog.logo=url;
              console.log(url);

              this.blogService.update(this.blog, this.blog.id).subscribe(
                (res) => {
                  this.findAll();
                  this.cancel();

                  document.getElementById('fluid').style.display="block";
                  document.getElementById('uploading').style.display="none";
                  document.getElementById('btn').style.display="block";
                },
                (err) => {
                  this.message = err.error.message;

                  document.getElementById('fluid').style.display="block";
                  document.getElementById('uploading').style.display="none";
                  document.getElementById('btn').style.display="block";
                }
              );

            });
          })
        )
        .subscribe();
      }
      else{
        this.blogService.update(this.blog, this.blog.id).subscribe(
          (res) => {
            this.findAll();
            this.cancel();

            document.getElementById('fluid').style.display="block";
            document.getElementById('uploading').style.display="none";
            document.getElementById('btn').setAttribute('disabled', 'false');
          },
          (err) => {
            this.message = err.error.message;

            document.getElementById('fluid').style.display="block";
            document.getElementById('uploading').style.display="none";
            document.getElementById('btn').setAttribute('disabled', 'false');
          }
        );
      }
    
  }

  delete(id: number) {
    this.blogService.delete(id).subscribe(
      (res) => {
        if (!res.succes) {
          this.message = 'modification effectué avec succés';
          this.findAll();
          // this.employeurService.getAllCache();
        } else {
          this.message = 'erreuuur';
          this.findAll();
        }
      },
      (err) => {
        this.message = 'not effected';
        this.findAll();
      }
    );
  }

  //      IMAGE COMPRESSION              //

  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;

  handleFileInput(files: FileList) {
    document.getElementById('loader').style.display="block";
    document.getElementById('logo').style.display="none";
    var fileName: any;
    this.fileToUpload = files[0];
    if (this.fileToUpload) {
      console.log("FILE: ", this.fileToUpload);
      fileName = this.fileToUpload.name;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.blog.logo = reader.result;
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
        //console.log("Compressed image: ", this.localCompressedURl);
        this.blog.logo = this.localCompressedURl;
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
        console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        // call method that creates a blob from dataUri
        const imageBlob = this.dataURItoBlob(
          this.imgResultAfterCompress.split(',')[1]
        );
        this.fileToUpload =imageBlob;
        console.log("Blob compressed: ",imageBlob);
        document.getElementById('loader').style.display="none";
        document.getElementById('logo').style.display="block";
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
}
