export class ConstArrays {
  pop1 = [];
  pop2 = [];
  pop3 = [];
  pop4 = [];
  pop5 = [];

  temp1 = [];
  temp2 = [];
  temp3 = [];
  temp4 = [];
  temp5 = [];
  temp6 = [];
  temp7 = [];

  precisMap = new Map([
    //Precis
    ["afternoon", "arvo"],
    ["morning", "mornin\'"],
    ["partly", "gonna be a bit"],
    ["thunderstorm", "loud sky bastard"],
    ["very high", "bloody big"],
    ["high", "lotta"],
    ["km/h", "kays an hour"],
    ["evening", "evenin\'"],
    ["clear", "clear as glass"],
    ["very windy", "blowin' a gale"],
    ["rain", "Hughie's sendin' it down"],
    ["showers", "lotsa bloody rain"],
    ["shower", "bitta rain"],
    ["windy", "bloody breezy"],
    ["breeze", "quokka fart"],
    ["sunny", "sunny. bloody oath"],
    ["mostly", "reckon"],
    ["light", "bugger all"],
    ["easing", "buggering off"],
    ["possible", "might be"]
  ]);

  constructor() {
    //0 and under
    this.temp1 = [
      'F*ckin\' freezing.',
      'Christ on a bike.',
      'Absolutely crook.'
    ];
    //between 0 and 7
    this.temp2 = [
      'Not nipple friendly.',
      'Crook.',
      'Brass monkey weather.',
      'She\'s a bit pointy.'
    ];
    //between 8 and 16
    this.temp3 = [
      'Bit chilly.',
      'Crack out the tracky dacks.',
      'Bit nippy.'
    ];
    //between 17 and 23
    this.temp4 = [
      'Beaut.',
      'Ripper.',
      'Bonza.',
      'Cracka.',
      'Bloody beaut.'
    ];
    //between 24 and 30
    this.temp5 = [
      'Strewth.',
      'Bloody oath.',
      'Ripsnorter.',
      'Grouse.',
      'Best thing since sliced bread.',
      'Good day for blowing the froth off a few.'
    ];
    //between 31 and 38
    this.temp6 = [
      'Scorcher.',
      'Bad day to be an armpit.',
      'Thongs and togs out.',
      'She\'s not cold, that\'s for sure.',
      'Jeez the sun\'s got some bloody bite.'
    ];
    //above 38
    this.temp7 = [
      'Stinker.',
      'Crikey.',
      'Hotter than a shearer\'s armpit.',
      'Big risk of carkin\' it.',
      'Just pull up stumps.'
    ];

    //Pop
    this.pop1 = [
      'Set to be an absolute pearler of a day, mate.',
      'A bloody corker. Enjoy it.',
      'Can\'t get any better than this.',
      'A beaut. Avago yer mug!',
      'Gunna be as dry as a dead roo in the Nullabor.',
      'She\'s gonna be a bloody ripper.',
      'Gunna be as dry as a dead dingo’s donga.',
      'Buckley\'s chance.',
      'Nun\'s nasty.'
    ];
    this.pop2 = [
      'Might get a sprinkle. She\'ll be right.',
      'Expect a little tinkle on the tin roof.',
      'Suss it out, but should be right.',
      'No wuckin’ furries.',
      'Sprinkle here and there, so don\'t carry on like a porkchop when you say I didn\'t tell ya.'
    ];
    this.pop3 = [
      'Take a brolly to be on the safe side.',
      'Yeah nah, yeah nah, yeah. Nah.',
      'Not gonna be the greatest day, but take what you can get.',
      'Bit how ya going.',
      'Be acting the goat to go out without a brolly.',
      'Send \'er down, Hughie!',
      'Adam\'s ale\'s coming.'
    ];
    this.pop4 = [
      'Gunna piss down.',
      'Wetter than wet.',
      'If you go out you\'ll come in lookin\' like a drowned rat.',
      'Won\'t kill ya, but you\'ll get wet.',
      'Lookin\' real crook.',
      'Probably get the ute bogged.',
      'Better get the rags off the hills hoist.'
    ];
    this.pop5 = [
      'Might as well stay home and crack a tin.',
      'Fair dinkum, gonna be biblical.',
      'Get on the turps, don\'t bother goin\' out.',
      'Drownin\', deadset.',
      'F*ck a duck.',
      'Wear some scunnos cause ya gonna be swimmin\'.',
      'Tradie\'s holiday.',
      'BYO gumboots.',
      'Pelting down.',
      'Bucketing down.',
      'It\'s gonna be a gully-washa.'
    ];

  }

}
