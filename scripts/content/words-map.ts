/* eslint-disable */
// 25 MAP visualization words — geographic journeys
export const mapWords = [
    {
        word: "Tea",
        definition: "A hot drink made by infusing dried leaves in boiling water.",
        phonetic: "/tiː/",
        visualization_type: "MAP",
        content_json: {
            hook: "One leaf, two pronunciations — 'tea' or 'chai' — reveals whether your ancestors traded by sea or by land.",
            fun_fact: "Every language on Earth calls tea either 'te' (from Hokkien) or 'cha' (from Cantonese), depending on how it arrived.",
            nerd_mode: { ipa_full: "/tiː/ (British & American)", earliest_citation: "First recorded in English circa 1655 from Dutch 'thee'." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "China (Fujian)", coordinates: [25.0, 118.0], era: "2700 BCE", context: "Legend credits Emperor Shen Nung, who discovered tea when leaves blew into his boiling water.", influence_radius_km: 500 },
                    { order: 2, location_name: "Southeast Asia", coordinates: [13.7, 100.5], era: "600 CE", context: "Buddhist monks carried tea culture south along monsoon trade routes.", influence_radius_km: 800 },
                    { order: 3, location_name: "Netherlands (Amsterdam)", coordinates: [52.4, 4.9], era: "1610", context: "Dutch East India Company shipped the first tea to Europe — from Fujian, where it was called 'te'.", influence_radius_km: 300 },
                    { order: 4, location_name: "England (London)", coordinates: [51.5, -0.1], era: "1660s", context: "Catherine of Braganza made tea fashionable at the English court, creating a national obsession.", influence_radius_km: 400 },
                    { order: 5, location_name: "India (Assam)", coordinates: [26.1, 91.7], era: "1830s", context: "The British planted stolen Chinese tea seeds in India, creating the world's largest tea industry.", influence_radius_km: 600 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Buddhist trade and pilgrimage routes", duration_years: 1000 },
                    { from: 1, to: 3, method: "Dutch East India Company ships via sea", duration_years: 100 },
                    { from: 3, to: 4, method: "Anglo-Dutch trade", duration_years: 50 },
                    { from: 1, to: 5, method: "British colonial transplantation", duration_years: 200 }
                ]
            }
        },
        accent_color: "#059669",
        root_family: "CHINESE_te"
    },
    {
        word: "Sugar",
        definition: "A sweet crystalline substance obtained from sugarcane or sugar beet.",
        phonetic: "/ˈʃʊɡər/",
        visualization_type: "MAP",
        content_json: {
            hook: "Sugar crossed three continents and five languages before sweetening your morning coffee.",
            fun_fact: "The word traces back to Sanskrit 'sharkara' meaning 'gravel' — because raw sugar looked like tiny pebbles.",
            nerd_mode: { ipa_full: "/ˈʃʊɡ.ə(ɹ)/ (British), /ˈʃʊɡ.ɚ/ (American)", earliest_citation: "First recorded in English circa 1290 as 'sugre' from Old French 'sucre'." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "India (Bengal)", coordinates: [22.6, 88.4], era: "500 BCE", context: "Ancient Indians crystallized sugarcane juice and called it 'sharkara' — gravel.", influence_radius_km: 600 },
                    { order: 2, location_name: "Persia", coordinates: [32.4, 53.7], era: "600 CE", context: "Persian chemists refined sugar production. The word became 'shakar' in Middle Persian.", influence_radius_km: 500 },
                    { order: 3, location_name: "Egypt (Cairo)", coordinates: [30.0, 31.2], era: "700s", context: "Arab traders brought sugar west. Arabic 'sukkar' spread across the Mediterranean.", influence_radius_km: 400 },
                    { order: 4, location_name: "France", coordinates: [48.9, 2.3], era: "1100s", context: "Crusaders brought 'the new spice' home. Old French adopted it as 'sucre'.", influence_radius_km: 300 },
                    { order: 5, location_name: "Caribbean", coordinates: [18.2, -66.5], era: "1500s", context: "European colonizers built slave-powered sugar plantations, making sugar affordable for the masses.", influence_radius_km: 700 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Trade along Silk Road", duration_years: 500 },
                    { from: 2, to: 3, method: "Arab conquest and trade", duration_years: 200 },
                    { from: 3, to: 4, method: "Crusader contact and Mediterranean trade", duration_years: 400 },
                    { from: 4, to: 5, method: "Colonial expansion", duration_years: 400 }
                ]
            }
        },
        accent_color: "#D97706",
        root_family: "SANSKRIT_sharkara"
    },
    {
        word: "Pepper",
        definition: "A pungent hot-tasting spice prepared from dried peppercorns.",
        phonetic: "/ˈpɛpər/",
        visualization_type: "MAP",
        content_json: {
            hook: "Black pepper was so valuable that Roman soldiers were paid with it, and rent could be collected in peppercorns.",
            fun_fact: "The phrase 'peppercorn rent' (a tiny symbolic payment) survives in English law today — ironic for a spice once worth its weight in gold.",
            nerd_mode: { ipa_full: "/ˈpɛp.ə(ɹ)/ (both)", earliest_citation: "Old English 'pipor' from Latin 'piper', attested before 900 CE." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "India (Kerala)", coordinates: [10.8, 76.3], era: "2000 BCE", context: "Pepper grew wild in the Western Ghats. Tamil traders called it 'pippali'.", influence_radius_km: 400 },
                    { order: 2, location_name: "Rome", coordinates: [41.9, 12.5], era: "100 CE", context: "Romans were obsessed — Pliny complained about Rome's gold flowing east to buy pepper.", influence_radius_km: 500 },
                    { order: 3, location_name: "Venice", coordinates: [45.4, 12.3], era: "1200s", context: "Venetian merchants monopolized pepper trade, becoming fabulously wealthy.", influence_radius_km: 300 },
                    { order: 4, location_name: "Portugal (Lisbon)", coordinates: [38.7, -9.1], era: "1498", context: "Vasco da Gama sailed around Africa to buy pepper directly, breaking Venice's monopoly.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Spice trade via Red Sea and overland", duration_years: 1500 },
                    { from: 2, to: 3, method: "Mediterranean trade revival", duration_years: 1000 },
                    { from: 1, to: 4, method: "Portuguese sea route around Africa", duration_years: 100 }
                ]
            }
        },
        accent_color: "#92400E",
        root_family: "SANSKRIT_pippali"
    },
    {
        word: "Orange",
        definition: "A round citrus fruit with a tough bright reddish-yellow rind.",
        phonetic: "/ˈɒrɪndʒ/",
        visualization_type: "MAP",
        content_json: {
            hook: "Before oranges arrived in England, there was no word for the color — it was just called 'yellow-red'.",
            fun_fact: "The word passed through Sanskrit, Persian, Arabic, Spanish, and French before reaching English — losing its initial 'n' along the way ('a norange' became 'an orange').",
            nerd_mode: { ipa_full: "/ˈɒɹ.ɪndʒ/ (British), /ˈɔːɹ.ɪndʒ/ (American)", earliest_citation: "First recorded in English circa 1300 as 'orenge' from Old French." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "India / Southeast Asia", coordinates: [23.5, 85.0], era: "ancient", context: "The fruit originated in northeastern India. Sanskrit called it 'nāranga'.", influence_radius_km: 600 },
                    { order: 2, location_name: "Persia", coordinates: [32.7, 51.7], era: "300 BCE", context: "Persian traders carried the fruit west, calling it 'nārang'.", influence_radius_km: 400 },
                    { order: 3, location_name: "Spain (Seville)", coordinates: [37.4, -6.0], era: "700s", context: "Moors planted orange groves across Iberia. Arabic 'nāranj' became Spanish 'naranja'.", influence_radius_km: 300 },
                    { order: 4, location_name: "France", coordinates: [43.7, 7.3], era: "1300s", context: "French dropped the 'n' — 'une norenge' became 'une orenge' through misdivision.", influence_radius_km: 300 },
                    { order: 5, location_name: "England", coordinates: [51.5, -0.1], era: "1500s", context: "The fruit name replaced 'geoluhread' (yellow-red) as the name for the color itself.", influence_radius_km: 200 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Trade along ancient routes", duration_years: 500 },
                    { from: 2, to: 3, method: "Moorish conquest of Iberia", duration_years: 1000 },
                    { from: 3, to: 4, method: "French-Spanish trade", duration_years: 500 },
                    { from: 4, to: 5, method: "Anglo-French contact", duration_years: 200 }
                ]
            }
        },
        accent_color: "#EA580C",
        root_family: "SANSKRIT_naranga"
    },
    {
        word: "Lemon",
        definition: "A yellow oval citrus fruit with thick skin and fragrant acidic juice.",
        phonetic: "/ˈlɛmən/",
        visualization_type: "MAP",
        content_json: {
            hook: "When life gives you lemons, thank the Silk Road — they traveled 6,000 miles from the Himalayas to your kitchen.",
            fun_fact: "Lemons were originally grown as ornamental plants. It took centuries before anyone thought to eat them.",
            nerd_mode: { ipa_full: "/ˈlɛm.ən/ (both)", earliest_citation: "First in English circa 1400, from Old French 'limon', ultimately from Persian 'līmūn'." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "India (Assam)", coordinates: [26.1, 91.7], era: "ancient", context: "Wild lemons originated in the foothills of the Himalayas in northeastern India.", influence_radius_km: 400 },
                    { order: 2, location_name: "Persia", coordinates: [35.7, 51.4], era: "200 CE", context: "Persian 'līmūn' entered the language as an exotic ornamental fruit.", influence_radius_km: 400 },
                    { order: 3, location_name: "Egypt (Cairo)", coordinates: [30.0, 31.2], era: "900s", context: "Arab traders spread citrus across North Africa. Arabic 'laymūn' took root.", influence_radius_km: 500 },
                    { order: 4, location_name: "Italy (Sicily)", coordinates: [37.5, 14.2], era: "1100s", context: "Crusaders brought lemon trees to Sicily, where they thrived in the Mediterranean climate.", influence_radius_km: 300 },
                    { order: 5, location_name: "England", coordinates: [51.5, -0.1], era: "1400s", context: "British sailors would later discover lemons cured scurvy — though it took 300 years to figure out.", influence_radius_km: 200 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Silk Road trade", duration_years: 500 },
                    { from: 2, to: 3, method: "Arab trade networks", duration_years: 700 },
                    { from: 3, to: 4, method: "Crusader contact", duration_years: 200 },
                    { from: 4, to: 5, method: "Mediterranean trade", duration_years: 300 }
                ]
            }
        },
        accent_color: "#EAB308",
        root_family: "PERSIAN_limun"
    },
    {
        word: "Banana",
        definition: "A long curved tropical fruit with soft pulpy flesh and yellow skin when ripe.",
        phonetic: "/bəˈnænə/",
        visualization_type: "MAP",
        content_json: {
            hook: "The banana you eat is a genetic clone — and its name might come from an Arabic word for 'finger'.",
            fun_fact: "All commercial Cavendish bananas are genetically identical clones — a single disease could wipe them all out.",
            nerd_mode: { ipa_full: "/bəˈnɑː.nə/ (British), /bəˈnæn.ə/ (American)", earliest_citation: "First in English 1597, possibly from Wolof or via Portuguese from a West African language." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "Papua New Guinea", coordinates: [-6.3, 147.0], era: "8000 BCE", context: "The banana was one of the first plants ever domesticated by humans.", influence_radius_km: 600 },
                    { order: 2, location_name: "India", coordinates: [20.6, 79.0], era: "3000 BCE", context: "Ancient Sanskrit texts mention the banana. Alexander the Great encountered it here in 327 BCE.", influence_radius_km: 500 },
                    { order: 3, location_name: "West Africa", coordinates: [7.5, -1.5], era: "500 CE", context: "Bananas crossed the Indian Ocean to Africa. A local word — possibly Wolof 'banaana' — named them.", influence_radius_km: 500 },
                    { order: 4, location_name: "Caribbean", coordinates: [18.5, -69.9], era: "1516", context: "Portuguese and Spanish colonizers brought bananas to the New World from West Africa.", influence_radius_km: 500 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Austronesian maritime expansion", duration_years: 3000 },
                    { from: 2, to: 3, method: "Indian Ocean trade routes", duration_years: 3000 },
                    { from: 3, to: 4, method: "Colonial transplantation via Portuguese", duration_years: 1000 }
                ]
            }
        },
        accent_color: "#CA8A04",
        root_family: null
    },
    {
        word: "Chocolate",
        definition: "A food made from roasted and ground cacao seeds, typically sweetened.",
        phonetic: "/ˈtʃɒklɪt/",
        visualization_type: "MAP",
        content_json: {
            hook: "The Aztecs drank chocolate with chili peppers — sweetening it was Europe's radical invention.",
            fun_fact: "Aztec emperor Montezuma reportedly drank 50 cups of chocolate a day from golden goblets.",
            nerd_mode: { ipa_full: "/ˈtʃɒk.lɪt/ (British), /ˈtʃɑːk.lɪt/ (American)", earliest_citation: "First in English 1604 from Spanish 'chocolate', from Nahuatl 'xocolātl'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Mesoamerica (Olmec)", coordinates: [17.9, -94.8], era: "1500 BCE", context: "The Olmecs first cultivated cacao. The word likely derives from Nahuatl 'xocolātl' — bitter water.", influence_radius_km: 400 },
                    { order: 2, location_name: "Mexico (Tenochtitlan)", coordinates: [19.4, -99.1], era: "1400s", context: "Aztecs used cacao beans as currency. A turkey cost 100 beans. They drank it cold, spiced with chili.", influence_radius_km: 300 },
                    { order: 3, location_name: "Spain", coordinates: [40.4, -3.7], era: "1528", context: "Hernán Cortés brought cacao to Spain. Spanish monks added sugar and vanilla — chocolate was reborn.", influence_radius_km: 400 },
                    { order: 4, location_name: "Switzerland", coordinates: [46.9, 7.4], era: "1875", context: "Daniel Peter mixed chocolate with condensed milk, inventing milk chocolate.", influence_radius_km: 200 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Mesoamerican cultural exchange", duration_years: 2500 },
                    { from: 2, to: 3, method: "Spanish conquest", duration_years: 100 },
                    { from: 3, to: 4, method: "European trade", duration_years: 300 }
                ]
            }
        },
        accent_color: "#78350F",
        root_family: "NAHUATL_xocolatl"
    },
    {
        word: "Vanilla",
        definition: "A substance obtained from vanilla pods, used as a flavoring.",
        phonetic: "/vəˈnɪlə/",
        visualization_type: "MAP",
        content_json: {
            hook: "Vanilla means 'little sheath' in Spanish — a polite way of saying the pod looked like a certain body part.",
            fun_fact: "For 300 years, Mexico had a monopoly on vanilla because only local Melipona bees could pollinate it. A 12-year-old enslaved boy in Réunion cracked the secret in 1841.",
            nerd_mode: { ipa_full: "/vəˈnɪl.ə/ (both)", earliest_citation: "First in English 1662 from Spanish 'vainilla', diminutive of 'vaina' (sheath)." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "Mexico (Veracruz)", coordinates: [19.2, -96.1], era: "1400s", context: "The Totonac people cultivated vanilla orchids. Aztecs flavored their chocolate with it.", influence_radius_km: 300 },
                    { order: 2, location_name: "Spain", coordinates: [40.4, -3.7], era: "1520s", context: "Cortés brought vanilla to Europe. Spanish named it 'vainilla' — little sheath.", influence_radius_km: 400 },
                    { order: 3, location_name: "Réunion Island", coordinates: [-21.1, 55.5], era: "1841", context: "12-year-old Edmond Albius discovered hand-pollination, breaking Mexico's 300-year monopoly.", influence_radius_km: 300 },
                    { order: 4, location_name: "Madagascar", coordinates: [-18.9, 47.5], era: "1900s", context: "Madagascar became the world's largest vanilla producer using Albius's technique.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Spanish colonial trade", duration_years: 100 },
                    { from: 2, to: 3, method: "French colonial transplantation", duration_years: 300 },
                    { from: 3, to: 4, method: "Regional spread in Indian Ocean", duration_years: 60 }
                ]
            }
        },
        accent_color: "#A16207",
        root_family: "SPANISH_vaina"
    },
    {
        word: "Avocado",
        definition: "A pear-shaped tropical fruit with green or blackish skin and rich yellowish-green flesh.",
        phonetic: "/ˌævəˈkɑːdoʊ/",
        visualization_type: "MAP",
        content_json: {
            hook: "You're eating a fruit named after testicles — the Aztec word 'āhuacatl' meant exactly that.",
            fun_fact: "Spanish conquistadors couldn't pronounce 'āhuacatl' so they folk-etymologized it into 'aguacate', then it morphed into 'avocado' (which means 'lawyer' in old Spanish).",
            nerd_mode: { ipa_full: "/ˌæv.əˈkɑː.doʊ/ (American), /ˌæv.əˈkɑː.dəʊ/ (British)", earliest_citation: "First in English 1697 by physician Hans Sloane, written as 'avogato pear'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Mexico (Puebla)", coordinates: [19.0, -98.2], era: "5000 BCE", context: "Mesoamericans domesticated the avocado. Nahuatl called it 'āhuacatl' — testicle — for its shape.", influence_radius_km: 400 },
                    { order: 2, location_name: "Spain", coordinates: [40.4, -3.7], era: "1500s", context: "Conquistadors brought it to Europe, mangling the name into 'aguacate' then 'avocado'.", influence_radius_km: 300 },
                    { order: 3, location_name: "California (USA)", coordinates: [34.1, -118.2], era: "1871", context: "Judge R.B. Ord planted the first avocado trees in Santa Barbara from Mexican seeds.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Spanish colonial contact", duration_years: 100 },
                    { from: 2, to: 3, method: "New World cultivation expansion", duration_years: 300 }
                ]
            }
        },
        accent_color: "#4D7C0F",
        root_family: "NAHUATL_ahuacatl"
    },
    {
        word: "Silk",
        definition: "A fine strong soft lustrous fiber produced by silkworms.",
        phonetic: "/sɪlk/",
        visualization_type: "MAP",
        content_json: {
            hook: "China kept silk's recipe secret for 3,000 years — smuggling silkworm eggs was punishable by death.",
            fun_fact: "Legend says two monks smuggled silkworm eggs out of China inside hollow bamboo canes for Byzantine Emperor Justinian around 550 CE.",
            nerd_mode: { ipa_full: "/sɪlk/ (both)", earliest_citation: "Old English 'seolc' from Latin 'sericum', attested before 900 CE." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "China", coordinates: [34.3, 108.9], era: "3000 BCE", context: "Legend credits Empress Leizu with discovering silk when a cocoon fell into her tea.", influence_radius_km: 600 },
                    { order: 2, location_name: "Central Asia (Samarkand)", coordinates: [39.7, 66.9], era: "200 BCE", context: "The Silk Road connected East to West. Intermediaries grew rich as middlemen.", influence_radius_km: 500 },
                    { order: 3, location_name: "Rome", coordinates: [41.9, 12.5], era: "100 CE", context: "Romans paid astronomical prices for silk without knowing how it was made. Latin called it 'sericum' — Chinese cloth.", influence_radius_km: 400 },
                    { order: 4, location_name: "Constantinople", coordinates: [41.0, 29.0], era: "550 CE", context: "Monks smuggled silkworm eggs in bamboo canes, finally breaking China's monopoly.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Silk Road caravan trade", duration_years: 2000 },
                    { from: 2, to: 3, method: "Silk Road to Roman Empire", duration_years: 300 },
                    { from: 1, to: 4, method: "Espionage by Byzantine monks", duration_years: 500 }
                ]
            }
        },
        accent_color: "#7C3AED",
        root_family: "LATIN_sericum"
    },
    {
        word: "Cotton",
        definition: "A soft white fibrous substance surrounding the seeds of a tropical plant, used for textiles.",
        phonetic: "/ˈkɒtən/",
        visualization_type: "MAP",
        content_json: {
            hook: "Greeks thought cotton was 'tree wool' — they imagined tiny lambs growing on branches in India.",
            fun_fact: "Herodotus wrote that in India there were 'trees bearing fleece surpassing that of sheep' — the first European description of cotton.",
            nerd_mode: { ipa_full: "/ˈkɒt.ən/ (British), /ˈkɑːt.ən/ (American)", earliest_citation: "First in English circa 1300-1400 from Old French 'coton', from Arabic 'quṭn'." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "India (Indus Valley)", coordinates: [27.0, 68.0], era: "5000 BCE", context: "Cotton was domesticated along the Indus River — the oldest cotton fabric dates to 3000 BCE.", influence_radius_km: 500 },
                    { order: 2, location_name: "Arabia", coordinates: [24.5, 39.6], era: "600s", context: "Arab traders exported Indian cotton westward. Arabic 'quṭn' became the universal word.", influence_radius_km: 400 },
                    { order: 3, location_name: "Spain (Al-Andalus)", coordinates: [37.4, -6.0], era: "900s", context: "Moorish weavers brought cotton culture to Spain, where 'quṭn' became 'algodón'.", influence_radius_km: 300 },
                    { order: 4, location_name: "England (Manchester)", coordinates: [53.5, -2.2], era: "1700s", context: "The Industrial Revolution turned Manchester into 'Cottonopolis' — powered by slave-picked cotton.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Indian Ocean trade routes", duration_years: 4000 },
                    { from: 2, to: 3, method: "Arab-Moorish trade", duration_years: 300 },
                    { from: 2, to: 4, method: "Colonial trade via East India Company", duration_years: 1000 }
                ]
            }
        },
        accent_color: "#F5F5DC",
        root_family: "ARABIC_qutn"
    },
    {
        word: "Denim",
        definition: "A sturdy cotton twill fabric, typically blue, used for jeans.",
        phonetic: "/ˈdɛnɪm/",
        visualization_type: "MAP",
        content_json: {
            hook: "Your jeans are named after two cities: denim from Nîmes, France, and jeans from Genoa, Italy.",
            fun_fact: "Denim literally means 'from Nîmes' — 'serge de Nîmes' was shortened to 'de Nîmes' then 'denim'.",
            nerd_mode: { ipa_full: "/ˈdɛn.ɪm/ (both)", earliest_citation: "First in English 1695 as 'serge de Nîmes'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Nîmes, France", coordinates: [43.8, 4.4], era: "1600s", context: "Weavers in Nîmes produced 'serge de Nîmes' — a durable twill later shortened to 'denim'.", influence_radius_km: 200 },
                    { order: 2, location_name: "Genoa, Italy", coordinates: [44.4, 8.9], era: "1500s", context: "Genoese sailors wore sturdy cotton trousers. French called the fabric 'Gênes' — which became 'jeans'.", influence_radius_km: 200 },
                    { order: 3, location_name: "San Francisco, USA", coordinates: [37.8, -122.4], era: "1853", context: "Levi Strauss sold denim work pants to Gold Rush miners. Jacob Davis added rivets in 1873.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 3, method: "Fabric export to the Americas", duration_years: 200 },
                    { from: 2, to: 3, method: "Cultural and trade contact", duration_years: 300 }
                ]
            }
        },
        accent_color: "#1D4ED8",
        root_family: null
    },
    {
        word: "Khaki",
        definition: "A dull brownish-yellow color, or fabric of this color used for military clothing.",
        phonetic: "/ˈkɑːki/",
        visualization_type: "MAP",
        content_json: {
            hook: "British soldiers dyed their white uniforms with tea and mud in India — and borrowed the Urdu word for 'dusty'.",
            fun_fact: "Sir Harry Lumsden's Corps of Guides first wore khaki in 1848 on the North-West Frontier. They literally rolled in dust to camouflage themselves.",
            nerd_mode: { ipa_full: "/ˈkɑː.ki/ (British), /ˈkæk.i/ (American)", earliest_citation: "First in English 1848, from Urdu/Hindi 'khākī' meaning 'dust-colored'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "India (Punjab)", coordinates: [31.5, 74.3], era: "1848", context: "British officers adopted dust-colored uniforms. Urdu 'khākī' (dusty) entered English.", influence_radius_km: 400 },
                    { order: 2, location_name: "South Africa", coordinates: [-33.9, 18.4], era: "1899", context: "Boer War proved white uniforms were death traps. The British Army adopted khaki universally.", influence_radius_km: 500 },
                    { order: 3, location_name: "United States", coordinates: [38.9, -77.0], era: "1900s", context: "Khaki became standard US military wear and eventually casual fashion.", influence_radius_km: 600 }
                ],
                routes: [
                    { from: 1, to: 2, method: "British colonial military", duration_years: 50 },
                    { from: 2, to: 3, method: "Military adoption globally", duration_years: 20 }
                ]
            }
        },
        accent_color: "#A0522D",
        root_family: "URDU_khak"
    },
    {
        word: "Pajama",
        definition: "A suit of loose trousers and a jacket for sleeping in.",
        phonetic: "/pəˈdʒɑːmə/",
        visualization_type: "MAP",
        content_json: {
            hook: "You sleep in clothes named 'leg garments' in Persian — worn by Mughal emperors in their private chambers.",
            fun_fact: "In Hindi/Urdu, 'pāy-jāma' literally means 'leg clothing' — 'pāy' (leg) + 'jāma' (garment). British colonists loved them so much they brought the fashion home.",
            nerd_mode: { ipa_full: "/pəˈdʒɑː.mə/ (British), /pəˈdʒæm.ə/ (American)", earliest_citation: "First in English circa 1800 from Urdu/Hindi 'pāyjāmā', from Persian." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Persia", coordinates: [35.7, 51.4], era: "ancient", context: "Persian 'pāy-jāma' (leg garment) described loose trousers worn by both men and women.", influence_radius_km: 400 },
                    { order: 2, location_name: "India (Mughal Court)", coordinates: [28.6, 77.2], era: "1600s", context: "Mughal nobility wore elegant pajamas. British East India Company officers adopted them as loungewear.", influence_radius_km: 500 },
                    { order: 3, location_name: "England", coordinates: [51.5, -0.1], era: "1800s", context: "Returning colonists brought pajamas home. They replaced nightshirts as the fashionable sleepwear.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Mughal cultural influence", duration_years: 500 },
                    { from: 2, to: 3, method: "British East India Company", duration_years: 200 }
                ]
            }
        },
        accent_color: "#6D28D9",
        root_family: "PERSIAN_payjama"
    },
    {
        word: "Shampoo",
        definition: "A liquid preparation for washing the hair.",
        phonetic: "/ʃæmˈpuː/",
        visualization_type: "MAP",
        content_json: {
            hook: "Your shower routine comes from a Hindi word meaning 'to press' — because shampoo started as a head massage.",
            fun_fact: "Sake Dean Mahomed, an Indian immigrant, opened Europe's first 'shampooing' bath in Brighton in 1814. He became 'Shampooing Surgeon' to King George IV.",
            nerd_mode: { ipa_full: "/ʃæmˈpuː/ (both)", earliest_citation: "First in English 1762, from Hindi 'chāmpō' (imperative of 'chāmpnā', to press/massage)." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "India", coordinates: [28.6, 77.2], era: "ancient", context: "Hindi 'chāmpnā' meant to press or massage. Head massage with oils was a daily ritual.", influence_radius_km: 500 },
                    { order: 2, location_name: "Brighton, England", coordinates: [50.8, -0.1], era: "1814", context: "Sake Dean Mahomed opened 'Mahomed's Indian Vapour Baths', offering shampooing — luxurious head massages.", influence_radius_km: 200 },
                    { order: 3, location_name: "Berlin, Germany", coordinates: [52.5, 13.4], era: "1903", context: "Hans Schwarzkopf invented the first liquid shampoo — the word shifted from massage to hair washing.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 2, method: "British colonial cultural exchange", duration_years: 100 },
                    { from: 2, to: 3, method: "European commercial innovation", duration_years: 90 }
                ]
            }
        },
        accent_color: "#0891B2",
        root_family: "HINDI_champo"
    },
    {
        word: "Jungle",
        definition: "An area of land overgrown with dense forest and tangled vegetation.",
        phonetic: "/ˈdʒʌŋɡəl/",
        visualization_type: "MAP",
        content_json: {
            hook: "In Hindi, 'jungle' just means 'wasteland' — the English twisted it into something wild and terrifying.",
            fun_fact: "Sanskrit 'jaṅgala' meant dry, barren ground — the opposite of what English speakers imagine.",
            nerd_mode: { ipa_full: "/ˈdʒʌŋ.ɡəl/ (both)", earliest_citation: "First in English 1776 from Hindi/Marathi 'jangal', from Sanskrit 'jaṅgala'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "India", coordinates: [23.0, 80.0], era: "ancient", context: "Sanskrit 'jaṅgala' meant arid wasteland — not lush forest. Hindi 'jangal' meant any wild, uncultivated land.", influence_radius_km: 600 },
                    { order: 2, location_name: "British India", coordinates: [22.6, 88.4], era: "1776", context: "British colonists used 'jungle' for the dense Bengali forests they encountered — shifting its meaning entirely.", influence_radius_km: 400 },
                    { order: 3, location_name: "England", coordinates: [51.5, -0.1], era: "1894", context: "Kipling's 'The Jungle Book' cemented the word's association with dense, dangerous tropical forest.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Hindi usage by British colonists", duration_years: 200 },
                    { from: 2, to: 3, method: "Literary and colonial English", duration_years: 100 }
                ]
            }
        },
        accent_color: "#15803D",
        root_family: "SANSKRIT_jangala"
    },
    {
        word: "Veranda",
        definition: "A roofed platform along the outside of a house, open at the front.",
        phonetic: "/vəˈrændə/",
        visualization_type: "MAP",
        content_json: {
            hook: "Three languages claim 'veranda' — Portuguese, Hindi, and Bengali — and linguists still argue about who's right.",
            fun_fact: "The word may come from Portuguese 'varanda' (railing), Hindi 'varandā', or even Bengali 'bārāndā'. Its true origin is genuinely disputed.",
            nerd_mode: { ipa_full: "/vəˈræn.də/ (both)", disputed_origin: "Possibly from Portuguese 'varanda', or Hindi/Bengali. Origin contested among etymologists.", earliest_citation: "First in English 1711, likely via Hindi from colonial India." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "India", coordinates: [20.0, 77.0], era: "ancient", context: "Hindi 'varandā' described the open galleries found in traditional Indian architecture.", influence_radius_km: 500 },
                    { order: 2, location_name: "Portugal", coordinates: [38.7, -9.1], era: "1500s", context: "Portuguese 'varanda' (railing/balcony) may have influenced or been influenced by the Hindi term.", influence_radius_km: 300 },
                    { order: 3, location_name: "England", coordinates: [51.5, -0.1], era: "1711", context: "British colonists brought the word — and the architectural concept — home from India.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 3, method: "British East India Company", duration_years: 200 },
                    { from: 2, to: 1, method: "Portuguese colonial contact (Goa)", duration_years: 100 }
                ]
            }
        },
        accent_color: "#B45309",
        root_family: null
    },
    {
        word: "Bungalow",
        definition: "A low-built house with a broad front porch, typically having only one story.",
        phonetic: "/ˈbʌŋɡəloʊ/",
        visualization_type: "MAP",
        content_json: {
            hook: "Every suburban bungalow is named after Bengal — 'bangla' meant 'in the Bengali style'.",
            fun_fact: "British colonists built quick one-story houses in Bengal modeled on local huts, calling them 'bangla' (Bengali) houses.",
            nerd_mode: { ipa_full: "/ˈbʌŋ.ɡə.ləʊ/ (British), /ˈbʌŋ.ɡə.loʊ/ (American)", earliest_citation: "First in English 1676 from Hindi 'banglā', meaning 'belonging to Bengal'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Bengal, India", coordinates: [22.6, 88.4], era: "1600s", context: "Local 'bangla' huts inspired British colonial architecture — simple, single-story, with wide verandas.", influence_radius_km: 400 },
                    { order: 2, location_name: "England", coordinates: [51.5, -0.1], era: "1700s", context: "The word entered English as 'bungalow' — a cheap, single-story house for colonial officials.", influence_radius_km: 300 },
                    { order: 3, location_name: "California, USA", coordinates: [34.1, -118.2], era: "1900s", context: "The California Bungalow became America's first mass-produced housing style.", influence_radius_km: 500 }
                ],
                routes: [
                    { from: 1, to: 2, method: "British East India Company", duration_years: 100 },
                    { from: 2, to: 3, method: "Architectural export to colonies", duration_years: 200 }
                ]
            }
        },
        accent_color: "#92400E",
        root_family: "HINDI_bangla"
    },
    {
        word: "Tsunami",
        definition: "A long high sea wave caused by an earthquake or other disturbance.",
        phonetic: "/tsuːˈnɑːmi/",
        visualization_type: "MAP",
        content_json: {
            hook: "Japanese fishermen coined 'tsunami' because they'd return to harbor to find it destroyed — yet noticed nothing at sea.",
            fun_fact: "'Tsu' (harbor) + 'nami' (wave) — harbor wave. In open ocean, tsunamis are barely noticeable; they only become monstrous near shore.",
            nerd_mode: { ipa_full: "/tsuːˈnɑː.mi/ (both, sometimes /suːˈnɑː.mi/)", earliest_citation: "Used in Japanese for centuries; entered English scientific writing in 1897." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "Japan", coordinates: [36.2, 138.3], era: "ancient", context: "Japanese fishermen named the phenomenon 'tsu-nami' (harbor wave) because the wave was invisible at sea.", influence_radius_km: 400 },
                    { order: 2, location_name: "Hawaii", coordinates: [19.9, -155.6], era: "1946", context: "A devastating tsunami struck Hilo, killing 159. Scientists began pushing for the Japanese term internationally.", influence_radius_km: 600 },
                    { order: 3, location_name: "Indian Ocean", coordinates: [3.3, 95.9], era: "2004", context: "The Boxing Day tsunami killed 230,000 people. The word 'tsunami' became universally known overnight.", influence_radius_km: 800 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Scientific adoption", duration_years: 50 },
                    { from: 2, to: 3, method: "Global scientific and media usage", duration_years: 60 }
                ]
            }
        },
        accent_color: "#0284C7",
        root_family: "JAPANESE_tsunami"
    },
    {
        word: "Guitar",
        definition: "A stringed musical instrument with a flat body and a fretted neck.",
        phonetic: "/ɡɪˈtɑːr/",
        visualization_type: "MAP",
        content_json: {
            hook: "The guitar's ancestors were carved from tortoise shells in ancient Persia 3,500 years ago.",
            fun_fact: "Greek 'kithara' and Persian 'tar' (string) may have combined or influenced each other. The Spanish 'guitarra' gave us the modern word and instrument shape.",
            nerd_mode: { ipa_full: "/ɡɪˈtɑː(ɹ)/ (British), /ɡɪˈtɑːɹ/ (American)", earliest_citation: "First in English circa 1621 from Spanish 'guitarra', from Arabic 'qīṯāra', from Greek 'kithara'." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Persia", coordinates: [32.4, 53.7], era: "1500 BCE", context: "Ancient Persians had 'tar' instruments — the word itself means 'string' in Persian.", influence_radius_km: 400 },
                    { order: 2, location_name: "Greece", coordinates: [37.9, 23.7], era: "600 BCE", context: "The Greek 'kithara' was a refined lyre played by professionals. Its name influenced all later forms.", influence_radius_km: 300 },
                    { order: 3, location_name: "Moorish Spain", coordinates: [37.2, -3.6], era: "700s", context: "Arab musicians brought the 'oud' and 'qīṯāra' to Iberia, creating the proto-guitar.", influence_radius_km: 300 },
                    { order: 4, location_name: "Spain", coordinates: [40.4, -3.7], era: "1500s", context: "The modern six-string 'guitarra' emerged in Spain, replacing the lute as the people's instrument.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Ancient Eastern Mediterranean trade", duration_years: 900 },
                    { from: 2, to: 3, method: "Moorish conquest and cultural exchange", duration_years: 1300 },
                    { from: 3, to: 4, method: "Spanish cultural evolution", duration_years: 800 }
                ]
            }
        },
        accent_color: "#B45309",
        root_family: "GREEK_kithara"
    },
    {
        word: "Ukulele",
        definition: "A small four-stringed guitar of Hawaiian origin.",
        phonetic: "/ˌjuːkəˈleɪli/",
        visualization_type: "MAP",
        content_json: {
            hook: "Ukulele means 'jumping flea' — named after a tiny Brit whose fingers danced across the strings.",
            fun_fact: "Edward Purvis, a small, nimble British officer in Hawaii, played the Portuguese machete so energetically that Hawaiians nicknamed him 'ʻukulele' (jumping flea).",
            nerd_mode: { ipa_full: "/ˌjuː.kəˈleɪ.li/ (English), /ˌʔu.kuˈle.le/ (Hawaiian)", earliest_citation: "First in English circa 1896, from Hawaiian 'ʻukulele'." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "Madeira, Portugal", coordinates: [32.6, -16.9], era: "1800s", context: "Portuguese craftsmen built a small guitar called the 'machete' or 'cavaquinho'.", influence_radius_km: 200 },
                    { order: 2, location_name: "Hawaii", coordinates: [21.3, -157.8], era: "1879", context: "Portuguese immigrants arrived on the SS Ravenscrag. They played their machetes on deck. Hawaiians loved it.", influence_radius_km: 300 },
                    { order: 3, location_name: "United States", coordinates: [37.8, -122.4], era: "1915", context: "Panama-Pacific Exposition in San Francisco introduced the ukulele to mainland America.", influence_radius_km: 600 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Portuguese labor migration", duration_years: 50 },
                    { from: 2, to: 3, method: "Hawaiian cultural export", duration_years: 36 }
                ]
            }
        },
        accent_color: "#D97706",
        root_family: "HAWAIIAN_ukulele"
    },
    {
        word: "Safari",
        definition: "An expedition to observe or hunt animals in their natural habitat, especially in East Africa.",
        phonetic: "/səˈfɑːri/",
        visualization_type: "MAP",
        content_json: {
            hook: "Safari comes from Arabic — it simply means 'journey'. The lions were optional.",
            fun_fact: "Swahili borrowed 'safari' from Arabic 'safar' (journey). It entered English through 19th-century African exploration.",
            nerd_mode: { ipa_full: "/səˈfɑːɹ.i/ (both)", earliest_citation: "First in English 1860 from Swahili 'safari', from Arabic 'safar' (journey)." },
            visual_data: {
                type: "MAP", projection: "orthographic",
                points: [
                    { order: 1, location_name: "Arabia", coordinates: [24.5, 39.6], era: "ancient", context: "Arabic 'safar' (journey/travel) was a common word for any expedition.", influence_radius_km: 400 },
                    { order: 2, location_name: "East Africa (Zanzibar)", coordinates: [-6.2, 39.2], era: "800s", context: "Arab traders brought 'safar' to the Swahili coast. It became 'safari' in Swahili.", influence_radius_km: 500 },
                    { order: 3, location_name: "England", coordinates: [51.5, -0.1], era: "1860", context: "British explorers like Burton and Speke used 'safari' in their writings about African expeditions.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Arab-Swahili trade networks", duration_years: 800 },
                    { from: 2, to: 3, method: "British colonial exploration", duration_years: 100 }
                ]
            }
        },
        accent_color: "#B45309",
        root_family: "ARABIC_safar"
    },
    {
        word: "Ketchup",
        definition: "A smooth sauce made chiefly from tomatoes and vinegar, used as a condiment.",
        phonetic: "/ˈkɛtʃəp/",
        visualization_type: "MAP",
        content_json: {
            hook: "Ketchup was originally a fermented fish sauce from Southeast Asia — tomatoes weren't added for 200 years.",
            fun_fact: "The original ketchup was 'kê-tsiap' — a fermented fish brine from the Fujian region of China, nothing like the tomato sauce we know.",
            nerd_mode: { ipa_full: "/ˈkɛtʃ.əp/ (both)", earliest_citation: "First in English 1690 as 'catchup', from Malay 'kecap' or Hokkien 'kê-tsiap'." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "China (Fujian)", coordinates: [25.0, 118.0], era: "ancient", context: "Hokkien speakers made 'kê-tsiap' — a fermented fish sauce used as a condiment.", influence_radius_km: 400 },
                    { order: 2, location_name: "Southeast Asia (Malaysia)", coordinates: [3.1, 101.7], era: "1600s", context: "Malay 'kecap' (fermented soy sauce) traveled with Chinese traders throughout the region.", influence_radius_km: 400 },
                    { order: 3, location_name: "England", coordinates: [51.5, -0.1], era: "1690", context: "British sailors brought the sauce home. Cooks experimented with mushroom and walnut versions.", influence_radius_km: 300 },
                    { order: 4, location_name: "Philadelphia, USA", coordinates: [39.9, -75.2], era: "1812", context: "James Mease published the first tomato ketchup recipe. Heinz bottled it in 1876.", influence_radius_km: 400 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Chinese migration and trade", duration_years: 500 },
                    { from: 2, to: 3, method: "British East India Company sailors", duration_years: 100 },
                    { from: 3, to: 4, method: "Colonial American reinvention", duration_years: 120 }
                ]
            }
        },
        accent_color: "#DC2626",
        root_family: "HOKKIEN_ketsiap"
    },
    {
        word: "Typhoon",
        definition: "A tropical storm in the region of the western Pacific Ocean.",
        phonetic: "/taɪˈfuːn/",
        visualization_type: "MAP",
        content_json: {
            hook: "Three languages collided in one word: Arabic 'tufan', Chinese 'tai fung', and Greek 'typhon' — all meaning destructive wind.",
            fun_fact: "It's one of the rare words with triple etymology — Arabic, Chinese, and Greek all contribute, and scholars still debate who was first.",
            nerd_mode: { ipa_full: "/taɪˈfuːn/ (both)", disputed_origin: "Likely influenced by all three: Arabic 'ṭūfān' (flood), Cantonese 'daai6 fung1' (big wind), and Greek 'Typhon' (monster).", earliest_citation: "First in English 1588, influenced by Portuguese contact in Asia." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "Greece", coordinates: [37.9, 23.7], era: "ancient", context: "Greek mythology had Typhon — a terrifying wind monster. 'Typhōn' entered Latin as an exotic storm word.", influence_radius_km: 300 },
                    { order: 2, location_name: "Arabia", coordinates: [24.5, 39.6], era: "600s", context: "Arabic 'ṭūfān' (flood, deluge) traveled with Islamic traders to South and East Asia.", influence_radius_km: 400 },
                    { order: 3, location_name: "China (Canton)", coordinates: [23.1, 113.3], era: "1500s", context: "Cantonese 'daai6 fung1' (big wind) merged with the Portuguese-transmitted word.", influence_radius_km: 400 },
                    { order: 4, location_name: "Portugal / England", coordinates: [38.7, -9.1], era: "1588", context: "Portuguese and English sailors blended all three origins into 'typhoon'.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 4, method: "Classical literary tradition", duration_years: 2000 },
                    { from: 2, to: 3, method: "Arab trade routes to East Asia", duration_years: 900 },
                    { from: 3, to: 4, method: "Portuguese maritime contact", duration_years: 100 }
                ]
            }
        },
        accent_color: "#1E293B",
        root_family: null
    },
    {
        word: "Algebra",
        definition: "The part of mathematics in which letters and symbols represent numbers and quantities.",
        phonetic: "/ˈældʒɪbrə/",
        visualization_type: "MAP",
        content_json: {
            hook: "Algebra is Arabic for 'the reunion of broken parts' — it was literally about setting bones before it was about solving equations.",
            fun_fact: "Al-Khwarizmi's 9th-century book 'al-Kitāb al-Mukhtaṣar fī Ḥisāb al-Jabr wal-Muqābala' gave us both 'algebra' (al-jabr) and 'algorithm' (from his name).",
            nerd_mode: { ipa_full: "/ˈæl.dʒɪ.bɹə/ (both)", earliest_citation: "First in English 1541 from Medieval Latin 'algebra', from Arabic 'al-jabr' (reunion of broken parts)." },
            visual_data: {
                type: "MAP", projection: "mercator",
                points: [
                    { order: 1, location_name: "Baghdad (House of Wisdom)", coordinates: [33.3, 44.4], era: "820 CE", context: "Al-Khwarizmi wrote his foundational algebra text at the Abbasid House of Wisdom.", influence_radius_km: 500 },
                    { order: 2, location_name: "Córdoba, Spain", coordinates: [37.9, -4.8], era: "1000s", context: "Moorish scholars translated Arabic mathematical texts into Latin in Al-Andalus.", influence_radius_km: 300 },
                    { order: 3, location_name: "Italy", coordinates: [41.9, 12.5], era: "1200s", context: "Fibonacci (Leonardo of Pisa) helped introduce Arabic numerals and algebra to Europe.", influence_radius_km: 400 },
                    { order: 4, location_name: "England", coordinates: [51.5, -0.1], era: "1557", context: "Robert Recorde introduced the equals sign (=) in 'The Whetstone of Witte'.", influence_radius_km: 300 }
                ],
                routes: [
                    { from: 1, to: 2, method: "Islamic scholarly networks", duration_years: 200 },
                    { from: 2, to: 3, method: "Translation movement via Toledo", duration_years: 200 },
                    { from: 3, to: 4, method: "Renaissance scholarly exchange", duration_years: 300 }
                ]
            }
        },
        accent_color: "#0E7490",
        root_family: "ARABIC_aljabr"
    }
];
