import { TypeOffre } from './type-offre';
import { Langue } from './Langue';
export class Offre {
    id: number;
    genre: string;
    experience: string;
    niveau_education: string;
    description_emploi: string;
    exigence_emploi: string;
    active: string;
    employeur_id: number;
    emploiTypes: TypeOffre[];
    langues: Langue[];

    constructor() {
        this.id = null;
        this.genre = '';
        this.experience = '';
        this.niveau_education = '';
        this.description_emploi = '';
        this.exigence_emploi = '';
        this.active = '';
        this.employeur_id = null;
        this.emploiTypes = [];
        this.langues = [];

    }
}
