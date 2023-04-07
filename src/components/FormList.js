import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { FormStateContext } from "../App";

export const FormList = () => {
    const navigation = useNavigate();
    const formData = useContext(FormStateContext);
    return (
        <div className="formList">
            {formData.map((it) => (
                <div key={it.id} className="formListElem">
                    Title : {it.formTitle}
                </div>
            ))}
        </div>
    );
};
