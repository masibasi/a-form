import React, { useContext, useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import logo from "../assets/images/A-Form-logo.png";
import { Button, Form } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { useLocation } from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate();
    const { isLogin, onLogout } = useContext(AuthenticationContext);

    // 현재 경로 저장
    const location = useLocation();

    // 현재 경로가 '/community'인 경우에만 검색창을 표시하도록 함
    const showSearchBar = location.pathname === "/community" || location.pathname.slice(0, 7) === "/search";
    const [searchKeyword, setSearchKeyword] = useState("");

    // const searchKeyword = useRef(null);
    // const setSearchKeyword = (e) => {
    //     console.log(JSON.stringify(e.target.value));
    //     const value = e.target.value;
    //     searchKeyword.current = value;
    // };
    return (
        <div className="Layout">
            <Navbar className="Navbar" bg="white">
                <div className="navbarContainer ">
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img src={logo} width={"130px"} alt="" />
                    </Navbar.Brand>

                    {showSearchBar && (
                        <div className="d-flex searchWrapper ">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 searchBar"
                                aria-label="Search"
                                value={searchKeyword.current}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <Button variant="outline-success" onClick={() => navigate(`/search/${searchKeyword}`)}>
                                Search
                            </Button>
                        </div>
                    )}
                    <div className="navbarRight">
                        <Nav.Link className="navMenuComponent" onClick={() => navigate("/about")}>
                            About
                        </Nav.Link>
                        {isLogin ? (
                            <Nav>
                                <Nav.Link onClick={() => navigate("/mypage/template")}>마이페이지</Nav.Link>
                                <Nav.Link
                                    onClick={() => {
                                        if (window.confirm("로그아웃하시겠습니까?")) {
                                            onLogout();
                                        }
                                    }}
                                >
                                    로그아웃
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Link onClick={() => navigate("/register")}>회원가입</Nav.Link>
                                <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
                            </Nav>
                        )}
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
            </Navbar>
            {/* <div className="Outlet"> */}
            <Outlet />
            {/* </div> */}
        </div>
    );
}
