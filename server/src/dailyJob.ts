/* eslint-disable no-console */
import { BruteWithBodyColors, pad } from '@labrute/core';
import { PrismaClient, TournamentType } from '@labrute/prisma';
import generateFight from './utils/fight/generateFight.js';
import shuffle from './utils/shuffle.js';

const dailyJob = (prisma: PrismaClient) => async () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  console.log('-------------------------------');
  console.log('- Starting tournament handler -');
  // Get brutes who registered today and are not in a tournament
  const registeredBrutes = await prisma.brute.findMany({
    where: {
      tournament: {
        // TODO: Doesn't work
        gte: today,
        lt: tomorrow,
      },
      tournaments: {
        none: {
          type: TournamentType.DAILY,
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
      },
    },
    include: {
      body: true,
      colors: true,
    },
  });

  // All brutes are assigned, do nothing
  if (registeredBrutes.length === 0) {
    console.log('- Tournaments already handled -');
    console.log('-------------------------------');
    return;
  }

  const tournamentsToCreate = Math.ceil(registeredBrutes.length / 64);

  console.log(`-  Tournaments to create: ${pad(tournamentsToCreate, 3, ' ')} -`);

  // Create groups of 64 brutes
  let tournaments: BruteWithBodyColors[][] = Array(tournamentsToCreate)
    .fill([])
    .map((_, index) => registeredBrutes.slice(index * 64, index * 64 + 64));

  // Fill last group with generated brutes
  if (tournaments.length && tournaments[tournaments.length - 1].length) {
    const lastTournament = tournaments[tournaments.length - 1];

    const highestLevelBrute = lastTournament
      .sort((a, b) => a.level - b.level)[lastTournament.length - 1].level;

    // Get generated brutes at level lower or equal to highest level brute
    let generatedBrutes = await prisma.brute.findMany({
      where: {
        user: null,
        level: {
          lte: highestLevelBrute,
        },
      },
      include: {
        body: true,
        colors: true,
      },
    });

    // Shuffle generated brutes
    generatedBrutes = shuffle(generatedBrutes);

    if (lastTournament.length !== 64) {
      lastTournament.push(...generatedBrutes.slice(0, 64 - lastTournament.length));
    }

    if (lastTournament.length !== 64) {
      // Remove tournament registration for those brutes
      await prisma.brute.updateMany({
        where: {
          id: {
            in: lastTournament.map((brute) => brute.id),
          },
        },
        data: {
          tournament: null,
        },
      });

      throw new Error('Not enough generated brutes to fill the tournament');
    }
  }

  // Remove empty tournaments and shuffle each tournament
  tournaments = tournaments.filter(Boolean).map((tournament) => shuffle(tournament));

  // Create tournaments
  for (const brutes of tournaments) {
    // Create tournament
    // eslint-disable-next-line no-await-in-loop
    const tournament = await prisma.tournament.create({
      data: {
        date: new Date(),
        participants: {
          connect: brutes.map((brute) => ({ id: brute.id })),
        },
      },
    });

    // Create tournament steps (1 to 32 for first round, 33 to 48 for 2nd, etc etc)
    let step = 1;
    let roundBrutes = [...brutes];
    let winners: BruteWithBodyColors[] = [];
    while (roundBrutes.length > 1) {
      for (let i = 0; i < roundBrutes.length - 1; i += 2) {
        const brute1 = roundBrutes[i];
        const brute2 = roundBrutes[i + 1];

        // eslint-disable-next-line no-await-in-loop
        const generatedFight = await generateFight(prisma, brute1, brute2);

        // Create fight
        // eslint-disable-next-line no-await-in-loop
        const fight = await prisma.fight.create({
          data: generatedFight,
          select: { id: true },
        });

        // Add winner to next round
        winners.push(brute1.name === generatedFight.winner ? brute1 : brute2);

        // Create tournament step
        // eslint-disable-next-line no-await-in-loop
        await prisma.tournamentStep.create({
          data: {
            tournament: { connect: { id: tournament.id } },
            step,
            fight: { connect: fight },
          },
        });

        step++;
      }

      // Continue with winners
      roundBrutes = [...winners];
      winners = [];
    }

    console.log('-              OK             -');
  }

  console.log('-     Tournaments handled     -');
  console.log('-------------------------------');
};

export default dailyJob;