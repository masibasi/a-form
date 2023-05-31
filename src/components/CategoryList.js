import { useContext, useEffect, useState } from "react";
import { PostContext } from "../services/post/post.context";
import { HotCategory } from "./SurveyList/SurveyListItem";

export const CategoryList = () => {
    const { GetAllCategory } = useContext(PostContext);
    const [categoryList, setCategoryList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getData = () => {
        GetAllCategory().then((res) => setCategoryList(res));
    };
    useEffect(() => {
        getData();
    }, []);

    return categoryList == undefined ? null : (
        <>
            {categoryList.map((it) => (
                <HotCategory category={it.categoryType} key={it.categoryPk} />
            ))}
        </>
    );
};
