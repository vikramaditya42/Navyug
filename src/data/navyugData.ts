export type Language = 'en' | 'hi';
export type HorizonYear = '2026' | '2030' | '2035' | '2040' | '2047';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface MacroIndicator {
  id: string;
  label: BilingualText;
  shortLabel: BilingualText;
  unit: BilingualText;
  source: string;
  values: Record<HorizonYear, number>;
  formatted: Record<HorizonYear, string>;
  note: BilingualText;
  goalTarget: number;
}

export interface RegionalZone {
  id: string;
  name: BilingualText;
  corridor: BilingualText;
  states: string;
  focusSectors: BilingualText;
  baseline2026: string;
  target2047: string;
  accentHex: string;
}

export interface SubPillar {
  code: string;
  minute: string;
  title: BilingualText;
  target2047: BilingualText;
  bottleneck2026: BilingualText;
}

export interface NationalPillar {
  hour: number;
  hourLabel: string;
  shortTitle: BilingualText;
  title: BilingualText;
  source: string;
  executivePitch: BilingualText;
  reality2026Label: BilingualText;
  reality2026Value: string;
  target2047Label: BilingualText;
  target2047Value: string;
  subPillars: SubPillar[];
}

export interface ManifestoPoint {
  number: string;
  title: BilingualText;
  metricShift: string;
  summary: BilingualText;
  keyLevers: BilingualText[];
}

export interface PolicyBrief {
  id: string;
  category: BilingualText;
  subtitle: BilingualText;
  title: BilingualText;
  impactPitch: BilingualText;
  summary60s: BilingualText;
  keyDeliverables: BilingualText[];
  officialPortal: string;
}

export interface YouthStory {
  id: string;
  category: BilingualText;
  location: BilingualText;
  title: BilingualText;
  impactMetric: BilingualText;
  summary: BilingualText;
  replicationNote: BilingualText;
}

export interface PolicyIdeaItem {
  id: string;
  authorId: string;
  authorName: string;
  age: number;
  state: string;
  pillarCode: string;
  pitch: string;
  blueprint: string;
  upvotesCount: number;
  visibility: 'public';
  isSeed?: boolean;
  createdAtMs: number;
}

export const TARGET_CENTENARY_UTC = Date.UTC(2047, 7, 14, 18, 30, 0); // Aug 15, 2047 00:00 IST

export const PLEDGE_COMMITMENTS: BilingualText[] = [
  {
    en: 'Upskill 5 youth in AI & digital literacy and build ethical technology for Viksit Bharat.',
    hi: '5 युवाओं को AI व डिजिटल साक्षरता में प्रशिक्षित करूंगा और विकसित भारत हेतु नैतिक तकनीक बनाऊंगा।',
  },
  {
    en: 'Adopt solar & zero-waste habits at home and mentor local clean-energy adoption.',
    hi: 'घर में सौर व शून्य-अपशिष्ट आदतें अपनाऊंगा और स्थानीय स्वच्छ ऊर्जा अभियान का मार्गदर्शन करूंगा।',
  },
  {
    en: 'Participate in transparent ward-level civic audits and strengthen local Gram/City governance.',
    hi: 'पारदर्शी वार्ड-स्तरीय नागरिक ऑडिट में भाग लूंगा और स्थानीय शासन को सुदृढ़ करूंगा।',
  },
  {
    en: 'Support women-led MSMEs, regional artisans, and inclusive STEM mentorship in my district.',
    hi: 'अपने जिले में महिला-नेतृत्व वाले MSME, स्थानीय कारीगरों और समावेशी STEM मार्गदर्शन को बढ़ावा दूंगा।',
  },
  {
    en: 'Contribute open-source civic tools or scientific research aligned with India @ 100 priorities.',
    hi: 'भारत @ 100 की प्राथमिकताओं के अनुरूप ओपन-सोर्स नागरिक उपकरण या वैज्ञानिक शोध में योगदान दूंगा।',
  },
];

export const VISION_PILLARS = [
  {
    tag: { en: 'Pillar I · Evidence Over Rhetoric', hi: 'स्तंभ I · प्रमाण आधारित दृष्टिकोण' },
    title: {
      en: 'Fact-Checked 2026 → 2047 Trajectory',
      hi: 'तथ्य-जांचा 2026 → 2047 रोडमैप',
    },
    body: {
      en: 'Every benchmark on NAVYUG is anchored in primary official datasets—tracking India from a $4.06T Nominal GDP ($2,750 Per Capita) in 2026 to a $30T+ High-Income economy ($18,000+ Per Capita) by 2047.',
      hi: 'नवयुग का प्रत्येक मानक आधिकारिक आंकड़ों पर आधारित है—2026 में $4.06T जीडीपी ($2,750 प्रति व्यक्ति) से 2047 तक $30T+ उच्च-आय अर्थव्यवस्था ($18,000+ प्रति व्यक्ति) की यात्रा।',
    },
    metaLeft: { en: '6 Macro Indicators & 72 Sub-Pillars', hi: '6 प्रमुख सूचकांक व 72 उप-स्तंभ' },
    metaRight: 'IMF WEO Oct 2026 & NITI Aayog',
  },
  {
    tag: { en: 'Pillar II · Synchronized Architecture', hi: 'स्तंभ II · समन्वित ढांचा' },
    title: {
      en: 'Growth Locked with Ecology & Equity',
      hi: 'पर्यावरण व समता के साथ विकास',
    },
    body: {
      en: 'True developed status requires crossing the World Bank High-Income threshold while scaling clean energy from 300.5 GW to 1,800+ GW, raising Female LFPR from 40.0% to 55%+, and lifting HDI from 0.685 to 0.905+.',
      hi: 'वास्तविक विकसित दर्जे के लिए स्वच्छ ऊर्जा को 300.5 GW से 1,800+ GW, महिला श्रम भागीदारी को 40.0% से 55%+ और HDI को 0.685 से 0.905+ तक ले जाना आवश्यक है।',
    },
    metaLeft: { en: '12 Core Pillars in Lockstep', hi: '12 मुख्य स्तंभ एक साथ' },
    metaRight: 'UNDP HDR & CEA Clean Power',
  },
  {
    tag: { en: 'Pillar III · Jan Bhagidari in Action', hi: 'स्तंभ III · सक्रिय जन भागीदारी' },
    title: {
      en: 'Youth-Led Civic Execution',
      hi: 'युवा-नेतृत्व नागरिक क्रियान्वयन',
    },
    body: {
      en: 'NAVYUG turns citizens from passive readers into nation-builders—featuring an instant 2047 Digital Pledge Certificate, a crowdsourced Youth Policy Leaderboard, and 60-second zero-jargon policy briefs.',
      hi: 'नवयुग नागरिकों को राष्ट्र-निर्माता बनाता है—तत्काल 2047 डिजिटल प्रतिज्ञा प्रमाणपत्र, युवा नीति लीडरबोर्ड और 60-सेकंड सरल नीति सारांश के साथ।',
    },
    metaLeft: { en: '100% Bilingual (English & हिन्दी)', hi: '100% द्विभाषी (अंग्रेज़ी व हिन्दी)' },
    metaRight: 'NITI Aayog Viksit Bharat 2047',
  },
];

export const MANIFESTO_POINTS: ManifestoPoint[] = [
  {
    number: '01',
    title: {
      en: 'High-Income Economy & Formalized MSMEs',
      hi: 'उच्च-आय अर्थव्यवस्था व औपचारिक MSME',
    },
    metricShift: '$4.06T → $30.0T+ GDP',
    summary: {
      en: 'Accelerate manufacturing, formal credit via Unified Lending Interface (ULI), and global export corridors to raise per capita income from $2,750 to $18,000+.',
      hi: 'विनिर्माण, यूएलआई (ULI) के जरिए औपचारिक ऋण और निर्यात गलियारों से प्रति व्यक्ति आय को $2,750 से $18,000+ तक बढ़ाना।',
    },
    keyLevers: [
      { en: 'Zero-collateral digital working capital for 63M+ MSMEs', hi: '6.3 करोड़+ MSME हेतु डिजिटल कार्यशील पूंजी' },
      { en: 'Logistics cost drop from ~11.5% to <7.5% of GDP via PM Gati Shakti', hi: 'पीएम गति शक्ति से लॉजिस्टिक्स लागत <7.5% जीडीपी' },
      { en: 'Global export share expansion across electronics, EVs & pharma', hi: 'इलेक्ट्रॉनिक्स, ईवी और फार्मा निर्यात में विस्तार' },
    ],
  },
  {
    number: '02',
    title: {
      en: '1,800+ GW Clean Energy & Climate Resilience',
      hi: '1,800+ GW स्वच्छ ऊर्जा व जलवायु सुरक्षा',
    },
    metricShift: '300.5 GW → 1,800+ GW',
    summary: {
      en: 'Scale solar, wind, pumped hydro, green hydrogen, and grid-scale battery storage so industrial growth decouples permanently from carbon intensity.',
      hi: 'सौर, पवन, ग्रीन हाइड्रोजन और बैटरी भंडारण का विस्तार ताकि औद्योगिक विकास कम कार्बन उत्सर्जन के साथ हो।',
    },
    keyLevers: [
      { en: '500 GW non-fossil milestone by 2030, 1,800+ GW by 2047', hi: '2030 तक 500 GW और 2047 तक 1,800+ GW स्वच्छ ऊर्जा' },
      { en: 'Decentralized agricultural solar feeders & village cold-chains', hi: 'विकेंद्रीकृत कृषि सौर फीडर और ग्राम कोल्ड-चेन' },
      { en: '5 MMT+ annual Green Hydrogen production & export hubs', hi: 'वार्षिक 5 MMT+ ग्रीन हाइड्रोजन उत्पादन केंद्र' },
    ],
  },
  {
    number: '03',
    title: {
      en: 'Universal Human Capital & Very High HDI',
      hi: 'सार्वभौमिक मानव पूंजी व उच्च HDI',
    },
    metricShift: '0.685 → 0.905+ HDI',
    summary: {
      en: 'Deliver experiential NEP 2020 schooling, portable Academic Credit Banks, and preventive universal health coverage through Ayushman Bharat Digital Mission.',
      hi: 'NEP 2020 आधारित व्यावहारिक शिक्षा, अकादमिक क्रेडिट बैंक और आयुष्मान भारत डिजिटल मिशन से सार्वभौमिक स्वास्थ्य सुरक्षा।',
    },
    keyLevers: [
      { en: '60%+ Higher Education GER & 75% industry-certified youth', hi: '60%+ उच्च शिक्षा GER और 75% उद्योग-प्रमाणित युवा' },
      { en: 'Life expectancy lifted from 72.0 to 79+ years nationwide', hi: 'औसत जीवन प्रत्याशा 72.0 से बढ़ाकर 79+ वर्ष' },
      { en: 'AI-assisted primary health tele-diagnostics at every block', hi: 'प्रत्येक ब्लॉक में AI-सहायित प्राथमिक स्वास्थ्य निदान' },
    ],
  },
  {
    number: '04',
    title: {
      en: 'Nari Shakti & 55%+ Workforce Parity',
      hi: 'नारी शक्ति व 55%+ कार्यबल भागीदारी',
    },
    metricShift: '40.0% → 55.0%+ LFPR',
    summary: {
      en: 'Unlock India’s strongest growth dividend by removing mobility, care-economy, and credit barriers for women across rural enterprises and STEM leadership.',
      hi: 'सुरक्षित परिवहन, शिशु-देखभाल और ऋण तक पहुंच बढ़ाकर ग्रामीण उद्यमों व STEM में महिलाओं की भागीदारी को 55%+ करना।',
    },
    keyLevers: [
      { en: 'Co-funded Palna crèches & safe transit across industrial clusters', hi: 'औद्योगिक क्लस्टरों में पालना क्रेच और सुरक्षित परिवहन' },
      { en: 'Direct digital credit & ONDC storefront access for women SHGs', hi: 'महिला स्वयं सहायता समूहों के लिए डिजिटल ऋण व ONDC पहुंच' },
      { en: '40%+ women leadership in STEM research & civic governance', hi: 'STEM शोध व स्थानीय शासन में 40%+ महिला नेतृत्व' },
    ],
  },
  {
    number: '05',
    title: {
      en: 'Sovereign Deep-Tech, 3.0% R&D & DPI 2.0',
      hi: 'संप्रभु डीप-टेक, 3.0% शोध व DPI 2.0',
    },
    metricShift: '0.65% → 3.00% R&D GDP',
    summary: {
      en: 'Build domestic semiconductor fabs, open sovereign voice-first AI models in 22 Indian languages, and quadruple national R&D investment via ANRF.',
      hi: 'घरेलू सेमीकंडक्टर फैब, 22 भारतीय भाषाओं में वॉइस-फर्स्ट AI मॉडल और ANRF के माध्यम से राष्ट्रीय शोध निवेश को चार गुना बढ़ाना।',
    },
    keyLevers: [
      { en: 'Shared national GPU & RISC-V chip sandboxes for public universities', hi: 'सार्वजनिक विश्वविद्यालयों हेतु साझा GPU व RISC-V लैब' },
      { en: 'Voice-first multilingual DPI governance across all public services', hi: 'सभी जन सेवाओं में बहुभाषी वॉइस-फर्स्ट DPI शासन' },
      { en: 'Private-sector matched deep-tech innovation grants via ANRF', hi: 'ANRF के जरिए निजी-सहभागी डीप-टेक नवाचार अनुदान' },
    ],
  },
];

