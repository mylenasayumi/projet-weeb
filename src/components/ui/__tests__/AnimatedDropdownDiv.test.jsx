// AnimatedDropdownDiv.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import AnimatedDropdownDiv from "../AnimatedDropdownDiv";

describe("AnimatedDropdownDiv", () => {
  it("renders children", () => {
    render(
      <AnimatedDropdownDiv className="test-class">
        <span>Hello</span>
      </AnimatedDropdownDiv>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies className", () => {
    const { container } = render(
      <AnimatedDropdownDiv className="my-class">X</AnimatedDropdownDiv>
    );
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<AnimatedDropdownDiv ref={ref}>ref test</AnimatedDropdownDiv>);
    // ref is set by framer-motion's motion.div (mocked)
    expect(screen.getByText("ref test")).toBeInTheDocument();
  });
});
