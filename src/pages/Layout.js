import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../App";

import logo from "../assets/images/A-Form-logo.png";

export default function Layout() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <div>
            <Navbar fixed="top" bg="light" expand="lg">
                <Container className="navbarContainer">
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img src={logo} width={"130px"} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav.Link
                            className="navMenuComponent"
                            onClick={() => navigate("/about")}
                        >
                            About
                        </Nav.Link>
                        {isLoggedIn ? (
                            <>
                                <Nav className="my-3">
                                    <Nav.Link
                                        onClick={() => navigate("/my-page")}
                                    >
                                        마이페이지
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "로그아웃하시겠습니까?"
                                                )
                                            ) {
                                                localStorage.removeItem(
                                                    "isLoggedIn"
                                                );
                                                window.location.reload();
                                            }
                                        }}
                                    >
                                        로그아웃
                                    </Nav.Link>
                                </Nav>
                            </>
                        ) : (
                            <>
                                <Nav className="my-3">
                                    <Nav.Link
                                        onClick={() => navigate("/register")}
                                    >
                                        회원가입
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => navigate("/login")}
                                    >
                                        로그인
                                    </Nav.Link>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}
