export interface CarouselImage {
  id: string;
  url: string;
  title: string;
  alt: string;
}
export interface Event {
  id: string;
  debut: string;
  fin: string;
  discipline: DisciplineCode;
  niveau: string;
  horaires?: string;
  lienWinJump?: string;
}

export interface Partner {
  id: string;
  nom: string;
  logo?: string;
  informations: string;
}

export interface Stable {
  id: string;
  nom: string;
  url: string;
  informations: string;
}

interface StableImage {
  url: string;
  stableId: string;
}

export interface StableWithImages extends Stable {
  images: StableImage[];
}

export interface LinkItem {
  href: string;
  label: string;
}

export type DisciplineCode =
  | "cso"
  | "hunter"
  | "cce"
  | "dressage"
  | "attelage"
  | "voltige"
  | "endurance"
  | "western"
  | "horseball"
  | "ponygames"
  | "trec"
  | "equifeel"
  | "equifun"
  | "ridebike"
  | "riderun"
  | "tiralarc";

export interface Discipline {
  name:
    | "CSO"
    | "Hunter"
    | "CCE"
    | "Dressage"
    | "Attelage"
    | "Voltige"
    | "Endurance"
    | "Western"
    | "Horse Ball"
    | "Pony Games"
    | "TREC"
    | "Equifeel"
    | "Equifun"
    | "Ride and Bike"
    | "Ride and Run"
    | "Tir à l'arc";
  code: DisciplineCode;
  color:
    | "#732F7B"
    | "#A95A1B"
    | "#57ac24"
    | "#043D79"
    | "#03a4a6"
    | "#0D8DC7"
    | "#f7e802"
    | "#d54d13"
    | "#0271b9"
    | "#a9398b"
    | "#02664a"
    | "#5d0449"
    | "#f39913"
    | "#c1c557"
    | "#3f2682";
  textColor: "#000000" | "#ffffff";
}

export interface Niveau {
  id:
    | "amateur"
    | "pro"
    | "enseignants"
    | "cyclesLibres"
    | "cyclesClassiques"
    | "club"
    | "poney"
    | "cyclesClassiquesPoneys"
    | "avenir";
  label:
    | "Amateur"
    | "Pro"
    | "Enseignants"
    | "Cycles Libres"
    | "Cycles Classiques"
    | "Club"
    | "Poney"
    | "Cycles Classiques Poneys"
    | "Avenir";
}

export interface CloudinaryResult {
  asset_id: string;
  public_id: string;
  version: 1721115640;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
}
