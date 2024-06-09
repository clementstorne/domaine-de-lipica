import { Discipline, Niveau } from "@/types";

export const DISCIPLINES: Discipline[] = [
  { name: "CSO", code: "cso", color: "#732F7B", textColor: "#ffffff" },
  { name: "Hunter", code: "hunter", color: "#A95A1B", textColor: "#ffffff" },
  { name: "CCE", code: "cce", color: "#57ac24", textColor: "#ffffff" },
  {
    name: "Dressage",
    code: "dressage",
    color: "#043D79",
    textColor: "#ffffff",
  },
  {
    name: "Attelage",
    code: "attelage",
    color: "#03a4a6",
    textColor: "#ffffff",
  },
  { name: "Voltige", code: "voltige", color: "#0D8DC7", textColor: "#ffffff" },
  {
    name: "Endurance",
    code: "endurance",
    color: "#f7e802",
    textColor: "#000000",
  },
  { name: "Western", code: "western", color: "#d54d13", textColor: "#ffffff" },
  {
    name: "Horse Ball",
    code: "horseball",
    color: "#0271b9",
    textColor: "#ffffff",
  },
  {
    name: "Pony Games",
    code: "ponygames",
    color: "#a9398b",
    textColor: "#ffffff",
  },
  { name: "TREC", code: "trec", color: "#02664a", textColor: "#ffffff" },
  {
    name: "Equifeel",
    code: "equifeel",
    color: "#5d0449",
    textColor: "#ffffff",
  },
  { name: "Equifun", code: "equifun", color: "#f39913", textColor: "#000000" },
  {
    name: "Ride and Bike",
    code: "ridebike",
    color: "#c1c557",
    textColor: "#000000",
  },
  {
    name: "Ride and Run",
    code: "riderun",
    color: "#c1c557",
    textColor: "#000000",
  },
  {
    name: "Tir à l'arc",
    code: "tiralarc",
    color: "#3f2682",
    textColor: "#ffffff",
  },
];

export const NIVEAUX: Niveau[] = [
  {
    id: "amateur",
    label: "Amateur",
  },
  {
    id: "pro",
    label: "Pro",
  },
  {
    id: "enseignants",
    label: "Enseignants",
  },
  {
    id: "club",
    label: "Club",
  },
  {
    id: "poney",
    label: "Poney",
  },
  {
    id: "avenir",
    label: "Avenir",
  },
  {
    id: "cyclesLibres",
    label: "Cycles Libres",
  },
  {
    id: "cyclesClassiques",
    label: "Cycles Classiques",
  },
  {
    id: "cyclesClassiquesPoneys",
    label: "Cycles Classiques Poneys",
  },
];
