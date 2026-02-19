/* eslint-disable */
// 25 GRID visualization words — cross-linguistic comparison
// Skip: Tsunami (used in MAP)
export const gridWords = [
    {
        word: "Mother",
        definition: "A female parent.",
        phonetic: "/ˈmʌðər/",
        visualization_type: "GRID",
        content_json: {
            hook: "The word for 'mother' sounds almost identical in languages separated by 8,000 years — it's one of humanity's oldest words.",
            fun_fact: "PIE *méh₂tēr has survived remarkably intact. From Sanskrit 'mātṛ' to Latin 'mater' to English 'mother' — the word barely changed in 5,000+ years.",
            nerd_mode: { ipa_full: "/ˈmʌð.ə(ɹ)/ (British), /ˈmʌð.ɚ/ (American)", earliest_citation: "Old English 'mōdor', from Proto-Germanic '*mōdēr', from PIE '*méh₂tēr'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Mātṛ", script: "मातृ", script_type: "Devanagari", pronunciation: "/maːtɹ̩/" },
                    { name: "Latin", word: "Mater", script: "Mater", script_type: "Latin", pronunciation: "/ˈma.ter/" },
                    { name: "Greek", word: "Mḗtēr", script: "Μήτηρ", script_type: "Greek", pronunciation: "/mɛ̌ː.tɛːr/" },
                    { name: "Russian", word: "Mat'", script: "Мать", script_type: "Cyrillic", pronunciation: "/matʲ/" },
                    { name: "German", word: "Mutter", script: "Mutter", script_type: "Latin", pronunciation: "/ˈmʊ.tɐ/" },
                    { name: "Persian", word: "Mādar", script: "مادر", script_type: "Arabic", pronunciation: "/mɒːˈdæɾ/" }
                ]
            }
        },
        accent_color: "#E11D48",
        root_family: "PIE_mehter"
    },
    {
        word: "Father",
        definition: "A male parent.",
        phonetic: "/ˈfɑːðər/",
        visualization_type: "GRID",
        content_json: {
            hook: "From Sanskrit 'pitṛ' to English 'father' — the word has echoed across 50 languages for 6,000 years.",
            fun_fact: "PIE *ph₂tḗr is one of the most confidently reconstructed proto-words. The p→f shift in Germanic (Grimm's Law) is what changed 'pater' to 'father'.",
            nerd_mode: { ipa_full: "/ˈfɑː.ðə(ɹ)/ (British), /ˈfɑː.ðɚ/ (American)", earliest_citation: "Old English 'fæder', from Proto-Germanic '*fadēr', from PIE '*ph₂tḗr'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Pitṛ", script: "पितृ", script_type: "Devanagari", pronunciation: "/pi.tɹ̩/" },
                    { name: "Latin", word: "Pater", script: "Pater", script_type: "Latin", pronunciation: "/ˈpa.ter/" },
                    { name: "Greek", word: "Patḗr", script: "Πατήρ", script_type: "Greek", pronunciation: "/pa.tɛ̌ːr/" },
                    { name: "German", word: "Vater", script: "Vater", script_type: "Latin", pronunciation: "/ˈfaː.tɐ/" },
                    { name: "Persian", word: "Pedar", script: "پدر", script_type: "Arabic", pronunciation: "/peˈdæɾ/" },
                    { name: "Irish", word: "Athair", script: "Athair", script_type: "Latin", pronunciation: "/ˈa.həɾʲ/" }
                ]
            }
        },
        accent_color: "#1D4ED8",
        root_family: "PIE_phter"
    },
    {
        word: "Water",
        definition: "A colorless, transparent, odorless liquid essential for life.",
        phonetic: "/ˈwɔːtər/",
        visualization_type: "GRID",
        content_json: {
            hook: "Russian 'voda', English 'water', Hittite 'watar' — the same word has quenched thirst for 4,000 years.",
            fun_fact: "PIE *wódr̥ is one of the oldest reconstructable words. Vodka comes from Russian 'voda' (water) + diminutive '-ka' — little water.",
            nerd_mode: { ipa_full: "/ˈwɔː.tə(ɹ)/ (British), /ˈwɑː.t̬ɚ/ (American)", earliest_citation: "Old English 'wæter', from Proto-Germanic '*watōr', from PIE '*wódr̥'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Hittite", word: "Watar", script: "Watar", script_type: "Latin", pronunciation: "/wa.tar/" },
                    { name: "Russian", word: "Voda", script: "Вода", script_type: "Cyrillic", pronunciation: "/vɐˈda/" },
                    { name: "German", word: "Wasser", script: "Wasser", script_type: "Latin", pronunciation: "/ˈva.sɐ/" },
                    { name: "Greek", word: "Hydōr", script: "Ὕδωρ", script_type: "Greek", pronunciation: "/hý.dɔːr/" },
                    { name: "Swedish", word: "Vatten", script: "Vatten", script_type: "Latin", pronunciation: "/ˈvat.ən/" },
                    { name: "Lithuanian", word: "Vanduo", script: "Vanduo", script_type: "Latin", pronunciation: "/vɐnˈduo/" }
                ]
            }
        },
        accent_color: "#0284C7",
        root_family: "PIE_wodr"
    },
    {
        word: "Fire",
        definition: "Combustion producing light and heat.",
        phonetic: "/ˈfaɪər/",
        visualization_type: "GRID",
        content_json: {
            hook: "Fire has two competing PIE roots — Germanic went with one (*péh₂wr̥), Greek and Latin chose the other (*h₁n̥gʷnis).",
            fun_fact: "English 'fire' comes from PIE *péh₂wr̥, which also gave Czech 'pýř'. But Latin 'ignis' and Sanskrit 'agni' come from a different root entirely.",
            nerd_mode: { ipa_full: "/ˈfaɪ.ə(ɹ)/ (British), /ˈfaɪ.ɚ/ (American)", earliest_citation: "Old English 'fȳr', from Proto-Germanic '*fūr', from PIE '*péh₂wr̥'." },
            visual_data: {
                type: "GRID", pattern: "parallel", languages: [
                    { name: "English", word: "Fire", script: "Fire", script_type: "Latin", pronunciation: "/faɪ.ər/" },
                    { name: "German", word: "Feuer", script: "Feuer", script_type: "Latin", pronunciation: "/ˈfɔʏ.ɐ/" },
                    { name: "Greek", word: "Pyr", script: "Πῦρ", script_type: "Greek", pronunciation: "/pŷːr/" },
                    { name: "Czech", word: "Pýř", script: "Pýř", script_type: "Latin", pronunciation: "/piːr̝/" },
                    { name: "Sanskrit", word: "Agni", script: "अग्नि", script_type: "Devanagari", pronunciation: "/ɐɡ.ni/" },
                    { name: "Latin", word: "Ignis", script: "Ignis", script_type: "Latin", pronunciation: "/ˈiɡ.nis/" }
                ]
            }
        },
        accent_color: "#DC2626",
        root_family: "PIE_pehwr"
    },
    {
        word: "Star",
        definition: "A luminous point in the night sky which is a large, remote, incandescent body.",
        phonetic: "/stɑːr/",
        visualization_type: "GRID",
        content_json: {
            hook: "From Sanskrit 'stṛ' to English 'star' — humans have been naming the same lights with the same word for millennia.",
            fun_fact: "PIE *h₂stḗr is remarkably preserved. Latin 'stella', Greek 'aster', Persian 'setāre' — all point to the same prehistoric root.",
            nerd_mode: { ipa_full: "/stɑː(ɹ)/ (British), /stɑːɹ/ (American)", earliest_citation: "Old English 'steorra', from Proto-Germanic '*sternō', from PIE '*h₂stḗr'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Stṛ", script: "स्तृ", script_type: "Devanagari", pronunciation: "/stɹ̩/" },
                    { name: "Greek", word: "Astḗr", script: "Ἀστήρ", script_type: "Greek", pronunciation: "/as.tɛ̌ːr/" },
                    { name: "Latin", word: "Stella", script: "Stella", script_type: "Latin", pronunciation: "/ˈstel.la/" },
                    { name: "Persian", word: "Setāre", script: "ستاره", script_type: "Arabic", pronunciation: "/se.tɒː.ɾe/" },
                    { name: "German", word: "Stern", script: "Stern", script_type: "Latin", pronunciation: "/ʃtɛʁn/" },
                    { name: "Russian", word: "Zvezda", script: "Звезда", script_type: "Cyrillic", pronunciation: "/zvʲɪzˈda/" }
                ]
            }
        },
        accent_color: "#EAB308",
        root_family: "PIE_hster"
    },
    {
        word: "Sun",
        definition: "The star around which the earth orbits.",
        phonetic: "/sʌn/",
        visualization_type: "GRID",
        content_json: {
            hook: "In almost every language, the sun's name traces back to the same ancient syllable — PIE *sóh₂wl̥.",
            fun_fact: "Latin 'sol', Greek 'helios', and English 'sun' all descend from PIE *sóh₂wl̥. The Germanic languages shifted the word more dramatically than the Romance ones.",
            nerd_mode: { ipa_full: "/sʌn/ (both)", earliest_citation: "Old English 'sunne', from Proto-Germanic '*sunnōn', from PIE '*sóh₂wl̥'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Latin", word: "Sol", script: "Sol", script_type: "Latin", pronunciation: "/sol/" },
                    { name: "Greek", word: "Hēlios", script: "Ἥλιος", script_type: "Greek", pronunciation: "/hɛ̌ː.li.os/" },
                    { name: "Sanskrit", word: "Sūrya", script: "सूर्य", script_type: "Devanagari", pronunciation: "/suːr.jɐ/" },
                    { name: "German", word: "Sonne", script: "Sonne", script_type: "Latin", pronunciation: "/ˈzɔ.nə/" },
                    { name: "Russian", word: "Solntse", script: "Солнце", script_type: "Cyrillic", pronunciation: "/ˈson.t͡sə/" },
                    { name: "Welsh", word: "Haul", script: "Haul", script_type: "Latin", pronunciation: "/haɨl/" }
                ]
            }
        },
        accent_color: "#F59E0B",
        root_family: "PIE_sohwl"
    },
    {
        word: "Moon",
        definition: "The natural satellite of the earth.",
        phonetic: "/muːn/",
        visualization_type: "GRID",
        content_json: {
            hook: "Moon, month, measure — all from the same root. Ancient humans used the moon as their first calendar.",
            fun_fact: "PIE *meh₁- meant 'to measure'. The moon measured time (months). Latin 'mēnsis' (month) and 'mēnsūra' (measure) share this root.",
            nerd_mode: { ipa_full: "/muːn/ (both)", earliest_citation: "Old English 'mōna', from Proto-Germanic '*mēnōn', from PIE '*meh₁n̥s' (moon, month)." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Latin", word: "Luna", script: "Luna", script_type: "Latin", pronunciation: "/ˈluː.na/" },
                    { name: "Greek", word: "Mḗnē", script: "Μήνη", script_type: "Greek", pronunciation: "/mɛ̌ː.nɛː/" },
                    { name: "Sanskrit", word: "Mās", script: "मास्", script_type: "Devanagari", pronunciation: "/maːs/" },
                    { name: "Russian", word: "Luna / Mesyats", script: "Луна", script_type: "Cyrillic", pronunciation: "/lʊˈna/" },
                    { name: "German", word: "Mond", script: "Mond", script_type: "Latin", pronunciation: "/moːnt/" },
                    { name: "Lithuanian", word: "Mėnuo", script: "Mėnuo", script_type: "Latin", pronunciation: "/ˈmʲeː.nuo/" }
                ]
            }
        },
        accent_color: "#334155",
        root_family: "PIE_mehns"
    },
    {
        word: "Night",
        definition: "The period of darkness between sunset and sunrise.",
        phonetic: "/naɪt/",
        visualization_type: "GRID",
        content_json: {
            hook: "From Sanskrit 'nakta' to Latin 'nox' to English 'night' — darkness has carried the same name for 6,000 years.",
            fun_fact: "PIE *nókʷts is one of the most stable words in human language. The 'gh' in 'night' was once pronounced — like German 'Nacht'.",
            nerd_mode: { ipa_full: "/naɪt/ (both)", earliest_citation: "Old English 'niht', from Proto-Germanic '*nahtō', from PIE '*nókʷts'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Nakta", script: "नक्त", script_type: "Devanagari", pronunciation: "/nɐk.tɐ/" },
                    { name: "Latin", word: "Nox", script: "Nox", script_type: "Latin", pronunciation: "/noks/" },
                    { name: "Greek", word: "Nyx", script: "Νύξ", script_type: "Greek", pronunciation: "/nyks/" },
                    { name: "German", word: "Nacht", script: "Nacht", script_type: "Latin", pronunciation: "/naxt/" },
                    { name: "Russian", word: "Noch", script: "Ночь", script_type: "Cyrillic", pronunciation: "/not͡ɕ/" },
                    { name: "Lithuanian", word: "Naktis", script: "Naktis", script_type: "Latin", pronunciation: "/nɐk.tʲɪs/" }
                ]
            }
        },
        accent_color: "#1E293B",
        root_family: "PIE_nokwts"
    },
    {
        word: "Mama",
        definition: "One's mother (informal).",
        phonetic: "/ˈmɑːmə/",
        visualization_type: "GRID",
        content_json: {
            hook: "Mama isn't a word humans invented — it's a sound babies produce naturally, and every culture mapped it to 'mother'.",
            fun_fact: "Linguist Roman Jakobson proved 'mama' universality: the 'm' sound is the easiest consonant for nursing infants (lips closed on breast), so it became 'mother'.",
            nerd_mode: { ipa_full: "/ˈmɑː.mə/ or /ˈmæm.ə/ (varies)", earliest_citation: "Proto-human? The word appears independently in virtually every language family on Earth." },
            visual_data: {
                type: "GRID", pattern: "parallel", languages: [
                    { name: "Mandarin", word: "Māma", script: "妈妈", script_type: "Other", pronunciation: "/mā.ma/" },
                    { name: "Swahili", word: "Mama", script: "Mama", script_type: "Latin", pronunciation: "/ˈma.ma/" },
                    { name: "Quechua", word: "Mama", script: "Mama", script_type: "Latin", pronunciation: "/ˈma.ma/" },
                    { name: "Korean", word: "Eomma", script: "엄마", script_type: "Other", pronunciation: "/ʌm.ma/" },
                    { name: "Arabic", word: "Māmā", script: "ماما", script_type: "Arabic", pronunciation: "/maː.maː/" },
                    { name: "Tagalog", word: "Nanay/Mama", script: "Mama", script_type: "Latin", pronunciation: "/ˈma.ma/" }
                ]
            }
        },
        accent_color: "#E11D48",
        root_family: null
    },
    {
        word: "Pineapple",
        definition: "A large tropical fruit with a tough segmented skin and sweet yellow flesh.",
        phonetic: "/ˈpaɪnæpəl/",
        visualization_type: "GRID",
        content_json: {
            hook: "Almost every language on Earth calls it 'ananas' — except English, which decided to call it a pine-apple.",
            fun_fact: "English originally used 'pineapple' to mean pine cone. When Europeans saw the tropical fruit, they thought it looked like a giant pine cone — so reused the word.",
            nerd_mode: { ipa_full: "/ˈpaɪn.æp.əl/ (both)", earliest_citation: "First recorded for the fruit in 1664. From Tupi 'nanas' (excellent fruit) for most languages." },
            visual_data: {
                type: "GRID", pattern: "loanword", languages: [
                    { name: "Spanish", word: "Piña / Ananá", script: "Piña", script_type: "Latin", pronunciation: "/ˈpi.ɲa/" },
                    { name: "French", word: "Ananas", script: "Ananas", script_type: "Latin", pronunciation: "/a.na.na/" },
                    { name: "German", word: "Ananas", script: "Ananas", script_type: "Latin", pronunciation: "/ˈa.na.nas/" },
                    { name: "Russian", word: "Ananas", script: "Ананас", script_type: "Cyrillic", pronunciation: "/ɐnɐˈnas/" },
                    { name: "Arabic", word: "Anānās", script: "أناناس", script_type: "Arabic", pronunciation: "/ʔanaːnaːs/" },
                    { name: "Japanese", word: "Painappuru", script: "パイナップル", script_type: "Other", pronunciation: "/pai.nap.pɯ.ɾɯ/" }
                ]
            }
        },
        accent_color: "#CA8A04",
        root_family: "TUPI_nanas"
    },
    {
        word: "Gift",
        definition: "A thing given willingly to someone without payment; a present.",
        phonetic: "/ɡɪft/",
        visualization_type: "GRID",
        content_json: {
            hook: "Don't give a 'Gift' to a German — it means poison. In Swedish, it means you're married.",
            fun_fact: "Proto-Germanic '*giftiz' meant 'something given'. German specialized it to 'dose of medicine' then 'poison'. Swedish kept it as 'married' (given away). English kept 'present'.",
            nerd_mode: { ipa_full: "/ɡɪft/ (both)", earliest_citation: "Old English 'gift' (bride price/dowry). Modern 'present' sense from Scandinavian influence, 1200s." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "English", word: "Gift", script: "Gift", script_type: "Latin", pronunciation: "/ɡɪft/" },
                    { name: "German", word: "Gift", script: "Gift", script_type: "Latin", pronunciation: "/ɡɪft/" },
                    { name: "Swedish", word: "Gift", script: "Gift", script_type: "Latin", pronunciation: "/jɪft/" },
                    { name: "Dutch", word: "Gift/Gif", script: "Gift", script_type: "Latin", pronunciation: "/ɣɪft/" },
                    { name: "Norwegian", word: "Gift", script: "Gift", script_type: "Latin", pronunciation: "/jɪft/" },
                    { name: "Danish", word: "Gift", script: "Gift", script_type: "Latin", pronunciation: "/ɡ̊ɪfd̥/" }
                ]
            }
        },
        accent_color: "#D97706",
        root_family: "PIE_ghebh"
    },
    {
        word: "Dog",
        definition: "A domesticated carnivorous mammal.",
        phonetic: "/dɒɡ/",
        visualization_type: "GRID",
        content_json: {
            hook: "Nobody knows where the word 'dog' comes from — it's one of English's greatest unsolved mysteries.",
            fun_fact: "Old English used 'hund' (like German 'Hund'). 'Dog' appeared from nowhere in the 1000s and slowly replaced 'hound'. Its origin remains completely unknown.",
            nerd_mode: { ipa_full: "/dɒɡ/ (British), /dɔːɡ/ (American)", earliest_citation: "Old English 'docga' (circa 1050), a rare word of completely unknown origin." },
            visual_data: {
                type: "GRID", pattern: "parallel", languages: [
                    { name: "English", word: "Dog", script: "Dog", script_type: "Latin", pronunciation: "/dɒɡ/" },
                    { name: "German", word: "Hund", script: "Hund", script_type: "Latin", pronunciation: "/hʊnt/" },
                    { name: "French", word: "Chien", script: "Chien", script_type: "Latin", pronunciation: "/ʃjɛ̃/" },
                    { name: "Russian", word: "Sobaka", script: "Собака", script_type: "Cyrillic", pronunciation: "/sɐˈba.kə/" },
                    { name: "Japanese", word: "Inu", script: "犬", script_type: "Other", pronunciation: "/i.nɯ/" },
                    { name: "Swahili", word: "Mbwa", script: "Mbwa", script_type: "Latin", pronunciation: "/ˈm̩.bwa/" }
                ]
            }
        },
        accent_color: "#92400E",
        root_family: null
    },
    {
        word: "Blue",
        definition: "Of the color intermediate between green and violet.",
        phonetic: "/bluː/",
        visualization_type: "GRID",
        content_json: {
            hook: "Ancient Greeks had no word for blue — Homer described the sea as 'wine-dark'. Many languages still don't separate blue from green.",
            fun_fact: "Japanese 'ao' covers both blue AND green. Russian has separate basic words for light blue (goluboy) and dark blue (siniy). Color perception is linguistic.",
            nerd_mode: { ipa_full: "/bluː/ (both)", earliest_citation: "Middle English 'bleu' circa 1300, from Old French 'bleu', from Frankish '*blāo'." },
            visual_data: {
                type: "GRID", pattern: "parallel", languages: [
                    { name: "Russian (light)", word: "Goluboy", script: "Голубой", script_type: "Cyrillic", pronunciation: "/ɡəlʊˈboj/" },
                    { name: "Russian (dark)", word: "Siniy", script: "Синий", script_type: "Cyrillic", pronunciation: "/ˈsʲi.nʲɪj/" },
                    { name: "Japanese", word: "Ao", script: "青", script_type: "Other", pronunciation: "/a.o/" },
                    { name: "Welsh", word: "Glas", script: "Glas", script_type: "Latin", pronunciation: "/ɡlaːs/" },
                    { name: "Korean", word: "Parang", script: "파랑", script_type: "Other", pronunciation: "/pa.ɾaŋ/" },
                    { name: "Zulu", word: "Luhlaza", script: "Luhlaza", script_type: "Latin", pronunciation: "/lu.ɬa.za/" }
                ]
            }
        },
        accent_color: "#1D4ED8",
        root_family: null
    },
    {
        word: "Butterfly",
        definition: "A nectar-feeding insect with large, typically brightly colored wings.",
        phonetic: "/ˈbʌtərflaɪ/",
        visualization_type: "GRID",
        content_json: {
            hook: "Every language names the butterfly differently — and nobody knows why English calls it 'butter-fly'.",
            fun_fact: "German says 'Schmetterling' (cream-beater), French 'papillon' (from Latin for tent), Russian 'babochka' (little old woman). The randomness is linguistically bizarre.",
            nerd_mode: { ipa_full: "/ˈbʌt.ə.flaɪ/ (both)", earliest_citation: "Old English 'buttorfleoge', perhaps because butterflies were thought to steal butter or milk." },
            visual_data: {
                type: "GRID", pattern: "parallel", languages: [
                    { name: "German", word: "Schmetterling", script: "Schmetterling", script_type: "Latin", pronunciation: "/ˈʃmɛ.tɐ.lɪŋ/" },
                    { name: "French", word: "Papillon", script: "Papillon", script_type: "Latin", pronunciation: "/pa.pi.jɔ̃/" },
                    { name: "Russian", word: "Babochka", script: "Бабочка", script_type: "Cyrillic", pronunciation: "/ˈba.bətʃ.kə/" },
                    { name: "Spanish", word: "Mariposa", script: "Mariposa", script_type: "Latin", pronunciation: "/ma.ɾi.ˈpo.sa/" },
                    { name: "Turkish", word: "Kelebek", script: "Kelebek", script_type: "Latin", pronunciation: "/ce.le.bec/" },
                    { name: "Japanese", word: "Chō", script: "蝶", script_type: "Other", pronunciation: "/t͡ɕoː/" }
                ]
            }
        },
        accent_color: "#7C3AED",
        root_family: null
    },
    {
        word: "Honey",
        definition: "A sweet viscous substance made by bees from flower nectar.",
        phonetic: "/ˈhʌni/",
        visualization_type: "GRID",
        content_json: {
            hook: "The PIE word for honey *mélit also meant 'gold' — to ancient peoples, honey WAS liquid gold.",
            fun_fact: "PIE *mélit → Greek 'meli', Latin 'mel'. But Germanic languages switched to a different root. English 'honey' comes from Proto-Germanic '*hunagą'.",
            nerd_mode: { ipa_full: "/ˈhʌn.i/ (both)", earliest_citation: "Old English 'hunig', from Proto-Germanic '*hunagą'. PIE cognate '*mélit' gave Latin 'mel'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Latin", word: "Mel", script: "Mel", script_type: "Latin", pronunciation: "/mel/" },
                    { name: "Greek", word: "Meli", script: "Μέλι", script_type: "Greek", pronunciation: "/ˈme.li/" },
                    { name: "German", word: "Honig", script: "Honig", script_type: "Latin", pronunciation: "/ˈhoː.nɪç/" },
                    { name: "Sanskrit", word: "Madhu", script: "मधु", script_type: "Devanagari", pronunciation: "/mɐ.d̪ʱu/" },
                    { name: "Russian", word: "Myod", script: "Мёд", script_type: "Cyrillic", pronunciation: "/mʲɵt/" },
                    { name: "Welsh", word: "Mêl", script: "Mêl", script_type: "Latin", pronunciation: "/meːl/" }
                ]
            }
        },
        accent_color: "#D97706",
        root_family: "PIE_melit"
    },
    {
        word: "Three",
        definition: "The number equivalent to the sum of two and one.",
        phonetic: "/θriː/",
        visualization_type: "GRID",
        content_json: {
            hook: "The word 'three' has barely changed in 8,000 years — it's one of the most stable words in all human language.",
            fun_fact: "PIE *tréyes → Sanskrit 'trayaḥ', Latin 'trēs', Greek 'treîs', Russian 'tri', English 'three'. The number is almost immune to linguistic change.",
            nerd_mode: { ipa_full: "/θɹiː/ (both)", earliest_citation: "Old English 'þrēo', from Proto-Germanic '*þrijiz', from PIE '*tréyes'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Trayaḥ", script: "त्रयः", script_type: "Devanagari", pronunciation: "/trɐ.jɐh/" },
                    { name: "Latin", word: "Trēs", script: "Trēs", script_type: "Latin", pronunciation: "/treːs/" },
                    { name: "Greek", word: "Treîs", script: "Τρεῖς", script_type: "Greek", pronunciation: "/treîs/" },
                    { name: "Russian", word: "Tri", script: "Три", script_type: "Cyrillic", pronunciation: "/trʲi/" },
                    { name: "Persian", word: "Se", script: "سه", script_type: "Arabic", pronunciation: "/se/" },
                    { name: "Lithuanian", word: "Trys", script: "Trys", script_type: "Latin", pronunciation: "/triːs/" }
                ]
            }
        },
        accent_color: "#0891B2",
        root_family: "PIE_treyes"
    },
    {
        word: "Brother",
        definition: "A man or boy in relation to other sons and daughters of his parents.",
        phonetic: "/ˈbrʌðər/",
        visualization_type: "GRID",
        content_json: {
            hook: "Sanskrit 'bhrātṛ', Latin 'frāter', English 'brother' — the word has linked siblings for 6,000 years.",
            fun_fact: "PIE *bʰréh₂tēr is perfectly preserved across languages. The b→f shift (Grimm's Law) gave Latin 'frater'. Germanic kept the 'b' → 'brother'.",
            nerd_mode: { ipa_full: "/ˈbɹʌð.ə(ɹ)/ (British), /ˈbɹʌð.ɚ/ (American)", earliest_citation: "Old English 'brōþor', from PIE '*bʰréh₂tēr'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Bhrātṛ", script: "भ्रातृ", script_type: "Devanagari", pronunciation: "/bʱɾaː.tɹ̩/" },
                    { name: "Latin", word: "Frāter", script: "Frāter", script_type: "Latin", pronunciation: "/ˈfraː.ter/" },
                    { name: "Greek", word: "Phrātēr", script: "Φράτηρ", script_type: "Greek", pronunciation: "/pʰrǎː.tɛːr/" },
                    { name: "Russian", word: "Brat", script: "Брат", script_type: "Cyrillic", pronunciation: "/brat/" },
                    { name: "Persian", word: "Barādar", script: "برادر", script_type: "Arabic", pronunciation: "/bɒˈɾɒː.dæɾ/" },
                    { name: "Irish", word: "Bráthair", script: "Bráthair", script_type: "Latin", pronunciation: "/ˈbɾˠaː.həɾʲ/" }
                ]
            }
        },
        accent_color: "#1D4ED8",
        root_family: "PIE_bhrehter"
    },
    {
        word: "Name",
        definition: "A word or set of words by which a person, animal, place, or thing is known.",
        phonetic: "/neɪm/",
        visualization_type: "GRID",
        content_json: {
            hook: "The word 'name' is nearly identical across every Indo-European language — from Sanskrit 'nāman' to Latin 'nōmen'.",
            fun_fact: "PIE *h₁nómn̥ is phenomenally stable. Even after 6,000 years of drift, you can hear the echo: name, Name, nom, nomen, nāman.",
            nerd_mode: { ipa_full: "/neɪm/ (both)", earliest_citation: "Old English 'nama', from Proto-Germanic '*namō', from PIE '*h₁nómn̥'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Nāman", script: "नामन्", script_type: "Devanagari", pronunciation: "/naː.mɐn/" },
                    { name: "Latin", word: "Nōmen", script: "Nōmen", script_type: "Latin", pronunciation: "/ˈnoː.men/" },
                    { name: "Greek", word: "Ónoma", script: "Ὄνομα", script_type: "Greek", pronunciation: "/ó.no.ma/" },
                    { name: "German", word: "Name", script: "Name", script_type: "Latin", pronunciation: "/ˈnaː.mə/" },
                    { name: "Russian", word: "Imya", script: "Имя", script_type: "Cyrillic", pronunciation: "/ˈi.mʲə/" },
                    { name: "Persian", word: "Nām", script: "نام", script_type: "Arabic", pronunciation: "/nɒːm/" }
                ]
            }
        },
        accent_color: "#059669",
        root_family: "PIE_hnomn"
    },
    {
        word: "New",
        definition: "Not existing before; recently made, discovered, or experienced.",
        phonetic: "/njuː/",
        visualization_type: "GRID",
        content_json: {
            hook: "PIE *néwos → Latin 'novus', Greek 'neos', Hindi 'nayā', English 'new' — the freshest concept with the oldest word.",
            fun_fact: "The word 'new' has cognates in virtually every Indo-European language and has remained recognizable for over 5,000 years of linguistic evolution.",
            nerd_mode: { ipa_full: "/njuː/ (British), /nuː/ (American)", earliest_citation: "Old English 'nīwe', from Proto-Germanic '*niwjaz', from PIE '*néwos'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Nava", script: "नव", script_type: "Devanagari", pronunciation: "/nɐ.vɐ/" },
                    { name: "Latin", word: "Novus", script: "Novus", script_type: "Latin", pronunciation: "/ˈno.wʊs/" },
                    { name: "Greek", word: "Neos", script: "Νέος", script_type: "Greek", pronunciation: "/né.os/" },
                    { name: "Russian", word: "Novyy", script: "Новый", script_type: "Cyrillic", pronunciation: "/ˈno.vɨj/" },
                    { name: "Persian", word: "Now", script: "نو", script_type: "Arabic", pronunciation: "/now/" },
                    { name: "Lithuanian", word: "Naujas", script: "Naujas", script_type: "Latin", pronunciation: "/ˈnɐʊ.jɐs/" }
                ]
            }
        },
        accent_color: "#059669",
        root_family: "PIE_newos"
    },
    {
        word: "Door",
        definition: "A hinged barrier at the entrance to a building, room, or vehicle.",
        phonetic: "/dɔːr/",
        visualization_type: "GRID",
        content_json: {
            hook: "The word for 'door' has been guarding entrances in virtually the same form since the Bronze Age.",
            fun_fact: "PIE *dʰwer- survived into Latin 'foris' (gate), Greek 'thyra' (door), and English 'door'. All from the same root that meant 'opening'.",
            nerd_mode: { ipa_full: "/dɔː(ɹ)/ (British), /dɔːɹ/ (American)", earliest_citation: "Old English 'duru', from Proto-Germanic '*durz', from PIE '*dʰwer-'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Dvār", script: "द्वार", script_type: "Devanagari", pronunciation: "/d̪ʋaːr/" },
                    { name: "Latin", word: "Foris", script: "Foris", script_type: "Latin", pronunciation: "/ˈfo.ris/" },
                    { name: "Greek", word: "Thyra", script: "Θύρα", script_type: "Greek", pronunciation: "/tʰý.ra/" },
                    { name: "Russian", word: "Dver", script: "Дверь", script_type: "Cyrillic", pronunciation: "/dvʲerʲ/" },
                    { name: "German", word: "Tür", script: "Tür", script_type: "Latin", pronunciation: "/tyːɐ̯/" },
                    { name: "Persian", word: "Dar", script: "در", script_type: "Arabic", pronunciation: "/dær/" }
                ]
            }
        },
        accent_color: "#92400E",
        root_family: "PIE_dhwer"
    },
    {
        word: "Mouse",
        definition: "A small rodent with a pointed snout and long thin tail.",
        phonetic: "/maʊs/",
        visualization_type: "GRID",
        content_json: {
            hook: "PIE *mūs → Latin 'mūs' → English 'mouse' — the word has scurried through 50 languages for 6,000 years.",
            fun_fact: "The same root also gave us 'muscle' — Latin 'musculus' meant 'little mouse' because a flexing bicep looked like a mouse running under skin.",
            nerd_mode: { ipa_full: "/maʊs/ (both)", earliest_citation: "Old English 'mūs', from Proto-Germanic '*mūs', from PIE '*mūs'." },
            visual_data: {
                type: "GRID", pattern: "cognate", languages: [
                    { name: "Sanskrit", word: "Mūṣ", script: "मूष", script_type: "Devanagari", pronunciation: "/muːʂ/" },
                    { name: "Latin", word: "Mūs", script: "Mūs", script_type: "Latin", pronunciation: "/muːs/" },
                    { name: "Greek", word: "Mŷs", script: "Μῦς", script_type: "Greek", pronunciation: "/mŷːs/" },
                    { name: "Russian", word: "Mysh", script: "Мышь", script_type: "Cyrillic", pronunciation: "/mɨʂ/" },
                    { name: "German", word: "Maus", script: "Maus", script_type: "Latin", pronunciation: "/maʊs/" },
                    { name: "Persian", word: "Mush", script: "موش", script_type: "Arabic", pronunciation: "/muːʃ/" }
                ]
            }
        },
        accent_color: "#6B7280",
        root_family: "PIE_mus"
    },
    {
        word: "Taboo",
        definition: "A social or religious custom prohibiting discussion of a particular practice or topic.",
        phonetic: "/təˈbuː/",
        visualization_type: "GRID",
        content_json: {
            hook: "Taboo is one of the few Polynesian words in English — Captain Cook brought it back from Tonga in 1777.",
            fun_fact: "Tongan 'tabu' meant 'sacred, forbidden'. Cook's journals introduced the concept and word to Europe. It filled a gap — English had no single word for 'sacredly prohibited'.",
            nerd_mode: { ipa_full: "/təˈbuː/ (both)", earliest_citation: "First in English 1777 from Captain Cook's journals describing Tongan customs." },
            visual_data: {
                type: "GRID", pattern: "loanword", languages: [
                    { name: "Tongan", word: "Tabu", script: "Tabu", script_type: "Latin", pronunciation: "/ˈta.bu/" },
                    { name: "Maori", word: "Tapu", script: "Tapu", script_type: "Latin", pronunciation: "/ˈta.pu/" },
                    { name: "Hawaiian", word: "Kapu", script: "Kapu", script_type: "Latin", pronunciation: "/ˈka.pu/" },
                    { name: "English", word: "Taboo", script: "Taboo", script_type: "Latin", pronunciation: "/təˈbuː/" },
                    { name: "French", word: "Tabou", script: "Tabou", script_type: "Latin", pronunciation: "/ta.bu/" },
                    { name: "German", word: "Tabu", script: "Tabu", script_type: "Latin", pronunciation: "/taˈbuː/" }
                ]
            }
        },
        accent_color: "#7C3AED",
        root_family: "POLYNESIAN_tabu"
    },
    {
        word: "Alcohol",
        definition: "A colorless volatile flammable liquid that is the intoxicating constituent of drinks.",
        phonetic: "/ˈælkəhɒl/",
        visualization_type: "GRID",
        content_json: {
            hook: "Alcohol started as Arabic eyeliner — 'al-kuhl' was antimony powder used as kohl before it meant booze.",
            fun_fact: "Arabic 'al-kuḥl' (the kohl — fine metallic powder). Alchemists borrowed it to mean any fine powder, then distilled essence, then finally the spirit in wine.",
            nerd_mode: { ipa_full: "/ˈæl.kə.hɒl/ (British), /ˈæl.kə.hɑːl/ (American)", earliest_citation: "First in English 1540s as 'fine powder'. 'Intoxicating liquor' sense from 1753." },
            visual_data: {
                type: "GRID", pattern: "loanword", languages: [
                    { name: "Arabic", word: "Al-kuḥl", script: "الكحل", script_type: "Arabic", pronunciation: "/al.kuħl/" },
                    { name: "English", word: "Alcohol", script: "Alcohol", script_type: "Latin", pronunciation: "/ˈæl.kə.hɒl/" },
                    { name: "French", word: "Alcool", script: "Alcool", script_type: "Latin", pronunciation: "/al.kɔl/" },
                    { name: "Spanish", word: "Alcohol", script: "Alcohol", script_type: "Latin", pronunciation: "/al.ko.ol/" },
                    { name: "Russian", word: "Alkogol", script: "Алкоголь", script_type: "Cyrillic", pronunciation: "/ɐlkɐˈɡolʲ/" },
                    { name: "Japanese", word: "Arukōru", script: "アルコール", script_type: "Other", pronunciation: "/a.ɾɯ.koː.ɾɯ/" }
                ]
            }
        },
        accent_color: "#D97706",
        root_family: "ARABIC_kuhl"
    },
    {
        word: "Piano",
        definition: "A large keyboard musical instrument with metal strings struck by hammers.",
        phonetic: "/piˈænoʊ/",
        visualization_type: "GRID",
        content_json: {
            hook: "Piano is short for 'pianoforte' — Italian for 'soft-loud,' because it was the first keyboard that could do both.",
            fun_fact: "Bartolomeo Cristofori invented the piano around 1700 in Florence. He called it 'gravicembalo col piano e forte' (harpsichord with soft and loud). Previous keyboards could only play one volume.",
            nerd_mode: { ipa_full: "/piˈæn.oʊ/ (American), /piˈæn.əʊ/ (British)", earliest_citation: "First in English 1803 as shortening of 'pianoforte' (1767), from Italian 'piano e forte' (soft and loud)." },
            visual_data: {
                type: "GRID", pattern: "loanword", languages: [
                    { name: "Italian", word: "Pianoforte", script: "Pianoforte", script_type: "Latin", pronunciation: "/pja.no.ˈfɔr.te/" },
                    { name: "English", word: "Piano", script: "Piano", script_type: "Latin", pronunciation: "/piˈæn.oʊ/" },
                    { name: "German", word: "Klavier", script: "Klavier", script_type: "Latin", pronunciation: "/klaˈviːɐ̯/" },
                    { name: "Japanese", word: "Piano", script: "ピアノ", script_type: "Other", pronunciation: "/pi.a.no/" },
                    { name: "Korean", word: "Piano", script: "피아노", script_type: "Other", pronunciation: "/pi.a.no/" },
                    { name: "Arabic", word: "Biyānū", script: "بيانو", script_type: "Arabic", pronunciation: "/bi.jaː.nuː/" }
                ]
            }
        },
        accent_color: "#1E40AF",
        root_family: "LATIN_planus"
    },
    {
        word: "Safari",
        definition: "An expedition to observe or hunt animals in their natural habitat, especially in East Africa.",
        phonetic: "/səˈfɑːri/",
        visualization_type: "GRID",
        content_json: {
            hook: "Safari is Swahili for 'journey' — borrowed from Arabic 'safar,' making it an African word with Middle Eastern roots.",
            fun_fact: "Swahili borrowed 'safari' from Arabic 'safar' (journey/travel). It entered English in the 1850s through East African exploration. Today it means wildlife tourism, but in Swahili it still just means any journey — even your commute.",
            nerd_mode: { ipa_full: "/sə.ˈfɑː.ɹi/ (both)", earliest_citation: "First in English 1859 from Swahili 'safari' (journey), from Arabic 'safar' (travel, journey)." },
            visual_data: {
                type: "GRID", pattern: "loanword", languages: [
                    { name: "Arabic", word: "Safar", script: "سفر", script_type: "Arabic", pronunciation: "/sa.far/" },
                    { name: "Swahili", word: "Safari", script: "Safari", script_type: "Latin", pronunciation: "/sa.fa.ri/" },
                    { name: "English", word: "Safari", script: "Safari", script_type: "Latin", pronunciation: "/sə.ˈfɑː.ri/" },
                    { name: "French", word: "Safari", script: "Safari", script_type: "Latin", pronunciation: "/sa.fa.ʁi/" },
                    { name: "German", word: "Safari", script: "Safari", script_type: "Latin", pronunciation: "/zaˈfaːʁi/" },
                    { name: "Japanese", word: "Safari", script: "サファリ", script_type: "Other", pronunciation: "/sa.fa.ɾi/" }
                ]
            }
        },
        accent_color: "#B45309",
        root_family: "ARABIC_safar"
    }
];
