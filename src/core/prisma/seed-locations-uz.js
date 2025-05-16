import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const regions = [
  /** 1. Republic of Karakalpakstan */
  {
    translations: [
      { language: 'uz', name: 'Qoraqalpogʻiston Respublikasi' },
      { language: 'ru', name: 'Республика Каракалпакстан' },
      { language: 'en', name: 'Republic of Karakalpakstan' },
    ],
    lat: 42.45306, lng: 59.61028,  // coordinates near Nukus (capital)
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Nukus' },
          { language: 'ru', name: 'Нукус' },
          { language: 'en', name: 'Nukus' },
        ],
        lat: 42.45306, lng: 59.61028,
      },
      {
        translations: [
          { language: 'uz', name: 'Mangʻit' },
          { language: 'ru', name: 'Мангит' },
          { language: 'en', name: 'Mangit' },
        ],
        lat: 42.10500, lng: 60.06111,
      },
      {
        translations: [
          { language: 'uz', name: 'Beruniy' },
          { language: 'ru', name: 'Беруни' },
          { language: 'en', name: 'Beruniy' },
        ],
        lat: 41.69167, lng: 60.75000,
      },
      {
        translations: [
          { language: 'uz', name: 'Xalqobod' },
          { language: 'ru', name: 'Халкабад' },
          { language: 'en', name: 'Xalqobod' },
        ],
        lat: 42.88750, lng: 59.77083,
      },
      {
        translations: [
          { language: 'uz', name: 'Qoʻngʻirot' },
          { language: 'ru', name: 'Кунград' },
          { language: 'en', name: 'Kungrad' },
        ],
        lat: 43.05833, lng: 58.84306,
      },
      {
        translations: [
          { language: 'uz', name: 'Moʻynoq' },
          { language: 'ru', name: 'Муйнак' },
          { language: 'en', name: 'Muynak' },
        ],
        lat: 43.76306, lng: 59.02222,
      },
      {
        translations: [
          { language: 'uz', name: 'Taxiatosh' },
          { language: 'ru', name: 'Тахиаташ' },
          { language: 'en', name: 'Takhiatash' },
        ],
        lat: 42.31250, lng: 59.61944,
      },
      {
        translations: [
          { language: 'uz', name: 'Toʻrtkoʻl' },
          { language: 'ru', name: 'Тўрткўл' },
          { language: 'en', name: 'Turtkul' },
        ],
        lat: 41.56000, lng: 61.00000,
      },
      {
        translations: [
          { language: 'uz', name: 'Xo‘jayli' },
          { language: 'ru', name: 'Ходжейли' },
          { language: 'en', name: 'Khojayli' },
        ],
        lat: 42.40000, lng: 59.44944,
      },
      {
        translations: [
          { language: 'uz', name: 'Chimboy' },
          { language: 'ru', name: 'Чимбай' },
          { language: 'en', name: 'Chimbay' },
        ],
        lat: 42.84306, lng: 59.99333,
      },
      {
        translations: [
          { language: 'uz', name: 'Shumanay' },
          { language: 'ru', name: 'Шуманай' },
          { language: 'en', name: 'Shumanay' },
        ],
        lat: 42.31944, lng: 58.97222,
      },
      {
        translations: [
          { language: 'uz', name: 'Bostan' },
          { language: 'ru', name: 'Бостан' },
          { language: 'en', name: 'Bostan' },
        ],
        lat: 42.46667, lng: 61.63333,
      },
    ],
  },

  /** 2. Andijon (Andijan) Region */
  {
    translations: [
      { language: 'uz', name: 'Andijon viloyati' },
      { language: 'ru', name: 'Андижон вилояти' },
      { language: 'en', name: 'Andijan Region' },
    ],
    lat: 40.78210, lng: 72.34420,  // coordinates of Andijan city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Andijon' },
          { language: 'ru', name: 'Андижан' },
          { language: 'en', name: 'Andijan' },
        ],
        lat: 40.78210, lng: 72.34420,
      },
      {
        translations: [
          { language: 'uz', name: 'Xonobod' },
          { language: 'ru', name: 'Ханабад' },
          { language: 'en', name: 'Khanabad' },
        ],
        lat: 40.80000, lng: 72.98333,
      },
      {
        translations: [
          { language: 'uz', name: 'Jalaquduq' },
          { language: 'ru', name: 'Джалакудук' },
          { language: 'en', name: 'Jalaquduq' },
        ],
        lat: 40.72750, lng: 72.33389,
      },
      {
        translations: [
          { language: 'uz', name: 'Poytugʻ' },
          { language: 'ru', name: 'Пойтуг' },
          { language: 'en', name: 'Poytug\'' },
        ],
        lat: 40.90111, lng: 72.25722,
      },
      {
        translations: [
          { language: 'uz', name: 'Qoʻrgʻontepa' },
          { language: 'ru', name: 'Кургантепа' },
          { language: 'en', name: 'Qo‘rg‘ontepa' },
        ],
        lat: 40.73167, lng: 72.76750,
      },
      {
        translations: [
          { language: 'uz', name: 'Qorasuv' },
          { language: 'ru', name: 'Карасу' },
          { language: 'en', name: 'Qorasuv' },
        ],
        lat: 40.66667, lng: 72.86667,
      },
      {
        translations: [
          { language: 'uz', name: 'Asaka' },
          { language: 'ru', name: 'Асака' },
          { language: 'en', name: 'Asaka' },
        ],
        lat: 40.63333, lng: 72.23333,
      },
      {
        translations: [
          { language: 'uz', name: 'Marhamat' },
          { language: 'ru', name: 'Мархамат' },
          { language: 'en', name: 'Marhamat' },
        ],
        lat: 40.47333, lng: 72.34111,
      },
      {
        translations: [
          { language: 'uz', name: 'Shahrixon' },
          { language: 'ru', name: 'Шахрихан' },
          { language: 'en', name: 'Shahrixon' },
        ],
        lat: 40.71167, lng: 72.05778,
      },
      {
        translations: [
          { language: 'uz', name: 'Paxtaobod' },
          { language: 'ru', name: 'Пахтаабад' },
          { language: 'en', name: 'Paxtaobod' },
        ],
        lat: 40.93778, lng: 72.34806,
      },
      {
        translations: [
          { language: 'uz', name: 'Xoʻjaobod' },
          { language: 'ru', name: 'Хужаобод' },
          { language: 'en', name: 'Xo‘jaobod' },
        ],
        lat: 40.66917, lng: 72.56000,
      },
    ],
  },

  /** 3. Namangan Region */
  {
    translations: [
      { language: 'uz', name: 'Namangan viloyati' },
      { language: 'ru', name: 'Наманган вилояти' },
      { language: 'en', name: 'Namangan Region' },
    ],
    lat: 40.99830, lng: 71.67260,  // coordinates of Namangan city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Namangan' },
          { language: 'ru', name: 'Наманган' },
          { language: 'en', name: 'Namangan' },
        ],
        lat: 40.99830, lng: 71.67260,
      },
      {
        translations: [
          { language: 'uz', name: 'Kosonsoy' },
          { language: 'ru', name: 'Косонсой' },
          { language: 'en', name: 'Kosonsoy' },
        ],
        lat: 41.21500, lng: 71.54417,
      },
      {
        translations: [
          { language: 'uz', name: 'Haqqulobod' },
          { language: 'ru', name: 'Хаккулабад' },
          { language: 'en', name: 'Haqqulobod' },
        ],
        lat: 40.90611, lng: 71.19250,
      },
      {
        translations: [
          { language: 'uz', name: 'Pop' },
          { language: 'ru', name: 'Пап' },
          { language: 'en', name: 'Pop' },
        ],
        lat: 40.87361, lng: 71.10861,
      },
      {
        translations: [
          { language: 'uz', name: 'Toʻraqoʻrgʻon' },
          { language: 'ru', name: 'Туракурган' },
          { language: 'en', name: 'Turaqo‘rg‘on' },
        ],
        lat: 41.02139, lng: 71.51167,
      },
      {
        translations: [
          { language: 'uz', name: 'Yangi Namangan' },
          { language: 'ru', name: 'Янгинаманган' },
          { language: 'en', name: 'Yangi Namangan' },
        ],
        lat: 40.98000, lng: 71.60000,
      },
      {
        translations: [
          { language: 'uz', name: 'Uchqoʻrgʻon' },
          { language: 'ru', name: 'Учкурган' },
          { language: 'en', name: 'Uchqo‘rg‘on' },
        ],
        lat: 41.11306, lng: 71.47444,
      },
      {
        translations: [
          { language: 'uz', name: 'Chortoq' },
          { language: 'ru', name: 'Чартак' },
          { language: 'en', name: 'Chortoq' },
        ],
        lat: 41.06417, lng: 71.81333,
      },
      {
        translations: [
          { language: 'uz', name: 'Chust' },
          { language: 'ru', name: 'Чуст' },
          { language: 'en', name: 'Chust' },
        ],
        lat: 41.00028, lng: 71.23944,
      },
    ],
  },

  /** 4. Fargʻona (Fergana) Region */
  {
    translations: [
      { language: 'uz', name: 'Fargʻona viloyati' },
      { language: 'ru', name: 'Фарғона вилояти' },
      { language: 'en', name: 'Fergana Region' },
    ],
    lat: 40.38420, lng: 71.78430,  // coordinates of Fergana city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Fargʻona' },
          { language: 'ru', name: 'Фергана' },
          { language: 'en', name: 'Fergana' },
        ],
        lat: 40.38420, lng: 71.78430,
      },
      {
        translations: [
          { language: 'uz', name: 'Margʻilon' },
          { language: 'ru', name: 'Маргилан' },
          { language: 'en', name: 'Margilan' },
        ],
        lat: 40.47222, lng: 71.72472,
      },
      {
        translations: [
          { language: 'uz', name: 'Quvasoy' },
          { language: 'ru', name: 'Кувасай' },
          { language: 'en', name: 'Quvasoy' },
        ],
        lat: 40.30278, lng: 71.98000,
      },
      {
        translations: [
          { language: 'uz', name: 'Qoʻqon' },
          { language: 'ru', name: 'Коканд' },
          { language: 'en', name: 'Kokand' },
        ],
        lat: 40.53000, lng: 70.94000,
      },
      {
        translations: [
          { language: 'uz', name: 'Tinchlik' },
          { language: 'ru', name: 'Тинчлик' },
          { language: 'en', name: 'Tinchlik' },
        ],
        lat: 40.45111, lng: 71.76750,
      },
      {
        translations: [
          { language: 'uz', name: 'Beshariq' },
          { language: 'ru', name: 'Бешарык' },
          { language: 'en', name: 'Beshariq' },
        ],
        lat: 40.23333, lng: 71.76667,
      },
      {
        translations: [
          { language: 'uz', name: 'Quva' },
          { language: 'ru', name: 'Кува' },
          { language: 'en', name: 'Quva' },
        ],
        lat: 40.52222, lng: 72.07250,
      },
      {
        translations: [
          { language: 'uz', name: 'Rishton' },
          { language: 'ru', name: 'Риштан' },
          { language: 'en', name: 'Rishton' },
        ],
        lat: 40.35722, lng: 71.27778,
      },
      {
        translations: [
          { language: 'uz', name: 'Yaypan' },
          { language: 'ru', name: 'Яйпан' },
          { language: 'en', name: 'Yaypan' },
        ],
        lat: 40.37583, lng: 71.74611,
      },
    ],
  },

  /** 5. Buxoro (Bukhara) Region */
  {
    translations: [
      { language: 'uz', name: 'Buxoro viloyati' },
      { language: 'ru', name: 'Бухоро вилояти' },
      { language: 'en', name: 'Bukhara Region' },
    ],
    lat: 39.77472, lng: 64.42861,  // coordinates of Bukhara city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Buxoro' },
          { language: 'ru', name: 'Бухара' },
          { language: 'en', name: 'Bukhara' },
        ],
        lat: 39.77472, lng: 64.42861,
      },
      {
        translations: [
          { language: 'uz', name: 'Kogon' },
          { language: 'ru', name: 'Каган' },
          { language: 'en', name: 'Kogon' },
        ],
        lat: 39.72167, lng: 64.54500,
      },
      {
        translations: [
          { language: 'uz', name: 'Olot' },
          { language: 'ru', name: 'Алат' },
          { language: 'en', name: 'Olot' },
        ],
        lat: 39.47306, lng: 63.80333,
      },
      {
        translations: [
          { language: 'uz', name: 'Gʻalaosiyo' },
          { language: 'ru', name: 'Галаосио' },
          { language: 'en', name: 'Galaosiyo' },
        ],
        lat: 39.75972, lng: 64.43000,
      },
      {
        translations: [
          { language: 'uz', name: 'Vobkent' },
          { language: 'ru', name: 'Вабкент' },
          { language: 'en', name: 'Vobkent' },
        ],
        lat: 40.03056, lng: 64.51583,
      },
      {
        translations: [
          { language: 'uz', name: 'Gʻijduvon' },
          { language: 'ru', name: 'Гиждуван' },
          { language: 'en', name: 'Gijduvon' },
        ],
        lat: 40.10000, lng: 64.68333,
      },
      {
        translations: [
          { language: 'uz', name: 'Qorakoʻl' },
          { language: 'ru', name: 'Каракуль' },
          { language: 'en', name: 'Karakul' },
        ],
        lat: 39.50000, lng: 63.83333,
      },
      {
        translations: [
          { language: 'uz', name: 'Qorovulbozor' },
          { language: 'ru', name: 'Караулбазар' },
          { language: 'en', name: 'Qorovulbozor' },
        ],
        lat: 39.48333, lng: 64.75000,
      },
      {
        translations: [
          { language: 'uz', name: 'Romitan' },
          { language: 'ru', name: 'Ромитан' },
          { language: 'en', name: 'Romitan' },
        ],
        lat: 39.93056, lng: 64.42583,
      },
      {
        translations: [
          { language: 'uz', name: 'Gazli' },
          { language: 'ru', name: 'Газли' },
          { language: 'en', name: 'Gazli' },
        ],
        lat: 40.13333, lng: 63.45000,
      },
      {
        translations: [
          { language: 'uz', name: 'Shofirkon' },
          { language: 'ru', name: 'Шофиркон' },
          { language: 'en', name: 'Shofirkon' },
        ],
        lat: 40.11750, lng: 64.50139,
      },
    ],
  },

  /** 6. Jizzax (Jizzakh) Region */
  {
    translations: [
      { language: 'uz', name: 'Jizzax viloyati' },
      { language: 'ru', name: 'Жиззах вилояти' },
      { language: 'en', name: 'Jizzakh Region' },
    ],
    lat: 40.11583, lng: 67.84222,  // coordinates of Jizzakh city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Jizzax' },
          { language: 'ru', name: 'Джиззак' },
          { language: 'en', name: 'Jizzakh' },
        ],
        lat: 40.11583, lng: 67.84222,
      },
      {
        translations: [
          { language: 'uz', name: 'Gʻallaorol' },
          { language: 'ru', name: 'Галлаорол' },
          { language: 'en', name: 'Gʻallaorol' },
        ],
        lat: 40.00833, lng: 68.55833,
      },
      {
        translations: [
          { language: 'uz', name: 'Doʻstlik' },
          { language: 'ru', name: 'Дустлик' },
          { language: 'en', name: 'Do‘stlik' },
        ],
        lat: 40.53000, lng: 68.03500,
      },
      {
        translations: [
          { language: 'uz', name: 'Dashtobod' },
          { language: 'ru', name: 'Даштобод' },
          { language: 'en', name: 'Dashtobod' },
        ],
        lat: 40.12556, lng: 68.46417,
      },
      {
        translations: [
          { language: 'uz', name: 'Gagarin' },
          { language: 'ru', name: 'Гагарин' },
          { language: 'en', name: 'Gagarin' },
        ],
        lat: 40.66111, lng: 68.18472,
      },
      {
        translations: [
          { language: 'uz', name: 'Paxtakor' },
          { language: 'ru', name: 'Пахтакор' },
          { language: 'en', name: 'Paxtakor' },
        ],
        lat: 40.31528, lng: 67.95833,
      },
    ],
  },

  /** 7. Qashqadaryo (Kashkadarya) Region */
  {
    translations: [
      { language: 'uz', name: 'Qashqadaryo viloyati' },
      { language: 'ru', name: 'Қашқадарё вилояти' },
      { language: 'en', name: 'Qashqadaryo Region' },
    ],
    lat: 38.86056, lng: 65.78905,  // coordinates of Qarshi city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Qarshi' },
          { language: 'ru', name: 'Карши' },
          { language: 'en', name: 'Karshi' },
        ],
        lat: 38.86056, lng: 65.78905,
      },
      {
        translations: [
          { language: 'uz', name: 'Shahrisabz' },
          { language: 'ru', name: 'Шахрисабз' },
          { language: 'en', name: 'Shahrisabz' },
        ],
        lat: 39.05583, lng: 66.82861,
      },
      {
        translations: [
          { language: 'uz', name: 'Gʻuzor' },
          { language: 'ru', name: 'Гузар' },
          { language: 'en', name: 'Guzor' },
        ],
        lat: 38.62028, lng: 66.24889,
      },
      {
        translations: [
          { language: 'uz', name: 'Qamashi' },
          { language: 'ru', name: 'Камаши' },
          { language: 'en', name: 'Qamashi' },
        ],
        lat: 38.83778, lng: 66.64472,
      },
      {
        translations: [
          { language: 'uz', name: 'Beshkent' },
          { language: 'ru', name: 'Бешкент' },
          { language: 'en', name: 'Beshkent' },
        ],
        lat: 38.82250, lng: 65.65306,
      },
      {
        translations: [
          { language: 'uz', name: 'Koson' },
          { language: 'ru', name: 'Касан' },
          { language: 'en', name: 'Koson' },
        ],
        lat: 39.03722, lng: 65.58528,
      },
      {
        translations: [
          { language: 'uz', name: 'Kitob' },
          { language: 'ru', name: 'Китаб' },
          { language: 'en', name: 'Kitob' },
        ],
        lat: 39.14417, lng: 66.88306,
      },
      {
        translations: [
          { language: 'uz', name: 'Muborak' },
          { language: 'ru', name: 'Мубарек' },
          { language: 'en', name: 'Mubarek' },
        ],
        lat: 39.25528, lng: 65.15250,
      },
      {
        translations: [
          { language: 'uz', name: 'Yangi Nishon' },
          { language: 'ru', name: 'Янгинишон' },
          { language: 'en', name: 'Yangi Nishon' },
        ],
        lat: 38.90250, lng: 65.89583,
      },
      {
        translations: [
          { language: 'uz', name: 'Tallimarjon' },
          { language: 'ru', name: 'Таллимаржон' },
          { language: 'en', name: 'Tallimarjon' },
        ],
        lat: 38.60500, lng: 64.48750,
      },
      {
        translations: [
          { language: 'uz', name: 'Chiroqchi' },
          { language: 'ru', name: 'Чиракчи' },
          { language: 'en', name: 'Chiroqchi' },
        ],
        lat: 39.01667, lng: 66.56500,
      },
      {
        translations: [
          { language: 'uz', name: 'Yakkabogʻ' },
          { language: 'ru', name: 'Яккабог' },
          { language: 'en', name: 'Yakkabog‘' },
        ],
        lat: 38.95583, lng: 66.66944,
      },
    ],
  },

  /** 8. Navoiy (Navoi) Region */
  {
    translations: [
      { language: 'uz', name: 'Navoiy viloyati' },
      { language: 'ru', name: 'Навоий вилояти' },
      { language: 'en', name: 'Navoi Region' },
    ],
    lat: 40.09294, lng: 65.37120,  // coordinates of Navoiy city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Navoiy' },
          { language: 'ru', name: 'Навои' },
          { language: 'en', name: 'Navoi' },
        ],
        lat: 40.09294, lng: 65.37120,
      },
      {
        translations: [
          { language: 'uz', name: 'Zarafshon' },
          { language: 'ru', name: 'Зарафшан' },
          { language: 'en', name: 'Zarafshan' },
        ],
        lat: 41.58222, lng: 64.23333,
      },
      {
        translations: [
          { language: 'uz', name: 'Gʻozgʻon' },
          { language: 'ru', name: 'Газган' },
          { language: 'en', name: 'Gozgon' },
        ],
        lat: 40.67389, lng: 63.56306,
      },
      {
        translations: [
          { language: 'uz', name: 'Qiziltepa' },
          { language: 'ru', name: 'Кизилтепа' },
          { language: 'en', name: 'Kiziltepa' },
        ],
        lat: 40.02833, lng: 64.85917,
      },
      {
        translations: [
          { language: 'uz', name: 'Nurota' },
          { language: 'ru', name: 'Нурата' },
          { language: 'en', name: 'Nurata' },
        ],
        lat: 40.56194, lng: 65.68889,
      },
      {
        translations: [
          { language: 'uz', name: 'Uchquduq' },
          { language: 'ru', name: 'Учкудук' },
          { language: 'en', name: 'Uchkuduk' },
        ],
        lat: 42.15417, lng: 63.56278,
      },
      {
        translations: [
          { language: 'uz', name: 'Yangirabod' },
          { language: 'ru', name: 'Янгирабад' },
          { language: 'en', name: 'Yangirabad' },
        ],
        lat: 40.28194, lng: 65.11250,
      },
    ],
  },

  /** 9. Samarqand (Samarkand) Region */
  {
    translations: [
      { language: 'uz', name: 'Samarqand viloyati' },
      { language: 'ru', name: 'Самарқанд вилояти' },
      { language: 'en', name: 'Samarkand Region' },
    ],
    lat: 39.65245, lng: 66.97014,  // coordinates of Samarkand city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Samarqand' },
          { language: 'ru', name: 'Самарканд' },
          { language: 'en', name: 'Samarkand' },
        ],
        lat: 39.65245, lng: 66.97014,
      },
      {
        translations: [
          { language: 'uz', name: 'Bulungʻur' },
          { language: 'ru', name: 'Булунгур' },
          { language: 'en', name: 'Bulungur' },
        ],
        lat: 39.76194, lng: 67.27083,
      },
      {
        translations: [
          { language: 'uz', name: 'Jomboy' },
          { language: 'ru', name: 'Джамбай' },
          { language: 'en', name: 'Jomboy' },
        ],
        lat: 39.71667, lng: 66.77500,
      },
      {
        translations: [
          { language: 'uz', name: 'Juma' },
          { language: 'ru', name: 'Джума' },
          { language: 'en', name: 'Juma' },
        ],
        lat: 39.71667, lng: 66.66417,
      },
      {
        translations: [
          { language: 'uz', name: 'Ishtixon' },
          { language: 'ru', name: 'Иштыхан' },
          { language: 'en', name: 'Ishtikhon' },
        ],
        lat: 39.96417, lng: 66.64167,
      },
      {
        translations: [
          { language: 'uz', name: 'Kattaqoʻrgʻon' },
          { language: 'ru', name: 'Каттакурган' },
          { language: 'en', name: 'Kattakurgan' },
        ],
        lat: 39.89806, lng: 66.25694,
      },
      {
        translations: [
          { language: 'uz', name: 'Nurobod' },
          { language: 'ru', name: 'Нурабад' },
          { language: 'en', name: 'Nurobod' },
        ],
        lat: 39.90139, lng: 65.97861,
      },
      {
        translations: [
          { language: 'uz', name: 'Oqtosh' },
          { language: 'ru', name: 'Акташ' },
          { language: 'en', name: 'Oqtosh' },
        ],
        lat: 40.28333, lng: 66.89639,
      },
      {
        translations: [
          { language: 'uz', name: 'Payariq' },
          { language: 'ru', name: 'Паярик' },
          { language: 'en', name: 'Payariq' },
        ],
        lat: 39.99444, lng: 67.00472,
      },
      {
        translations: [
          { language: 'uz', name: 'Urgut' },
          { language: 'ru', name: 'Ургут' },
          { language: 'en', name: 'Urgut' },
        ],
        lat: 39.40222, lng: 67.26917,
      },
      {
        translations: [
          { language: 'uz', name: 'Chelak' },
          { language: 'ru', name: 'Челек' },
          { language: 'en', name: 'Chelak' },
        ],
        lat: 39.92000, lng: 66.86111,
      },
    ],
  },

  /** 10. Surxondaryo (Surkhandarya) Region */
  {
    translations: [
      { language: 'uz', name: 'Surxondaryo viloyati' },
      { language: 'ru', name: 'Сурхондарё вилояти' },
      { language: 'en', name: 'Surkhandarya Region' },
    ],
    lat: 37.21700, lng: 67.28300,  // coordinates of Termez city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Termiz' },
          { language: 'ru', name: 'Термез' },
          { language: 'en', name: 'Termez' },
        ],
        lat: 37.21700, lng: 67.28300,
      },
      {
        translations: [
          { language: 'uz', name: 'Boysun' },
          { language: 'ru', name: 'Байсун' },
          { language: 'en', name: 'Boysun' },
        ],
        lat: 38.20611, lng: 67.22417,
      },
      {
        translations: [
          { language: 'uz', name: 'Denov' },
          { language: 'ru', name: 'Денау' },
          { language: 'en', name: 'Denau' },
        ],
        lat: 38.26667, lng: 67.89722,
      },
      {
        translations: [
          { language: 'uz', name: 'Jarqoʻrgʻon' },
          { language: 'ru', name: 'Джаркурган' },
          { language: 'en', name: 'Jarkurgan' },
        ],
        lat: 37.50611, lng: 67.82583,
      },
      {
        translations: [
          { language: 'uz', name: 'Qumqoʻrgʻon' },
          { language: 'ru', name: 'Кумкурган' },
          { language: 'en', name: 'Kumkurgan' },
        ],
        lat: 37.81000, lng: 67.37306,
      },
      {
        translations: [
          { language: 'uz', name: 'Shoʻrchi' },
          { language: 'ru', name: 'Шурчи' },
          { language: 'en', name: 'Sho‘rchi' },
        ],
        lat: 37.99917, lng: 67.78750,
      },
      {
        translations: [
          { language: 'uz', name: 'Sherobod' },
          { language: 'ru', name: 'Шерабад' },
          { language: 'en', name: 'Sherabad' },
        ],
        lat: 37.66750, lng: 67.00000,
      },
      {
        translations: [
          { language: 'uz', name: 'Shargʻun' },
          { language: 'ru', name: 'Шаргун' },
          { language: 'en', name: 'Shargun' },
        ],
        lat: 37.47806, lng: 67.45417,
      },
    ],
  },

  /** 11. Sirdaryo (Syrdarya) Region */
  {
    translations: [
      { language: 'uz', name: 'Sirdaryo viloyati' },
      { language: 'ru', name: 'Сирдарё вилояти' },
      { language: 'en', name: 'Syrdarya Region' },
    ],
    lat: 40.49000, lng: 68.79000,  // coordinates of Guliston city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Guliston' },
          { language: 'ru', name: 'Гулистан' },
          { language: 'en', name: 'Gulistan' },
        ],
        lat: 40.49000, lng: 68.79000,
      },
      {
        translations: [
          { language: 'uz', name: 'Shirin' },
          { language: 'ru', name: 'Ширин' },
          { language: 'en', name: 'Shirin' },
        ],
        lat: 40.22000, lng: 68.77500,
      },
      {
        translations: [
          { language: 'uz', name: 'Yangiyer' },
          { language: 'ru', name: 'Янгиер' },
          { language: 'en', name: 'Yangiyer' },
        ],
        lat: 40.27500, lng: 68.82250,
      },
      {
        translations: [
          { language: 'uz', name: 'Sirdaryo' },
          { language: 'ru', name: 'Сырдарья' },
          { language: 'en', name: 'Syrdarya' },
        ],
        lat: 40.50417, lng: 68.65306,
      },
      {
        translations: [
          { language: 'uz', name: 'Baxt' },
          { language: 'ru', name: 'Бахт' },
          { language: 'en', name: 'Bakht' },
        ],
        lat: 40.08333, lng: 68.53333,
      },
    ],
  },

  /** 12. Toshkent (Tashkent) Region */
  {
    translations: [
      { language: 'uz', name: 'Toshkent viloyati' },
      { language: 'ru', name: 'Тошкент вилояти' },
      { language: 'en', name: 'Tashkent Region' },
    ],
    lat: 41.04300, lng: 69.35780,  // coordinates of Nurafshon (region center)
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Nurafshon' },
          { language: 'ru', name: 'Нурафшон' },
          { language: 'en', name: 'Nurafshon' },
        ],
        lat: 41.04300, lng: 69.35780,
      },
      {
        translations: [
          { language: 'uz', name: 'Olmaliq' },
          { language: 'ru', name: 'Алмалык' },
          { language: 'en', name: 'Almalyk' },
        ],
        lat: 40.84472, lng: 69.59889,
      },
      {
        translations: [
          { language: 'uz', name: 'Angren' },
          { language: 'ru', name: 'Ангрен' },
          { language: 'en', name: 'Angren' },
        ],
        lat: 41.01667, lng: 70.14361,
      },
      {
        translations: [
          { language: 'uz', name: 'Bekobod' },
          { language: 'ru', name: 'Бекабад' },
          { language: 'en', name: 'Bekabad' },
        ],
        lat: 40.22000, lng: 69.26472,
      },
      {
        translations: [
          { language: 'uz', name: 'Ohangaron' },
          { language: 'ru', name: 'Ахангаран' },
          { language: 'en', name: 'Akhangaran' },
        ],
        lat: 40.90639, lng: 69.63889,
      },
      {
        translations: [
          { language: 'uz', name: 'Chirchiq' },
          { language: 'ru', name: 'Чирчик' },
          { language: 'en', name: 'Chirchiq' },
        ],
        lat: 41.46889, lng: 69.58222,
      },
      {
        translations: [
          { language: 'uz', name: 'Yangiyoʻl' },
          { language: 'ru', name: 'Янгиюль' },
          { language: 'en', name: 'Yangiyul' },
        ],
        lat: 41.11806, lng: 69.04722,
      },
      {
        translations: [
          { language: 'uz', name: 'Oqqoʻrgʻon' },
          { language: 'ru', name: 'Аккурган' },
          { language: 'en', name: 'Oqqo‘rg‘on' },
        ],
        lat: 40.87639, lng: 69.04528,
      },
      {
        translations: [
          { language: 'uz', name: 'Gʻazalkent' },
          { language: 'ru', name: 'Газалкент' },
          { language: 'en', name: 'G‘azalkent' },
        ],
        lat: 41.55833, lng: 69.77083,
      },
      {
        translations: [
          { language: 'uz', name: 'Boʻka' },
          { language: 'ru', name: 'Бока' },
          { language: 'en', name: 'Bo‘ka' },
        ],
        lat: 40.81389, lng: 69.19583,
      },
      {
        translations: [
          { language: 'uz', name: 'Parkent' },
          { language: 'ru', name: 'Паркент' },
          { language: 'en', name: 'Parkent' },
        ],
        lat: 41.29444, lng: 69.67639,
      },
      {
        translations: [
          { language: 'uz', name: 'Piskent' },
          { language: 'ru', name: 'Пискент' },
          { language: 'en', name: 'Piskent' },
        ],
        lat: 40.89722, lng: 68.81250,
      },
      {
        translations: [
          { language: 'uz', name: 'Chinoz' },
          { language: 'ru', name: 'Чиназ' },
          { language: 'en', name: 'Chinoz' },
        ],
        lat: 40.94417, lng: 68.76917,
      },
      {
        translations: [
          { language: 'uz', name: 'Keles' },
          { language: 'ru', name: 'Келес' },
          { language: 'en', name: 'Keles' },
        ],
        lat: 41.30000, lng: 69.26500,
      },
      {
        translations: [
          { language: 'uz', name: 'Doʻstobod' },
          { language: 'ru', name: 'Дустабад' },
          { language: 'en', name: 'Do‘stobod' },
        ],
        lat: 41.12000, lng: 69.23417,
      },
      {
        translations: [
          { language: 'uz', name: 'Yangiobod' },
          { language: 'ru', name: 'Янгиабад' },
          { language: 'en', name: 'Yangiobod' },
        ],
        lat: 41.12917, lng: 70.09444,
      },
    ],
  },

  /** 13. Xorazm (Khorezm) Region */
  {
    translations: [
      { language: 'uz', name: 'Xorazm viloyati' },
      { language: 'ru', name: 'Хоразм вилояти' },
      { language: 'en', name: 'Khorezm Region' },
    ],
    lat: 41.55000, lng: 60.63333,  // coordinates of Urganch city
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Urganch' },
          { language: 'ru', name: 'Урганч' },
          { language: 'en', name: 'Urgench' },
        ],
        lat: 41.55000, lng: 60.63333,
      },
      {
        translations: [
          { language: 'uz', name: 'Xiva' },
          { language: 'ru', name: 'Хива' },
          { language: 'en', name: 'Khiva' },
        ],
        lat: 41.37833, lng: 60.35639,
      },
      {
        translations: [
          { language: 'uz', name: 'Pitnak' },
          { language: 'ru', name: 'Питнак' },
          { language: 'en', name: 'Pitnak' },
        ],
        lat: 41.32056, lng: 60.03778,
      },
    ],
  },

  /** 14. Tashkent City (independent city) */
  {
    translations: [
      { language: 'uz', name: 'Toshkent shahri' },
      { language: 'ru', name: 'город Ташкент' },
      { language: 'en', name: 'Tashkent City' },
    ],
    lat: 41.30000, lng: 69.26667,  // coordinates of Tashkent city center
    cities: [
      {
        translations: [
          { language: 'uz', name: 'Toshkent' },
          { language: 'ru', name: 'Ташкент' },
          { language: 'en', name: 'Tashkent' },
        ],
        lat: 41.30000, lng: 69.26667,
      },
    ],
  },
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
          create: region.city.map(city => ({
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