/** @jsx jsx */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { VisualizationColors } from "../_Themes";

function Chip({ tag, index }) {
  return (
    <span
      css={css`
        display: inline-block;
        padding: 0 2em;
        height: 2em;
        line-height: 2em;
        border-radius: 1em;
        background-color: ${VisualizationColors.victoryColors[
          index % VisualizationColors.victoryColors.length
        ]};
        margin: 0.5em 0.5em;
        font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
        font-weight: bold;
        color: white;
        cursor: pointer;
      `}
    >{`#${tag}`}</span>
  );
}

Chip.propTypes = {
  tag: PropTypes.string,
  index: PropTypes.number
};

export default Chip;
