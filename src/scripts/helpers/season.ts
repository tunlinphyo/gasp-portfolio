// Define Season enum
export enum Season {
    SPRING = '🌸 Spring',
    SUMMER = '☀️ Summer',
    AUTUMN = '🍂 Autumn',
    WINTER = '❄️ Winter',
    UNKNOWN = '❓ Unknown Season'
}

export class JapanSeason {
    private month: number;

    constructor() {
        this.month = new Date().getMonth() + 1; // Adjust to 1-based index
    }

    /**
     * Get the current season in Japan
     * @returns {Season} Season enum
     */
    public getCurrentSeason(): Season {
        if (this.isSpring()) return Season.SPRING;
        if (this.isSummer()) return Season.SUMMER;
        if (this.isAutumn()) return Season.AUTUMN;
        if (this.isWinter()) return Season.WINTER;
        return Season.UNKNOWN;
    }

    private isSpring(): boolean {
        return this.month >= 3 && this.month <= 5;
    }

    private isSummer(): boolean {
        return this.month >= 6 && this.month <= 8;
    }

    private isAutumn(): boolean {
        return this.month >= 9 && this.month <= 11;
    }

    private isWinter(): boolean {
        return this.month === 12 || this.month <= 2;
    }
}