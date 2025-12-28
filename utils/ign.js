// reference: https://github.com/whats2000/GriffinOWO/blob/main/GriffinOwO/utils/Function.js#L92
export const getIGN = (player) => {
  let player_ign = player;

  // remove any suffixes that are not legal ign symbols starting from the tail
  player_ign = player_ign.replace(/[^0-9A-Za-z_]+$/, '');

  // preserve all legal ign symbols starting from the tail
  let match_list = player_ign.match(/[0-9A-Za-z_]+$/);

  if (match_list !== null) {
    player_ign = match_list[0];
  } else {
    player_ign = '';

    setTimeout(() => {
      ChatLib.chat(`error at IGN, input = "${player}"`);
    }, 50);
  }

  return player_ign;
};
