import axios from "axios";
import { api_key } from "../api"

interface summonerData {
    data: {
    accountId: String;
    id: String;
    name: String;
    profileIconId: Number;
    puuid: String;
    revisionDate: Number;
    summonerLevel: Number;
    }
}
export async function getSummonerInfoBySummonerName(summonerName: String) {
    const data : any = await axios.get<any>(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
        .then((res) => console.log("Api Response", res))
    return data
}

export async function getMatchesByPuuid(puuid:String) {
    return await axios.get(`https://kr.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`)
    .then((res) => console.log("Mathces", res)
    )
}