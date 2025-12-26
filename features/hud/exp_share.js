import axios from 'axios';
import settings from '../../settings';
import { data, petData } from '../../utils/data';
import { formatNumToCoin } from '../../utils/format_coin';
import { Hud } from '../../utils/hud';
import hud_manager from '../../utils/hud_manager';
import { registerWhen } from '../../utils/register';
import { getRarityPrefix } from '../../utils/tier';

let guiOpen = false;

/**
 * Extract pet info
 * @param {Item} petItem
 */
const getPetInfo = (petItem) => {
  try {
    const petInfo = petItem.getNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('petInfo');
    return JSON.parse(petInfo);
  } catch (_e) {
    return;
  }
};

register('postGuiRender', () => {
  const inventory = Player.getContainer();
  if (!guiOpen && inventory && inventory.getName() === 'Exp Sharing') {
    guiOpen = true;
    const guiLoaded = register('tick', () => {
      guiLoaded.unregister();
      const uids = [];
      for (let i = 30; i <= 32; i++) {
        let slot = inventory.getStackInSlot(i);
        if (slot.getName().removeFormatting() !== 'No pet in slot') {
          uids.push({
            name: slot
              .getName()
              .removeFormatting()
              .replace(/\[Lvl\s\d*\]\s/g, ''),
            uniqueId: getPetInfo(slot).uniqueId,
          });
        }
      }
      petData.shareIds = uids;
      petData.save();
    });
  }
});

register('guiClosed', () => {
  guiOpen = false;
});

const moduleName = 'Exp Share HUD';
const expShareHud = new Hud('expshare', '&6Exp Share', hud_manager, data);

let expShareData = [];
let firstFetchDone = false;

const getPetName = (uniqueId) => {
  for (let i = 0; i < petData.shareIds.length; i++) {
    if (petData.shareIds[i].uniqueId === uniqueId) {
      return petData.shareIds[i].name;
    }
  }
  return 'Unknown';
};

registerWhen(
  register('step', () => {
    let ids = [];
    for (let i = 0; i < petData.shareIds.length; i++) {
      ids.push(petData.shareIds[i].uniqueId);
    }
    const url = `https://sb.tunatuna.dev/expshare?uuid=${Player.getUUID()}&expShareUIDs=${ids.join(',')}`;
    axios.get(url).then((response) => {
      expShareData = [];
      response.data.forEach((d) => {
        const name = getPetName(d.uniqueId);
        d.name = name;
        expShareData.push(d);
      });
      firstFetchDone = true;
    });
  }).setDelay(10),
  () => settings.expsharehud,
  { type: 'step', name: moduleName },
);

registerWhen(
  register('renderOverlay', () => {
    let displayText = '&6Exp Share\n';
    if (expShareData.length === 0 && !firstFetchDone) {
      displayText += '&cLoading...';
      expShareHud.draw(displayText);
      return;
    }
    expShareData.forEach((d) => {
      displayText += `${getRarityPrefix(d.tier)}${d.name}: &a${d.level} LVL\n`;
      if (d.level === 100 || d.level === 200) {
        displayText += `&e  Total: ${formatNumToCoin(Math.trunc(d.totalExp))}\n`;
        return;
      } else {
        displayText += `&e  ${formatNumToCoin(Math.trunc(d.currentExp))}/${formatNumToCoin(Math.trunc(d.currentExp + d.expToNextLevel))} XP\n`;
      }
    });
    expShareHud.draw(displayText);
  }),
  () => settings.expsharehud,
  { type: 'step', name: moduleName },
);
