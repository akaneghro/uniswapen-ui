import { FeeTier } from "~/models/FeeTier";

const FEE_TIER_LOW: FeeTier = new FeeTier({
    feePercentage: 0.05,
    fee: 500,
    tickSpacing: 10,
});

const FEE_TIER_MEDIUM: FeeTier = new FeeTier({
    feePercentage: 0.3,
    fee: 3000,
    tickSpacing: 60,
});

const FEE_TIER_HIGH: FeeTier = new FeeTier({
    feePercentage: 1,
    fee: 10000,
    tickSpacing: 200,
});

export const FEE_TIERS: FeeTier[] = [
    FEE_TIER_LOW,
    FEE_TIER_MEDIUM,
    FEE_TIER_HIGH,
];
