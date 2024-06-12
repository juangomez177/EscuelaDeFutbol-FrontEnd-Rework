export interface Partido {
  id: number;
  id_equipo: number;
  estado: string;
  goles_favor: number;
  goles_contra: number;
  faltas_cometidas: number;
  faltas_recibidas: number;
  fecha: Date;
  lugar: string;
  equipo_rival: string;
}
