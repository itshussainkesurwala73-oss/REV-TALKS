import { Article } from '../types/article';

// Generated authentic imagery assets
import mclarenF1Img from '../assets/images/apex_mclaren_f1_1791384640098.jpg';
import mazda787bImg from '../assets/images/apex_mazda_787b_1791384723870.jpg';
import ducati916Img from '../assets/images/apex_ducati_916_1791384735690.jpg';
import porsche993Img from '../assets/images/apex_porsche_993_1791384757871.jpg';
import yamahaRd350Img from '../assets/images/apex_yamaha_rd350_1791384772534.jpg';
import koenigseggJeskoImg from '../assets/images/apex_koenigsegg_jesko_1791384784345.jpg';
import hondaCb750Img from '../assets/images/apex_honda_cb750_1791384804408.jpg';
import evPowertrainImg from '../assets/images/apex_ev_powertrain_1791384835077.jpg';
import bmwE30M3Img from '../assets/images/apex_bmw_m3_e30_1791384852860.jpg';
import kawasakiH2Img from '../assets/images/apex_kawasaki_h2r_1791384864209.jpg';

export const ARTICLES: Article[] = [
  {
    id: 'mclaren-f1-purity',
    slug: 'mclaren-f1-gordon-murray-atmospheric-purity',
    title: 'The Unrepeatable Zenith: Gordon Murray’s McLaren F1',
    subtitle: 'Why three decades later, no hypercar has ever equaled the analog clarity of chassis XP5 at 240.1 mph.',
    category: 'Supercars',
    vehicleType: 'Car',
    featured: true,
    author: {
      name: 'Julian Vance',
      role: 'Chief Technical Editor',
    },
    publishedDate: 'October 2026',
    readTimeMinutes: 7,
    heroImage: mclarenF1Img,
    imageCaption: '1993 McLaren F1 Chassis in Magnesium Silver, displaying the central monocoque silhouette that redefined lightweight composites.',
    photographerCredit: 'Rev Talks Technical Collection',
    historicalEra: '1992–1998',
    tags: ['Gordon Murray', 'BMW S70/2', 'Carbon Monocoque', 'Naturally Aspirated', 'Analog Driving'],
    keySpecs: [
      { label: 'Powertrain', value: '6.1L BMW S70/2 60° V12' },
      { label: 'Peak Power', value: '618 bhp @ 7,400 rpm' },
      { label: 'Kerb Weight', value: '1,138 kg (2,509 lbs)' },
      { label: 'Top Speed Record', value: '240.1 mph (386.4 km/h)' },
      { label: 'Engine Bay Foil', value: '16g Pure Gold Heatshield' }
    ],
    excerpt: 'Gordon Murray designed the McLaren F1 not to break records, but to deliver the ultimate visceral driver interface. Without power steering, ABS, or turbos, it ended up setting a production speed benchmark that stands unbroken for naturally aspirated cars.',
    sections: [
      {
        heading: 'A Departure from Supercar Orthodoxy',
        content: [
          'In the late 1980s, supercar design was descending into cosmetic excess. Heavy all-wheel-drive systems, twin turbos with massive lag, and wide cosmetic side strakes defined the era. Waiting for a flight back from the 1988 Italian Grand Prix at Milan’s Linate Airport, Formula 1 designer Gordon Murray sketched a radical manifesto on a napkin for Mansour Ojjeh and Ron Dennis.',
          'His premise was mercilessly pure: build a three-seat road car centered entirely on the driver, weighing strictly under 1,140 kilograms, with zero electronic intervention between throttle pedal, steering rack, and asphalt.',
          'To achieve this target, Murray pioneered the world’s first full carbon-fiber-reinforced polymer (CFRP) monocoque for a production vehicle. The monocoque weighed just 100 kg, possessing structural rigidity that surpassed contemporary racing chassis.'
        ],
        quote: 'I wanted the driver to sit in the center, equidistant from both wheelarches, experiencing zero parallax error when placing the tires on an apex.'
      },
      {
        heading: 'The BMW S70/2 V12: Paul Rosche’s Masterwork',
        content: [
          'Murray initially approached Honda to build a 4.5-liter V10 or V12 engine based on their dominant Formula 1 relationship. When Honda declined, Murray turned to legendary BMW Motorsport engine architect Paul Rosche.',
          'Murray handed Rosche an exacting brief: the engine must be naturally aspirated for immediate throttle response, rev beyond 7,500 rpm, produce over 550 horsepower, and measure no more than 600 mm in length.',
          'Rosche delivered the S70/2: a 6,064 cc 60-degree quad-cam V12 delivering 618 horsepower and 479 lb-ft of torque. Because exhaust temperatures under full throttle reached blistering thresholds, Murray lined the engine bay with 16 grams of pure gold leaf foil, the most effective radiant heat reflector known to physics.'
        ],
        callout: {
          title: 'Mechanical Highlight: The Ground-Plane Aerodynamics',
          text: 'Rather than fitting an unwieldy rear wing that generated parasitic drag, Murray utilized two electric Kevlar fans inside the rear floor to actively evacuate boundary-layer air, creating true ground effect downforce without sacrificing high-speed slipperiness (Cd 0.32).'
        }
      },
      {
        heading: 'Why It Remains Untouchable',
        content: [
          'On March 31, 1998, Andy Wallace took McLaren F1 prototype XP5 to the Volkswagen Ehra-Lessien high-speed test oval in Germany. Removing the 7,500 rpm rev-limiter to 8,300 rpm, the car clocked a two-way average of 240.1 mph (386.4 km/h).',
          'Today, modern hypercars exceed 300 mph, but they require four turbochargers, hybrid battery packs, all-wheel drive, and weigh over 4,400 lbs. The McLaren F1 did it with a manual gear lever, three pedals, atmospheric combustion, and light-footed agility that will likely never be replicated.'
        ]
      }
    ]
  },
  {
    id: 'mazda-787b-rotary-triumph',
    slug: 'mazda-787b-quad-rotor-le-mans-conquest',
    title: 'The Screaming Rotor: How Mazda’s 787B Silenced Le Mans',
    subtitle: 'The engineering audacity of the 700-hp R26B engine and Japan’s first overall victory at Circuit de la Sarthe in 1991.',
    category: 'Motorsport',
    vehicleType: 'Car',
    featured: true,
    author: {
      name: 'Kenji Takahashi',
      role: 'Motorsport Historian',
    },
    publishedDate: 'September 2026',
    readTimeMinutes: 6,
    heroImage: mazda787bImg,
    imageCaption: 'Mazda 787B Chassis #002 in iconic Renown diamond-pattern livery, captured resting in the Circuit de la Sarthe paddock.',
    photographerCredit: 'Rev Talks Le Mans Archive',
    historicalEra: '1991',
    tags: ['Wankel Rotary', 'Le Mans 24 Hours', 'R26B Quad-Rotor', 'Group C', 'Mazdaspeed'],
    keySpecs: [
      { label: 'Engine Code', value: 'Mazda R26B 4-Rotor Wankel' },
      { label: 'Displacement', value: '2,616 cc (4 x 654 cc)' },
      { label: 'Power Output', value: '700 hp @ 9,000 rpm' },
      { label: 'Acoustic Signature', value: '118 dB @ full throttle' },
      { label: 'Total Distance', value: '4,922.8 km (362 laps)' }
    ],
    excerpt: 'On June 23, 1991, against towering factory entries from Jaguar, Mercedes-Benz, and Porsche, Mazda’s naturally aspirated 4-rotor Wankel 787B became the first Japanese manufacturer to claim overall victory at the 24 Hours of Le Mans.',
    sections: [
      {
        heading: 'Defying the Piston Engine Monoculture',
        content: [
          'For nearly four decades, Felix Wankel’s rotary design had been derided by conservative European and American manufacturers. Critics cited rotor tip apex seal wear, thermal inefficiency, and emissions hurdles. Yet Mazda’s engineers in Hiroshima refused to surrender.',
          'Entering the 1991 24 Hours of Le Mans, the FIA had announced that Group C regulations would outlaw rotary engines beginning in 1992, mandating 3.5-liter Formula 1-style naturally aspirated piston engines. It was Mazda’s final chance.'
        ],
        quote: 'We knew 1991 was our last year of eligibility. We did not build a car to survive 24 hours; we built a car to sprint for 24 continuous hours.'
      },
      {
        heading: 'Anatomy of the R26B Quad-Rotor',
        content: [
          'At the heart of car #55 sat the R26B: four triangular rotors mounted on an eccentric shaft, displacing 654 cc per chamber for an equivalent calculated displacement of 2.6 liters.',
          'To overcome apex seal degradation under prolonged heat, Mazda partnered with ceramic specialists to develop silicon nitride ceramic seals. Furthermore, the engine featured continuously variable intake runners (telescopic trumpets) managed by an electronic ECU, dynamically adjusting runner length across the rev range to guarantee linear torque.',
          'With three spark plugs per rotor (12 plugs in total) and peripheral intake ports, the R26B screamed to 9,000 rpm with a spine-tingling auditory crescendo audible from two miles away across the French countryside.'
        ],
        callout: {
          title: 'The Post-Race Engine Teardown Revelation',
          text: 'When Mazda engineers completely disassembled the winning R26B engine in Japan following the 24-hour race, their micrometers revealed that apex seal wear was under 0.05 mm. The engine was in such immaculate condition that engineers confirmed it could have run another full 24-hour race.'
        }
      },
      {
        heading: 'The Victory of Car #55',
        content: [
          'Driven by Johnny Herbert, Volker Weidler, and Bertrand Gachot, the fluorescent orange and green #55 chased down the heavy Mercedes-Benz C11s. While the rival turbocharged V8s succumbed to gearbox failures and cooling issues under relentless pressure, Herbert crossed the line after 362 gruelling laps.',
          'Exhausted and dehydrated, Herbert collapsed on the podium, but Mazda’s victory was etched forever into motorsport folklore: the only rotary-powered car in history to conquer Le Mans.'
        ]
      }
    ]
  },
  {
    id: 'ducati-916-desmodromic-masterpiece',
    slug: 'ducati-916-massimo-tamburini-desmodromic-sculpture',
    title: 'The Bologna Sculpture: Massimo Tamburini’s Ducati 916',
    subtitle: 'How a stroke-of-genius Italian superbike integrated Desmodromic valve actuation, underseat exhausts, and aerodynamic perfection in 1994.',
    category: 'Superbikes',
    vehicleType: 'Motorcycle',
    featured: true,
    author: {
      name: 'Matteo Bellini',
      role: 'Motorcycle Engineering Specialist',
    },
    publishedDate: 'August 2026',
    readTimeMinutes: 5,
    heroImage: ducati916Img,
    imageCaption: '1994 Ducati 916 Strada, featuring the single-sided swingarm and signature twin under-tail silencers designed by Massimo Tamburini.',
    photographerCredit: 'Rev Talks Italian Archive',
    historicalEra: '1994–1998',
    tags: ['Ducati', 'Desmodromic', 'Massimo Tamburini', 'World Superbike', 'Carl Fogarty'],
    keySpecs: [
      { label: 'Engine Type', value: '916cc 90° L-Twin Desmoquattro' },
      { label: 'Valvetrain', value: '4 Valves/Cyl, Desmodromic' },
      { label: 'Power', value: '114 bhp @ 9,000 rpm' },
      { label: 'Dry Weight', value: '195 kg (430 lbs)' },
      { label: 'Chassis', value: 'Steel Trellis + Cast Magnesium Subframe' }
    ],
    excerpt: 'When the Ducati 916 broke cover at the 1993 Milan EICMA Show, it rendered every existing motorcycle visually and technically archaic overnight. Its combination of desmodromic valve control and structural compactness became an icon of industrial art.',
    sections: [
      {
        heading: 'Tamburini’s Six-Year Obsession',
        content: [
          'Massimo Tamburini spent over six years developing the 916 at the Cagiva Research Centre in San Marino. He tested prototype mules endlessly around the hills of Rimini, refusing to release the bike until its mass centralization was flawless.',
          'Every contour on the 916 served an aerodynamic or functional mandate. The twin headlights were narrow polyellipsoidal units that allowed the front fairing cross-section to shrink significantly, cutting wind resistance.'
        ],
        quote: 'A motorcycle must be beautiful, but every millimeter of its bodywork must respond to air, heat, and gravity.'
      },
      {
        heading: 'The Genius of Desmodromic Valves',
        content: [
          'Conventional motorcycle engines use metal coil springs to close their valves after a camshaft lobe opens them. At high rpm, valve springs cannot keep up, resulting in "valve float"—where valves collide fatally with pistons.',
          'Ducati solved this through Fabio Taglioni’s Desmodromic system: an ingenious mechanical rocker assembly where one cam lobe opens the valve and a secondary closing rocker mechanically pulls the valve shut. This completely eliminated valve float, allowing aggressive cam profiles and instantaneous throttle response.'
        ],
        callout: {
          title: 'The Single-Sided Swingarm Utility',
          text: 'While many admired the 916’s single-sided rear swingarm for its exposed alloy wheel aesthetic, Tamburini designed it for endurance racing: allowing the rear wheel and sprocket to be changed in under 12 seconds during World Superbike pit stops.'
        }
      },
      {
        heading: 'World Superbike Domination',
        content: [
          'Ridden by Carl Fogarty, Troy Corser, and Neil Hodgson, the Ducati 916 and its immediate evolutions (996 and 998) claimed four World Superbike Riders’ Championships and six Manufacturers’ Championships between 1994 and 1999.',
          'The motorcycle was recognized by the Solomon R. Guggenheim Museum in New York for its "Art of the Motorcycle" exhibition, canonizing it as one of the 20th century’s crowning industrial design achievements.'
        ]
      }
    ]
  },
  {
    id: 'porsche-993-air-cooled-twilight',
    slug: 'porsche-993-air-cooled-flat-six-twilight',
    title: 'The Final Whisper of Air: Porsche 911 Type 993',
    subtitle: 'Examining the mechanical zenith of the Mezger-derived air-cooled flat-six before the water-cooled transition.',
    category: 'Heritage',
    vehicleType: 'Car',
    featured: false,
    author: {
      name: 'Julian Vance',
      role: 'Chief Technical Editor',
    },
    publishedDate: 'July 2026',
    readTimeMinutes: 6,
    heroImage: porsche993Img,
    imageCaption: '1996 Porsche 911 993 Turbo in Midnight Blue Metallic, resting atop the Susten Pass in the Swiss Alps.',
    photographerCredit: 'Rev Talks Alpine Expedition',
    historicalEra: '1994–1998',
    tags: ['Porsche 911', 'Type 993', 'Hans Mezger', 'Air-Cooled', 'Weissach Axle'],
    keySpecs: [
      { label: 'Engine Code', value: 'M64/60 3.6L Twin-Turbo Flat-6' },
      { label: 'Cooling Method', value: 'Air/Oil (No Water Jackets)' },
      { label: 'Horsepower', value: '408 hp @ 5,750 rpm' },
      { label: 'Rear Suspension', value: 'LSA Multi-Link (Weissach effect)' },
      { label: 'Production Era', value: '1994–1998 (Stuttgart-Zuffenhausen)' }
    ],
    excerpt: 'Produced between 1994 and 1998, the Type 993 represents the absolute pinnacle of Porsche’s 34-year devotion to air-cooled engineering. We explore why collectors and engineers revere this hand-built generation above all others.',
    sections: [
      {
        heading: 'The End of a 34-Year Lineage',
        content: [
          'Since Ferdinand "Butzi" Porsche and Hans Mezger formulated the original 901 in 1963, the rear-mounted air-cooled flat-six had been the spine of Porsche’s identity. Air cooling eliminated heavy water radiators, hoses, thermostats, and water pumps, preserving an unrivaled purity of feedback.',
          'By the early 1990s, however, tightening noise regulations (water jackets act as acoustic insulation) and multi-valve cylinder head thermal limits meant the days of air-cooling were numbered. Porsche’s engineers determined to make the 993 their definitive statement.'
        ]
      },
      {
        heading: 'The LSA Rear Suspension Revolution',
        content: [
          'Previous 911s had earned a notorious reputation for snap oversteer when trailing off the throttle mid-corner, caused by semi-trailing arm rear geometry under load.',
          'With the 993, chief engineer Horst Marchart introduced the all-aluminum LSA (Lightweight, Stable, Agile) multi-link rear suspension. Operating with passive rear-wheel toe correction under lateral forces (the Weissach axle effect), it effectively cured the 911’s historical snap oversteer while retaining rear-engine traction.'
        ],
        quote: 'The 993 was the first 911 where you could stand on the brakes deep into a downhill mountain hairpin without feeling the rear pendulum threaten your life.'
      },
      {
        heading: 'The Twin-Turbo M64/60 and Handbuilt Integrity',
        content: [
          'In the 993 Turbo, Porsche introduced twin KKK turbochargers with an all-wheel-drive viscous coupling system adapted from the legendary 959 supercar. Delivering 408 horsepower with practically zero turbo lag, it could launch from 0 to 60 mph in 3.7 seconds in 1995.',
          'Moreover, the 993 was the final 911 assembled largely by hand at the historic Zuffenhausen factory before robotic modular lines were implemented for the 996. The distinctive hollow ‘thunk’ of the doors shutting and the heavy forged pedals hinged from the floor remain unmatched tactile pleasures.'
        ]
      }
    ]
  },
  {
    id: 'yamaha-rd350-two-stroke-cult',
    slug: 'yamaha-rd350-the-giant-killing-two-stroke-cult',
    title: 'The Giant Killer: Yamaha RD350 & Expansion Chamber Sorcery',
    subtitle: 'How an affordable 347cc twin-cylinder two-stroke embarrassed four-stroke 750cc superbikes on every twisty backroad in 1973.',
    category: 'Heritage',
    vehicleType: 'Motorcycle',
    featured: false,
    author: {
      name: 'Matteo Bellini',
      role: 'Motorcycle Engineering Specialist',
    },
    publishedDate: 'June 2026',
    readTimeMinutes: 5,
    heroImage: yamahaRd350Img,
    imageCaption: '1973 Yamaha RD350 in classic white and red speedblock livery, showing its upswept dual expansion chambers.',
    photographerCredit: 'Rev Talks Vintage Vault',
    historicalEra: '1973–1979',
    tags: ['Two-Stroke', 'Yamaha RD350', 'Torque Induction', 'Cafe Racer', 'Expansion Chambers'],
    keySpecs: [
      { label: 'Engine Type', value: '347cc Parallel-Twin 2-Stroke' },
      { label: 'Intake Method', value: 'Reed-Valve Torque Induction' },
      { label: 'Power Output', value: '39 bhp @ 7,500 rpm' },
      { label: 'Kerb Weight', value: '143 kg (315 lbs)' },
      { label: 'Quarter Mile', value: '14.1 seconds' }
    ],
    excerpt: 'In 1973, Yamaha introduced the RD350 equipped with reed-valve "Torque Induction". Weighing just 315 lbs and costing under $900, it quickly became the legendary giant-killer that terrorized heavy four-stroke superbikes.',
    sections: [
      {
        heading: 'Power Per Pound: The Two-Stroke Formula',
        content: [
          'Because a two-stroke engine fires every single revolution of the crankshaft—unlike a four-stroke which fires every other revolution—it possesses an inherent power-density advantage. It has no heavy valves, pushrods, or camshafts.',
          'Yamaha harnessed this principle to perfection. While Honda, Kawasaki, and Norton built massive, heavy 750cc four-stroke roadsters that weighed over 500 lbs, Yamaha offered a nimble 315-lb machine that punched far above its weight class.'
        ]
      },
      {
        heading: 'Torque Induction and Acoustic Resonance',
        content: [
          'Previous two-stroke road motorcycles suffered from a narrow, switch-like powerband that was sluggish below 5,000 rpm and violently uncontrollable above it. Yamaha solved this with patent reed valves placed between the Mikuni carburetors and the crankcase, dubbed "Torque Induction".',
          'The reed petals acted as one-way valves, preventing intake charge blowback at low rpm while permitting unrestricted fuel-air mixture flow when revs surged. Paired with tuned expansion chambers that used reflected acoustic pressure soundwaves to stuff unburned charge back into the cylinder port just as the piston closed, the RD350 produced a staggering 39 bhp.'
        ],
        callout: {
          title: 'The Production Racing Phenomenon',
          text: 'In club racing circuits from Brands Hatch to Daytona, amateur racers stripped the turn signals off showroom-stock RD350s and regularly took overall podiums against machines with more than double their displacement.'
        }
      },
      {
        heading: 'An Irreplaceable Mechanical Sensation',
        content: [
          'The scent of Castrol R premix burning in the exhaust, the distinctive metallic two-stroke ping at idle, and the sudden explosive lift of the front wheel as the tachometer swept past 6,000 rpm created a loyal cult following that survives to this day.',
          'Though emissions regulations eventually relegated two-strokes to racing history, the RD350 remains the definitive testament to lightweight mechanical supremacy.'
        ]
      }
    ]
  },
  {
    id: 'koenigsegg-jesko-lst-transmission',
    slug: 'koenigsegg-jesko-light-speed-transmission-physics',
    title: 'Rewriting Gearbox Physics: Koenigsegg’s Light Speed Transmission',
    subtitle: 'Inside Christian von Koenigsegg’s 9-speed, 7-clutch transmission that shifts gears at the speed of light with zero flywheel latency.',
    category: 'Engineering',
    vehicleType: 'Car',
    featured: false,
    author: {
      name: 'Julian Vance',
      role: 'Chief Technical Editor',
    },
    publishedDate: 'May 2026',
    readTimeMinutes: 7,
    heroImage: koenigseggJeskoImg,
    imageCaption: 'The Koenigsegg Jesko Attack on the runway tarmac at Ängelholm, Sweden, testing active aero flap transitions.',
    photographerCredit: 'Koenigsegg Automotive AB Engineering Archive',
    historicalEra: '2020–Present',
    tags: ['Koenigsegg', 'Jesko', 'LST Gearbox', 'Flat-Plane V8', 'Aerodynamics'],
    keySpecs: [
      { label: 'Transmission', value: '9-Speed Light Speed Transmission (LST)' },
      { label: 'Clutch Count', value: '7 Individual Wet Multi-Plate Clutches' },
      { label: 'Shift Latency', value: '2 to 3 milliseconds' },
      { label: 'Weight with Fluids', value: '90 kg (including starter & flywheel)' },
      { label: 'Peak Power', value: '1,600 bhp (E85 biofuel)' }
    ],
    excerpt: 'For over 80 years, automotive transmissions relied on either single clutches, torque converters, or dual clutches. Christian von Koenigsegg discarded the entire playbook with the LST, allowing instantaneous jumps from 7th to 4th gear without passing through intermediate ratios.',
    sections: [
      {
        heading: 'The Fatal Flaw of the Dual-Clutch Gearbox',
        content: [
          'Modern dual-clutch transmissions (DCTs) are marvels of sequential gear shifts, but they have a fundamental mechanical limitation: they can only pre-select the adjacent gear (e.g., from 4th to 5th).',
          'If you are cruising down a motorway in 7th gear and suddenly floor the accelerator, a standard DCT cannot jump directly to 3rd gear. It must shuffle sequentially through intermediate shafts, introducing a perceptible 400ms delay while hydraulic actuators rearrange synchronizer sleeves.'
        ]
      },
      {
        heading: 'Seven Clutches, Nine Ratios, Zero Synchronizers',
        content: [
          'Christian von Koenigsegg and his engineering team in Ängelholm created the Light Speed Transmission (LST). It completely eliminates synchronizer rings, traditional shift forks, and the separate engine flywheel.',
          'Instead, the LST arranges three shafts carrying three gear sets each, governed by seven individual multi-plate wet clutches. Any combination of clutches can be engaged or disengaged simultaneously in 2 milliseconds.'
        ],
        quote: 'With LST and UPOD (Ultimate Power On Demand), the car predicts the optimal gear for maximum acceleration and engages it instantaneously—regardless of whether it is three gears down.'
      },
      {
        heading: 'Weighing Less Than a Standard Porsche PDK',
        content: [
          'Despite containing seven clutches, the entire LST gearbox weighs just 90 kg including fluids and internal starter motor. A comparable dual-clutch transmission from Porsche or Ferrari weighs between 120 kg and 140 kg.',
          'Combined with the Jesko’s 5.0-liter flat-plane crankshaft twin-turbo V8 producing 1,600 hp and revving to 8,500 rpm, the LST represents the most radical mechanical reinvention of automotive transmission architecture in modern history.'
        ]
      }
    ]
  },
  {
    id: 'honda-cb750-superbike-revolution',
    slug: 'honda-cb750-1969-birth-of-the-modern-superbike',
    title: 'The Blueprint: 1969 Honda CB750 and the Superbike Dawn',
    subtitle: 'How Soichiro Honda’s transverse four-cylinder, disc-braked marvel permanently ended the reign of the British motorcycle industry.',
    category: 'Heritage',
    vehicleType: 'Motorcycle',
    featured: false,
    author: {
      name: 'Kenji Takahashi',
      role: 'Motorsport Historian',
    },
    publishedDate: 'April 2026',
    readTimeMinutes: 6,
    heroImage: hondaCb750Img,
    imageCaption: '1969 Honda CB750 Four "Sandcast" in Candy Blue/Gold with four-into-four exhaust configuration.',
    photographerCredit: 'Rev Talks Motoring Heritage',
    historicalEra: '1969–1978',
    tags: ['Honda CB750', 'Soichiro Honda', 'Inline-Four', 'Front Disc Brake', 'Electric Starter'],
    keySpecs: [
      { label: 'Engine Type', value: '736cc Transverse SOHC Inline-4' },
      { label: 'Braking System', value: 'Hydraulic Front Disc (World First)' },
      { label: 'Starting Method', value: 'Electric Pushbutton + Kickstart' },
      { label: 'Top Speed', value: '125 mph (201 km/h)' },
      { label: 'Price at Launch', value: '$1,495 USD (1969)' }
    ],
    excerpt: 'Before 1969, the word "superbike" did not exist in the English lexicon. The arrival of the Honda CB750 Four paired four-cylinder grand prix engineering with leak-free reliability, electric starting, and hydraulic front disc brakes.',
    sections: [
      {
        heading: 'The British Hegemony and its Blindspots',
        content: [
          'Throughout the 1950s and 1960s, British manufacturers—Triumph, Norton, BSA, and Velocette—dominated the global motorcycle market. Their parallel-twin machines were fast and charismatic, but plagued by chronic oil leaks, harsh vibrations, temperamental Lucas electrics, and kickstarters that could sprain ankles.',
          'Soichiro Honda spent years studying American and European highways during visits to Daytona and the Isle of Man. He realized motorcyclists were tired of spending two hours wrenching in a garage for every one hour of riding.'
        ]
      },
      {
        heading: 'Grand Prix Technology for the Working Man',
        content: [
          'In October 1968 at the Tokyo Motor Show, Honda unveiled the CB750 Four. It was an engineering revelation: a transverse four-cylinder air-cooled engine with an overhead camshaft, four separate Keihin carburetors, and four gleaming chrome exhaust pipes.',
          'It produced 67 horsepower, pushed the bike past 120 mph with uncannily smooth turbine-like delivery, and featured a hydraulic front disc brake—the very first ever fitted to a mass-production motorcycle.'
        ],
        callout: {
          title: 'The Sandcast Collector Legend',
          text: 'Unsure whether global riders would buy such an advanced machine, Honda cast the crankcases for the first 7,414 units using temporary sand-molding rather than expensive die-cast steel tools. Today, these rare "Sandcast CB750s" command six-figure valuations among historic collectors.'
        }
      },
      {
        heading: 'The Coining of "Superbike"',
        content: [
          'When Cycle magazine road-tested the CB750 in 1969, editors struggled to describe the leap forward. They coined the term "Superbike". Within four years of its introduction, BSA declared bankruptcy, Norton collapsed into administration, and Triumph was forced into state reorganization.',
          'The CB750 established the Universal Japanese Motorcycle (UJM) architecture that governed motorcycle engineering for the next four decades.'
        ]
      }
    ]
  },
  {
    id: 'ev-carbon-sleeved-rotors',
    slug: 'carbon-sleeved-rotors-20000-rpm-ev-powertrains',
    title: 'Centrifugal Restraint: Carbon-Sleeved Rotors at 20,000 RPM',
    subtitle: 'The physics of wrapping permanent magnet electric motor rotors in carbon fiber to conquer copper eddy currents and centrifugal explosion.',
    category: 'Engineering',
    vehicleType: 'Car',
    featured: false,
    author: {
      name: 'Julian Vance',
      role: 'Chief Technical Editor',
    },
    publishedDate: 'March 2026',
    readTimeMinutes: 6,
    heroImage: evPowertrainImg,
    imageCaption: 'A high-speed carbon-overwrapped rotor assembly inside an experimental electric test dyno cell.',
    photographerCredit: 'Rev Talks Advanced Powertrain Lab',
    historicalEra: '2021–Present',
    tags: ['Electric Motors', 'Carbon Overwrap', 'Permanent Magnet', 'Thermal Management', 'EV Physics'],
    keySpecs: [
      { label: 'Rotor Angular Velocity', value: '20,000+ RPM' },
      { label: 'Centrifugal Force', value: '> 100,000 G at rotor perimeter' },
      { label: 'Sleeve Material', value: 'High-Tensile Carbon Fiber Strand' },
      { label: 'Sleeve Pre-Tension', value: 'High-Interference Fit' },
      { label: 'Motor Peak Power', value: '1,020+ hp (Tri-Motor System)' }
    ],
    excerpt: 'At 20,000 RPM, centrifugal force threatens to fling neodymium iron boron magnets clean off an electric motor rotor shaft. Discover how tensioned carbon-fiber overwraps solved the high-speed EV power cliff.',
    sections: [
      {
        heading: 'The High-Speed Torque Cliff Problem',
        content: [
          'Electric vehicles are famous for instantaneous off-the-line torque. However, first-generation EV motors faced a severe limitation: past 80–100 mph, their power output plunged dramatically.',
          'To generate power at triple-digit speeds without requiring heavy multi-speed gearboxes, the electric motor must spin faster—surpassing 18,000 to 20,000 rpm. But at these angular velocities, centrifugal forces at the rotor surface exceed 100,000 times gravity.'
        ]
      },
      {
        heading: 'Why Steel Sleeves Fail',
        content: [
          'Traditional electric motors hold their neodymium permanent magnets in place using stamped steel retention plates. But steel is both magnetically permeable and electrically conductive. At 20,000 rpm, alternating magnetic fields create intense eddy currents inside the steel, generating immense waste heat and parasitic electromagnetic drag.',
          'To overcome this, engineers developed carbon-fiber overwrapping: wrapping the rotor assembly in continuous filaments of aerospace-grade carbon fiber under immense tension.'
        ],
        quote: 'Carbon fiber has zero magnetic permeability and extraordinary tensile strength. It acts as an invisible structural corset that does not interfere with electromagnetic flux.'
      },
      {
        heading: 'Manufacturing Precision and Thermal Expansion',
        content: [
          'The manufacturing challenge is that carbon fiber has a negative or near-zero coefficient of thermal expansion, while the copper windings and steel rotor shaft expand significantly as temperature rises under track load.',
          'Engineers had to develop robotic winding machines that press the carbon sleeve over the rotor with a high-interference fit under thermal differential, ensuring the sleeve maintains perfect tension from -40°C in winter to 150°C during continuous laps at the Nürburgring Nordschleife.'
        ]
      }
    ]
  },
  {
    id: 'bmw-e30-m3-dtm-homologation',
    slug: 'bmw-e30-m3-group-a-dtm-homologation-legend',
    title: 'Born for Touring: The BMW E30 M3 Homologation Story',
    subtitle: 'Paul Rosche’s 16-valve S14 four-cylinder, boxed flared fenders, and why the original M3 had only two body panels in common with standard 3-Series cars.',
    category: 'Motorsport',
    vehicleType: 'Car',
    featured: false,
    author: {
      name: 'Kenji Takahashi',
      role: 'Motorsport Historian',
    },
    publishedDate: 'February 2026',
    readTimeMinutes: 6,
    heroImage: bmwE30M3Img,
    imageCaption: '1988 BMW E30 M3 in Alpine White, displaying the widened boxed fenders and altered C-pillar rake.',
    photographerCredit: 'Rev Talks Historic Motorsport Division',
    historicalEra: '1986–1991',
    tags: ['BMW M3', 'Group A', 'DTM', 'S14 Engine', 'Homologation Special'],
    keySpecs: [
      { label: 'Engine Code', value: 'BMW S14 2.3L DOHC 16V 4-Cyl' },
      { label: 'Power Output', value: '195–238 hp (Road Specs)' },
      { label: 'Homologation Rules', value: 'Group A: 5,000 road cars mandatory' },
      { label: 'Aerodynamic Change', value: 'Redesigned C-pillar & rear window rake' },
      { label: 'Championship Trophies', value: '> 1,500 race wins worldwide' }
    ],
    excerpt: 'The original 1986 BMW M3 was not a luxury sports coupe; it was an uncompromising racing homologation special engineered solely to defeat Mercedes-Benz in the German Touring Car Championship (DTM).',
    sections: [
      {
        heading: 'The 5,000-Unit Group A Requirement',
        content: [
          'In the mid-1980s, FISA Group A touring car rules required manufacturers to produce at least 5,000 road-going versions of a racecar within 12 consecutive months. BMW Motorsport GmbH, led by Eberhard von Kuenheim, decided to create a bespoke weapon based on the compact E30 chassis.'
        ]
      },
      {
        heading: 'The S14 Engine: Cutting Two Cylinders from an M1',
        content: [
          'Engine guru Paul Rosche needed an engine that could rev past 9,000 rpm in race trim. The standard 6-cylinder BMW engines of the era had long crankshafts prone to torsional vibration at high revs.',
          'Rosche’s solution was brilliant: he took the cylinder head casting from the legendary mid-engine BMW M1 supercar (the M88 3.5L straight-six), lopped off two cylinders, and mated the 4-valve head onto the ultra-durable cast-iron M10 engine block. In less than two weeks, the 2.3-liter S14 was running on the dyno.'
        ],
        callout: {
          title: 'The Hidden Aerodynamic Redesign',
          text: 'To human eyes, the E30 M3 resembles a standard 3-Series coupe, but in reality, only the hood and sunroof were shared with standard road cars. BMW raised the trunk lid by 40 mm, glued a plastic fairing over the rear window frame to steepen its rake, and widened the boxed fenders to accept 10-inch racing slicks.'
        }
      },
      {
        heading: 'The Most Successful Touring Car in History',
        content: [
          'Driven by champions like Roberto Ravaglia, Johnny Cecotto, and Eric van de Poele, the E30 M3 conquered the World Touring Car Championship, European Touring Car Championship, DTM, and claimed four outright victories at the 24 Hours of Nürburgring.',
          'With its precise dogleg 5-speed manual gearbox, communicative hydraulic steering, and razor-sharp balance, it set the benchmark by which every subsequent sports sedan is still judged.'
        ]
      }
    ]
  },
  {
    id: 'kawasaki-ninja-h2-supercharged',
    slug: 'kawasaki-ninja-h2-aerospace-centrifugal-supercharger',
    title: 'Aerospace Induction: Kawasaki Ninja H2 & The 130,000 RPM Impeller',
    subtitle: 'How Kawasaki Heavy Industries pooled aerospace, gas turbine, and marine divisions to build the first factory-supercharged hypersport motorcycle.',
    category: 'Superbikes',
    vehicleType: 'Motorcycle',
    featured: false,
    author: {
      name: 'Matteo Bellini',
      role: 'Motorcycle Engineering Specialist',
    },
    publishedDate: 'January 2026',
    readTimeMinutes: 6,
    heroImage: kawasakiH2Img,
    imageCaption: 'Kawasaki Ninja H2 Carbon Edition displaying the mirror-finish silver flakes and carbon fiber aerodynamic winglets.',
    photographerCredit: 'Rev Talks Technical Photography',
    historicalEra: '2015–Present',
    tags: ['Supercharger', 'Kawasaki H2', 'Centrifugal Impeller', 'Aerodynamics', '310 HP'],
    keySpecs: [
      { label: 'Engine Type', value: '998cc Liquid-Cooled DOHC 16V Inline-4' },
      { label: 'Induction System', value: 'Centrifugal Supercharger (In-House)' },
      { label: 'Impeller Speed', value: '130,000 RPM (9.2x engine crank)' },
      { label: 'Air Intake Volume', value: '200+ Liters of Air per Second' },
      { label: 'H2R Track Power', value: '310 bhp (326 bhp with Ram Air)' }
    ],
    excerpt: 'When Kawasaki set out to build the Ninja H2 in 2015, they rejected off-the-shelf automotive superchargers. Instead, their Gas Turbine & Machinery division milled a 5-axis aerospace impeller capable of pushing 200 liters of atmospheric air per second.',
    sections: [
      {
        heading: 'A Cross-Divisional Aerospace Marvel',
        content: [
          'Motorcycles are severely constrained by physical space and cooling limitations. Fitting an automotive Roots-type blower or turbocharger adds unwieldy bulk and massive heat soak, requiring large intercoolers that cannot fit inside a motorcycle chassis.',
          'Kawasaki’s Motorcycle Company called upon Kawasaki Heavy Industries’ Aerospace Company and Gas Turbine & Machinery Company. Working together, they created a bespoke centrifugal supercharger driven by planetary step-up gears directly off the crankshaft.'
        ]
      },
      {
        heading: 'The 130,000 RPM Billet Impeller',
        content: [
          'The impeller measures just 69 mm in diameter and is CNC-machined from a solid billet of forged aeronautical aluminum with six primary blades and six intermediate splitter blades.',
          'Driven through a planetary gear train with a 9.2:1 multiplier, when the 998cc inline-four reaches its 14,000 rpm redline, the impeller tips spin at an astronomical 130,000 rpm—approaching supersonic blade speeds (Mach 1.4 at the outer perimeter). It forces over 200 liters of air per second into the cast aluminum airbox at 2.4 bar of absolute pressure.'
        ],
        quote: 'The chirping acoustic noise heard when rolling off the H2’s throttle is not a blow-off valve; it is supersonic air pressure bouncing off the closed throttle butterflies.'
      },
      {
        heading: 'Carbon Winglets and 400 km/h Reality',
        content: [
          'In closed-course H2R trim producing 326 horsepower, the motorcycle accelerated to 400 km/h (248.5 mph) in under 26 seconds on Turkey’s Osman Gazi Bridge with Kenan Sofuoğlu aboard.',
          'To keep the front wheel planted on tarmac at speeds where motorcycles naturally develop aerodynamic lift, Kawasaki’s aerospace engineers designed carbon-fiber downforce aerofoils, inaugurating the aero winglet era that now dominates MotoGP.'
        ]
      }
    ]
  }
];
