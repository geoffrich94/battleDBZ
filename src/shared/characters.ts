export interface characterStats {
  level: number,
  maxHealth: number,
  name: string,
  img?: string,
  profileImg?: string,

  ki: number,
  attack: number,
  defense: number,
  kiDefense: number,
}

export const playerStats: characterStats = {
  level: 44,
  maxHealth: 177,
  name: 'Goku',
  img: '/assets/goku.png',
  profileImg: '/assests/goku-profile-pic.png',

  ki: 32,
  attack: 50,
  defense: 30,
  kiDefense: 30,
};

export const npcStats: characterStats = {
  level: 44,
  name: 'Vegeta',
  maxHealth: 188,
  img: '/assets/vegeta.png',
  profileImg: '/assests/vegeta-profile-pic.png',

  ki: 40,
  attack: 40,
  defense: 20,
  kiDefense: 48,
};