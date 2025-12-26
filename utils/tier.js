export const getRarityPrefix = (rarity) => {
  let prefix = '&r';
  switch (rarity) {
    case 'COMMON':
      prefix = '&f';
      break;
    case 'UNCOMMON':
      prefix = '&a';
      break;
    case 'RARE':
      prefix = '&9';
      break;
    case 'EPIC':
      prefix = '&5';
      break;
    case 'LEGENDARY':
      prefix = '&6';
      break;
    case 'MYTHIC':
      prefix = '&d';
      break;
    case 'SPECIAL':
      prefix = '&c';
      break;
    case 'VERY SPECIAL':
      prefix = '&4';
      break;
    default:
      break;
  }
  return prefix;
};
