// Odkazy z cvičení na tutoriál k mixpultu (súbor mixpult_tutorial.html musí byť v tom istom priečinku ako index.html).
const MIXPULT_TUT = './mixpult_tutorial.html';
const MIXPULT_TUT_LINKS = {
  "1": {
    "main": "#cv1",
    "title": "Základy signálovej cesty a USB smerovania",
    "related": [
      [
        "Tok signálu",
        "#signal-flow"
      ],
      [
        "Bezpečné zapnutie",
        "#bezpecne-zapnutie"
      ],
      [
        "Gain staging",
        "#gain-staging"
      ],
      [
        "USB a DAW",
        "#usb-daw"
      ],
      [
        "Hlasitosť a merač",
        "#metering"
      ]
    ]
  },
  "2": {
    "main": "#cv2",
    "title": "Porovnanie mikrofónov, fantómové napájanie a proximity efekt",
    "related": [
      [
        "Fantóm +48 V",
        "#phantom"
      ],
      [
        "Typy mikrofónov a proximity",
        "#mikrofony"
      ],
      [
        "Gain staging",
        "#gain-staging"
      ]
    ]
  },
  "3": {
    "main": "#cv3",
    "title": "Viackanálové nahrávanie a Gain staging pre podcast",
    "related": [
      [
        "Gain staging",
        "#gain-staging"
      ],
      [
        "PAN",
        "#pan"
      ],
      [
        "USB a DAW",
        "#usb-daw"
      ],
      [
        "Level matching",
        "#metering"
      ],
      [
        "Tímový projekt – podcast",
        "#projekt"
      ]
    ]
  },
  "4": {
    "main": "#cv4",
    "title": "Foley štúdio – tvorba ruchov a synchronizácia s videom",
    "related": [
      [
        "Gain staging",
        "#gain-staging"
      ],
      [
        "Strih a synchronizácia",
        "#strih"
      ]
    ]
  },
  "5": {
    "main": "#cv5",
    "title": "Hardvérová dynamika a čistenie signálu pred nahrávaním",
    "related": [
      [
        "Low Cut",
        "#low-cut"
      ],
      [
        "Kompresor",
        "#kompresor"
      ],
      [
        "Ekvalizér",
        "#eq"
      ],
      [
        "Čistenie šumu (DAW)",
        "#strih"
      ]
    ]
  },
  "6": {
    "main": "#cv6",
    "title": "Pokročilý digitálny strih – čistenie reči a crossfady",
    "related": [
      [
        "Strih a crossfady",
        "#strih"
      ],
      [
        "Prehrávanie z DAW cez pult",
        "#usb-daw"
      ]
    ]
  },
  "7": {
    "main": "#cv7",
    "title": "Tvorba rozhlasového jinglu a technika „Audio Ducking“",
    "related": [
      [
        "Audio ducking",
        "#ducking"
      ],
      [
        "Kompresor",
        "#kompresor"
      ],
      [
        "Level matching",
        "#metering"
      ]
    ]
  },
  "8": {
    "main": "#cv8",
    "title": "Živé zvučenie a nezávislý odposluch (AUX Send, pre-fader)",
    "related": [
      [
        "MON odposluch",
        "#mon"
      ],
      [
        "Káble k reproduktoru",
        "#kable"
      ],
      [
        "Tok signálu (Sends)",
        "#signal-flow"
      ],
      [
        "Vyvážený mix",
        "#metering"
      ]
    ]
  },
  "9": {
    "main": "#cv9",
    "title": "Frekvenčná korekcia a potlačenie spätnej väzby (EQ a FBQ)",
    "related": [
      [
        "Ekvalizér a sweeping",
        "#eq"
      ],
      [
        "Grafický EQ a FBQ",
        "#fbq"
      ],
      [
        "Tok signálu",
        "#signal-flow"
      ]
    ]
  },
  "10": {
    "main": "#cv10",
    "title": "Interný FX procesor a finálny masteringový export",
    "related": [
      [
        "FX procesor (reverb)",
        "#fx"
      ],
      [
        "Export a hlasitosť",
        "#export"
      ],
      [
        "Hlasitosť a merač",
        "#metering"
      ],
      [
        "USB a DAW",
        "#usb-daw"
      ]
    ]
  }
};
