import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Main.css'
import { useState } from 'react';


const Main = () => {
    const [navTitle, setNavTitle] = useState("티어 전체")
    const [navLocationTitle, setNavLocationTitle] = useState("KR")

    return (
        <div className="col-span-3 pt-14 z-40">
            <div className="flex flex-col">
                <div className="flex justify-between"><p>필터</p> <p>지역</p></div>
                <div className="flex justify-between">
                    <div className="flex justify-between items-center">
                        <Navbar variant="dark" bg="dark" expand="lg">
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={navTitle}
                                    menuVariant="dark"
                                    className="text-white font-bold"
                                >
                                    <NavDropdown.Item href="#action/3.1" onClick={() => setNavTitle("티어 전체")}>티어 전체</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.1" onClick={() => setNavTitle("브론즈")}>브론즈</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" onClick={() => setNavTitle("실버")}>실버</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3" onClick={() => setNavTitle("골드")}>골드</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("플레티넘")}>플레티넘</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("다이아")}>다이아</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("마스터")}>마스터</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("그랜드 마스터")}>그랜드 마스터</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("챌린저")}>챌린저</NavDropdown.Item>


                                </NavDropdown>
                            </Nav>
                        </Navbar>
                        <ul className="flex">
                            <li
                                phx-click="filter_position"
                                phx-value-position="ALL"
                                className="w-11 h-11 flex items-center justify-center all_li_content"
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon all w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M22 2h-2.906L2 19.094V22h3.063L22 5.062V2z" fill="#00DABA" />

                                        <path d="M5 13.478l-3 3V2h14.478l-3 3H5v8.478zM19 10.819l3-3V22H7.82l3-3H19v-8.181z" fill="#00DABA" />

                                    </svg>
                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="TOP"
                                className="w-11 h-11 flex items-center justify-center all_li_content"
                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon top w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M16.172 5H5v11.172l-3 3V2h17.172l-3 3z" fill="#00DABA" />

                                        <path d="M22 22H4.828l3-3H19V7.828l3-3V22zM15 9H9v6h6V9z" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="JUNGLE"
                                className="w-11 h-11 flex items-center justify-center all_li_content"

                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon jungle w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path fill="#00DABA" d="M5.094 0c9.247 11.173 8.508 20.655 6.983 24-3.853-4.623-6.261-6.368-6.983-6.662C4.708 10.788 2.204 7.652 1 6.903c4.752 1.734 6.903 5.512 7.385 7.184C9.09 8.532 6.485 2.381 5.094 0zM15.569 18.22v2.57l3.451-3.452c0-5.651 2.622-9.311 3.933-10.435-4.816 2.312-6.93 8.508-7.384 11.318zM15.569 12.04l-.803 2.248C14.509 12.49 13.482 10.38 13 9.552 14.605 5.763 17.522 1.605 18.78 0c-2.505 5.137-3.185 10.167-3.211 12.04z" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="MID"
                                className="w-11 h-11 flex items-center justify-center all_li_content"

                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon mid w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M22 2h-2.906L2 19.094V22h3.063L22 5.062V2z" fill="#00DABA" />

                                        <path d="M5 13.478l-3 3V2h14.478l-3 3H5v8.478zM19 10.819l3-3V22H7.82l3-3H19v-8.181z" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="BOTTOM"
                                className="w-11 h-11 flex items-center justify-center all_li_content"

                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon bottom w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path d="M7.828 19H19V7.828l3-3V22H4.828l3-3z" fill="#00DABA" />

                                        <path d="M2 2h17.172l-3 3H5v11.172l-3 3V2zm7 13h6V9H9v6z" />

                                    </svg>

                                </span>

                            </li>


                            <li
                                phx-click="filter_position"
                                phx-value-position="SUPPORT"
                                className="w-11 h-11 flex items-center justify-center top_li_content"

                            >
                                <span className="position-container">
                                    <svg
                                        className="position-icon support w-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >

                                        <path fill="#00DABA" d="M13.991 8.327l2.248-2.036H24c-2.553 2.327-4.69 2.86-5.44 2.836h-1.45l2.03 2.91-3.553 1.527-1.596-5.237zM14.644 19.745L12.758 9.127l-.798.946V22l2.684-2.255zM10.009 8.327L7.76 6.291H0c2.553 2.327 4.69 2.86 5.44 2.836h1.45l-2.03 2.91 3.553 1.527 1.596-5.237zM9.277 19.745l1.886-10.618.797.946V22l-2.683-2.255zM9.048 2L8.25 3.382 11.876 7.6l3.627-4.218L14.56 2H9.048z" />

                                    </svg>

                                </span>

                            </li>
                        </ul>
                    </div>
                    <Navbar variant="dark" bg="dark" expand="lg">
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={navLocationTitle}
                                menuVariant="dark"
                                className="text-white font-bold"
                            >
                                <NavDropdown.Item href="#action/3.1" onClick={() => setNavTitle("KR")}>KR</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1" onClick={() => setNavTitle("NA")}>NA</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={() => setNavTitle("JP")}>JP</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" onClick={() => setNavTitle("EUW")}>EUW</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("EUNE")}>EUNE</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("OCE")}>OCE</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("BR")}>BR</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("LAS")}>
                                    LAS
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("LAN")}>LAN</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("RU")}>RU</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4" onClick={() => setNavTitle("TR")}>TR</NavDropdown.Item>



                            </NavDropdown>
                        </Nav>
                    </Navbar>
                </div>
            </div>
        </div>
    )
}

export default Main;