import { Component, OnInit } from '@angular/core';
import { EmployeurService } from '../../api/employeur.service';
import { SecteurActiviteService } from 'src/app/api/caching services/secteur-activite.service';
import { AdresseService } from '../../api/adresse.service';
import { Employeur } from '../../models/employeur';
import { Adresse } from '../../models/adresse';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { showRuleCrashWarning } from 'tslint/lib/error';
import { SecteurActivite } from 'src/app/models/secteur-activite';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-formsociete',
  templateUrl: './formsociete.component.html',
  styleUrls: ['./formsociete.component.scss'],
  providers: [MessageService]

})
export class FormsocieteComponent implements OnInit {


  employeur: Employeur = new Employeur();
  message: any;
  secteurs: SecteurActivite[] = [];
  adresse: Adresse = new Adresse();
  secteur = new SecteurActivite();
  fileToUpload: any;
  constructor(private employeurService: EmployeurService,
    private secteurActiviteService: SecteurActiviteService,
    private adresseService: AdresseService,
    private messageService: MessageService,
    private router: Router,
    private storage: AngularFireStorage,
    private imageCompress: NgxImageCompressService,
    private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    if (this.router.url.includes("/SignUpEmployeur")) {
      this.toggle();
    }
    this.primengConfig.ripple = true;
    this.secteurs = JSON.parse(localStorage["secteursCache"] || "[]");
    if (this.secteurs.length == 0) {
      this.findSecteurs();
    }
  }

  toggle() {
    document.querySelector('.cont').classList.toggle('s--signup');
    document.forms[0].reset();
    document.forms[1].reset();
    this.employeur = new Employeur();
  }

  //      IMAGE COMPRESSION              //

  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;

  handleFileInput(files: FileList) {
    document.getElementById('compression').style.display = "block";
    document.getElementById('logo').style.display = "none";
    var fileName: any;
    this.fileToUpload = files[0];
    if (this.fileToUpload) {
      console.log("FILE: ", this.fileToUpload);
      fileName = this.fileToUpload.name;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.employeur.logo = reader.result;
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
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
    console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
    this.imageCompress
      .compressFile(image, orientation, 50, 50)
      .then((result) => {
        this.imgResultAfterCompress = result;
        this.localCompressedURl = result;
        //console.log("Compressed image: ", this.localCompressedURl);
        this.employeur.logo = this.localCompressedURl;
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
        document.getElementById('logo').style.display = "block";

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



  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
  }
  showWarn(err) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: this.message });
    if (err.error.errors.email) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.email }); }
    if (err.error.errors.mot_de_passe) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.mot_de_passe }); }
    if (err.error.errors.matricule) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.matricule }); }
    if (err.error.errors.site_web) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.site_web }); }
    if (err.error.errors.telephone) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.telephone }); }
    if (err.error.errors.secteur_id) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.secteur_id }); }
    if (err.error.errors.description_entreprise) { this.messageService.add({ severity: 'warn', summary: 'Warn', detail: err.error.errors.description_entreprise }); }
  }
  signUp() {
    document.getElementById('loader').style.display = "block";
    document.getElementById('form').style.display = "none";

    console.log('EmployeuR:', this.employeur);
    this.employeur.secteur_id = this.secteur.id;
    this.adresse = this.employeur.adresse;
    console.log("ADRESSE: ", this.adresse);
    if (this.fileToUpload) {
      let datenow = new Date();
      var path_image = "/images/" + datenow + this.employeur.nom + '_' + this.employeur.nom_entreprise;
      const fileref = this.storage.ref(path_image);
      this.storage
        .upload(path_image, this.fileToUpload)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileref.getDownloadURL().subscribe((url) => {
              this.employeur.logo = url;
              console.log(url);

              this.employeurService.save(this.employeur).subscribe(res => {

                document.getElementById('loader').style.display = "none";
                document.getElementById('form').style.display = "block";
                document.getElementById('form').style.width = "100%";
                document.getElementById('form').style.height = "100%";

                this.message = 'Ajout effectué avec succés, attends La vérification de votre compte ';
                this.employeurService.getAllCache();
                this.showSuccess();

                // ajout adresse 
                this.adresse.employeur_id = res.employeur.id;
                this.adresseService.save(this.adresse).subscribe(res => {
                  console.log(res)
                }, err => {
                  this.message = "not affected";
                  console.log(this.message);
                }
                );
                document.forms[1].reset();
              }, err => {
                this.message = err.error.message;
                this.showWarn(err);

                document.getElementById('loader').style.display = "none";
                document.getElementById('form').style.display = "block";
                document.getElementById('form').style.width = "100%";
                document.getElementById('form').style.height = "100%";
              }
              );

            });
          })
        )
        .subscribe();
    }
    else {
      this.employeurService.save(this.employeur).subscribe(res => {

        document.getElementById('loader').style.display = "none";
        document.getElementById('form').style.display = "block";
        document.getElementById('form').style.width = "100%";
        document.getElementById('form').style.height = "100%";

        this.message = 'Ajout effectué avec succés, attends La vérification de votre compte ';
        this.showSuccess();

        // ajout adresse 
        this.adresse.employeur_id = res.employeur.id;
        this.adresseService.save(this.adresse).subscribe(res => {
          console.log(res)
        }, err => {
          this.message = "not affected";
          console.log(this.message);
        }
        );
        document.forms[1].reset();
      }, err => {
        this.message = err.error.message;
        this.showWarn(err);

        document.getElementById('loader').style.display = "none";
        document.getElementById('form').style.display = "block";
        document.getElementById('form').style.width = "100%";
        document.getElementById('form').style.height = "100%";
      }
      );
    }

  }

  logIn() {


    document.getElementById('login_loader').style.display = "block";
    document.getElementById('login_btn').style.display = "none";

    this.employeurService.logIn(this.employeur).subscribe(res => {
      console.log(res.employeur);
      localStorage.setItem("employeur", JSON.stringify(res.employeur));
      localStorage.setItem("token", res.token);

      document.getElementById('login_loader').style.display = "none";
      document.getElementById('login_btn').style.display = "block";

      // if(this.router.url.includes("loginCandidat")){
      //   this.router.navigate(['/offres']);
      // }
      this.router.navigate(['employeur/home']);

    },
      (err) => {
        console.log(err);
        this.message = err.error.message;
        document.getElementById('login_loader').style.display = "none";
        document.getElementById('login_btn').style.display = "block";
      }
    );
  }

  public findSecteurs() {
    this.secteurActiviteService.getAll().subscribe((res) => {
      this.secteurs = res;
      localStorage.setItem('secteursCache', JSON.stringify(res));
    });
  }
}
