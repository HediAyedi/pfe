export class Note {

    id: number;
    candidat_id: number;
    test_id: number;
    note: number;
    success:boolean;
    constructor() {
      this.note = null;
      this.success=false;
    }
}
