/* eslint-disable */
// 25 TIMELINE visualization words — meaning evolution
// Skip: Algorithm (already in DB), Salary (already in DB)
export const timelineWords = [
    {
        word: "Robot",
        definition: "A machine capable of carrying out complex actions automatically.",
        phonetic: "/ˈroʊbɒt/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Robot was invented by a playwright in 1920 — and it originally meant 'slave labor' in Czech.",
            fun_fact: "Karel Čapek's play R.U.R. (Rossum's Universal Robots) introduced the word. His brother Josef actually suggested it, from Czech 'robota' (forced labor).",
            nerd_mode: { ipa_full: "/ˈɹəʊ.bɒt/ (British), /ˈɹoʊ.bɑːt/ (American)", earliest_citation: "Coined by Karel Čapek in 1920. First English use in 1923 translation of R.U.R." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "medieval", term: "Robota", meaning: "Serfdom, forced labor in Czech", usage_example: "Czech peasants owed 'robota' — compulsory unpaid work for their lords.", sentiment: "negative" },
                    { order: 2, era: "1920", term: "Robot", meaning: "Artificial humanoid worker (in Čapek's play)", usage_example: "R.U.R. depicted factory-made workers who eventually rebel and destroy humanity.", sentiment: "negative" },
                    { order: 3, era: "1940s", term: "Robot", meaning: "Mechanical automaton (Asimov's Laws)", usage_example: "Asimov redefined robots as benevolent with his Three Laws of Robotics.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Robot", meaning: "Any automated machine or software agent", usage_example: "'The chatbot is basically a robot that answers your customer service questions.'", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#0E7490",
        root_family: "CZECH_robota"
    },
    {
        word: "Virus",
        definition: "A submicroscopic infectious agent or a piece of harmful computer code.",
        phonetic: "/ˈvaɪrəs/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Virus originally meant 'poison' or 'slimy liquid' — the Romans had no idea about microscopic pathogens.",
            fun_fact: "Latin 'virus' meant slimy liquid, poison, or venom. It wasn't connected to disease until the 1800s, and to computers until 1983.",
            nerd_mode: { ipa_full: "/ˈvaɪ.ɹəs/ (both)", earliest_citation: "Latin usage ancient; biological sense from 1728; computer sense coined by Fred Cohen in 1983." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "100 BCE", term: "Virus", meaning: "Slimy liquid, poison, venom", usage_example: "Roman physicians used 'virus' to describe any toxic or noxious substance.", sentiment: "negative" },
                    { order: 2, era: "1728", term: "Virus", meaning: "Agent of infectious disease", usage_example: "Scientists began using 'virus' specifically for disease-causing agents.", sentiment: "negative" },
                    { order: 3, era: "1892", term: "Virus", meaning: "Sub-bacterial pathogen", usage_example: "Dmitri Ivanovsky discovered entities smaller than bacteria that could cause disease.", sentiment: "neutral" },
                    { order: 4, era: "1983", term: "Computer virus", meaning: "Self-replicating malicious code", usage_example: "Fred Cohen coined 'computer virus' in his PhD thesis at USC.", sentiment: "negative_shift" },
                    { order: 5, era: "2020s", term: "Viral", meaning: "Spreading rapidly (social media)", usage_example: "'That video went viral overnight' — the word gained a positive connotation.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#B91C1C",
        root_family: "LATIN_virus"
    },
    {
        word: "Meme",
        definition: "An image, video, or text spread rapidly by internet users, often with variations.",
        phonetic: "/miːm/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Richard Dawkins invented the word 'meme' in 1976 to describe ideas that spread like genes — then it became one.",
            fun_fact: "Dawkins coined 'meme' from Greek 'mimeme' (imitated thing), shortened to rhyme with 'gene'. He could never have predicted cat memes.",
            nerd_mode: { ipa_full: "/miːm/ (both)", earliest_citation: "Coined by Richard Dawkins in 'The Selfish Gene' (1976)." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1976", term: "Meme", meaning: "Unit of cultural transmission (academic)", usage_example: "Dawkins: 'just as genes propagate via sperm or eggs, memes propagate via imitation.'", sentiment: "neutral" },
                    { order: 2, era: "1990s", term: "Meme", meaning: "Internet in-joke or viral content", usage_example: "Early internet memes like 'All Your Base Are Belong To Us' spread across forums.", sentiment: "positive" },
                    { order: 3, era: "2010s", term: "Meme", meaning: "Shareable image macro or video format", usage_example: "Image macros with Impact font became the dominant meme format.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Meme", meaning: "Cultural shorthand / political tool", usage_example: "Memes now influence elections, stock markets (GME), and social movements.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#7C3AED",
        root_family: "GREEK_mimeme"
    },
    {
        word: "Cloud",
        definition: "A visible mass of water droplets in the sky, or remote computing infrastructure.",
        phonetic: "/klaʊd/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Cloud computing gets its name from 1990s network diagrams — engineers drew the internet as a fluffy cloud.",
            fun_fact: "Old English 'clūd' originally meant 'rock' or 'hill'. It only shifted to mean 'sky formation' because cloud masses looked like rocky cliffs.",
            nerd_mode: { ipa_full: "/klaʊd/ (both)", earliest_citation: "Old English 'clūd' (rock/hill), circa 700 CE. 'Cloud computing' from 1996 Compaq internal document." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "700 CE", term: "Clūd", meaning: "Rock, mass of stone, hill", usage_example: "Old English poets used 'clūd' to describe rocky outcroppings and boulders.", sentiment: "neutral" },
                    { order: 2, era: "1300s", term: "Cloud", meaning: "Mass of water vapor in sky", usage_example: "The meaning shifted because billowing cloud formations resembled rocky cliffs.", sentiment: "neutral" },
                    { order: 3, era: "1990s", term: "Cloud (diagram)", meaning: "The internet (in network diagrams)", usage_example: "Engineers drew a cloud symbol to represent 'the network we don't control'.", sentiment: "neutral" },
                    { order: 4, era: "2006", term: "Cloud computing", meaning: "Remote servers and storage", usage_example: "Amazon launched AWS. 'The cloud' became where your photos, data, and apps live.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#0284C7",
        root_family: null
    },
    {
        word: "Spam",
        definition: "Unwanted electronic messages sent in bulk.",
        phonetic: "/spæm/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Junk email is named after canned meat — thanks to a 1970 Monty Python sketch about Viking-sung SPAM.",
            fun_fact: "In the sketch, every menu item contains SPAM. Vikings drown out conversation by singing 'SPAM SPAM SPAM'. Early internet users compared unwanted messages to this.",
            nerd_mode: { ipa_full: "/spæm/ (both)", earliest_citation: "SPAM (meat) trademarked 1937 by Hormel. Internet 'spam' first used on Usenet circa 1993." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1937", term: "SPAM", meaning: "Canned spiced ham (Hormel product)", usage_example: "Hormel's 'Spiced Ham' was shortened to SPAM — it fed Allied troops in WWII.", sentiment: "neutral" },
                    { order: 2, era: "1970", term: "Spam (comedy)", meaning: "Inescapable, unwanted thing", usage_example: "Monty Python's sketch showed a café where every dish contained SPAM — impossible to avoid.", sentiment: "positive" },
                    { order: 3, era: "1993", term: "spam (internet)", meaning: "Mass unsolicited messages", usage_example: "Early Usenet users called flooding a forum with repeated messages 'spamming'.", sentiment: "negative" },
                    { order: 4, era: "2020s", term: "Spam", meaning: "Any unwanted digital content", usage_example: "'Check your spam folder' — now a universal phrase in email culture.", sentiment: "negative" }
                ]
            }
        },
        accent_color: "#DC2626",
        root_family: null
    },
    {
        word: "Troll",
        definition: "A person who deliberately provokes others online.",
        phonetic: "/troʊl/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Internet trolls aren't named after the monster under the bridge — they're named after a fishing technique.",
            fun_fact: "'Trolling' in fishing means dragging bait behind a boat to catch fish. Online trolls 'drag bait' to catch angry responses. The Norse monster association came later.",
            nerd_mode: { ipa_full: "/tɹəʊl/ (British), /tɹoʊl/ (American)", earliest_citation: "Fishing sense from Old French 'troller' (to wander). Internet sense from early 1990s Usenet." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1300s", term: "Troller", meaning: "To wander, ramble (Old French)", usage_example: "French 'troller' meant to wander around — later applied to dragging bait while fishing.", sentiment: "neutral" },
                    { order: 2, era: "1600s", term: "Troll (fishing)", meaning: "To fish by dragging bait", usage_example: "Anglers trolled for fish by slowly pulling lures through the water.", sentiment: "neutral" },
                    { order: 3, era: "1990s", term: "Troll (internet)", meaning: "To post provocative bait online", usage_example: "Usenet users called deliberate provocation 'trolling' — dragging bait for angry replies.", sentiment: "negative" },
                    { order: 4, era: "2010s", term: "Troll", meaning: "Professional provocateur / bad actor", usage_example: "'Russian troll farms' elevated trolling from hobby to geopolitical weapon.", sentiment: "negative_shift" }
                ]
            }
        },
        accent_color: "#334155",
        root_family: null
    },
    {
        word: "Avatar",
        definition: "An icon or figure representing a person in video games, internet forums, or virtual worlds.",
        phonetic: "/ˈævətɑːr/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Your profile picture carries the weight of Hindu theology — 'avatar' means a god descending to Earth in physical form.",
            fun_fact: "Sanskrit 'avatāra' = 'ava' (down) + 'tṛ' (to pass/cross). Vishnu has 10 avatars. Neal Stephenson repurposed the word in 'Snow Crash' (1992).",
            nerd_mode: { ipa_full: "/ˈæv.ə.tɑː(ɹ)/ (both)", earliest_citation: "Sanskrit origin ancient. English use from 1784 (Hindu theology). Digital sense from 1985 (Habitat game), popularized by Stephenson 1992." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "ancient", term: "Avatāra", meaning: "Descent of a deity (Sanskrit)", usage_example: "Vishnu takes avatars — incarnations such as Rama and Krishna — to restore cosmic order.", sentiment: "positive" },
                    { order: 2, era: "1784", term: "Avatar", meaning: "Incarnation of a Hindu god", usage_example: "English scholars used 'avatar' when writing about Hindu theology.", sentiment: "neutral" },
                    { order: 3, era: "1985", term: "Avatar", meaning: "Digital representation of a user", usage_example: "Lucasfilm's Habitat was the first online world to use 'avatar' for player characters.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Avatar", meaning: "Any digital identity / profile representation", usage_example: "From Zoom to gaming to the metaverse — your avatar is your digital self.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#6D28D9",
        root_family: "SANSKRIT_avatara"
    },
    {
        word: "Awful",
        definition: "Very bad or unpleasant.",
        phonetic: "/ˈɔːfʊl/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Awful used to be the highest compliment — it meant 'full of awe', worthy of deep respect.",
            fun_fact: "'Awe-full' → awful. It meant 'inspiring awe and wonder' until the 1800s, when it completely inverted to mean 'terrible'.",
            nerd_mode: { ipa_full: "/ˈɔː.fʊl/ (British), /ˈɑː.fəl/ (American)", earliest_citation: "Old English 'egefull' (awe-inspiring). Modern negative sense from circa 1818." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1000 CE", term: "Egefull", meaning: "Worthy of awe, deeply impressive", usage_example: "An 'awful' cathedral inspired reverence and wonder in medieval worshippers.", sentiment: "positive" },
                    { order: 2, era: "1300s", term: "Awful", meaning: "Commanding respect, solemnly impressive", usage_example: "'The awful majesty of God' — used to describe divine grandeur.", sentiment: "positive" },
                    { order: 3, era: "1800s", term: "Awful", meaning: "Extremely bad, terrible", usage_example: "The word inverted completely. 'Awful weather' means terrible weather.", sentiment: "negative_shift" },
                    { order: 4, era: "2020s", term: "Awful", meaning: "Very bad (purely negative)", usage_example: "'That movie was awful' — no trace of its original reverent meaning survives.", sentiment: "negative" }
                ]
            }
        },
        accent_color: "#DC2626",
        root_family: null
    },
    {
        word: "Silly",
        definition: "Having or showing a lack of common sense or judgement; absurd.",
        phonetic: "/ˈsɪli/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Silly once meant 'blessed by God' — it took 800 years to become an insult.",
            fun_fact: "Old English 'sǣlig' = blessed, happy, fortunate. It degraded through: blessed → innocent → naive → foolish → absurd.",
            nerd_mode: { ipa_full: "/ˈsɪl.i/ (both)", earliest_citation: "Old English 'sǣlig' (blessed), circa 900 CE. Modern 'foolish' sense from 1570s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "900 CE", term: "Sǣlig", meaning: "Blessed, happy, fortunate", usage_example: "A 'sǣlig' person was someone touched by divine grace.", sentiment: "positive" },
                    { order: 2, era: "1200s", term: "Sely", meaning: "Innocent, harmless, pitiable", usage_example: "Chaucer used 'sely' to mean innocent — a 'sely sheep' was a helpless lamb.", sentiment: "neutral" },
                    { order: 3, era: "1400s", term: "Silly", meaning: "Weak, frail, deserving pity", usage_example: "The 'silly' person was someone too innocent for the harsh world.", sentiment: "negative" },
                    { order: 4, era: "1570s", term: "Silly", meaning: "Foolish, lacking sense", usage_example: "Innocence became weakness became stupidity. 'Don't be silly' entered the language.", sentiment: "negative" }
                ]
            }
        },
        accent_color: "#CA8A04",
        root_family: null
    },
    {
        word: "Girl",
        definition: "A female child or young woman.",
        phonetic: "/ɡɜːrl/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Until the 1400s, 'girl' meant any young person — boys were girls too.",
            fun_fact: "Middle English 'gyrle' was gender-neutral. A male child was a 'knave girl' and a female was a 'gay girl'. The word only became female-specific gradually.",
            nerd_mode: { ipa_full: "/ɡɜːl/ (British), /ɡɜːɹl/ (American)", earliest_citation: "First in Middle English circa 1290 as 'gyrle' (child of either sex). Origin uncertain." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1290", term: "Gyrle", meaning: "Young person of either sex", usage_example: "Medieval texts used 'gyrle' for any child, regardless of gender.", sentiment: "neutral" },
                    { order: 2, era: "1400s", term: "Girl", meaning: "Beginning to shift toward female", usage_example: "The word started appearing more frequently for female children specifically.", sentiment: "neutral" },
                    { order: 3, era: "1530s", term: "Girl", meaning: "Female child (exclusively)", usage_example: "'Girl' became exclusively female. 'Boy' took over as the male-specific term.", sentiment: "neutral" },
                    { order: 4, era: "2020s", term: "Girl", meaning: "Female child / young woman / informal address", usage_example: "'Girl, did you see that?' — expanded to casual address among friends.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#E11D48",
        root_family: null
    },
    {
        word: "Villain",
        definition: "A person guilty of or capable of a crime or wickedness.",
        phonetic: "/ˈvɪlən/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Villains were just farmers — 'villanus' meant someone who worked on a villa estate. Class snobbery turned it evil.",
            fun_fact: "Latin 'villanus' = farmworker, from 'villa' (country estate). The nobility's contempt for peasants gradually turned 'villain' into 'evil person'.",
            nerd_mode: { ipa_full: "/ˈvɪl.ən/ (both)", earliest_citation: "First in English circa 1300 from Old French 'vilain' (peasant), from Latin 'villanus'." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "100 CE", term: "Villanus", meaning: "Worker on a villa/farm estate", usage_example: "Roman 'villanus' simply described someone who worked agricultural land.", sentiment: "neutral" },
                    { order: 2, era: "1300s", term: "Vilain", meaning: "Peasant, low-born person", usage_example: "Norman French 'vilain' carried class contempt — a person of low birth and manners.", sentiment: "negative" },
                    { order: 3, era: "1500s", term: "Villain", meaning: "Wicked, base person", usage_example: "Shakespeare used 'villain' as a term of pure moral condemnation.", sentiment: "negative" },
                    { order: 4, era: "2020s", term: "Villain", meaning: "Antagonist in stories / embraced persona", usage_example: "'Villain era' — gen Z reframes villainy as empowerment and self-assertion.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#1E293B",
        root_family: "LATIN_villa"
    },
    {
        word: "Naughty",
        definition: "Badly behaved, especially of a child; mildly rude.",
        phonetic: "/ˈnɔːti/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Naughty used to mean 'owning nothing' — being poor was considered a moral failing.",
            fun_fact: "'Naughty' comes from 'naught' (nothing). Having nothing → being worthless → being wicked → being mildly misbehaved.",
            nerd_mode: { ipa_full: "/ˈnɔː.ti/ (British), /ˈnɑː.t̬i/ (American)", earliest_citation: "First in English circa 1375 from 'naught' + '-y'. Originally meant 'having nothing, poor'." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1375", term: "Naughty", meaning: "Having nothing, poor, needy", usage_example: "A 'naughty' person was destitute — 'having naught' was their defining trait.", sentiment: "negative" },
                    { order: 2, era: "1400s", term: "Naughty", meaning: "Morally bad, wicked", usage_example: "Tyndale's Bible (1534): 'a naughty person, a wicked man' — serious moral failure.", sentiment: "negative" },
                    { order: 3, era: "1600s", term: "Naughty", meaning: "Badly behaved", usage_example: "Shakespeare used it for both serious wickedness and minor misbehavior.", sentiment: "negative" },
                    { order: 4, era: "2020s", term: "Naughty", meaning: "Mildly mischievous / risqué", usage_example: "'Oh, you're being naughty!' — now almost playful. A stunning softening over centuries.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#BE185D",
        root_family: null
    },
    {
        word: "Bully",
        definition: "A person who habitually seeks to harm or intimidate those perceived as vulnerable.",
        phonetic: "/ˈbʊli/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Bully originally meant 'sweetheart' — you could call someone 'my bully' as a term of endearment.",
            fun_fact: "Dutch 'boel' = lover, sweetheart. English borrowed it as 'bully' (fine fellow, darling). Over 300 years it flipped to its modern menacing meaning.",
            nerd_mode: { ipa_full: "/ˈbʊl.i/ (both)", earliest_citation: "First in English 1530s as 'sweetheart' from Dutch 'boel' (lover). Negative sense by 1680s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1530s", term: "Bully", meaning: "Sweetheart, darling, fine fellow", usage_example: "Shakespeare's Henry V: 'I love the lovely bully' — a genuine compliment.", sentiment: "positive" },
                    { order: 2, era: "1600s", term: "Bully", meaning: "Swaggering brave fellow", usage_example: "'Bully boy' meant a bold, admirable man — still positive but gaining edge.", sentiment: "positive" },
                    { order: 3, era: "1680s", term: "Bully", meaning: "Harasser, coward who picks on the weak", usage_example: "The word completely inverted — a bully became someone who terrorizes others.", sentiment: "negative_shift" },
                    { order: 4, era: "2020s", term: "Bully", meaning: "Intimidator / cyberbully", usage_example: "Anti-bullying campaigns make 'bully' one of the most negatively charged words in schools.", sentiment: "negative" }
                ]
            }
        },
        accent_color: "#B91C1C",
        root_family: null
    },
    {
        word: "Clue",
        definition: "A piece of evidence or information used in solving a mystery.",
        phonetic: "/kluː/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Every detective following 'clues' is unwinding Theseus's ball of thread through the Minotaur's labyrinth.",
            fun_fact: "Middle English 'clew' = ball of thread. Theseus used a ball of thread (clew) to find his way out of the Labyrinth. Following a 'clue' = following the thread.",
            nerd_mode: { ipa_full: "/kluː/ (both)", earliest_citation: "Old English 'cleowen' (ball of thread). Metaphorical 'guide to a solution' sense from 1620s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "Old English", term: "Cleowen / Clew", meaning: "Ball of thread or yarn", usage_example: "Women wound thread into a 'clew' — a tight ball for spinning and weaving.", sentiment: "neutral" },
                    { order: 2, era: "1300s", term: "Clew", meaning: "Thread that guides through a maze", usage_example: "Chaucer referenced 'the clewe' in retelling the myth of Theseus and the Labyrinth.", sentiment: "neutral" },
                    { order: 3, era: "1620s", term: "Clue", meaning: "Something that guides to a solution", usage_example: "The spelling shifted and the meaning abstractified — any guide through confusion.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Clue", meaning: "Evidence in investigation / hint", usage_example: "'I haven't got a clue' — the thread metaphor is completely invisible now.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#0891B2",
        root_family: null
    },
    {
        word: "Idiot",
        definition: "A stupid person.",
        phonetic: "/ˈɪdiət/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "In ancient Athens, an 'idiot' wasn't stupid — they just didn't vote. Private citizens were the original idiots.",
            fun_fact: "Greek 'idiotes' = private citizen, someone who doesn't participate in public affairs. Athenians considered non-participation a sign of ignorance.",
            nerd_mode: { ipa_full: "/ˈɪd.i.ət/ (both)", earliest_citation: "First in English circa 1300 from Latin 'idiota' (ordinary person), from Greek 'idiotes'." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "500 BCE", term: "Idiotes", meaning: "Private citizen, layperson", usage_example: "In democratic Athens, an 'idiotes' was someone who kept to themselves rather than engaging in politics.", sentiment: "neutral" },
                    { order: 2, era: "100 CE", term: "Idiota", meaning: "Uneducated, ordinary person", usage_example: "Latin shifted the meaning toward 'uneducated' — anyone not involved in public life was assumed ignorant.", sentiment: "negative" },
                    { order: 3, era: "1300s", term: "Idiot", meaning: "Mentally deficient person", usage_example: "English law classified intellectual disability in tiers: 'idiot' was the most severe.", sentiment: "negative" },
                    { order: 4, era: "2020s", term: "Idiot", meaning: "Stupid person (casual insult)", usage_example: "'Don't be an idiot' — a common insult with no clinical connotation remaining.", sentiment: "negative" }
                ]
            }
        },
        accent_color: "#334155",
        root_family: "GREEK_idios"
    },
    {
        word: "Gossip",
        definition: "Casual or unconstrained conversation about other people.",
        phonetic: "/ˈɡɒsɪp/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Gossips were originally godparents — 'god-sibling' described the sacred bond between baptism sponsors.",
            fun_fact: "Old English 'godsibb' = God + sibling. Your 'godsib' was your child's godparent — a close, trusted companion. Then they started chatting…",
            nerd_mode: { ipa_full: "/ˈɡɒs.ɪp/ (British), /ˈɡɑː.sɪp/ (American)", earliest_citation: "Old English 'godsibb' (sponsor in baptism). 'Idle talk' sense from 1560s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1000 CE", term: "Godsibb", meaning: "Godparent, baptismal sponsor", usage_example: "Your 'godsibb' stood beside you at your child's christening — a sacred relationship.", sentiment: "positive" },
                    { order: 2, era: "1300s", term: "Gossib", meaning: "Close friend, companion", usage_example: "The word broadened from godparent to any close confidant — someone you'd share secrets with.", sentiment: "positive" },
                    { order: 3, era: "1560s", term: "Gossip", meaning: "Person who chatters idly / the chatter itself", usage_example: "Sharing secrets became sharing rumors. The sacred bond became idle talk.", sentiment: "negative" },
                    { order: 4, era: "2020s", term: "Gossip", meaning: "Casual talk about others / entertainment genre", usage_example: "'Spill the gossip!' — now a form of entertainment, not just a vice.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#BE185D",
        root_family: null
    },
    {
        word: "Hacker",
        definition: "A person skilled in computing who gains unauthorized access to systems.",
        phonetic: "/ˈhækər/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Hackers used to be the good guys — the word meant 'brilliant programmer' before the media ruined it.",
            fun_fact: "MIT's Tech Model Railroad Club coined 'hack' in the 1960s for an elegant technical solution. Journalists later redefined it as criminal computer intrusion.",
            nerd_mode: { ipa_full: "/ˈhæk.ə(ɹ)/ (both)", earliest_citation: "Computing sense from 1960s MIT. 'Criminal' sense popularized by media in the 1980s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1200s", term: "Hack", meaning: "To chop roughly with an axe", usage_example: "Middle English 'hacken' — cutting wood with rough, irregular blows.", sentiment: "neutral" },
                    { order: 2, era: "1960s", term: "Hacker", meaning: "Brilliant programmer / creative problem solver", usage_example: "MIT hackers built the first computer games and pioneered open-source culture.", sentiment: "positive" },
                    { order: 3, era: "1983", term: "Hacker", meaning: "Computer criminal", usage_example: "The film 'WarGames' and real arrests made 'hacker' synonymous with cybercrime.", sentiment: "negative_shift" },
                    { order: 4, era: "2020s", term: "Hack", meaning: "Clever shortcut / life hack", usage_example: "'This kitchen hack will change your life!' — the word keeps evolving.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#059669",
        root_family: null
    },
    {
        word: "Broadcast",
        definition: "Transmit a program or information by radio, television, or internet.",
        phonetic: "/ˈbrɔːdkɑːst/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Broadcasting was a farming technique — you 'cast' seeds 'broadly' across a field. Radio borrowed the metaphor.",
            fun_fact: "Farmers broadcast seeds by flinging them widely. When radio arrived, engineers needed a word for sending signals in all directions — 'broadcast' was perfect.",
            nerd_mode: { ipa_full: "/ˈbrɔːd.kɑːst/ (British), /ˈbrɑːd.kæst/ (American)", earliest_citation: "Agricultural sense from 1760s. Radio/TV sense from 1921." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1760s", term: "Broadcast", meaning: "Scattering seeds widely over soil", usage_example: "Farmers walked fields, broadcasting seeds by hand in broad sweeping motions.", sentiment: "neutral" },
                    { order: 2, era: "1921", term: "Broadcast", meaning: "Transmit radio signals widely", usage_example: "KDKA Pittsburgh began regular 'broadcasting' — scattering electromagnetic seeds.", sentiment: "positive" },
                    { order: 3, era: "1950s", term: "Broadcast", meaning: "TV/radio transmission to mass audience", usage_example: "The 'broadcast networks' — ABC, CBS, NBC — defined mass media.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Broadcast", meaning: "Any wide distribution (including digital)", usage_example: "'Broadcast your message on social media' — the agricultural metaphor lives on.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#0284C7",
        root_family: null
    },
    {
        word: "Dashboard",
        definition: "A panel of instruments and controls facing the driver of a vehicle, or a data display interface.",
        phonetic: "/ˈdæʃbɔːrd/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Your car's dashboard was originally a wooden board that stopped mud from 'dashing' into your face on a horse-drawn carriage.",
            fun_fact: "A 'dash-board' was literally a board that blocked mud, stones, and water thrown up ('dashed') by horse hooves.",
            nerd_mode: { ipa_full: "/ˈdæʃ.bɔːd/ (British), /ˈdæʃ.bɔːɹd/ (American)", earliest_citation: "First in English 1842 for carriages. Automobile sense from early 1900s. Software sense from 1990s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1842", term: "Dashboard", meaning: "Board on carriage to block splashing mud", usage_example: "The dashboard protected carriage riders from mud and stones 'dashed' up by horses.", sentiment: "neutral" },
                    { order: 2, era: "1900s", term: "Dashboard", meaning: "Panel in front of car driver", usage_example: "Cars kept the term even though there was no mud to block — instruments went there instead.", sentiment: "neutral" },
                    { order: 3, era: "1990s", term: "Dashboard", meaning: "Software interface showing key metrics", usage_example: "Business intelligence tools adopted 'dashboard' for at-a-glance data displays.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Dashboard", meaning: "Any summary view of data", usage_example: "'Check the analytics dashboard' — from mud-blocker to data visualizer.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#0E7490",
        root_family: null
    },
    {
        word: "Computer",
        definition: "An electronic device for storing and processing data.",
        phonetic: "/kəmˈpjuːtər/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "The first computers were women — human 'computers' calculated artillery trajectories during World War II.",
            fun_fact: "Until the 1940s, 'computer' was a job title. NASA's human computers (including Katherine Johnson) calculated rocket trajectories by hand.",
            nerd_mode: { ipa_full: "/kəmˈpjuː.tə(ɹ)/ (both)", earliest_citation: "First in English 1613 meaning 'one who computes'. Machine sense from 1940s." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1613", term: "Computer", meaning: "A person who performs calculations", usage_example: "Richard Braithwaite wrote of a mathematician as 'the truest computer of times'.", sentiment: "neutral" },
                    { order: 2, era: "1940s", term: "Computer", meaning: "Electronic calculating machine", usage_example: "ENIAC (1945) was called an 'electronic computer' — the human and machine meanings coexisted.", sentiment: "positive" },
                    { order: 3, era: "1980s", term: "Personal Computer", meaning: "Individual desktop machine", usage_example: "The IBM PC and Apple Macintosh brought 'computers' into homes.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Computer", meaning: "Any programmable digital device", usage_example: "Your phone is a computer. Your watch is a computer. Your refrigerator might be a computer.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#0891B2",
        root_family: "LATIN_computare"
    },
    {
        word: "Camera",
        definition: "A device for recording visual images.",
        phonetic: "/ˈkæmərə/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Camera means 'room' in Latin — the first camera was literally a dark room with a hole in the wall.",
            fun_fact: "'Camera obscura' = dark room. A pinhole in a dark room projects an inverted image of the outside world. This principle led to photography.",
            nerd_mode: { ipa_full: "/ˈkæm.ɹə/ (British), /ˈkæm.ɚ.ə/ (American)", earliest_citation: "Latin 'camera' (room/vault) ancient. 'Camera obscura' described by Ibn al-Haytham circa 1000 CE. Photographic sense from 1840." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "100 BCE", term: "Camera", meaning: "Vaulted room or chamber (Latin)", usage_example: "Romans used 'camera' for any arched or vaulted room.", sentiment: "neutral" },
                    { order: 2, era: "1000 CE", term: "Camera obscura", meaning: "Dark room with pinhole projection", usage_example: "Ibn al-Haytham described how a dark room with a small hole projects images.", sentiment: "positive" },
                    { order: 3, era: "1840", term: "Camera", meaning: "Device for capturing photographs", usage_example: "The photographic camera took its name from the camera obscura principle it miniaturized.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Camera", meaning: "Any image-capture sensor", usage_example: "Your phone has multiple cameras. Ring doorbells have cameras. Cameras see everything.", sentiment: "neutral" }
                ]
            }
        },
        accent_color: "#334155",
        root_family: "LATIN_camera"
    },
    {
        word: "Pixel",
        definition: "A minute area of illumination on a display screen, the smallest controllable element.",
        phonetic: "/ˈpɪksəl/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Pixel is a portmanteau invented in 1965 — 'picture' + 'element', shortened to the snappiest word in digital imaging.",
            fun_fact: "Frederic Billingsley of JPL is often credited with popularizing 'pixel' in 1965, though the exact coiner is debated.",
            nerd_mode: { ipa_full: "/ˈpɪk.səl/ (both)", earliest_citation: "First published use circa 1965, from 'pix' (pictures) + 'el' (element)." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1965", term: "Pixel", meaning: "Smallest element of a digital image", usage_example: "JPL engineers needed a word for the dots in digitized space photos — 'pixel' was born.", sentiment: "neutral" },
                    { order: 2, era: "1980s", term: "Pixel", meaning: "Building block of computer graphics", usage_example: "8-bit games made pixels visible — characters were clearly made of tiny squares.", sentiment: "positive" },
                    { order: 3, era: "2000s", term: "Megapixel", meaning: "Camera resolution metric", usage_example: "'How many megapixels?' became the standard question when buying a digital camera.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Pixel", meaning: "Invisible unit / Google brand name", usage_example: "Modern screens have so many pixels they're invisible. Google named their phone 'Pixel'.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#0891B2",
        root_family: null
    },
    {
        word: "Emoji",
        definition: "A small digital image or icon used to express an idea or emotion.",
        phonetic: "/ɪˈmoʊdʒi/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Emoji does NOT come from 'emotion' — it's Japanese for 'picture character'. The resemblance is pure coincidence.",
            fun_fact: "Japanese 'e' (絵 picture) + 'moji' (文字 character). Shigetaka Kurita designed the first 176 emoji for NTT DoCoMo's i-mode in 1999.",
            nerd_mode: { ipa_full: "/ɪˈmoʊ.dʒi/ (American), /ɪˈməʊ.dʒi/ (British)", earliest_citation: "Created by Shigetaka Kurita in 1999. Entered English widely after 2010 Unicode adoption." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1999", term: "絵文字 (emoji)", meaning: "Picture characters for mobile phones (Japanese)", usage_example: "Kurita designed 176 12×12 pixel emoji for Japanese carrier NTT DoCoMo's pagers.", sentiment: "positive" },
                    { order: 2, era: "2010", term: "Emoji", meaning: "Unicode-standardized pictographs", usage_example: "Unicode Consortium adopted emoji, making them work across all devices worldwide.", sentiment: "positive" },
                    { order: 3, era: "2015", term: "Emoji", meaning: "Cultural communication tool", usage_example: "Oxford Dictionaries named 😂 (Face with Tears of Joy) the 'Word of the Year'.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Emoji", meaning: "Universal visual language", usage_example: "Over 3,600 emoji exist. They influence lawsuits, diplomacy, and daily communication.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#EAB308",
        root_family: "JAPANESE_emoji"
    },
    {
        word: "Podcast",
        definition: "A digital audio file available for download, typically part of a series.",
        phonetic: "/ˈpɒdkɑːst/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Podcast was coined from 'iPod' + 'broadcast' — but most people have never listened to one on an iPod.",
            fun_fact: "Ben Hammersley coined 'podcasting' in a 2004 Guardian article, almost as a throwaway suggestion. Apple didn't add podcast support to iTunes until 2005.",
            nerd_mode: { ipa_full: "/ˈpɒd.kɑːst/ (British), /ˈpɑːd.kæst/ (American)", earliest_citation: "Coined by Ben Hammersley in The Guardian, February 12, 2004." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "2000", term: "RSS enclosures", meaning: "Audio files attached to web feeds", usage_example: "Dave Winer and Adam Curry experimented with distributing audio via RSS feeds.", sentiment: "neutral" },
                    { order: 2, era: "2004", term: "Podcasting", meaning: "iPod + broadcasting (newly coined)", usage_example: "Ben Hammersley: 'Audioblogging? Podcasting? GuerillaMedia?' — one suggestion stuck.", sentiment: "positive" },
                    { order: 3, era: "2014", term: "Podcast", meaning: "Mainstream narrative audio format", usage_example: "'Serial' became the first podcast to reach 5 million downloads, proving the medium's potential.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Podcast", meaning: "Dominant alternative media format", usage_example: "Joe Rogan signed a $250M Spotify deal. Podcasts became a primary news and entertainment source.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#7C3AED",
        root_family: null
    },
    {
        word: "Meme",
        definition: "A cultural unit of information that spreads by imitation, or an internet image with humorous text.",
        phonetic: "/miːm/",
        visualization_type: "TIMELINE",
        content_json: {
            hook: "Meme was invented by Richard Dawkins in 1976 to describe how ideas evolve — he had no idea it would become cat pictures.",
            fun_fact: "Dawkins coined 'meme' from Greek 'mimēma' (something imitated), deliberately shortening it to rhyme with 'gene'. He wanted a word for a unit of cultural transmission — jokes, tunes, catchphrases.",
            nerd_mode: { ipa_full: "/miːm/ (both)", earliest_citation: "Coined by Richard Dawkins in 'The Selfish Gene' (1976), from Greek 'mimēma' (imitated thing)." },
            visual_data: {
                type: "TIMELINE", epochs: [
                    { order: 1, era: "1976", term: "Meme (coined)", meaning: "Unit of cultural transmission (analogous to gene)", usage_example: "Dawkins: 'We need a name for the new replicator, a noun that conveys the idea of cultural transmission.'", sentiment: "neutral" },
                    { order: 2, era: "1990s", term: "Meme", meaning: "Academic concept in memetics", usage_example: "Susan Blackmore's 'The Meme Machine' (1999) argued that memes are true replicators driving cultural evolution.", sentiment: "neutral" },
                    { order: 3, era: "2005", term: "Internet meme", meaning: "Viral image/video spreading online", usage_example: "LOLcats, 'All Your Base', and early viral images became the first recognizable 'internet memes'.", sentiment: "positive" },
                    { order: 4, era: "2020s", term: "Meme", meaning: "Any shareable humorous internet content", usage_example: "Memes became a primary form of political commentary, marketing, and social bonding for Gen Z.", sentiment: "positive" }
                ]
            }
        },
        accent_color: "#06B6D4",
        root_family: "GREEK_mimema"
    }
];
