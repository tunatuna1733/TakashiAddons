import { @Vigilant,
  @SwitchProperty,
  @TextProperty,
  @CheckboxProperty,
  @ButtonProperty,
  @SelectorProperty,
  @SliderProperty,
  @ColorProperty,
  @PercentSliderProperty,
  @DecimalSliderProperty,
  @NumberProperty,
  Color,
  createPropertyAttributesExt
} from "../Vigilance/index";
const Color = Java.type('java.awt.Color');

@Vigilant("TakashiAddons", "§d§lTakashiAddons", {
  getCategoryComparetor: () => (a, b) => {
    const categories = ["HUD", "Dungeon", "Kuudra", "Others", "Garden", "Crimson Isle"];
    return categories.indexOf(a.name) - categories.indexOf(b.name);
  }
})
class Settings {
  @ButtonProperty({
    name: 'Edit HUD location',
    description: 'Click to edit HUD locations',
    category: 'HUD',
    placeholder: 'Click!',
    subcategory: 'Edit location'
  })
  editGui() {
    ChatLib.command('takashi movehud', true);
  }

  @SwitchProperty({
    name: 'Armor HUD',
    description: 'Armor HUD things',
    category: 'HUD',
    subcategory: 'General HUD'
  })
  armorhud = false;

  @SwitchProperty({
    name: 'Equipment HUD',
    description: 'Equipment HUD things',
    category: 'HUD',
    subcategory: 'General HUD'
  })
  equipmenthud = false;

  @SwitchProperty({
    name: 'Reforge HUD',
    description: 'Display selected accessory reforge',
    category: 'HUD',
    subcategory: 'General HUD'
  })
  reforgehud = false;

  @SwitchProperty({
    name: 'Ragnarock Axe Cooldown HUD',
    description: 'Display Ragnarock Axe cooldown',
    category: 'HUD',
    subcategory: 'RagAxe Cooldown'
  })
  raghud = false;

  @SwitchProperty({
    name: 'Lifeline HUD',
    description: 'Display whether lifeline is active or not',
    category: 'HUD',
    subcategory: 'Lifeline Display'
  })
  lifelinehud = false;

  @SwitchProperty({
    name: 'Only show when in Kuudra\'s Hollow',
    description: 'Only show when you are in Kuudra\'s Hollow',
    category: 'HUD',
    subcategory: 'Lifeline Display'
  })
  lifelinekuudra = true;

  @SwitchProperty({
    name: 'Reaper Armor Cooldown HUD',
    description: 'Display Reaper Armor Cooldown',
    category: 'HUD',
    subcategory: 'Reaper Armor Cooldown'
  })
  reaperhud = false;

  @SwitchProperty({
    name: 'Flare Timer',
    description: 'Display active flare timer',
    category: 'HUD',
    subcategory: 'Flare Timer'
  })
  flaretimer = false;

  @SwitchProperty({
    name: 'Inventory HUD',
    description: 'Shows your current inventory(UAUOR)',
    category: 'HUD',
    subcategory: 'Inventory'
  })
  inventory = false;

  @ColorProperty({
    name: 'Inventory HUD Color',
    description: 'Change inventory hud background color',
    category: 'HUD',
    subcategory: 'Inventory'
  })
  inventorycolor = new Color(0.9, 0.9, 0.9, 0.3);

  @SwitchProperty({
    name: 'Dropship Warning',
    description: 'Warns you specified seconds before bomb will be dropped. Works even if the dropship is not rendered.',
    category: 'Kuudra',
    subcategory: 'Dropship Warning'
  })
  dropship = false;

  @SliderProperty({
    name: 'Warning time',
    description: 'Specify the number of seconds for warning before dropship explosion',
    min: 3,
    max: 10,
    category: 'Kuudra',
    subcategory: 'Dropship Warning'
  })
  dropshiptime = 5;

  @SwitchProperty({
    name: 'Send warning chat',
    description: 'Send party chat right before bomb drops.',
    category: 'Kuudra',
    subcategory: 'Dropship Warning'
  })
  senddropshipwarning = false;

  @SwitchProperty({
    name: 'Kick Timer',
    description: 'Shows how long have you been kicked.',
    category: 'HUD',
    subcategory: 'Kick Timer'
  })
  kicktimer = false;

