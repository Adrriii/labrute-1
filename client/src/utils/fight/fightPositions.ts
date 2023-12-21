import { AnimationFighter } from './findFighter';
import { randomBetween } from '@labrute/core';

const leftPositions = [
  { x: 60, y: 170 },
  { x: 40, y: 185 },
  { x: 60, y: 200 },
  { x: 40, y: 215 },
  { x: 60, y: 230 },
  { x: 40, y: 245 },
  { x: 60, y: 260 },
];

const rightPositions = [
  { x: 440, y: 170 },
  { x: 460, y: 185 },
  { x: 440, y: 200 },
  { x: 460, y: 215 },
  { x: 440, y: 230 },
  { x: 460, y: 245 },
  { x: 440, y: 260 },
];

const getAvailablePositions = (fighters: AnimationFighter[], team: 'left' | 'right') => {
  const teamFighters = fighters.filter((fighter) => fighter.animation.team === team);

  return (team === 'left' ? leftPositions : rightPositions)
    .filter((p) => !teamFighters.find((f) => f.animation.container.x === p.x
    && f.animation.container.y === p.y));
};

const getRandomPosition = (fighters: AnimationFighter[], team: 'left' | 'right') => {
  const availablePositions = getAvailablePositions(fighters, team);

  if (availablePositions.length === 0) {
    throw new Error('No available positions');
  }

  const random = randomBetween(0, availablePositions.length - 1);

  return availablePositions[random];
};

export {
  getAvailablePositions,
  getRandomPosition
};