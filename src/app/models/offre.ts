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
    employeur_id: number;
    employeur: Employeur;
    emploiTypes: any;
    langues: any;
    created_at:any;
    updated_at:any;

    constructor() {
        this.id = null;
        this.genre = '';
        this.experience = '';
        this.niveau_education = '';
        this.description_emploi = '';
        this.domaine = null;
        this.exigence_emploi = '';
        this.active = true;
        this.employeur_id = null;
        this.emploiTypes = [];
        this.langues = [];

    }
}
