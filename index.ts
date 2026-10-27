export interface PlayerProfile {
  uid: string;
  ign: string;
  level: number;
  server: string;
  avatarUrl: string;
  diamonds: number;
  rank: string;
  guild: string;
  weeklyMembership: {
    active: boolean;
    expiresAt: string | null;
    claimedToday: boolean;
    daysRemaining: number;
  };
  monthlyMembership: {
    active: boolean;
    expiresAt: string | null;
    claimedToday: boolean;
    daysRemaining: number;
  };
  dailyStreak: {
    count: number;
    claimedToday: boolean;
  };
  levelPassClaimed: number[]; // level numbers that have been claimed
}

export interface TopUpPack {
  id: string;
  diamonds: number;
  bonus: number;
  price: number;
  tag?: string;
  popular?: boolean;
}

export interface MembershipPack {
  id: string;
  name: string;
  type: 'weekly' | 'monthly' | 'combo';
  price: number;
  instantDiamonds: number;
  dailyDiamonds: number;
  totalDiamonds: number;
  durationDays: number;
  perks: string[];
  tag?: string;
}

export interface SpecialAirdrop {
  id: string;
  price: number;
  originalPrice: number;
  diamonds: number;
  crates: string;
  expiresInSeconds: number;
  title: string;
}

export interface TransactionOrder {
  id: string;
  orderId: string;
  garenaTxnId: string;
  uid: string;
  ign: string;
  itemName: string;
  diamondsAdded: number;
  amount: number;
  paymentMethod: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  timestamp: string;
}

export type NavTab = 'topup' | 'memberships' | 'claim' | 'orders' | 'profile';
