export interface Note {
  id?: number;
  valeur: number;
  commentaire?: string;
  dateCreation?: Date;
  userId?: number;
  tacheId?: number;
  tacheNom?: string;
  matiereId?: number;
  matiereNom?: string;
}
