import * as S from "./Modal.styles";

interface ModalProps {
  username: string;
  setUsername: (value: string) => void;
  onLogin: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  username,
  setUsername,
  onLogin,
}) => {
  return (
    <S.Border>
      <S.Option>
        <S.Container>
          <S.Group>
            <S.Logo src={`${process.env.PUBLIC_URL}/assets/logo.png`} />
            <S.Title>Please enter a username to log in</S.Title>
          </S.Group>

          <S.Group>
            <S.Label>Username</S.Label>
            <S.Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <S.Button onClick={onLogin}>
              FIND MATCH
            </S.Button>
          </S.Group>
        </S.Container>
      </S.Option>
    </S.Border>
  );
};
