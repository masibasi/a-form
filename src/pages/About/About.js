import React from "react";
import { FaGithub } from "react-icons/fa";
import Logo2 from "../../assets/images/logo2.png";
import "./About.css";
import desk1 from "../../assets/images/desk1.png";
import x_icon from "../../assets/images/x_icon.png";
import check from "../../assets/images/check1.png";

export default function About() {
    return (
        <div className="About">
            <div className="page1">
                <img src={Logo2} alt="" />
                <h4>
                    <span className="A">A</span>mazing Form <br />
                    <span className="A">A</span>utomatical Form <br /> By team{" "}
                    <span className="A">A</span>CCELER !
                </h4>
            </div>{" "}
            <div className="page2">
                <div className="container1">
                    <h4>
                        <span className="Consideration">
                            어떤 기능들을 고려해야 설문 제작자를 위한
                        </span>
                        <br />
                        <span className="Consideration">
                            서비스를 만들 수 있을지 고민했습니다
                        </span>
                    </h4>
                    <div>
                        <img src={desk1} alt="" />
                    </div>
                </div>
                <div className="container2">
                    <div className="sentence1">
                        <div className="sen1_subcontainer1">
                            <img src={x_icon} alt="" />
                            <span className="problem1">
                                "설문 문항을 일일이 만들어야 해요"
                            </span>
                        </div>
                        <div className="sen1_subcontainer2">
                            <span className="hope1">
                                설문 제작이 더 간편하고 자동화가 되었으면
                                좋겠습니다
                            </span>
                        </div>
                    </div>

                    <div className="sentence2">
                        <div className="sen2_subcontainer1">
                            <img src={x_icon} alt="" />
                            <span className="problem1">
                                "설문 결과가 쉽게 파악 되었으면 좋겠어요"
                            </span>
                        </div>
                        <div className="sen2_subcontainer2">
                            <span className="hope1">
                                설문 결과를 요약하고 경향성을 확인하는 방법이
                                간단해졌으면 좋겠습니다
                            </span>
                        </div>
                    </div>

                    <div className="sentence3">
                        <div className="sen3_subcontainer1">
                            <img src={x_icon} alt="" />
                            <span className="problem1">
                                "설문이 응답자들에게 어떻게 보일까요"
                            </span>
                        </div>
                        <div className="sen3_subcontainer2">
                            <span className="hope1">
                                응답자들이 대답하기에 적절한 질문인지를 확인하면
                                설문 응답률을 높일 수 있을 것 같습니다
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page3">
                <div className="goal">
                    <span>
                        A-Form의 목표는 설문 조사 생성 및 분석 프로세스를
                        <br />
                        단순화하고 능률화하면서 설문 조사 제작자와 응답자 간의
                        <br />
                        참여와 피드백을 높이는 것입니다
                    </span>
                </div>

                <div className="container1">
                    <div className="solution1">
                        <div className="sol1_subcontainer1">
                            <img src={check} alt="" />
                            <span className="solName">Auto Form</span>
                        </div>
                        <div className="sol1_subcontainer2">
                            <span className="hope1">
                                AI 기반 설문조사 자동 생성 기능을
                                <br />
                                제공하여 설문조사 작성에 소요되는
                                <br />
                                시간과 노력을 줄입니다.
                            </span>
                        </div>
                    </div>

                    <div className="solution2">
                        <div className="sol2_subcontainer1">
                            <img src={check} alt="" />
                            <span className="solName">Auto Form</span>
                        </div>
                        <div className="sol1_subcontainer2">
                            <span className="hope1">
                                주관식 답변 질문을 포함하여 설문조사
                                <br />
                                결과의 자동 요약을 제공하여 설문조사
                                <br />
                                결과의 정확성과 신뢰성을 향상시킵니다.
                            </span>
                        </div>
                    </div>

                    <div className="solution3">
                        <div className="sol3_subcontainer1">
                            <img src={check} alt="" />
                            <span className="solName">Auto Form</span>
                        </div>
                        <div className="sol1_subcontainer2">
                            <span className="hope1">
                                커뮤니티 기능을 제공하여 설문조사
                                <br />
                                제작자와 응답자 간의 참여 및 피드백을
                                <br />
                                촉진하여 응답률을 높이고 고품질
                                <br />
                                데이터 수집을 보장합니다.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="developed-by">
                Developed by: <a href="https://acceler.kr">Team ACCELER</a>
                <FaGithub
                    size={24}
                    href="https://github.com/KEA-ACCELER/a-form"
                />
            </div>
        </div>
    );
}
