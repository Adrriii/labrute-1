import { Brute } from '@eternaltwin/labrute-core/types';

const getBruteIndependentStats = (brute: Brute) => {
  /* INITIATIVE */
  const initiative = 0; // Not sure what's the real base value for this

  // // +2 initiative for `firstStrike` LB v2
  // if (brute.data.skills.includes('firstStrike')) {
  //   initiative += 2;
  // }
  // // -2 initiative for `reconnaissance` LB v2
  // if (brute.data.skills.includes('reconnaissance')) {
  //   initiative -= 2;
  // }

  /* COUNTER RATE */
  let counterRate = 0;

  // +10% counterRate for `sixthSense`
  if (brute.data.skills.includes('sixthSense')) {
    counterRate += 0.1;
  }

  /* COMBO RATE */
  // Temporary formula (until the real one is found)
  // 50% chance of combo for agi = level here
  let comboRate = (brute.data.stats.agility.value / brute.data.level) * 0.5;

  // +20% comboRate for `fistsOfFury`
  if (brute.data.skills.includes('fistsOfFury')) {
    comboRate += 0.2;
  }

  /* REVERSAL RATE */
  let reversalRate = 0;

  // +33% reversalRate for `hostility`
  if (brute.data.skills.includes('hostility')) {
    reversalRate += 0.33;
  }

  /* BLOCK RATE */
  let blockRate = 0;

  // +45% blockRate for `shield`
  if (brute.data.skills.includes('shield')) {
    blockRate += 0.45;
  }

  // // +10% blockRate for `counterAttack` LB v2
  // if (brute.data.skills.includes('counterAttack')) {
  //   blockRate += 0.1;
  // }

  /* ACCURACY */
  const accuracy = 1; // Not sure what's the real base value for this

  return {
    // Main stats
    hp: brute.data.stats.hp,
    strength: brute.data.stats.strength.value,
    agility: brute.data.stats.agility.value,
    speed: brute.data.stats.speed.value,
    // Hidden stats
    initiative,
    interval: 100, // 100 for hand combat ? Not sure
    counterRate,
    comboRate,
    reversalRate,
    blockRate,
    accuracy,
  };
};

const getBrutesFightStats = (brute1: Brute, brute2: Brute) => {
  const brute1IndependentStats = getBruteIndependentStats(brute1);
  const brute2IndependentStats = getBruteIndependentStats(brute2);

  /* EVASION */
  let brute1Evasion = 0; // TODO: add formula (depends on diff between both brutes agility)
  let brute2Evasion = 0; // TODO: add formula (depends on diff between both brutes agility)

  // +30% evasion for `untouchable`
  if (brute1.data.skills.includes('untouchable')) {
    brute1Evasion += 0.3;
  }
  if (brute2.data.skills.includes('untouchable')) {
    brute2Evasion += 0.3;
  }

  /* PRECISION */
  let brute1Precision = 0; // TODO: add formula (depends on diff between both brutes agility)
  let brute2Precision = 0; // TODO: add formula (depends on diff between both brutes agility)

  // +30% precision for `relentless`
  if (brute1.data.skills.includes('relentless')) {
    brute1Precision += 0.3;
  }
  if (brute2.data.skills.includes('relentless')) {
    brute2Precision += 0.3;
  }

  return {
    brute1: {
      ...brute1IndependentStats,
      evasion: brute1Evasion,
      precision: brute1Precision,
    },
    brute2: {
      ...brute2IndependentStats,
      evasion: brute2Evasion,
      precision: brute2Precision,
    },
  };
};

export default getBrutesFightStats;