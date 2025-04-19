export interface Move {
  name: string;
  damage: number;
  kiCost: number;
  special: boolean;
}

export interface Character {
  level: number;
  maxHealth: number;
  maxEnergy: number;
  name: string;
  img?: string;
  profileImg: string;
  characterImg: string;

  ki: number;
  attack: number;
  defense: number;
  kiDefense: number;
  moveset: Move[];

  senzuCount: number;
  isCharging: boolean;
}

export const characters: Character[] = [
  {
    name: "Goku",
    level: 44,
    maxHealth: 700,
    maxEnergy: 250,
    attack: 130,
    defense: 110,
    kiDefense: 100, // Adjusted to allow for reasonable damage
    ki: 150, // Increased to make sure Goku can deal damage
    moveset: [
      { name: "Kamehameha", damage: 150, kiCost: 75, special: false },
      { name: "Spirit Bomb", damage: 200, kiCost: 150, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/goku.png",
    profileImg: "/assets/goku-profile-pic.png",
    characterImg: "assets/goku-character-pic.png",
  },
  {
    name: "Vegeta",
    level: 44,
    maxHealth: 720,
    maxEnergy: 250,
    attack: 135,
    defense: 105,
    kiDefense: 105, // Adjusted to allow for reasonable damage
    ki: 145, // Increased for better damage calculation
    moveset: [
      { name: "Galick Gun", damage: 145, kiCost: 75, special: false },
      { name: "Final Flash", damage: 190, kiCost: 150, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/vegeta.png",
    profileImg: "/assets/vegeta-profile-pic.png",
    characterImg: "assets/vegeta-character-pic.png",
  },
  {
    name: "Frieza",
    level: 44,
    maxHealth: 680,
    maxEnergy: 250,
    attack: 140,
    defense: 90,
    kiDefense: 120, // Slightly reduced to avoid overwhelming attacker's damage
    ki: 160, // Increased to improve damage output
    moveset: [
      { name: "Death Beam", damage: 160, kiCost: 75, special: false },
      { name: "Death Ball", damage: 180, kiCost: 125, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/frieza.png",
    profileImg: "/assets/frieza-profile-pic.png",
    characterImg: "assets/frieza-character-pic.png",
  },
  {
    name: "Gohan",
    level: 44,
    maxHealth: 690,
    maxEnergy: 250,
    attack: 125,
    defense: 100,
    kiDefense: 110, // Adjusted for reasonable defense
    ki: 170, // Increased to allow decent ki damage
    moveset: [
      { name: "Kamehameha", damage: 145, kiCost: 75, special: false },
      { name: "Masenko", damage: 100, kiCost: 60, special: false },
      { name: "Super Kamehameha", damage: 185, kiCost: 150, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/gohan.png",
    profileImg: "/assets/gohan-profile-pic.png",
    characterImg: "assets/gohan-character-pic.png",
  },
  {
    name: "Piccolo",
    level: 44,
    maxHealth: 730,
    maxEnergy: 250,
    attack: 115,
    defense: 130,
    kiDefense: 100, // Adjusted to allow for reasonable damage
    ki: 145, // Increased for more potential damage
    moveset: [
      { name: "Light Grenade", damage: 110, kiCost: 60, special: false },
      { name: "Special Beam Cannon", damage: 175, kiCost: 120, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/piccolo.png",
    profileImg: "/assets/piccolo-profile-pic.png",
    characterImg: "assets/piccolo-character-pic.png",
  },
  {
    name: "Beerus",
    level: 44,
    maxHealth: 760,
    maxEnergy: 250,
    attack: 160,
    defense: 120,
    kiDefense: 110, // Adjusted to allow reasonable damage
    ki: 180, // Increased for better ki damage
    moveset: [
      { name: "Sphere of Destruction", damage: 160, kiCost: 75, special: false },
      { name: "Hakai (Destruction)", damage: 240, kiCost: 250, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/beerus.png",
    profileImg: "/assets/beerus-profile-pic.png",
    characterImg: "assets/beerus-character-pic.png",
  },
  {
    name: "Jiren",
    level: 44,
    maxHealth: 780,
    maxEnergy: 250,
    attack: 150,
    defense: 135,
    kiDefense: 115, // Adjusted to ensure reasonable ki defense
    ki: 170, // Increased to ensure decent damage
    moveset: [
      { name: "Kiai", damage: 130, kiCost: 75, special: false },
      { name: "Power Impact", damage: 190, kiCost: 150, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/jiren.png",
    profileImg: "/assets/jiren-profile-pic.png",
    characterImg: "assets/jiren-character-pic.png",
  },
  {
    name: "Goku-Black",
    level: 44,
    maxHealth: 670,
    maxEnergy: 250,
    attack: 145,
    defense: 95,
    kiDefense: 115, // Adjusted for reasonable defense
    ki: 190, // Increased to allow better damage output
    moveset: [
      { name: "Black Kamehameha", damage: 150, kiCost: 75, special: false },
      { name: "Divine Retribution", damage: 190, kiCost: 150, special: true },
    ],
    senzuCount: 1,
    isCharging: false,
    img: "/assets/goku-black.png",
    profileImg: "/assets/goku-black-profile-pic.png",
    characterImg: "assets/goku-black-character-pic.png",
  },
];
