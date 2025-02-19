// Define Season enum
export enum Season {
    SPRING = '🌸 Spring',
    SUMMER = '☀️ Summer',
    AUTUMN = '🍂 Autumn',
    WINTER = '❄️ Winter',
    UNKNOWN = '❓ Unknown Season'
}

export class JapanSeason {
    private static getCurrentMonth(): number {
        return new Date().getMonth() + 1; // Adjust to 1-based index
    }

    public static getCurrentSeason(): Season {
        const month = this.getCurrentMonth();

        if (this.isSpring(month)) return Season.SPRING;
        if (this.isSummer(month)) return Season.SUMMER;
        if (this.isAutumn(month)) return Season.AUTUMN;
        if (this.isWinter(month)) return Season.WINTER;

        return Season.UNKNOWN;
    }

    private static isSpring(month: number): boolean {
        return month >= 3 && month <= 5;
    }

    private static isSummer(month: number): boolean {
        return month >= 6 && month <= 8;
    }

    private static isAutumn(month: number): boolean {
        return month >= 9 && month <= 11;
    }

    private static isWinter(month: number): boolean {
        return month === 12 || month <= 2;
    }
}