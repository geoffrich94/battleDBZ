import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BattleMenu } from '../BattleMenu';

describe('<BattleMenu />', () => {
  it('Should expect onAttack function to be called', () => {
    const handleAttack = jest.fn();
    const handleKi = jest.fn();
    render(
      <BattleMenu onAttack={handleAttack} onKi={handleKi} />
    );
    fireEvent.click(screen.getByText('Attack'));
    expect(handleAttack).toBeCalled();
  });
});