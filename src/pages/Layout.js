import React, { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../App";

import logo from "../assets/images/A-Form-logo.png";
import { Button, Form } from "react-bootstrap";

export default function Layout() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <div className="Layout">
            <Navbar fixed="top" bg="white">
                <div className="navbarContainer ">
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img src={logo} width={"130px"} alt="" />
                    </Navbar.Brand>{" "}
                    <Form className="d-flex searchWrapper ">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 searchBar"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <div className="navbarRight">
                        <Nav.Link
                            className="navMenuComponent"
                            onClick={() => navigate("/about")}
                        >
                            About
                        </Nav.Link>
                        {isLoggedIn ? (
                            <Nav>
                                <Nav.Link onClick={() => navigate("/my-page")}>
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
                        ) : (
                            <Nav>
                                <Nav.Link onClick={() => navigate("/register")}>
                                    회원가입
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/login")}>
                                    로그인
                                </Nav.Link>
                            </Nav>
                        )}
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
            </Navbar>

            <Outlet />
        </div>
    );
}