  @SwitchProperty({
    name: 'Debug Mode',
    description: 'Toggle debug mode.',
    category: 'Others',
    subcategory: 'Debug'
  })
  debugmode = false;

  @SwitchProperty({
    name: 'Draw Pest Box',
    category: 'Garden',
    subcategory: 'Pest Box'
  })
  pestbox = false;

  @SwitchProperty({
    name: 'Pest ESP',
    description: 'Turning on this feature enables you to see pest box through wall. (UAYOR)',
    category: 'Garden',
    subcategory: 'Pest Box'
  })
  pestboxesp = false;

  @ColorProperty({
    name: 'Pest Box Color',
    category: 'Garden',
    subcategory: 'Pest Box'
  })
  pestboxcolor = Color.RED;

  @ColorProperty({
    name: 'Fishing Timer Background Color',
    category: 'Others',
    subcategory: 'Fishing Timer'
  })
  fishingtimercolor = Color.BLACK;

  @SwitchProperty({
    name: 'Rod Cast Warning',
    description: 'Shows "ROD!" when you are not casting your rod.',
    category: 'Others',
    subcategory: 'Fishing Timer'
  })
  fishingtimerwarning = false;

  @SwitchProperty({
    name: 'Ashfang Helper',
    description: 'Various features which helps you kill Ashfang.',
    category: 'Crimson Isle',
    subcategory: 'Ashfang Helper'
  })
  ashfanghelper = false;

  @ColorProperty({
    name: 'Ashfang Color',
    category: 'Crimson Isle',
    subcategory: 'Ashfang Helper'
  })
  ashfangcolor = Color.PINK;

  @ColorProperty({
    name: 'Ashfang Blackhole Color',
    category: 'Crimson Isle',
    subcategory: 'Ashfang Helper'
  })
  ashfangbhcolor = Color.GRAY;

  @SwitchProperty({
    name: 'Sea Creature Detector',
    description: "Detects other players' sea creatures. (UAYOR)",
    category: 'Crimson Isle',
    subcategory: 'Sea Creature'
  })
  seacreature = false;

  @SwitchProperty({
    name: 'Jawbus Waypoint',
    description: 'Draws jawbus waypoint. (UAYOR)',
    category: 'Crimson Isle',
    subcategory: 'Sea Creature'
  })
  jawbuswaypoint = false;

  @SwitchProperty({
    name: 'Enable Sea Creature ESP',
    description: 'Shows sea creature box through walls.',
    category: 'Crimson Isle',
    subcategory: 'Sea Creature'
  })
  seacreatureesp = false

  @SwitchProperty({
    name: 'Stop rendering while holding fishing rod',
    description: 'Stop rendering sea creature mob boxes while holding fishing rod.',
    category: 'Crimson Isle',
    subcategory: 'Sea Creature'
  })
  fishingrodstoprender = false;

  @SwitchProperty({
    name: 'Sea Screature Counter',
    description: 'Show estimated number of sea creatures loaded.',
    category: 'Crimson Isle',
    subcategory: 'Sea Creature'
  })
  seacreaturecounter = false;

  @SwitchProperty({
    name: 'Spray Area Preview',
    description: 'Shows the area you gonna spray.',
    category: 'Garden',
    subcategory: 'Spray'
  })
  sprayarea = false;

  @SwitchProperty({
    name: 'Spray Timer',
    description: 'Timer for Spraynator.',
    category: 'Garden',
    subcategory: 'Spray'
  })
  spraytimer = false;

  @SwitchProperty({
    name: 'Always Warn',
    description: 'Shows title for a long time when the spray is expired.',
    category: 'Garden',
    subcategory: 'Spray'
  })
  sprayalwayswarn = false;

  @SwitchProperty({
    name: 'Show spawned pest area',
    description: '',
    category: 'Garden',
    subcategory: 'Pest Area'
  })
  pestarea = false;

  @SwitchProperty({
    name: 'Pest Title',
    description: 'Shows a title when the farming fortune is reduced by the pests.',
    category: 'Garden',
    subcategory: 'Pest Title'
  })
  pesttitle = false;

  @SwitchProperty({
    name: 'Fever Timer',
    description: 'Shows a timer for fever duration.',
    category: 'Garden',
    subcategory: 'Fever Timer'
  })
  fevertimer = false;

