import { useState } from "react";
import "./AvsB.css";
export const AvsB = ({ data }) => {
    const [checked, setChecked] = useState(null);
    return (
        <div className="AvsB">
            <div className="AvsBSelections">
                <div className="Selection">
                    <div className="ABTitle">{data.questions[0].description}</div>
                    <div className={`imgWrapper hvr-float ${checked === "A" ? "checked" : null}`} onClick={() => setChecked("A")}>
                        <img className="ABImage" src={data.questions[0].imageUrl} alt="" />
                    </div>
                </div>
                <div className="VS pulse">VS</div>
                <div className="Selection">
                    <div className="ABTitle">{data.questions[1].description}</div>
                    <div className={`imgWrapper hvr-float ${checked === "B" ? "checked" : null}`} nClick={() => setChecked("B")}>
                        <img className="ABImage" src={data.questions[1].imageUrl} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};
