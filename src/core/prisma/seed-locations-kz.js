const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const regions = [
  {
    translations: [
      { language: 'en', name: 'Abai Region' },
      { language: 'ru', name: 'Абайская область' },
      { language: 'kz', name: 'Абай облысы' }
    ],
    lat: 50.4333, lng: 80.2667,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Semey' },
          { language: 'ru', name: 'Семей' },
          { language: 'kz', name: 'Семей' }
        ],
        lat: 50.4333, lng: 80.2667
      },
      {
        translations: [
          { language: 'en', name: 'Kurchatov' },
          { language: 'ru', name: 'Курчатов' },
          { language: 'kz', name: 'Курчатов' }
        ],
        lat: 50.7567, lng: 78.5400
      },
      {
        translations: [
          { language: 'en', name: 'Ayagoz' },
          { language: 'ru', name: 'Аягоз' },
          { language: 'kz', name: 'Аягөз' }
        ],
        lat: 47.9667, lng: 80.4333
      },
      {
        translations: [
          { language: 'en', name: 'Shar' },
          { language: 'ru', name: 'Чарск' },
          { language: 'kz', name: 'Шар' }
        ],
        lat: 49.5858, lng: 81.0478
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Akmola Region' },
      { language: 'ru', name: 'Акмолинская область' },
      { language: 'kz', name: 'Ақмола облысы' }
    ],
    lat: 53.2833, lng: 69.3833,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Kokshetau' },
          { language: 'ru', name: 'Кокшетау' },
          { language: 'kz', name: 'Көкшетау' }
        ],
        lat: 53.2833, lng: 69.3833
      },
      {
        translations: [
          { language: 'en', name: 'Stepnogorsk' },
          { language: 'ru', name: 'Степногорск' },
          { language: 'kz', name: 'Степногорск' }
        ],
        lat: 52.3497, lng: 71.8900
      },
      {
        translations: [
          { language: 'en', name: 'Akkol' },
          { language: 'ru', name: 'Акколь' },
          { language: 'kz', name: 'Ақкөл' }
        ],
        lat: 52.0000, lng: 70.9333
      },
      {
        translations: [
          { language: 'en', name: 'Atbasar' },
          { language: 'ru', name: 'Атбасар' },
          { language: 'kz', name: 'Атбасар' }
        ],
        lat: 51.8000, lng: 68.3333
      },
      {
        translations: [
          { language: 'en', name: 'Derzhavinsk' },
          { language: 'ru', name: 'Державинск' },
          { language: 'kz', name: 'Державинск' }
        ],
        lat: 51.1000, lng: 66.3170
      },
      {
        translations: [
          { language: 'en', name: 'Ereymentau' },
          { language: 'ru', name: 'Эрейментау' },
          { language: 'kz', name: 'Ерейментау' }
        ],
        lat: 51.6170, lng: 73.1000
      },
      {
        translations: [
          { language: 'en', name: 'Esil' },
          { language: 'ru', name: 'Есиль' },
          { language: 'kz', name: 'Есіл' }
        ],
        lat: 51.9556, lng: 66.4042
      },
      {
        translations: [
          { language: 'en', name: 'Makinsk' },
          { language: 'ru', name: 'Макинск' },
          { language: 'kz', name: 'Макинск' }
        ],
        lat: 52.6292, lng: 70.4169
      },
      {
        translations: [
          { language: 'en', name: 'Shchuchinsk' },
          { language: 'ru', name: 'Щучинск' },
          { language: 'kz', name: 'Щучинск' }
        ],
        lat: 52.9333, lng: 70.2000
      },
      {
        translations: [
          { language: 'en', name: 'Stepnyak' },
          { language: 'ru', name: 'Степняк' },
          { language: 'kz', name: 'Степняк' }
        ],
        lat: 52.8333, lng: 70.7833
      },
      {
        translations: [
          { language: 'en', name: 'Qosshy' },
          { language: 'ru', name: 'Косшы' },
          { language: 'kz', name: 'Қосшы' }
        ],
        lat: 50.9800, lng: 71.3500
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Aktobe Region' },
      { language: 'ru', name: 'Актюбинская область' },
      { language: 'kz', name: 'Ақтөбе облысы' }
    ],
    lat: 50.2836, lng: 57.2297,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Aktobe' },
          { language: 'ru', name: 'Актобе' },
          { language: 'kz', name: 'Ақтөбе' }
        ],
        lat: 50.2836, lng: 57.2297
      },
      {
        translations: [
          { language: 'en', name: 'Alga' },
          { language: 'ru', name: 'Алга' },
          { language: 'kz', name: 'Алға' }
        ],
        lat: 49.9028, lng: 57.3333
      },
      {
        translations: [
          { language: 'en', name: 'Embi' },
          { language: 'ru', name: 'Эмба' },
          { language: 'kz', name: 'Ембі' }
        ],
        lat: 48.8267, lng: 58.1442
      },
      {
        translations: [
          { language: 'en', name: 'Kandyagash' },
          { language: 'ru', name: 'Кандыагаш' },
          { language: 'kz', name: 'Қандыағаш' }
        ],
        lat: 49.4556, lng: 57.4161
      },
      {
        translations: [
          { language: 'en', name: 'Khromtau' },
          { language: 'ru', name: 'Хромтау' },
          { language: 'kz', name: 'Хромтау' }
        ],
        lat: 50.2503, lng: 58.4347
      },
      {
        translations: [
          { language: 'en', name: 'Shalkar' },
          { language: 'ru', name: 'Шалкар' },
          { language: 'kz', name: 'Шалқар' }
        ],
        lat: 47.8333, lng: 59.6000
      },
      {
        translations: [
          { language: 'en', name: 'Temir' },
          { language: 'ru', name: 'Темир' },
          { language: 'kz', name: 'Темір' }
        ],
        lat: 49.1413, lng: 57.1285
      },
      {
        translations: [
          { language: 'en', name: 'Zhem' },
          { language: 'ru', name: 'Жем' },
          { language: 'kz', name: 'Жем' }
        ],
        lat: 48.7697, lng: 58.0714
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Almaty Region' },
      { language: 'ru', name: 'Алматинская область' },
      { language: 'kz', name: 'Алматы облысы' }
    ],
    lat: 43.8833, lng: 77.0833,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Qonaev' },
          { language: 'ru', name: 'Конаев' },
          { language: 'kz', name: 'Қонаев' }
        ],
        lat: 43.8833, lng: 77.0833
      },
      {
        translations: [
          { language: 'en', name: 'Talgar' },
          { language: 'ru', name: 'Талгар' },
          { language: 'kz', name: 'Талғар' }
        ],
        lat: 43.3000, lng: 77.2333
      },
      {
        translations: [
          { language: 'en', name: 'Esik' },
          { language: 'ru', name: 'Иссык' },
          { language: 'kz', name: 'Есік' }
        ],
        lat: 43.3500, lng: 77.4670
      },
      {
        translations: [
          { language: 'en', name: 'Kaskelen' },
          { language: 'ru', name: 'Каскелен' },
          { language: 'kz', name: 'Қаскелең' }
        ],
        lat: 43.2000, lng: 76.6200
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Atyrau Region' },
      { language: 'ru', name: 'Атырауская область' },
      { language: 'kz', name: 'Атырау облысы' }
    ],
    lat: 47.1167, lng: 51.8833,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Atyrau' },
          { language: 'ru', name: 'Атырау' },
          { language: 'kz', name: 'Атырау' }
        ],
        lat: 47.1167, lng: 51.8833
      },
      {
        translations: [
          { language: 'en', name: 'Kulsary' },
          { language: 'ru', name: 'Кульсары' },
          { language: 'kz', name: 'Құлсары' }
        ],
        lat: 46.9833, lng: 54.0170
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Jambyl Region' },
      { language: 'ru', name: 'Жамбылская область' },
      { language: 'kz', name: 'Жамбыл облысы' }
    ],
    lat: 42.9000, lng: 71.3670,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Taraz' },
          { language: 'ru', name: 'Тараз' },
          { language: 'kz', name: 'Тараз' }
        ],
        lat: 42.9000, lng: 71.3670
      },
      {
        translations: [
          { language: 'en', name: 'Karatau' },
          { language: 'ru', name: 'Каратау' },
          { language: 'kz', name: 'Қаратау' }
        ],
        lat: 43.1670, lng: 70.4500
      },
      {
        translations: [
          { language: 'en', name: 'Zhanatas' },
          { language: 'ru', name: 'Жанатас' },
          { language: 'kz', name: 'Жаңатас' }
        ],
        lat: 43.5705, lng: 69.7335
      },
      {
        translations: [
          { language: 'en', name: 'Shu' },
          { language: 'ru', name: 'Чу' },
          { language: 'kz', name: 'Шу' }
        ],
        lat: 43.5983, lng: 73.7614
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Jetisu Region' },
      { language: 'ru', name: 'Жетысуская область' },
      { language: 'kz', name: 'Жетісу облысы' }
    ],
    lat: 45.0000, lng: 78.0000,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Taldykorgan' },
          { language: 'ru', name: 'Талдыкорган' },
          { language: 'kz', name: 'Талдықорған' }
        ],
        lat: 45.0156, lng: 78.3735
      },
      {
        translations: [
          { language: 'en', name: 'Tekeli' },
          { language: 'ru', name: 'Текели' },
          { language: 'kz', name: 'Текелі' }
        ],
        lat: 44.8300, lng: 78.8300
      },
      {
        translations: [
          { language: 'en', name: 'Zharkent' },
          { language: 'ru', name: 'Жаркент' },
          { language: 'kz', name: 'Жаркент' }
        ],
        lat: 44.1667, lng: 80.0000
      },
      {
        translations: [
          { language: 'en', name: 'Sarkand' },
          { language: 'ru', name: 'Саркан' },
          { language: 'kz', name: 'Сарқан' }
        ],
        lat: 45.4100, lng: 79.9150
      },
      {
        translations: [
          { language: 'en', name: 'Usharal' },
          { language: 'ru', name: 'Ушарал' },
          { language: 'kz', name: 'Үшарал' }
        ],
        lat: 46.1600, lng: 80.9500
      },
      {
        translations: [
          { language: 'en', name: 'Ushtobe' },
          { language: 'ru', name: 'Үштөбе' },
          { language: 'kz', name: 'Үштөбе' }
        ],
        lat: 45.3500, lng: 77.9800
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Karaganda Region' },
      { language: 'ru', name: 'Карагандинская область' },
      { language: 'kz', name: 'Қарағанды облысы' }
    ],
    lat: 49.8030, lng: 73.1020,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Karagandy' },
          { language: 'ru', name: 'Караганда' },
          { language: 'kz', name: 'Қарағанды' }
        ],
        lat: 49.8030, lng: 73.1020
      },
      {
        translations: [
          { language: 'en', name: 'Balkhash' },
          { language: 'ru', name: 'Балхаш' },
          { language: 'kz', name: 'Балқаш' }
        ],
        lat: 46.8531, lng: 74.9502
      },
      {
        translations: [
          { language: 'en', name: 'Priozersk' },
          { language: 'ru', name: 'Приозерск' },
          { language: 'kz', name: 'Приозерск' }
        ],
        lat: 46.0333, lng: 73.7000
      },
      {
        translations: [
          { language: 'en', name: 'Saran' },
          { language: 'ru', name: 'Сарань' },
          { language: 'kz', name: 'Саран' }
        ],
        lat: 49.7900, lng: 72.8667
      },
      {
        translations: [
          { language: 'en', name: 'Shakhtinsk' },
          { language: 'ru', name: 'Шахтинск' },
          { language: 'kz', name: 'Шахтинск' }
        ],
        lat: 49.6939, lng: 72.5914
      },
      {
        translations: [
          { language: 'en', name: 'Temirtau' },
          { language: 'ru', name: 'Темиртау' },
          { language: 'kz', name: 'Теміртау' }
        ],
        lat: 50.0670, lng: 72.9647
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Kostanay Region' },
      { language: 'ru', name: 'Костанайская область' },
      { language: 'kz', name: 'Қостанай облысы' }
    ],
    lat: 53.2000, lng: 63.6200,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Kostanay' },
          { language: 'ru', name: 'Костанай' },
          { language: 'kz', name: 'Қостанай' }
        ],
        lat: 53.2000, lng: 63.6200
      },
      {
        translations: [
          { language: 'en', name: 'Arkalyk' },
          { language: 'ru', name: 'Аркалык' },
          { language: 'kz', name: 'Арқалық' }
        ],
        lat: 50.2481, lng: 66.9278
      },
      {
        translations: [
          { language: 'en', name: 'Lisakovsk' },
          { language: 'ru', name: 'Лисаковск' },
          { language: 'kz', name: 'Лисаковск' }
        ],
        lat: 52.5471, lng: 62.4999
      },
      {
        translations: [
          { language: 'en', name: 'Rudny' },
          { language: 'ru', name: 'Рудный' },
          { language: 'kz', name: 'Рудный' }
        ],
        lat: 52.9670, lng: 63.1330
      },
      {
        translations: [
          { language: 'en', name: 'Zhetikara' },
          { language: 'ru', name: 'Житикара' },
          { language: 'kz', name: 'Жітіқара' }
        ],
        lat: 52.1908, lng: 61.2011
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Kyzylorda Region' },
      { language: 'ru', name: 'Кызылординская область' },
      { language: 'kz', name: 'Қызылорда облысы' }
    ],
    lat: 44.8500, lng: 65.5167,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Kyzylorda' },
          { language: 'ru', name: 'Кызылорда' },
          { language: 'kz', name: 'Қызылорда' }
        ],
        lat: 44.8500, lng: 65.5167
      },
      {
        translations: [
          { language: 'en', name: 'Aral' },
          { language: 'ru', name: 'Аральск' },
          { language: 'kz', name: 'Арал' }
        ],
        lat: 46.7833, lng: 61.6667
      },
      {
        translations: [
          { language: 'en', name: 'Kazaly' },
          { language: 'ru', name: 'Казалинск' },
          { language: 'kz', name: 'Қазалы' }
        ],
        lat: 45.7670, lng: 62.1000
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Mangystau Region' },
      { language: 'ru', name: 'Мангистауская область' },
      { language: 'kz', name: 'Маңғыстау облысы' }
    ],
    lat: 43.6525, lng: 51.1575,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Aktau' },
          { language: 'ru', name: 'Актау' },
          { language: 'kz', name: 'Ақтау' }
        ],
        lat: 43.6525, lng: 51.1575
      },
      {
        translations: [
          { language: 'en', name: 'Zhanaozen' },
          { language: 'ru', name: 'Жанаозен' },
          { language: 'kz', name: 'Жаңаөзен' }
        ],
        lat: 43.3378, lng: 52.8553
      },
      {
        translations: [
          { language: 'en', name: 'Fort-Shevchenko' },
          { language: 'ru', name: 'Форт-Шевченко' },
          { language: 'kz', name: 'Форт-Шевченко' }
        ],
        lat: 44.5170, lng: 50.2670
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'North Kazakhstan Region' },
      { language: 'ru', name: 'Северо-Казахстанская область' },
      { language: 'kz', name: 'Солтүстік Қазақстан облысы' }
    ],
    lat: 54.8833, lng: 69.1667,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Petropavl' },
          { language: 'ru', name: 'Петропавловск' },
          { language: 'kz', name: 'Петропавл' }
        ],
        lat: 54.8833, lng: 69.1667
      },
      {
        translations: [
          { language: 'en', name: 'Bulayevo' },
          { language: 'ru', name: 'Булаево' },
          { language: 'kz', name: 'Булаево' }
        ],
        lat: 54.9056, lng: 70.4439
      },
      {
        translations: [
          { language: 'en', name: 'Mamlyutka' },
          { language: 'ru', name: 'Мамлютка' },
          { language: 'kz', name: 'Мамлют' }
        ],
        lat: 54.9375, lng: 68.5394
      },
      {
        translations: [
          { language: 'en', name: 'Sergeyevka' },
          { language: 'ru', name: 'Сергеевка' },
          { language: 'kz', name: 'Сергеевка' }
        ],
        lat: 53.8800, lng: 67.4158
      },
      {
        translations: [
          { language: 'en', name: 'Taiynsha' },
          { language: 'ru', name: 'Тайынша' },
          { language: 'kz', name: 'Тайынша' }
        ],
        lat: 53.8478, lng: 69.7639
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Pavlodar Region' },
      { language: 'ru', name: 'Павлодарская область' },
      { language: 'kz', name: 'Павлодар облысы' }
    ],
    lat: 52.3000, lng: 76.9500,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Pavlodar' },
          { language: 'ru', name: 'Павлодар' },
          { language: 'kz', name: 'Павлодар' }
        ],
        lat: 52.3000, lng: 76.9500
      },
      {
        translations: [
          { language: 'en', name: 'Aksu' },
          { language: 'ru', name: 'Аксу' },
          { language: 'kz', name: 'Ақсу' }
        ],
        lat: 52.0333, lng: 76.9167
      },
      {
        translations: [
          { language: 'en', name: 'Ekibastuz' },
          { language: 'ru', name: 'Экибастуз' },
          { language: 'kz', name: 'Екібастұз' }
        ],
        lat: 51.6667, lng: 75.3667
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Turkistan Region' },
      { language: 'ru', name: 'Туркестанская область' },
      { language: 'kz', name: 'Түркістан облысы' }
    ],
    lat: 43.3019, lng: 68.2692,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Turkistan' },
          { language: 'ru', name: 'Туркестан' },
          { language: 'kz', name: 'Түркістан' }
        ],
        lat: 43.3019, lng: 68.2692
      },
      {
        translations: [
          { language: 'en', name: 'Kentau' },
          { language: 'ru', name: 'Кентау' },
          { language: 'kz', name: 'Кентау' }
        ],
        lat: 43.5170, lng: 68.5170
      },
      {
        translations: [
          { language: 'en', name: 'Arys' },
          { language: 'ru', name: 'Арыс' },
          { language: 'kz', name: 'Арыс' }
        ],
        lat: 42.4333, lng: 68.8000
      },
      {
        translations: [
          { language: 'en', name: 'Saryagash' },
          { language: 'ru', name: 'Сарыагаш' },
          { language: 'kz', name: 'Сарыағаш' }
        ],
        lat: 41.4667, lng: 69.1667
      },
      {
        translations: [
          { language: 'en', name: 'Shardara' },
          { language: 'ru', name: 'Шардара' },
          { language: 'kz', name: 'Шардара' }
        ],
        lat: 41.2618, lng: 67.9844
      },
      {
        translations: [
          { language: 'en', name: 'Zhetisay' },
          { language: 'ru', name: 'Жетысай' },
          { language: 'kz', name: 'Жетісай' }
        ],
        lat: 40.7580, lng: 68.3315
      },
      {
        translations: [
          { language: 'en', name: 'Lenger' },
          { language: 'ru', name: 'Ленгер' },
          { language: 'kz', name: 'Леңгер' }
        ],
        lat: 42.1819, lng: 69.8878
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'Ulytau Region' },
      { language: 'ru', name: 'Улытауская область' },
      { language: 'kz', name: 'Ұлытау облысы' }
    ],
    lat: 47.7878, lng: 67.7070,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Jezkazgan' },
          { language: 'ru', name: 'Жезказган' },
          { language: 'kz', name: 'Жезқазған' }
        ],
        lat: 47.7833, lng: 67.7000
      },
      {
        translations: [
          { language: 'en', name: 'Satbayev' },
          { language: 'ru', name: 'Сатпаев' },
          { language: 'kz', name: 'Сәтбаев' }
        ],
        lat: 47.7000, lng: 67.5000
      },
      {
        translations: [
          { language: 'en', name: 'Karazhal' },
          { language: 'ru', name: 'Каражал' },
          { language: 'kz', name: 'Қаражал' }
        ],
        lat: 48.0128, lng: 70.7822
      }
    ]
  },
  {
    translations: [
      { language: 'en', name: 'West Kazakhstan Region' },
      { language: 'ru', name: 'Западно-Казахстанская область' },
      { language: 'kz', name: 'Батыс Қазақстан облысы' }
    ],
    lat: 51.2225, lng: 51.3725,
    cities: [
      {
        translations: [
          { language: 'en', name: 'Oral' },
          { language: 'ru', name: 'Уральск' },
          { language: 'kz', name: 'Орал' }
        ],
        lat: 51.2225, lng: 51.3725
      },
      {
        translations: [
          { language: 'en', name: 'Aksai' },
          { language: 'ru', name: 'Аксай' },
          { language: 'kz', name: 'Ақсай' }
        ],
        lat: 51.1678, lng: 52.9950
      }
    ]
  }
];

async function seed() {
  for (const region of regions) {
    // Create the region and its translations
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
    console.log(`Created region: ${createdRegion.translations[2].name}`);  // logs English name of region
  }
}

seed()
  .catch(e => {
    console.error('Seeding error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });