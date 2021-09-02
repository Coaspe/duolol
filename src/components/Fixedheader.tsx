import '../style/Fixedheader.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { getMatchesByPuuid, getSummonerInfoBySummonerName } from '../service/mostThree'
import axios, { AxiosResponse } from "axios";
import { useEffect } from 'react'
import { api_key } from "../../api"

interface summonerData {
    accountId: String;
    id: String;
    name: String;
    profileIconId: Number;
    puuid: String;
    revisionDate: Number;
    summonerLevel: Number;
}

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
  const [lang, setLang] = useState<String>("한국어")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [dataVal, setDataVal] = useState<summonerData>(initialData);
    const [sumName, setSumName] = useState<String>("");
    const [mainPosition, setMainPosition] =useState<String>("")
    const [comment, setComment] = useState<String>("")

    const handleSubmit = async() => {
        // const data = getSummonerInfoBySummonerName(sumName)
        await axios.get<any>(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumName}?api_key=${api_key}`)
        .then((res) => setDataVal(res.data))
    }

    useEffect(() => {
        const getMatches = async (dataVal: summonerData) => {
            await axios.get<String[]>(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${dataVal.puuid}/ids?api_key=${api_key}`,{params:{type:"ranked"}})
            .then((res) => console.log("Get Matches", res)
            )
        }
        if (dataVal !== initialData) {
            getMatches(dataVal)
        }
    }, [dataVal])
    console.log("dataVal", dataVal);
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
                <input type="password" placeholder="4자리 숫자로 입력해주세요." maxLength={4} minLength={4} className="text-sm pl-3 w-full border-1 border-modalBorder h-12 rounded-sm bg-modalInput"/>
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