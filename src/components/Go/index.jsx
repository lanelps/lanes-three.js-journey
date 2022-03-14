import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Link } from "gatsby";

/**
 * -----------------------------------------------------------------------------
 * The component through which all links are be passed. Accepts a parameters
 * obj for appending attributes onto the resulting URL string.
 * @param  {props} props Noted in PropTypes below
 * @return {node}        The resulting link node with mutated URLs
 */
const Go = ({
  _css,
  children,
  className,
  debug,
  onClick,
  newTab,
  parameters,
  to
}) => {
  const [parameterString, setParameterString] = useState(``);

  /**
   * ---------------------------------------------------------------------------
   * useEffect [parameters]
   * Set URL parameters based on object data from the calling component.
   */
  useEffect(() => {
    if (!parameters || !Object.keys(parameters)?.[0]) {
      return;
    }

    let newParameterString = ``;

    Object.keys(parameters).forEach((key) => {
      const parameter = parameters[key];

      if (!key || typeof key !== `string` || key === ``) {
        // eslint-disable-next-line no-console
        console.error(`[Go.jsx] Invalid key: ${key}`);
        return;
      }

      if (!parameter || typeof parameter !== `string` || parameter === ``) {
        // eslint-disable-next-line no-console
        console.error(`[Go.jsx] Invalid parameter: ${parameter}`);
        return;
      }

      newParameterString += `${
        newParameterString === `` ? `?` : `&`
      }${key}=${parameter}`;
    });

    setParameterString(newParameterString);
  }, [parameters]);

  /**
   * ---------------------------------------------------------------------------
   * useEffect [parameterString]
   * Debug the parameterString being set for any particular component instance.
   */
  useEffect(() => {
    if (debug) {
      // eslint-disable-next-line no-console
      console.log(`parameters: `, parameterString);
    }
  }, [parameterString]);

  //

  const href = `${to.slice(-1) === `/` ? to : `${to}/`}${
    parameterString !== `` ? parameterString : ``
  }`;

  return (
    <>
      {(!href.includes(`http`) &&
        !href.includes(`mailto`) &&
        !href.includes(`tel`) && (
          <Link
            to={href}
            className={className}
            css={css`
              display: inline-block;
              ${_css};
            `}
            onClick={onClick}
          >
            {children}
          </Link>
        )) || (
        <a
          href={href}
          onClick={onClick}
          rel="noopener noreferrer"
          target="_blank"
          className={className}
          css={css`
            display: inline-block;
            ${_css};
          `}
        >
          {children}
        </a>
      )}
    </>
  );
};

Go.defaultProps = {
  _css: {},
  className: ``,
  debug: false,
  onClick: () => {},
  newTab: false,
  parameters: null
};

Go.propTypes = {
  _css: PropTypes.shape({}),
  className: PropTypes.string,
  debug: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  newTab: PropTypes.bool,
  parameters: PropTypes.shape({}),
  to: PropTypes.string.isRequired
};

export default Go;