export const MACRO_INDICATORS: MacroIndicator[] = [
  {
    id: 'gdp',
    label: { en: 'Nominal GDP Size', hi: 'नाममात्र जीडीपी आकार' },
    shortLabel: { en: 'Nominal GDP', hi: 'जीडीपी' },
    unit: { en: 'USD Trillions', hi: 'ट्रिलियन डॉलर' },
    source: 'IMF WEO Oct 2026 & NITI Aayog',
    values: { '2026': 4.06, '2030': 6.79, '2035': 12.4, '2040': 20.5, '2047': 30.0 },
    formatted: { '2026': '$4.06T', '2030': '$6.79T', '2035': '$12.4T', '2040': '$20.5T', '2047': '$30.0T+' },
    note: {
      en: '2026 Baseline: $4.06T (IMF WEO Oct 2026) → 2030: $6.79T → 2047 Goal: $30T+ (NITI Aayog)',
      hi: '2026 आधार: $4.06T (IMF WEO) → 2030: $6.79T → 2047 लक्ष्य: $30T+ (नीति आयोग)',
    },
    goalTarget: 30.0,
  },
  {
    id: 'perCapita',
    label: { en: 'GDP Per Capita (Nominal)', hi: 'प्रति व्यक्ति जीडीपी' },
    shortLabel: { en: 'Per Capita Income', hi: 'प्रति व्यक्ति आय' },
    unit: { en: 'USD / Citizen / Year', hi: 'डॉलर / नागरिक / वर्ष' },
    source: 'IMF WEO Oct 2026 & NITI Aayog DPI@2047',
    values: { '2026': 2750, '2030': 4400, '2035': 7800, '2040': 12600, '2047': 18000 },
    formatted: { '2026': '$2,750', '2030': '$4,400', '2035': '$7,800', '2040': '$12,600', '2047': '$18,000' },
    note: {
      en: '2026: $2,750 Nominal ($12,801 PPP; ₹2,43,803) → Crosses World Bank High-Income threshold to $18,000',
      hi: '2026: $2,750 (₹2,43,803) → विश्व बैंक उच्च-आय सीमा पार कर $18,000 का लक्ष्य',
    },
    goalTarget: 18000,
  },
  {
    id: 'cleanPower',
    label: { en: 'Non-Fossil Installed Power', hi: 'गैर-जीवाश्म स्थापित ऊर्जा' },
    shortLabel: { en: 'Clean Power (GW)', hi: 'स्वच्छ ऊर्जा' },
    unit: { en: 'Installed Gigawatts (GW)', hi: 'स्थापित गीगावाट (GW)' },
    source: 'PIB / Central Electricity Authority (July 2026)',
    values: { '2026': 300.5, '2030': 500, '2035': 880, '2040': 1320, '2047': 1800 },
    formatted: { '2026': '300.5 GW', '2030': '500 GW', '2035': '880 GW', '2040': '1,320 GW', '2047': '1,800+ GW' },
    note: {
      en: 'Crossed 300.50 GW in July 2026 (Solar 164.6 GW, Wind 58.1 GW, Hydro 57.2 GW) → 1,800+ GW by 2047',
      hi: 'जुलाई 2026 में 300.50 GW पार (सौर 164.6 GW, पवन 58.1 GW, जल 57.2 GW) → 2047 तक 1,800+ GW',
    },
    goalTarget: 1800,
  },
  {
    id: 'hdi',
    label: { en: 'Human Development Index (HDI)', hi: 'मानव विकास सूचकांक (HDI)' },
    shortLabel: { en: 'UNDP HDI Score', hi: 'HDI स्कोर' },
    unit: { en: 'Global UNDP Score (0–1)', hi: 'वैश्विक UNDP स्कोर (0–1)' },
    source: 'UNDP Human Development Report 2025/2026',
    values: { '2026': 0.685, '2030': 0.735, '2035': 0.795, '2040': 0.855, '2047': 0.905 },
    formatted: { '2026': '0.685', '2030': '0.735', '2035': '0.795', '2040': '0.855', '2047': '0.905+' },
    note: {
      en: '2026: 0.685 (Rank 130/193, up from 0.644; Life Expectancy 72.0 yrs) → 0.905+ Very High HDI by 2047',
      hi: '2026: 0.685 (रैंक 130/193; जीवन प्रत्याशा 72.0 वर्ष) → 2047 तक 0.905+ अत्यंत उच्च HDI',
    },
    goalTarget: 0.905,
  },
  {
    id: 'femaleLfpr',
    label: { en: 'Female Labour Participation', hi: 'महिला श्रम भागीदारी (LFPR)' },
    shortLabel: { en: 'Female LFPR (%)', hi: 'महिला LFPR' },
    unit: { en: '% Usual Status Workforce', hi: '% सामान्य कार्यबल' },
    source: 'MoSPI PLFS Annual Report 2025 & PIB 2026',
    values: { '2026': 40.0, '2030': 44.0, '2035': 48.0, '2040': 51.8, '2047': 55.0 },
    formatted: { '2026': '40.0%', '2030': '44.0%', '2035': '48.0%', '2040': '51.8%', '2047': '55.0%+' },
    note: {
      en: '2026: 40.0% Usual Status (PLFS Annual Report 2025; 34.6% CWS Sept 2026) → 55.0%+ Parity by 2047',
      hi: '2026: 40.0% सामान्य स्थिति (PLFS 2025) → 2047 तक 55.0%+ समता लक्ष्य',
    },
    goalTarget: 55.0,
  },
  {
    id: 'rdSpend',
    label: { en: 'National R&D Investment', hi: 'राष्ट्रीय अनुसंधान व विकास निवेश' },
    shortLabel: { en: 'R&D Spend (% GDP)', hi: 'R&D निवेश' },
    unit: { en: '% of National GDP', hi: '% राष्ट्रीय जीडीपी' },
    source: 'DST & Anusandhan National Research Foundation',
    values: { '2026': 0.65, '2030': 1.2, '2035': 1.85, '2040': 2.45, '2047': 3.0 },
    formatted: { '2026': '0.65%', '2030': '1.20%', '2035': '1.85%', '2040': '2.45%', '2047': '3.00%' },
    note: {
      en: '2026: 0.65% of GDP → Scaling via ANRF & Private Deep-Tech to 3.00% of GDP by 2047',
      hi: '2026: जीडीपी का 0.65% → ANRF व निजी डीप-टेक से 2047 तक 3.00% जीडीपी',
    },
    goalTarget: 3.0,
  },
];

export const REGIONAL_ZONES: RegionalZone[] = [
  {
    id: 'north',
    name: { en: 'Northern Corridor', hi: 'उत्तरी गलियारा' },
    corridor: { en: 'DFC, Agri-Value & Clean Solar Belt', hi: 'डीएफसी, कृषि-मूल्य व सौर बेल्ट' },
    states: 'Delhi NCR, Rajasthan, UP, Haryana, Punjab, Himachal, Uttarakhand, J&K',
    focusSectors: { en: 'Solar Parks, Defence Corridors, Precision Agritech, Electronics', hi: 'सौर पार्क, रक्षा गलियारा, स्मार्ट कृषि, इलेक्ट्रॉनिक्स' },
    baseline2026: '$1.12T Combined GSDP',
    target2047: '$8.4T+ Industrial & Agri Hub',
    accentHex: '#2D4A8A',
  },
  {
    id: 'west',
    name: { en: 'Western Corridor', hi: 'पश्चिमी गलियारा' },
    corridor: { en: 'Semicon, GIFT FinTech & Maritime Gateway', hi: 'सेमीकंडक्टर, गिफ्ट फिनटेक व समुद्री केंद्र' },
    states: 'Gujarat, Maharashtra, Goa',
    focusSectors: { en: 'Semiconductor Fabs, Green Hydrogen, Global Finance, Deep-Sea Ports', hi: 'सेमीकंडक्टर फैब, ग्रीन हाइड्रोजन, वैश्विक वित्त, बंदरगाह' },
    baseline2026: '$1.08T Combined GSDP',
    target2047: '$7.9T+ Export & Capital Engine',
    accentHex: '#2C7A6B',
  },
  {
    id: 'south',
    name: { en: 'Southern Corridor', hi: 'दक्षिणी गलियारा' },
    corridor: { en: 'Deep-Tech AI, EV Manufacturing & Bio-Pharma', hi: 'डीप-टेक AI, ईवी निर्माण व बायो-फार्मा' },
    states: 'Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala',
    focusSectors: { en: 'IndiaAI Compute, EV & Battery Gigafactories, Aerospace, Biotech', hi: 'इंडियाAI कंप्यूट, ईवी गीगाफैक्ट्री, एयरोस्पेस, बायोटेक' },
    baseline2026: '$1.21T Combined GSDP',
    target2047: '$8.9T+ Global R&D Powerhouse',
    accentHex: '#6366A8',
  },
  {
    id: 'east',
    name: { en: 'Eastern Corridor', hi: 'पूर्वी गलियारा' },
    corridor: { en: 'Purvodaya Green Steel, Waterways & Ports', hi: 'पूर्वोदय ग्रीन स्टील, जलमार्ग व बंदरगाह' },
    states: 'Odisha, West Bengal, Bihar, Jharkhand',
    focusSectors: { en: 'Green Steel, Inland Waterways, Critical Minerals, Coastal Logistics', hi: 'ग्रीन स्टील, अंतर्देशीय जलमार्ग, महत्वपूर्ण खनिज, तटीय लॉजिस्टिक्स' },
    baseline2026: '$410B Combined GSDP',
    target2047: '$3.2T+ Manufacturing Surge',
    accentHex: '#4F6D7A',
  },
  {
    id: 'central',
    name: { en: 'Central Corridor', hi: 'मध्य गलियारा' },
    corridor: { en: 'Logistics Heart, Renewables & Food Processing', hi: 'लॉजिस्टिक्स केंद्र, नवीकरणीय व खाद्य प्रसंस्करण' },
    states: 'Madhya Pradesh, Chhattisgarh',
    focusSectors: { en: 'Multi-Modal Freight Hubs, Pumped Hydro, Organic Food Processing', hi: 'मल्टी-मोडल फ्रेट हब, पंप्ड हाइड्रो, जैविक खाद्य प्रसंस्करण' },
    baseline2026: '$230B Combined GSDP',
    target2047: '$1.9T+ Inland Trade Spine',
    accentHex: '#7A6855',
  },
  {
    id: 'northeast',
    name: { en: 'North-East Corridor', hi: 'पूर्वोत्तर गलियारा' },
    corridor: { en: 'Act East ASEAN Gateway, Semicon OSAT & Eco-Tech', hi: 'एक्ट ईस्ट आसियान द्वार, सेमीकॉन OSAT व इको-टेक' },
    states: 'Assam, Meghalaya, Sikkim, Tripura, Manipur, Mizoram, Nagaland, Arunachal',
    focusSectors: { en: 'Semicon Packaging (Jagiroad), Hydro Power, Eco-Tourism, Bamboo Bio-Refineries', hi: 'सेमीकॉन पैकेजिंग, जलविद्युत, इको-टूरिज्म, बांस बायो-रिफाइनरी' },
    baseline2026: '$105B Combined GSDP',
    target2047: '$950B+ ASEAN Bridge',
    accentHex: '#3B7A57',
  },
];

