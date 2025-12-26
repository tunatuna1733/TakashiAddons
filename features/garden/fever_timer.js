import settings from '../../settings';
import { getCurrentArea } from '../../utils/area';
import { data } from '../../utils/data';
import { Hud } from '../../utils/hud';
import hud_manager from '../../utils/hud_manager';
import { registerWhen } from '../../utils/register';

const moduleName = 'Fever Timer';

const feverHud = new Hud('fevertimer', '&6Fever: &cNOT ACTIVE', hud_manager, data);

let isFeverNow = false;
let remainingTime = 60;

registerWhen(
  register('chat', () => {
    isFeverNow = true;
    remainingTime = 60;
  }).setChatCriteria('WOAH! You caught a case of the CROP FEVER for 60 seconds!'),
  () => settings.fevertimer && getCurrentArea() === 'Garden',
  { type: 'chat', name: moduleName },
);

registerWhen(
  register('step', () => {
    if (isFeverNow) {
      remainingTime--;
      if (remainingTime <= 0) {
        isFeverNow = false;
      }
    }
  }).setDelay(1),
  () => settings.fevertimer && getCurrentArea() === 'Garden',
  { type: 'step', name: moduleName },
);

registerWhen(
  register('renderOverlay', () => {
    if (isFeverNow) {
      feverHud.draw(`&6Fever: &a${remainingTime}s`);
    }
  }),
  () => settings.fevertimer && getCurrentArea() === 'Garden',
  { type: 'renderOverlay', name: moduleName },
);

register('worldUnload', () => {
  isFeverNow = false;
  remainingTime = 60;
});
