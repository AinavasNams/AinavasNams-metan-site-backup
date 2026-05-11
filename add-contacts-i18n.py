#!/usr/bin/env python3
"""Add contacts page translations to i18n.ts"""

FILE = "/root/metan-site/lib/i18n.ts"

# Read current file
with open(FILE, 'r') as f:
    content = f.read()

# Backup
with open(FILE + '.backup-contacts', 'w') as f:
    f.write(content)

lines = content.split('\n')

# Translation blocks for each language
LV_CONTACTS = """    // ==== NEW: ContactsPage ====
    contacts: {
      heroTitle: 'Kontakti',
      heroSubtitle: 'Sazinieties ar mums, lai saņemtu konsultāciju par mūsu pakalpojumiem vai uzsāktu sadarbību. Mūsu komanda ir gatava atbildēt uz jūsu jautājumiem.',
      sendMessage: 'Sūtīt ziņu',
      nameLabel: 'Vārds',
      namePlaceholder: 'Jūsu vārds',
      phoneLabel: 'Telefons',
      phonePlaceholder: '+371 20000000',
      emailLabel: 'E-pasts',
      emailPlaceholder: 'your@email.com',
      topicLabel: 'Tēma',
      topicPlaceholder: 'Par ko vēlaties runāt?',
      preferredTimeLabel: 'Vēlamais zvana laiks',
      preferredTimePlaceholder: 'Kad jums ērtāk?',
      timeAsap: 'Tūlīt pat',
      timeMorning: 'Rītos (8:00-12:00)',
      timeAfternoon: 'Pēcpusdienā (12:00-17:00)',
      timeEvening: 'Vakarā (17:00-20:00)',
      timeEmailOnly: 'Tikai e-pastā',
      messageLabel: 'Ziņa',
      messagePlaceholder: 'Pastāstiet īsi, kas jums nepieciešams...',
      consentText: 'Es piekrītu manu datu apstrādei, lai saņemtu komerciālu piedāvājumu un sazinātos par pakalpojumu nosacījumiem.',
      consentAlert: 'Lūdzu apstipriniet, ka piekrītat datu apstrādei.',
      submitButton: 'Nosūtīt ziņu',
      submitting: 'Nosūta...',
      submitNote: 'Nosūtot formu, jūs piekrītat saziņai par piedāvājumu. Mēs sazināsimies 24h laikā.',
      successTitle: 'Ziņa nosūtīta!',
      successDesc: 'Mēs sazināsimies ar jums tuvākajā laikā.',
      companyInfo: 'Uzņēmuma informācija',
      legalAddress: 'Juridiskā adrese:',
      legalAddressValue: 'Bauskas iela 2, Daugavpils, LV-5417',
      stationAddress: 'Stacijas adrese:',
      stationAddressValue: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      contactPersons: 'Kontaktpersonas',
      location: 'Atrašanās vieta',
      bioStation: 'Biometāna ražošanas stacija:',
      bioStationAddress: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      coordinates: 'Koordinātes: 56.4808°N, 23.0573°E',
      techService: 'Tehniskais serviss:',
      techServiceHours: 'Darba laiks: 24/7 ekstrenais dienests',
    },"""

RU_CONTACTS = """    // ==== NEW: ContactsPage ====
    contacts: {
      heroTitle: 'Контакты',
      heroSubtitle: 'Свяжитесь с нами для консультации по нашим услугам или для начала сотрудничества. Наша команда готова ответить на ваши вопросы.',
      sendMessage: 'Отправить сообщение',
      nameLabel: 'Имя',
      namePlaceholder: 'Ваше имя',
      phoneLabel: 'Телефон',
      phonePlaceholder: '+371 20000000',
      emailLabel: 'E-mail',
      emailPlaceholder: 'your@email.com',
      topicLabel: 'Тема',
      topicPlaceholder: 'О чём хотите поговорить?',
      preferredTimeLabel: 'Удобное время звонка',
      preferredTimePlaceholder: 'Когда вам удобно?',
      timeAsap: 'Как можно скорее',
      timeMorning: 'Утром (8:00-12:00)',
      timeAfternoon: 'Днём (12:00-17:00)',
      timeEvening: 'Вечером (17:00-20:00)',
      timeEmailOnly: 'Только по e-mail',
      messageLabel: 'Сообщение',
      messagePlaceholder: 'Расскажите кратко, что вам нужно...',
      consentText: 'Я согласен на обработку моих данных для получения коммерческого предложения и связи по условиям услуг.',
      consentAlert: 'Пожалуйста, подтвердите согласие на обработку данных.',
      submitButton: 'Отправить сообщение',
      submitting: 'Отправка...',
      submitNote: 'Отправляя форму, вы соглашаетесь на связь по вашему запросу. Мы свяжемся с вами в течение 24 часов.',
      successTitle: 'Сообщение отправлено!',
      successDesc: 'Мы свяжемся с вами в ближайшее время.',
      companyInfo: 'Информация о компании',
      legalAddress: 'Юридический адрес:',
      legalAddressValue: 'Bauskas iela 2, Daugavpils, LV-5417',
      stationAddress: 'Адрес станции:',
      stationAddressValue: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      contactPersons: 'Контактные лица',
      location: 'Местоположение',
      bioStation: 'Станция производства биометана:',
      bioStationAddress: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      coordinates: 'Координаты: 56.4808°N, 23.0573°E',
      techService: 'Техническая служба:',
      techServiceHours: 'Режим работы: 24/7 экстренная служба',
    },"""

