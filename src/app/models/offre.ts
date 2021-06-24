import { Candidature } from './candidature';
import { Employeur } from './employeur';
export class Offre {
    id: number;
    genre: string;
    experience: string;
    niveau_education: string;
    description_emploi: string;
    domaine: any;
    exigence_emploi: string;
    nom_emploi: string;
    active: boolean;
    nbre_postes:number;
    employeur_id: number;
    employeur: Employeur;
    candidatures: Candidature[];
    emploi_types: any[];
    langues: any[];
    created_at:any;
    updated_at:any;

    constructor() {
        this.id = null;
        this.genre = '';
        this.nom_emploi = '';
        this.experience = '';
        this.nbre_postes=0;
        this.niveau_education = '';
        this.description_emploi = '';
        this.domaine = '';
        this.exigence_emploi = '';
        this.active = true;
        this.employeur_id = null;
        this.emploi_types = [];
        this.langues = [];

    }
}
