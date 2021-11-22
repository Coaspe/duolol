export interface match {
    platformId: string;
    gameId: Number;
    champion: Number;
    queue: Number;
    season: Number;
    timestamp: Long;
}

export interface matchRes {
    matches: match[];
    startIndex: Number;
    endIndex: Number;
    totalGames: Number; 
}

export interface summonerData {
    accountId: string;
    id: string;
    name: string;
    profileIconId: Number;
    puuid: string;
    revisionDate: Number;
    summonerLevel: Number;
}

export interface preferChampion {
    championName: string;
    winRate: number;
}

export interface userInfo {
    summnoerImg: string;
    summonerName: string;
    mainPosition: string;
    tier: string;
    preferChampions: preferChampion[];
    winRate: number;
    KDA: number[];
    comment: string;
    registrationDate: number;
}

export const seed: userInfo = {
    summnoerImg:"awsdaw",
    summonerName : "아스읖",
    mainPosition : "BOTTOM",
    tier : "GOLD2",
    preferChampions: [
        { championName: "asdf", winRate: 0.23 },
        { championName: "asdf", winRate: 0.23 },
        { championName: "asdf", winRate: 0.23 }
    ],
    winRate: 0.5,
    KDA: [9.0, 7.0, 9.0],
    comment: "asldkfjas;lkdfj",
    registrationDate: Date.now()
}

export interface matchInfo {
    win: boolean;
    position: string;
    championName: string;
    kills: number;
    deaths: number;
    assists: number;
}

export interface firebaseMatchInfo {
    champName: string;
    KDA: string;
    total: number;
    winRate: number;
}