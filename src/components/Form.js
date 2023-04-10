import { useContext } from "react";
import { FormStateContext } from "../App";
import { useParams } from "react-router-dom";

export const Form = (props) => {
    const formData = useContext(FormStateContext);
    const { id } = useParams();
    console.log(id);

    return (
        <div>
            {JSON.stringify(formData.filter((it) => (it.id == id ? it : null)))}
            asdfasdf
        </div>
    );
};
