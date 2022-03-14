import React from "react";
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { remToPx, MEDIA_QUERIES } from "~utils/helpers";

export const GRID_COLUMNS = 12;
export const GRID_MAX_WIDTH_PX = 1440;

export const GRID_GAP_REM = 1.5;
export const GRID_MOBILE_GAP_REM = 0.5;
export const GRID_GAP_PX = remToPx(GRID_GAP_REM);

export const GRID_PADDING_REM = 1.75;
export const GRID_MOBILE_PADDING_REM = 0.9375;
export const GRID_PADDING_PX = remToPx(GRID_GAP_REM);

/**
 * -----------------------------------------------------------------------------
 * Receive a CSS grid wrapper to style guide spec.
 * @param  {node}   children  Inner JSX
 * @param  {string} node      Wrapper JSX node type (defaults to <div>)
 * @param  {object} _css      Additional Emotion/Tailwind CSS
 * @return {node}             The resulting CSS grid node
 */
const Grid = ({ _css, children, node, half }) => {
  const G = `${node}`;

  return (
    <G
      css={[
        css`
          width: 100%;
          position: relative;
          display: grid;
          margin: 0 auto;
          max-width: ${GRID_MAX_WIDTH_PX}px;
          grid-template-columns: ${half
            ? `366px`
            : `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`};
          gap: 0 ${GRID_MOBILE_GAP_REM}rem;
          padding: 0 ${GRID_MOBILE_PADDING_REM}rem;

          ${MEDIA_QUERIES.desktop} {
            gap: 0 ${GRID_GAP_REM}rem;
            padding: 0 ${GRID_PADDING_REM}rem;
          }

          ${half &&
          `justify-content: center;
          align-items: center;`}
        `,
        _css
      ]}
    >
      {children}
    </G>
  );
};

Grid.defaultProps = {
  _css: {},
  half: false,
  node: `div`
};
Grid.propTypes = {
  _css: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  half: PropTypes.bool,
  node: PropTypes.string
};

export default Grid;
