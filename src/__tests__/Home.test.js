import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home/Home";

describe("Home 컴포넌트", () => {
  it("제목과 버튼이 올바르게 렌더링되는지 확인", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // DOM에 특정 텍스트가 있는지 확인합니다.
    // 첫 번째 expect 문은 "The Next Generation of Survey"라는 텍스트가 화면에 있는지 확인
    const titleElement = screen.getByText(/The Next Generation of Survey/i);
    expect(titleElement).toBeInTheDocument();

    // 두 번째 expect 문은 "Do Survey"라는 텍스트를 가진 버튼 엘리먼트가 화면에 있는지 확인
    const buttonElement = screen.getByRole("button", { name: /Do Survey/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
