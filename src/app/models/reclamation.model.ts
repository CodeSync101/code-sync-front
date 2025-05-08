export enum Statut {
  EN_ATTENTE = 'EN_ATTENTE',
  TRAITEE = 'TRAITEE',
  REFUSEE = 'REFUSEE',
}

export enum Priorite {
  BASSE = 'BASSE',
  MOYENNE = 'MOYENNE',
  HAUTE = 'HAUTE',
}

export interface User {
  id: number;
  // Ajoutez d'autres propriétés au besoin
}

export interface Reclamation {
  id?: number;
  titre: string;
  description: string;
  statut: Statut;
  priorite: Priorite;
  dateCreation: Date;
  user?: User;
}
