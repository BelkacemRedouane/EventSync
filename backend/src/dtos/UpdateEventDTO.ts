export interface UpdateEventDTO {
  title?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  allDay?: boolean;
  recurring?: 'quotidien' | 'hebdomadaire' | 'mensuel' | null;
  category?: 'professionnel' | 'personnel' | 'autre';
  priority?: 'élevé' | 'moyen' | 'faible';
} 