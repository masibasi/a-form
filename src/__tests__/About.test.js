import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../pages/About/About";
import "intersection-observer";

describe("About 컴포넌트", () => {
  test("페이지1에서 비디오가 렌더링되는지 확인", () => {
    render(<About />);

    const videoElement = screen.getByTestId("video");
    expect(videoElement).toBeInTheDocument();
  });
});
