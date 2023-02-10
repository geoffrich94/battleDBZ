import styled, { keyframes } from "styled-components";
// import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

const flash = keyframes`
  0 % {
    opacity: 0;
  }
  50 % {
    opacity: 1;
  }
  100 % {
    opacity: 0;
  }
`

export const Container = styled.div``;

export const Summary = styled.div` 
  display: flex;
  align-items: flex - end;
  justify-content: flex - start;
`;

export const NonPlayableCharacter = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 25px; */
  box-sizing: border-box;

  & ${Summary} {
    align-items: flex-start;
    justify-content: flex-end;
  };
`;

export const PlayableCharacter = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 25px; */
  box-sizing: border-box;
`;

export const HUD = styled.div`
  gap: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const HUDChild = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 200px;
`;

export const GameHeader = styled.div`
  font-size: 48px;
  color: #fdac00;
  text-shadow: 0px 0px 5px #7f0000;
  font-family: 'Press Start 2P', cursive;
`;

export const GameImages = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: 25px; */
  box-sizing: border-box;
`;

export const Characters = styled.div`
  width: 100%;
  text-align: center;

  & ${GameImages} img {
    max-height: 25vh;
    min-height: 150px;
  }
`;

export const PlayerSprite = styled.div`
  & img.static {
    transform: translateX(0px);
    transform: translateY(0px);
    transition: 0.5s;
  }
  & img.attack {
    transition: 0.1s;
    transform: translateX(100px);
  }
  & img.damage {
    opacity: 1;
    animation: ${flash} 0.3s 0.3s infinite;
  }
`

export const NPCSprite = styled.div`
  & img.static {
    transform: translateX(0px);
    transform: translateY(0px);
    transition: 0.5s;
  }
  & img.attack {
    transition: 0.1s;
    transform: translateX(-100px);
  }
  & img.damage {
    opacity: 1;
    animation: ${flash} 0.3s 0.3s infinite;
  }
`

// .magic {
//   transition: 0.2s;
//   transform: translateY(-25px);
//   animation: shake 0.5s infinite;
// }

// .damage {
//   opacity: 1;
//   animation: flash 0.3s 0.3s infinite;
// }

// @keyframes shake {
//   0 % {
//     transform: translate(1px, 1px) rotate(0deg) translateY(- 25px);
// }
// 10 % {
//   transform: translate(-1px, -2px) rotate(- 1deg) translateY(-25px);
//   }
// 20 % {
//   transform: translate(-3px, 0px) rotate(1deg) translateY(- 25px);
//   }
// 30 % {
//   transform: translate(3px, 2px) rotate(0deg) translateY(- 25px);
//   }
// 40 % {
//   transform: translate(1px, -1px) rotate(1deg) translateY(- 25px);
//   }
// 50 % {
//   transform: translate(-1px, 2px) rotate(- 1deg) translateY(-25px);
//   }
// 60 % {
//   transform: translate(-3px, 1px) rotate(0deg) translateY(- 25px);
//   }
// 70 % {
//   transform: translate(3px, 1px) rotate(- 1deg) translateY(-25px);
//   }
// 80 % {
//   transform: translate(-1px, -1px) rotate(1deg) translateY(- 25px);
//   }
// 90 % {
//   transform: translate(1px, 2px) rotate(0deg) translateY(- 25px);
//   }
// 100 % {
//   transform: translate(1px, -2px) rotate(- 1deg) translateY(-25px);
//   }
// }