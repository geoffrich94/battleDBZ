import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BattleMenu } from '../BattleMenu';

describe('<BattleMenu />', () => {
  it('Should expect onAttack function to be called', () => {
    const handleAttack = jest.fn();
    const handleKi = jest.fn();
    const handleSenzu = jest.fn();
    render(
      <BattleMenu onAttack={handleAttack} onKi={handleKi} onSenzu={handleSenzu} />
    );
    fireEvent.click(screen.getByText('Attack'));
    fireEvent.click(screen.getByText('Ki'));
    fireEvent.click(screen.getByText('Senzu'));
    expect(handleAttack).toBeCalled();
    expect(handleKi).toBeCalled();
    expect(handleSenzu).toBeCalled();
  });
});