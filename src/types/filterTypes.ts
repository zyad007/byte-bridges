export type ProposalsType = "0-5" | "5-10" | "10-15" | "15-20" | "20-50" | "50-";
export type CostRangeType = "0-99" | "100-499" | "500-999" | "1000-4999" | "5000-";
export type ClientSpentRangeType = {
  min: number;
  max: number;
};
export type clientRatingRangeType = {
  min: number;
  max: number;
};
export default interface Filters{ 
    priceRanges?: CostRangeType[];
    proposalsRanges?: ProposalsType[];
    clientSpentRange?: ClientSpentRangeType;
    clientRatingRange?: clientRatingRangeType;
    isHourly?: boolean;
    isFixedPrice?: boolean;
    verifiedOnly?: boolean;
    workerId?: (number|string)[];
  }