import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from 'src/app/api/cv.service';
import { Competence } from 'src/app/models/competence';
import { Domaine } from 'src/app/models/domaine';
import { Langue } from 'src/app/models/Langue';
import { Location } from '@angular/common';
import { Cv } from 'src/app/models/cv';
import { TypeOffre } from 'src/app/models/type-offre';

@Component({
  selector: 'app-gestion-professional-info',
  templateUrl: './gestion-professional-info.component.html',
  styleUrls: ['./gestion-professional-info.component.css'],
})
export class GestionProfessionalInfoComponent implements OnInit {
  langues: Langue[] = [];
  selected_langues: Langue[] = [];
  unselected_langues: Langue[] = [];

  competences: Competence[] = [];
  selected_competences: Competence[] = [];
  unselected_competences: Competence[] = [];

  domaines: Domaine[] = [];
  selected_domaines: Domaine[] = [];
  unselected_domaines: Domaine[] = [];

  offre_types: TypeOffre[] = [];
  selected_types: TypeOffre[] = [];
  unselected_types: TypeOffre[] = [];

  cv_id: string;
  cv = new Cv();

  constructor(
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cv_id = this.route.snapshot.paramMap.get('cv_id');
    console.log('id:', this.cv_id);

    this.findCv();

    //Tableau des langues from cache
    this.langues = JSON.parse(localStorage.languesCache || '[]');
    console.log('Les langues:', this.langues);

    //Tableau des competences from cache
    this.competences = JSON.parse(localStorage.competencesCache || '[]');
    console.log('Les competences:', this.competences);

    //Tableau des domaines from cache
    this.domaines = JSON.parse(localStorage.domainesCache || '[]');
    console.log('Les domaines:', this.domaines);

    //Tableau des types cvs from cache
    this.offre_types = JSON.parse(localStorage.type_offresCache || '[]');
    console.log('Les types:', this.offre_types);

  }

  findCv() {
    this.cvService.get(this.cv_id).subscribe(
      (res) => {
        this.cv = res;
        var cv_langues: Langue[] = this.cv.langues;
        var cv_competences: Competence[] = this.cv.competences;
        var cv_domaines: Domaine[] = this.cv.domaines;
        var cv_types: TypeOffre[] = this.cv.emploi_types;
        

        //Loop to get the data from the back and transform it into the same format as the langues array
        this.langues.forEach((langue) => {
          cv_langues.forEach((cv_langue) => {
            if (cv_langue.id == langue.id) {
              this.selected_langues.push(langue);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedLangues();

        

        //Loop to get the data from the back and transform it into the same format as the competences array
        this.competences.forEach((competence) => {
          cv_competences.forEach((item) => {
            if (item.id == competence.id) {
              this.selected_competences.push(competence);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedCompetences();



        //Loop to get the data from the back and transform it into the same format as the domaines array
        this.domaines.forEach((domaine) => {
          cv_domaines.forEach((item) => {
            if (item.id == domaine.id) {
              this.selected_domaines.push(domaine);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedDomaines();
        
        

        //Loop to get the data from the back and transform it into the same format as the types offres array
        this.offre_types.forEach((offre_type) => {
          cv_types.forEach((item) => {
            if (item.id == offre_type.id) {
              this.selected_types.push(offre_type);
            }
          }, this);
        }, this);

        // Get the unselected languages to show them in the multiselect
        this.unselectedTypes();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  unselectedLangues() {
    this.unselected_langues = [];
    this.unselected_langues = this.langues.filter(
      item => this.selected_langues.indexOf(item) < 0
    );
  }

  unselectedCompetences() {
    console.log('after change', this.selected_langues);
    this.unselected_competences = [];
    this.unselected_competences = this.competences.filter(
      item => this.selected_competences.indexOf(item) < 0
    );
  }

  unselectedDomaines() {

    this.unselected_domaines = [];
    this.unselected_domaines = this.domaines.filter(
      (item) => this.selected_domaines.indexOf(item) < 0
    );
  }

  unselectedTypes() {
    console.log('after change', this.selected_langues);
    this.unselected_types = [];
    this.unselected_types = this.offre_types.filter(
      (item) => this.selected_types.indexOf(item) < 0
    );
  }

  // Modifying the CV and navigating to the next page
  nextPage() {
    this.cv.langues = [];
    this.cv.emploi_types = [];
    this.cv.competences = [];
    this.cv.domaines = [];

    // Laravel takes only an array of ids to make many to many relations so I need to change the array, from an array of objects to an array of IDs

    // adding langues to the cv
    this.selected_langues.forEach(function (langue) {
      this.cv.langues.push(langue.id);
    }, this);

    // adding offre types to the cv
    this.selected_types.forEach(function (type) {
      this.cv.emploi_types.push(type.id);
    }, this);

    // adding competennces to the cv
    this.selected_competences.forEach(function (competence) {
      this.cv.competences.push(competence.id);
    }, this);

    // adding domaines to the cv
    this.selected_domaines.forEach(function (domaine) {
      this.cv.domaines.push(domaine.id);
    }, this);

    this.cvService.update(this.cv, this.cv.id).subscribe((res) => {
      var candidat = JSON.parse(localStorage.getItem('candidat'));
      candidat.cv = res.data;
      localStorage.setItem('candidat', JSON.stringify(candidat));

      this.router.navigate(['gestion-cv/experiences', this.cv_id]);
    });
  }

  previousPage() {
    this.location.back();
  }
}