  @SwitchProperty({
    name: 'Feeder Timer',
    description: 'Shows a timer for Caducous Feeder cooldown.',
    category: 'Others',
    subcategory: 'Feeder Timer'
  })
  feedertimer = false;

  @SwitchProperty({
    name: 'Tablist HUD Background',
    description: 'Enable this option to draw background behind tablist huds.',
    category: 'Others',
    subcategory: 'Tablist HUD'
  })
  tablistbackground = false;

  @ColorProperty({
    name: 'Tablist HUD Background Color',
    category: 'Others',
    subcategory: 'Tablist HUD'
  })
  tablistbackgroundcolor = new Color(0.5, 0.5, 0.5, 0.5);

  @SwitchProperty({
    name: 'Pest Map',
    description: 'Shows garden plot map with the pest amount info in the inventory.',
    category: 'Garden',
    subcategory: 'Pest Map'
  })
  pestmap = false;

  @SwitchProperty({
    name: 'Highlight Powder Chest',
    category: 'Mining',
    subcategory: 'Powder Mining'
  })
  powderchesthighlight = false;

  @ColorProperty({
    name: 'Chest Highlight Color',
    category: 'Mining',
    subcategory: 'Powder Mining'
  })
  powderchesthighlightcolor = Color.PINK;

  @SwitchProperty({
    name: 'Draw mobs box in mineshaft',
    category: 'Mining',
    subcategory: 'Glacite Tunnel'
  })
  mineshaftmobbox = false;

  @ColorProperty({
    name: 'Mineshaft mob box color',
    category: 'Mining',
    subcategory: 'Glacite Tunnel'
  })
  mineshaftmobboxcolor = Color.PINK;

  @SwitchProperty({
    name: 'Show corpses location',
    category: 'Mining',
    subcategory: 'Glacite Tunnel'
  })
  corpselocation = false;

  @SwitchProperty({
    name: 'Kuudra Hitbox',
    description: 'Takashi never lose',
    category: 'Kuudra',
    subcategory: 'Hitbox'
  })
  kuudrahitbox = false;

  @SwitchProperty({
    name: 'F Revenant minions',
    category: 'Others',
    subcategory: 'Revenant Minion'
  })
  norevminion = false;

  @SwitchProperty({
    name: 'Star Mob Box',
    category: 'Dungeon',
    subcategory: 'Star Mob'
  })
  starmob = false;

  @SwitchProperty({
    name: 'Exp Share HUD',
    description: 'Display exp share pet status',
    category: 'HUD',
    subcategory: 'Pet'
  })
  expsharehud = false;

  @SwitchProperty({
    name: 'Auto accept party',
    description: 'Automatically accept party invites from whitelisted players',
    category: 'Others',
  })
  autoacceptparty = false;

  constructor() {
    this.initialize(this);
    this.setCategoryDescription('HUD', 'A lot of Overlays');
    this.setCategoryDescription('Dungeon', 'Dungeon related things');
    this.setCategoryDescription('WIP', 'Takashi is working on it');

    this.addDependency('Only show when in Kuudra\'s Hollow', 'Lifeline HUD');
    this.addDependency('Inventory HUD Color', 'Inventory HUD');
    this.addDependency('Inventory HUD Color', 'Inventory HUD');
    this.addDependency('Warning time', 'Dropship Warning');
    this.addDependency('Pest ESP', 'Draw Pest Box');
    this.addDependency('Pest Box Color', 'Draw Pest Box');
    this.addDependency('Ashfang Color', 'Ashfang Helper');
    this.addDependency('Ashfang Blackhole Color', 'Ashfang Helper');
    this.addDependency('Enable Sea Creature ESP', 'Sea Creature Detector');
    this.addDependency('Stop rendering while holding fishing rod', 'Sea Creature Detector');
    this.addDependency('Always Warn', 'Spray Timer');
    this.addDependency('Tablist HUD Background Color', 'Tablist HUD Background');
    this.addDependency('Chest Highlight Color', 'Highlight Powder Chest');
    this.addDependency('Mineshaft mob box color', 'Draw mobs box in mineshaft');

  }
}

export default new Settings();
