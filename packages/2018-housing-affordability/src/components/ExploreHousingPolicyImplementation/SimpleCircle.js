import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { VictoryTheme } from "@hackoregon/component-library";

function SimpleCircle({ selected, index }) {
  const width = selected ? "18px" : "10px";
  const padding = selected ? "9px" : "5px";

  return (
    <svg
      css={css`
        padding-right: ${padding};
      `}
      viewBox="0 0 10 10"
      width={width}
    >
      <circle cx="5" cy="5" r="5" fill={VictoryTheme.group.colorScale[index]} />
    </svg>
  );
}

SimpleCircle.propTypes = {
  selected: PropTypes.bool,
  index: PropTypes.number
};

export default SimpleCircle;