export const NATIONAL_PILLARS: NationalPillar[] = [
  {
    hour: 1,
    hourLabel: '01:00',
    shortTitle: { en: 'Economy', hi: 'अर्थव्यवस्था' },
    title: { en: 'Economy & Trade', hi: 'अर्थव्यवस्था एवं व्यापार' },
    source: 'IMF WEO Oct 2026 & NITI Aayog Vision 2047',
    executivePitch: {
      en: 'Transform India from a $4.06 Trillion emerging economy (2026) into a $30+ Trillion high-income industrial and export powerhouse with per capita income reaching $18,000 by 2047.',
      hi: '2026 की $4.06 ट्रिलियन उभरती अर्थव्यवस्था से 2047 तक $30+ ट्रिलियन उच्च-आय औद्योगिक व निर्यात महाशक्ति बनाना, जहाँ प्रति व्यक्ति आय $18,000 हो।',
    },
    reality2026Label: { en: 'Nominal GDP (IMF WEO Oct 2026)', hi: 'नाममात्र जीडीपी (IMF 2026)' },
    reality2026Value: '$4.06 Trillion (4th Largest)',
    target2047Label: { en: 'Target GDP (NITI Aayog 2047)', hi: 'लक्ष्य जीडीपी (नीति आयोग 2047)' },
    target2047Value: '$30.0 – $35.0 Trillion',
    subPillars: [
      {
        code: '1.1',
        minute: ':10',
        title: { en: 'MSME Formalization & Credit', hi: 'MSME औपचारिकीकरण व ऋण' },
        target2047: { en: 'Zero-collateral ULI credit & ONDC integration', hi: 'बिना गारंटी ULI ऋण व ONDC एकीकरण' },
        bottleneck2026: { en: 'Compliance friction for micro-enterprises', hi: 'सूक्ष्म उद्यमों के लिए अनुपालन बाधाएं' },
      },
      {
        code: '1.2',
        minute: ':20',
        title: { en: 'PLI Export Manufacturing', hi: 'PLI निर्यात विनिर्माण' },
        target2047: { en: '25% GDP share from high-value manufacturing', hi: 'उच्च-मूल्य विनिर्माण से 25% जीडीपी हिस्सा' },
        bottleneck2026: { en: 'Component ecosystem depth in electronics', hi: 'इलेक्ट्रॉनिक्स में पुर्जा आपूर्ति श्रृंखला की कमी' },
      },
      {
        code: '1.3',
        minute: ':30',
        title: { en: 'Global Supply Chain Integration', hi: 'वैश्विक आपूर्ति श्रृंखला एकीकरण' },
        target2047: { en: '10%+ global merchandise & services export share', hi: 'वैश्विक निर्यात में 10%+ हिस्सेदारी' },
        bottleneck2026: { en: 'Port turnaround time & customs harmonization', hi: 'बंदरगाह टर्नअराउंड और कस्टम समन्वय' },
      },
      {
        code: '1.4',
        minute: ':40',
        title: { en: 'GIFT City FinTech & Capital Markets', hi: 'GIFT सिटी फिनटेक व पूंजी बाजार' },
        target2047: { en: 'Top-3 global green & institutional finance hub', hi: 'शीर्ष-3 वैश्विक हरित व संस्थागत वित्त केंद्र' },
        bottleneck2026: { en: 'Deepening domestic corporate bond liquidity', hi: 'घरेलू कॉर्पोरेट बॉन्ड तरलता का विस्तार' },
      },
      {
        code: '1.5',
        minute: ':50',
        title: { en: 'Blue Economy & Sagarmala Ports', hi: 'नीली अर्थव्यवस्था व सागरमाला बंदरगाह' },
        target2047: { en: '10,000+ MTPA automated port capacity', hi: '10,000+ MTPA स्वचालित बंदरगाह क्षमता' },
        bottleneck2026: { en: 'Coastal rail last-mile connectivity gaps', hi: 'तटीय रेल लास्ट-माइल कनेक्टिविटी कमी' },
      },
      {
        code: '1.6',
        minute: ':60',
        title: { en: 'Jan Vishwas Regulatory Ease', hi: 'जन विश्वास नियामक सरलता' },
        target2047: { en: 'Single-window paperless compliance across states', hi: 'राज्यों में सिंगल-विंडो पेपरलेस अनुपालन' },
        bottleneck2026: { en: 'Inter-state municipal license fragmentation', hi: 'अंतर-राज्यीय नगर पालिका लाइसेंस जटिलता' },
      },
    ],
  },
  {
    hour: 2,
    hourLabel: '02:00',
    shortTitle: { en: 'Education', hi: 'शिक्षा' },
    title: { en: 'Education & Future Skills', hi: 'शिक्षा व भविष्य कौशल' },
    source: 'Ministry of Education NEP 2020 & AISHE 2026',
    executivePitch: {
      en: 'Reimagine schooling and universities around experiential STEM, vocational fluency from Grade 6, and portable lifelong credits for 75%+ industry-certified youth.',
      hi: 'कक्षा 6 से व्यावहारिक STEM, व्यावसायिक दक्षता और पोर्टेबल क्रेडिट के साथ 75%+ उद्योग-प्रमाणित युवा कार्यबल तैयार करना।',
    },
    reality2026Label: { en: 'Higher Ed GER (2026)', hi: 'उच्च शिक्षा GER (2026)' },
    reality2026Value: '29.4% GER',
    target2047Label: { en: '2047 GER & Certification', hi: '2047 GER व प्रमाणन' },
    target2047Value: '60%+ GER · 75% Certified',
    subPillars: [
      { code: '2.1', minute: ':10', title: { en: 'NIPUN Foundational Literacy', hi: 'निपुण बुनियादी साक्षरता' }, target2047: { en: '100% Grade-3 mother-tongue & numeracy mastery', hi: 'कक्षा 3 तक 100% मातृभाषा व गणित दक्षता' }, bottleneck2026: { en: 'Rural teacher-to-pupil ratio gaps', hi: 'ग्रामीण शिक्षक-छात्र अनुपात असंतुलन' } },
      { code: '2.2', minute: ':20', title: { en: 'Academic Bank of Credits (ABC)', hi: 'अकादमिक बैंक ऑफ क्रेडिट्स' }, target2047: { en: 'Seamless multi-entry modular degrees nationwide', hi: 'राष्ट्रव्यापी मल्टी-एंट्री मॉड्यूलर डिग्रियाँ' }, bottleneck2026: { en: 'University credit transfer interoperability', hi: 'विश्वविद्यालय क्रेडिट हस्तांतरण समन्वय' } },
      { code: '2.3', minute: ':30', title: { en: 'Vocational AI & Coding Labs', hi: 'व्यावसायिक AI व कोडिंग लैब' }, target2047: { en: 'Atal Tinkering & AI labs in every secondary school', hi: 'प्रत्येक माध्यमिक विद्यालय में अटल व AI लैब' }, bottleneck2026: { en: 'Hardware maintenance in Tier-3/rural districts', hi: 'ग्रामीण जिलों में लैब रखरखाव' } },
      { code: '2.4', minute: ':40', title: { en: 'Global Research Universities', hi: 'वैश्विक अनुसंधान विश्वविद्यालय' }, target2047: { en: '15+ Indian institutions in global Top 100', hi: 'वैश्विक शीर्ष 100 में 15+ भारतीय संस्थान' }, bottleneck2026: { en: 'PhD fellowship & lab equipment funding', hi: 'पीएचडी फेलोशिप व शोध उपकरण निवेश' } },
      { code: '2.5', minute: ':50', title: { en: 'Bhashini Multilingual Curricula', hi: 'भाषिणी बहुभाषी पाठ्यक्रम' }, target2047: { en: 'Engineering & medical courses in 22 languages', hi: '22 भाषाओं में इंजीनियरिंग व चिकित्सा शिक्षा' }, bottleneck2026: { en: 'Technical terminology translation depth', hi: 'तकनीकी शब्दावली अनुवाद की व्यापकता' } },
      { code: '2.6', minute: ':60', title: { en: 'Lifelong Apprenticeship Grid', hi: 'आजीवन अप्रेंटिसशिप ग्रिड' }, target2047: { en: 'Paid industry apprenticeships for 10M+ youth/yr', hi: 'प्रति वर्ष 1 करोड़+ युवाओं को सशुल्क अप्रेंटिसशिप' }, bottleneck2026: { en: 'MSME onboarding into formal apprenticeship portals', hi: 'औपचारिक पोर्टल पर MSME भागीदारी' } },
    ],
  },
  {
    hour: 3,
    hourLabel: '03:00',
    shortTitle: { en: 'Health', hi: 'स्वास्थ्य' },
    title: { en: 'Universal Healthcare Shield', hi: 'सार्वभौमिक स्वास्थ्य कवच' },
    source: 'MoHFW ABDM 2026 & UNDP HDR',
    executivePitch: {
      en: 'Guarantee cashless preventive and tertiary healthcare for every family through unified ABHA health records, AI diagnostics, and 79+ year life expectancy.',
      hi: 'एकीकृत ABHA स्वास्थ्य रिकॉर्ड, AI निदान और कैशलेस उपचार के जरिए प्रत्येक परिवार को सार्वभौमिक स्वास्थ्य सुरक्षा।',
    },
    reality2026Label: { en: 'Life Expectancy & Out-of-Pocket', hi: 'जीवन प्रत्याशा (2026)' },
    reality2026Value: '72.0 Years · 39% OOP',
    target2047Label: { en: '2047 Health Benchmark', hi: '2047 स्वास्थ्य लक्ष्य' },
    target2047Value: '79+ Years · <15% OOP',
    subPillars: [
      { code: '3.1', minute: ':10', title: { en: 'ABHA Portable Health IDs', hi: 'ABHA पोर्टेबल स्वास्थ्य आईडी' }, target2047: { en: '100% interoperable longitudinal patient records', hi: '100% इंटरऑपरेबल डिजिटल रोगी रिकॉर्ड' }, bottleneck2026: { en: 'Private clinic EMR adoption pace', hi: 'निजी क्लीनिकों में EMR अपनाने की गति' } },
      { code: '3.2', minute: ':20', title: { en: 'District AI Diagnostics', hi: 'जिला AI निदान केंद्र' }, target2047: { en: 'Early TB, cancer & cardiac screening at every PHC', hi: 'प्रत्येक PHC में टीबी, कैंसर व हृदय जांच' }, bottleneck2026: { en: 'Specialist radiologists in rural blocks', hi: 'ग्रामीण ब्लॉकों में विशेषज्ञ डॉक्टरों की कमी' } },
      { code: '3.3', minute: ':30', title: { en: 'Poshan & Zero Malnutrition', hi: 'पोषण व शून्य कुपोषण' }, target2047: { en: 'Under-5 stunting below 8% nationwide', hi: '5 वर्ष से कम आयु में स्टंटिंग 8% से कम' }, bottleneck2026: { en: 'Maternal anaemia in aspirational districts', hi: 'आकांक्षी जिलों में मातृ एनीमिया' } },
      { code: '3.4', minute: ':40', title: { en: 'Generic & Biologics Sovereignty', hi: 'जेनेरिक व बायोलॉजिक्स संप्रभुता' }, target2047: { en: '90% domestic API & next-gen vaccine self-reliance', hi: '90% घरेलू API व वैक्सीन आत्मनिर्भरता' }, bottleneck2026: { en: 'Import reliance on specialty fermentation APIs', hi: 'विशेष API पर आयात निर्भरता' } },
      { code: '3.5', minute: ':50', title: { en: 'Mental Health Tele-MANAS', hi: 'मानसिक स्वास्थ्य टेली-मानस' }, target2047: { en: '24x7 regional-language counselling in all districts', hi: 'सभी जिलों में 24x7 क्षेत्रीय भाषा परामर्श' }, bottleneck2026: { en: 'Community stigma & trained clinical psychologists', hi: 'सामाजिक संकोच व प्रशिक्षित मनोवैज्ञानिकों की कमी' } },
      { code: '3.6', minute: ':60', title: { en: 'Medical Workforce Expansion', hi: 'चिकित्सा कार्यबल विस्तार' }, target2047: { en: '2.5+ doctors & 5 nurses per 1,000 citizens', hi: 'प्रति 1,000 नागरिक 2.5+ डॉक्टर व 5 नर्सें' }, bottleneck2026: { en: 'Uneven urban-rural doctor distribution', hi: 'शहरी-ग्रामीण डॉक्टर वितरण असमानता' } },
    ],
  },
  {
    hour: 4,
    hourLabel: '04:00',
    shortTitle: { en: 'Agritech', hi: 'कृषि-टेक' },
    title: { en: 'Agritech & Kisan Prosperity', hi: 'कृषि-टेक व किसान समृद्धि' },
    source: 'Ministry of Agriculture & ICAR 2026',
    executivePitch: {
      en: 'Elevate farmer net incomes through climate-resilient seeds, solar micro-cold chains, precision drone telemetry, and direct FPO global exports.',
      hi: 'जलवायु-सहिष्णु बीज, सौर कोल्ड-चेन, ड्रोन तकनीक और प्रत्यक्ष FPO निर्यात से किसानों की शुद्ध आय में वृद्धि।',
    },
    reality2026Label: { en: 'Post-Harvest Loss (2026)', hi: 'फसल-उपरांत नुकसान (2026)' },
    reality2026Value: '~14–18% Perishables',
    target2047Label: { en: '2047 Value Realization', hi: '2047 कृषि मूल्य लक्ष्य' },
    target2047Value: '<3% Loss · 3x Farm Income',
    subPillars: [
      { code: '4.1', minute: ':10', title: { en: 'Solar Micro-Cold Storage', hi: 'सौर माइक्रो कोल्ड-स्टोरेज' }, target2047: { en: 'Village-level 5-MT solar cold rooms at every FPO', hi: 'प्रत्येक FPO पर ग्राम-स्तरीय सौर कोल्ड रूम' }, bottleneck2026: { en: 'Upfront rural cold-chain capital cost', hi: 'ग्रामीण कोल्ड-चेन की प्रारंभिक पूंजी लागत' } },
      { code: '4.2', minute: ':20', title: { en: 'AgriStack Digital Soil Cards', hi: 'एग्रीस्टैक डिजिटल मृदा कार्ड' }, target2047: { en: 'Real-time satellite & IoT irrigation advisories', hi: 'रियल-टाइम सैटेलाइट व IoT सिंचाई सलाह' }, bottleneck2026: { en: 'Land record digitization uniformity across states', hi: 'राज्यों में भूमि रिकॉर्ड डिजिटलीकरण समानता' } },
      { code: '4.3', minute: ':30', title: { en: 'Shree Anna & Climate Seeds', hi: 'श्री अन्न व जलवायु-सहिष्णु बीज' }, target2047: { en: 'Heat-tolerant high-yield varieties across 100% acreage', hi: '100% क्षेत्र में ताप-सहिष्णु उन्नत बीज' }, bottleneck2026: { en: 'Seed replacement rates in rain-fed belts', hi: 'वर्षा-आधारित क्षेत्रों में बीज प्रतिस्थापन दर' } },
      { code: '4.4', minute: ':40', title: { en: 'e-NAM & Direct Global Exports', hi: 'ई-नाम व प्रत्यक्ष वैश्विक निर्यात' }, target2047: { en: '$150B+ processed agri & organic exports', hi: '$150B+ प्रसंस्कृत कृषि व जैविक निर्यात' }, bottleneck2026: { en: 'Assaying & grading labs at local mandis', hi: 'स्थानीय मंडियों में ग्रेडिंग लैब की कमी' } },
      { code: '4.5', minute: ':50', title: { en: 'Precision Micro-Irrigation', hi: 'सूक्ष्म सिंचाई प्रणाली' }, target2047: { en: '80%+ drip/sprinkler adoption in water-stressed blocks', hi: 'जल-संकट वाले ब्लॉकों में 80%+ ड्रिप सिंचाई' }, bottleneck2026: { en: 'Groundwater depletion in north-west aquifers', hi: 'उत्तर-पश्चिमी भूजल स्तर में गिरावट' } },
      { code: '4.6', minute: ':60', title: { en: 'Kisan Drone & Bio-Input Hubs', hi: 'किसान ड्रोन व जैव-उर्वरक केंद्र' }, target2047: { en: '50% reduction in chemical fertilizer runoff', hi: 'रासायनिक उर्वरक अपवाह में 50% कमी' }, bottleneck2026: { en: 'Drone operator certification & rural battery charging', hi: 'ग्रामीण ड्रोन प्रशिक्षण व चार्जिंग सुविधा' } },
    ],
  },
  {
    hour: 5,
    hourLabel: '05:00',
    shortTitle: { en: 'Infra', hi: 'अवसंरचना' },
    title: { en: 'Infrastructure & Gati Shakti', hi: 'अवसंरचना व गति शक्ति' },
    source: 'DPIIT PM Gati Shakti & MoRTH 2026',
    executivePitch: {
      en: 'Cut national logistics cost below 7.5% of GDP through GIS-synchronized expressways, dedicated freight corridors, high-speed rail, and regional airports.',
      hi: 'GIS-समन्वित एक्सप्रेसवे, फ्रेट कॉरिडोर, हाई-स्पीड रेल और क्षेत्रीय हवाई अड्डों से लॉजिस्टिक्स लागत को 7.5% जीडीपी से नीचे लाना।',
    },
    reality2026Label: { en: 'Logistics Cost (2026)', hi: 'लॉजिस्टिक्स लागत (2026)' },
    reality2026Value: '~11.5% of GDP',
    target2047Label: { en: '2047 Global Benchmark', hi: '2047 वैश्विक मानक' },
    target2047Value: '<7.5% of GDP',
    subPillars: [
      { code: '5.1', minute: ':10', title: { en: 'Dedicated Freight Corridors', hi: 'डेडिकेटेड फ्रेट कॉरिडोर' }, target2047: { en: '45%+ rail freight modal share', hi: 'रेल माल ढुलाई हिस्सेदारी 45%+' }, bottleneck2026: { en: 'East-West & North-South corridor completion', hi: 'पूर्व-पश्चिम व उत्तर-दक्षिण कॉरिडोर निर्माण' } },
      { code: '5.2', minute: ':20', title: { en: 'High-Speed & Vande Bharat Grid', hi: 'हाई-स्पीड व वंदे भारत नेटवर्क' }, target2047: { en: '7,000+ km high-speed rail linking all metros', hi: 'सभी महानगरों को जोड़ने वाला 7,000+ किमी नेटवर्क' }, bottleneck2026: { en: 'Track fencing & signalling upgrades', hi: 'ट्रैक फेंसिंग व सिग्नलिंग उन्नयन' } },
      { code: '5.3', minute: ':30', title: { en: 'Multi-Modal Logistics Parks', hi: 'मल्टी-मोडल लॉजिस्टिक्स पार्क' }, target2047: { en: '100+ automated MMLPs across industrial zones', hi: 'औद्योगिक क्षेत्रों में 100+ स्वचालित MMLP' }, bottleneck2026: { en: 'State land aggregation timelines', hi: 'भूमि अधिग्रहण समय-सीमा' } },
      { code: '5.4', minute: ':40', title: { en: 'UDAN Regional Aviation', hi: 'उड़ान क्षेत्रीय विमानन' }, target2047: { en: '300+ green net-zero operational airports', hi: '300+ हरित नेट-ज़ीरो हवाई अड्डे' }, bottleneck2026: { en: 'Tier-3 route aircraft availability', hi: 'टियर-3 मार्गों हेतु विमान उपलब्धता' } },
      { code: '5.5', minute: ':50', title: { en: 'Inland Waterways Network', hi: 'अंतर्देशीय जलमार्ग नेटवर्क' }, target2047: { en: '200+ MMT low-carbon river cargo annually', hi: 'वार्षिक 200+ MMT कम-कार्बन नदी माल ढुलाई' }, bottleneck2026: { en: 'Seasonal river draft dredging maintenance', hi: 'मौसमी नदी गहराई व ड्रेजिंग रखरखाव' } },
      { code: '5.6', minute: ':60', title: { en: 'BharatNet Gigabit Fibre', hi: 'भारतनेट गीगाबिट फाइबर' }, target2047: { en: '100% Gram Panchayats on 10 Gbps fibre', hi: '100% ग्राम पंचायतों में 10 Gbps फाइबर' }, bottleneck2026: { en: 'Last-mile fibre uptime in rugged terrain', hi: 'दुर्गम क्षेत्रों में फाइबर अपटाइम' } },
    ],
  },
  {
    hour: 6,
    hourLabel: '06:00',
    shortTitle: { en: 'Green', hi: 'स्वच्छ ऊर्जा' },
    title: { en: 'Green Energy & Climate', hi: 'स्वच्छ ऊर्जा व जलवायु' },
    source: 'CEA July 2026 & MNRE',
    executivePitch: {
      en: 'Scale India from its 300.5 GW non-fossil milestone in 2026 to 1,800+ GW clean power, green hydrogen exports, and climate-resilient cities by 2047.',
      hi: '2026 के 300.5 GW मील के पत्थर से 2047 तक 1,800+ GW स्वच्छ ऊर्जा, ग्रीन हाइड्रोजन निर्यात और जलवायु-सुरक्षित शहर।',
    },
    reality2026Label: { en: 'Non-Fossil Capacity (July 2026)', hi: 'स्वच्छ ऊर्जा क्षमता (जुलाई 2026)' },
    reality2026Value: '300.5 GW Installed',
    target2047Label: { en: '2047 Clean Power Target', hi: '2047 स्वच्छ ऊर्जा लक्ष्य' },
    target2047Value: '1,800+ GW Non-Fossil',
    subPillars: [
      { code: '6.1', minute: ':10', title: { en: 'Utility & Rooftop Solar Scale', hi: 'यूटिलिटी व रूफटॉप सौर विस्तार' }, target2047: { en: '1,100+ GW solar across parks & 100M homes', hi: 'पार्कों व 10 करोड़ घरों में 1,100+ GW सौर ऊर्जा' }, bottleneck2026: { en: 'Domestic polysilicon wafer manufacturing', hi: 'घरेलू पॉलीसिलिकॉन वेफर निर्माण' } },
      { code: '6.2', minute: ':20', title: { en: 'National Green Hydrogen Hubs', hi: 'राष्ट्रीय ग्रीन हाइड्रोजन हब' }, target2047: { en: 'Sub-$1.5/kg green hydrogen for steel & shipping', hi: 'स्टील व शिपिंग हेतु $1.5/किग्रा से कम ग्रीन हाइड्रोजन' }, bottleneck2026: { en: 'Electrolyzer cost & renewable round-the-clock power', hi: 'इलेक्ट्रोलाइज़र लागत व चौबीसों घंटे हरित बिजली' } },
      { code: '6.3', minute: ':30', title: { en: 'Grid-Scale Battery & Pumped Hydro', hi: 'बैटरी व पंप्ड हाइड्रो भंडारण' }, target2047: { en: '400+ GWh energy storage balancing peak demand', hi: 'पीक मांग संतुलन हेतु 400+ GWh ऊर्जा भंडारण' }, bottleneck2026: { en: 'DISCOM financial viability & smart metering', hi: 'डिस्कॉम वित्तीय स्थिति व स्मार्ट मीटरिंग' } },
      { code: '6.4', minute: ':40', title: { en: 'Small Modular Nuclear Reactors', hi: 'लघु मॉड्यूलर परमाणु रिएक्टर' }, target2047: { en: '100 GW baseload clean nuclear capacity', hi: '100 GW बेसलोड स्वच्छ परमाणु क्षमता' }, bottleneck2026: { en: 'SMR licensing & private investment frameworks', hi: 'SMR लाइसेंसिंग व निजी निवेश ढांचा' } },
      { code: '6.5', minute: ':50', title: { en: 'Circular Waste & Clean Rivers', hi: 'चक्रीय कचरा व स्वच्छ नदियां' }, target2047: { en: '100% urban sewage treatment & zero landfills', hi: '100% शहरी सीवेज उपचार व शून्य लैंडफिल' }, bottleneck2026: { en: 'Municipal waste segregation compliance', hi: 'नगर पालिका कचरा पृथक्करण अनुपालन' } },
      { code: '6.6', minute: ':60', title: { en: 'Carbon Markets & Green Forests', hi: 'कार्बन बाज़ार व हरित वन क्षेत्र' }, target2047: { en: '33%+ forest & tree cover with verified carbon credits', hi: 'सत्यापित कार्बन क्रेडिट के साथ 33%+ वन आवरण' }, bottleneck2026: { en: 'MRV verification for smallholder agroforestry', hi: 'लघु कृषि-वानिकी हेतु सत्यापन तंत्र' } },
    ],
  },
  {
    hour: 7,
    hourLabel: '07:00',
    shortTitle: { en: 'AI & Chips', hi: 'AI व चिप्स' },
    title: { en: 'AI, Semicon & Deep-Tech', hi: 'AI, सेमीकंडक्टर व डीप-टेक' },
    source: 'MeitY ISM & IndiaAI Mission 2026',
    executivePitch: {
      en: 'Achieve silicon sovereignty, 3.0% GDP R&D spending, and voice-first public AI serving 1.5B citizens across every Indian language.',
      hi: 'सेमीकंडक्टर आत्मनिर्भरता, 3.0% जीडीपी शोध निवेश और सभी भारतीय भाषाओं में 1.5 अरब नागरिकों के लिए वॉइस-फर्स्ट AI।',
    },
    reality2026Label: { en: 'R&D Spend (2026)', hi: 'R&D निवेश (2026)' },
    reality2026Value: '0.65% of GDP',
    target2047Label: { en: '2047 Deep-Tech Target', hi: '2047 डीप-टेक लक्ष्य' },
    target2047Value: '3.00% GDP · Sovereign Fabs',
    subPillars: [
      { code: '7.1', minute: ':10', title: { en: 'Domestic Semiconductor Fabs', hi: 'घरेलू सेमीकंडक्टर फैब' }, target2047: { en: 'Leading-edge logic, power & OSAT export share >10%', hi: 'लॉजिक व OSAT निर्यात में 10%+ वैश्विक हिस्सा' }, bottleneck2026: { en: 'Ultra-pure chemicals & fab talent pipeline', hi: 'अति-शुद्ध रसायन व फैब विशेषज्ञ आपूर्ति' } },
      { code: '7.2', minute: ':20', title: { en: 'IndiaAI Sovereign Compute', hi: 'इंडियाAI संप्रभु कंप्यूट' }, target2047: { en: 'Affordable national GPU cloud for startups & labs', hi: 'स्टार्टअप्स व लैब हेतु सुलभ राष्ट्रीय GPU क्लाउड' }, bottleneck2026: { en: 'High-efficiency green data center cooling', hi: 'हरित डेटा सेंटर ऊर्जा व कूलिंग क्षमता' } },
      { code: '7.3', minute: ':30', title: { en: 'Voice-First Multilingual AI', hi: 'वॉइस-फर्स्ट बहुभाषी AI' }, target2047: { en: 'Real-time voice governance in 22+ scheduled languages', hi: '22+ भाषाओं में रियल-टाइम वॉइस शासन सेवा' }, bottleneck2026: { en: 'Dialect datasets for tribal & rural speech', hi: 'ग्रामीण व जनजातीय बोलियों का डेटासेट' } },
      { code: '7.4', minute: ':40', title: { en: 'RISC-V & Open Silicon Design', hi: 'RISC-V व ओपन सिलिकॉन डिज़ाइन' }, target2047: { en: 'Indian-designed processors powering IoT & telecom', hi: 'IoT व टेलीकॉम में भारतीय डिज़ाइन प्रोसेसर' }, bottleneck2026: { en: 'EDA tool access at public engineering colleges', hi: 'सार्वजनिक कॉलेजों में EDA टूल पहुंच' } },
      { code: '7.5', minute: ':50', title: { en: 'Quantum & 6G Communications', hi: 'क्वांटम व 6G संचार' }, target2047: { en: '10%+ global 6G SEP patents & quantum-safe banking', hi: '10%+ वैश्विक 6G पेटेंट व क्वांटम-सुरक्षित बैंकिंग' }, bottleneck2026: { en: 'Cryogenic hardware prototyping supply chain', hi: 'क्रायोजेनिक हार्डवेयर प्रोटोटाइप आपूर्ति' } },
      { code: '7.6', minute: ':60', title: { en: 'India Stack 2.0 Global DPI', hi: 'इंडिया स्टैक 2.0 वैश्विक DPI' }, target2047: { en: 'Consent-first open protocols exported to 80+ nations', hi: '80+ देशों में सहमति-आधारित ओपन DPI मानक' }, bottleneck2026: { en: 'Cross-border privacy & cyber resilience audits', hi: 'सीमा-पार गोपनीयता व साइबर सुरक्षा ऑडिट' } },
    ],
  },
  {
    hour: 8,
    hourLabel: '08:00',
    shortTitle: { en: 'Nari Shakti', hi: 'नारी शक्ति' },
    title: { en: 'Nari Shakti & Inclusion', hi: 'नारी शक्ति व समावेशन' },
    source: 'MoSPI PLFS 2025/2026 & MWCD',
    executivePitch: {
      en: 'Lift Female Labour Force Participation from 40.0% to 55.0%+ through care infrastructure, safe urban mobility, and direct women-enterprise capital.',
      hi: 'देखभाल ढांचे, सुरक्षित परिवहन और महिला उद्यम पूंजी के जरिए महिला श्रम भागीदारी को 40.0% से 55.0%+ तक बढ़ाना।',
    },
    reality2026Label: { en: 'Female LFPR (2026)', hi: 'महिला LFPR (2026)' },
    reality2026Value: '40.0% Usual Status',
    target2047Label: { en: '2047 Parity Target', hi: '2047 समता लक्ष्य' },
    target2047Value: '55.0%+ Workforce Parity',
    subPillars: [
      { code: '8.1', minute: ':10', title: { en: 'Palna Crèche Infrastructure', hi: 'पालना क्रेच अवसंरचना' }, target2047: { en: 'Co-funded quality childcare in every SEZ & ward', hi: 'प्रत्येक SEZ व वार्ड में गुणवत्तापूर्ण शिशु देखभाल' }, bottleneck2026: { en: 'Unorganized sector childcare coverage', hi: 'असंगठित क्षेत्र में शिशु देखभाल अभाव' } },
      { code: '8.2', minute: ':20', title: { en: 'Lakhpati Didi to Tech Enterprises', hi: 'लखपति दीदी से टेक उद्यम' }, target2047: { en: '50M+ women-led formalized MSMEs & SHG brands', hi: '5 करोड़+ महिला-नेतृत्व औपचारिक MSME ब्रांड' }, bottleneck2026: { en: 'Working capital scaling beyond micro-loans', hi: 'माइक्रो-लोन से आगे कार्यशील पूंजी विस्तार' } },
      { code: '8.3', minute: ':30', title: { en: 'Safe Night Transit Corridors', hi: 'सुरक्षित रात्रि परिवहन गलियारे' }, target2047: { en: '100% lit, CCTV-verified last-mile public transit', hi: '100% सुरक्षित व निगरानी युक्त लास्ट-माइल परिवहन' }, bottleneck2026: { en: 'Suburban evening bus frequency in Tier-2 cities', hi: 'टियर-2 शहरों में संध्या बस आवृत्ति' } },
      { code: '8.4', minute: ':40', title: { en: 'Women in STEM & Deep-Tech', hi: 'STEM व डीप-टेक में महिलाएं' }, target2047: { en: '45%+ women representation in R&D leadership', hi: 'R&D नेतृत्व में 45%+ महिला प्रतिनिधित्व' }, bottleneck2026: { en: 'Mid-career retention after maternity breaks', hi: 'मातृत्व अवकाश के बाद करियर वापसी सहयोग' } },
      { code: '8.5', minute: ':50', title: { en: 'Property & Financial Autonomy', hi: 'संपत्ति व वित्तीय स्वायत्तता' }, target2047: { en: 'Equal digital asset & credit score ownership', hi: 'समान डिजिटल संपत्ति व क्रेडिट स्कोर स्वामित्व' }, bottleneck2026: { en: 'Joint land titling awareness in rural blocks', hi: 'ग्रामीण क्षेत्रों में संयुक्त भूमि स्वामित्व जागरूकता' } },
      { code: '8.6', minute: ':60', title: { en: 'Nari Shakti Civic Leadership', hi: 'नारी शक्ति नागरिक नेतृत्व' }, target2047: { en: '33%+ representation across Parliament & assemblies', hi: 'संसद व विधानसभाओं में 33%+ प्रतिनिधित्व' }, bottleneck2026: { en: 'Local municipal leadership training access', hi: 'स्थानीय नगर नेतृत्व प्रशिक्षण तक पहुंच' } },
    ],
  },
  {
    hour: 9,
    hourLabel: '09:00',
    shortTitle: { en: 'Justice', hi: 'न्याय' },
    title: { en: 'Justice & Transparent Governance', hi: 'न्याय व पारदर्शी शासन' },
    source: 'e-Courts Phase III & DARPG 2026',
    executivePitch: {
      en: 'Deliver swift, paperless justice and transparent municipal governance through e-Courts AI scheduling, QR-audited public works, and outcome-tracked budgets.',
      hi: 'ई-कोर्ट AI शेड्यूलिंग, QR-ऑडिटेड सार्वजनिक कार्यों और परिणाम-आधारित बजट से त्वरित न्याय व पारदर्शी शासन।',
    },
    reality2026Label: { en: 'District Court Digitization', hi: 'जिला न्यायालय डिजिटलीकरण' },
    reality2026Value: 'Phase III Rollout (2026)',
    target2047Label: { en: '2047 Justice Resolution', hi: '2047 न्याय निपटान लक्ष्य' },
    target2047Value: '<12 Months Avg Case Closure',
    subPillars: [
      { code: '9.1', minute: ':10', title: { en: 'Paperless e-Courts & AI Transcription', hi: 'पेपरलेस ई-कोर्ट व AI प्रतिलेखन' }, target2047: { en: '100% digital case dockets with instant translation', hi: 'तत्काल अनुवाद के साथ 100% डिजिटल केस फाइल' }, bottleneck2026: { en: 'Legacy paper archive scanning backlog', hi: 'पुराने कागजी अभिलेखों की स्कैनिंग लंबितता' } },
      { code: '9.2', minute: ':20', title: { en: 'Online Dispute Resolution (ODR)', hi: 'ऑनलाइन विवाद समाधान (ODR)' }, target2047: { en: '70% commercial & traffic disputes settled in <30 days', hi: '70% वाणिज्यिक विवाद 30 दिनों से कम में हल' }, bottleneck2026: { en: 'MSME awareness of binding mediation portals', hi: 'मध्यस्थता पोर्टल के प्रति MSME जागरूकता' } },
      { code: '9.3', minute: ':30', title: { en: 'Ward-Level QR Public Audits', hi: 'वार्ड-स्तरीय QR सार्वजनिक ऑडिट' }, target2047: { en: 'Every road & civic contract geo-tagged for citizen signoff', hi: 'प्रत्येक सड़क व कार्य का जियो-टैग्ड नागरिक ऑडिट' }, bottleneck2026: { en: 'Municipal open-data standardization', hi: 'नगर पालिका ओपन-डेटा मानकीकरण' } },
      { code: '9.4', minute: ':40', title: { en: 'Judicial Capacity Expansion', hi: 'न्यायिक क्षमता विस्तार' }, target2047: { en: '50+ judges per million citizens nationwide', hi: 'प्रति दस लाख नागरिक 50+ न्यायाधीश' }, bottleneck2026: { en: 'Courtroom infrastructure & vacancy fill speed', hi: 'न्यायालय ढांचा व रिक्ति भरने की गति' } },
      { code: '9.5', minute: ':50', title: { en: 'Proactive Entitlement Delivery', hi: 'सक्रिय कल्याण सेवा वितरण' }, target2047: { en: 'Zero-application automatic citizen benefit triggers', hi: 'बिना आवेदन स्वचालित नागरिक लाभ वितरण' }, bottleneck2026: { en: 'Inter-departmental registry sync', hi: 'अंतर-विभागीय रजिस्ट्री समन्वय' } },
      { code: '9.6', minute: ':60', title: { en: 'Smart Forensic Policing', hi: 'स्मार्ट फॉरेंसिक पुलिसिंग' }, target2047: { en: '100% mandatory digital forensic evidence chain', hi: '100% अनिवार्य डिजिटल फॉरेंसिक साक्ष्य श्रृंखला' }, bottleneck2026: { en: 'District forensic lab turnaround times', hi: 'जिला फॉरेंसिक लैब जांच समय' } },
    ],
  },
  {
    hour: 10,
    hourLabel: '10:00',
    shortTitle: { en: 'Cities', hi: 'स्मार्ट शहर' },
    title: { en: 'Smart Cities & Clean Mobility', hi: 'स्मार्ट शहर व स्वच्छ गतिशीलता' },
    source: 'MoHUA & NITI Aayog Urban 2047',
    executivePitch: {
      en: 'Build walkable, transit-oriented Tier-2 and Tier-3 growth cities with 100% electric public buses, sponge-city flood resilience, and affordable housing.',
      hi: '100% इलेक्ट्रिक सार्वजनिक बसों, स्पंज-सिटी बाढ़ सुरक्षा और किफायती आवास वाले टियर-2 व टियर-3 विकासशील शहर।',
    },
    reality2026Label: { en: 'Urban Population Share (2026)', hi: 'शहरी जनसंख्या हिस्सा (2026)' },
    reality2026Value: '~37% Urbanized',
    target2047Label: { en: '2047 Sustainable Urbanization', hi: '2047 सतत शहरीकरण' },
    target2047Value: '52% Urban · 85% EV Transit',
    subPillars: [
      { code: '10.1', minute: ':10', title: { en: 'Electric Metro & Bus Rapid Transit', hi: 'इलेक्ट्रिक मेट्रो व बस रैपिड ट्रांजिट' }, target2047: { en: '50+ metro cities & 100% zero-emission bus fleets', hi: '50+ मेट्रो शहर व 100% शून्य-उत्सर्जन बसें' }, bottleneck2026: { en: 'Unified ticketing across metro, bus & auto', hi: 'मेट्रो, बस व ऑटो हेतु एकीकृत टिकट प्रणाली' } },
      { code: '10.2', minute: ':20', title: { en: 'Sponge-City Drainage & Lakes', hi: 'स्पंज-सिटी जल निकासी व झीलें' }, target2047: { en: '100% restored urban wetlands & flood-proof drains', hi: '100% पुनर्जीवित शहरी झीलें व बाढ़-रोधी नाले' }, bottleneck2026: { en: 'Encroachment on natural stormwater basins', hi: 'प्राकृतिक जल निकासी मार्गों पर अतिक्रमण' } },
      { code: '10.3', minute: ':30', title: { en: 'Clean Air & AQI < 40 Cities', hi: 'स्वच्छ वायु व AQI < 40 शहर' }, target2047: { en: 'PM2.5 compliance across all 131 non-attainment cities', hi: 'सभी 131 शहरों में स्वच्छ PM2.5 मानक' }, bottleneck2026: { en: 'Construction dust & crop residue bio-pelleting', hi: 'निर्माण धूल व पराली बायो-पैलेट उपयोग' } },
      { code: '10.4', minute: ':40', title: { en: 'Tier-2 Satellite Growth Magnets', hi: 'टियर-2 सैटेलाइट विकास केंद्र' }, target2047: { en: '100+ new planned economic townships easing megacities', hi: 'महानगरों का दबाव कम करने वाले 100+ नियोजित शहर' }, bottleneck2026: { en: 'Municipal bond financing capacity', hi: 'नगर पालिका बॉन्ड वित्तपोषण क्षमता' } },
      { code: '10.5', minute: ':50', title: { en: '24x7 Metered Clean Tap Water', hi: '24x7 स्वच्छ नल जल आपूर्ति' }, target2047: { en: 'Drink-from-tap standards & 50% greywater reuse', hi: 'सीधे पीने योग्य नल जल व 50% ग्रेवाटर पुनर्चक्रण' }, bottleneck2026: { en: 'Non-revenue water pipeline leakage (~35%)', hi: 'पाइपलाइन जल रिसाव (~35%)' } },
      { code: '10.6', minute: ':60', title: { en: 'Cool-Roof & Net-Zero Housing', hi: 'कूल-रूफ व नेट-ज़ीरो आवास' }, target2047: { en: 'Heatwave-resilient passive cooling codes nationwide', hi: 'राष्ट्रव्यापी हीटवेव-रोधी हरित भवन मानक' }, bottleneck2026: { en: 'Building code enforcement in fast-growing suburbs', hi: 'नए उपनगरों में भवन संहिता अनुपालन' } },
    ],
  },
  {
    hour: 11,
    hourLabel: '11:00',
    shortTitle: { en: 'Defence', hi: 'रक्षा व अंतरिक्ष' },
    title: { en: 'Defence & Space Sovereignty', hi: 'रक्षा व अंतरिक्ष संप्रभुता' },
    source: 'MoD iDEX & IN-SPACe 2026',
    executivePitch: {
      en: 'Achieve 90%+ indigenous defence production, $50B+ aerospace exports, Bharatiya Antariksh Station operations, and a human lunar landing by 2040.',
      hi: '90%+ स्वदेशी रक्षा उत्पादन, $50B+ एयरोस्पेस निर्यात, भारतीय अंतरिक्ष स्टेशन और 2040 तक मानव चंद्र मिशन।',
    },
    reality2026Label: { en: 'Indigenous Production (2026)', hi: 'स्वदेशी रक्षा उत्पादन (2026)' },
    reality2026Value: '₹1.5L Cr+ · 250+ Space Startups',
    target2047Label: { en: '2047 Strategic Target', hi: '2047 रणनीतिक लक्ष्य' },
    target2047Value: 'Top-5 Exporter · 10% Space Economy',
    subPillars: [
      { code: '11.1', minute: ':10', title: { en: 'iDEX Deep-Tech Defence Startups', hi: 'iDEX डीप-टेक रक्षा स्टार्टअप्स' }, target2047: { en: 'Autonomous swarm drones & sovereign aero-engines', hi: 'स्वदेशी स्वायत्त ड्रोन व एयरो-इंजन निर्माण' }, bottleneck2026: { en: 'Jet engine metallurgy testing infrastructure', hi: 'जेट इंजन धातु विज्ञान परीक्षण सुविधाएं' } },
      { code: '11.2', minute: ':20', title: { en: 'Bharatiya Antariksh Station', hi: 'भारतीय अंतरिक्ष स्टेशन (BAS)' }, target2047: { en: 'Permanent microgravity research station & lunar base', hi: 'स्थायी सूक्ष्म-गुरुत्व शोध स्टेशन व चंद्र मिशन' }, bottleneck2026: { en: 'Heavy-lift reusable rocket cadence', hi: 'पुन: प्रयोज्य भारी रॉकेट प्रक्षेपण आवृत्ति' } },
      { code: '11.3', minute: ':30', title: { en: 'Private Small-Sat Launch Hubs', hi: 'निजी लघु-उपग्रह प्रक्षेपण केंद्र' }, target2047: { en: '$44B+ commercial space economy & launch exports', hi: '$44B+ वाणिज्यिक अंतरिक्ष अर्थव्यवस्था' }, bottleneck2026: { en: 'Global orbital insurance & payload standards', hi: 'वैश्विक कक्षीय बीमा व पेलोड मानक' } },
      { code: '11.4', minute: ':40', title: { en: 'Cyber & Critical Grid Defence', hi: 'साइबर व महत्वपूर्ण ग्रिड रक्षा' }, target2047: { en: 'Zero-trust sovereign defence for power & UPI rails', hi: 'पावर व UPI नेटवर्क हेतु ज़ीरो-ट्रस्ट सुरक्षा' }, bottleneck2026: { en: 'Certified cybersecurity analysts for utilities', hi: 'यूटिलिटी हेतु प्रमाणित साइबर विशेषज्ञों की कमी' } },
      { code: '11.5', minute: ':50', title: { en: 'NavIC Global Precision Positioning', hi: 'नाविक वैश्विक नेविगेशन प्रणाली' }, target2047: { en: 'Sub-meter precision across South Asia & Indian Ocean', hi: 'दक्षिण एशिया व हिंद महासागर में सटीक नेविगेशन' }, bottleneck2026: { en: 'Consumer chipset default L1 band integration', hi: 'उपभोक्ता चिपसेट में L1 बैंड एकीकरण' } },
      { code: '11.6', minute: ':60', title: { en: 'Maritime Domain Awareness', hi: 'समुद्री क्षेत्र जागरूकता' }, target2047: { en: '100% indigenous naval fleet & subsea sensor mesh', hi: '100% स्वदेशी नौसेना बेड़ा व समुद्री सेंसर ग्रिड' }, bottleneck2026: { en: 'Shipyard dry-dock throughput expansion', hi: 'शिपयार्ड ड्राई-डॉक क्षमता विस्तार' } },
    ],
  },
  {
    hour: 12,
    hourLabel: '12:00',
    shortTitle: { en: 'Culture', hi: 'संस्कृति' },
    title: { en: 'Culture, Heritage & Creative Economy', hi: 'संस्कृति, विरासत व रचनात्मक अर्थव्यवस्था' },
    source: 'Ministry of Culture & Tourism 2047',
    executivePitch: {
      en: 'Position India as a global cultural and creative economy powerhouse—preserving living heritage, regional languages, artisan livelihoods, and sustainable tourism.',
      hi: 'जीवंत विरासत, क्षेत्रीय भाषाओं, कारीगर आजीविका और सतत पर्यटन के साथ भारत को वैश्विक रचनात्मक केंद्र बनाना।',
    },
    reality2026Label: { en: 'UNESCO & Creative Share (2026)', hi: 'विरासत व रचनात्मक हिस्सा (2026)' },
    reality2026Value: '44+ UNESCO Sites · $35B Creative',
    target2047Label: { en: '2047 Cultural Economy', hi: '2047 सांस्कृतिक अर्थव्यवस्था' },
    target2047Value: '100M+ Visitors · $250B Creative',
    subPillars: [
      { code: '12.1', minute: ':10', title: { en: 'GI-Tagged Artisan Digital Brands', hi: 'GI-टैग कारीगर डिजिटल ब्रांड' }, target2047: { en: 'Direct global D2C export for 10M+ craft clusters', hi: '1 करोड़+ शिल्प समूहों का प्रत्यक्ष वैश्विक निर्यात' }, bottleneck2026: { en: 'Export packaging & GI anti-counterfeit tracing', hi: 'निर्यात पैकेजिंग व नकली उत्पाद रोकथाम' } },
      { code: '12.2', minute: ':20', title: { en: 'Digital Manuscript & Heritage Twin', hi: 'डिजिटल पांडुलिपि व विरासत संरक्षण' }, target2047: { en: '3D LiDAR twins & open archives for 10,000+ monuments', hi: '10,000+ स्मारकों का 3D डिजिटल अभिलेखागार' }, bottleneck2026: { en: 'Conservation funding for state-level heritage', hi: 'राज्य-स्तरीय स्मारक संरक्षण संसाधन' } },
      { code: '12.3', minute: ':30', title: { en: 'AVGC-XR & Storytelling Exports', hi: 'AVGC-XR व कहानी-कथन निर्यात' }, target2047: { en: '2M+ high-skill jobs in animation, gaming & cinema', hi: 'एनीमेशन, गेमिंग व सिनेमा में 20 लाख+ रोजगार' }, bottleneck2026: { en: 'Original Indian IP financing vs outsourcing', hi: 'मौलिक भारतीय IP निर्माण हेतु वित्तपोषण' } },
      { code: '12.4', minute: ':40', title: { en: 'Sustainable Eco & Spiritual Circuits', hi: 'सतत इको व आध्यात्मिक परिपथ' }, target2047: { en: 'Zero-plastic visitor management at all heritage sites', hi: 'सभी विरासत स्थलों पर शून्य-प्लास्टिक पर्यटन' }, bottleneck2026: { en: 'Peak-season crowd carrying capacity planning', hi: 'पीक-सीज़न भीड़ प्रबंधन नियोजन' } },
      { code: '12.5', minute: ':50', title: { en: 'Living Languages & Folk Archives', hi: 'जीवंत भाषाएं व लोक अभिलेख' }, target2047: { en: 'Open voice corpora preserving 700+ dialects', hi: '700+ बोलियों के संरक्षण हेतु ओपन वॉइस संग्रह' }, bottleneck2026: { en: 'Intergenerational transmission of rare dialects', hi: 'दुर्लभ बोलियों का पीढ़ीगत संरक्षण' } },
      { code: '12.6', minute: ':60', title: { en: 'Olympic & Grassroots Sports', hi: 'ओलंपिक व जमीनी खेल संस्कृति' }, target2047: { en: 'Top-5 Olympic medal nation with block-level academies', hi: 'ब्लॉक-स्तरीय अकादमियों के साथ शीर्ष-5 ओलंपिक राष्ट्र' }, bottleneck2026: { en: 'Sports science & nutritionists in district schools', hi: 'जिला विद्यालयों में खेल विज्ञान व पोषण विशेषज्ञ' } },
    ],
  },
];

export const POLICY_BRIEFS: PolicyBrief[] = [
  {
    id: 'nep-2020',
    category: { en: 'Education', hi: 'शिक्षा' },
    subtitle: { en: 'NEP 2020 / 2047', hi: 'NEP 2020 / 2047' },
    title: {
      en: 'National Education Policy & Academic Credit Bank',
      hi: 'राष्ट्रीय शिक्षा नीति व अकादमिक क्रेडिट बैंक',
    },
    impactPitch: {
      en: 'Targets 60%+ Higher Ed GER and 75% industry-certified youth workforce.',
      hi: '60%+ उच्च शिक्षा GER और 75% उद्योग-प्रमाणित युवा कार्यबल का लक्ष्य।',
    },
    summary60s: {
      en: 'Replaces rote 10+2 schooling with a 5+3+3+4 experiential framework, mother-tongue foundational literacy (NIPUN), vocational coding from Grade 6, and a portable Academic Bank of Credits allowing flexible multi-entry modular degrees.',
      hi: 'रटने वाली 10+2 प्रणाली को 5+3+3+4 व्यावहारिक ढांचे, मातृभाषा बुनियादी साक्षरता (निपुण), कक्षा 6 से व्यावसायिक कोडिंग और पोर्टेबल अकादमिक क्रेडिट बैंक से बदलता है।',
    },
    keyDeliverables: [
      { en: 'Universal NIPUN foundational numeracy by Grade 3', hi: 'कक्षा 3 तक सार्वभौमिक निपुण दक्षता' },
      { en: 'Portable Academic Bank of Credits across all HEIs', hi: 'सभी संस्थानों में पोर्टेबल अकादमिक क्रेडिट बैंक' },
      { en: '50% learners exposed to hands-on vocational tracks', hi: '50% विद्यार्थियों को व्यावहारिक व्यावसायिक प्रशिक्षण' },
    ],
    officialPortal: 'https://www.education.gov.in',
  },
  {
    id: 'gati-shakti',
    category: { en: 'Infrastructure', hi: 'अवसंरचना' },
    subtitle: { en: 'Logistics', hi: 'लॉजिस्टिक्स' },
    title: {
      en: 'PM Gati Shakti National Master Plan',
      hi: 'पीएम गति शक्ति राष्ट्रीय मास्टर प्लान',
    },
    impactPitch: {
      en: 'Reduces India’s logistics cost from ~11.5% of GDP to the global best benchmark of <7.5%.',
      hi: 'भारत की लॉजिस्टिक्स लागत को ~11.5% जीडीपी से घटाकर <7.5% के वैश्विक मानक पर लाता है।',
    },
    summary60s: {
      en: 'Unifies 16 central ministries and state departments on a single BISAG-N geospatial GIS layer—synchronizing highways, railways, ports, power lines, and fibre rollouts so projects finish on budget without duplicate digging.',
      hi: '16 केंद्रीय मंत्रालयों व राज्यों को एक GIS मानचित्र पर जोड़ता है ताकि राजमार्ग, रेलवे, बंदरगाह और फाइबर परियोजनाएं बिना देरी और दोहराव के पूरी हों।',
    },
    keyDeliverables: [
      { en: '1,600+ live geospatial data layers across ministries', hi: 'मंत्रालयों में 1,600+ लाइव जियोस्पेशियल परतें' },
      { en: 'Multi-modal freight parks cutting cargo dwell times', hi: 'कार्गो समय घटाने वाले मल्टी-मोडल लॉजिस्टिक्स पार्क' },
      { en: 'Synchronized last-mile port & industrial corridor rail links', hi: 'बंदरगाह व औद्योगिक कॉरिडोर से प्रत्यक्ष रेल जुड़ाव' },
    ],
    officialPortal: 'https://pmgatishakti.gov.in',
  },
  {
    id: 'ism-indiaai',
    category: { en: 'Deep-Tech', hi: 'डीप-टेक' },
    subtitle: { en: 'Semicon & AI', hi: 'सेमीकॉन व AI' },
    title: {
      en: 'India Semiconductor (ISM) & IndiaAI Missions',
      hi: 'इंडिया सेमीकंडक्टर (ISM) व इंडियाAI मिशन',
    },
    impactPitch: {
      en: 'Establishes sovereign chip manufacturing and voice-first AI governance for 1.5B citizens.',
      hi: '1.5 अरब नागरिकों हेतु स्वदेशी चिप निर्माण और वॉइस-फर्स्ट AI शासन स्थापित करता है।',
    },
    summary60s: {
      en: 'Co-funds domestic silicon fabs, ATMP/OSAT chip packaging plants, and an open national GPU compute grid paired with Bhashini multilingual datasets—enabling startups and public universities to build sovereign AI and chip IPs.',
      hi: 'घरेलू सिलिकॉन फैब, चिप पैकेजिंग प्लांट और भाषिणी डेटासेट के साथ साझा राष्ट्रीय GPU कंप्यूट ग्रिड का सह-वित्तपोषण करता है।',
    },
    keyDeliverables: [
      { en: 'Commercial fabs & OSAT units in Gujarat and Assam', hi: 'गुजरात व असम में वाणिज्यिक फैब व OSAT इकाइयां' },
      { en: 'Subsidized national GPU compute for Indian researchers', hi: 'भारतीय शोधकर्ताओं हेतु सुलभ राष्ट्रीय GPU कंप्यूट' },
      { en: '85,000+ Chips-to-Startup VLSI engineering talent pool', hi: '85,000+ चिप्स-टू-स्टार्टअप VLSI विशेषज्ञ' },
    ],
    officialPortal: 'https://www.ism.gov.in',
  },
  {
    id: 'green-hydrogen',
    category: { en: 'Clean Energy', hi: 'स्वच्छ ऊर्जा' },
    subtitle: { en: '300.5 GW Milestone', hi: '300.5 GW पड़ाव' },
    title: {
      en: 'National Green Hydrogen & 500 GW Clean Power Mission',
      hi: 'राष्ट्रीय ग्रीन हाइड्रोजन व 500 GW स्वच्छ ऊर्जा मिशन',
    },
    impactPitch: {
      en: 'Scales non-fossil power from 300.5 GW (2026) to 500 GW (2030) and 1,800+ GW by 2047.',
      hi: 'गैर-जीवाश्म ऊर्जा को 300.5 GW (2026) से 2030 में 500 GW और 2047 तक 1,800+ GW तक पहुंचाता है।',
    },
    summary60s: {
      en: 'Combines utility solar parks, PM Surya Ghar rooftop solar, domestic electrolyzer incentives, and pumped-hydro grid storage to decarbonize steel, fertilizers, and heavy transport while turning India into a clean-fuel exporter.',
      hi: 'सौर पार्क, पीएम सूर्य घर, घरेलू इलेक्ट्रोलाइज़र प्रोत्साहन और ऊर्जा भंडारण के जरिए स्टील, उर्वरक और परिवहन को कार्बन-मुक्त बनाता है।',
    },
    keyDeliverables: [
      { en: '5 MMT+ annual Green Hydrogen capacity by 2030', hi: '2030 तक 5 MMT+ वार्षिक ग्रीन हाइड्रोजन क्षमता' },
      { en: '10M+ solarized residential rooftops cutting power bills', hi: '1 करोड़+ सौर छतों से बिजली बिल में बचत' },
      { en: 'Inter-state Green Energy Corridors for 24x7 dispatch', hi: '24x7 वितरण हेतु अंतर-राज्यीय हरित ऊर्जा कॉरिडोर' },
    ],
    officialPortal: 'https://mnre.gov.in',
  },
  {
    id: 'abdm-health',
    category: { en: 'Healthcare', hi: 'स्वास्थ्य' },
    subtitle: { en: 'Universal Shield', hi: 'सार्वभौमिक कवच' },
    title: {
      en: 'Ayushman Bharat Digital Mission & Universal Health Shield',
      hi: 'आयुष्मान भारत डिजिटल मिशन व सार्वभौमिक स्वास्थ्य कवच',
    },
    impactPitch: {
      en: 'Cuts out-of-pocket medical spending below 15% and lifts life expectancy toward 79+ years.',
      hi: 'जेब से होने वाले चिकित्सा खर्च को 15% से कम कर जीवन प्रत्याशा को 79+ वर्ष तक ले जाता है।',
    },
    summary60s: {
      en: 'Connects citizens, hospitals, pharmacies, and diagnostics via consent-based ABHA Health IDs and cashless PM-JAY coverage—eliminating repeated tests and enabling preventive AI health screening down to rural sub-centres.',
      hi: 'सहमति-आधारित ABHA हेल्थ आईडी और कैशलेस PM-JAY के जरिए नागरिकों, अस्पतालों व जांच केंद्रों को जोड़ता है।',
    },
    keyDeliverables: [
      { en: 'Consent-based portable ABHA digital health lockers', hi: 'सहमति-आधारित पोर्टेबल ABHA डिजिटल स्वास्थ्य लॉकर' },
      { en: 'e-Sanjeevani tele-consultation at rural Health & Wellness Centres', hi: 'ग्रामीण स्वास्थ्य केंद्रों पर ई-संजीवनी टेली-परामर्श' },
      { en: 'Unified Health Interface (UHI) open protocols for care', hi: 'स्वास्थ्य सेवाओं हेतु ओपन यूएचआई (UHI) प्रोटोकॉल' },
    ],
    officialPortal: 'https://abdm.gov.in',
  },
  {
    id: 'india-stack-dpi',
    category: { en: 'Digital Public Infrastructure', hi: 'डिजिटल जन अवसंरचना' },
    subtitle: { en: 'India Stack 2.0', hi: 'इंडिया स्टैक 2.0' },
    title: {
      en: 'UPI, ONDC, ULI & Consent-First Digital Public Infrastructure',
      hi: 'UPI, ONDC, ULI व सहमति-आधारित डिजिटल जन अवसंरचना',
    },
    impactPitch: {
      en: 'Democratizes instant payments, open e-commerce, and frictionless credit for 1.5B citizens.',
      hi: '1.5 अरब नागरिकों के लिए त्वरित भुगतान, ओपन ई-कॉमर्स और सरल ऋण को सुलभ बनाता है।',
    },
    summary60s: {
      en: 'Extends India’s open-protocol model beyond UPI and Aadhaar to ONDC (unbundling retail monopolies), Account Aggregator, and Unified Lending Interface (ULI)—letting farmers and kirana stores access formal credit in minutes.',
      hi: 'UPI व आधार मॉडल को ONDC, अकाउंट एग्रीगेटर और ULI तक विस्तारित करता है जिससे किसानों व छोटे दुकानदारों को मिनटों में औपचारिक ऋण मिलता है।',
    },
    keyDeliverables: [
      { en: 'Unified Lending Interface (ULI) for instant MSME & farm credit', hi: 'त्वरित MSME व कृषि ऋण हेतु ULI' },
      { en: 'ONDC open commerce onboarding local kiranas & artisans', hi: 'स्थानीय दुकानों व कारीगरों हेतु ONDC ओपन नेटवर्क' },
      { en: 'Privacy-preserving verifiable credentials via DigiLocker', hi: 'डिजिलॉकर द्वारा गोपनीयता-सुरक्षित डिजिटल प्रमाणपत्र' },
    ],
    officialPortal: 'https://www.indiastack.org',
  },
];

export const YOUTH_STORIES: YouthStory[] = [
  {
    id: 'jaipur-cold-rooms',
    category: { en: 'Agritech', hi: 'कृषि-टेक' },
    location: { en: 'Jaipur & Sikar, Rajasthan', hi: 'जयपुर व सीकर, राजस्थान' },
    title: {
      en: 'Solar Micro-Cold Rooms for Millet & Mustard FPOs',
      hi: 'बाजरा व सरसों FPO हेतु सौर माइक्रो कोल्ड-रूम',
    },
    impactMetric: { en: '+28% Farmer Net Realization', hi: '+28% किसान शुद्ध आय वृद्धि' },
    summary: {
      en: 'Student engineers and local FPOs deployed off-grid 5-MT solar-powered cold rooms with automated grading at village collection hubs, cutting post-harvest spoilage from 21% to under 3%.',
      hi: 'छात्र इंजीनियरों और स्थानीय FPO ने ग्राम संग्रह केंद्रों पर 5-MT ऑफ-ग्रिड सौर कोल्ड रूम स्थापित किए, जिससे फसल नुकसान 21% से घटकर 3% से नीचे आ गया।',
    },
    replicationNote: {
      en: 'Open hardware bill-of-materials replicated across 11 FPO clusters via district NABARD micro-grants.',
      hi: 'ओपन हार्डवेयर डिज़ाइन को नाबार्ड अनुदान से 11 अन्य FPO क्लस्टरों में अपनाया गया।',
    },
  },
  {
    id: 'bengaluru-ward-audit',
    category: { en: 'Civic Tech', hi: 'नागरिक तकनीक' },
    location: { en: 'Bengaluru & Mysuru, Karnataka', hi: 'बेंगलुरु व मैसूरु, कर्नाटक' },
    title: {
      en: 'QR-Code Ward Road & Drain Contractor Audit Ledger',
      hi: 'QR-कोड वार्ड सड़क व नाली ठेकेदार ऑडिट लेजर',
    },
    impactMetric: { en: '72-Hour Avg Civic Resolution', hi: '72-घंटे औसत शिकायत निवारण' },
    summary: {
      en: 'A youth civic collective mounted weatherproof QR plaques on newly resurfaced ward roads linking to contractor defect-liability dates, milestone photos, and one-tap resident verification.',
      hi: 'युवा नागरिक समूह ने नई सड़कों पर QR पट्टिकाएं लगाईं जो ठेकेदार की वारंटी अवधि, कार्य फोटो और नागरिक सत्यापन को सीधे जोड़ती हैं।',
    },
    replicationNote: {
      en: 'Adopted by 18 resident welfare wards with open API export for municipal engineers.',
      hi: 'नगर इंजीनियरों हेतु ओपन API के साथ 18 वार्डों द्वारा अपनाया गया।',
    },
  },
  {
    id: 'assam-voice-tutor',
    category: { en: 'EdTech', hi: 'शिक्षा-टेक' },
    location: { en: 'Morigaon & Guwahati, Assam', hi: 'मोरीगांव व गुवाहाटी, असम' },
    title: {
      en: 'Offline Voice-AI STEM Tutor in Regional Languages',
      hi: 'क्षेत्रीय भाषाओं में ऑफलाइन वॉइस-AI STEM ट्यूटर',
    },
    impactMetric: { en: '14,500+ Rural Students Reached', hi: '14,500+ ग्रामीण छात्रों तक पहुंच' },
    summary: {
      en: 'Campus developers quantized open Assamese, Bodo, and Bengali speech models onto low-cost solar tablets so middle-school students practice math and physics interactively without cellular data.',
      hi: 'कैंपस डेवलपर्स ने कम-लागत सौर टैबलेट पर असमिया, बोडो व बांग्ला ऑफलाइन वॉइस मॉडल चलाए जिससे छात्र बिना इंटरनेट गणित व विज्ञान सीखते हैं।',
    },
    replicationNote: {
      en: 'Aligned with NIPUN & NEP Grade 6–8 NCERT competencies; zero recurring cloud cost per school.',
      hi: 'NEP कक्षा 6–8 NCERT मानकों के अनुरूप; प्रति स्कूल शून्य क्लाउड खर्च।',
    },
  },
  {
    id: 'indore-greywater',
    category: { en: 'Clean Water', hi: 'स्वच्छ जल' },
    location: { en: 'Indore & Ujjain, Madhya Pradesh', hi: 'इंदौर व उज्जैन, मध्य प्रदेश' },
    title: {
      en: 'Decentralized Greywater Bio-Filters for Tier-3 Hostels',
      hi: 'टियर-3 हॉस्टलों हेतु विकेंद्रीकृत ग्रेवाटर बायो-फिल्टर',
    },
    impactMetric: { en: '62% Municipal Water Saved', hi: '62% नगर जल की बचत' },
    summary: {
      en: 'Environmental engineering students built modular gravel-and-reed bio-filters with IoT turbidity alerts that recycle hostel washbasin water for landscaping and flushing.',
      hi: 'पर्यावरण इंजीनियरिंग छात्रों ने IoT सेंसर युक्त मॉड्यूलर बायो-फिल्टर बनाए जो हॉस्टल के उपयोग किए जल को बागवानी व फ्लशिंग हेतु पुनर्चक्रित करते हैं।',
    },
    replicationNote: {
      en: 'Payback period under 9 months; open CAD blueprint shared with 30+ college campuses.',
      hi: '9 महीने से कम में लागत वसूली; 30+ कॉलेजों के साथ ओपन डिज़ाइन साझा।',
    },
  },
  {
    id: 'himachal-landslide',
    category: { en: 'Climate Tech', hi: 'जलवायु तकनीक' },
    location: { en: 'Mandi & Shimla, Himachal Pradesh', hi: 'मंडी व शिमला, हिमाचल प्रदेश' },
    title: {
      en: 'Low-Cost LoRaWAN Early Landslide Warning Nodes',
      hi: 'कम-लागत LoRaWAN भूस्खलन पूर्व-चेतावनी नोड्स',
    },
    impactMetric: { en: '14 Mountain Villages Protected', hi: '14 पहाड़ी गांव सुरक्षित' },
    summary: {
      en: 'An IIT-Mandi student team paired soil-moisture and tilt sensors with solar LoRaWAN sirens to alert panchayat volunteers 40+ minutes ahead of monsoon slope failures.',
      hi: 'छात्र टीम ने मृदा-नमी व झुकाव सेंसर को सौर LoRaWAN सायरन से जोड़ा जो मानसून भूस्खलन से 40+ मिनट पहले पंचायतों को सचेत करते हैं।',
    },
    replicationNote: {
      en: 'Costs 1/10th of imported telemetry poles and integrates with district SDMA SMS alerts.',
      hi: 'आयातित उपकरणों के 1/10वें खर्च में तैयार और जिला आपदा SMS से जुड़ा।',
    },
  },
  {
    id: 'varanasi-artisan-ledger',
    category: { en: 'FinTech', hi: 'फिनटेक' },
    location: { en: 'Varanasi & Mirzapur, Uttar Pradesh', hi: 'वाराणसी व मिर्ज़ापुर, उत्तर प्रदेश' },
    title: {
      en: 'Voice Bookkeeping & ONDC Onboarding for Women Artisans',
      hi: 'महिला कारीगरों हेतु वॉइस बहीखाता व ONDC जुड़ाव',
    },
    impactMetric: { en: '3,200+ Artisans Formalized', hi: '3,200+ कारीगर औपचारिक नेटवर्क में' },
    summary: {
      en: 'University fellows built a Hindi/Bhojpuri voice bookkeeping assistant that turns daily loom sales into verifiable ULI cash-flow statements and auto-lists GI-tagged handlooms on ONDC.',
      hi: 'छात्र फेलो ने हिन्दी/भोजपुरी वॉइस बहीखाता बनाया जो दैनिक बिक्री से ULI ऋण-योग्य रिकॉर्ड तैयार करता है और GI हथकरघा को ONDC पर सूचीबद्ध करता है।',
    },
    replicationNote: {
      en: 'Increased average artisan order margins by 34% by removing middlemen markups.',
      hi: 'बिचौलियों को हटाकर कारीगरों के औसत लाभ में 34% वृद्धि।',
    },
  },
];

export const SEED_POLICY_IDEAS: PolicyIdeaItem[] = [
  {
    id: 'seed-1',
    authorId: 'seed-ananya',
    authorName: 'Ananya Verma / अनन्या वर्मा',
    age: 22,
    state: 'Rajasthan',
    pillarCode: '04:00 · Agritech & Kisan',
    pitch: 'Deploy decentralized 5-MT solar cold-storage & automated optical grading units at Gram Panchayats.',
    blueprint: '1. Pool PM-KUSUM solar subsidies with FPO equity for zero-grid village cold rooms. 2. Install low-cost camera graders linked to e-NAM quality certificates. 3. Connect cold-hub inventory directly to ONDC wholesale buyers to cut spoilage below 3%.',
    upvotesCount: 46,
    visibility: 'public',
    isSeed: true,
    createdAtMs: 1763900000000,
  },
  {
    id: 'seed-2',
    authorId: 'seed-rohan',
    authorName: 'Rohan Nair / रोहन नायर',
    age: 24,
    state: 'Karnataka',
    pillarCode: '07:00 · AI & Semicon',
    pitch: 'Create shared cloud-accessible IndiaAI & RISC-V chip design sandboxes for all public university students.',
    blueprint: '1. Provision regional GPU & open-source EDA clusters under IndiaAI & ISM. 2. Issue student compute vouchers tied to Academic Bank of Credits capstone milestones. 3. Sponsor annual multi-project wafer shuttle tape-outs for top 50 student teams.',
    upvotesCount: 39,
    visibility: 'public',
    isSeed: true,
    createdAtMs: 1763850000000,
  },
  {
    id: 'seed-3',
    authorId: 'seed-meera',
    authorName: 'Meera Krishnan / मीरा कृष्णन',
    age: 26,
    state: 'Tamil Nadu',
    pillarCode: '08:00 · Nari Shakti',
    pitch: 'Mandate co-funded Palna micro-crèches and safe-transit shuttles in every SEZ and industrial cluster.',
    blueprint: '1. Co-fund cluster-level accredited childcare using 50% CSR + 50% state industrial park funds. 2. Deploy GPS-tracked EV feeder shuttles synchronized with shift timings. 3. Publish annual cluster-wise female retention scorecards.',
    upvotesCount: 35,
    visibility: 'public',
    isSeed: true,
    createdAtMs: 1763800000000,
  },
  {
    id: 'seed-4',
    authorId: 'seed-devansh',
    authorName: 'Devansh Patel / देवांश पटेल',
    age: 21,
    state: 'Gujarat',
    pillarCode: '06:00 · Green Energy',
    pitch: 'Enable peer-to-peer rooftop solar surplus trading over UPI for residential RWAs and rural microgrids.',
    blueprint: '1. Standardize bidirectional smart meters with open BECKN energy protocols. 2. Settle neighbourhood solar kWh transfers automatically via UPI AutoPay. 3. Reward peak-evening battery discharge to cut DISCOM peak procurement costs.',
    upvotesCount: 29,
    visibility: 'public',
    isSeed: true,
    createdAtMs: 1763750000000,
  },
];

export const UI_COPY = {
  brandSub: { en: 'The Next Era · Viksit Bharat 2047', hi: 'द नेक्स्ट एरा · विकसित भारत 2047' },
  nav: {
    home: { en: 'Home', hi: 'होम' },
    data: { en: '2047 Data', hi: '2047 आंकड़े' },
    clock: { en: '12 Pillars', hi: '12 स्तंभ' },
    pledge: { en: 'Pledge', hi: 'प्रतिज्ञा' },
    explore: { en: 'Explore', hi: 'अन्वेषण' },
  },
  auth: {
    signIn: { en: 'Sign In', hi: 'साइन इन' },
    signOut: { en: 'Sign Out', hi: 'साइन आउट' },
    syncNote: { en: 'Sign in with Google to sync pledges, votes & bookmarks.', hi: 'प्रतिज्ञा, वोट व बुकमार्क सहेजने हेतु Google से साइन इन करें।' },
  },
  home: {
    eyebrow: { en: 'India @ 100 · Civic Transformation Charter', hi: 'भारत @ 100 · नागरिक परिवर्तन चार्टर' },
    headlinePrefix: { en: 'India @ 100:', hi: 'भारत @ 100:' },
    headlineAccent: { en: 'Bold Vision, Collective Resolve.', hi: 'सशक्त विज़न, सामूहिक संकल्प।' },
    subcopy: {
      en: 'A clean, fact-checked bilingual civic platform tracking India’s 21-year leap from $4.06T (2026) to a $30T+ developed civilization by August 15, 2047.',
      hi: 'भारत को $4.06 ट्रिलियन (2026) से 15 अगस्त 2047 तक $30+ ट्रिलियन विकसित राष्ट्र बनाने की यात्रा को प्रमाणित आंकड़ों के साथ ट्रैक करने वाला द्विभाषी मंच।',
    },
    countdownLabel: { en: 'Live Countdown to August 15, 2047', hi: '15 अगस्त 2047 तक लाइव काउंटडाउन' },
    countdownTarget: { en: 'Target: 2047', hi: 'लक्ष्य: 2047' },
    days: { en: 'Days', hi: 'दिन' },
    hours: { en: 'Hours', hi: 'घंटे' },
    mins: { en: 'Mins', hi: 'मिनट' },
    secs: { en: 'Secs', hi: 'सेकंड' },
    primaryCta: { en: 'Take 2047 Pledge', hi: '2047 प्रतिज्ञा लें' },
    secondaryCta: { en: 'Explore 5-Point Manifesto', hi: '5-सूत्रीय घोषणापत्र देखें' },
    tabVision: { en: 'Vision & Summary', hi: 'विज़न व सारांश' },
    tabManifesto: { en: '5-Point Manifesto', hi: '5-सूत्रीय घोषणापत्र' },
  },
  data: {
    eyebrow: { en: 'Verified National Benchmarks · 2026–2047', hi: 'प्रमाणित राष्ट्रीय मानक · 2026–2047' },
    title: { en: '2026 Baseline vs. 2047 Centenary Goal', hi: '2026 आधार बनाम 2047 शताब्दी लक्ष्य' },
    subtitle: {
      en: 'Compare verified 2026 baselines against intermediate milestones and 2047 developed-nation benchmarks, plus explore the 6-zone regional growth corridors.',
      hi: 'प्रमाणित 2026 आधार की तुलना मध्यवर्ती पड़ावों और 2047 विकसित राष्ट्र लक्ष्यों से करें, तथा 6-ज़ोन क्षेत्रीय आर्थिक गलियारों को देखें।',
    },
    viewVertical: { en: 'Grouped Bars', hi: 'ग्रुप्ड बार' },
    viewHorizontal: { en: 'Detailed Cards', hi: 'विस्तृत कार्ड' },
    viewTrajectory: { en: 'Single Trajectory', hi: 'एकल ग्राफ' },
    heatmapTitle: { en: '6-Zone Regional Economic Heatmap', hi: '6-ज़ोन क्षेत्रीय आर्थिक हीटमैप' },
    heatmapSub: { en: 'State & sector growth corridors powering India @ 100', hi: 'भारत @ 100 को गति देने वाले राज्य व क्षेत्रीय गलियारे' },
  },
  clock: {
    eyebrow: { en: 'Synchronized 12-Pillar Civic Architecture', hi: 'समन्वित 12-स्तंभ नागरिक ढांचा' },
    title: { en: '12-Pillar Wall Clock', hi: '12-स्तंभ दीवार घड़ी' },
    subtitle: {
      en: 'Hour Hand selects the National Pillar (12). Minute Hand spotlights each Sub-Pillar (72 total). Click any node on the dial or quick-jump below.',
      hi: 'घंटे की सुई मुख्य स्तंभ (12) और मिनट की सुई उप-स्तंभ (कुल 72) दिखाती है। किसी भी बिंदु पर क्लिक करें।',
    },
    viewAllSub: { en: 'View All 6 Sub-Pillars', hi: 'सभी 6 उप-स्तंभ देखें' },
    hideAllSub: { en: 'Hide All 6 Sub-Pillars', hi: '6 उप-स्तंभ छिपाएं' },
    submitForPillar: { en: 'Submit Idea for Pillar', hi: 'इस स्तंभ हेतु सुझाव दें' },
  },
  pledge: {
    eyebrow: { en: 'Jan Bhagidari · Action & Community', hi: 'जन भागीदारी · प्रतिज्ञा व सुझाव' },
    title: { en: 'Viksit Bharat Digital Pledge & Policy Leaderboard', hi: 'विकसित भारत डिजिटल प्रतिज्ञा व नीति लीडरबोर्ड' },
    subtitle: {
      en: 'Generate and download your official India @ 100 Changemaker Certificate, save it to your account, or upvote and submit grassroots 2047 policy blueprints.',
      hi: 'अपना आधिकारिक भारत @ 100 चेंजमेकर प्रमाणपत्र बनाएं व डाउनलोड करें, और समुदाय के 2047 नीति सुझावों पर वोट या योगदान करें।',
    },
    downloadPng: { en: 'Download PNG', hi: 'PNG डाउनलोड करें' },
    saveCloud: { en: 'Save Pledge', hi: 'प्रतिज्ञा सहेजें' },
    submitIdea: { en: 'Submit Policy Idea', hi: 'नीति सुझाव जोड़ें' },
    exportCsv: { en: 'Export CSV', hi: 'CSV निर्यात' },
  },
  explore: {
    eyebrow: { en: 'Knowledge Hub & Grassroots Action', hi: 'ज्ञान केंद्र व जमीनी नवाचार' },
    title: { en: 'Policies in 60 Seconds & Youth Stories', hi: '60 सेकंड में नीतियां व युवा कहानियां' },
    tabPolicies: { en: '60s Policy Library', hi: '60 सेकंड नीति लाइब्रेरी' },
    tabStories: { en: 'Youth Ground Stories', hi: 'युवा जमीनी कहानियां' },
    expandAll: { en: 'Expand All 6 Briefs', hi: 'सभी 6 सारांश खोलें' },
    collapseAll: { en: 'Collapse All', hi: 'सभी समेटें' },
    downloadTxt: { en: 'Download Brief (.TXT)', hi: 'सारांश डाउनलोड (.TXT)' },
  },
};
