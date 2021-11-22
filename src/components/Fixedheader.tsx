import '../style/Fixedheader.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Key, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios, { AxiosResponse } from "axios";
import { useEffect } from 'react'
import { api_key1, api_key2 } from "../api"
import { match, matchRes, summonerData, matchInfo } from '../types'
import { uploadPost, uploadUserInfo, getUserInfo } from '../service/firebase'
import { Firebase, firestore, FieldValue } from "../lib/firebase";

const Fixedheader = () => {
    const initialData : summonerData= {
        accountId: "a",
        id: "a",
        name: "a",
        profileIconId: -1,
        puuid: "a",
        revisionDate: -1,
        summonerLevel: -1
    }
  const [lang, setLang] = useState<string>("한국어")
    const [show, setShow] = useState(false);
    
  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [dataVal, setDataVal] = useState<summonerData>(initialData);
    const [dataValT, setDataValT] = useState<summonerData>(initialData);

    const [matchesIdV4, setMatchesIdV4] = useState<string[]>([]);
    const [matchesIdV5, setMatchesIdV5] = useState<string[]>([]);
    const [matchesId, setMatchesId] = useState<string[]>([]);

    const [matchesInfo, setMatchesInfo] = useState<string[][]>([]);
    const [matchesInfo2, setMatchesInfo2] = useState<matchInfo[]>([]);
    const [matchesInfo3, setMatchesInfo3] = useState<matchInfo[]>([]);

    const [firebaseMatchesInfo, setFirebaseMatchesInfo] = useState<{
        champName: string; winRate: number; total: number; KDA: string;
    }[]>([]);

    const [sumName, setSumName] = useState<string>("");
    const [mainPosition, setMainPosition] =useState<string>("")
    const [comment, setComment] = useState<string>("")

    const [count, setCount] = useState<number>(0)
    const [beginTimeV4, setBeginTimeV4] = useState<number>(1610118000000);
    const [endTimeV4, setEndTimeV4] = useState<number>(1610118000000 + 604800000)
    const [totalMatchesLength, setTotalMatchesLength] = useState<number>(0)
    const [matchQueryEndV4, setMatchQueryEndV4] = useState<Boolean>(false)
    const [matchQueryEndV5, setMatchQueryEndV5] = useState<Boolean>(false)
    const [lastestEpoch, setLastestEpoch] = useState<number>(0)
    const [matchQueryBeginIndex, setMatchQueryBeginIndex] = useState(0)
    const [tmp, setTmp] = useState(0)
    const [userInfoExists, setUserInfoExists] = useState<number>(2)
    const [password, setPassword] = useState<number>(0)
    const ENDTIME = 1625097600000
    let ajk = [
    "KR_5396336266",
    "KR_5396088288",
    "KR_5396079438",
    "KR_5394734536",
    "KR_5394679909",
    "KR_5394582212",
    "KR_5394507604",
    "KR_5394285092",
    "KR_5394248910",
    "KR_5386907562",
    "KR_5371981153",
    "KR_5358910918",
    "KR_5358895454",
    "KR_5328705439",
    "KR_5276245053",
    "KR_5103221453",
    "KR_5097772320",
    "KR_5090706430",
    "KR_5090674250",
    "KR_5090578648",
]
    const handleSubmit = async() => {
        // await firestore.collection("userInfo").doc(sumName).get().then((res) => {
        //     setUserInfoExists(res.exists ? 1 : 0)
        // })
        // await axios.get<any>(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${api_key1}`)
        //     .then((res) => {
        //         setDataVal(res.data)
        //     })
        // await axios.get<any>(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${api_key2}`)
        //     .then((res) => {
        //         setDataValT(res.data)
        //     })
        Promise.all(ajk.map(async (id: string) => (
            await axios.get<any>(`https://asia.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${api_key2}`)
        )))
            .then(() => {
                ajk.filter((info: any) => (info.info.queueId === 420))
                console.log("ajk",ajk);
            })
    }
    
    useEffect(() => {
        const getMatchesV5 = async (dataVal: summonerData, beginIndex: number) => {
                await axios.get<string[]>(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${dataVal.puuid}/ids?api_key=${api_key1}`, {
                        params: {
                                queue: 420,
                                count: 100,
                                start: beginIndex,
                                startTime : 1625097600
                }
            })
                .then((res: any) => {
                    if (res.data.length === 0) {
                        console.log("V5 set true");
                        setMatchQueryEndV5(true)
                        return;
                    } else {
                        console.log("Get Matches V5", res)
                        setMatchesIdV5(matchesIdV5.concat(res.data))
                        setTmp(tmp + 100)
                    }
                }
            )
        }
        if (dataVal.summonerLevel !== -1) {
            if (!matchQueryEndV5) {
                if (userInfoExists === 0) {
                    getMatchesV5(dataVal, tmp)
                } else if (userInfoExists === 1) {
                    
                }
            }
        }
    }, [dataVal, tmp, userInfoExists])

    useEffect(() => {
        // 시즌 시작일 ~ 6월 17일
        const getMatchesV4 = async (dataVal: summonerData, beginIndex: number, beginTime: number, endTime: number) => {
            try {
                setCount(count + 1)
                console.log("count", count);
                await axios.get(`https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${dataVal.accountId}?api_key=${api_key1}`, {
                    params: {
                        queue: 420,
                        beginTime: beginTime,
                        endTime: endTime,
                        beginIndex: beginIndex
                    }
                }).then((res: any) => {
                    console.log(res.data.matches);
                    setMatchesIdV4(matchesIdV4.concat(res.data.matches.map((match: match) => (`KR_${match.gameId.toString()}`))))
                    if (res.data.matches > 100) {
                        setMatchQueryBeginIndex(matchQueryBeginIndex + 100)
                    } else {
                        setBeginTimeV4(endTimeV4 + 1)
                        setMatchQueryBeginIndex(0)
                        setEndTimeV4((endTimeV4 + 604800000) >= ENDTIME ? ENDTIME : endTimeV4 + 604800000)
                    }
                    if (endTimeV4 === ENDTIME) {
                        console.log("V4 set true");

                        setMatchQueryEndV4(true)
                    }
                    console.log("Get Matches V4", res)
                    console.log("endTimeV4",endTimeV4);
                    }
                )
            } catch (error: any) {
                console.log("Error", error.message);
                if (endTimeV4 === ENDTIME) {
                        console.log("V4 set true");

                    setMatchQueryEndV4(true)
                    return;
                } else {
                    setBeginTimeV4(endTimeV4 + 1)
                    setMatchQueryBeginIndex(0)
                    setEndTimeV4((endTimeV4 + 604800000) >= ENDTIME ? ENDTIME : endTimeV4 + 604800000)
                    console.log("endTimeV4",endTimeV4);
                    return;
                }
            }
        }
            if (dataVal.summonerLevel !== -1 && userInfoExists === 0) {
                if (!matchQueryEndV4) {
                    getMatchesV4(dataVal, matchQueryBeginIndex, beginTimeV4, endTimeV4)
                }
            }
    }, [dataVal, matchQueryBeginIndex, endTimeV4, userInfoExists])

    const arrayArrange = (matchesId: string[]) => {
        const aa = matchesId
        let cc: string[][] = []
        let kk: number = 0
        if (aa.length < 21) {
            cc.push(aa)
            setMatchesInfo(cc)
        } else {
            while (aa.length > 0) {
                let bb = aa.splice(0, 20)
                cc.push(bb)
            }
            console.log("cc",cc);
            setMatchesInfo(cc)
        }
        for (let i = 0; i < cc.length; i++) {
            kk += cc[i].length
        }
        setTotalMatchesLength(kk)
    }
    
    const getMatchInfo = async (matchesInfoArg:string[][]) => {
        let even : [][]= []
        let odd : [][]= []
        let t: number = -2300
        let ft: number = 0
        for (let idx = 0; idx < matchesInfoArg.length; idx += 2) {

            let twentyChunk = matchesInfoArg[idx];
            let twentyChunk2 = matchesInfoArg[idx + 1]

            if ((idx % 10 === 0) && (idx !== 0)) {
                ft += 121000
                setTimeout(() => {
                    console.log(`${idx}th chunk requests!!!`);
                        Promise.all(twentyChunk.map(async (match: any) => (await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${api_key1}`))))
                        .then((res: any) => {
                                even.push(res)
                                console.log("even", even);
                                if (idx === matchesInfoArg.length - 1) {
                                    extractWinChampLine(even, 1)
                                    extractWinChampLine(odd, 2)
                                }
                            })
                        }, t + ft)
                        if (twentyChunk2 !== undefined) {
                            setTimeout(() => {
                                console.log(`${idx + 1}th chunk requests!!!`);
                                Promise.all(twentyChunk2.map(async (match: any) => (await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${api_key2}`))))
                                .then((res: any) => {
                                    odd.push(res)
                                        console.log("odd", odd);
                                        if (idx === matchesInfoArg.length - 2) {
                                            extractWinChampLine(even, 1)
                                            extractWinChampLine(odd, 2)
                                    }
                                    })
                                }, t + ft)
                            }
            } else {
                t += 2300
                setTimeout(() => {
                    console.log(`${idx}th chunk requests!!!`);
                    Promise.all(twentyChunk.map(async (match: any) => (await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${api_key1}`))))
                    .then((res: any) => {
                            even.push(res)
                            console.log("even", even);
                            if (idx === matchesInfoArg.length - 1) {
                                extractWinChampLine(even, 1)
                                extractWinChampLine(odd, 2)
                            }
                        })
                }, t + ft)
                if (twentyChunk2 !== undefined) {
                    setTimeout(() => {
                        console.log(`${idx + 1}th chunk requests!!!`);
                        Promise.all(twentyChunk2.map(async (match: any) => (await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${api_key2}`))))
                        .then((res: any) => {
                                odd.push(res)
                                console.log("odd", odd);
                            if (idx === matchesInfoArg.length - 2) {
                                extractWinChampLine(even, 1)
                                extractWinChampLine(odd, 2)
                            }
                            })
                        }, t + ft)
                }
            }
        }
    }
    
    const extractWinChampLine = (matches: [][], check: number) => {
        let tmp: matchInfo[] = []
        const extracted: any = matches.map((mathcesChunk) => {
                console.log("mathcesChunk", mathcesChunk);

            // let mathcesChunk = tmpMathcesChunk.filter((tmp:any) =>(tmp.data.info.participants[0].gameEndedInEarlySurrender !== true))
            return mathcesChunk.map((match: any) => {
                console.log("match", match);
                console.log("dataVal.puuid", dataVal.puuid);
                console.log("dataValT.puuid", dataValT.puuid);

                
                let me = match.data.info.participants.filter((player: any) => (player.puuid === (check === 2 ? dataValT.puuid : dataVal.puuid)))
                console.log("me", me);
                
                tmp.push({
                    championName: me[0].championName,
                    win: me[0].win,
                    position: me[0].teamPosition,
                    kills: me[0].kills,
                    deaths: me[0].deaths,
                    assists: me[0].assists
                })
                return {
                    championName: me[0].championName,
                    win: me[0].win,
                    position: me[0].teamPosition,
                    kills: me[0].kills,
                    deaths: me[0].deaths,
                    assists: me[0].assists
                }
            }
            )
        })
        if (check === 1) {
            setMatchesInfo3(tmp)
        } else {
            setMatchesInfo2(tmp)
        }
        console.log("matchesInfo2", matchesInfo2);
        
        return extracted
    }
    useEffect(() => {
        if (matchQueryEndV4 && matchQueryEndV5) {
            setMatchesId(matchesIdV5.concat(matchesIdV4))
        }
    }, [matchQueryEndV4, matchQueryEndV5])
    
    
    useEffect(() => {
        if (matchesId.length > 0) {
            arrayArrange(matchesId)
        }
    }, [matchesId])
    
    useEffect(() => {
        if ((matchesInfo.length !== 0) && (typeof matchesInfo[0][0] === "string")) {
            getMatchInfo(matchesInfo)
        }
    }, [matchesInfo])

    useEffect(() => {
        console.log("matchesIdV4",matchesIdV4);
    }, [matchesIdV4])
    useEffect(() => {
            const arrangeByLane = (info: matchInfo[]) => {
                let tmp: { [key: string]: matchInfo[] } = {}
                let tmp2: {
                    [key: string]: {
                        total: number,
                        win: number,
                        winRate: number,
                        kills: number;
                        deaths: number;
                        assists: number;
                    }
                } = {}
                let tmp3 = []
                tmp['TOP'] = []
                tmp['JUNGLE'] = []
                tmp['MIDDLE'] = []
                tmp['BOTTOM'] = []
                tmp['UTILITY'] = []
                tmp['ELSE'] = []
                let positions = ['TOP','JUNGLE','MIDDLE','BOTTOM','UTILITY']

                for (let idx = 0; idx < info.length; idx++) {
                    if (!positions.includes(info[idx].position as string)) {
                        tmp['ELSE'].push(info[idx])
                    }
                    else
                        {
                            tmp[info[idx].position as Key].push(info[idx])
                        }
                }

                for (let key in tmp) {
                    if (tmp[key as Key].length === 0) {
                        continue;
                    }
                    for (let idx = 0; idx < tmp[key as Key].length; idx++) {
                        let element = tmp[key as Key][idx];
                        if (tmp2[element.championName as Key] === undefined ) {
                            tmp2[element.championName as Key] = {
                                total: 1,
                                win: tmp[key as Key][idx].win ? 1 : 0,
                                winRate: 0,
                                kills: tmp[key as Key][idx].kills,
                                deaths: tmp[key as Key][idx].deaths,
                                assists:  tmp[key as Key][idx].assists
                            }
                        } else {
                            tmp2[element.championName as Key].total += 1
                            tmp2[element.championName as Key].kills += element.kills
                            tmp2[element.championName as Key].deaths += element.deaths
                            tmp2[element.championName as Key].assists += element.assists
                            if (tmp[key as Key][idx].win === true) {
                                tmp2[element.championName as Key].win += 1
                            }
                        }
                    }
                }

                for (let key in tmp2) {
                    let el = tmp2[key as Key]
                    el.winRate = el.win / el.total
                    tmp3.push({
                        champName: key,
                        KDA: `${(el.kills / el.total).toFixed(1)}/${(el.deaths / el.total).toFixed(1)}/${(el.assists / el.total).toFixed(1)}`,
                        total: el.total,
                        winRate: Math.round(el.winRate * 100)
                    })
                }
                tmp3.sort(function(a, b) {
                    return b.total - a.total;
                });
                setFirebaseMatchesInfo(tmp3)
        }
        if (matchesInfo2.length + matchesInfo3.length >= totalMatchesLength) {
            arrangeByLane(matchesInfo2.concat(matchesInfo3))
        }
        console.log(totalMatchesLength);
        console.log("matchesInfo2", matchesInfo2);
    }, [matchesInfo2])

    useEffect(() => {
        console.log("firebaseMatchesInfo", firebaseMatchesInfo);
        if (firebaseMatchesInfo.length > 0) {
            uploadUserInfo(firebaseMatchesInfo, sumName, 0)
            uploadPost(comment, mainPosition, password, sumName)
            setMatchesIdV4([])
            setMatchesInfo([])
            setMatchesInfo2([])
            setMatchQueryEndV4(false)
            setDataVal(initialData)
            setComment("")
            setMainPosition("")
            setSumName("")
        }
    }, [firebaseMatchesInfo])


    return (
        <>
            {show ? (
        <Modal show={show} onHide={handleClose} centered className="text-white">
            <Modal.Header className="bg-modalBg border-modalBg" closeButton>
            <Modal.Title>등록하기</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-modalBg">
                <span className="text-sm font-bold block mb-2">소환사 이름(KR)</span>
                <input onChange={(e) => { setSumName(e.target.value) }} type="text" className="w-full border-1 pl-3 border-modalBorder h-12 rounded-sm bg-modalInput"/>
                <span className="text-sm font-bold block mt-3 mb-2">주 포지션</span>
                <ul className="flex ml-0 pl-0">
                            <li
                                phx-click="filter_position"
                                phx-value-position="ALL"
                                className={`w-11 h-11 flex items-center ${mainPosition === "ALL" ? "bg-base" : "hover:bg-hoverBgGray"} justify-center all_li_content cursor-pointer border-borderGray `}
                                onClick={() => {
                                    setMainPosition("ALL")
                                }}
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon all w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M22 2h-2.906L2 19.094V22h3.063L22 5.062V2z" fill={mainPosition === "ALL" ? "#ffffff" : "#00DABA"} />

                                        <path d="M5 13.478l-3 3V2h14.478l-3 3H5v8.478zM19 10.819l3-3V22H7.82l3-3H19v-8.181z" fill={mainPosition === "ALL" ? "#ffffff" : "#00DABA"} />

                                    </svg>
                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="TOP"
                                className={`w-11 h-11 flex items-center justify-center all_li_content cursor-pointer border-borderGray ${mainPosition === "TOP" ? "bg-base" : "hover:bg-hoverBgGray"}`}
                                onClick={() => {
                                    setMainPosition("TOP")
                                }}
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon top w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M16.172 5H5v11.172l-3 3V2h17.172l-3 3z"  fill={mainPosition === "TOP" ? "#ffffff" : "#00DABA"} />

                                        <path d="M22 22H4.828l3-3H19V7.828l3-3V22zM15 9H9v6h6V9z" fill="#3B3C40" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="JUNGLE"
                                className={`w-11 h-11 flex items-center justify-center all_li_content cursor-pointer border-borderGray ${mainPosition === "JUNGLE" ? "bg-base" : "hover:bg-hoverBgGray"}`}
                                onClick={() => {
                                    setMainPosition("JUNGLE")
                                }}                                
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon jungle w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path fill={mainPosition === "JUNGLE" ? "#ffffff" : "#00DABA"} d="M5.094 0c9.247 11.173 8.508 20.655 6.983 24-3.853-4.623-6.261-6.368-6.983-6.662C4.708 10.788 2.204 7.652 1 6.903c4.752 1.734 6.903 5.512 7.385 7.184C9.09 8.532 6.485 2.381 5.094 0zM15.569 18.22v2.57l3.451-3.452c0-5.651 2.622-9.311 3.933-10.435-4.816 2.312-6.93 8.508-7.384 11.318zM15.569 12.04l-.803 2.248C14.509 12.49 13.482 10.38 13 9.552 14.605 5.763 17.522 1.605 18.78 0c-2.505 5.137-3.185 10.167-3.211 12.04z" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="MID"
                                className={`w-11 h-11 flex items-center justify-center all_li_content cursor-pointer border-borderGray ${mainPosition === "MID" ? "bg-base" : "hover:bg-hoverBgGray"}`}
                                onClick={() => {
                                    setMainPosition("MID")
                                }}
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon mid w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M22 2h-2.906L2 19.094V22h3.063L22 5.062V2z" fill={mainPosition === "MID" ? "#ffffff" : "#00DABA"} />

                                        <path d="M5 13.478l-3 3V2h14.478l-3 3H5v8.478zM19 10.819l3-3V22H7.82l3-3H19v-8.181z" fill="#3B3C40" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="BOTTOM"
                                className={`w-11 h-11 flex items-center justify-center all_li_content cursor-pointer border-borderGray ${mainPosition === "BOTTOM" ? "bg-base" : "hover:bg-hoverBgGray"}`}
                                onClick={() => {
                                    setMainPosition("BOTTOM")
                                }}
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon bottom w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M7.828 19H19V7.828l3-3V22H4.828l3-3z" fill={mainPosition === "BOTTOM" ? "#ffffff" : "#00DABA"} />

                                        <path d="M2 2h17.172l-3 3H5v11.172l-3 3V2zm7 13h6V9H9v6z" fill="#3B3C40"/>

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="SUPPORT"
                                className={`w-11 h-11 flex items-center justify-center top_li_content cursor-pointer border-borderGray ${mainPosition === "SUPPORT" ? "bg-base" : "hover:bg-hoverBgGray"}`}
                                onClick={() => {
                                    setMainPosition("SUPPORT")
                                }}
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon support w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path fill={mainPosition === "SUPPORT" ? "#ffffff" : "#00DABA"} d="M13.991 8.327l2.248-2.036H24c-2.553 2.327-4.69 2.86-5.44 2.836h-1.45l2.03 2.91-3.553 1.527-1.596-5.237zM14.644 19.745L12.758 9.127l-.798.946V22l2.684-2.255zM10.009 8.327L7.76 6.291H0c2.553 2.327 4.69 2.86 5.44 2.836h1.45l-2.03 2.91 3.553 1.527 1.596-5.237zM9.277 19.745l1.886-10.618.797.946V22l-2.683-2.255zM9.048 2L8.25 3.382 11.876 7.6l3.627-4.218L14.56 2H9.048z" />

                                    </svg>

                                </span>

                            </li>
                        </ul>

                <span className="text-sm font-bold block mt-3 mb-2">한마디</span>
                <input onChange={(e) => { setComment(e.target.value) }} type="text" placeholder="서포터 구합니다. 같이 게임해요!" className="text-sm pl-3 w-full border-1 border-modalBorder h-12 rounded-sm bg-modalInput" />

                <span className="text-sm font-bold block mt-3 mb-2">비밀번호</span>
                        <input type="password" placeholder="4자리 숫자로 입력해주세요." maxLength={4} minLength={4} className="text-sm pl-3 w-full border-1 border-modalBorder h-12 rounded-sm bg-modalInput" onChange={(e)=>{setPassword(Number(e.target.value))}}/>
            </Modal.Body>
            <Modal.Footer className="bg-modalBg border-0 flex items-center justify-center w-full">
                <button className="bg-modalCancleBtn rounded-sm h-12 ss border-1 border-modalBorder hover:bg-modalBorder text-sm font-bold" onClick={handleClose}>취소</button>
                <button className="bg-base rounded-sm h-12 ss text-sm font-bold hover:bg-hoverBase" onClick={handleSubmit}>등록</button>
            </Modal.Footer>
      </Modal>
            ): (null)}
        <div className="w-full fixed backdrop-filter backdrop-blur-lg py-3 border-b border-borderGray z-50">
            <div className="w-full h-full relative left-1/5">
                <div className="flex justify-between w-3/5 items-center h-full" >
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <span className="font-extrabold text-3xl text-white">DUO</span>
                            <span className="font-extrabold text-3xl text-red">.LOL</span>
                    <span className="pl-6 text-xs text-textGray">지겹다 한판하고 친삭. 제대로 찾자!</span>
                        </div>
                    </div>
                    <div className="flex justify-between h-full font-bold">
                        <Navbar className="mr-2" variant="dark" bg="dark" expand="lg">
                            <Nav>
                                <NavDropdown
                                
                                    id="nav-dropdown-dark-example"
                                    title={lang}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item href="#action/3.1" onClick={() => setLang("한국어")}>한국어</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1" onClick={() => setLang("English")}>English</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" onClick={() => setLang("Português")}>Português</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3" onClick={() => setLang("日本語")}>日本語</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar>
                        <button className="bg-base text-white font-bold px-4 py-1 text-sm rounded-sm hover:bg-hoverBase" onClick={handleShow}>소환사 등록하기</button>
                    </div>
                </div>
            </div>
            </div>
            </>
    )
}

export default Fixedheader