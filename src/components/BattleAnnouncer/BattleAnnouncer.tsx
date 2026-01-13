import * as S from './BattleAnnouncer.styles'
import { useTypedMessage } from 'hooks';

interface BattleAnnouncerProps {
  message: string;
}

export const BattleAnnouncer: React.FC<BattleAnnouncerProps> = ({ message }) => {

  const typedMessage = useTypedMessage(message);

  return (
    <S.Border>
      <S.Container>
        <S.AnnouncerDiv>
          <img src={`${process.env.PUBLIC_URL || ""}/assets/announcer.png`} alt="Battle Announcer"/>
        </S.AnnouncerDiv>
        <S.Message>{typedMessage}</S.Message>
      </S.Container>
    </S.Border>
  )
}