LT_CONTACTS = """    // ==== NEW: ContactsPage ====
    contacts: {
      heroTitle: 'Kontaktai',
      heroSubtitle: 'Susisiekite su mumis dėl konsultacijos apie mūsų paslaugas arba bendradarbiavimo pradžios. Mūsų komanda pasirengusi atsakyti į jūsų klausimus.',
      sendMessage: 'Siųsti žinutę',
      nameLabel: 'Vardas',
      namePlaceholder: 'Jūsų vardas',
      phoneLabel: 'Telefonas',
      phonePlaceholder: '+371 20000000',
      emailLabel: 'El. paštas',
      emailPlaceholder: 'your@email.com',
      topicLabel: 'Tema',
      topicPlaceholder: 'Apie ką norite kalbėti?',
      preferredTimeLabel: 'Pageidaujamas skambučio laikas',
      preferredTimePlaceholder: 'Kada jums patogiau?',
      timeAsap: 'Kuo greičiau',
      timeMorning: 'Ryte (8:00-12:00)',
      timeAfternoon: 'Po pietų (12:00-17:00)',
      timeEvening: 'Vakare (17:00-20:00)',
      timeEmailOnly: 'Tik el. paštu',
      messageLabel: 'Žinutė',
      messagePlaceholder: 'Trumpai papasakokite, ko jums reikia...',
      consentText: 'Sutinku, kad mano duomenys būtų tvarkomi komercinio pasiūlymo gavimui ir susisiekimui dėl paslaugų sąlygų.',
      consentAlert: 'Prašome patvirtinti sutikimą dėl duomenų tvarkymo.',
      submitButton: 'Siųsti žinutę',
      submitting: 'Siunčiama...',
      submitNote: 'Siųsdami formą, jūs sutinkate su susisiekimu dėl pasiūlymo. Susisieksime su jumis per 24 valandas.',
      successTitle: 'Žinutė išsiųsta!',
      successDesc: 'Susisieksime su jumis artimiausiu metu.',
      companyInfo: 'Įmonės informacija',
      legalAddress: 'Juridinis adresas:',
      legalAddressValue: 'Bauskas iela 2, Daugavpils, LV-5417',
      stationAddress: 'Stoties adresas:',
      stationAddressValue: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      contactPersons: 'Kontaktiniai asmenys',
      location: 'Vieta',
      bioStation: 'Biometano gamybos stotis:',
      bioStationAddress: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      coordinates: 'Koordinatės: 56.4808°N, 23.0573°E',
      techService: 'Techninė tarnyba:',
      techServiceHours: 'Darbo laikas: 24/7 avarinė tarnyba',
    },"""

EN_CONTACTS = """    // ==== NEW: ContactsPage ====
    contacts: {
      heroTitle: 'Contacts',
      heroSubtitle: 'Get in touch with us for a consultation about our services or to start a partnership. Our team is ready to answer your questions.',
      sendMessage: 'Send Message',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      phoneLabel: 'Phone',
      phonePlaceholder: '+371 20000000',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      topicLabel: 'Topic',
      topicPlaceholder: 'What would you like to discuss?',
      preferredTimeLabel: 'Preferred call time',
      preferredTimePlaceholder: 'When is convenient for you?',
      timeAsap: 'As soon as possible',
      timeMorning: 'Morning (8:00-12:00)',
      timeAfternoon: 'Afternoon (12:00-17:00)',
      timeEvening: 'Evening (17:00-20:00)',
      timeEmailOnly: 'Email only',
      messageLabel: 'Message',
      messagePlaceholder: 'Briefly tell us what you need...',
      consentText: 'I agree to the processing of my data to receive a commercial offer and to be contacted regarding service conditions.',
      consentAlert: 'Please confirm that you agree to data processing.',
      submitButton: 'Send Message',
      submitting: 'Sending...',
      submitNote: 'By submitting this form, you agree to be contacted about our offer. We will get back to you within 24 hours.',
      successTitle: 'Message sent!',
      successDesc: 'We will contact you shortly.',
      companyInfo: 'Company Information',
      legalAddress: 'Legal address:',
      legalAddressValue: 'Bauskas iela 2, Daugavpils, LV-5417',
      stationAddress: 'Station address:',
      stationAddressValue: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      contactPersons: 'Contact Persons',
      location: 'Location',
      bioStation: 'Biomethane production station:',
      bioStationAddress: 'Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711',
      coordinates: 'Coordinates: 56.4808°N, 23.0573°E',
      techService: 'Technical service:',
      techServiceHours: 'Working hours: 24/7 emergency service',
    },"""

