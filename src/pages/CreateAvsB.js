import React, { useState } from "react";
import "./CreateAvsB.css";
import { Button } from "react-bootstrap";
export const CreateAvsB = () => {
    const [formTitle, setFormTitle] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [A, setA] = useState("");
    const [B, setB] = useState("");
    const [ADesc, setADesc] = useState("");
    const [BDesc, setBDesc] = useState("");
    return (
        <div className="CreateAvsB">
            Create AvsB
            <div className="text-wrapper">
                <input
                    className="surveyTitle"
                    type="text"
                    value={formTitle}
                    placeholder="Create Form"
                    onChange={(e) => {
                        setFormTitle(e.target.value);
                    }}
                />
                <textarea
                    className="surveyDesc"
                    type="text"
                    value={formDesc}
                    placeholder="Form Description"
                    onChange={(e) => {
                        setFormDesc(e.target.value);
                    }}
                />
                <div className="AvsBWrapper">
                    <div className="ABContent">
                        <div className="ABImage">image</div>
                        <input
                            value={A}
                            placeholder="A"
                            onChange={(e) => {
                                setA(e.target.value);
                            }}
                        />
                        <input
                            value={ADesc}
                            placeholder="Description"
                            onChange={(e) => {
                                setADesc(e.target.value);
                            }}
                        />
                    </div>
                    <div className="ABContent">
                        <div className="ABImage">image</div>
                        <input
                            value={B}
                            placeholder="B"
                            onChange={(e) => {
                                setB(e.target.value);
                            }}
                        />
                        <input
                            value={BDesc}
                            placeholder="Description"
                            onChange={(e) => {
                                setBDesc(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <Button variant="outline-primary">Submit</Button>
            </div>
        </div>
    );
};
