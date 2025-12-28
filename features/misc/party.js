import axios from 'axios';
import { CHAT_PREFIX } from '../../data/chat';
import settings from '../../settings';
import { partyWhitelist } from '../../utils/data';
import { getIGN } from '../../utils/ign';
import { registerWhen } from '../../utils/register';

register('command', (...args) => {
  if (!args || typeof args === 'undefined') {
    ChatLib.chat(`${CHAT_PREFIX} &c[Error] Please provide arguments: add, remove, list`);
    return;
  }
  if (args[0] === 'add') {
    if (args.length < 2) {
      ChatLib.chat(`${CHAT_PREFIX} &c[Error] Please provide an MCID to add!`);
      return;
    }
    ChatLib.chat(`${CHAT_PREFIX} &eFetching UUID for &b${args[1]}&e...`);
    const url = `https://api.mojang.com/users/profiles/minecraft/${args[1]}`;
    axios.get(url).then((res) => {
      const uuid = res.data.id;
      partyWhitelist.uuids.push(uuid);
      partyWhitelist.save();
      ChatLib.chat(`${CHAT_PREFIX} &aSuccessfully added &b${args[1]} &ato the party whitelist!`);
    });
  } else if (args[0] === 'remove') {
    if (args.length < 2) {
      ChatLib.chat(`${CHAT_PREFIX} &c[Error] Please provide an MCID to remove!`);
      return;
    }
    ChatLib.chat(`${CHAT_PREFIX} &eFetching UUID for &b${args[1]}&e...`);
    const url = `https://api.mojang.com/users/profiles/minecraft/${args[1]}`;
    axios.get(url).then((res) => {
      const uuid = res.data.id;
      const index = partyWhitelist.uuids.indexOf(uuid);
      if (index > -1) {
        partyWhitelist.uuids.splice(index, 1);
        partyWhitelist.save();
        ChatLib.chat(`${CHAT_PREFIX} &aSuccessfully removed &b${args[1]} &afrom the party whitelist!`);
      } else {
        ChatLib.chat(`${CHAT_PREFIX} &c[Error] &b${args[1]} &cis not in the party whitelist!`);
      }
    });
  } else if (args[0] === 'list') {
    if (partyWhitelist.uuids.length === 0) {
      ChatLib.chat(`${CHAT_PREFIX} &eThe party whitelist is currently empty.`);
      return;
    }
    ChatLib.chat(`${CHAT_PREFIX} &eParty Whitelist:`);
    partyWhitelist.uuids.forEach((uuid) => {
      const url = `https://api.mojang.com/user/profile/${uuid}`;
      axios.get(url).then((res) => {
        const name = res.data.name;
        ChatLib.chat(`&b- ${name} (&e${uuid}&b)`);
      });
    });
  } else {
    ChatLib.chat(`${CHAT_PREFIX} &c[Error] Unknown argument &b${args[0]}&c! Use: add, remove, list`);
  }
})
  .setCommandName('partywhitelist', true)
  .setAliases(['pw']);

registerWhen(
  register('chat', (player) => {
    const mcid = getIGN(player);
    const url = `https://api.mojang.com/users/profiles/minecraft/${mcid}`;
    axios.get(url).then((res) => {
      const uuid = res.data.id;
      if (partyWhitelist.uuids.includes(uuid)) {
        ChatLib.chat(`${CHAT_PREFIX} &aAuto-accepting party invite from &b${mcid}&a...`);
        ChatLib.command(`party accept ${mcid}`);
      }
    });
  })
    .setChatCriteria(
      '-----------------------------------------------------\n${player} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------',
    )
    .setContains(),
  () => settings.autoacceptparty,
  { type: 'chat', name: 'Auto Accept Party' },
);
