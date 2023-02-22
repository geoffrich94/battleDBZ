import { attack, characterStats, ki, senzu } from "shared";
import '@testing-library/jest-dom';

const mockAttackerStats: characterStats = {
  level: 25,
  maxHealth: 100,
  name: 'Goku',
  img: '/assets/goku.png',
  profileImg: '/assests/goku-profile-pic.png',

  ki: 15,
  attack: 33,
  defense: 15,
  kiDefense: 10,
};

const mockRecieverStats: characterStats = {
  level: 25,
  maxHealth: 110,
  name: 'Goku',
  img: '/assets/goku.png',
  profileImg: '/assests/goku-profile-pic.png',

  ki: 20,
  attack: 27,
  defense: 22,
  kiDefense: 18,
};

describe('helpers', () => {
  it('should return the correct final damage for attack', () => {
    // const receivedDamage = 33 - (25 - 25) * 1.25;
    // const finalDamage = receivedDamage - 22 / 2;
    const result = attack(mockAttackerStats, mockRecieverStats);
    expect(result).toEqual(22);
  });

  it('should return the correct final damage for a ki attack', () => {
    // const receivedDamage = 15 - (25 - 25) * 1.25;
    // const finalDamage = receivedDamage - 18 / 2;
    const result = ki(mockAttackerStats, mockRecieverStats);
    expect(result).toEqual(6);
  })

  it('should return the correct value for a senzu', () => {
    // const receivedValue = 20 + 25 * 0.25;
    const result = senzu(mockRecieverStats);
    expect(result).toEqual(26.25);
  })
});