import { render, screen } from '@testing-library/react';
import { playerStats, npcStats } from 'shared';
import '@testing-library/jest-dom';
import { PlayerSummary } from '../PlayerSummary';

describe('<PlayerSummary />', () => {
  it('should render the correct playable character name', () => {
    render(
      <PlayerSummary name={playerStats.name} level={0} health={200} maxHealth={200} />
    );
    expect(screen.getByText('Goku')).toBeInTheDocument();
  });

  it('should render the correct npc name', () => {
    render(
      <PlayerSummary name={npcStats.name} level={0} health={200} maxHealth={200} />
    );
    expect(screen.getByText('Vegeta')).toBeInTheDocument();
  });

  it('should display a full health bar', () => {
    const { getByTestId } = render(
      <PlayerSummary name={npcStats.name} level={10} health={200} maxHealth={200} />
    )
    expect(getByTestId('HealthBar')).toHaveStyle({ width: '100%' });
  });

  it('should display health bar at 50%', () => {
    const { getByTestId } = render(
      <PlayerSummary name={npcStats.name} level={10} health={100} maxHealth={200} />
    )
    expect(getByTestId('HealthBar')).toHaveStyle({ width: '50%' });
  });
});