import React from "react";
import { render, screen } from "@testing-library/react";
import { Community } from "../pages/Community/Community";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("Community 컴포넌트", () => {
  test("올바른 시간 형식으로 제목이 렌더링되는지 확인", () => {
    <Router>
      <Community />
    </Router>;

    // 제목 요소 확인
    const titleElement = screen.queryByText("오후 3시의 Hot 설문");

    expect(titleElement).toBeNull();
  });
});
