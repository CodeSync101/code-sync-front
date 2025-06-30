export enum Statut {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  TRAITEE = 'TRAITEE',
  REJETEE = 'REJETEE',
}

export enum Priorite {
  BASSE = 'BASSE',
  MOYENNE = 'MOYENNE',
  HAUTE = 'HAUTE',
  URGENTE = 'URGENTE',
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
  priorite?: Priorite;
  dateCreation?: Date;
  traitee?: boolean;
  userId?: number;
  matiereId?: number;
  matiereNom?: string;
  userNom?: string;
  userEmail?: string;
}
