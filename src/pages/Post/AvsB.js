import { useState } from "react";
import "./AvsB.css";
import { Button, ProgressBar } from "react-bootstrap";
export const AvsB = ({ data }) => {
    const [checked, setChecked] = useState(null);
    return (
        <div className="AvsB">
            <div className="AvsBSelections">
                <div className="Selection">
                    <div className="ABTitle">{data.questions[0].description}</div>
                    <div className={`imgWrapper hvr-float`} onClick={() => setChecked("A")}>
                        <img className={`ABImage ${checked === "A" ? "checked" : null}`} src={data.questions[0].imageUrl} alt="" />
                    </div>
                </div>
                <div className="VS pulse">VS</div>
                <div className="Selection">
                    <div className="ABTitle">{data.questions[1].description}</div>
                    <div className={`imgWrapper hvr-float `} onClick={() => setChecked("B")}>
                        <img className={`ABImage ${checked === "B" ? "checked" : null}`} src={data.questions[1].imageUrl} alt="" />
                    </div>
                </div>
            </div>
            <div className="Statistics">
                <ProgressBar>
                    <ProgressBar striped animated now={50} variant="success" key={1} />
                    <ProgressBar striped animated now={50} variant="danger" key={3} />
                </ProgressBar>
            </div>
            <div className="buttonWrapper">
                <Button variant={checked === null ? "primary" : "outline-primary"} disabled={checked === null ? true : false}>
                    {checked === null ? "한 쪽을 선택해주세요!" : "투표하기"}
                </Button>
            </div>
        </div>
    );
};