# Find the insertion points - right before the closing `  },` of each language block
# We search for the footer.cookies line pattern to find the end of each block

import re

# Strategy: find each "cookies: 'xxx'," followed by "    }," followed by "  },"
# These mark the end of footer → end of language block

# Let's find all lines with "cookies:" inside footer sections
result_lines = []
i = 0
lv_inserted = False
ru_inserted = False
lt_inserted = False
en_inserted = False

# Track which language block we're in
current_lang = None
lang_starts = {}

for idx, line in enumerate(lines):
    # Detect language block starts
    if '  lv: {' == line.strip() or line.strip() == 'lv: {':
        current_lang = 'lv'
    elif '  ru: {' == line.strip() or line.strip() == 'ru: {':
        current_lang = 'ru'
    elif '  lt: {' == line.strip() or line.strip() == 'lt: {':
        current_lang = 'lt'
    elif '  en: {' == line.strip() or line.strip() == 'en: {':
        current_lang = 'en'

# Better approach: find the "footer:" section end in each block
# Look for pattern: "    }," (closing footer) followed by "  }," (closing language)
# Actually, let's find the exact lines we saw: the `  },` that closes each language block

# Known from output:
# lv ends at line 625 (index 624): "  },"
# ru ends at ~1243 (but shifted after lv insert)
# lt ends at ~1861
# en ends at ~2479

# Let's find them by searching for "  }," preceded by footer closing
new_lines = []
lang_block_ends = []

for idx, line in enumerate(lines):
    stripped = line.rstrip()
    # Find lines that are exactly "  }," which close a language block
    # They come after "    }," which closes the footer section
    if stripped == '  },' and idx > 10:
        # Check if previous non-empty line closes footer
        prev_idx = idx - 1
        while prev_idx > 0 and lines[prev_idx].strip() == '':
            prev_idx -= 1
        if '},' in lines[prev_idx] or "'," in lines[prev_idx]:
            lang_block_ends.append(idx)

print(f"Found language block endings at line numbers: {[x+1 for x in lang_block_ends]}")

# We expect 4 endings: lv, ru, lt, en
# But the last one (en) ends with "  }," before "};" 
# Let's also check for the final "};"
for idx, line in enumerate(lines):
    if line.rstrip() == '  },':
        lang_block_ends_check = idx

# Let's use a more reliable method: find the exact comment markers
lv_end = None
ru_end = None  
lt_end = None
en_end = None

for idx, line in enumerate(lines):
    if '🇷🇺 РУССКИЙ' in line and lv_end is None:
        # lv block ends a few lines before this
        for j in range(idx-1, idx-5, -1):
            if lines[j].rstrip() == '  },':
                lv_end = j
                break
    if '🇱🇹 LIETUVIŲ' in line and ru_end is None:
        for j in range(idx-1, idx-5, -1):
            if lines[j].rstrip() == '  },':
                ru_end = j
                break
    if '🇬🇧 ENGLISH' in line and lt_end is None:
        for j in range(idx-1, idx-5, -1):
            if lines[j].rstrip() == '  },':
                lt_end = j
                break

# en block ends before "};"
for idx, line in enumerate(lines):
    if line.rstrip() == '};':
        for j in range(idx-1, idx-5, -1):
            if lines[j].rstrip() == '  },':
                en_end = j
                break
        break

print(f"LV ends at line {lv_end+1 if lv_end else 'NOT FOUND'}")
print(f"RU ends at line {ru_end+1 if ru_end else 'NOT FOUND'}")
print(f"LT ends at line {lt_end+1 if lt_end else 'NOT FOUND'}")
print(f"EN ends at line {en_end+1 if en_end else 'NOT FOUND'}")

if not all([lv_end, ru_end, lt_end, en_end]):
    print("ERROR: Could not find all insertion points!")
    exit(1)

# Now insert - work backwards to preserve line numbers
insertions = [
    (en_end, EN_CONTACTS),
    (lt_end, LT_CONTACTS),
    (ru_end, RU_CONTACTS),
    (lv_end, LV_CONTACTS),
]

for insert_idx, block in insertions:
    # Insert before the "  }," line
    lines.insert(insert_idx, block)

# Write result
result = '\n'.join(lines)
with open(FILE, 'w') as f:
    f.write(result)

# Verify
with open(FILE, 'r') as f:
    new_content = f.read()

count = new_content.count('contacts: {')
total_lines = len(new_content.split('\n'))
print(f"\n✅ Done! contacts: {{ found {count} times (expected 4)")
print(f"Total lines: {total_lines}")
