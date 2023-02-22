import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Bar } from '../Bar';
import { characterStats } from 'shared';

const mockPlayerStats: characterStats = {
  level: 25,
  maxHealth: 200,
  name: 'Geoffrey',

  ki: 15,
  attack: 33,
  defense: 15,
  kiDefense: 10,
};

describe('<Bar />', () => {
  it('should display a full health bar', () => {
    const { getByTestId } = render(
      <Bar width={(200 / mockPlayerStats.maxHealth) * 100} />
    )
    expect(getByTestId('HealthBar')).toHaveStyle({ width: '100%' });
  });

  it('should display health bar at 75%', () => {
    const { getByTestId } = render(
      <Bar width={(150 / mockPlayerStats.maxHealth) * 100} />
    )
    expect(getByTestId('HealthBar')).toHaveStyle({ width: '75%' });
  });

  it('should display health bar at 50%', () => {
    const { getByTestId } = render(
      <Bar width={(100 / mockPlayerStats.maxHealth) * 100} />
    )
    expect(getByTestId('HealthBar')).toHaveStyle({ width: '50%' });
  });

  it('should display health bar at 25%', () => {
    const { getByTestId } = render(
      <Bar width={(50 / mockPlayerStats.maxHealth) * 100} />
    )
    expect(getByTestId('HealthBar')).toHaveStyle({ width: '25%' });
  });
});