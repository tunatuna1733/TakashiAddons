import settings from '../../settings';
import { data } from '../../utils/data';
import { Hud } from '../../utils/hud';
import hud_manager from '../../utils/hud_manager';
import getItemId from '../../utils/item_id';
import { registerWhen } from '../../utils/register';

let reaperUsed = 0;
let isActive = false;
let ragaxeIncluded = false;
let reaperIncluded = false;
const reaperHud = new Hud('reaper', '&6Reaper: &aREADY', hud_manager, data);

const moduleName = 'Reaper Armor HUD';

const isReaperChestplate = (cp) => {
  let isReaper = false;
  cp.getLore().forEach((lore) => {
    if (lore.toString().includes('#FF0000') && getItemId(cp) == 'REAPER_CHESTPLATE') isReaper = true;
  });
  return isReaper;
};

registerWhen(
  register('soundPlay', () => {
    setTimeout(() => {
      const chestplate = Player.armor.getChestplate();
      if (chestplate !== null && isReaperChestplate(chestplate) && !isActive) {
        reaperUsed = Date.now();
        isActive = true;
      }
    }, 100);
  }).setCriteria('mob.zombie.remedy'),
  () => settings.reaperhud,
  { type: 'soundPlay', name: moduleName },
);

registerWhen(
  register('step', () => {
    ragaxeIncluded = false;
    reaperIncluded = false;
    if (Player.getInventory() !== null) {
      try {
        Player.getInventory()
          .getItems()
          .forEach((item) => {
            if (item) {
              try {
                const itemID = getItemId(item);
                if (itemID == 'RAGNAROCK_AXE') ragaxeIncluded = true;
                if (itemID == 'REAPER_CHESTPLATE') reaperIncluded = true;
              } catch (_e) {
                // maybe not skyblock item ?
              }
            }
          });
      } catch (_e) {}
    }
  }).setDelay(1),
  () => settings.reaperhud,
  { type: 'step', name: moduleName },
);

registerWhen(
  register('renderOverlay', () => {
    const cd = ((25 * 1000 - (Date.now() - reaperUsed)) / 1000).toFixed(1);
    if (cd < 25 - 6) isActive = false;
    if (reaperIncluded) {
      if (reaperUsed === 0 || cd < 0) {
        reaperHud.draw('&6Reaper: &aREADY');
      } else if (isActive) {
        reaperHud.draw(`&6Reaper: &c${cd}s &aACTIVE`);
      } else {
        reaperHud.draw(`&6Reaper: &c${cd}s`);
      }
    }
  }),
  () => settings.reaperhud,
  { type: 'renderOverlay', name: moduleName },
);

register('worldUnload', () => {
  reaperUsed = 0;
  isActive = false;
});
