import { shallow } from "enzyme";

import * as React from "react";

import Board from "../../src/components/Board";

describe("Board Component", () => {
    it("should create a container", () => {
        const squares = ["X", "X", "O", null, null, null, null, null];
        const container = shallow(
            <Board squares={squares} onClick={() => 0} />);

        expect(container.length).toBeGreaterThan(0);
    });
});
