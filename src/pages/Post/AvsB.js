import { useContext, useEffect, useState } from "react";
import "./AvsB.css";
import { Button, ProgressBar } from "react-bootstrap";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
export const AvsB = ({ data, refresh }) => {
    const [checked, setChecked] = useState(null);
    const { PostSurveyAnswer, GetStats } = useContext(SurveyContext);
    const { userToken } = useContext(AuthenticationContext);
    const [stats, setStats] = useState(null);
    const submitAnswer = async () => {
        const surveyAnswer = {
            answers: checked,
        };
        const surveyId = data._id;
        console.log(surveyAnswer, surveyId, userToken);
        await PostSurveyAnswer(surveyAnswer, surveyId, userToken);
        const result = await GetStats(surveyId).then();
        setStats(result.statistics);
        refresh();
    };

    const onLoad = async () => {
        const result = await GetStats(data._id);
        result.statistics.sort((a, b) => {
            return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
        });
        setStats(result.statistics);
    };

    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() => {
        console.log("stats: ", stats);
    }, [stats]);

    return (
        <>
            {stats === null ? null : (
                <div className="AvsB">
                    <div className="AvsBSelections">
                        <div className="Selection">
                            <div className="ABTitle">{data.questions[0].description}</div>
                            <div className={`imgWrapper hvr-float`} onClick={() => setChecked("A")}>
                                <img className={`ABImage ${checked === "A" ? "checked" : null}`} src={data.questions[0].imageUrl} alt="" />
                            </div>

                            <div className="stats">
                                득표수 : {stats[0].count}, 비율 : {stats[0].percent}%
                            </div>
                        </div>
                        <div className="VS pulse">VS</div>
                        <div className="Selection">
                            <div className="ABTitle">{data.questions[1].description}</div>
                            <div className={`imgWrapper hvr-float `} onClick={() => setChecked("B")}>
                                <img className={`ABImage ${checked === "B" ? "checked" : null}`} src={data.questions[1].imageUrl} alt="" />
                            </div>
                            <div className="stats">
                                득표수 : {stats[1].count}, 비율 : {stats[1].percent}%
                            </div>
                        </div>
                    </div>
                    <div className="Statistics">
                        <ProgressBar>
                            <ProgressBar striped animated now={stats[0].percent} variant="success" key={1} />
                            <ProgressBar striped animated now={stats[1].percent} variant="danger" key={3} />
                        </ProgressBar>
                    </div>
                    <div className="buttonWrapper">
                        <Button variant={checked === null ? "primary" : "outline-primary"} disabled={checked === null ? true : false} onClick={checked === null ? null : submitAnswer}>
                            {checked === null ? "한 쪽을 선택해주세요!" : "투표하기"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
