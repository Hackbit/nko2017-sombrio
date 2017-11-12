import React from 'react'
import { Motion, spring } from 'react-motion'
import { connect } from 'react-redux'
import GameOverOverlay from './GameOverOverlay'
import StartScreenOverlay from './StartScreenOverlay'
import {
  moveToPixels,
  stageModificationInPixels,
  objectsInPixes,
  playerInPixels,
  monsterInPixels,
  targetInPixel,
  resurrect,
  tombstonesInPixels,
  start,
  calculateScore,
} from '../store'

const styles = {
  svg: {
    background: '#2E2727',
  },
}

const Wall = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <g id="wall" style={{ transform: 'translate(2px, 2px)', fill: 'black' }}>
      <path d="M21.4896889,5.79973333 L21.4896889,20.1643556 C21.4896889,20.8911111 20.8817778,21.4710222 20.1220444,21.4710222 L5.86382222,21.4710222 C5.10844444,21.4710222 4.49368889,20.8911111 4.49368889,20.1643556 L4.49368889,5.79973333 C4.49368889,5.07297778 5.10844444,4.48871111 5.86382222,4.48871111 L20.1220444,4.48871111 C20.8817778,4.48871111 21.4896889,5.07297778 21.4896889,5.79973333 Z M25.9858667,2.66 L25.9858667,23.2991111 C25.9858667,24.7719111 24.7600889,25.9591111 23.24,25.9591111 L2.75022222,25.9591111 C1.23262222,25.9591111 0,24.7712889 0,23.2991111 L0,2.66 C0,1.1872 1.23262222,0 2.75022222,0 L23.24,0 C24.7600889,5.5264435e-16 25.9858667,1.18782222 25.9858667,2.66 Z M23.744,4.93048889 C23.744,3.44337778 22.5020444,2.24186667 20.9838222,2.24186667 L5.0064,2.24186667 C3.48631111,2.24186667 2.2512,3.44337778 2.2512,4.93048889 L2.2512,21.0242667 C2.2512,22.5064 3.48631111,23.7178667 5.0064,23.7178667 L20.9838222,23.7178667 C22.5014222,23.7178667 23.744,22.5064 23.744,21.0242667 L23.744,4.93048889 Z M50.1355556,4.48871111 L35.8779556,4.48871111 C35.1200889,4.48871111 34.5053333,5.07297778 34.5053333,5.79973333 L34.5053333,20.1643556 C34.5053333,20.8911111 35.1200889,21.4710222 35.8779556,21.4710222 L50.1355556,21.4710222 C50.8934222,21.4710222 51.5063111,20.8911111 51.5063111,20.1643556 L51.5063111,5.79973333 C51.5063111,5.07297778 50.8934222,4.48871111 50.1355556,4.48871111 Z M56,2.66 L56,23.2991111 C56,24.7719111 54.7717333,25.9591111 53.2522667,25.9591111 L32.7618667,25.9591111 C31.2511111,25.9591111 30.0116444,24.7712889 30.0116444,23.2991111 L30.0116444,2.66 C30.0116444,1.1872 31.2511111,0 32.7618667,0 L53.2522667,0 C54.7717333,5.5264435e-16 56,1.18782222 56,2.66 Z M53.7575111,4.93048889 C53.7575111,3.44337778 52.5155556,2.24186667 50.9954667,2.24186667 L35.0205333,2.24186667 C33.5010667,2.24186667 32.2628444,3.44337778 32.2628444,4.93048889 L32.2628444,21.0242667 C32.2628444,22.5064 33.5004444,23.7178667 35.0205333,23.7178667 L50.9954667,23.7178667 C52.5155556,23.7178667 53.7575111,22.5064 53.7575111,21.0242667 L53.7575111,4.93048889 L53.7575111,4.93048889 Z M20.1220444,34.2726222 L5.86382222,34.2726222 C5.10844444,34.2726222 4.49368889,34.8568889 4.49368889,35.5836444 L4.49368889,49.9482667 C4.49368889,50.6700444 5.10844444,51.2499556 5.86382222,51.2499556 L20.1220444,51.2499556 C20.8817778,51.2499556 21.4896889,50.6700444 21.4896889,49.9482667 L21.4896889,35.5842667 C21.4896889,34.8575111 20.8817778,34.2726222 20.1220444,34.2726222 Z M25.9858667,32.4389333 L25.9858667,53.0886222 C25.9858667,54.5564444 24.7600889,55.7442667 23.24,55.7442667 L2.75022222,55.7442667 C1.23262222,55.7442667 0,54.5570667 0,53.0886222 L0,32.4389333 C0,30.9717333 1.23262222,29.7795556 2.75022222,29.7795556 L23.24,29.7795556 C24.7600889,29.7789333 25.9858667,30.9711111 25.9858667,32.4389333 Z M23.744,34.7193778 C23.744,33.2279111 22.5020444,32.0257778 20.9838222,32.0257778 L5.0064,32.0257778 C3.48631111,32.0257778 2.2512,33.2279111 2.2512,34.7193778 L2.2512,50.8081778 C2.2512,52.2853333 3.48631111,53.5011556 5.0064,53.5011556 L20.9838222,53.5011556 C22.5014222,53.5011556 23.744,52.2853333 23.744,50.8081778 L23.744,34.7193778 Z M50.1355556,34.2726222 L35.8779556,34.2726222 C35.1200889,34.2726222 34.5053333,34.8568889 34.5053333,35.5836444 L34.5053333,49.9482667 C34.5053333,50.6700444 35.1200889,51.2499556 35.8779556,51.2499556 L50.1355556,51.2499556 C50.8934222,51.2499556 51.5063111,50.6700444 51.5063111,49.9482667 L51.5063111,35.5842667 C51.5063111,34.8575111 50.8934222,34.2726222 50.1355556,34.2726222 Z M56,32.4389333 L56,53.0886222 C56,54.5564444 54.7717333,55.7442667 53.2522667,55.7442667 L32.7618667,55.7442667 C31.2511111,55.7442667 30.0116444,54.5570667 30.0116444,53.0886222 L30.0116444,32.4389333 C30.0116444,30.9717333 31.2511111,29.7795556 32.7618667,29.7795556 L53.2522667,29.7795556 C54.7717333,29.7789333 56,30.9711111 56,32.4389333 Z M53.7575111,34.7193778 C53.7575111,33.2279111 52.5155556,32.0257778 50.9954667,32.0257778 L35.0205333,32.0257778 C33.5010667,32.0257778 32.2628444,33.2279111 32.2628444,34.7193778 L32.2628444,50.8081778 C32.2628444,52.2853333 33.5004444,53.5011556 35.0205333,53.5011556 L50.9954667,53.5011556 C52.5155556,53.5011556 53.7575111,52.2853333 53.7575111,50.8081778 L53.7575111,34.7193778 L53.7575111,34.7193778 Z" />
    </g>
  </g>
)

