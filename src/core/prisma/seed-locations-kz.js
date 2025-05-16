import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const regions = [
  {
    translations: [
      { language: 'en', name: 'Almaty city' },
      { language: 'ru', name: 'Город Алма-ата' },
      { language: 'kk', name: 'Алматы қаласы' },
    ],
    lat: 43.15, lng: 76.54,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Almaty' },
          { language: 'ru', name: 'Алматы' },
          { language: 'kk', name: 'Алматы' },
        ],  
        lat: 43.15, lng: 76.54,
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Astana city' },
      { language: 'ru', name: 'Город Астана' },
      { language: 'kk', name: 'Астана қаласы' },
    ],
    lat: 51.08, lng: 71.26,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Astana' },
          { language: 'ru', name: 'Астана' },
          { language: 'kk', name: 'Астана' },
        ],  
        lat: 51.08, lng: 71.26,
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Shymkent city' },
      { language: 'ru', name: 'Город Шымкент' },
      { language: 'kk', name: 'Шымент қаласы' },
    ],
    lat: 42.18, lng: 69.36,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Shymkent' },
          { language: 'ru', name: 'Шымкент' },
          { language: 'kk', name: 'Шымкент' },
        ],  
        lat: 42.18, lng: 69.36,
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Abai Region' },
      { language: 'ru', name: 'Абайская область' },
      { language: 'kk', name: 'Абай облысы' }
    ],
    lat: 50.4333, lng: 80.2667,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Semey' },
          { language: 'ru', name: 'Семей' },
          { language: 'kk', name: 'Семей' }
        ],
        lat: 50.4333, lng: 80.2667
      },
      {
        translations: [
          { language: 'en', name: 'Kurchatov' },
          { language: 'ru', name: 'Курчатов' },
          { language: 'kk', name: 'Курчатов' }
        ],
        lat: 50.7567, lng: 78.5400
      },
      {
        translations: [
          { language: 'en', name: 'Ayagoz' },
          { language: 'ru', name: 'Аягоз' },
          { language: 'kk', name: 'Аягөз' }
        ],
        lat: 47.9667, lng: 80.4333
      },
      {
        translations: [
          { language: 'en', name: 'Shar' },
          { language: 'ru', name: 'Чарск' },
          { language: 'kk', name: 'Шар' }
        ],
        lat: 49.5858, lng: 81.0478
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Akmola Region' },
      { language: 'ru', name: 'Акмолинская область' },
      { language: 'kk', name: 'Ақмола облысы' }
    ],
    lat: 53.2833, lng: 69.3833,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Kokshetau' },
          { language: 'ru', name: 'Кокшетау' },
          { language: 'kk', name: 'Көкшетау' }
        ],
        lat: 53.2833, lng: 69.3833
      },
      {
        translations: [
          { language: 'en', name: 'Stepnogorsk' },
          { language: 'ru', name: 'Степногорск' },
          { language: 'kk', name: 'Степногорск' }
        ],
        lat: 52.3497, lng: 71.8900
      },
      {
        translations: [
          { language: 'en', name: 'Akkol' },
          { language: 'ru', name: 'Акколь' },
          { language: 'kk', name: 'Ақкөл' }
        ],
        lat: 52.0000, lng: 70.9333
      },
      {
        translations: [
          { language: 'en', name: 'Atbasar' },
          { language: 'ru', name: 'Атбасар' },
          { language: 'kk', name: 'Атбасар' }
        ],
        lat: 51.8000, lng: 68.3333
      },
      {
        translations: [
          { language: 'en', name: 'Derzhavinsk' },
          { language: 'ru', name: 'Державинск' },
          { language: 'kk', name: 'Державинск' }
        ],
        lat: 51.1000, lng: 66.3170
      },
      {
        translations: [
          { language: 'en', name: 'Ereymentau' },
          { language: 'ru', name: 'Эрейментау' },
          { language: 'kk', name: 'Ерейментау' }
        ],
        lat: 51.6170, lng: 73.1000
      },
      {
        translations: [
          { language: 'en', name: 'Esil' },
          { language: 'ru', name: 'Есиль' },
          { language: 'kk', name: 'Есіл' }
        ],
        lat: 51.9556, lng: 66.4042
      },
      {
        translations: [
          { language: 'en', name: 'Makinsk' },
          { language: 'ru', name: 'Макинск' },
          { language: 'kk', name: 'Макинск' }
        ],
        lat: 52.6292, lng: 70.4169
      },
      {
        translations: [
          { language: 'en', name: 'Shchuchinsk' },
          { language: 'ru', name: 'Щучинск' },
          { language: 'kk', name: 'Щучинск' }
        ],
        lat: 52.9333, lng: 70.2000
      },
      {
        translations: [
          { language: 'en', name: 'Stepnyak' },
          { language: 'ru', name: 'Степняк' },
          { language: 'kk', name: 'Степняк' }
        ],
        lat: 52.8333, lng: 70.7833
      },
      {
        translations: [
          { language: 'en', name: 'Qosshy' },
          { language: 'ru', name: 'Косшы' },
          { language: 'kk', name: 'Қосшы' }
        ],
        lat: 50.9800, lng: 71.3500
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Aktobe Region' },
      { language: 'ru', name: 'Актюбинская область' },
      { language: 'kk', name: 'Ақтөбе облысы' }
    ],
    lat: 50.2836, lng: 57.2297,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Aktobe' },
          { language: 'ru', name: 'Актобе' },
          { language: 'kk', name: 'Ақтөбе' }
        ],
        lat: 50.2836, lng: 57.2297
      },
      {
        translations: [
          { language: 'en', name: 'Alga' },
          { language: 'ru', name: 'Алга' },
          { language: 'kk', name: 'Алға' }
        ],
        lat: 49.9028, lng: 57.3333
      },
      {
        translations: [
          { language: 'en', name: 'Embi' },
          { language: 'ru', name: 'Эмба' },
          { language: 'kk', name: 'Ембі' }
        ],
        lat: 48.8267, lng: 58.1442
      },
      {
        translations: [
          { language: 'en', name: 'Kandyagash' },
          { language: 'ru', name: 'Кандыагаш' },
          { language: 'kk', name: 'Қандыағаш' }
        ],
        lat: 49.4556, lng: 57.4161
      },
      {
        translations: [
          { language: 'en', name: 'Khromtau' },
          { language: 'ru', name: 'Хромтау' },
          { language: 'kk', name: 'Хромтау' }
        ],
        lat: 50.2503, lng: 58.4347
      },
      {
        translations: [
          { language: 'en', name: 'Shalkar' },
          { language: 'ru', name: 'Шалкар' },
          { language: 'kk', name: 'Шалқар' }
        ],
        lat: 47.8333, lng: 59.6000
      },
      {
        translations: [
          { language: 'en', name: 'Temir' },
          { language: 'ru', name: 'Темир' },
          { language: 'kk', name: 'Темір' }
        ],
        lat: 49.1413, lng: 57.1285
      },
      {
        translations: [
          { language: 'en', name: 'Zhem' },
          { language: 'ru', name: 'Жем' },
          { language: 'kk', name: 'Жем' }
        ],
        lat: 48.7697, lng: 58.0714
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Almaty Region' },
      { language: 'ru', name: 'Алматинская область' },
      { language: 'kk', name: 'Алматы облысы' }
    ],
    lat: 43.8833, lng: 77.0833,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Qonaev' },
          { language: 'ru', name: 'Конаев' },
          { language: 'kk', name: 'Қонаев' }
        ],
        lat: 43.8833, lng: 77.0833
      },
      {
        translations: [
          { language: 'en', name: 'Talgar' },
          { language: 'ru', name: 'Талгар' },
          { language: 'kk', name: 'Талғар' }
        ],
        lat: 43.3000, lng: 77.2333
      },
      {
        translations: [
          { language: 'en', name: 'Esik' },
          { language: 'ru', name: 'Иссык' },
          { language: 'kk', name: 'Есік' }
        ],
        lat: 43.3500, lng: 77.4670
      },
      {
        translations: [
          { language: 'en', name: 'Kaskelen' },
          { language: 'ru', name: 'Каскелен' },
          { language: 'kk', name: 'Қаскелең' }
        ],
        lat: 43.2000, lng: 76.6200
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Atyrau Region' },
      { language: 'ru', name: 'Атырауская область' },
      { language: 'kk', name: 'Атырау облысы' }
    ],
    lat: 47.1167, lng: 51.8833,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Atyrau' },
          { language: 'ru', name: 'Атырау' },
          { language: 'kk', name: 'Атырау' }
        ],
        lat: 47.1167, lng: 51.8833
      },
      {
        translations: [
          { language: 'en', name: 'Kulsary' },
          { language: 'ru', name: 'Кульсары' },
          { language: 'kk', name: 'Құлсары' }
        ],
        lat: 46.9833, lng: 54.0170
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Jambyl Region' },
      { language: 'ru', name: 'Жамбылская область' },
      { language: 'kk', name: 'Жамбыл облысы' }
    ],
    lat: 42.9000, lng: 71.3670,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Taraz' },
          { language: 'ru', name: 'Тараз' },
          { language: 'kk', name: 'Тараз' }
        ],
        lat: 42.9000, lng: 71.3670
      },
      {
        translations: [
          { language: 'en', name: 'Karatau' },
          { language: 'ru', name: 'Каратау' },
          { language: 'kk', name: 'Қаратау' }
        ],
        lat: 43.1670, lng: 70.4500
      },
      {
        translations: [
          { language: 'en', name: 'Zhanatas' },
          { language: 'ru', name: 'Жанатас' },
          { language: 'kk', name: 'Жаңатас' }
        ],
        lat: 43.5705, lng: 69.7335
      },
      {
        translations: [
          { language: 'en', name: 'Shu' },
          { language: 'ru', name: 'Чу' },
          { language: 'kk', name: 'Шу' }
        ],
        lat: 43.5983, lng: 73.7614
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Jetisu Region' },
      { language: 'ru', name: 'Жетысуская область' },
      { language: 'kk', name: 'Жетісу облысы' }
    ],
    lat: 45.0000, lng: 78.0000,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Taldykorgan' },
          { language: 'ru', name: 'Талдыкорган' },
          { language: 'kk', name: 'Талдықорған' }
        ],
        lat: 45.0156, lng: 78.3735
      },
      {
        translations: [
          { language: 'en', name: 'Tekeli' },
          { language: 'ru', name: 'Текели' },
          { language: 'kk', name: 'Текелі' }
        ],
        lat: 44.8300, lng: 78.8300
      },
      {
        translations: [
          { language: 'en', name: 'Zharkent' },
          { language: 'ru', name: 'Жаркент' },
          { language: 'kk', name: 'Жаркент' }
        ],
        lat: 44.1667, lng: 80.0000
      },
      {
        translations: [
          { language: 'en', name: 'Sarkand' },
          { language: 'ru', name: 'Саркан' },
          { language: 'kk', name: 'Сарқан' }
        ],
        lat: 45.4100, lng: 79.9150
      },
      {
        translations: [
          { language: 'en', name: 'Usharal' },
          { language: 'ru', name: 'Ушарал' },
          { language: 'kk', name: 'Үшарал' }
        ],
        lat: 46.1600, lng: 80.9500
      },
      {
        translations: [
          { language: 'en', name: 'Ushtobe' },
          { language: 'ru', name: 'Үштөбе' },
          { language: 'kk', name: 'Үштөбе' }
        ],
        lat: 45.3500, lng: 77.9800
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Karaganda Region' },
      { language: 'ru', name: 'Карагандинская область' },
      { language: 'kk', name: 'Қарағанды облысы' }
    ],
    lat: 49.8030, lng: 73.1020,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Karagandy' },
          { language: 'ru', name: 'Караганда' },
          { language: 'kk', name: 'Қарағанды' }
        ],
        lat: 49.8030, lng: 73.1020
      },
      {
        translations: [
          { language: 'en', name: 'Balkhash' },
          { language: 'ru', name: 'Балхаш' },
          { language: 'kk', name: 'Балқаш' }
        ],
        lat: 46.8531, lng: 74.9502
      },
      {
        translations: [
          { language: 'en', name: 'Priozersk' },
          { language: 'ru', name: 'Приозерск' },
          { language: 'kk', name: 'Приозерск' }
        ],
        lat: 46.0333, lng: 73.7000
      },
      {
        translations: [
          { language: 'en', name: 'Saran' },
          { language: 'ru', name: 'Сарань' },
          { language: 'kk', name: 'Саран' }
        ],
        lat: 49.7900, lng: 72.8667
      },
      {
        translations: [
          { language: 'en', name: 'Shakhtinsk' },
          { language: 'ru', name: 'Шахтинск' },
          { language: 'kk', name: 'Шахтинск' }
        ],
        lat: 49.6939, lng: 72.5914
      },
      {
        translations: [
          { language: 'en', name: 'Temirtau' },
          { language: 'ru', name: 'Темиртау' },
          { language: 'kk', name: 'Теміртау' }
        ],
        lat: 50.0670, lng: 72.9647
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Kostanay Region' },
      { language: 'ru', name: 'Костанайская область' },
      { language: 'kk', name: 'Қостанай облысы' }
    ],
    lat: 53.2000, lng: 63.6200,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Kostanay' },
          { language: 'ru', name: 'Костанай' },
          { language: 'kk', name: 'Қостанай' }
        ],
        lat: 53.2000, lng: 63.6200
      },
      {
        translations: [
          { language: 'en', name: 'Arkalyk' },
          { language: 'ru', name: 'Аркалык' },
          { language: 'kk', name: 'Арқалық' }
        ],
        lat: 50.2481, lng: 66.9278
      },
      {
        translations: [
          { language: 'en', name: 'Lisakovsk' },
          { language: 'ru', name: 'Лисаковск' },
          { language: 'kk', name: 'Лисаковск' }
        ],
        lat: 52.5471, lng: 62.4999
      },
      {
        translations: [
          { language: 'en', name: 'Rudny' },
          { language: 'ru', name: 'Рудный' },
          { language: 'kk', name: 'Рудный' }
        ],
        lat: 52.9670, lng: 63.1330
      },
      {
        translations: [
          { language: 'en', name: 'Zhetikara' },
          { language: 'ru', name: 'Житикара' },
          { language: 'kk', name: 'Жітіқара' }
        ],
        lat: 52.1908, lng: 61.2011
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Kyzylorda Region' },
      { language: 'ru', name: 'Кызылординская область' },
      { language: 'kk', name: 'Қызылорда облысы' }
    ],
    lat: 44.8500, lng: 65.5167,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Kyzylorda' },
          { language: 'ru', name: 'Кызылорда' },
          { language: 'kk', name: 'Қызылорда' }
        ],
        lat: 44.8500, lng: 65.5167
      },
      {
        translations: [
          { language: 'en', name: 'Aral' },
          { language: 'ru', name: 'Аральск' },
          { language: 'kk', name: 'Арал' }
        ],
        lat: 46.7833, lng: 61.6667
      },
      {
        translations: [
          { language: 'en', name: 'Kazaly' },
          { language: 'ru', name: 'Казалинск' },
          { language: 'kk', name: 'Қазалы' }
        ],
        lat: 45.7670, lng: 62.1000
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Mangystau Region' },
      { language: 'ru', name: 'Мангистауская область' },
      { language: 'kk', name: 'Маңғыстау облысы' }
    ],
    lat: 43.6525, lng: 51.1575,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Aktau' },
          { language: 'ru', name: 'Актау' },
          { language: 'kk', name: 'Ақтау' }
        ],
        lat: 43.6525, lng: 51.1575
      },
      {
        translations: [
          { language: 'en', name: 'Zhanaozen' },
          { language: 'ru', name: 'Жанаозен' },
          { language: 'kk', name: 'Жаңаөзен' }
        ],
        lat: 43.3378, lng: 52.8553
      },
      {
        translations: [
          { language: 'en', name: 'Fort-Shevchenko' },
          { language: 'ru', name: 'Форт-Шевченко' },
          { language: 'kk', name: 'Форт-Шевченко' }
        ],
        lat: 44.5170, lng: 50.2670
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'North Kazakhstan Region' },
      { language: 'ru', name: 'Северо-Казахстанская область' },
      { language: 'kk', name: 'Солтүстік Қазақстан облысы' }
    ],
    lat: 54.8833, lng: 69.1667,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Petropavl' },
          { language: 'ru', name: 'Петропавловск' },
          { language: 'kk', name: 'Петропавл' }
        ],
        lat: 54.8833, lng: 69.1667
      },
      {
        translations: [
          { language: 'en', name: 'Bulayevo' },
          { language: 'ru', name: 'Булаево' },
          { language: 'kk', name: 'Булаево' }
        ],
        lat: 54.9056, lng: 70.4439
      },
      {
        translations: [
          { language: 'en', name: 'Mamlyutka' },
          { language: 'ru', name: 'Мамлютка' },
          { language: 'kk', name: 'Мамлют' }
        ],
        lat: 54.9375, lng: 68.5394
      },
      {
        translations: [
          { language: 'en', name: 'Sergeyevka' },
          { language: 'ru', name: 'Сергеевка' },
          { language: 'kk', name: 'Сергеевка' }
        ],
        lat: 53.8800, lng: 67.4158
      },
      {
        translations: [
          { language: 'en', name: 'Taiynsha' },
          { language: 'ru', name: 'Тайынша' },
          { language: 'kk', name: 'Тайынша' }
        ],
        lat: 53.8478, lng: 69.7639
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Pavlodar Region' },
      { language: 'ru', name: 'Павлодарская область' },
      { language: 'kk', name: 'Павлодар облысы' }
    ],
    lat: 52.3000, lng: 76.9500,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Pavlodar' },
          { language: 'ru', name: 'Павлодар' },
          { language: 'kk', name: 'Павлодар' }
        ],
        lat: 52.3000, lng: 76.9500
      },
      {
        translations: [
          { language: 'en', name: 'Aksu' },
          { language: 'ru', name: 'Аксу' },
          { language: 'kk', name: 'Ақсу' }
        ],
        lat: 52.0333, lng: 76.9167
      },
      {
        translations: [
          { language: 'en', name: 'Ekibastuz' },
          { language: 'ru', name: 'Экибастуз' },
          { language: 'kk', name: 'Екібастұз' }
        ],
        lat: 51.6667, lng: 75.3667
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Turkistan Region' },
      { language: 'ru', name: 'Туркестанская область' },
      { language: 'kk', name: 'Түркістан облысы' }
    ],
    lat: 43.3019, lng: 68.2692,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Turkistan' },
          { language: 'ru', name: 'Туркестан' },
          { language: 'kk', name: 'Түркістан' }
        ],
        lat: 43.3019, lng: 68.2692
      },
      {
        translations: [
          { language: 'en', name: 'Kentau' },
          { language: 'ru', name: 'Кентау' },
          { language: 'kk', name: 'Кентау' }
        ],
        lat: 43.5170, lng: 68.5170
      },
      {
        translations: [
          { language: 'en', name: 'Arys' },
          { language: 'ru', name: 'Арыс' },
          { language: 'kk', name: 'Арыс' }
        ],
        lat: 42.4333, lng: 68.8000
      },
      {
        translations: [
          { language: 'en', name: 'Saryagash' },
          { language: 'ru', name: 'Сарыагаш' },
          { language: 'kk', name: 'Сарыағаш' }
        ],
        lat: 41.4667, lng: 69.1667
      },
      {
        translations: [
          { language: 'en', name: 'Shardara' },
          { language: 'ru', name: 'Шардара' },
          { language: 'kk', name: 'Шардара' }
        ],
        lat: 41.2618, lng: 67.9844
      },
      {
        translations: [
          { language: 'en', name: 'Zhetisay' },
          { language: 'ru', name: 'Жетысай' },
          { language: 'kk', name: 'Жетісай' }
        ],
        lat: 40.7580, lng: 68.3315
      },
      {
        translations: [
          { language: 'en', name: 'Lenger' },
          { language: 'ru', name: 'Ленгер' },
          { language: 'kk', name: 'Леңгер' }
        ],
        lat: 42.1819, lng: 69.8878
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Ulytau Region' },
      { language: 'ru', name: 'Улытауская область' },
      { language: 'kk', name: 'Ұлытау облысы' }
    ],
    lat: 47.7878, lng: 67.7070,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Jezkazgan' },
          { language: 'ru', name: 'Жезказган' },
          { language: 'kk', name: 'Жезқазған' }
        ],
        lat: 47.7833, lng: 67.7000
      },
      {
        translations: [
          { language: 'en', name: 'Satbayev' },
          { language: 'ru', name: 'Сатпаев' },
          { language: 'kk', name: 'Сәтбаев' }
        ],
        lat: 47.7000, lng: 67.5000
      },
      {
        translations: [
          { language: 'en', name: 'Karazhal' },
          { language: 'ru', name: 'Каражал' },
          { language: 'kk', name: 'Қаражал' }
        ],
        lat: 48.0128, lng: 70.7822
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'West Kazakhstan Region' },
      { language: 'ru', name: 'Западно-Казахстанская область' },
      { language: 'kk', name: 'Батыс Қазақстан облысы' }
    ],
    lat: 51.2225, lng: 51.3725,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Oral' },
          { language: 'ru', name: 'Уральск' },
          { language: 'kk', name: 'Орал' }
        ],
        lat: 51.2225, lng: 51.3725
      },
      {
        translations: [
          { language: 'en', name: 'Aksai' },
          { language: 'ru', name: 'Аксай' },
          { language: 'kk', name: 'Ақсай' }
        ],
        lat: 51.1678, lng: 52.9950
      }
    ]
  }
];

async function seed() {
  for (const region of regions) {
    const enRegionName = region.translations.find(t => t.language === 'en')?.name;

    // 🔍 Check if region already exists by English name
    const existingRegionTranslation = await prisma.regionTranslation.findFirst({
      where: {
        language: 'en',
        name: enRegionName,
      },
      include: { region: true },
    });

    if (existingRegionTranslation) {
      console.log(`Skipping existing region: ${enRegionName}`);
      continue;
    }

    // ✅ Create region with cities and translations
    const createdRegion = await prisma.region.create({
      data: {
        lat: region.lat,
        lng: region.lng,
        translations: {
          create: region.translations.map(t => ({
            language: t.language,
            name: t.name,
          })),
        },
        cities: {
          create: region.cities.map(city => ({
            lat: city.lat,
            lng: city.lng,
            translations: {
              create: city.translations.map(ct => ({
                language: ct.language,
                name: ct.name,
              })),
            },
          })),
        },
      },
    });

    console.log(`Created region: ${enRegionName}`);
  }
}

seed()
  .catch(e => {
    console.error('Seeding error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });