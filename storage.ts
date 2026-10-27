import { PlayerProfile, TopUpPack, MembershipPack, SpecialAirdrop, TransactionOrder } from '../types';

export const SAMPLE_ACCOUNTS: Record<string, Partial<PlayerProfile>> = {
  '194820491': {
    ign: '⚡RAISTAR_99⚡',
    level: 74,
    rank: 'Grandmaster IV',
    guild: '⚡THUNDER_ARMY⚡',
    diamonds: 420,
    server: 'India (IND)',
  },
  '209384712': {
    ign: '亗TOTAL_GAMING亗',
    level: 79,
    rank: 'Grandmaster V',
    guild: 'TG_ESPORTS',
    diamonds: 1850,
    server: 'India (IND)',
  },
  '349281048': {
    ign: '꧁☆AS_GAMING☆꧂',
    level: 71,
    rank: 'Heroic II',
    guild: 'ROYAL_TITANS',
    diamonds: 310,
    server: 'India (IND)',
  },
  '582910472': {
    ign: '☬BADSHAH_FF☬',
    level: 66,
    rank: 'Heroic I',
    guild: 'INDIAN_KINGS',
    diamonds: 140,
    server: 'India (IND)',
  },
};

export const TOP_UP_PACKS: TopUpPack[] = [
  {
    id: 'pack_50',
    diamonds: 100,
    bonus: 10,
    price: 50,
    tag: 'STARTER PACK',
  },
  {
    id: 'pack_100',
    diamonds: 210,
    bonus: 25,
    price: 100,
    tag: 'MOST POPULAR',
    popular: true,
  },
  {
    id: 'pack_240',
    diamonds: 520,
    bonus: 60,
    price: 240,
    tag: '+15% EXTRA VALUE',
  },
  {
    id: 'pack_400',
    diamonds: 900,
    bonus: 110,
    price: 400,
    tag: 'BEST VALUE',
    popular: true,
  },
  {
    id: 'pack_800',
    diamonds: 1800,
    bonus: 220,
    price: 800,
    tag: 'PRO GAMER',
  },
  {
    id: 'pack_1000',
    diamonds: 2400,
    bonus: 300,
    price: 1000,
    tag: 'MEGA VAULT',
  },
];

export const MEMBERSHIP_PACKS: MembershipPack[] = [
  {
    id: 'mem_weekly',
    name: 'Weekly Membership',
    type: 'weekly',
    price: 80,
    instantDiamonds: 100,
    dailyDiamonds: 50,
    totalDiamonds: 450,
    durationDays: 7,
    tag: 'HOT DEAL · ₹80',
    perks: [
      '100 Instant Diamonds on purchase',
      'Claim 50 Diamonds daily for 7 days',
      'Exclusive Weekly Member VIP Badge icon',
      'Weekly Discount Shop discount voucher',
    ],
  },
  {
    id: 'mem_monthly',
    name: 'Monthly Membership',
    type: 'monthly',
    price: 400,
    instantDiamonds: 500,
    dailyDiamonds: 70,
    totalDiamonds: 2600,
    durationDays: 30,
    tag: 'SUPER SAVER · ₹400',
    perks: [
      '500 Instant Diamonds on purchase',
      'Claim 70 Diamonds daily for 30 days',
      'Exclusive Golden Monthly VIP Badge & Avatar Frame',
      '5x Evo Gun Loot Crates + Universal EP Badges',
    ],
  },
  {
    id: 'mem_combo',
    name: 'Super VIP Pass (Weekly + Monthly)',
    type: 'combo',
    price: 480,
    instantDiamonds: 600,
    dailyDiamonds: 135,
    totalDiamonds: 3300,
    durationDays: 30,
    tag: 'MAX SAVINGS (₹480)',
    perks: [
      '600 Instant Diamonds',
      'Claim 120 + 15 Bonus = 135 Diamonds daily',
      'Both Weekly & Monthly VIP Badges active',
      'Permanent 10% Discount on Garena Top-Up Center',
    ],
  },
];

export const SAMPLE_AIRDROP: SpecialAirdrop = {
  id: 'airdrop_29',
  title: 'Secret Special Airdrop (95% OFF)',
  price: 29,
  originalPrice: 290,
  diamonds: 299,
  crates: '5x AK47 Blue Flame Draco Crates + LOL Emote',
  expiresInSeconds: 84600,
};

const STORAGE_KEY_PROFILE = 'garena_ff_profile_v2';
const STORAGE_KEY_ORDERS = 'garena_ff_orders_v2';

export function getDefaultProfile(uid: string): PlayerProfile {
  const sample = SAMPLE_ACCOUNTS[uid];
  return {
    uid,
    ign: sample?.ign || `Player_${uid.slice(-4)}`,
    level: sample?.level || Math.floor(Math.random() * 40) + 35,
    server: sample?.server || 'India (IND)',
    avatarUrl: '/src/assets/images/free_fire_avatar_1793131854652.jpg',
    diamonds: sample?.diamonds ?? 250,
    rank: sample?.rank || 'Heroic I',
    guild: sample?.guild || 'DESI_WARRIORS',
    weeklyMembership: {
      active: false,
      expiresAt: null,
      claimedToday: false,
      daysRemaining: 0,
    },
    monthlyMembership: {
      active: false,
      expiresAt: null,
      claimedToday: false,
      daysRemaining: 0,
    },
    dailyStreak: {
      count: 3,
      claimedToday: false,
    },
    levelPassClaimed: [2, 4],
  };
}

export function loadProfile(uid: string): PlayerProfile {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PROFILE}_${uid}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load profile', err);
  }
  return getDefaultProfile(uid);
}

export function saveProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PROFILE}_${profile.uid}`, JSON.stringify(profile));
    localStorage.setItem('garena_ff_last_uid', profile.uid);
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export function getLastActiveUID(): string | null {
  try {
    return localStorage.getItem('garena_ff_last_uid');
  } catch {
    return null;
  }
}

export function loadOrders(uid: string): TransactionOrder[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_ORDERS}_${uid}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load orders', err);
  }
  // Default sample order
  return [
    {
      id: 'txn_init_1',
      orderId: 'FF-IN-' + Math.floor(100000 + Math.random() * 900000),
      garenaTxnId: 'GRN-' + Math.floor(10000000 + Math.random() * 90000000),
      uid,
      ign: SAMPLE_ACCOUNTS[uid]?.ign || `Player_${uid.slice(-4)}`,
      itemName: '100 (+10 Bonus) Diamonds Starter Pack',
      diamondsAdded: 110,
      amount: 50,
      paymentMethod: 'UPI (Google Pay)',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString('en-IN'),
    },
  ];
}

export function saveOrders(uid: string, orders: TransactionOrder[]): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_ORDERS}_${uid}`, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders', err);
  }
}
