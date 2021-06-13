import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BlogService } from '../../api/blog.service';
import { NgxImageCompressService } from 'ngx-image-compress';

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
    this.blogService.save(this.blog).subscribe(
      (res) => {
        this.findAll();
        this.cancel();
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }

  edit() {
    // console.log('blog:', this.blog);
    // console.log('Image:', this.filedata);
    this.blogService.update(this.blog, this.blog.id).subscribe(
      (res) => {
        this.findAll();
        this.cancel();
      },
      (err) => {
        this.message = err.error.message;
      }
    );
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
        this.blog.logo = this.localCompressedURl;
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
}
