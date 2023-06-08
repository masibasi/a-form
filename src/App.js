import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import CreateSurvey from "./pages/CreateSurvey/CreateSurvey";
import Survey from "./pages/Survey/Survey";
import About from "./pages/About/About";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import { CreateAvsB } from "./pages/CreateAvsB/CreateAvsB";
import { Community } from "./pages/Community/Community";
import { Post } from "./pages/Post/Post";
import LoginForm from "./pages/LoginForm/LoginForm";
import Mypage from "./pages/Mypage/Mypage";
import Mypage_setting from "./pages/Mypage/Mypage_setting";
import MyTemplatePage from "./pages/Mypage/MyTemplatePage";
import MyPostedSurveysPage from "./pages/Mypage/MyPostedSurveysPage";
import MyAnsweredSurveysPage from "./pages/Mypage/MyAnsweredSurveysPage";
import AllPostList from "./pages/Community/AllPostList";

import "./App.css";
import "./hover.css";
import "animate.css";
import "./animation/animations.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { SurveyContextProvider } from "./services/survey/survey.context";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";
import { ToastContainer, toast } from "react-toastify";
import { PostContextProvider } from "./services/post/post.context";
import { AIContextProvider } from "./services/ai/ai.context";
import Statistics from "./pages/Post/Statistics/Statistics";
import { Search } from "./pages/Search/Search";

export const FormHandlingContext = React.createContext();

export const AuthContext = React.createContext();

function App() {
  return (
    <AuthenticationContextProvider>
      <SurveyContextProvider>
        <PostContextProvider>
          <AIContextProvider>
            <ToastContainer
              className="Toast"
              closeButton={false}
              position={toast.POSITION.TOP_CENTER}
              icon={false}
              pauseOnFocusLoss={false}
              autoClose={1000}
              pauseOnHover={false}
              hideProgressBar={true}
            />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="mypage" element={<Mypage />}>
                    <Route index element={<MyTemplatePage />} />
                    <Route path="template" element={<MyTemplatePage />} />
                    <Route path="posted" element={<MyPostedSurveysPage />} />
                    <Route path="answered" element={<MyAnsweredSurveysPage />} />
                  </Route>
                  <Route path="create" element={<CreateSurvey />} />
                  <Route path="survey/:id" element={<Survey />} />
                  <Route path="register" element={<RegisterForm />} />
                  <Route path="login" element={<LoginForm />} />
                  <Route path="community" element={<Community />} />
                  <Route path="search/:keyword" element={<Search />} />
                  <Route path="community/allpostlist" element={<AllPostList />} />
                  <Route path="createAvsB" element={<CreateAvsB />} />
                  <Route path="mypage_setting" element={<Mypage_setting />} />
                  <Route path="post/:postPk" element={<Post />} />
                  <Route path="post/:postPk/statistics" element={<Statistics />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AIContextProvider>
        </PostContextProvider>
      </SurveyContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
