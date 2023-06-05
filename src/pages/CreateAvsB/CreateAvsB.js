import React, { useContext, useRef, useState } from "react";
import "./CreateAvsB.css";
import { Button } from "react-bootstrap";
import FadeIn from "../../animation/FadeIn";
import { SurveyContext } from "../../services/survey/survey.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ConfirmSurveyModal, LinkModal } from "../../components/Modal/ConfirmSurveyModal";
import { PostContext } from "../../services/post/post.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const CreateAvsB = () => {
    const [formTitle, setFormTitle] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [ADesc, setADesc] = useState("");
    const [BDesc, setBDesc] = useState("");
    const [imgFileA, setImgFileA] = useState();
    const [aPreview, setAPreview] = useState();
    const [imgFileB, setImgFileB] = useState();
    const [bPreview, setBPreview] = useState();
    const [surveyId, setSurveyId] = useState("");
    const [postPk, setPostPk] = useState("");
    const [saveIsLoading, setSaveIsLoading] = useState(false);

    //Context
    const { CreateAvsBSurvey, PostFiles } = useContext(SurveyContext);
    const { CreatePost, CreateCategory } = useContext(PostContext);
    const { userData } = useContext(AuthenticationContext);

    //Modal
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [linkModalShow, setLinkModalShow] = useState(false);
    const handleLinmodalClose = () => {
        setLinkModalShow(false);
        navigate("/", { replace: true });
    };

    const navigate = useNavigate();

    const checkFormComplete = () => {
        if (formTitle === "" || formDesc === "" || ADesc === "" || BDesc === "") {
            alert("모든 입력란을 채워주세요.");
            return false;
        } else if (imgFileA === undefined || imgFileB === undefined) {
            alert("사진 파일을 업로드해주세요.");
            return false;
        } else return true;
    };

    const toastPromise = async (promise) => {
        toast.promise(promise, {
            pending: "pending",
            success: {
                render() {
                    return `Complete!`;
                },
                onClose: () => {
                    setConfirmModalShow(true);
                    setSaveIsLoading(false);
                },
            },
            error: "rejected 🤯",
        });
    };

    const submitHandler = async () => {
        if (checkFormComplete() == false) {
            return;
        } else {
            // 폼이 다 채워지면 전송

            const url = await handleUploadFile();
            const newPost = {
                type: "AB",
                title: formTitle,
                description: formDesc,
                questions: [
                    {
                        imageUrl: url[0],
                        description: ADesc,
                    },
                    {
                        imageUrl: url[1],
                        description: BDesc,
                    },
                ],
            };
            console.log("newPost : ", newPost);
            setSaveIsLoading(true);
            await toastPromise(CreateAvsBSurvey(newPost));
        }
    };

    const handleUploadFile = async () => {
        const formData = new FormData();
        formData.append("files", imgFileA);
        formData.append("files", imgFileB);

        console.log(imgFileA);
        console.log(imgFileB);

        return await PostFiles(formData);
    };

    const createPostHandler = async (startDate, endDate, category) => {
        await CreatePost(formTitle, formDesc, surveyId, startDate, endDate, userData.userPk)
            .then((res) => {
                setPostPk(res.postPk);
                CreateCategory(category, res.postPk);
                setConfirmModalShow(false);
                setLinkModalShow(true);
            })
            .catch((err) => console.log(err));
    };

    const setPreviewImgA = (event) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setAPreview(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        setImgFileA(event.target.files[0]);
    };
    const setPreviewImgB = (event) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setBPreview(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        setImgFileB(event.target.files[0]);
    };

    const FormBtnWrapper = React.memo(() => {
        return (
            <div className="ButtonWrapper">
                <div className="SurveyBtnWrapper">
                    <Button className="submit-btn" type="submit" variant="outline-success" disabled={saveIsLoading} onClick={saveIsLoading ? null : () => submitHandler()}>
                        Save Form
                    </Button>

                    <Button className="delete-btn" type="submit" variant="outline-danger" onClick={() => navigate("/", { replace: true })}>
                        Delete Form
                    </Button>
                </div>
            </div>
        );
    });

    return (
        <div className="CreateAvsB">
            <ConfirmSurveyModal modalShow={confirmModalShow} handleModalClose={() => setConfirmModalShow(false)} onSubmit={createPostHandler} />
            <LinkModal modalShow={linkModalShow} handleModalClose={handleLinmodalClose} postPk={postPk} />
            <FadeIn className="surveyWrapper" childClassName="childClassName">
                <FormBtnWrapper />
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
                </div>
                <div className="AvsBWrapper">
                    <div className="ABContent">
                        <input
                            className="ABTitle"
                            value={ADesc}
                            placeholder="Description"
                            onChange={(e) => {
                                setADesc(e.target.value);
                            }}
                        />
                        <img className="ABImage" src={aPreview} alt="" />
                        <form>
                            <label className="ABImage-label" htmlFor="profileImg">
                                이미지 추가
                            </label>
                            <input onChange={setPreviewImgA} className="ABImage-input" type="file" accept="image/*" id="profileImg" />
                        </form>
                    </div>
                    <div className="ABContent">
                        <input
                            className="ABTitle"
                            value={BDesc}
                            placeholder="B"
                            onChange={(e) => {
                                setBDesc(e.target.value);
                            }}
                        />

                        <img className="ABImage" src={bPreview} alt="" />

                        <label className="ABImage-label" htmlFor="imgB">
                            이미지 추가
                        </label>
                        <form name="photo" encType="multipart/form-data">
                            <input onChange={setPreviewImgB} className="ABImage-input" type="file" accept="image/*" id="imgB" />
                        </form>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
};
