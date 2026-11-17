const PX = {
  pillsWhite:
    "https://images.pexels.com/photos/8015770/pexels-photo-8015770.jpeg?auto=compress&cs=tinysrgb&w=1200",
  pillsScatter:
    "https://images.pexels.com/photos/4492114/pexels-photo-4492114.jpeg?auto=compress&cs=tinysrgb&w=1200",
  capsulesJar:
    "https://images.pexels.com/photos/4492104/pexels-photo-4492104.jpeg?auto=compress&cs=tinysrgb&w=1200",
  omega1:
    "https://images.pexels.com/photos/29060398/pexels-photo-29060398.jpeg?auto=compress&cs=tinysrgb&w=1200",
  omega2:
    "https://images.pexels.com/photos/15897788/pexels-photo-15897788.jpeg?auto=compress&cs=tinysrgb&w=1200",
  omega3:
    "https://images.pexels.com/photos/15897779/pexels-photo-15897779.jpeg?auto=compress&cs=tinysrgb&w=1200",
  baby: "https://images.pexels.com/photos/10853729/pexels-photo-10853729.jpeg?auto=compress&cs=tinysrgb&w=1200",
  jelly:
    "https://images.pexels.com/photos/30374594/pexels-photo-30374594.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

const L = {
  paracetamol: "/images/paracetamol.jpg",
  vitaminC: "/images/vitamin-c.jpg",
  cough: "/images/cough-syrup.jpg",
  firstAid: "/images/first-aid.jpg",
  devices: "/images/thermometer.jpg",
  skincare: "/images/skincare.jpg",
  diabetes: "/images/diabetes.jpg",
};

export const seedCategories = [
  {
    slug: "pain-relief",
    name: "Pain & Fever Relief",
    description: "Trusted analgesics and antipyretics for everyday aches, headaches and fever.",
    image: L.paracetamol,
    accent: "sage",
  },
  {
    slug: "vitamins",
    name: "Vitamins & Supplements",
    description: "Daily nutrition to keep immunity, bones and energy at their best.",
    image: L.vitaminC,
    accent: "amber",
  },
  {
    slug: "cough-cold",
    name: "Cough, Cold & Allergy",
    description: "Soothing syrups, lozenges and antihistamines for seasonal relief.",
    image: L.cough,
    accent: "rose",
  },
  {
    slug: "first-aid",
    name: "First Aid",
    description: "Antiseptics, dressings and essentials every home cabinet needs.",
    image: L.firstAid,
    accent: "sky",
  },
  {
    slug: "devices",
    name: "Health Devices",
    description: "Clinically accurate monitors and thermometers for home care.",
    image: L.devices,
    accent: "slate",
  },
  {
    slug: "baby-care",
    name: "Mother & Baby",
    description: "Gentle, paediatrician-recommended care for little ones.",
    image: PX.baby,
    accent: "pink",
  },
  {
    slug: "skin-care",
    name: "Dermatology & Skin",
    description: "Dermatologist-formulated creams, sunscreens and ointments.",
    image: L.skincare,
    accent: "stone",
  },
  {
    slug: "diabetes-care",
    name: "Diabetes Care",
    description: "Monitoring kits and maintenance medicines for steady control.",
    image: L.diabetes,
    accent: "teal",
  },
];

type SeedReview = {
  author: string;
  rating: number;
  title: string;
  body: string;
  daysAgo: number;
};

export type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  images: string[];
  packSize: string;
  form: string;
  prescriptionRequired?: boolean;
  stock: number;
  featured?: boolean;
  tags: string[];
  highlights: string[];
  usage: string;
  reviews: SeedReview[];
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "dolo-650-paracetamol",
    name: "Dolo 650 Paracetamol Tablets",
    brand: "Micro Labs",
    category: "pain-relief",
    shortDescription: "Fast, dependable relief from fever, headache and body pain.",
    description:
      "Dolo 650 is India's most trusted paracetamol tablet for fever and mild to moderate pain. Each tablet delivers 650 mg of paracetamol that works within 30 minutes and is gentle on the stomach, making it suitable for most adults and adolescents.",
    price: "32.00",
    compareAtPrice: "36.50",
    images: [L.paracetamol, PX.pillsWhite, PX.pillsScatter],
    packSize: "Strip of 15 tablets",
    form: "Tablet",
    stock: 240,
    featured: true,
    tags: ["bestseller", "fever", "headache"],
    highlights: ["Works within 30 minutes", "Gentle on the stomach", "Suitable for adults & children 12+"],
    usage: "Take 1 tablet every 4–6 hours as needed. Do not exceed 4 tablets in 24 hours. Take with water, with or without food.",
    reviews: [
      { author: "Priya Raman", rating: 5, title: "Always in my cabinet", body: "Reliable relief every single time. Arun Medicals delivered within the hour during a bad fever night. Thank you!", daysAgo: 4 },
      { author: "Karthik S.", rating: 5, title: "Genuine and well priced", body: "Cheaper than the local chain and the packaging was sealed and fresh with a long expiry.", daysAgo: 19 },
      { author: "Meena Devi", rating: 4, title: "Good for headaches", body: "Works quickly for my tension headaches. Wish the strip were slightly easier to open.", daysAgo: 41 },
    ],
  },
  {
    slug: "combiflam-tablets",
    name: "Combiflam Ibuprofen + Paracetamol",
    brand: "Sanofi",
    category: "pain-relief",
    shortDescription: "Dual-action relief for toothache, muscle pain and menstrual cramps.",
    description:
      "Combiflam combines ibuprofen (400 mg) and paracetamol (325 mg) to tackle both pain and inflammation. It is widely recommended for dental pain, sprains, back pain and period cramps.",
    price: "44.00",
    images: [PX.pillsScatter, L.paracetamol],
    packSize: "Strip of 20 tablets",
    form: "Tablet",
    stock: 160,
    tags: ["pain", "inflammation"],
    highlights: ["Anti-inflammatory + analgesic", "Relief within 20–30 minutes", "Trusted for dental & joint pain"],
    usage: "Take 1 tablet after food up to three times daily. Avoid on an empty stomach. Consult a pharmacist if you have gastric issues.",
    reviews: [
      { author: "Anand Krishnan", rating: 5, title: "Saved me after a root canal", body: "Took the edge off completely. Our pharmacist also reminded me to take it with food — nice touch.", daysAgo: 7 },
      { author: "Lakshmi N.", rating: 4, title: "Effective for cramps", body: "Works better than plain paracetamol for me during periods.", daysAgo: 60 },
    ],
  },
  {
    slug: "volini-pain-relief-gel",
    name: "Volini Pain Relief Gel",
    brand: "Sun Pharma",
    category: "pain-relief",
    shortDescription: "Cooling diclofenac gel for sprains, neck and back pain.",
    description:
      "Volini Gel penetrates deep to relieve muscular and joint pain with a quick cooling sensation. Ideal for sports injuries, stiff necks and lower back pain.",
    price: "165.00",
    compareAtPrice: "182.00",
    images: [L.skincare, L.firstAid],
    packSize: "75 g tube",
    form: "Gel",
    stock: 85,
    tags: ["topical", "sports"],
    highlights: ["Non-greasy, fast absorbing", "Diclofenac 1.16% w/w", "Pleasant cooling menthol"],
    usage: "Apply a thin layer to the affected area 3–4 times a day and massage gently. Wash hands after use.",
    reviews: [
      { author: "Suresh Babu", rating: 5, title: "Great for my back", body: "I sit all day and this gel is a lifesaver in the evenings.", daysAgo: 12 },
    ],
  },
  {
    slug: "limcee-vitamin-c-500",
    name: "Limcee Vitamin C 500 mg Chewable",
    brand: "Abbott",
    category: "vitamins",
    shortDescription: "Tangy orange chewables that support daily immunity.",
    description:
      "Limcee delivers 500 mg of ascorbic acid in a delicious chewable tablet. Vitamin C supports immune function, collagen formation and iron absorption, making it a simple daily habit for the whole family.",
    price: "28.00",
    images: [L.vitaminC, PX.capsulesJar],
    packSize: "Strip of 15 chewable tablets",
    form: "Chewable",
    stock: 320,
    featured: true,
    tags: ["immunity", "bestseller"],
    highlights: ["500 mg Vitamin C per tablet", "Natural orange flavour", "Supports immunity & skin health"],
    usage: "Chew 1 tablet daily after breakfast, or as directed by your physician.",
    reviews: [
      { author: "Divya Sundar", rating: 5, title: "Kids love the taste", body: "My children ask for their 'orange sweet' every morning. Easy win for immunity.", daysAgo: 3 },
      { author: "R. Venkatesh", rating: 4, title: "Good value", body: "Reasonably priced and fresh stock. Would buy again.", daysAgo: 25 },
      { author: "Fathima B.", rating: 5, title: "Noticeable difference", body: "Fewer colds this season. Delivery from Arun Medicals was prompt as always.", daysAgo: 52 },
    ],
  },
  {
    slug: "seven-seas-omega-3",
    name: "Seven Seas Omega-3 Fish Oil Softgels",
    brand: "Seven Seas",
    category: "vitamins",
    shortDescription: "Heart, brain and joint support with pure cod liver oil.",
    description:
      "Each softgel delivers high-strength EPA and DHA omega-3 fatty acids from sustainably sourced fish oil. Supports cardiovascular health, cognitive function and flexible joints.",
    price: "489.00",
    compareAtPrice: "545.00",
    images: [PX.omega1, PX.omega2, PX.omega3],
    packSize: "Bottle of 60 softgels",
    form: "Softgel",
    stock: 48,
    featured: true,
    tags: ["heart", "premium"],
    highlights: ["1000 mg fish oil per softgel", "Molecularly distilled for purity", "No fishy aftertaste"],
    usage: "Take 1–2 softgels daily with meals. Store in a cool, dry place.",
    reviews: [
      { author: "Dr. Hema Prasad", rating: 5, title: "Recommend to my patients", body: "Clean sourcing and consistent quality. Good to see it stocked locally.", daysAgo: 9 },
      { author: "Rajan Pillai", rating: 4, title: "No aftertaste", body: "Previous brands gave me fishy burps; this one doesn't. Slightly pricey but worth it.", daysAgo: 33 },
    ],
  },
  {
    slug: "shelcal-500-calcium",
    name: "Shelcal 500 Calcium + Vitamin D3",
    brand: "Torrent",
    category: "vitamins",
    shortDescription: "Daily bone-strength support for adults and seniors.",
    description:
      "Shelcal 500 pairs 500 mg of elemental calcium with 250 IU of Vitamin D3 for optimal absorption. Recommended for post-menopausal women, seniors and anyone with low dietary calcium.",
    price: "112.00",
    images: [PX.pillsWhite, L.vitaminC],
    packSize: "Strip of 15 tablets",
    form: "Tablet",
    stock: 130,
    tags: ["bone health", "seniors"],
    highlights: ["Calcium carbonate 1250 mg", "Vitamin D3 for absorption", "Doctor recommended"],
    usage: "Take 1 tablet daily after a meal, or as advised by your doctor.",
    reviews: [
      { author: "Saraswathi A.", rating: 5, title: "Part of my daily routine", body: "My orthopaedic doctor recommended this and Arun Medicals always has it in stock.", daysAgo: 15 },
    ],
  },
  {
    slug: "benadryl-cough-syrup",
    name: "Benadryl Cough Formula Syrup",
    brand: "Johnson & Johnson",
    category: "cough-cold",
    shortDescription: "Soothes dry, irritating coughs and clears congestion.",
    description:
      "Benadryl's triple-action formula relieves cough, loosens mucus and calms throat irritation. A trusted household name for seasonal coughs and colds.",
    price: "118.00",
    compareAtPrice: "126.00",
    images: [L.cough, L.vitaminC],
    packSize: "150 ml bottle",
    form: "Syrup",
    stock: 92,
    featured: true,
    tags: ["cough", "cold"],
    highlights: ["Triple-action relief", "Suitable for adults & children 6+", "Pleasant taste"],
    usage: "Adults: 10 ml every 4 hours. Children 6–12: 5 ml every 4 hours. Do not exceed 6 doses in 24 hours. May cause drowsiness.",
    reviews: [
      { author: "Mohan Raj", rating: 5, title: "Night-time saviour", body: "Finally slept through the night after a week of coughing.", daysAgo: 6 },
      { author: "Geetha V.", rating: 4, title: "Works, but drowsy", body: "Very effective. Just be careful — it does make you sleepy.", daysAgo: 28 },
    ],
  },
  {
    slug: "cetirizine-10mg",
    name: "Cetzine Cetirizine 10 mg",
    brand: "Dr. Reddy's",
    category: "cough-cold",
    shortDescription: "24-hour non-drowsy relief from sneezing, itching and hay fever.",
    description:
      "Cetzine is a second-generation antihistamine that relieves allergic rhinitis, urticaria and seasonal allergies with just one tablet a day.",
    price: "22.00",
    images: [PX.pillsWhite, PX.pillsScatter],
    packSize: "Strip of 10 tablets",
    form: "Tablet",
    stock: 410,
    tags: ["allergy", "value"],
    highlights: ["Once-daily dosing", "Minimal drowsiness", "Relief within 1 hour"],
    usage: "Take 1 tablet once daily, preferably at night.",
    reviews: [
      { author: "Nithya K.", rating: 5, title: "Dust allergy sorted", body: "One tablet and my sneezing fits stop. Great price too.", daysAgo: 11 },
    ],
  },
  {
    slug: "strepsils-honey-lemon",
    name: "Strepsils Honey & Lemon Lozenges",
    brand: "Reckitt",
    category: "cough-cold",
    shortDescription: "Dual antibacterial lozenges that soothe sore throats.",
    description:
      "Strepsils lozenges contain two antiseptic agents that fight throat infections while honey and lemon soothe irritation. Perfect for your bag or desk drawer.",
    price: "48.00",
    images: [L.vitaminC, L.cough],
    packSize: "Pack of 16 lozenges",
    form: "Lozenge",
    stock: 200,
    tags: ["throat", "travel"],
    highlights: ["Soothes in minutes", "Real honey & lemon", "Sugar-free variant available"],
    usage: "Dissolve one lozenge slowly in the mouth every 2–3 hours. Max 12 per day.",
    reviews: [
      { author: "Arjun M.", rating: 4, title: "Tastes great", body: "Pleasant flavour and really does soothe my throat during long meetings.", daysAgo: 20 },
    ],
  },
  {
    slug: "dettol-antiseptic-liquid",
    name: "Dettol Antiseptic Liquid",
    brand: "Dettol",
    category: "first-aid",
    shortDescription: "The gold standard for cleaning cuts, grazes and surfaces.",
    description:
      "Dettol Antiseptic Liquid kills 99.9% of germs and is safe for first aid, bathing and household disinfection. A must-have in every home.",
    price: "189.00",
    compareAtPrice: "210.00",
    images: [L.firstAid, PX.pillsWhite],
    packSize: "500 ml bottle",
    form: "Liquid",
    stock: 76,
    featured: true,
    tags: ["antiseptic", "bestseller"],
    highlights: ["Kills 99.9% germs", "Multi-purpose use", "Trusted for 80+ years"],
    usage: "First aid: dilute 1 capful in 250 ml water and clean the wound. Do not use undiluted on skin.",
    reviews: [
      { author: "Kavitha R.", rating: 5, title: "Household essential", body: "We use it for everything from scraped knees to mopping floors.", daysAgo: 8 },
      { author: "Balaji T.", rating: 5, title: "Big bottle, great deal", body: "The 500 ml is much better value than the small ones.", daysAgo: 45 },
    ],
  },
  {
    slug: "premium-first-aid-kit",
    name: "Arun Essentials Home First Aid Kit",
    brand: "Arun Medicals",
    category: "first-aid",
    shortDescription: "Our curated 42-piece kit for cuts, burns and emergencies.",
    description:
      "Assembled by our pharmacists, this compact kit includes sterile gauze, adhesive bandages in three sizes, antiseptic wipes, burn gel, micropore tape, scissors, tweezers and a quick-reference first-aid card.",
    price: "649.00",
    compareAtPrice: "799.00",
    images: [L.firstAid, L.devices],
    packSize: "42-piece kit",
    form: "Kit",
    stock: 24,
    featured: true,
    tags: ["curated", "gift", "premium"],
    highlights: ["Pharmacist curated", "Compact zip case", "Free refill guide included"],
    usage: "Keep in a cool, dry, accessible place. Check contents and expiry dates every six months.",
    reviews: [
      { author: "Sneha Iyer", rating: 5, title: "Perfect housewarming gift", body: "Gave this to my brother for his new flat. Beautifully packed and genuinely useful.", daysAgo: 14 },
      { author: "Vikram D.", rating: 4, title: "Well thought out", body: "Has everything we needed on a recent road trip. Would love a larger size too.", daysAgo: 38 },
    ],
  },
  {
    slug: "band-aid-washproof",
    name: "Band-Aid Washproof Strips",
    brand: "Johnson & Johnson",
    category: "first-aid",
    shortDescription: "Flexible, water-resistant strips that stay put all day.",
    description:
      "Band-Aid Washproof strips protect minor cuts with a breathable, water-resistant adhesive that survives hand-washing and showers.",
    price: "55.00",
    images: [L.firstAid],
    packSize: "Box of 20 strips",
    form: "Dressing",
    stock: 300,
    tags: ["value"],
    highlights: ["Water-resistant", "Breathable", "Hypoallergenic adhesive"],
    usage: "Clean and dry the wound, then apply the strip ensuring the pad covers the cut.",
    reviews: [
      { author: "Harini P.", rating: 4, title: "Stays on in the kitchen", body: "Finally a bandage that survives washing dishes.", daysAgo: 22 },
    ],
  },
  {
    slug: "omron-bp-monitor",
    name: "Omron HEM-7120 Blood Pressure Monitor",
    brand: "Omron",
    category: "devices",
    shortDescription: "Clinically validated, one-touch upper-arm BP monitoring.",
    description:
      "The Omron HEM-7120 offers clinically validated accuracy with IntelliSense technology that inflates to the ideal level for each reading. Large display and irregular heartbeat detection make home monitoring effortless.",
    price: "1899.00",
    compareAtPrice: "2250.00",
    images: [L.devices, L.diabetes],
    packSize: "1 unit with cuff (22–32 cm)",
    form: "Device",
    stock: 15,
    featured: true,
    tags: ["premium", "warranty"],
    highlights: ["Clinically validated", "Irregular heartbeat detection", "5-year brand warranty"],
    usage: "Sit comfortably with your arm at heart level. Wrap the cuff 1–2 cm above the elbow and press Start. Take readings at the same time each day.",
    reviews: [
      { author: "Ramesh Kumar", rating: 5, title: "Matches my doctor's reading", body: "Compared it at the clinic — identical. Arun Medicals even helped set it up in-store.", daysAgo: 10 },
      { author: "Padma S.", rating: 5, title: "Easy for my parents", body: "One button, big numbers. My 78-year-old father uses it daily without help.", daysAgo: 30 },
      { author: "John Abraham", rating: 4, title: "Solid device", body: "Works perfectly. Cuff could be a bit softer.", daysAgo: 70 },
    ],
  },
  {
    slug: "digital-thermometer-flexi",
    name: "Dr. Morepen Flexible Digital Thermometer",
    brand: "Dr. Morepen",
    category: "devices",
    shortDescription: "10-second readings with a soft, flexible tip for kids.",
    description:
      "A fast, waterproof digital thermometer with a flexible tip that's comfortable for children. Beeps when ready and stores the last reading.",
    price: "249.00",
    images: [L.devices],
    packSize: "1 unit with storage case",
    form: "Device",
    stock: 60,
    tags: ["kids", "value"],
    highlights: ["10-second reading", "Waterproof & washable", "Fever alarm"],
    usage: "Place under the tongue or armpit, wait for the beep, and read. Clean with alcohol after each use.",
    reviews: [
      { author: "Deepa Mani", rating: 5, title: "Perfect for toddlers", body: "Quick and the soft tip means no fuss.", daysAgo: 5 },
    ],
  },
  {
    slug: "himalaya-baby-cream",
    name: "Himalaya Baby Cream",
    brand: "Himalaya",
    category: "baby-care",
    shortDescription: "Nourishing olive oil & country mallow cream for delicate skin.",
    description:
      "Himalaya Baby Cream protects and moisturises baby's skin with natural olive oil, country mallow and licorice. Free from parabens, mineral oil and synthetic colours.",
    price: "145.00",
    images: [PX.baby, PX.jelly],
    packSize: "200 ml tub",
    form: "Cream",
    stock: 110,
    featured: true,
    tags: ["natural", "paraben-free"],
    highlights: ["Clinically tested", "Paraben & mineral-oil free", "Soothes chapped cheeks"],
    usage: "Apply gently on face and body after bath and before bedtime.",
    reviews: [
      { author: "Anitha Rajesh", rating: 5, title: "Gentle and smells lovely", body: "No rashes, no stickiness. Our paediatrician approved it too.", daysAgo: 13 },
      { author: "Mathew J.", rating: 4, title: "Good winter cream", body: "Keeps dry patches away in the AC room.", daysAgo: 50 },
    ],
  },
  {
    slug: "woodwards-gripe-water",
    name: "Woodward's Gripe Water",
    brand: "Woodward's",
    category: "baby-care",
    shortDescription: "Time-tested relief from infant colic and gas discomfort.",
    description:
      "Woodward's Gripe Water with dill seed oil and sarsaparilla gently relieves gas, colic and tummy discomfort in infants. Trusted by generations of Indian families.",
    price: "98.00",
    images: [PX.baby, L.cough],
    packSize: "130 ml bottle",
    form: "Liquid",
    stock: 150,
    tags: ["colic", "classic"],
    highlights: ["Alcohol free", "Dill seed oil formula", "Trusted since 1851"],
    usage: "Infants 1–6 months: 5 ml after feeds up to 3 times a day. Consult your paediatrician before use.",
    reviews: [
      { author: "Shalini G.", rating: 5, title: "Calmer evenings", body: "Colic hours dropped drastically. Thank you Arun Medicals for late-night delivery!", daysAgo: 2 },
    ],
  },
  {
    slug: "cetaphil-moisturising-lotion",
    name: "Cetaphil Moisturising Lotion",
    brand: "Galderma",
    category: "skin-care",
    shortDescription: "Dermatologist-recommended 24-hour hydration for sensitive skin.",
    description:
      "Cetaphil Moisturising Lotion provides long-lasting hydration without clogging pores. Fragrance-free and non-comedogenic, it's ideal for eczema-prone and sensitive skin.",
    price: "535.00",
    compareAtPrice: "595.00",
    images: [L.skincare, PX.jelly],
    packSize: "250 ml pump bottle",
    form: "Lotion",
    stock: 42,
    featured: true,
    tags: ["sensitive skin", "premium"],
    highlights: ["Fragrance free", "Non-comedogenic", "Dermatologist recommended"],
    usage: "Apply liberally to face and body as often as needed, especially after bathing.",
    reviews: [
      { author: "Preethi S.", rating: 5, title: "Only thing that works on my eczema", body: "Calms flare-ups within a day. Worth every rupee.", daysAgo: 16 },
      { author: "Gautam R.", rating: 4, title: "Light yet effective", body: "Absorbs fast and no greasy feeling in Chennai humidity.", daysAgo: 44 },
    ],
  },
  {
    slug: "la-shield-sunscreen-spf50",
    name: "La Shield Sunscreen Gel SPF 50+",
    brand: "Glenmark",
    category: "skin-care",
    shortDescription: "Broad-spectrum, matte-finish sun protection for Indian skin.",
    description:
      "La Shield's oil-free gel offers PA+++ broad-spectrum protection with a weightless matte finish that works under makeup and in humid weather.",
    price: "685.00",
    images: [L.skincare],
    packSize: "50 g tube",
    form: "Gel",
    stock: 35,
    tags: ["sun care", "oil-free"],
    highlights: ["SPF 50+ PA+++", "Matte, non-sticky", "Water resistant"],
    usage: "Apply generously 15 minutes before sun exposure. Reapply every 2–3 hours.",
    reviews: [
      { author: "Aishwarya L.", rating: 5, title: "No white cast!", body: "Finally a sunscreen that disappears on my skin tone.", daysAgo: 21 },
    ],
  },
  {
    slug: "accu-chek-active-glucometer",
    name: "Accu-Chek Active Glucometer Kit",
    brand: "Roche",
    category: "diabetes-care",
    shortDescription: "Reliable 5-second glucose readings with 10 free strips.",
    description:
      "The Accu-Chek Active kit includes the meter, lancing device, 10 lancets and 10 test strips. Features pre- and post-meal markers and 7/14/30/90-day averages for better conversations with your doctor.",
    price: "1099.00",
    compareAtPrice: "1299.00",
    images: [L.diabetes, L.devices],
    packSize: "Kit with 10 strips",
    form: "Device",
    stock: 22,
    featured: true,
    tags: ["premium", "monitoring"],
    highlights: ["5-second results", "500-reading memory", "Lifetime meter warranty"],
    usage: "Insert strip, prick fingertip with the lancing device, and touch the blood drop to the strip. Record readings as advised by your physician.",
    reviews: [
      { author: "Natarajan V.", rating: 5, title: "Accurate and simple", body: "Matches lab values closely. Strips are always available at Arun Medicals.", daysAgo: 18 },
      { author: "Usha Rani", rating: 4, title: "Good kit", body: "Easy to read screen. Lancets could be finer.", daysAgo: 55 },
    ],
  },
  {
    slug: "glycomet-500-sr",
    name: "Glycomet 500 SR Metformin",
    brand: "USV",
    category: "diabetes-care",
    shortDescription: "Sustained-release metformin for Type 2 diabetes management.",
    description:
      "Glycomet 500 SR is a sustained-release formulation of metformin hydrochloride prescribed for Type 2 diabetes mellitus. Prescription required — upload or present it at pickup.",
    price: "38.00",
    images: [L.diabetes, PX.pillsWhite],
    packSize: "Strip of 20 tablets",
    form: "Tablet",
    prescriptionRequired: true,
    stock: 180,
    tags: ["prescription", "maintenance"],
    highlights: ["Sustained release", "Once or twice daily", "Prescription required"],
    usage: "Take as prescribed by your doctor, usually with meals. Do not crush or chew.",
    reviews: [
      { author: "Sekar M.", rating: 5, title: "Monthly refill made easy", body: "They keep my prescription on file and remind me when I'm due. Excellent service.", daysAgo: 9 },
    ],
  },
  {
    slug: "accu-chek-active-strips",
    name: "Accu-Chek Active Test Strips",
    brand: "Roche",
    category: "diabetes-care",
    shortDescription: "50 test strips compatible with the Accu-Chek Active meter.",
    description:
      "Genuine Accu-Chek Active strips with a wide dosing area and underdosing detection for dependable results every time.",
    price: "865.00",
    compareAtPrice: "925.00",
    images: [L.diabetes],
    packSize: "Box of 50 strips",
    form: "Strips",
    stock: 40,
    tags: ["refill"],
    highlights: ["Underdosing detection", "Long shelf life", "Genuine Roche"],
    usage: "Use only with Accu-Chek Active meter. Close the vial tightly after each use.",
    reviews: [
      { author: "Natarajan V.", rating: 5, title: "Always fresh stock", body: "Long expiry dates and good pricing.", daysAgo: 27 },
    ],
  },
];
