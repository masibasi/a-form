import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import CreateSurveyForm from "./components/CreateSurveyForm";
import About from "./components/About";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="create" element={<CreateSurveyForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
