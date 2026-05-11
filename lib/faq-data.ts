export type FAQItem = { question: string; answer: string };

export const faqData: Record<string, Record<string, FAQItem[]>> = {
  'pakalpojumi': {
    lv: [
      { question: 'Kādā zonā jūs sniedzat pakalpojumus?', answer: '200 km rādiusā no Bēnes: visa Latvija un Lietuvas ziemeļdaļa (Šauļi, Klaipēda, Panevēža).' },
      { question: 'Kādu aprīkojumu jūs izmantojat?', answer: 'Specializētas vakuuma mašīnas un augstspiediena skalošanas iekārtas (līdz 200 bar). Visa tehnika atbilst ES standartiem.' },
      { question: 'Vai jūs strādājat arī Lietuvā?', answer: 'Jā, apkalpojam klientus Lietuvas ziemeļdaļā — Šauļi, Klaipēda, Panevēža un apkārtne.' },
      { question: 'Kā pieteikt pakalpojumu?', answer: 'Zvaniet +371 27 727 724, rakstiet info@metan.lv vai aizpildiet pieteikumu mājaslapā. Atbildēsim 24h laikā.' },
      { question: 'Vai piedāvājat steidzamu ārkārtas servisu?', answer: 'Jā, nodrošinām 24/7 ārkārtas servisu. Zvaniet tieši servisa vadītājam: +371 27 727 724.' }
    ],
    ru: [
      { question: 'В какой зоне вы предоставляете услуги?', answer: 'В радиусе 200 км от Бене: вся Латвия и северная Литва (Шяуляй, Клайпеда, Паневежис).' },
      { question: 'Какое оборудование вы используете?', answer: 'Специализированные вакуумные машины и установки гидродинамической промывки (до 200 бар). Вся техника соответствует стандартам ЕС.' },
      { question: 'Вы работаете в Литве?', answer: 'Да, обслуживаем клиентов в северной Литве — Шяуляй, Клайпеда, Паневежис и окрестности.' },
      { question: 'Как заказать услугу?', answer: 'Звоните +371 27 727 724, пишите info@metan.lv или заполните заявку на сайте. Ответим в течение 24 часов.' },
      { question: 'Есть ли экстренный сервис?', answer: 'Да, предоставляем экстренный сервис 24/7. Звоните напрямую руководителю сервиса: +371 27 727 724.' }
    ],
    en: [
      { question: 'What is your service area?', answer: 'Within 200 km of Bēne: all of Latvia and northern Lithuania (Šiauliai, Klaipėda, Panevėžys).' },
      { question: 'What equipment do you use?', answer: 'Specialized vacuum trucks and high-pressure flushing equipment (up to 200 bar). All equipment meets EU standards.' },
      { question: 'Do you work in Lithuania?', answer: 'Yes, we serve clients in northern Lithuania — Šiauliai, Klaipėda, Panevėžys and surrounding areas.' },
      { question: 'How do I request service?', answer: 'Call +371 27 727 724, email info@metan.lv or submit a request on our website. We respond within 24 hours.' },
      { question: 'Do you offer emergency service?', answer: 'Yes, we provide 24/7 emergency service. Call our service manager directly: +371 27 727 724.' }
    ],
    lt: [
      { question: 'Kokioje zonoje teikiate paslaugas?', answer: '200 km spinduliu nuo Bēnės: visa Latvija ir šiaurės Lietuva (Šiauliai, Klaipėda, Panevėžys).' },
      { question: 'Kokią įrangą naudojate?', answer: 'Specializuotus vakuuminius automobilius ir aukšto slėgio plovimo įrangą (iki 200 bar). Visa įranga atitinka ES standartus.' },
      { question: 'Ar dirbate Lietuvoje?', answer: 'Taip, aptarnaujame klientus šiaurės Lietuvoje — Šiauliuose, Klaipėdoje, Panevėžyje ir apylinkėse.' },
      { question: 'Kaip užsakyti paslaugą?', answer: 'Skambinkite +371 27 727 724, rašykite info@metan.lv arba pateikite užklausą svetainėje. Atsakysime per 24 valandas.' },
      { question: 'Ar teikiate skubias paslaugas?', answer: 'Taip, teikiame 24/7 skubias paslaugas. Skambinkite tiesiogiai serviso vadovui: +371 27 727 724.' }
    ]
  },
  'pakalpojumi/horeca': {
    lv: [
      { question: 'Vai restorānam ir obligāti jāapkalpo tauku uztvērējs?', answer: 'Jā, saskaņā ar PVD prasībām visiem ēdināšanas uzņēmumiem ir jānodrošina regulāra tauku uztvērēju apkope. Par neievērošanu var saņemt soda naudu līdz 1000 EUR.' },
      { question: 'Kas ir UCO barters un kā tas darbojas?', answer: 'Mēs bez maksas iztīrām jūsu tauku uztvērēju apmaiņā pret izlietoto cepšanas eļļu. Jūs ietaupāt līdz 40% no apkopes izmaksām, un eļļa tiek pārstrādāta biometānā.' },
      { question: 'Cik bieži jātīra tauku uztvērējs restorānā?', answer: 'Atkarībā no noslodzes — reizi 1-3 mēnešos. Mēs paši atgādinām par nākamo apkopi un saskaņojam laiku.' },
      { question: 'Vai jūs strādājat ārpus darba laika?', answer: 'Jā, tīrīšanu veicam ārpus jūsu darba laika, lai netraucētu viesiem un personālam. Parasti no rīta vai vakarā.' },
      { question: 'Ko darīt, ja PVD inspektors jau ir pieteicis pārbaudi?', answer: 'Zvaniet mums nekavējoties: +371 27727724. Veicam steidzamu tīrīšanu 24h laikā ar visu dokumentāciju.' }
    ],
    ru: [
      { question: 'Обязан ли ресторан обслуживать жироуловитель?', answer: 'Да, согласно требованиям PVD все предприятия общественного питания обязаны обеспечивать регулярное обслуживание жироуловителей. Штраф за несоблюдение — до 1000 EUR.' },
      { question: 'Что такое бартер UCO и как это работает?', answer: 'Мы бесплатно чистим ваш жироуловитель в обмен на использованное кулинарное масло. Вы экономите до 40% расходов на обслуживание, а масло перерабатывается в биометан.' },
      { question: 'Как часто нужно чистить жироуловитель в ресторане?', answer: 'В зависимости от нагрузки — раз в 1-3 месяца. Мы сами напоминаем о следующем обслуживании и согласовываем время.' },
      { question: 'Вы работаете в нерабочее время?', answer: 'Да, проводим чистку вне рабочих часов ресторана, чтобы не мешать гостям и персоналу. Обычно утром или вечером.' },
      { question: 'Что делать, если инспектор PVD уже назначил проверку?', answer: 'Звоните немедленно: +371 27727724. Проводим срочную чистку в течение 24 часов с полной документацией.' }
    ],
    en: [
      { question: 'Is grease trap maintenance mandatory for restaurants?', answer: 'Yes, according to PVD requirements, all food service businesses must maintain their grease traps regularly. Fines for non-compliance can reach 1000 EUR.' },
      { question: 'What is UCO barter and how does it work?', answer: 'We clean your grease trap for free in exchange for used cooking oil. You save up to 40% on maintenance costs, and the oil is recycled into biomethane.' },
      { question: 'How often should a restaurant clean its grease trap?', answer: 'Depending on the workload — every 1-3 months. We remind you about upcoming maintenance and schedule at your convenience.' },
      { question: 'Do you work outside business hours?', answer: 'Yes, we perform cleaning outside your operating hours to avoid disrupting guests and staff. Usually mornings or evenings.' },
      { question: 'What if a PVD inspector has already scheduled an inspection?', answer: 'Call us immediately: +371 27727724. We perform emergency cleaning within 24 hours with full documentation.' }
    ],
    lt: [
      { question: 'Ar restoranui privaloma prižiūrėti riebalų gaudyklę?', answer: 'Taip, pagal PVD reikalavimus visi maitinimo įmonės privalo reguliariai prižiūrėti riebalų gaudykles. Bauda už pažeidimus — iki 1000 EUR.' },
      { question: 'Kas yra UCO barteris ir kaip tai veikia?', answer: 'Mes nemokamai išvalome jūsų riebalų gaudyklę mainais už panaudotą kepimo aliejų. Sutaupote iki 40% priežiūros išlaidų, o aliejus perdirbamas į biometaną.' },
      { question: 'Kaip dažnai reikia valyti riebalų gaudyklę restorane?', answer: 'Priklausomai nuo apkrovos — kas 1-3 mėnesius. Mes patys primename apie artėjančią priežiūrą ir suderinsime laiką.' },
      { question: 'Ar dirbate ne darbo valandomis?', answer: 'Taip, valymą atliekame ne jūsų darbo metu, kad netrukdytume svečiams ir personalui. Paprastai ryte arba vakare.' },
      { question: 'Ką daryti, jei PVD inspektorius jau paskyrė patikrinimą?', answer: 'Skambinkite nedelsiant: +371 27727724. Atliekame skubų valymą per 24 valandas su visa dokumentacija.' }
    ]
  },
  'pakalpojumi/industrial': {
    lv: [
      { question: 'Kādus atkritumu kodus jūs apstrādājat?', answer: 'EWC 19 08 09 (tauku un eļļu maisījumi) un ABP Cat 3 (dzīvnieku izcelsmes blakusprodukti). Dokumentācija tiek iesniegta APUS sistēmā.' },
      { question: 'Vai jūs nodrošināt VVD atbilstības dokumentāciju?', answer: 'Jā — darbu akts, atkritumu pārvadāšanas pavadzīme, APUS ieraksts. Atvieglo ikgadējo VVD pārskatu sagatavošanu.' },
      { question: 'Kāda ir jūsu pieredze ar zivju pārstrādes uzņēmumiem?', answer: 'Plaša pieredze. Izmantojam hidrodinamisko tīrīšanu 200 bar, kas efektīvi noņem sacietējušus zivju taukus un novērš smaku.' },
      { question: 'Kā notiek sadarbība ar lielu ražotni?', answer: 'Slēdzam gada līgumu, saskaņojam grafiku ar jūsu ražošanas ciklu, nodrošinām atkritumu izvešanu bez ražošanas pārtraukumiem.' },
      { question: 'Vai jūs varat apkalpot vairākus objektus vienā uzņēmumā?', answer: 'Jā, piedāvājam daudzvietu līgumus ar centralizētu dokumentāciju un vienotu kontaktpersonu.' }
    ],
    ru: [
      { question: 'Какие коды отходов вы обрабатываете?', answer: 'EWC 19 08 09 (смеси жиров и масел) и ABP Cat 3 (побочные продукты животного происхождения). Документация подаётся в систему APUS.' },
      { question: 'Вы обеспечиваете документацию для VVD?', answer: 'Да — акт выполненных работ, накладная на перевозку отходов, запись в APUS. Упрощает подготовку ежегодного отчёта VVD.' },
      { question: 'Какой у вас опыт работы с рыбоперерабатывающими предприятиями?', answer: 'Большой опыт. Используем гидродинамическую очистку 200 бар, которая эффективно удаляет затвердевшие рыбные жиры и устраняет запах.' },
      { question: 'Как строится сотрудничество с крупным производством?', answer: 'Заключаем годовой контракт, согласовываем график с вашим производственным циклом, обеспечиваем вывоз отходов без остановки производства.' },
      { question: 'Можете обслуживать несколько объектов одного предприятия?', answer: 'Да, предлагаем мультиобъектные контракты с централизованной документацией и единым контактным лицом.' }
    ],
    en: [
      { question: 'What waste codes do you handle?', answer: 'EWC 19 08 09 (fat and oil mixtures) and ABP Cat 3 (animal by-products). All documentation is filed in the APUS system.' },
      { question: 'Do you provide VVD compliance documentation?', answer: 'Yes — work completion certificate, waste transport invoice, APUS record. Simplifies your annual VVD report preparation.' },
      { question: 'What is your experience with fish processing plants?', answer: 'Extensive experience. We use 200 bar hydrodynamic cleaning that effectively removes hardened fish fats and eliminates odor.' },
      { question: 'How does cooperation with a large manufacturer work?', answer: 'We sign an annual contract, align the schedule with your production cycle, and ensure waste removal without production downtime.' },
      { question: 'Can you service multiple facilities of one company?', answer: 'Yes, we offer multi-site contracts with centralized documentation and a single point of contact.' }
    ],
    lt: [
      { question: 'Kokius atliekų kodus apdorojate?', answer: 'EWC 19 08 09 (riebalų ir aliejų mišiniai) ir ABP Cat 3 (gyvūninės kilmės šalutiniai produktai). Dokumentacija pateikiama APUS sistemoje.' },
      { question: 'Ar pateikiate VVD atitikties dokumentaciją?', answer: 'Taip — darbų aktas, atliekų transportavimo sąskaita, APUS įrašas. Palengvina metinės VVD ataskaitos parengimą.' },
      { question: 'Kokia jūsų patirtis su žuvų perdirbimo įmonėmis?', answer: 'Didelė patirtis. Naudojame 200 bar hidrodinaminį valymą, kuris efektyviai pašalina sukietėjusius žuvų riebalus ir kvapą.' },
      { question: 'Kaip vyksta bendradarbiavimas su didele gamykla?', answer: 'Sudarome metinę sutartį, derinama grafiką su jūsų gamybos ciklu, užtikriname atliekų išvežimą be gamybos pertraukų.' },
      { question: 'Ar galite aptarnauti kelis vienos įmonės objektus?', answer: 'Taip, siūlome daugiaobjekčių sutartis su centralizuota dokumentacija ir vienu kontaktiniu asmeniu.' }
    ]
  },
  'pakalpojumi/municipal': {
    lv: [
      { question: 'Vai jūs piedalāties pašvaldību iepirkumos un tenderos?', answer: 'Jā, mums ir pieredze darbā ar pašvaldību iepirkumiem. Nodrošinām visas nepieciešamās licences, sertifikātus un atsauksmes.' },
      { question: 'Kādi ir jūsu sadarbības nosacījumi ar ūdenssaimniecības uzņēmumiem?', answer: 'Piedāvājam ilgtermiņa līgumus (12-36 mēneši) ar fiksētu cenu un garantētu izvešanas grafiku.' },
      { question: 'Kā tiek nodrošināta atbilstība VVD prasībām?', answer: 'Katrs izbraukums tiek dokumentēts APUS sistēmā. Jūs saņemat pilnu atskaiti, kas apliecina atkritumu legālu utilizāciju.' },
      { question: 'Vai varat apkalpot objektus visā Latvijā?', answer: 'Mūsu apkalpošanas zona ir 200 km no Bēnes. Tas ietver lielāko daļu Latvijas. Objektiem ārpus zonas — individuāls aprēķins.' }
    ],
    ru: [
      { question: 'Вы участвуете в муниципальных закупках и тендерах?', answer: 'Да, у нас есть опыт работы с муниципальными закупками. Обеспечиваем все необходимые лицензии, сертификаты и рекомендации.' },
      { question: 'Какие условия сотрудничества с водоканалами?', answer: 'Предлагаем долгосрочные контракты (12-36 месяцев) с фиксированной ценой и гарантированным графиком вывоза.' },
      { question: 'Как обеспечивается соответствие требованиям VVD?', answer: 'Каждый выезд документируется в системе APUS. Вы получаете полный отчёт, подтверждающий легальную утилизацию отходов.' },
      { question: 'Можете обслуживать объекты по всей Латвии?', answer: 'Наша зона обслуживания — 200 км от Бене. Это охватывает большую часть Латвии. Для объектов за пределами зоны — индивидуальный расчёт.' }
    ],
    en: [
      { question: 'Do you participate in municipal tenders and procurement?', answer: 'Yes, we have experience with municipal procurement. We provide all necessary licenses, certificates, and references.' },
      { question: 'What are your cooperation terms with water utilities?', answer: 'We offer long-term contracts (12-36 months) with fixed pricing and a guaranteed collection schedule.' },
      { question: 'How do you ensure VVD compliance?', answer: 'Every service visit is documented in the APUS system. You receive a full report confirming legal waste disposal.' },
      { question: 'Can you service facilities across Latvia?', answer: 'Our service area is 200 km from Bēne, covering most of Latvia. For facilities outside this zone — individual pricing.' }
    ],
    lt: [
      { question: 'Ar dalyvaujate savivaldybių pirkimuose ir konkursuose?', answer: 'Taip, turime patirties dirbant su savivaldybių pirkimais. Pateikiame visas reikalingas licencijas, sertifikatus ir rekomendacijas.' },
      { question: 'Kokios bendradarbiavimo sąlygos su vandens tiekimo įmonėmis?', answer: 'Siūlome ilgalaikes sutartis (12-36 mėn.) su fiksuota kaina ir garantuotu išvežimo grafiku.' },
      { question: 'Kaip užtikrinate VVD reikalavimų atitiktį?', answer: 'Kiekvienas išvykimas dokumentuojamas APUS sistemoje. Gaunate pilną ataskaitą, patvirtinančią teisėtą atliekų utilizavimą.' },
      { question: 'Ar galite aptarnauti objektus visoje Latvijoje?', answer: 'Mūsų aptarnavimo zona — 200 km nuo Bēnės, apimanti didžiąją dalį Latvijos. Objektams už zonos ribų — individualus skaičiavimas.' }
    ]
  },
  'pakalpojumi/social': {
    lv: [
      { question: 'Vai jūs strādājat ar skolām un bērnudārziem?', answer: 'Jā, mums ir pieredze darbā ar izglītības iestādēm. Strādājam klusi, ātri un ārpus bērnu uzturēšanās laika.' },
      { question: 'Kā notiek tīrīšana, lai netraucētu bērniem vai pacientiem?', answer: 'Veicam darbus vakaros, brīvdienās vai brīvlaikos. Mūsu tehnika ir ar zemu profilu (2.2m) un nerada skaļus trokšņus.' },
      { question: 'Vai cena ir piemērota bērnudārza vai skolas budžetam?', answer: 'Piedāvājam caurspīdīgu cenu modeli bez slēptām izmaksām. Gada līgums ar fiksētu summu — ērti budžeta plānošanai.' },
      { question: 'Kādu dokumentāciju jūs nodrošināt PVD pārbaudēm?', answer: 'Pilnu dokumentāciju: darbu akts, atkritumu utilizācijas apliecinājums, apkopes grafiks.' }
    ],
    ru: [
      { question: 'Вы работаете со школами и детскими садами?', answer: 'Да, у нас есть опыт работы с образовательными учреждениями. Работаем тихо, быстро и вне времени пребывания детей.' },
      { question: 'Как проходит чистка, чтобы не мешать детям или пациентам?', answer: 'Выполняем работы вечером, в выходные или на каникулах. Наша техника низкопрофильная (2.2 м) и не создаёт громких шумов.' },
      { question: 'Подходит ли цена для бюджета детского сада или школы?', answer: 'Предлагаем прозрачную модель ценообразования без скрытых расходов. Годовой контракт с фиксированной суммой — удобно для планирования бюджета.' },
      { question: 'Какую документацию вы предоставляете для проверок PVD?', answer: 'Полную документацию: акт выполненных работ, подтверждение утилизации отходов, график обслуживания.' }
    ],
    en: [
      { question: 'Do you work with schools and kindergartens?', answer: 'Yes, we have experience with educational institutions. We work quietly, quickly, and outside children\'s attendance hours.' },
      { question: 'How is cleaning done without disturbing children or patients?', answer: 'We perform work in evenings, weekends, or during holidays. Our equipment is low-profile (2.2m) and produces minimal noise.' },
      { question: 'Is the price suitable for a kindergarten or school budget?', answer: 'We offer a transparent pricing model with no hidden costs. Annual contract with a fixed sum — convenient for budget planning.' },
      { question: 'What documentation do you provide for PVD inspections?', answer: 'Full documentation: work completion certificate, waste disposal confirmation, maintenance schedule.' }
    ],
    lt: [
      { question: 'Ar dirbate su mokyklomis ir darželiais?', answer: 'Taip, turime patirties dirbant su švietimo įstaigomis. Dirbame tyliai, greitai ir ne vaikų buvimo metu.' },
      { question: 'Kaip vyksta valymas, kad netrukdytų vaikams ar pacientams?', answer: 'Darbus atliekame vakarais, savaitgaliais arba atostogų metu. Mūsų įranga žemo profilio (2.2 m) ir nekelia didelio triukšmo.' },
      { question: 'Ar kaina tinkama darželio ar mokyklos biudžetui?', answer: 'Siūlome skaidrų kainų modelį be paslėptų išlaidų. Metinė sutartis su fiksuota suma — patogu biudžeto planavimui.' },
      { question: 'Kokią dokumentaciją pateikiate PVD patikrinimams?', answer: 'Pilną dokumentaciją: darbų aktas, atliekų utilizavimo patvirtinimas, priežiūros grafikas.' }
    ]
  },
  'pakalpojumi/logistics': {
    lv: [
      { question: 'Vai jūsu tehnika var iebraukt zemā noliktavā vai terminālī?', answer: 'Jā, mūsu vakuuma mašīnas ir ar zemu profilu — līdz 2.2m augstumā. Speciāli piemērotas termināliem un pazemes autostāvvietām.' },
      { question: 'Vai jūs strādājat naktīs?', answer: 'Jā, piedāvājam apkopi nakts maiņā (22:00-06:00), lai netraucētu dienas loģistiku un preču plūsmu.' },
      { question: 'Kā notiek grīdas noteku un drenāžas sistēmu tīrīšana?', answer: 'Izmantojam augstspiediena skalošanu (līdz 200 bar) kombinācijā ar vakuuma nosūcēju. Efektīvi pret tauku un pārtikas nogulsnēm.' },
      { question: 'Vai varat apkalpot vairākus nomniekus vienā terminālī?', answer: 'Jā, koordinējam grafiku ar termināla administrāciju. Katrs nomnieks saņem savu dokumentāciju un rēķinu.' }
    ],
    ru: [
      { question: 'Может ли ваша техника заехать в низкий склад или терминал?', answer: 'Да, наши вакуумные машины низкопрофильные — до 2.2 м высотой. Специально подходят для терминалов и подземных парковок.' },
      { question: 'Вы работаете ночью?', answer: 'Да, предлагаем обслуживание в ночную смену (22:00-06:00), чтобы не мешать дневной логистике и грузопотоку.' },
      { question: 'Как происходит чистка напольных трапов и дренажных систем?', answer: 'Используем гидродинамическую промывку (до 200 бар) в сочетании с вакуумным откачиванием. Эффективно против жировых и пищевых отложений.' },
      { question: 'Можете обслуживать нескольких арендаторов в одном терминале?', answer: 'Да, координируем график с администрацией терминала. Каждый арендатор получает свою документацию и счёт.' }
    ],
    en: [
      { question: 'Can your equipment enter a low-ceiling warehouse or terminal?', answer: 'Yes, our vacuum trucks are low-profile — up to 2.2m in height. Specifically designed for terminals and underground parking areas.' },
      { question: 'Do you work at night?', answer: 'Yes, we offer night shift service (22:00-06:00) to avoid disrupting daytime logistics and cargo flow.' },
      { question: 'How is floor drain and drainage system cleaning done?', answer: 'We use high-pressure flushing (up to 200 bar) combined with vacuum extraction. Effective against grease and food deposits.' },
      { question: 'Can you service multiple tenants in one terminal?', answer: 'Yes, we coordinate the schedule with terminal administration. Each tenant receives their own documentation and invoice.' }
    ],
    lt: [
      { question: 'Ar jūsų įranga gali įvažiuoti į žemą sandėlį ar terminalą?', answer: 'Taip, mūsų vakuuminiai automobiliai žemo profilio — iki 2.2 m aukščio. Specialiai pritaikyti terminalams ir požeminėms automobilių stovėjimo aikštelėms.' },
      { question: 'Ar dirbate naktimis?', answer: 'Taip, siūlome aptarnavimą naktinėje pamainoje (22:00-06:00), kad netrukdytume dienos logistikai ir krovinių srautui.' },
      { question: 'Kaip vyksta grindų trapų ir drenažo sistemų valymas?', answer: 'Naudojame aukšto slėgio plovimą (iki 200 bar) kartu su vakuuminiu siurbimu. Efektyvu prieš riebalų ir maisto nuosėdas.' },
      { question: 'Ar galite aptarnauti kelis nuomininkus viename terminale?', answer: 'Taip, koordinuojame grafiką su terminalo administracija. Kiekvienas nuomininkas gauna savo dokumentaciją ir sąskaitą.' }
    ]
  }
};

export function getFAQsForLocale(locale: string, page: string): FAQItem[] {
  return faqData[page]?.[locale] || faqData[page]?.['en'] || [];
}
