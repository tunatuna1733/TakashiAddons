export const isInSkyblock = () => {
  if ((Server.getIP().includes('hypixel') || Server.getIP().includes('overlag')) && ChatLib.removeFormatting(Scoreboard.getTitle()).includes('SKYBLOCK'))
    return true;
  return false;
};

export const inGarden = () => {
  let inGarden = false;
  Scoreboard.getLines().forEach((line) => {
    if (ChatLib.removeFormatting(line).includes('The Garde')) inGarden = true;
  });
  return inGarden;
};
