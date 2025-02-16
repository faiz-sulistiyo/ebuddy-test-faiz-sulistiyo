export type User =  {
    id?: string;
    name: string;
    email: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
    potentialScore?: number;
}