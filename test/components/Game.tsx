import { shallow } from "enzyme";

import * as React from "react";

import Game from "../../src/components/Game";

describe("Game Component", () => {
  it("should create a container", () => {
    const container = shallow(
      <Game />);

    expect(container.length).toBeGreaterThan(0);
  });
});
