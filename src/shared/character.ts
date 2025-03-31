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
}

export const characters: Character[] = [
  {
    level: 44,
    name: "Goku",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/goku.png",
    profileImg: "/assets/goku-profile-pic.png",
    characterImg: "assets/goku-character-pic.png",
    ki: 32,
    attack: 50,
    defense: 30,
    kiDefense: 30,
    moveset: [
      {
        name: 'Kamehameha',
        damage: 80,
        kiCost: 75,
        special: false
      },
      {
        name: 'Spirit Bomb',
        damage: 120,
        kiCost: 150,
        special: true
      }
    ]
  },
  {
    level: 44,
    name: "Vegeta",
    maxHealth: 200,
    maxEnergy: 250,
    img: "/assets/vegeta.png",
    profileImg: "/assets/vegeta-profile-pic.png",
    characterImg: "assets/vegeta-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Galick Gun',
        damage: 80,
        kiCost: 75,
        special: false
      },
      {
        name: 'Final Flash',
        damage: 120,
        kiCost: 150,
        special: true
      }
    ]
  },
  {
    level: 44,
    name: "Frieza",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/frieza.png",
    profileImg: "/assets/frieza-profile-pic.png",
    characterImg: "assets/frieza-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Death Beam',
        damage: 90,
        kiCost: 75,
        special: false,
      },
      {
        name: 'Death Ball',
        damage: 110,
        kiCost: 125,
        special: true,
      }
    ]
  },
  {
    level: 44,
    name: "Gohan",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/gohan.png",
    profileImg: "/assets/gohan-profile-pic.png",
    characterImg: "assets/gohan-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Kamehameha',
        damage: 80,
        kiCost: 75,
        special: false
      },
      {
        name: 'Masenko',
        damage: 55,
        kiCost: 60,
        special: false
      },
      {
        name: 'Super Kamehameha',
        damage: 110,
        kiCost: 150,
        special: true
      },
  ],
  },
  {
    level: 44,
    name: "Piccolo",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/piccolo.png",
    profileImg: "/assets/piccolo-profile-pic.png",
    characterImg: "assets/piccolo-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Light Grenade',
        damage: 50,
        kiCost: 60,
        special: false,
      },
      {
        name: 'Special Beam Cannon',
        damage: 105,
        kiCost: 120,
        special: true,
      }
    ]
  },
  {
    level: 44,
    name: "Beerus",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/beerus.png",
    profileImg: "/assets/beerus-profile-pic.png",
    characterImg: "assets/beerus-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Hakai (Destruction)',
        damage: 200,
        kiCost: 250,
        special: true,
      }
    ]
  },
  {
    level: 44,
    name: "Jiren",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/jiren.png",
    profileImg: "/assets/jiren-profile-pic.png",
    characterImg: "assets/jiren-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Kiai',
        damage: 70,
        kiCost: 75,
        special: false,
      },
      {
        name: 'Power Impact',
        damage: 115,
        kiCost: 150,
        special: true,
      }
    ]
  },
  {
    level: 44,
    name: "Goku-Black",
    maxHealth: 162,
    maxEnergy: 250,
    img: "/assets/goku-black.png",
    profileImg: "/assets/goku-black-profile-pic.png",
    characterImg: "assets/goku-black-character-pic.png",
    ki: 40,
    attack: 40,
    defense: 20,
    kiDefense: 48,
    moveset: [
      {
        name: 'Black Kamehameha',
        damage: 70,
        kiCost: 75,
        special: false,
      },
      {
        name: 'Divine Retribution',
        damage: 115,
        kiCost: 150,
        special: true,
      }
    ]
  },
];