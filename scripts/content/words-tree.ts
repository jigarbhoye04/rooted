/* eslint-disable */
// 25 TREE visualization words — etymology trees
// Skip: Captain (already in DB), Muscle (already in DB), Salary (already in DB)
export const treeWords = [
    {
        word: "Disaster",
        definition: "A sudden event causing great damage or suffering.",
        phonetic: "/dɪˈzæstər/",
        visualization_type: "TREE",
        content_json: {
            hook: "When you say 'disaster,' you're blaming the stars — literally.",
            fun_fact: "Italian 'disastro' means 'ill-starred' — from 'dis' (bad) + 'astro' (star). People once believed catastrophes were caused by unfavorable star alignments.",
            nerd_mode: { ipa_full: "/dɪˈzɑːs.tə/ (British), /dɪˈzæs.tɚ/ (American)", earliest_citation: "First in English 1590 from Italian 'disastro' via French 'désastre'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Astrum", language: "Latin", meaning: "Star", era: "100 BCE", children: [
                        {
                            term: "Dis-astro", language: "Italian", meaning: "Bad star, calamity", era: "1300s", children: [
                                { term: "Disaster", language: "English", meaning: "Catastrophe", era: "1590" },
                                { term: "Désastre", language: "French", meaning: "Misfortune", era: "1500s" }
                            ]
                        },
                        { term: "Astrology", language: "English", meaning: "Study of stars' influence", era: "1300s" },
                        { term: "Astronaut", language: "English", meaning: "Star sailor", era: "1929" },
                        { term: "Asteroid", language: "English", meaning: "Star-like", era: "1802" }
                    ]
                }
            }
        },
        accent_color: "#DC2626",
        root_family: "LATIN_astrum"
    },
    {
        word: "Trivial",
        definition: "Of little value or importance.",
        phonetic: "/ˈtrɪviəl/",
        visualization_type: "TREE",
        content_json: {
            hook: "Trivial truths were born at the crossroads — where three roads met and Romans gossiped.",
            fun_fact: "Latin 'trivium' = 'tri' (three) + 'via' (road). Where three roads met, common people gathered and chatted about ordinary things.",
            nerd_mode: { ipa_full: "/ˈtrɪv.i.əl/ (both)", earliest_citation: "First in English circa 1432, from Latin 'trivialis' meaning 'common, vulgar'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Via", language: "Latin", meaning: "Road, way", era: "500 BCE", children: [
                        {
                            term: "Trivium", language: "Latin", meaning: "Three roads / crossroads", era: "100 BCE", children: [
                                { term: "Trivial", language: "English", meaning: "Ordinary, unimportant", era: "1432" },
                                { term: "Trivia", language: "English", meaning: "Minor facts", era: "1902" }
                            ]
                        },
                        { term: "Deviate", language: "English", meaning: "To go off the road", era: "1630s" },
                        { term: "Voyage", language: "English", meaning: "Journey (via Old French)", era: "1200s" },
                        { term: "Obvious", language: "English", meaning: "In the way (ob + via)", era: "1580s" }
                    ]
                }
            }
        },
        accent_color: "#7C3AED",
        root_family: "LATIN_via"
    },
    {
        word: "Sincere",
        definition: "Free from pretense or deceit; genuine.",
        phonetic: "/sɪnˈsɪər/",
        visualization_type: "TREE",
        content_json: {
            hook: "Legend says 'sincere' means 'without wax' — Roman sculptors hiding cracks with wax were the original fakers.",
            fun_fact: "The folk etymology 'sine cera' (without wax) is likely false but irresistible. It may actually come from Latin 'sincerus' meaning 'clean, pure'.",
            nerd_mode: { ipa_full: "/sɪnˈsɪə(ɹ)/ (British), /sɪnˈsɪɹ/ (American)", disputed_origin: "The 'sine cera' (without wax) origin is probably folk etymology. More likely from Latin 'sin-' (one) + 'crescere' (grow) = of one growth, pure.", earliest_citation: "First in English 1530s from Latin 'sincerus'." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Sincerus", language: "Latin", meaning: "Clean, pure, genuine", era: "100 BCE", children: [
                        {
                            term: "Sincère", language: "French", meaning: "Honest, genuine", era: "1200s", children: [
                                { term: "Sincere", language: "English", meaning: "Genuine, honest", era: "1530s" },
                                { term: "Sincerity", language: "English", meaning: "Quality of being genuine", era: "1540s" }
                            ]
                        },
                        { term: "Sincero", language: "Spanish", meaning: "Honest", era: "1200s" },
                        { term: "Sincero", language: "Italian", meaning: "Pure, genuine", era: "1300s" }
                    ]
                }
            }
        },
        accent_color: "#059669",
        root_family: "LATIN_sincerus"
    },
    {
        word: "Candidate",
        definition: "A person who applies for a job or is nominated for election.",
        phonetic: "/ˈkændɪdeɪt/",
        visualization_type: "TREE",
        content_json: {
            hook: "Every political candidate is literally a 'white person' — because Roman office-seekers wore blindingly white togas.",
            fun_fact: "Latin 'candidatus' = 'one dressed in white'. Romans running for office wore brilliant white togas (toga candida) to symbolize purity.",
            nerd_mode: { ipa_full: "/ˈkæn.dɪ.deɪt/ (both)", earliest_citation: "First in English 1600s from Latin 'candidatus' (white-robed)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Candidus", language: "Latin", meaning: "White, bright, pure", era: "200 BCE", children: [
                        {
                            term: "Candidatus", language: "Latin", meaning: "White-robed (office seeker)", era: "100 BCE", children: [
                                { term: "Candidate", language: "English", meaning: "Job applicant / office seeker", era: "1600s" }
                            ]
                        },
                        { term: "Candid", language: "English", meaning: "Frank, honest (pure-hearted)", era: "1620s" },
                        { term: "Candle", language: "English", meaning: "White light source", era: "Old English" },
                        { term: "Candor", language: "English", meaning: "Openness, honesty", era: "1600s" }
                    ]
                }
            }
        },
        accent_color: "#F5F5F5",
        root_family: "LATIN_candidus"
    },
    {
        word: "Companion",
        definition: "A person who you spend time with or travel with.",
        phonetic: "/kəmˈpænjən/",
        visualization_type: "TREE",
        content_json: {
            hook: "Your companion is literally the person you break bread with — 'com' (with) + 'panis' (bread).",
            fun_fact: "The word 'company' shares the same root — a group that eats bread together. The French 'copain' (buddy) also descends from the same Latin.",
            nerd_mode: { ipa_full: "/kəmˈpæn.jən/ (both)", earliest_citation: "First in English circa 1300 from Old French 'compaignon', from Latin 'com' + 'panis'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Panis", language: "Latin", meaning: "Bread", era: "500 BCE", children: [
                        {
                            term: "Com-panis", language: "Late Latin", meaning: "Bread-sharer", era: "200 CE", children: [
                                { term: "Companion", language: "English", meaning: "Friend, associate", era: "1300s" },
                                { term: "Company", language: "English", meaning: "Group / business firm", era: "1200s" },
                                { term: "Copain", language: "French", meaning: "Buddy, pal", era: "1200s" }
                            ]
                        },
                        { term: "Pantry", language: "English", meaning: "Bread storage room", era: "1300s" },
                        { term: "Panini", language: "Italian", meaning: "Small breads / sandwiches", era: "modern" }
                    ]
                }
            }
        },
        accent_color: "#B45309",
        root_family: "LATIN_panis"
    },
    {
        word: "Calculate",
        definition: "Determine the amount or number of something mathematically.",
        phonetic: "/ˈkælkjʊleɪt/",
        visualization_type: "TREE",
        content_json: {
            hook: "Every calculation you make is named after pebbles — Romans counted with small stones called 'calculi'.",
            fun_fact: "Latin 'calculus' means 'small stone' or 'pebble'. Romans used pebbles on counting boards — the original calculators.",
            nerd_mode: { ipa_full: "/ˈkæl.kjʊ.leɪt/ (both)", earliest_citation: "First in English 1560s from Latin 'calculatus', past participle of 'calculare'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Calculus", language: "Latin", meaning: "Small stone, pebble", era: "100 BCE", children: [
                        {
                            term: "Calculare", language: "Latin", meaning: "To count with pebbles", era: "100 CE", children: [
                                { term: "Calculate", language: "English", meaning: "To compute", era: "1560s" },
                                { term: "Calculator", language: "English", meaning: "Computing device", era: "1610s" }
                            ]
                        },
                        { term: "Calculus", language: "English", meaning: "Branch of mathematics", era: "1666" },
                        { term: "Calcium", language: "English", meaning: "Chemical element (from limestone)", era: "1808" },
                        { term: "Chalk", language: "English", meaning: "Soft white stone", era: "Old English" }
                    ]
                }
            }
        },
        accent_color: "#0891B2",
        root_family: "LATIN_calculus"
    },
    {
        word: "Lunatic",
        definition: "A mentally ill person (historically); someone wildly foolish.",
        phonetic: "/ˈluːnətɪk/",
        visualization_type: "TREE",
        content_json: {
            hook: "People once believed the full moon drove you insane — that's why crazy people were called 'lunatics'.",
            fun_fact: "English common law recognized 'lunacy' as a legal condition. Blackstone wrote that lunatics 'had lucid intervals' between full moons.",
            nerd_mode: { ipa_full: "/ˈluː.nə.tɪk/ (both)", earliest_citation: "First in English circa 1290 from Old French 'lunatique', from Late Latin 'lunaticus'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Luna", language: "Latin", meaning: "Moon", era: "500 BCE", children: [
                        {
                            term: "Lunaticus", language: "Late Latin", meaning: "Moon-struck, epileptic", era: "200 CE", children: [
                                { term: "Lunatic", language: "English", meaning: "Insane person", era: "1290" },
                                { term: "Lunacy", language: "English", meaning: "Insanity", era: "1540s" }
                            ]
                        },
                        { term: "Lunar", language: "English", meaning: "Of the moon", era: "1620s" },
                        { term: "Lune", language: "French", meaning: "Moon", era: "Old French" },
                        { term: "Lunette", language: "English", meaning: "Crescent-shaped object", era: "1570s" }
                    ]
                }
            }
        },
        accent_color: "#334155",
        root_family: "LATIN_luna"
    },
    {
        word: "Pavilion",
        definition: "A decorative building or tent used for shelter at public events.",
        phonetic: "/pəˈvɪljən/",
        visualization_type: "TREE",
        content_json: {
            hook: "Pavilions are named after butterflies — because ornate tents looked like spread butterfly wings.",
            fun_fact: "Latin 'papilio' meant butterfly. When Romans saw large, colorful tents with flaps billowing, they thought of butterfly wings.",
            nerd_mode: { ipa_full: "/pəˈvɪl.jən/ (both)", earliest_citation: "First in English circa 1250 from Old French 'pavillon', from Latin 'papilionem' (butterfly/tent)." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Papilio", language: "Latin", meaning: "Butterfly / tent", era: "100 CE", children: [
                        {
                            term: "Pavillon", language: "Old French", meaning: "Large tent", era: "1100s", children: [
                                { term: "Pavilion", language: "English", meaning: "Decorative tent / building", era: "1250" }
                            ]
                        },
                        { term: "Papillon", language: "French", meaning: "Butterfly", era: "1100s" },
                        { term: "Papiglione", language: "Italian", meaning: "Butterfly / tent", era: "1300s" }
                    ]
                }
            }
        },
        accent_color: "#E11D48",
        root_family: "LATIN_papilio"
    },
    {
        word: "Galaxy",
        definition: "A system of millions or billions of stars bound together by gravity.",
        phonetic: "/ˈɡæləksi/",
        visualization_type: "TREE",
        content_json: {
            hook: "Galaxy literally means 'milky' — the ancient Greeks saw the Milky Way as spilled breast milk from Hera.",
            fun_fact: "Greek myth: Heracles bit Hera's breast while nursing, spraying milk across the sky — creating the 'galaxias kyklos' (milky circle).",
            nerd_mode: { ipa_full: "/ˈɡæl.ək.si/ (both)", earliest_citation: "First in English circa 1384 from Late Latin 'galaxias', from Greek 'gala' (milk)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Gala", language: "Greek", meaning: "Milk", era: "800 BCE", children: [
                        {
                            term: "Galaxias", language: "Greek", meaning: "Milky (circle)", era: "500 BCE", children: [
                                { term: "Galaxy", language: "English", meaning: "Star system", era: "1384" },
                                { term: "Galactic", language: "English", meaning: "Of the galaxy", era: "1839" }
                            ]
                        },
                        { term: "Galactose", language: "English", meaning: "Milk sugar", era: "1860" },
                        { term: "Lactose", language: "English", meaning: "Milk sugar (Latin cognate)", era: "1843" }
                    ]
                }
            }
        },
        accent_color: "#1D4ED8",
        root_family: "GREEK_gala"
    },
    {
        word: "Rival",
        definition: "A person competing with another for the same objective.",
        phonetic: "/ˈraɪvəl/",
        visualization_type: "TREE",
        content_json: {
            hook: "Your rival was originally your neighbor who shared your river — water disputes are humanity's oldest conflict.",
            fun_fact: "Latin 'rivalis' = one who shares a river (rivus). People on opposite banks competed for water rights. The oldest rivalry is literally geographic.",
            nerd_mode: { ipa_full: "/ˈɹaɪ.vəl/ (both)", earliest_citation: "First in English 1570s from Latin 'rivalis' (one using the same stream)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Rivus", language: "Latin", meaning: "Stream, brook", era: "500 BCE", children: [
                        {
                            term: "Rivalis", language: "Latin", meaning: "One sharing a stream / competitor", era: "100 BCE", children: [
                                { term: "Rival", language: "English", meaning: "Competitor", era: "1570s" },
                                { term: "Rivalry", language: "English", meaning: "Competition", era: "1598" }
                            ]
                        },
                        { term: "River", language: "English", meaning: "Large stream (via French)", era: "1200s" },
                        { term: "Riviera", language: "Italian", meaning: "Coastline (riverbank)", era: "1600s" },
                        { term: "Derive", language: "English", meaning: "To draw from (a source)", era: "1300s" }
                    ]
                }
            }
        },
        accent_color: "#DC2626",
        root_family: "LATIN_rivus"
    },
    {
        word: "Inaugurate",
        definition: "Begin or introduce a system, policy, or period; formally admit someone to office.",
        phonetic: "/ɪˈnɔːɡjʊreɪt/",
        visualization_type: "TREE",
        content_json: {
            hook: "Every US president is inaugurated based on Roman bird-watching — 'augur' priests read fortunes from bird flights.",
            fun_fact: "Roman augurs interpreted the will of gods from bird behavior. 'Inaugurare' = to take omens from birds before any important undertaking.",
            nerd_mode: { ipa_full: "/ɪˈnɔː.ɡjʊ.ɹeɪt/ (both)", earliest_citation: "First in English 1606 from Latin 'inauguratus', past participle of 'inaugurare'." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Augur", language: "Latin", meaning: "Bird-omen priest", era: "500 BCE", children: [
                        {
                            term: "Inaugurare", language: "Latin", meaning: "To take omens / consecrate", era: "200 BCE", children: [
                                { term: "Inaugurate", language: "English", meaning: "Formally begin / install", era: "1606" },
                                { term: "Inauguration", language: "English", meaning: "Formal ceremony of beginning", era: "1560s" }
                            ]
                        },
                        { term: "Augury", language: "English", meaning: "Omen, sign of future", era: "1300s" },
                        { term: "Auspicious", language: "English", meaning: "Favorable (bird-watching)", era: "1590s" }
                    ]
                }
            }
        },
        accent_color: "#7C3AED",
        root_family: "LATIN_augur"
    },
    {
        word: "Quarantine",
        definition: "A period of isolation imposed to prevent spread of disease.",
        phonetic: "/ˈkwɒrəntiːn/",
        visualization_type: "TREE",
        content_json: {
            hook: "Quarantine lasts 40 days because medieval Venice forced plague ships to wait 'quaranta giorni' before docking.",
            fun_fact: "Venice established the first quarantine station (lazaretto) in 1423 on an island in the lagoon. Ships waited exactly 40 days.",
            nerd_mode: { ipa_full: "/ˈkwɒɹ.ən.tiːn/ (British), /ˈkwɔːɹ.ən.tiːn/ (American)", earliest_citation: "First in English 1660s from Italian 'quarantina' (40 days), from 'quaranta' (forty)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Quaranta", language: "Italian", meaning: "Forty", era: "1300s", children: [
                        {
                            term: "Quarantina", language: "Italian", meaning: "Period of forty days", era: "1377", children: [
                                { term: "Quarantine", language: "English", meaning: "Disease isolation period", era: "1660s" }
                            ]
                        },
                        { term: "Quarant", language: "French", meaning: "Forty", era: "Old French" },
                        { term: "Cuarenta", language: "Spanish", meaning: "Forty", era: "1200s" },
                        { term: "Quadraginta", language: "Latin", meaning: "Forty (original root)", era: "100 BCE" }
                    ]
                }
            }
        },
        accent_color: "#B91C1C",
        root_family: "LATIN_quadraginta"
    },
    {
        word: "Preposterous",
        definition: "Contrary to reason or common sense; absurd.",
        phonetic: "/prɪˈpɒstərəs/",
        visualization_type: "TREE",
        content_json: {
            hook: "Preposterous literally means 'before-behind' — like putting the cart before the horse.",
            fun_fact: "Latin 'praeposterus' = 'prae' (before) + 'posterus' (coming after). Something so backwards that cause and effect are reversed.",
            nerd_mode: { ipa_full: "/prɪˈpɒs.tər.əs/ (British), /prɪˈpɑːs.tɚ.əs/ (American)", earliest_citation: "First in English 1540s from Latin 'praeposterus' (reversed, absurd)." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Posterus", language: "Latin", meaning: "Coming after, next", era: "200 BCE", children: [
                        {
                            term: "Prae-posterus", language: "Latin", meaning: "Before-after / reversed", era: "100 BCE", children: [
                                { term: "Preposterous", language: "English", meaning: "Absurd", era: "1540s" }
                            ]
                        },
                        { term: "Posterior", language: "English", meaning: "Coming after / backside", era: "1530s" },
                        { term: "Posterity", language: "English", meaning: "Future generations", era: "1300s" },
                        { term: "Post", language: "English", meaning: "After (prefix)", era: "Latin" }
                    ]
                }
            }
        },
        accent_color: "#6D28D9",
        root_family: "LATIN_posterus"
    },
    {
        word: "Sarcasm",
        definition: "The use of irony to mock or convey contempt.",
        phonetic: "/ˈsɑːrkæzəm/",
        visualization_type: "TREE",
        content_json: {
            hook: "Sarcasm literally means 'to tear flesh' — the Greeks considered it a verbal act of violence.",
            fun_fact: "Greek 'sarkazein' = to strip off flesh, bite the lip in rage, sneer. From 'sarx' (flesh). The same root gives us 'sarcophagus' (flesh-eater).",
            nerd_mode: { ipa_full: "/ˈsɑː.kæz.əm/ (British), /ˈsɑːɹ.kæz.əm/ (American)", earliest_citation: "First in English 1570s from Late Latin 'sarcasmus', from Greek 'sarkasmos'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Sarx", language: "Greek", meaning: "Flesh", era: "800 BCE", children: [
                        {
                            term: "Sarkazein", language: "Greek", meaning: "To tear flesh / sneer", era: "500 BCE", children: [
                                { term: "Sarcasm", language: "English", meaning: "Biting irony", era: "1570s" }
                            ]
                        },
                        {
                            term: "Sarkophagos", language: "Greek", meaning: "Flesh-eating (limestone coffin)", era: "400 BCE", children: [
                                { term: "Sarcophagus", language: "English", meaning: "Stone coffin", era: "1600s" }
                            ]
                        },
                        { term: "Sarcoma", language: "English", meaning: "Flesh tumor", era: "1650s" }
                    ]
                }
            }
        },
        accent_color: "#DC2626",
        root_family: "GREEK_sarx"
    },
    {
        word: "Pentagon",
        definition: "A plane figure with five straight sides and five angles.",
        phonetic: "/ˈpɛntəɡɒn/",
        visualization_type: "TREE",
        content_json: {
            hook: "The US military HQ has five sides because its original lot was five-sided — the name 'Pentagon' was an afterthought.",
            fun_fact: "Greek 'pente' (five) + 'gon' (angle). The Pentagon building was designed in just 5 days in 1941 by architect George Bergstrom.",
            nerd_mode: { ipa_full: "/ˈpɛn.tə.ɡɒn/ (British), /ˈpɛn.tə.ɡɑːn/ (American)", earliest_citation: "First in English 1560s from Greek 'pentagonon' (five-angled)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Pente", language: "Greek", meaning: "Five", era: "800 BCE", children: [
                        {
                            term: "Pentagonon", language: "Greek", meaning: "Five angles", era: "300 BCE", children: [
                                { term: "Pentagon", language: "English", meaning: "Five-sided shape / the US military HQ", era: "1560s" }
                            ]
                        },
                        { term: "Pentathlon", language: "English", meaning: "Five contests", era: "1603" },
                        { term: "Pentateuch", language: "English", meaning: "Five books (of Moses)", era: "1530s" },
                        { term: "Pentecost", language: "English", meaning: "Fiftieth (day)", era: "Old English" }
                    ]
                }
            }
        },
        accent_color: "#0E7490",
        root_family: "GREEK_pente"
    },
    {
        word: "Mortgage",
        definition: "A legal agreement to borrow money to buy property, using that property as security.",
        phonetic: "/ˈmɔːrɡɪdʒ/",
        visualization_type: "TREE",
        content_json: {
            hook: "Your mortgage is literally a 'death pledge' — the deal dies when you pay it off, or when you can't.",
            fun_fact: "Old French 'mort gage' = 'death pledge'. The pledge 'dies' either when the debt is paid or when the property is seized.",
            nerd_mode: { ipa_full: "/ˈmɔː.ɡɪdʒ/ (British), /ˈmɔːɹ.ɡɪdʒ/ (American)", earliest_citation: "First in English circa 1390 from Old French 'mort gage'." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Mors / Mort", language: "Latin / Old French", meaning: "Death", era: "100 BCE", children: [
                        {
                            term: "Mort Gage", language: "Old French", meaning: "Death pledge", era: "1200s", children: [
                                { term: "Mortgage", language: "English", meaning: "Property loan", era: "1390" }
                            ]
                        },
                        { term: "Mortal", language: "English", meaning: "Subject to death", era: "1300s" },
                        { term: "Mortuary", language: "English", meaning: "Place for the dead", era: "1300s" },
                        { term: "Mortify", language: "English", meaning: "To cause death-like shame", era: "1300s" }
                    ]
                }
            }
        },
        accent_color: "#1E293B",
        root_family: "LATIN_mors"
    },
    {
        word: "Panic",
        definition: "Sudden uncontrollable fear or anxiety.",
        phonetic: "/ˈpænɪk/",
        visualization_type: "TREE",
        content_json: {
            hook: "Panic is named after Pan — the goat-legged god who terrified travelers with blood-curdling screams in the woods.",
            fun_fact: "Greek 'panikon' = 'of Pan'. The Athenians believed Pan caused the Persian army to flee at Marathon by filling them with irrational terror.",
            nerd_mode: { ipa_full: "/ˈpæn.ɪk/ (both)", earliest_citation: "First in English 1603 from French 'panique', from Greek 'panikon' (of the god Pan)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Pan", language: "Greek", meaning: "God of wild places, shepherds", era: "800 BCE", children: [
                        {
                            term: "Panikon", language: "Greek", meaning: "Terror caused by Pan", era: "500 BCE", children: [
                                { term: "Panic", language: "English", meaning: "Sudden terror", era: "1603" },
                                { term: "Panique", language: "French", meaning: "Sudden fright", era: "1500s" }
                            ]
                        },
                        { term: "Pan pipes", language: "English", meaning: "Musical instrument of Pan", era: "1820s" },
                        { term: "Pandemonium", language: "English", meaning: "All-demon place (Milton coined)", era: "1667" }
                    ]
                }
            }
        },
        accent_color: "#B91C1C",
        root_family: "GREEK_pan"
    },
    {
        word: "Vaccine",
        definition: "A substance used to stimulate immunity against a disease.",
        phonetic: "/ˈvæksiːn/",
        visualization_type: "TREE",
        content_json: {
            hook: "Every vaccine on Earth is named after a cow — because Edward Jenner used cowpox to fight smallpox.",
            fun_fact: "Latin 'vacca' = cow. Jenner noticed milkmaids who caught cowpox (vaccinia) never got smallpox. His 1796 experiment changed history.",
            nerd_mode: { ipa_full: "/ˈvæk.siːn/ (British), /vækˈsiːn/ (American)", earliest_citation: "First in English 1799, coined by Jenner from Latin 'vaccinus' (of or from cows)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Vacca", language: "Latin", meaning: "Cow", era: "500 BCE", children: [
                        {
                            term: "Vaccinus", language: "Latin", meaning: "Of or from cows", era: "100 CE", children: [
                                { term: "Vaccine", language: "English", meaning: "Immunization substance", era: "1799" },
                                { term: "Vaccinate", language: "English", meaning: "To inoculate", era: "1803" }
                            ]
                        },
                        { term: "Vaquero", language: "Spanish", meaning: "Cowboy", era: "1500s" },
                        { term: "Vache", language: "French", meaning: "Cow", era: "Old French" }
                    ]
                }
            }
        },
        accent_color: "#059669",
        root_family: "LATIN_vacca"
    },
    {
        word: "Cynic",
        definition: "A person who believes people are motivated purely by self-interest.",
        phonetic: "/ˈsɪnɪk/",
        visualization_type: "TREE",
        content_json: {
            hook: "Cynics are named after dogs — Diogenes lived like one on purpose, and Athenians mocked him for it.",
            fun_fact: "Greek 'kynikos' = dog-like. Diogenes of Sinope lived in a barrel, ate scraps, and urinated in public. Asked why he was called a dog, he said: 'I fawn on those who give, bark at those who don't.'",
            nerd_mode: { ipa_full: "/ˈsɪn.ɪk/ (both)", earliest_citation: "First in English 1540s from Latin 'cynicus', from Greek 'kynikos' (dog-like)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Kyon", language: "Greek", meaning: "Dog", era: "800 BCE", children: [
                        {
                            term: "Kynikos", language: "Greek", meaning: "Dog-like (the philosophers)", era: "400 BCE", children: [
                                { term: "Cynic", language: "English", meaning: "Distrustful person", era: "1540s" },
                                { term: "Cynicism", language: "English", meaning: "Distrust of motives", era: "1670s" }
                            ]
                        },
                        { term: "Canine", language: "English", meaning: "Of dogs (Latin cognate canis)", era: "1400s" },
                        { term: "Cynosure", language: "English", meaning: "Dog's tail (pole star)", era: "1590s" }
                    ]
                }
            }
        },
        accent_color: "#334155",
        root_family: "GREEK_kyon"
    },
    {
        word: "Weird",
        definition: "Suggesting something supernatural; strange.",
        phonetic: "/wɪərd/",
        visualization_type: "TREE",
        content_json: {
            hook: "Weird used to mean 'fate' — the Weird Sisters in Macbeth aren't just strange, they control destiny.",
            fun_fact: "Old English 'wyrd' = fate, destiny. Shakespeare's 'weird sisters' were literally the Fate Sisters. The meaning shifted to 'uncanny' by the 1800s.",
            nerd_mode: { ipa_full: "/wɪəd/ (British), /wɪɹd/ (American)", earliest_citation: "Old English 'wyrd' (fate/destiny), circa 725 CE. Modern 'strange' sense from 1815." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Wyrd", language: "Old English", meaning: "Fate, personal destiny", era: "700 CE", children: [
                        {
                            term: "Weird (adj)", language: "English", meaning: "Uncanny, supernatural", era: "1400s", children: [
                                { term: "Weird (modern)", language: "English", meaning: "Strange, odd", era: "1815" }
                            ]
                        },
                        { term: "Wurd", language: "Old High German", meaning: "Fate", era: "800 CE" },
                        { term: "Urðr", language: "Old Norse", meaning: "Norse Fate goddess (Norn)", era: "900 CE" }
                    ]
                }
            }
        },
        accent_color: "#4C1D95",
        root_family: "PIE_wert"
    },
    {
        word: "Nice",
        definition: "Pleasant; agreeable.",
        phonetic: "/naɪs/",
        visualization_type: "TREE",
        content_json: {
            hook: "Nice once meant 'stupid' — it shifted meaning more times than any other English word.",
            fun_fact: "Latin 'nescius' = ignorant. Over 700 years: ignorant → foolish → shy → precise → pleasant. The word did a complete 180.",
            nerd_mode: { ipa_full: "/naɪs/ (both)", earliest_citation: "First in English circa 1290 from Old French 'nice' (foolish, silly), from Latin 'nescius' (ignorant)." },
            visual_data: {
                type: "TREE", layout: "dendrogram",
                root: {
                    term: "Nescius", language: "Latin", meaning: "Ignorant (ne + scire)", era: "100 BCE", children: [
                        {
                            term: "Nice (Old French)", language: "Old French", meaning: "Foolish, silly", era: "1200s", children: [
                                { term: "Nice (1300s)", language: "English", meaning: "Foolish, stupid", era: "1300s" },
                                {
                                    term: "Nice (1500s)", language: "English", meaning: "Shy, delicate, precise", era: "1500s", children: [
                                        { term: "Nice (modern)", language: "English", meaning: "Pleasant, agreeable", era: "1700s" }
                                    ]
                                }
                            ]
                        },
                        { term: "Nescient", language: "English", meaning: "Ignorant (rare, learned)", era: "1600s" }
                    ]
                }
            }
        },
        accent_color: "#E11D48",
        root_family: "LATIN_nescius"
    },
    {
        word: "Glamour",
        definition: "An attractive or exciting quality that makes things seem appealing.",
        phonetic: "/ˈɡlæmər/",
        visualization_type: "TREE",
        content_json: {
            hook: "Glamour is a Scottish corruption of 'grammar' — because reading was so rare it seemed like magic.",
            fun_fact: "In medieval Scotland, 'grammar' → 'glamour' meant casting a spell. Literacy was so rare that scholars were suspected of witchcraft.",
            nerd_mode: { ipa_full: "/ˈɡlæm.ə(ɹ)/ (both)", earliest_citation: "First in this form 1720 in Scottish English, a corruption of 'grammar' in its occult sense." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Grammatike", language: "Greek", meaning: "Art of letters", era: "400 BCE", children: [
                        {
                            term: "Grammar", language: "English", meaning: "Rules of language", era: "1100s", children: [
                                {
                                    term: "Gramarye", language: "Scots", meaning: "Magic, enchantment", era: "1300s", children: [
                                        { term: "Glamour", language: "English", meaning: "Enchantment → attractiveness", era: "1720" }
                                    ]
                                }
                            ]
                        },
                        { term: "Grimoire", language: "French", meaning: "Book of spells", era: "1400s" },
                        { term: "Grammarian", language: "English", meaning: "Language expert", era: "1300s" }
                    ]
                }
            }
        },
        accent_color: "#BE185D",
        root_family: "GREEK_grammatike"
    },
    {
        word: "Enthusiasm",
        definition: "Intense and eager enjoyment, interest, or approval.",
        phonetic: "/ɪnˈθjuːziæzəm/",
        visualization_type: "TREE",
        content_json: {
            hook: "When you're enthusiastic, you're literally possessed by a god — the Greeks meant it as divine madness.",
            fun_fact: "Greek 'entheos' = 'en' (in) + 'theos' (god). Being 'enthusiastic' originally meant being divinely inspired or possessed — not just excited about pizza.",
            nerd_mode: { ipa_full: "/ɪnˈθjuː.zi.æz.əm/ (British), /ɪnˈθuː.zi.æz.əm/ (American)", earliest_citation: "First in English 1603 from Greek 'enthousiasmos' (divine inspiration)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Theos", language: "Greek", meaning: "God", era: "800 BCE", children: [
                        {
                            term: "Entheos", language: "Greek", meaning: "God within / possessed", era: "500 BCE", children: [
                                { term: "Enthusiasm", language: "English", meaning: "Passionate excitement", era: "1603" },
                                { term: "Enthusiast", language: "English", meaning: "Fervent supporter", era: "1600s" }
                            ]
                        },
                        { term: "Theology", language: "English", meaning: "Study of god(s)", era: "1300s" },
                        { term: "Atheist", language: "English", meaning: "Without god", era: "1570s" },
                        { term: "Theocracy", language: "English", meaning: "Rule by god", era: "1620s" }
                    ]
                }
            }
        },
        accent_color: "#E11D48",
        root_family: "GREEK_theos"
    },
    {
        word: "Sarcasm",
        definition: "The use of irony to mock or convey contempt.",
        phonetic: "/ˈsɑːrkæzəm/",
        visualization_type: "TREE",
        content_json: {
            hook: "Sarcasm literally means 'to tear flesh' — the Greeks knew words could cut deeper than knives.",
            fun_fact: "Greek 'sarkazein' = 'to strip off the flesh' (from 'sarx' = flesh). Sarcasm was originally described as speech that bites like tearing skin — the verbal equivalent of ripping someone apart.",
            nerd_mode: { ipa_full: "/ˈsɑːɹ.kæz.əm/ (American), /ˈsɑː.kæz.əm/ (British)", earliest_citation: "First in English 1579 from Late Latin 'sarcasmus', from Greek 'sarkasmos' (a sneer, mockery)." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Sarx", language: "Greek", meaning: "Flesh", era: "700 BCE", children: [
                        {
                            term: "Sarkazein", language: "Greek", meaning: "To tear flesh / to sneer", era: "500 BCE", children: [
                                { term: "Sarcasm", language: "English", meaning: "Biting irony", era: "1579" },
                                { term: "Sarcastic", language: "English", meaning: "Given to sarcasm", era: "1690s" }
                            ]
                        },
                        { term: "Sarcophagus", language: "English", meaning: "Flesh-eating stone coffin", era: "1600s" },
                        { term: "Sarcoma", language: "English", meaning: "Fleshy tumor", era: "1657" }
                    ]
                }
            }
        },
        accent_color: "#DC2626",
        root_family: "GREEK_sarx"
    },
    {
        word: "Hypocrite",
        definition: "A person who acts in contradiction to their stated beliefs or feelings.",
        phonetic: "/ˈhɪpəkrɪt/",
        visualization_type: "TREE",
        content_json: {
            hook: "Hypocrites were just actors — in ancient Greece, the word simply meant 'one who plays a part on stage.'",
            fun_fact: "Greek 'hypokritēs' = 'actor on a stage' from 'hypo' (under) + 'krinein' (to judge/decide). An actor literally 'judged from behind' a mask. Christianity gave it the negative moral meaning.",
            nerd_mode: { ipa_full: "/ˈhɪp.ə.kɹɪt/ (both)", earliest_citation: "First in English c. 1200 from Old French 'ypocrite', from Late Latin 'hypocrita', from Greek 'hypokritēs'." },
            visual_data: {
                type: "TREE", layout: "radial",
                root: {
                    term: "Krinein", language: "Greek", meaning: "To judge / decide", era: "800 BCE", children: [
                        {
                            term: "Hypokritēs", language: "Greek", meaning: "Stage actor", era: "500 BCE", children: [
                                { term: "Hypocrite", language: "English", meaning: "One who pretends virtue", era: "1200" },
                                { term: "Hypocrisy", language: "English", meaning: "Pretense of virtue", era: "1225" }
                            ]
                        },
                        { term: "Crisis", language: "English", meaning: "Decisive moment (judgment point)", era: "1400s" },
                        { term: "Critic", language: "English", meaning: "One who judges", era: "1580s" },
                        { term: "Criterion", language: "English", meaning: "Standard for judging", era: "1660s" }
                    ]
                }
            }
        },
        accent_color: "#8B5CF6",
        root_family: "GREEK_krinein"
    }
];
