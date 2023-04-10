import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormStateContext } from "../App";

export const FormList = () => {
    const formData = useContext(FormStateContext);
    const navigate = useNavigate();

    return (
        <div className="formList">
            {formData == [] ? null : <h3>Form List</h3>}
            {formData.map((it) => (
                <div
                    key={it.id}
                    className="formListElem"
                    onClick={() => navigate(`form/${it.id}`)}
                >
                    Title : {it.formTitle}
                </div>
            ))}
        </div>
    );
};
