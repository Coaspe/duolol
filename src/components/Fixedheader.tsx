import '../style/Fixedheader.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useState } from 'react'
const Fixedheader = () => {
    const [lang, setLang] = useState<String>("한국어")
    return (
        <div className="w-full fixed backdrop-filter backdrop-blur-md py-3 border-b border-borderGray z-50">
            <div className="w-full h-full relative left-1/5">
                <div className="flex justify-between w-3/5 items-center h-full" >
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <span className="font-extrabold text-3xl text-white">DUO</span>
                            <span className="font-extrabold text-3xl text-red">.LOL</span>
                    <span className="pl-6 text-xs text-textGray">지겹다 한판하고 친삭. 제대로 찾자!</span>
                        </div>
                    </div>
                    <div className="flex justify-between h-full">
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
                    <button className="bg-base text-white font-bold px-4 py-1 text-sm rounded-sm hover:bg-hoverBase">소환사 등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fixedheader