import RenderLib from '../../../RenderLib';
import settings from '../../settings';
import { registerWhen } from '../../utils/register';

const starMobRegex = /^§?.?.\s?§6✯ (?:§.)*(.+)§r.+§c❤$|^(Shadow Assassin)$/;
const starMobsRegex = /^.*[✯✰].*❤$/;

let renderMobs = [];

registerWhen(
  register('step', () => {
    renderMobs = [];
    World.getAllEntities().forEach((e) => {
      const match = e.getName().match(starMobsRegex);
      if (!match) return;
      renderMobs.push(e);
    });
  }).setDelay(1),
  () => settings.starmob,
  { type: 'step', name: 'Star Mob Box' },
);

registerWhen(
  register('renderWorld', () => {
    renderMobs.forEach((mob) => {
      RenderLib.drawEspBox(mob.getX(), mob.getY() - 2, mob.getZ(), 1, 2, 1, 0, 0, 1, true);
    });
  }),
  () => settings.starmob,
  { type: 'renderWorld', name: 'Star Mob Box' },
);
