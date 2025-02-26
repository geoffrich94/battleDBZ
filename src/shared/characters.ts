export interface characterStats {
  level: number;
  maxHealth: number;
  name: string;
  img?: string;
  profileImg: string;
  characterImg: string;
  ki: number;
  attack: number;
  defense: number;
  kiDefense: number;
}

// export const characters: characterStats[] = [
//   {
//     level: 44,
//     name: "Goku",
//     maxHealth: 162,
//     img: "/assets/goku.png",
//     profileImg: "/assets/goku-profile-pic.png",
//     characterImg: "assets/goku-character-pic.png",
//     ki: 32,
//     attack: 50,
//     defense: 30,
//     kiDefense: 30,
//   },
//   {
//     level: 44,
//     name: "Vegeta",
//     maxHealth: 200,
//     img: "/assets/vegeta.png",
//     profileImg: "/assets/vegeta-profile-pic.png",
//     characterImg: "assets/vegeta-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
//   {
//     level: 44,
//     name: "Frieza",
//     maxHealth: 200,
//     img: "/assets/frieza.png",
//     profileImg: "/assets/frieza-profile-pic.png",
//     characterImg: "assets/frieza-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
//   {
//     level: 44,
//     name: "Gohan",
//     maxHealth: 200,
//     img: "/assets/gohan.png",
//     profileImg: "/assets/gohan-profile-pic.png",
//     characterImg: "assets/gohan-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
//   {
//     level: 44,
//     name: "Piccolo",
//     maxHealth: 200,
//     img: "/assets/piccolo.png",
//     profileImg: "/assets/piccolo-profile-pic.png",
//     characterImg: "assets/piccolo-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
//   {
//     level: 44,
//     name: "Beerus",
//     maxHealth: 200,
//     img: "/assets/beerus.png",
//     profileImg: "/assets/beerus-profile-pic.png",
//     characterImg: "assets/beerus-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
//   {
//     level: 44,
//     name: "Jiren",
//     maxHealth: 200,
//     img: "/assets/jiren.png",
//     profileImg: "/assets/jiren-profile-pic.png",
//     characterImg: "assets/jiren-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
//   {
//     level: 44,
//     name: "Goku Black",
//     maxHealth: 200,
//     img: "/assets/goku-black.png",
//     profileImg: "/assets/goku-black-profile-pic.png",
//     characterImg: "assets/goku-black-character-pic.png",
//     ki: 40,
//     attack: 40,
//     defense: 20,
//     kiDefense: 48,
//   },
// ];

export const playerStats: characterStats = {
  level: 44,
  maxHealth: 162,
  name: "Goku",
  img: "/assets/goku.png",
  profileImg: "/assests/goku-profile-pic.png",
  characterImg: "/assets/goku-character-pic",

  ki: 32,
  attack: 50,
  defense: 30,
  kiDefense: 30,
};

export const npcStats: characterStats = {
  level: 44,
  name: "Vegeta",
  maxHealth: 200,
  img: "/assets/vegeta.png",
  profileImg: "/assests/vegeta-profile-pic.png",
  characterImg: "/assets/vegeta-character-pic",

  ki: 40,
  attack: 40,
  defense: 20,
  kiDefense: 48,
};

// export const frieza: characterStats = {
//   level: 44,
//   name: "Frieza",
//   maxHealth: 200,
//   img: "/assets/frieza.png",
//   profileImg: "/assests/frieza-profile-pic.png",

//   ki: 40,
//   attack: 40,
//   defense: 20,
//   kiDefense: 48,
// };

// export const gohan: characterStats = {
//   level: 44,
//   name: "Gohan",
//   maxHealth: 200,
//   img: "/assets/gohan.png",
//   profileImg: "/assests/gohan-profile-pic.png",

//   ki: 40,
//   attack: 40,
//   defense: 20,
//   kiDefense: 48,
// };

// export const piccolo: characterStats = {
//   level: 44,
//   name: "Piccolo",
//   maxHealth: 200,
//   img: "/assets/piccolo.png",
//   profileImg: "/assests/piccolo-profile-pic.png",

//   ki: 40,
//   attack: 40,
//   defense: 20,
//   kiDefense: 48,
// };

// export const beerus: characterStats = {
//   level: 44,
//   name: "Beerus",
//   maxHealth: 200,
//   img: "/assets/beerus.png",
//   profileImg: "/assests/beerus-profile-pic.png",

//   ki: 40,
//   attack: 40,
//   defense: 20,
//   kiDefense: 48,
// };

// export const jiren: characterStats = {
//   level: 44,
//   name: "Jiren",
//   maxHealth: 200,
//   img: "/assets/jiren.png",
//   profileImg: "/assests/jiren-profile-pic.png",

//   ki: 40,
//   attack: 40,
//   defense: 20,
//   kiDefense: 48,
// };

// export const gokuBlack: characterStats = {
//   level: 44,
//   name: "Goku Black",
//   maxHealth: 200,
//   img: "/assets/goku-black.png",
//   profileImg: "/assests/goku-black-profile-pic.png",

//   ki: 40,
//   attack: 40,
//   defense: 20,
//   kiDefense: 48,
// };
