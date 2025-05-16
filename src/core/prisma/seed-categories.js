import { PrismaClient } from '@prisma/client';
prisma = new PrismaClient();

const categories = [
  {
    "name": {
      "ru": "Ремонт, монтаж, отделка",
      "en": "Repair, installation, decoration",
      "kk": "Жөндеу, монтаждау, безендіру",
      "uz": "Ta'mirlash, o'rnatish, bezatish"
    },
    "subcategories": [
      {
        "ru": "Высотные работы",
        "en": "High -rise work",
        "kk": "Жоғары - жұмыс",
        "uz": "Yuqori ish"
      },
      {
        "ru": "Другие строительно-монтажные работы",
        "en": "Other construction and installation work",
        "kk": "Басқа құрылыс және монтаж жұмыстары",
        "uz": "Boshqa qurilish va o'rnatish ishlari"
      },
      {
        "ru": "Работы по вентиляции и кондиционированию",
        "en": "Ventilation and air conditioning",
        "kk": "Желдету және ауа баптау",
        "uz": "Shamollatish va konditsioner"
      },
      {
        "ru": "Работы по вскрытию дверей и замков",
        "en": "Work on opening doors and locks",
        "kk": "Есіктер мен құлыптарды ашу бойынша жұмыс",
        "uz": "Eshiklar va qulflar ustida ishlash"
      },
      {
        "ru": "Работы по отоплению",
        "en": "Heating work",
        "kk": "Жылу жұмысы",
        "uz": "Isitish ishi"
      },
      {
        "ru": "Работы по утеплению и шумоизоляции",
        "en": "Insulation and noise insulation work",
        "kk": "Оқшаулау және шу оқшаулау жұмыстары",
        "uz": "Izolyatsiya va shovqin izolatsiyasi"
      },
      {
        "ru": "Работы с дверьми и замками",
        "en": "Work with doors and locks",
        "kk": "Есіктермен және құлыптармен жұмыс",
        "uz": "Eshiklar va qulflar bilan ishlash"
      },
      {
        "ru": "Работы с обоями",
        "en": "Work with wallpaper",
        "kk": "Түсқағаздармен жұмыс",
        "uz": "Fon rasmi bilan ishlash"
      },
      {
        "ru": "Работы с окнами и балконами",
        "en": "Work with windows and balconies",
        "kk": "Windows және балкондармен жұмыс",
        "uz": "Windows va balkonlar bilan ishlash"
      },
      {
        "ru": "Работы с плиткой и кафелем",
        "en": "Tiles and tiles",
        "kk": "Работы с плиткой и кафелем",
        "uz": "Plitkalar va plitkalar"
      },
      {
        "ru": "Работы с полами",
        "en": "Work with floors",
        "kk": "Едендермен жұмыс",
        "uz": "Qavatlar bilan ishlash"
      },
      {
        "ru": "Работы с потолками",
        "en": "Work with ceilings",
        "kk": "Төбелермен жұмыс",
        "uz": "Shiftlar bilan ishlash"
      },
      {
        "ru": "Ремонт под ключ",
        "en": "Turnkey repair",
        "kk": "Қажетті жөндеу",
        "uz": "Tutilishni ta'mirlash"
      },
      {
        "ru": "Услуги газовщиков",
        "en": "Services of gas",
        "kk": "Газ қызметтері",
        "uz": "Gaz xizmatlari"
      },
      {
        "ru": "Услуги гипсокартонщиков",
        "en": "Services of drywall",
        "kk": "DryWall қызметі",
        "uz": "Drywall-ning xizmatlari"
      },
      {
        "ru": "Услуги изготовления ключей",
        "en": "Keys manufacturing services",
        "kk": "Кілттерді өндіру бойынша қызметтер",
        "uz": "Ishlab chiqarish xizmatlari"
      },
      {
        "ru": "Услуги изготовления мебели",
        "en": "Furniture manufacturing services",
        "kk": "Жиһаз өндірісі бойынша қызметтер",
        "uz": "Mebel ishlab chiqarish Xizmatlari"
      },
      {
        "ru": "Услуги маляров и штукатуров",
        "en": "Malyar and plasters services",
        "kk": "Маляр және пластерлердің қызметтері",
        "uz": "Malyar va plasterlar xizmatlari"
      },
      {
        "ru": "Услуги мастера на час",
        "en": "Master services for an hour",
        "kk": "Бір сағатқа арналған магистрлік қызметтер",
        "uz": "Bir soatlik magistrlik xizmatlari"
      },
      {
        "ru": "Услуги росписи стен",
        "en": "Wall painting services",
        "kk": "Қабырғалық кескіндеме бойынша қызметтер",
        "uz": "Devor bo'yash xizmatlari"
      },
      {
        "ru": "Услуги сантехников",
        "en": "Service services",
        "kk": "Қызмет көрсету қызметтері",
        "uz": "Xizmat xizmatlari"
      },
      {
        "ru": "Услуги сборки и ремонта мебели",
        "en": "Furniture assembly and repair services",
        "kk": "Жиһаз құрастыру және жөндеу қызметтері",
        "uz": "Mebel yig'ish va ta'mirlash xizmatlari"
      },
      {
        "ru": "Услуги электриков",
        "en": "Electricity services",
        "kk": "Электрмен жабдықтау",
        "uz": "Elektr xizmatlari"
      }
    ]
  },
  {
    "name": {
      "ru": "Помощь по дому",
      "en": "House help",
      "kk": "Үйге көмек",
      "uz": "Uy yordami"
    },
    "subcategories": [
      {
        "ru": "Санитарно-эпидемиологические услуги",
        "en": "Sanitary and epidemiological services",
        "kk": "Санитарлық-эпидемиологиялық қызметтер",
        "uz": "Sanitariya va epidemiologiya xizmatlari"
      },
      {
        "ru": "Услуги ветеринаров",
        "en": "Services of veterinarians",
        "kk": "Ветеринарлардың қызметтері",
        "uz": "Veterinariya xizmatlari"
      },
      {
        "ru": "Услуги выгула животных",
        "en": "Animal walking services",
        "kk": "Жануарлардың жүру қызметтері",
        "uz": "Hayvonlarning yurish xizmatlari"
      },
      {
        "ru": "Услуги домработниц",
        "en": "Services housekeepers",
        "kk": "Қызметтер Үй тұрғындары",
        "uz": "Xizmatlar Xizmatchilar"
      },
      {
        "ru": "Услуги зооняни",
        "en": "Zoonani Services",
        "kk": "Zoonani қызметтері",
        "uz": "Zonani xizmatlari"
      },
      {
        "ru": "Услуги кинологов и дрессировщиков",
        "en": "Services of dog handlers and trainers",
        "kk": "Иттердің өңдеушілері мен жаттықтырушыларының қызметтері",
        "uz": "It ishlov beruvchilari va murabbiylarining xizmatlari"
      },
      {
        "ru": "Услуги мастера на час",
        "en": "Master services for an hour",
        "kk": "Бір сағатқа арналған магистрлік қызметтер",
        "uz": "Bir soatlik magistrlik xizmatlari"
      },
      {
        "ru": "Услуги няни",
        "en": "Nanny services",
        "kk": "NANNY қызметтері",
        "uz": "ENDY xizmatlari"
      },
      {
        "ru": "Услуги повара",
        "en": "GOOD SERVICES",
        "kk": "Жақсы қызметтер",
        "uz": "Yaxshi xizmat"
      },
      {
        "ru": "Услуги садовника",
        "en": "Gardener services",
        "kk": "Бағбан қызметтері",
        "uz": "Bog'bon xizmatlari"
      },
      {
        "ru": "Услуги сиделки",
        "en": "Services Sideki",
        "kk": "Қызметтер саудасы",
        "uz": "SIDIRI XIZMATLARI"
      },
      {
        "ru": "Услуги стрижки животных",
        "en": "Animal haircut services",
        "kk": "Жануарлардың шаш тәсілдері",
        "uz": "Hayvonlarning soch turmagi xizmatlari"
      },
      {
        "ru": "Услуги уборки и клининга",
        "en": "Cleaning and cleaning services",
        "kk": "Тазалау және тазарту қызметтері",
        "uz": "Tozalash va tozalash xizmatlari"
      },
      {
        "ru": "Услуги уборки территории",
        "en": "Territory cleaning services",
        "kk": "Аумақты тазарту қызметтері",
        "uz": "Hududni tozalash xizmatlari"
      },
      {
        "ru": "Услуги химчистки 16",
        "en": "Dry cleaning services 16",
        "kk": "Құрғақ тазалау қызметтері 16",
        "uz": "Quruq tozalash xizmatlari 16"
      }
    ]
  },
  {
    "name": {
      "ru": "Строительство",
      "en": "Construction",
      "kk": "Құрылыс",
      "uz": "Qurilish"
    },
    "subcategories": [
      {
        "ru": "Инженерно-изыскательские работы",
        "en": "Engineering and survey work",
        "kk": "Инженерлік-іздестіру жұмыстары",
        "uz": "Muhandislik va tadqiqot ishlari"
      },
      {
        "ru": "Работы по благоустройству территории",
        "en": "Work on the improvement of the territory",
        "kk": "Аумақты жетілдіру бойынша жұмыс",
        "uz": "Hududni takomillashtirish bo'yicha ishlar"
      },
      {
        "ru": "Работы по возведению стен и перегородок",
        "en": "Work on the construction of walls and partitions",
        "kk": "Қабырғалар мен бөлімдердің құрылысында жұмыс",
        "uz": "Devor va qismlarni qurish ustida ishlang"
      },
      {
        "ru": "Работы по кровле и крыше",
        "en": "Roof and roof work",
        "kk": "Шатыр мен шатырдың жұмысы",
        "uz": "Tom va tom yopish ishlari"
      },
      {
        "ru": "Работы по строительству сооружений и конструкций",
        "en": "Work on the construction of structures and structures",
        "kk": "Құрылымдар мен құрылыстар салу бойынша жұмыс",
        "uz": "Tuzilmalar va inshootlarni qurish bo'yicha ishlar"
      },
      {
        "ru": "Работы с лестницами и перилами",
        "en": "Work with stairs and railing",
        "kk": "Баспалдақтармен және рельстермен жұмыс",
        "uz": "Zinapoyalar va panjara bilan ishlash"
      },
      {
        "ru": "Работы с печами и каминами",
        "en": "Work with stoves and fireplaces",
        "kk": "Пештермен және каминдермен жұмыс",
        "uz": "Pechkalar va kamin bilan ishlash"
      },
      {
        "ru": "Услуги демонтажа сооружений и конструкций",
        "en": "Services of dismantling of structures and structures",
        "kk": "Құрылымдар мен құрылыстарды бөлшектеу қызметтері",
        "uz": "Tuzilmalar va inshootlarni demontaj qilish xizmatlari"
      },
      {
        "ru": "Услуги проектировщиков и архитекторов",
        "en": "Services of designers and architects",
        "kk": "Дизайнерлер мен сәулетшілердің қызметтері",
        "uz": "Dizaynerlar va me'morlarning xizmatlari"
      },
      {
        "ru": "Услуги разнорабочих",
        "en": "Handbaging services",
        "kk": "Қолөнер қызметтері",
        "uz": "Qo'llangichli xizmatlar"
      },
      {
        "ru": "Услуги сварщиков",
        "en": "Services of welders",
        "kk": "Дәнекерлеушілердің қызметтері",
        "uz": "Payvandchilarning xizmatlari"
      },
      {
        "ru": "Услуги сверления и бурения",
        "en": "Drilling and drilling services",
        "kk": "Бұрғылау және бұрғылау қызметтері",
        "uz": "Burg'ulash va burg'ulash xizmati"
      },
      {
        "ru": "Фасадные работы",
        "en": "Facade works",
        "kk": "Қасбет жұмыстары",
        "uz": "Fasad ishlari"
      }
    ]
  },
  {
    "name": {
      "ru": "Ремонт и установка техники",
      "en": "Repair and installation of equipment",
      "kk": "Жабдықтарды жөндеу және орнату",
      "uz": "Uskunalarni ta'mirlash va o'rnatish"
    },
    "subcategories": [
      {
        "ru": "Работы по бытовой технике",
        "en": "Household appliances",
        "kk": "Тұрмыстық техника",
        "uz": "Maishiy texnika"
      },
      {
        "ru": "Работы по вентиляции и кондиционированию",
        "en": "Ventilation and air conditioning",
        "kk": "Желдету және ауа баптау",
        "uz": "Shamollatish va konditsioner"
      },
      {
        "ru": "Работы по компьютерной технике",
        "en": "Work on computer technology",
        "kk": "Компьютерлік технологиялар бойынша жұмыс",
        "uz": "Kompyuter texnologiyalari bo'yicha ishlash"
      },
      {
        "ru": "Работы по слаботочным системам",
        "en": "Work on low -current systems",
        "kk": "Төмен - ағымдық жүйелерде жұмыс",
        "uz": "Kamroq tizimlarda ishlash"
      },
      {
        "ru": "Работы с игровыми приставками",
        "en": "Work with game prefixes",
        "kk": "Ойын префикстерімен жұмыс",
        "uz": "O'yin prefikslari bilan ishlash"
      },
      {
        "ru": "Работы с индивидуальным транспортом",
        "en": "Work with individual transport",
        "kk": "Жеке көлікпен жұмыс",
        "uz": "Shaxsiy transport bilan ishlash"
      },
      {
        "ru": "Работы с музыкальными инструментами",
        "en": "Work with musical instruments",
        "kk": "Музыкалық аспаптармен жұмыс",
        "uz": "Musiqiy asboblar bilan ishlash"
      },
      {
        "ru": "Работы с оптическими приборами",
        "en": "Work with optical devices",
        "kk": "Оптикалық құрылғылармен жұмыс",
        "uz": "Optik asboblar bilan ishlash"
      },
      {
        "ru": "Работы со спортивным инвентарем",
        "en": "Work with sports equipment",
        "kk": "Спорт жабдықтарымен жұмыс",
        "uz": "Sport anjomlari bilan ishlash"
      },
      {
        "ru": "Работы со строительным оборудованием",
        "en": "Work with construction equipment",
        "kk": "Құрылыс техникасымен жұмыс",
        "uz": "Qurilish uskunalari bilan ishlash"
      },
      {
        "ru": "Работы с промышленным оборудованием",
        "en": "Work with industrial equipment",
        "kk": "Өнеркәсіптік жабдықтармен жұмыс",
        "uz": "Sanoat uskunalari bilan ishlash"
      },
      {
        "ru": "Работы с садовой техникой",
        "en": "Work with garden equipment",
        "kk": "Бақша жабдықтарымен жұмыс",
        "uz": "Bog 'uskunalari bilan ishlash"
      },
      {
        "ru": "Работы с торговым оборудованием",
        "en": "Work equipment",
        "kk": "Жұмыс жабдықтары",
        "uz": "Ish uskunalari"
      },
      {
        "ru": "Работы с цифровой техникой ",
        "en": "Work with digital equipment",
        "kk": "Сандық жабдықтармен жұмыс",
        "uz": "Raqamli uskunalar bilan ishlash"
      },
      {
        "ru": "Услуги часовщиков",
        "en": "Watchmakers services",
        "kk": "Сағат ойыншылары қызметтері",
        "uz": "KUTUBXONALAR XIZMATLARI"
      }
    ]
  },
  {
    "name": {
      "ru": "Перевозки, курьеры, грузчики",
      "en": "Transportation, couriers, movers",
      "kk": "Тасымалдау, курьерлер, машиналар",
      "uz": "Tashish, kuryerlar, harakatchilar"
    },
    "subcategories": [
      {
        "ru": "Грузоперевозки",
        "en": "Cargo transportation",
        "kk": "Жүк тасымалы",
        "uz": "Yuk tashish"
      },
      {
        "ru": "Грузчики",
        "en": "Movers",
        "kk": "Іздестіруші",
        "uz": "Fiderlar"
      },
      {
        "ru": "Курьеры",
        "en": "Couriers",
        "kk": "Курьерлер",
        "uz": "Kurerlar"
      },
      {
        "ru": "Пассажирские перевозки",
        "en": "Passenger transportation",
        "kk": "Жолаушылар тасымалы",
        "uz": "Yo'lovchilarni tashish"
      },
      {
        "ru": "Услуги грузоперевозки межгород",
        "en": "Cargo transportation services of intercity",
        "kk": "Қалааралық жүктерді тасымалдау бойынша қызметтер",
        "uz": "Shaharlarning transport transporti xizmatlari"
      },
      {
        "ru": "Услуги доставки с интернет-магазинов",
        "en": "Delivery services from online stores",
        "kk": "Интернет-дүкендерден жеткізу қызметтері",
        "uz": "Onlayn do'konlardan etkazib berish xizmatlari"
      },
      {
        "ru": "Услуги манипулятора",
        "en": "Manipulator services",
        "kk": "Манипулятордың қызметтері",
        "uz": "Manipulyator xizmatlari"
      },
      {
        "ru": "Услуги такси межгород",
        "en": "Services of taxi intercity",
        "kk": "Таксидің қалааралық қызметтері",
        "uz": "Taksi shaharlararo xizmatlari"
      },
      {
        "ru": "Услуги такси по городу",
        "en": "Taxi services in the city",
        "kk": "Қаладағы такси қызметі",
        "uz": "Shahardagi taksi xizmatlari"
      },
      {
        "ru": "Услуги трансфера",
        "en": "Transfer services",
        "kk": "Трансферлік қызметтер",
        "uz": "Transfer xizmatlari"
      },
      {
        "ru": "Эвакуаторы, манипуляторы",
        "en": "Evaciators, manipulators",
        "kk": "Эвация, манипуляторлар",
        "uz": "Evakuoriatorlar, manipulyatorlar"
      }
    ]
  },
  {
    "name": {
      "ru": "Красота и здоровье",
      "en": "Beauty and health",
      "kk": "Сұлулық және денсаулық",
      "uz": "Go'zallik va sog'liq"
    },
    "subcategories": [
      {
        "ru": "Услуги бровиста",
        "en": "Brovist's services",
        "kk": "Бровистердің қызметтері",
        "uz": "Brovchning xizmatlari"
      },
      {
        "ru": "Услуги визажиста",
        "en": "Make -up artist services",
        "kk": "Суретшіге арналған қызметтер",
        "uz": "Ijroli rassom xizmatlari"
      },
      {
        "ru": "Услуги диетологов",
        "en": "Services of nutritionists",
        "kk": "Дыбыстық заттар",
        "uz": "Oziqlantirish xodimlarining xizmatlari"
      },
      {
        "ru": "Услуги косметологов",
        "en": "Cosmetologists' services",
        "kk": "Косметологтардың қызметтері",
        "uz": "Kosmetologlar xizmatlari"
      },
      {
        "ru": "Услуги логопедов",
        "en": "Speech therapy services",
        "kk": "Сөйлеу терапиясы қызметтері",
        "uz": "Nutq davolash xizmatlari"
      },
      {
        "ru": "Услуги массажистов",
        "en": "Massage therapist services",
        "kk": "Массаждың терапевтінің қызметтері",
        "uz": "Massaj terapevtistlar"
      },
      {
        "ru": "Услуги мастера маникюра и педикюра",
        "en": "Services of the master of manicure and pedicure",
        "kk": "Маникюр және педикюр шебері",
        "uz": "Manikyur va pedikyur ustasi xizmatlari"
      },
      {
        "ru": "Услуги медсестер",
        "en": "Services nurses",
        "kk": "Қызметтер Медбикелер",
        "uz": "Xizmatlar hamshiralari"
      },
      {
        "ru": "Услуги парикмахера",
        "en": "Hairdresser services",
        "kk": "Шаштараз қызметтері",
        "uz": "Sartarosh xizmatlari"
      },
      {
        "ru": "Услуги пирсинга",
        "en": "Piercing services",
        "kk": "Пирсингтік қызметтер",
        "uz": "Pirsing xizmatlari"
      },
      {
        "ru": "Услуги психотерапевтов",
        "en": "Psychotherapists services",
        "kk": "Психотерапшылардың қызметтері",
        "uz": "Psixoterapevtlar Xizmatlar"
      },
      {
        "ru": "Услуги ресничного стилиста",
        "en": "Services of the ciliary stylist",
        "kk": "Сілтеме стилистерінің қызметтері",
        "uz": "Kivank stilining xizmatlari"
      },
      {
        "ru": "Услуги солярия и загара",
        "en": "Service Services and Zagara",
        "kk": "Қызмет көрсету қызметтері және Загара",
        "uz": "Xizmat xizmatlari va Zagara"
      },
      {
        "ru": "Услуги СПА-процедур",
        "en": "Services of spa procedures",
        "kk": "СПА процедуралары қызметтері",
        "uz": "SPA protseduralari xizmatlari"
      },
      {
        "ru": "Услуги стилиста-имиджмейкера",
        "en": "Service Stylist-Imijmeker",
        "kk": "Қызмет көрсету стилист-imijmeker",
        "uz": "STILST-IMIJMEKER xizmati"
      },
      {
        "ru": "Услуги татуажа",
        "en": "Tattoo services",
        "kk": "Татуировкалар",
        "uz": "Tatuirovka xizmatlari"
      },
      {
        "ru": "Услуги тату-мастера",
        "en": "Tattoo-master services",
        "kk": "Татуировканың мастер-бағдарламалары",
        "uz": "TATTOOGE-MASTER XIZMATLARI"
      },
      {
        "ru": "Услуги традиционной медицины",
        "en": "Traditional medicine services",
        "kk": "Дәстүрлі медицина қызметі",
        "uz": "An'anaviy tibbiyot xizmatlari"
      },
      {
        "ru": "Услуги эпиляции",
        "en": "Epilation services",
        "kk": "Эпиляция қызметтері",
        "uz": "Epilyatsiya xizmatlari"
      }
    ]
  },
  {
    "name": {
      "ru": "IT и фриланс",
      "en": "It and freelance",
      "kk": "Ол және еркіндік",
      "uz": "Bu va mustaqil"
    },
    "subcategories": [
      {
        "ru": "Работы по компьютерной технике",
        "en": "Work on computer technology",
        "kk": "Компьютерлік технологиялар бойынша жұмыс",
        "uz": "Kompyuter texnologiyalari bo'yicha ishlash"
      },
      {
        "ru": "Работы с текстами",
        "en": "Work with texts",
        "kk": "Мәтіндермен жұмыс",
        "uz": "Matnlar bilan ishlash"
      },
      {
        "ru": "Услуги SEO менеджеров",
        "en": "SEO SEO managers",
        "kk": "SEO SEO менеджерлері",
        "uz": "SEO SEO menejerlari"
      },
      {
        "ru": "Услуги аудиозаписи",
        "en": "Audio recording services",
        "kk": "Аудио жазу қызметтері",
        "uz": "Audio yozuvlar xizmatlari"
      },
      {
        "ru": "Услуги аудиомонтажа",
        "en": "Audiomontage services",
        "kk": "Аудтиомонтаждық қызметтер",
        "uz": "Audiomontaj xizmatlari"
      },
      {
        "ru": "Услуги видеомонтажа",
        "en": "Video editing services",
        "kk": "Бейне редакциялау қызметтері",
        "uz": "Video tahrirlash xizmatlari"
      },
      {
        "ru": "Услуги дизайнеров",
        "en": "Designer services",
        "kk": "Дизайнерлік қызметтер",
        "uz": "Dizayner xizmatlari"
      },
      {
        "ru": "Услуги контент-менеджера",
        "en": "Content manager services",
        "kk": "Мазмұн реттеушісі қызметтері",
        "uz": "Kontent menejer xizmatlari"
      },
      {
        "ru": "Услуги маркетологов",
        "en": "Services of marketers",
        "kk": "Маркетологтардың қызметтері",
        "uz": "Marketerlarning xizmatlari"
      },
      {
        "ru": "Услуги мобилографов",
        "en": "Mobilographer Services",
        "kk": "Мобилограф қызметі",
        "uz": "Mobilograf xizmatlari"
      },
      {
        "ru": "Услуги настройки рекламы",
        "en": "Advertising settings services",
        "kk": "Жарнамалық параметрлер қызметтері",
        "uz": "Reklama sozlamalari xizmatlari"
      },
      {
        "ru": "Услуги озвучки и дикторства",
        "en": "Voice acting services and announcements",
        "kk": "Дауыстық актерлік қызметтер және хабарландырулар",
        "uz": "Ovozli xizmat va e'lonlar"
      },
      {
        "ru": "Услуги переводчиков",
        "en": "Translator services",
        "kk": "Аудармашы бойынша қызметтер",
        "uz": "Tarjimon xizmatlari"
      },
      {
        "ru": "Услуги программистов и разработчиков",
        "en": "Services of programmers and developers",
        "kk": "Бағдарламалаушылар мен әзірлеушілердің қызметтері",
        "uz": "Dasturchilar va ishlab chiquvchilar xizmatlari"
      },
      {
        "ru": "Услуги промоутеров",
        "en": "Promoother Services",
        "kk": "БАСҚА ҚЫЗМЕТТЕР",
        "uz": "Boshqa xizmatlar"
      },
      {
        "ru": "Услуги системных администраторов",
        "en": "Services of system administrators",
        "kk": "Жүйелік әкімшілердің қызметтері",
        "uz": "Tizim ma'murlarining xizmatlari"
      },
      {
        "ru": "Услуги тайного покупателя",
        "en": "Secret Buyer services",
        "kk": "Құпия сатып алушыларға қызмет көрсету",
        "uz": "Yashirin xaridor xizmatlari"
      },
      {
        "ru": "Услуги фотографов",
        "en": "Services of photographers",
        "kk": "Фотографтардың қызметтері",
        "uz": "Fotosuratchilar xizmatlari"
      },
      {
        "ru": "Услуги фотомонтажа",
        "en": "Services photo montage",
        "kk": "Қызметтер Фото Монтаж",
        "uz": "Xizmatlar Fotosuratlar montaj"
      },
      {
        "ru": "Услуги художников ",
        "en": "Services of artists",
        "kk": "Суретшілердің қызметтері",
        "uz": "Rassomlarning xizmatlari"
      }
    ]
  },
  {
    "name": {
      "ru": "Изготовление и ремесло",
      "en": "Production and craft",
      "kk": "Өндіріс және қолөнер",
      "uz": "Ishlab chiqarish va hunarmandchilik"
    },
    "subcategories": [
      {
        "ru": "Работы по дереву",
        "en": "Work work",
        "kk": "Жұмыс жұмысы",
        "uz": "Ish faoliyati"
      },
      {
        "ru": "Работы с зеркалами",
        "en": "Work with mirrors",
        "kk": "Айналармен жұмыс",
        "uz": "Nometall bilan ishlash"
      },
      {
        "ru": "Работы со стеклами",
        "en": "Work with glass",
        "kk": "Шынымен жұмыс",
        "uz": "Stakan bilan ishlash"
      },
      {
        "ru": "Ремонт обуви",
        "en": "Shoe repair",
        "kk": "Аяқ киім жөндеу",
        "uz": "Poyafzal ta'mirlash"
      },
      {
        "ru": "Услуги 3D печати",
        "en": "Services 3D stamps",
        "kk": "Қызметтер 3D маркалары",
        "uz": "Xizmatlar 3D Pochta markalari"
      },
      {
        "ru": "Услуги аэрографии",
        "en": "Airbrushing services",
        "kk": "Airbrushing қызметтері",
        "uz": "Airbroning xizmatlari"
      },
      {
        "ru": "Услуги изготовления ключей",
        "en": "Keys manufacturing services",
        "kk": "Кілттерді өндіру бойынша қызметтер",
        "uz": "Ishlab chiqarish xizmatlari"
      },
      {
        "ru": "Услуги изготовления мебели",
        "en": "Furniture manufacturing services",
        "kk": "Жиһаз өндірісі бойынша қызметтер",
        "uz": "Mebel ishlab chiqarish Xizmatlari"
      },
      {
        "ru": "Услуги изготовления рекламы",
        "en": "Advertising manufacturing services",
        "kk": "Жарнамалық өндірістік қызметтер",
        "uz": "Reklama ishlab chiqarish Xizmatlari"
      },
      {
        "ru": "Услуги кузнецов",
        "en": "Kuznetsov services",
        "kk": "Кузнецов қызметтері",
        "uz": "Kuznetsov xizmatlari"
      },
      {
        "ru": "Услуги лазерной резки и гравировки",
        "en": "Laser cutting and engraving services",
        "kk": "Лазерлік кесу және гравюра қызметтері",
        "uz": "Lazer kesish va o'yma xizmatlari"
      },
      {
        "ru": "Услуги полиграфии",
        "en": "Polygraphy services",
        "kk": "Полиграфиялық қызметтер",
        "uz": "Poligrafiya xizmatlari"
      },
      {
        "ru": "Услуги портных и швей",
        "en": "Track and seamstress services",
        "kk": "Жол және тігінші қызметтер",
        "uz": "Trek va tikres xizmatlari"
      },
      {
        "ru": "Услуги росписи стен",
        "en": "Wall painting services",
        "kk": "Қабырғалық кескіндеме бойынша қызметтер",
        "uz": "Devor bo'yash xizmatlari"
      },
      {
        "ru": "Услуги рукоделия и хендмейда",
        "en": "Needlework and handmade services",
        "kk": "Қолөнер және қолдан жасалған қызметтер",
        "uz": "Ignativ va qo'lda ishlangan xizmatlar"
      },
      {
        "ru": "Услуги сварщиков",
        "en": "Services of welders",
        "kk": "Дәнекерлеушілердің қызметтері",
        "uz": "Payvandchilarning xizmatlari"
      },
      {
        "ru": "Услуги скульптура",
        "en": "Services Sculpture",
        "kk": "Қызметтер Мүсін",
        "uz": "Xizmatlar haykaltarmasi"
      },
      {
        "ru": "Услуги токарей",
        "en": "TOKARI services",
        "kk": "Токари қызметтері",
        "uz": "Tobari xizmatlari"
      },
      {
        "ru": "Услуги фрезеровщиков",
        "en": "Services of milling workers",
        "kk": "Ұстарын жұмысшыларының қызметтері",
        "uz": "Yilingchi ishchilarning xizmatlari"
      },
      {
        "ru": "Услуги художников",
        "en": "Services of artists",
        "kk": "Суретшілердің қызметтері",
        "uz": "Rassomlarning xizmatlari"
      },
      {
        "ru": "Услуги ювелиров",
        "en": "Jewelry services",
        "kk": "Зергерлік қызметтер",
        "uz": "Zargarlik buyumlari"
      }
    ]
  },
  {
    "name": {
      "ru": "Услуги спецтехники",
      "en": "Services of special equipment",
      "kk": "Арнайы жабдықтардың қызметтері",
      "uz": "Maxsus uskunalar xizmatlari"
    },
    "subcategories": [
      {
        "ru": "Грузоперевозки",
        "en": "Cargo transportation",
        "kk": "Жүк тасымалы",
        "uz": "Yuk tashish"
      },
      {
        "ru": "Услуги автовоза",
        "en": "Auto -car services",
        "kk": "Auto -car қызметтері",
        "uz": "Auto -Car xizmatlari"
      },
      {
        "ru": "Услуги автовышки",
        "en": "Automobile services services",
        "kk": "Автомобиль қызметтерінің қызметтері",
        "uz": "Avtomobillarga xizmat ko'rsatish Xizmatlari"
      },
      {
        "ru": "Услуги автокрана",
        "en": "Services autocrana",
        "kk": "Қызметтер Автокрана",
        "uz": "Xizmatlar Autanna"
      },
      {
        "ru": "Услуги ассенизатора",
        "en": "The services of the Assuminator",
        "kk": "Ассамуматордың қызметтері",
        "uz": "Assuminorning xizmatlari"
      },
      {
        "ru": "Услуги бетономешалки",
        "en": "Concreting services",
        "kk": "Бетон қызметтері",
        "uz": "Sariq xizmatlar"
      },
      {
        "ru": "Услуги бетононасоса",
        "en": "Concrete pump services",
        "kk": "Бетон сорғысының қызметтері",
        "uz": "Beton nasos xizmatlari"
      },
      {
        "ru": "Услуги бульдозера",
        "en": "Buldozer services",
        "kk": "Бульдозер қызметтері",
        "uz": "Buldozer xizmatlari"
      },
      {
        "ru": "Услуги грузоперевозки межгород",
        "en": "Cargo transportation services of intercity",
        "kk": "Қалааралық жүктерді тасымалдау бойынша қызметтер",
        "uz": "Shaharlarning transport transporti xizmatlari"
      },
      {
        "ru": "Услуги дорожного катка",
        "en": "Road skating rink services",
        "kk": "Rox Rink қызметтері",
        "uz": "Yo'l konkida uchib ketayotgan RINK xizmatlari"
      },
      {
        "ru": "Услуги камаза",
        "en": "KAMAZ services",
        "kk": "KAMAZ қызметтері",
        "uz": "KAMAZ xizmatlari"
      },
      {
        "ru": "Услуги культиватора",
        "en": "Cultivator service",
        "kk": "Қаптама қызметі",
        "uz": "Maciorator xizmati"
      },
      {
        "ru": "Услуги манипулятора",
        "en": "Manipulator services",
        "kk": "Манипулятордың қызметтері",
        "uz": "Manipulyator xizmatlari"
      },
      {
        "ru": "Услуги погрузчика",
        "en": "Loader services",
        "kk": "Жүк тиегіш",
        "uz": "Yuk ko'taruvchi xizmatlari"
      },
      {
        "ru": "Услуги трактора",
        "en": "Tractor Services",
        "kk": "Трактор қызметтері",
        "uz": "Traktor xizmatlari"
      },
      {
        "ru": "Услуги экскаватора",
        "en": "Excavator services",
        "kk": "Экскаватордың қызметтері",
        "uz": "Ekskavator xizmatlari"
      },
      {
        "ru": "Эвакуаторы, манипуляторы",
        "en": "Evaciators, manipulators",
        "kk": "Эвация, манипуляторлар",
        "uz": "Evakuoriatorlar, manipulyatorlar"
      }
    ]
  },
  {
    "name": {
      "ru": "СТО и автоуслуги",
      "en": "STO and auto services",
      "kk": "СТО және автокөлік қызметтері",
      "uz": "STO va AVTOMAT XIZMATLARI"
    },
    "subcategories": [
      {
        "ru": "Аренда компрессора",
        "en": "Compressor rental",
        "kk": "Компрессорлық жалдау",
        "uz": "Kompressor ijarasi"
      },
      {
        "ru": "Кузовные работы",
        "en": "Body work",
        "kk": "Дене жұмысы",
        "uz": "Tana ishlari"
      },
      {
        "ru": "Работы с индивидуальным транспортом",
        "en": "Work with individual transport",
        "kk": "Жеке көлікпен жұмыс",
        "uz": "Shaxsiy transport bilan ishlash"
      },
      {
        "ru": "Ремонт водного транспорта",
        "en": "Repair of water transport",
        "kk": "Су көлігін жөндеу",
        "uz": "Suv transportini ta'mirlash"
      },
      {
        "ru": "Ремонт двигателя и навесного оборудования",
        "en": "Engine repair and attachment equipment",
        "kk": "Қозғалтқышты жөндеу және бекіту жабдықтары",
        "uz": "Dvigatelni ta'mirlash va biriktirmalar uskunalari"
      },
      {
        "ru": "Ремонт и замена автостекол",
        "en": "Repair and replacement of autosteks",
        "kk": "Автоөнеркәсіптік кешенді жөндеу және ауыстыру",
        "uz": "Autostekni ta'mirlash va almashtirish"
      },
      {
        "ru": "Ремонт КПП",
        "en": "REPAIR of the checkpoint",
        "kk": "Өткізу пунктін жөндеу",
        "uz": "Cheklov punktiga ta'mirlash"
      },
      {
        "ru": "Ремонт мототранспорта",
        "en": "Motor transport repair",
        "kk": "Автомобиль көлігін жөндеу",
        "uz": "Avtotransportni ta'mirlash"
      },
      {
        "ru": "Ремонт печек и кондиционеров",
        "en": "Repair of stoves and air conditioners",
        "kk": "Пештер мен кондиционерлерді жөндеу",
        "uz": "Shoshilmalar va konditsionerlarni ta'mirlash"
      },
      {
        "ru": "Ремонт радиаторов",
        "en": "Repair of radiators",
        "kk": "Радиаторларды жөндеу",
        "uz": "Radiatorlar ta'miri"
      },
      {
        "ru": "Ремонт спецтехники",
        "en": "Repair of special equipment",
        "kk": "Арнайы жабдықты жөндеу",
        "uz": "Maxsus uskunalarni ta'mirlash"
      },
      {
        "ru": "Ремонт турбин и компрессоров",
        "en": "Repair of turbines and compressors",
        "kk": "Турбиналар мен компрессорларды жөндеу",
        "uz": "Turbinalar va kompressorlarni ta'mirlash"
      },
      {
        "ru": "Ремонт ходовой и подвески",
        "en": "REPAIR OF CHARD and Suspension",
        "kk": "Сырты жөндеу және суспензия",
        "uz": "Chard va to'xtatib turishni ta'mirlash"
      },
      {
        "ru": "Услуги автоэлектрика",
        "en": "Auto -electrician services",
        "kk": "Автомобиль-электрлік қызметтер",
        "uz": "Avtomatik -elektrik xizmatlari"
      },
      {
        "ru": "Услуги выездной помощи для авто",
        "en": "Output services for cars",
        "kk": "Автокөліктерге шығу қызметі",
        "uz": "Avtomobillar uchun chiqish xizmatlari"
      },
      {
        "ru": "Услуги детейлинга",
        "en": "SERVICES DEATING",
        "kk": "Қызметтерді толтыру",
        "uz": "Xizmatlar"
      },
      {
        "ru": "Услуги замены масел и жидкостей",
        "en": "Oil and liquid replacement services",
        "kk": "Мұнай және сұйықтықты ауыстыру бойынша қызметтер",
        "uz": "Neft va suyuq almashtirish xizmatlari"
      },
      {
        "ru": "Услуги компьютерной диагностики",
        "en": "Computer diagnostic services",
        "kk": "Компьютерлік диагностикалық қызметтер",
        "uz": "Kompyuter diagnostik xizmatlari"
      },
      {
        "ru": "Услуги манипулятора",
        "en": "Manipulator services",
        "kk": "Манипулятордың қызметтері",
        "uz": "Manipulyator xizmatlari"
      },
      {
        "ru": "Услуги сход-развала",
        "en": "Services Similar-Open",
        "kk": "Ұқсас қызметтер ашық",
        "uz": "O'xshash xizmatlarga o'xshash xizmatlar"
      },
      {
        "ru": "Услуги тюнинга",
        "en": "Tuning services",
        "kk": "Реттеу қызметтері",
        "uz": "Tyuning xizmatlari"
      },
      {
        "ru": "Услуги шиномонтажа",
        "en": "Tire fitting services",
        "kk": "Шиналармен жабдықтау қызметтері",
        "uz": "Shinalar mos keladigan xizmatlar"
      },
      {
        "ru": "Эвакуаторы, манипуляторы",
        "en": "Evaciators, manipulators",
        "kk": "Эвация, манипуляторлар",
        "uz": "Evakuoriatorlar, manipulyatorlar"
      }
    ]
  },
  {
    "name": {
      "ru": "Праздники и мероприятия",
      "en": "Holidays and events",
      "kk": "Мерекелер мен оқиғалар",
      "uz": "Bayramlar va tadbirlar"
    },
    "subcategories": [
      {
        "ru": "Услуги актеров",
        "en": "Услуги актеров",
        "kk": "Актерлер қызметі",
        "uz": "Aktyorlar xizmatlari"
      },
      {
        "ru": "Услуги барменов",
        "en": "Barmen services",
        "kk": "Бармен қызметтері",
        "uz": "Barmen xizmatlari"
      },
      {
        "ru": "Услуги видеографа",
        "en": "Video Services",
        "kk": "Бейне қызметтер",
        "uz": "Video xizmatlari"
      },
      {
        "ru": "Услуги кейтеринга",
        "en": "Catering services",
        "kk": "Тамақтану қызметтері",
        "uz": "Kelishuv xizmatlari"
      },
      {
        "ru": "Услуги кондитеров и пекарей",
        "en": "Condeems and bakery services",
        "kk": "Индекс және нан өнімдері қызметтері",
        "uz": "Budlik va non savdolari"
      },
      {
        "ru": "Услуги мероприятий под ключ",
        "en": "Turnkey events",
        "kk": "Оқиғалар",
        "uz": "Tutilish tadbirlari"
      },
      {
        "ru": "Услуги модели",
        "en": "Model services",
        "kk": "Модельдік қызметтер",
        "uz": "Model xizmatlari"
      },
      {
        "ru": "Услуги музыкантов и певцов",
        "en": "Services of musicians and singers",
        "kk": "Музыканттар мен әншілердің қызметтері",
        "uz": "Musiqachilar va qo'shiqchilarning xizmatlari"
      },
      {
        "ru": "Услуги официантов",
        "en": "Services of waiters",
        "kk": "Даяшылардың қызметтері",
        "uz": "Ofitsiantlar"
      },
      {
        "ru": "Услуги оформления мероприятий",
        "en": "Services for the issuance of measures",
        "kk": "Шаралар беру бойынша қызметтер",
        "uz": "Amaliyotni chiqarish uchun xizmatlar"
      },
      {
        "ru": "Услуги полиграфии",
        "en": "Polygraphy services",
        "kk": "Полиграфиялық қызметтер",
        "uz": "Poligrafiya xizmatlari"
      },
      {
        "ru": "Услуги тамады и ведущего",
        "en": "TAMADA and host services",
        "kk": "Тамада және хост қызметтері",
        "uz": "Tamda va Xizmatlar"
      },
      {
        "ru": "Услуги танцоров",
        "en": "Services of dancers",
        "kk": "Бишілердің қызметтері",
        "uz": "Rasmlar xizmatlari"
      },
      {
        "ru": "Услуги флориста",
        "en": "Florista services",
        "kk": "Флориста қызметтері",
        "uz": "Florista xizmatlari"
      },
      {
        "ru": "Услуги фотографов",
        "en": "Services of photographers",
        "kk": "Фотографтардың қызметтері",
        "uz": "Fotosuratchilar xizmatlari"
      },
      {
        "ru": "Услуги художников",
        "en": "Services of artists",
        "kk": "Суретшілердің қызметтері",
        "uz": "Rassomlarning xizmatlari"
      },
      {
        "ru": "Услуги шоу-программ",
        "en": "Services of show programs",
        "kk": "Шоу-бағдарламалар бойынша қызметтер",
        "uz": "Shou dasturlarining xizmatlari"
      }
    ]
  },
  {
    "name": {
      "ru": "Деловые услуги",
      "en": "Business services",
      "kk": "Іскери қызметтер",
      "uz": "Biznes xizmatlari"
    },
    "subcategories": [
      {
        "ru": "Аналитик",
        "en": "Analyst",
        "kk": "Талдаушы",
        "uz": "Tahlilchi"
      },
      {
        "ru": "Услуги HR",
        "en": "HR services",
        "kk": "HR қызметтері",
        "uz": "HR xizmatlari"
      },
      {
        "ru": "Услуги бизнес-консультантов",
        "en": "Services of business consultants",
        "kk": "Бизнес-кеңесшілердің қызметтері",
        "uz": "Biznes maslahatchilarining xizmatlari"
      },
      {
        "ru": "Услуги бизнес-тренеров",
        "en": "Services of business trainers",
        "kk": "Іскерлік жаттықтырушылардың қызметтері",
        "uz": "Biznes trenerlarining xizmatlari"
      },
      {
        "ru": "Услуги брокеров",
        "en": "Broker services",
        "kk": "Брокерлік қызметтер",
        "uz": "Brokerlik xizmatlari"
      },
      {
        "ru": "Услуги бухгалтеров",
        "en": "Accountant services",
        "kk": "Бухгалтерлік қызметтер",
        "uz": "Buxgalter xizmatlari"
      },
      {
        "ru": "Услуги логистов",
        "en": "Logist services",
        "kk": "Логистер қызметтері",
        "uz": "Logist xizmatlari"
      },
      {
        "ru": "Услуги оценщиков",
        "en": "Services of appraisers",
        "kk": "Бағалаушылар қызметтері",
        "uz": "Baholovchilar xizmatlari"
      },
      {
        "ru": "Услуги полиграфии",
        "en": "Polygraphy services",
        "kk": "Полиграфиялық қызметтер",
        "uz": "Poligrafiya xizmatlari"
      },
      {
        "ru": "Услуги промоутеров",
        "en": "Promoother Services",
        "kk": "БАСҚА ҚЫЗМЕТТЕР",
        "uz": "Boshqa xizmatlar"
      },
      {
        "ru": "Услуги риелторов",
        "en": "Realtors' services",
        "kk": "Риэлторлардың қызметтері",
        "uz": "Rieltors's Xizmatlari"
      },
      {
        "ru": "Услуги страховщиков",
        "en": "Services of insurers",
        "kk": "Сақтандырушылар қызметтері",
        "uz": "Sug'urtalovchilarning xizmatlari"
      },
      {
        "ru": "Услуги судоисполнителя",
        "en": "SUSTOXPLIER SERVICES",
        "kk": "SustoxPlier қызметтері",
        "uz": "Tellokspler xizmatlari"
      },
      {
        "ru": "Услуги тайного покупателя",
        "en": "Secret Buyer services",
        "kk": "Құпия сатып алушыларға қызмет көрсету",
        "uz": "Yashirin xaridor xizmatlari"
      },
      {
        "ru": "Услуги юристов",
        "en": "Lawyers' services",
        "kk": "Адвокаттардың қызметтері",
        "uz": "Advokatlar Xizmatlari"
      }
    ]
  },
  {
    "name": {
      "ru": "Прочие услуги",
      "en": "Other services",
      "kk": "Басқа қызметтер",
      "uz": "Boshqa xizmatlar"
    },
    "subcategories": [
      {
        "ru": "Ритуальные услуги",
        "en": "Ritual services",
        "kk": "Салалық қызметтер",
        "uz": "Marosimlar"
      },
      {
        "ru": "Туристические услуги",
        "en": "Travel services",
        "kk": "Саяхат бойынша қызметтер",
        "uz": "Sayohat xizmatlari"
      },
      {
        "ru": "Услуги гадалки",
        "en": "Fortune -tank services",
        "kk": "Fortune-Stank қызметтері",
        "uz": "Fortune-Tank xizmatlari"
      },
      {
        "ru": "Услуги детективов",
        "en": "Detective services",
        "kk": "Детективтік қызметтер",
        "uz": "Detektiv xizmatlar"
      },
      {
        "ru": "Услуги доулы",
        "en": "Dowl services",
        "kk": "Dowl қызметтері",
        "uz": "Do'kon xizmatlari"
      },
      {
        "ru": "Услуги ломбарда",
        "en": "Lombard services",
        "kk": "Ломбард қызметтері",
        "uz": "Lombard xizmatlari"
      },
      {
        "ru": "Услуги нумеролога",
        "en": "Numerologist services",
        "kk": "Нумерологтар",
        "uz": "Numerolog xizmatlari"
      },
      {
        "ru": "Услуги оценщиков",
        "en": "Services of appraisers",
        "kk": "Бағалаушылар қызметтері",
        "uz": "Baholovchilar xizmatlari"
      },
      {
        "ru": "Услуги полиграфии",
        "en": "Polygraphy services",
        "kk": "Полиграфиялық қызметтер",
        "uz": "Poligrafiya xizmatlari"
      },
      {
        "ru": "Услуги приема металла",
        "en": "Metal reception services",
        "kk": "Металл қабылдау қызметтері",
        "uz": "Metall qabul qilish xizmatlari"
      },
      {
        "ru": "Услуги промоутеров",
        "en": "Promoother Services",
        "kk": "БАСҚА ҚЫЗМЕТТЕР",
        "uz": "Boshqa xizmatlar"
      },
      {
        "ru": "Услуги риэлторов",
        "en": "Realtors' services",
        "kk": "Риэлторлардың қызметтері",
        "uz": "Rieltors's Xizmatlari"
      },
      {
        "ru": "Услуги собеседника на час",
        "en": "Interlocutor services for an hour",
        "kk": "Әңгімелесуші қызметтер Бір сағатқа",
        "uz": "Suhbatdoshlar bir soat davomida"
      },
      {
        "ru": "Услуги страховщиков",
        "en": "Services of insurers",
        "kk": "Сақтандырушылар қызметтері",
        "uz": "Sug'urtalovchilarning xizmatlari"
      },
      {
        "ru": "Услуги телохранителя",
        "en": "Bodyguard services",
        "kk": "BodyGuard Services",
        "uz": "Tanadan qo'riqchilar"
      }
    ]
  },
  {
    "name": {
      "ru": "Репетиторы, курсы, обучение",
      "en": "Tutors, courses, training",
      "kk": "Тьюторлар, курстар, оқыту",
      "uz": "Repetitorlar, kurslar, o'qitish"
    },
    "subcategories": [
      {
        "ru": "Курсы актерского мастерства",
        "en": "Acting courses",
        "kk": "Актерлік курстар",
        "uz": "Aktyorlik kurslari"
      },
      {
        "ru": "Курсы видеомонтажа",
        "en": "Video editing courses",
        "kk": "Бейне редакциялау курстары",
        "uz": "Video tahrirlash kurslari"
      },
      {
        "ru": "Курсы вязания",
        "en": "Knitting courses",
        "kk": "Тоқыма курстары",
        "uz": "Trikotaj kurslari"
      },
      {
        "ru": "Курсы дизайна",
        "en": "Design courses",
        "kk": "Дизайн курстары",
        "uz": "Dizayn kurslari"
      },
      {
        "ru": "Курсы для бухгалтеров",
        "en": "Courses for accountants",
        "kk": "Бухгалтерлерге арналған курстар",
        "uz": "Buxgalterlar uchun kurslar"
      },
      {
        "ru": "Курсы живописи",
        "en": "Painting courses",
        "kk": "Кескіндеме курстары",
        "uz": "Rassomlik kurslari"
      },
      {
        "ru": "Курсы каллиграфии",
        "en": "Calligraphy courses",
        "kk": "Каллиграфиялық курстар",
        "uz": "Xattotlik kurslari"
      },
      {
        "ru": "Курсы кулинарии",
        "en": "Culinary courses",
        "kk": "Аспаздық курстар",
        "uz": "Oshxona kurslari"
      },
      {
        "ru": "Курсы ораторского искусства",
        "en": "Oratory courses",
        "kk": "Шешендік курстар",
        "uz": "ERSINI KURSLAR"
      },
      {
        "ru": "Курсы по менеджменту",
        "en": "Management courses",
        "kk": "Менеджмент курстары",
        "uz": "Boshqaruv kurslari"
      },
      {
        "ru": "Курсы по программированию",
        "en": "Programming courses",
        "kk": "Бағдарламалау курстары",
        "uz": "Dasturlash kurslari"
      },
      {
        "ru": "Курсы по финансовому планированию",
        "en": "Financial planning courses",
        "kk": "Қаржылық жоспарлау курстары",
        "uz": "Moliyaviy rejalashtirish kurslari"
      },
      {
        "ru": "Курсы психологии",
        "en": "Psychology courses",
        "kk": "Психология курстары",
        "uz": "Psixologiya kurslari"
      },
      {
        "ru": "Курсы робототехники",
        "en": "Robotics courses",
        "kk": "Робототехника курстары",
        "uz": "Robototexnika kurslari"
      },
      {
        "ru": "Курсы рукоделия",
        "en": "Needlework courses",
        "kk": "Қолөнер курстары",
        "uz": "Ignaligi kurslari"
      },
      {
        "ru": "Курсы скорочтения",
        "en": "Speed ​​reading courses",
        "kk": "Жылдам оқу курстары",
        "uz": "Tez o'qish kurslari"
      },
      {
        "ru": "Курсы скульптора",
        "en": "Sculptor courses",
        "kk": "Мүсінші курстары",
        "uz": "Haykaltarosh kurslar"
      },
      {
        "ru": "Курсы тайм-менеджмента",
        "en": "Time management courses",
        "kk": "Уақытты басқару курстары",
        "uz": "Vaqtni boshqarish kurslari"
      },
      {
        "ru": "Курсы флористики",
        "en": "Floristic courses",
        "kk": "Флористикалық курстар",
        "uz": "Floristik kurslar"
      },
      {
        "ru": "Курсы фотографов",
        "en": "Photographers courses",
        "kk": "Фотографтар курстары",
        "uz": "Fotosuratchilar kurslari"
      },
      {
        "ru": "Обучение вокалу",
        "en": "Vocal training",
        "kk": "Вокалды оқыту",
        "uz": "Vokal tayyorlash"
      },
      {
        "ru": "Обучение игре на домбре",
        "en": "Dombra game training",
        "kk": "Домбыра ойыны",
        "uz": "Domabra o'yinlarini o'qitish"
      },
      {
        "ru": "Обучение игре на кобызе",
        "en": "Training in the game on Kobyz",
        "kk": "Қобыздың ойынында жаттығу",
        "uz": "Kobyzdagi o'yinda mashg'ulotlar"
      },
      {
        "ru": "Обучение игре на синтезаторе",
        "en": "Training in the game on the synthesizer",
        "kk": "Синтезатордағы ойынға үйрету",
        "uz": "Sintezatordagi o'yinda mashg'ulotlar"
      },
      {
        "ru": "Обучение игре на флейте",
        "en": "Learning to play on flute",
        "kk": "Флейтада ойнауды үйрену",
        "uz": "Nayda o'ynashni o'rganish"
      },
      {
        "ru": "Обучение игре на фортепиано",
        "en": "Piano playing",
        "kk": "Фортепиано ойнау",
        "uz": "Pianino o'ynaydi"
      },
      {
        "ru": "Репетитор аналитической геометрии",
        "en": "Tutor of analytical geometry",
        "kk": "Аналитикалық геометрия тәрбиешісі",
        "uz": "Analitik geometriya o'qituvchisi"
      },
      {
        "ru": "Репетитор анатомии",
        "en": "Anatomy tutor",
        "kk": "Анатомиялық тәрбиеші",
        "uz": "Anatomiya o'qituvchisi"
      },
      {
        "ru": "Репетитор английского языка",
        "en": "English tutor",
        "kk": "Ағылшын тәрбиешісі",
        "uz": "Ingliz tili o'qituvchisi"
      },
      {
        "ru": "Репетитор арабского языка",
        "en": "Arabic tutor",
        "kk": "Араб тәрбиешісі",
        "uz": "Arab tili o'qituvchisi"
      },
      {
        "ru": "Репетитор биологии",
        "en": "Biology tutor",
        "kk": "Биология тәрбиешісі",
        "uz": "Biologiya o'qituvchisi"
      },
      {
        "ru": "Репетитор биохимии",
        "en": "Biochemistry tutor",
        "kk": "Биохимия тәрбиесі",
        "uz": "Biokemiya o'qituvchisi"
      },
      {
        "ru": "Репетитор бухгалтерского учета",
        "en": "Accounting tutor",
        "kk": "Бухгалтерлік есеп тәрбиешісі",
        "uz": "Buxgalteriya repetitori"
      },
      {
        "ru": "Репетитор высшей математики",
        "en": "The tutor of the highest mathematics",
        "kk": "Жоғары математиканың тәрбиешісі",
        "uz": "Oliy matematika o'qituvchisi"
      },
      {
        "ru": "Репетитор генетики",
        "en": "Genetics tutor",
        "kk": "Генетика тәрбиешісі",
        "uz": "Genetika o'qituvchisi"
      },
      {
        "ru": "Репетитор географии",
        "en": "Geography tutor",
        "kk": "География тәрбиешісі",
        "uz": "Geografiya o'qituvchisi"
      },
      {
        "ru": "Репетитор грузинского языка",
        "en": "Georgian tutor",
        "kk": "Грузин тәрбиешісі",
        "uz": "Gruziya o'qituvchisi"
      },
      {
        "ru": "Репетитор дошкольного образования",
        "en": "Preschool education tutor",
        "kk": "Мектепке дейінгі тәрбиеші",
        "uz": "Maktabgacha ta'lim tijoratchisi"
      },
      {
        "ru": "Репетитор изобразительного искусства",
        "en": "The tutor of fine art",
        "kk": "Бейнелеу өнерінің тәрбиешісі",
        "uz": "Tasviriy san'at o'qituvchisi"
      },
      {
        "ru": "Репетитор информатики",
        "en": "Computer science tutor",
        "kk": "Информатика тәрбиешісі",
        "uz": "Informatika o'qituvchisi"
      },
      {
        "ru": "Репетитор испанского языка",
        "en": "Spanish tutor",
        "kk": "Испан тәрбиешісі",
        "uz": "Ispaniya o'qituvchisi"
      },
      {
        "ru": "Репетитор истории",
        "en": "The tutor of history",
        "kk": "Тарих тәрбикері",
        "uz": "Tarix o'qituvchisi"
      },
      {
        "ru": "Репетитор истории Казахстана",
        "en": "The tutor of the history of Kazakhstan",
        "kk": "Қазақстан тарихы тәрбиешісі",
        "uz": "Qozog'iston tarixi o'qituvchisi"
      },
      {
        "ru": "Репетитор итальянского языка",
        "en": "The tutor of the Italian language",
        "kk": "Итальян тілінің тәрбиешісі",
        "uz": "Italiya tili o'qituvchisi"
      },
      {
        "ru": "Репетитор казахского языка",
        "en": "The tutor of the Kazakh language",
        "kk": "Қазақ тілінің тәрбиешісі",
        "uz": "Qozoq tili o'qituvchisi"
      },
      {
        "ru": "Репетитор казахской литературы",
        "en": "Tutor of Kazakh literature",
        "kk": "Қазақ әдебиетінің тәрбиешісі",
        "uz": "Qozoq adabiyoti o'qituvchisi"
      },
      {
        "ru": "Репетитор китайского языка",
        "en": "The tutor of the Chinese language",
        "kk": "Қытай тілінің тәрбиешісі",
        "uz": "Xitoy tili o'qituvchisi"
      },
      {
        "ru": "Репетитор корейского языка",
        "en": "Korean language tutor",
        "kk": "Корей тілі тәрбиешісі",
        "uz": "Koreys tili o'qituvchisi"
      },
      {
        "ru": "Репетитор латинского языка",
        "en": "The tutor of the Latin language",
        "kk": "Латын тілінің тәрбиешісі",
        "uz": "Lotin tilining o'qituvchisi"
      },
      {
        "ru": "Репетитор линейной алгебры",
        "en": "The tutor of the linear algebra",
        "kk": "Сызықтық алгебраның тәрбиешісі",
        "uz": "Chiroyli algebra o'qituvchisi"
      },
      {
        "ru": "Репетитор литературы",
        "en": "The tutor of literature",
        "kk": "Әдебиет тәрбиешісі",
        "uz": "Adabiyot o'qituvchisi"
      },
      {
        "ru": "Репетитор логики",
        "en": "Tutor of logic",
        "kk": "Логика тәрбиешісі",
        "uz": "Mantiqshunoslik o'qituvchisi"
      },
      {
        "ru": "Репетитор математики",
        "en": "Mathematics tutor",
        "kk": "Математика тәрбиешісі",
        "uz": "Matematika o'qituvchisi"
      },
      {
        "ru": "Репетитор математического анализа",
        "en": "The tutor of mathematical analysis",
        "kk": "Математикалық талдау тәрбиешісі",
        "uz": "Matematik tahlil ustasi"
      },
      {
        "ru": "Репетитор менеджмента",
        "en": "Management tutor",
        "kk": "Басқару тәрбиешісі",
        "uz": "Boshqaruv o'qituvchisi"
      },
      {
        "ru": "Репетитор начальной школы",
        "en": "Primary school tutor",
        "kk": "Бастауыш сынып оқушысы",
        "uz": "Boshlang'ich maktab o'qituvchisi"
      },
      {
        "ru": "Репетитор немецкого языка",
        "en": "The tutor of the German language",
        "kk": "Неміс тілінің тәрбиешісі",
        "uz": "Nemis tili o'qituvchisi"
      },
      {
        "ru": "Репетитор обществознания",
        "en": "The tutor of social studies",
        "kk": "Әлеуметтік зерттеулердің тәрбиешісі",
        "uz": "Ijtimoiy tadqiqotlar o'qituvchisi"
      },
      {
        "ru": "Репетитор политологии",
        "en": "Tutor of political science",
        "kk": "Саясаттанушы",
        "uz": "Siyosatshunoslik o'qituvchisi"
      },
      {
        "ru": "Репетитор польского языка",
        "en": "Polish tutor",
        "kk": "Поляк тәрбиесі",
        "uz": "Polsha o'qituvchisi"
      },
      {
        "ru": "Репетитор португальского языка",
        "en": "Portuguese tutor",
        "kk": "Португал тәрбиешісі",
        "uz": "Portugal tili o'qituvchisi"
      },
      {
        "ru": "Репетитор правоведения",
        "en": "Tutor of law",
        "kk": "Заңның тәрбиеші",
        "uz": "Qonun o'qituvchisi"
      },
      {
        "ru": "Репетитор программирования",
        "en": "Programming tutor",
        "kk": "Бағдарламалау тәрбиешісі",
        "uz": "Dasturlash repetitori"
      },
      {
        "ru": "Репетитор русского языка",
        "en": "The tutor of the Russian language",
        "kk": "Орыс тілінің тәрбиешісі",
        "uz": "Rus tili o'qituvchisi"
      },
      {
        "ru": "Репетитор скорочтения",
        "en": "Tutor of contraction",
        "kk": "Жиырылу тәрбиесі",
        "uz": "Qisqarish o'qituvchisi"
      },
      {
        "ru": "Репетитор тайского языка",
        "en": "Thai tutor",
        "kk": "Тай тәрбиешісі",
        "uz": "Tailand o'qituvchisi"
      },
      {
        "ru": "Репетитор турецкого языка",
        "en": "Tutor of the Turkish language",
        "kk": "Түрік тілінің тәрбиешісі",
        "uz": "Turk tili o'qituvchisi"
      },
      {
        "ru": "Репетитор украинского языка",
        "en": "The tutor of the Ukrainian language",
        "kk": "Украин тілінің тәрбиешісі",
        "uz": "Ukraina tili o'qituvchisi"
      },
      {
        "ru": "Репетитор физики",
        "en": "Physics tutor",
        "kk": "Физика тәрбиешісі",
        "uz": "Fizika o'qituvchisi"
      },
      {
        "ru": "Репетитор физиологии",
        "en": "Tutor of physiology",
        "kk": "Физиологияның тәрбиешісі",
        "uz": "Fiziologiya o'qituvchisi"
      },
      {
        "ru": "Репетитор финансов",
        "en": "Finance tutor",
        "kk": "Қаржы тәрбиешісі",
        "uz": "Moliya o'qituvchisi"
      },
      {
        "ru": "Репетитор французского языка",
        "en": "French tutor",
        "kk": "Француз тәрбиеші",
        "uz": "Frantsiya o'qituvchisi"
      },
      {
        "ru": "Репетитор химии",
        "en": "Chemistry tutor",
        "kk": "Химия тәрбиешісі",
        "uz": "Kimyo bo'yicha o'qituvchi"
      },
      {
        "ru": "Репетитор черчения",
        "en": "Drawing tutor",
        "kk": "Оқытушы",
        "uz": "O'praluvchi o'qituvchi"
      },
      {
        "ru": "Репетитор экологии",
        "en": "Ecology tutor",
        "kk": "Экологиялық тәрбиеші",
        "uz": "Ekologiya o'qituvchisi"
      },
      {
        "ru": "Репетитор экономики",
        "en": "The tutor of the economy",
        "kk": "Экономиканың тәрбиешісі",
        "uz": "Iqtisodiyot o'qituvchisi"
      },
      {
        "ru": "Репетитор юриспруденции",
        "en": "Jurisprudence tutor",
        "kk": "Құқықтану тәрбиеші",
        "uz": "Yurisprudensiya o'qituvchisi"
      },
      {
        "ru": "Репетитор японского языка",
        "en": "Japanese tutor",
        "kk": "Жапон тәрбиешісі",
        "uz": "Yapon tili o'qituvchisi"
      }
    ]
  },
  {
    "name": {
      "ru": "Спортивные  тренеры",
      "en": "Sports coaches",
      "kk": "Спорттық жаттықтырушылар",
      "uz": "Sport murabbiylari"
    },
    "subcategories": [
      {
        "ru": "Единоборства",
        "en": "Martial arts",
        "kk": "Жауынгерлік өнер",
        "uz": "Jang san'ati"
      },
      {
        "ru": "Индивидуальные виды спорта",
        "en": "Individual sports",
        "kk": "Жеке спорт",
        "uz": "Individual sport turlari"
      },
      {
        "ru": "Командные виды спорта",
        "en": "Team sports",
        "kk": "Топтық спорт",
        "uz": "Jamoa sportlari"
      }
    ]
  }
];     


async function main() {
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name.en // Store one language as placeholder (optional if not used)
      }
    });

    // Create Category Translations
    await Promise.all(
      Object.entries(category.name).map(([lang, name]) =>
        prisma.categoryTranslation.create({
          data: {
            categoryId: createdCategory.id,
            language: lang,
            name
          }
        })
      )
    );

    for (const sub of category.subcategories) {
      const createdSubcategory = await prisma.subcategory.create({
        data: {
          name: sub.en, // Placeholder name
          categoryId: createdCategory.id
        }
      });

      await Promise.all(
        Object.entries(sub).map(([lang, name]) =>
          prisma.subcategoryTranslation.create({
            data: {
              subcategoryId: createdSubcategory.id,
              language: lang,
              name
            }
          })
        )
      );
    }

    console.log(`Created category: ${category.name.en}`);
  }
}

main()
  .then(() => {
    console.log("Seeding completed.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  