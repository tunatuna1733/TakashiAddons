/// <reference types="../CTAutocomplete" />
/// <reference lib="es2022" />

import settings from './settings';
import { customHudsData, data, gardenData, inventoryData, resetData } from './utils/data';
import hud_manager from './utils/hud_manager';
import { setRegisters } from './utils/register';

const Toolkit = Java.type('java.awt.Toolkit');
const StringSelection = Java.type('java.awt.datatransfer.StringSelection');
const EssentialAPI = Java.type('gg.essential.api.EssentialAPI');
const EssentialNotifications = EssentialAPI.getNotifications();

import './features/hud/armor';
import './features/hud/equipment';
import './features/hud/reforge';
import './features/hud/ragnarock';
import './features/hud/lifeline';
import './features/hud/reaper';
import './features/hud/flare';
import './features/hud/inventory';
import './features/hud/kicked_timer';
import './features/hud/feeder';
import './features/hud/tablist';
import './features/hud/exp_share';

import './features/gui/fishing_timer';
import './features/gui/remember_inv';
import './features/gui/sea_creature_detector';

import './features/dungeon/starmob';

import './features/kuudra/dropship';

import './features/garden/pest_box';
import './features/garden/spray';
import './features/garden/pest_chunk';
import './features/garden/pest_title';
import './features/garden/fever_timer';

import './features/nether/ashfang';

import './features/mining/powder';
import './features/mining/glacite';

import './features/misc/norevminion';

import './utils/debug';

import { CHAT_PREFIX } from './data/chat';
import { openFishingTimer } from './features/gui/fishing_timer';
import { addCustomHud, loadHuds, removeCustomHud } from './features/hud/tablist';

data.autosave();
gardenData.autosave();
inventoryData.autosave();
customHudsData.autosave();

const printHelp = () => {
  ChatLib.chat('&dTakashiAddons Help');
  ChatLib.chat('&7|  &eRun &c"/takashi" &eto open settings.');
  ChatLib.chat('&7| &bCommands');
  ChatLib.chat('&7|  &c"/takashi scc"&7: &aPrint your scoreboard to chat so that you can copy it.');
  ChatLib.chat('&7|  &c"/takashi cpp"&7: &aCopy your purse text on your scoreboard.');
  ChatLib.chat('&7|  &c"/takashi fst"&7: &aOpen fishing timer in external window.');
  ChatLib.chat('&7|  &c"/takashi ri <name>"&7: &aSave the inventory.');
};

register('gameLoad', () => {
  if (!data.first) {
    ChatLib.command('takashi resetloc', true);
    data.first = true;
    data.save();
    ChatLib.chat('&a-------------------------------------');
    ChatLib.chat('      &bWelcome to &dTakashiAddons!');
    ChatLib.chat('&a Type /takashi to open settings');
    ChatLib.chat('&a-------------------------------------');
  }
  if (!data.helpPrinted) {
    ChatLib.command('takashi help', true);
    data.helpPrinted = true;
    data.save();
  }
});

register('guiClosed', (event) => {
  if (event.toString().includes('vigilance')) {
    setRegisters();
    loadHuds();
  }
});

register('gameUnload', () => {
  data.save();
  gardenData.save();
});

register('command', (args) => {
  if (!args) {
    settings.openGUI();
  } else if (args == 'movehud') {
    hud_manager.openGui();
  } else if (args == 'resetloc') {
    resetData();
  } else if (args == 'help') {
    printHelp();
  } else if (args == 'troll') {
    ChatLib.command('pc !ptme');
    Thread.sleep(1000);
    ChatLib.command('play arcade_dropper');
  } else if (args == 'reload') {
    ChatLib.chat(`${CHAT_PREFIX} &eReloading TakashiAddons...`);
    setRegisters();
    ChatLib.chat(`${CHAT_PREFIX} &eReload completed!`);
  } else if (args == 'scoreboardcopy' || args == 'sc') {
    const lines = Scoreboard.getLines(false);
    // biome-ignore lint/suspicious/useIterableCallbackReturn: chattriggers thingy
    lines.map((line) => {
      ChatLib.chat(
        `${line
          .getName()
          .removeFormatting()
          // biome-ignore lint/suspicious/noControlCharactersInRegex: chattriggers thingy
          .replace(/[^\x00-\x7F]/g, '')}`,
      );
    });
  } else if (args == 'copypurse' || args == 'cpp' || args == 'cp') {
    let copied = false;
    const lines = Scoreboard.getLines(false);
    // biome-ignore lint/suspicious/useIterableCallbackReturn: chattriggers thingy
    lines.map((line) => {
      if (line.getName().includes('Piggy') || line.getName().includes('Purse')) {
        const selection = new StringSelection(
          // biome-ignore lint/suspicious/noControlCharactersInRegex: chattriggers thingy
          ChatLib.removeFormatting(line.getName()).replace(/[^\x00-\x7F]/g, ''),
        );
        Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);
        EssentialNotifications.push('Purse copied!', 'Copied your purse to your clipboard.', 3);
        copied = true;
      }
    });
    if (!copied) ChatLib.chat(`${CHAT_PREFIX} &cFailed to copy your purse :(`);
  } else if (args == 'addhud') {
    addCustomHud();
  } else if (args == 'removehud') {
    removeCustomHud();
  } else if (args == 'fishingtimer' || args == 'fst') {
    openFishingTimer();
  }
})
  .setCommandName('takashi', true)
  .setAliases(['takashiaddons']);
