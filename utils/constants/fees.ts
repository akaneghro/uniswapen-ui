import type FeeTier from "~/types/FeeTier";

const FEE_TIER_LOW: FeeTier = {
    feeTier: 0.05,
    fee: 500,
    tickSpacing: 10,
};

const FEE_TIER_MEDIUM: FeeTier = {
    feeTier: 0.3,
    fee: 3000,
    tickSpacing: 60,
};

const FEE_TIER_HIGH: FeeTier = {
    feeTier: 1,
    fee: 10000,
    tickSpacing: 200,
};

export const FEE_TIERS: FeeTier[] = [
    FEE_TIER_LOW,
    FEE_TIER_MEDIUM,
    FEE_TIER_HIGH,
];