const Target = ({ position }) => (
  <g
    style={{
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <g id="pointer" style={{ transform: 'translate(5px, 5px)', fill: '#6600CC' }}>
      <path d="M31.7029762,24.8547619 C31.7029762,28.5565476 28.7017857,31.5577381 25,31.5577381 C21.2982143,31.5577381 18.2970238,28.5565476 18.2970238,24.8547619 C18.2970238,21.1529762 21.2982143,18.1517857 25,18.1517857 C28.7017857,18.1517857 31.7029762,21.152381 31.7029762,24.8547619 Z" />
      <path d="M30.0077381,42.7291667 L27.2345238,42.7291667 L27.2345238,47.197619 C27.2345238,48.4315476 26.2339286,49.4321429 25,49.4321429 C23.7660714,49.4321429 22.7654762,48.4315476 22.7654762,47.197619 L22.7654762,42.7291667 L19.9922619,42.7291667 C19.3666667,42.7291667 19.0535714,41.972619 19.4958333,41.5303571 L24.5035714,36.522619 C24.7779762,36.2482143 25.222619,36.2482143 25.4964286,36.522619 L30.5041667,41.5303571 C30.9464286,41.972619 30.6333333,42.7291667 30.0077381,42.7291667 Z" />
      <path d="M30.5041667,8.46964286 L25.4964286,13.477381 C25.2220238,13.7517857 24.777381,13.7517857 24.5035714,13.477381 L19.4958333,8.46964286 C19.0535714,8.02738095 19.3666667,7.27083333 19.9922619,7.27083333 L22.7654762,7.27083333 L22.7654762,2.80238095 C22.7654762,1.56845238 23.7660714,0.567857143 25,0.567857143 C26.2339286,0.567857143 27.2345238,1.56845238 27.2345238,2.80238095 L27.2345238,7.27083333 L30.0077381,7.27083333 C30.6333333,7.27083333 30.9464286,8.02738095 30.5041667,8.46964286 Z" />
      <path d="M42.7291667,19.9922619 L42.7291667,22.7654762 L47.197619,22.7654762 C48.4315476,22.7654762 49.4321429,23.7660714 49.4321429,25 C49.4321429,26.2339286 48.4315476,27.2345238 47.197619,27.2345238 L42.7291667,27.2345238 L42.7291667,30.0077381 C42.7291667,30.6333333 41.972619,30.9464286 41.5303571,30.5041667 L36.522619,25.4964286 C36.2482143,25.2220238 36.2482143,24.777381 36.522619,24.5035714 L41.5303571,19.4958333 C41.972619,19.0535714 42.7291667,19.3666667 42.7291667,19.9922619 Z" />
      <path d="M8.46964286,19.4958333 L13.477381,24.5035714 C13.7517857,24.7779762 13.7517857,25.222619 13.477381,25.4964286 L8.46964286,30.5041667 C8.02738095,30.9464286 7.27083333,30.6333333 7.27083333,30.0077381 L7.27083333,27.2345238 L2.80238095,27.2345238 C1.56845238,27.2345238 0.567857143,26.2339286 0.567857143,25 C0.567857143,23.7660714 1.56845238,22.7654762 2.80238095,22.7654762 L7.27083333,22.7654762 L7.27083333,19.9922619 C7.27083333,19.3666667 8.02738095,19.0535714 8.46964286,19.4958333 Z" />
    </g>
  </g>
)

const Player = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <g id="player" style={{ transform: 'translate(5px, 16px)', fill: '#000000' }}>
      <circle
        cx="13.9954643"
        cy="14.1338929"
        id="Oval"
        r="10"
        transform="translate(13.995464, 14.133893) rotate(-65.626222) translate(-13.995464, -14.133893)"
        style={{ fill: '#FFFFFF' }}
      />
      <circle cx="36.0119048" cy="14.1071429" id="Oval" r="10" style={{ fill: '#FFFFFF' }} />
      <path d="M36.0119048,0.416666667 C31.4880952,0.416666667 27.2619048,2.73809524 24.8214286,6.42857143 C22.3809524,2.73809524 18.1547619,0.416666667 13.6309524,0.416666667 C6.25,0.416666667 0.238095238,6.42857143 0.238095238,13.8095238 C0.238095238,21.1904762 6.25,27.202381 13.6309524,27.202381 C18.1547619,27.202381 22.3809524,24.8809524 24.8214286,21.1904762 C27.2619048,24.8809524 31.4880952,27.202381 36.0119048,27.202381 C43.3928571,27.202381 49.4047619,21.1904762 49.4047619,13.8095238 C49.4047619,6.42857143 43.452381,0.416666667 36.0119048,0.416666667 Z M36.0119048,24.8809524 C31.6666667,24.8809524 27.6785714,22.2619048 25.8928571,18.2738095 L24.8214286,15.7738095 L23.75,18.2738095 C21.9642857,22.2619048 18.0357143,24.8809524 13.6309524,24.8809524 C7.55952381,24.8809524 2.61904762,19.9404762 2.61904762,13.8690476 C2.61904762,7.79761905 7.55952381,2.85714286 13.6309524,2.85714286 C17.9761905,2.85714286 21.9642857,5.41666667 23.75,9.46428571 L24.8214286,11.9642857 L25.8928571,9.46428571 C27.6785714,5.47619048 31.6071429,2.85714286 36.0119048,2.85714286 C42.0833333,2.85714286 47.0238095,7.79761905 47.0238095,13.8690476 C47.0238095,19.9404762 42.1428571,24.8809524 36.0119048,24.8809524 Z" />
      <circle
        cx="13.9954643"
        cy="14.1338929"
        id="Oval"
        r="5.89303422"
        transform="translate(13.995464, 14.133893) rotate(-65.626222) translate(-13.995464, -14.133893)"
        style={{ fill: '#000000' }}
      />
      <circle
        cx="36.0119048"
        cy="14.1071429"
        id="Oval"
        r="5.89285714"
        style={{ fill: '#000000' }}
      />
    </g>
  </g>
)

const Monster = ({ position }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <g id="monster" style={{ transform: 'translate(16px, 12px)', fill: '#ACE000' }}>
      <path d="M8.70967742,6.19354839 C10.1290323,5.90322581 11.2258065,4.64516129 11.2258065,3.12903226 C11.2258065,1.41935484 9.80645161,3.55271368e-15 8.06451613,3.55271368e-15 C6.32258065,3.55271368e-15 4.90322581,1.38709677 4.90322581,3.12903226 C4.90322581,4.64516129 6,5.90322581 7.41935484,6.19354839 L7.41935484,10.0322581 C7.83870968,9.80645161 8.25806452,9.58064516 8.70967742,9.38709677 L8.70967742,6.19354839 Z" />
      <path d="M21.6129032,6.19354839 C23.0322581,5.90322581 24.1290323,4.64516129 24.1290323,3.12903226 C24.1290323,1.41935484 22.7096774,3.55271368e-15 20.9677419,3.55271368e-15 C19.2258065,3.55271368e-15 17.8064516,1.38709677 17.8064516,3.12903226 C17.8064516,4.64516129 18.8709677,5.90322581 20.3225806,6.19354839 L20.3225806,9.38709677 C20.7741935,9.58064516 21.1935484,9.80645161 21.6129032,10.0322581 L21.6129032,6.19354839 Z" />
      <path d="M17,24.1935484 C17,25.5483871 15.8709677,26.6451613 14.516129,26.6451613 C13.1612903,26.6451613 12.0322581,25.5483871 12.0322581,24.1935484 C12.0322581,22.8387097 13.1612903,21.7419355 14.516129,21.7419355 C15.8709677,21.7419355 17,22.8387097 17,24.1935484 Z" />
      <path d="M21.6129032,11.3225806 C21.1935484,11.0967742 20.7741935,10.8709677 20.3225806,10.6774194 C18.5483871,9.90322581 16.5806452,9.4516129 14.516129,9.4516129 C12.4516129,9.4516129 10.483871,9.90322581 8.70967742,10.6774194 C8.25806452,10.8709677 7.83870968,11.0967742 7.41935484,11.3225806 C3.16129032,13.7419355 0.290322581,18.2903226 0.290322581,23.4516129 L0.290322581,35.1935484 C0.290322581,36.6129032 1.03225806,37.8709677 2.29032258,38.5806452 C3.58064516,39.2903226 5.06451613,39.2580645 6.32258065,38.483871 C7.19354839,37.9354839 8.29032258,37.9354839 9.16129032,38.483871 C10.8064516,39.516129 12.6774194,40 14.5483871,40 C16.4193548,40 18.2903226,39.483871 19.9354839,38.483871 C20.8064516,37.9354839 21.9032258,37.9354839 22.7741935,38.483871 C24,39.2580645 25.516129,39.2903226 26.8064516,38.5806452 C28.0645161,37.8709677 28.8064516,36.6129032 28.8064516,35.1935484 L28.8064516,23.4516129 C28.7419355,18.2580645 25.8709677,13.7419355 21.6129032,11.3225806 Z M14.516129,29.483871 C11.0645161,29.483871 8.22580645,26.7096774 8.22580645,23.2903226 C8.22580645,19.8709677 11.0322581,17.0967742 14.516129,17.0967742 C18,17.0967742 20.8064516,19.8709677 20.8064516,23.2903226 C20.8064516,26.6774194 17.9677419,29.483871 14.516129,29.483871 Z" />
    </g>
  </g>
)

const Tombstone = ({ position, faded }) => (
  <g
    style={{
      transition: 'transform 1s linear',
      transform: `translate(${position[0]}px, ${position[1]}px)`,
    }}
  >
    <g
      id="gravestone"
      style={{ fill: '#b266ff', opacity: faded ? 0.4 : 1, transform: 'translate(12px, 10px)' }}
    >
      <path
        d="M18.319335,0.00166666667 C15.9325483,0.00166666667 13.6915592,0.61475 11.73929,1.68533333 L15.2838292,3.33033333 L16.2722333,6.29208333 L14.9941217,6.71866667 L14.1900767,4.30816667 L10.38738,2.54383333 C6.90252583,5.02416667 4.62549192,9.08516667 4.62549192,13.69025 L4.62549192,13.69025 L4.62549192,33.7078333 L11.53911,33.7078333 L9.02684,30.56175 L7.559155,30.56175 L7.559155,29.2134167 L9.67466083,29.2134167 L10.7894467,30.6091667 L11.4882333,28.5111667 L13.5264358,27.4929167 L14.1286833,28.6973333 L12.5925033,29.468 L11.7936717,31.8644167 L13.2666608,33.7078333 L32.0412225,33.7078333 L32.0412225,32.27 L26.0528183,31.415 L23.1946608,27.6053333 L24.2743908,26.796 L24.75538,27.43675 L26.1125033,25.402 L27.2343008,26.1499167 L25.6138967,28.5796667 L26.7971775,30.158 L32.0412225,30.9058333 L32.0412225,13.6621667 C32.0412225,11.6579167 31.5921442,9.76058333 30.8157842,8.04775 L31.119515,8.95708333 L28.7002792,9.76291667 L27.93129,11.3008333 L26.7251775,10.6969167 L27.7452225,8.66041667 L30.6455375,7.69483333 C28.4183008,3.13533333 23.7453125,-0.00541666667 18.319335,1.86221409e-13 L18.319335,0.00166666667 Z"
        id="Shape"
      />
      <polygon id="Shape" points="0.131109833 35 36.535605 35 36.535605 40 0.131109833 40" />
    </g>
  </g>
)

const App = ({
  width,
  height,
  gameOver,
  objects,
  playerPosition,
  monsterPosition,
  targetPosition,
  tombstones,
  started,
  onMove,
  onModify,
  onResurrect,
  onStart,
  scale,
  score,
}) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width, height }}>
    {gameOver ||
      !started || (
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            color: 'white',
            fontFamily: 'Helvetica',
            fontWeight: 'bold',
          }}
        >
          {score}
        </div>
      )}

    {gameOver && (
      <GameOverOverlay score={score} onResurrect={onResurrect} width={width} height={height} />
    )}
    {started || <StartScreenOverlay onStart={onStart} width={width} height={height} />}
    <Motion
      defaultStyle={{
        x: targetPosition[0],
        y: targetPosition[1],
      }}
      style={{
        x: spring(targetPosition[0], { stiffness: 20, damping: 15 }),
        y: spring(targetPosition[1], { stiffness: 20, damping: 15 }),
      }}
    >
      {style => {
        const x = style.x - width * scale / 2
        const y = style.y - height * scale / 2

        return (
          <svg
            viewBox={`${x} ${y} ${width * scale} ${height * scale}`}
            width={width}
            height={height}
            style={styles.svg}
            onContextMenu={e => onModify([e.clientX + x, e.clientY + y])}
            onClick={e => onMove([e.clientX + x, e.clientY + y])}
          >
            {gameOver ? (
              <Tombstone position={playerPosition} />
            ) : (
              <g>
                <Target position={targetPosition} />
                <Player position={playerPosition} />
                <Monster position={monsterPosition} />
              </g>
            )}

            {tombstones.map(({ position }) => (
              <Tombstone faded key={position.join('-') + '-tombstones'} position={position} />
            ))}
            {objects.map(({ position }) => (
              <Wall key={position.join('-') + '-walls'} position={position} />
            ))}
            <rect stroke="black" fill="none" x={0} y={0} width={200 * 60} height={200 * 60} />
          </svg>
        )
      }}
    </Motion>
  </div>
)

const mapStateToProps = state => ({
  width: state.windowSize[0],
  height: state.windowSize[1],
  objects: objectsInPixes(state),
  playerPosition: playerInPixels(state),
  monsterPosition: monsterInPixels(state),
  targetPosition: targetInPixel(state),
  scale: state.scale,
  started: state.started,
  gameOver: state.gameOver,
  tombstones: tombstonesInPixels(state),
  score: calculateScore(state),
})

const mapDispatchToProps = dispatch => ({
  onMove: positionInPixels => dispatch(moveToPixels(positionInPixels)),
  onModify: positionInPixels => dispatch(stageModificationInPixels(positionInPixels)),
  onResurrect: () => dispatch(resurrect()),
  onStart: () => dispatch(start()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
