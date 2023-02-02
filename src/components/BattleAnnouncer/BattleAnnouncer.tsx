import * as S from './BattleAnnouncer.styles'
import { useTypedMessage } from 'hooks';

interface BattleAnnouncerProps {
  message: string;
}

export const BattleAnnouncer: React.FC<BattleAnnouncerProps> = ({ message }) => {

  const typedMessage = useTypedMessage(message);

  return (
    <S.Container>
      <S.Message>{typedMessage}</S.Message>
    </S.Container>
  )
}