import { render, shallow } from "enzyme";

import * as React from "react";

import Square from "../../src/components/Square";

describe("Square Component", () => {
  it("should create a container", () => {
    const container = shallow(
      <Square value="X" onClick={() => 0} />);

    expect(container.length).toBeGreaterThan(0);
    expect(container.text()).toBe("X");
  });
});
