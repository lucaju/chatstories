import { SvgIcon } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const YoutubeIcon = ({ fontSize }) => {
  return (
    <>
      <SvgIcon viewBox="0 0 24 24" fontSize={fontSize} titleAccess="YouTube">
        <path
          d="m.522 17.874c.49 1.738 1.989 2.056 2.089 2.117 2.467.672 16.295.674 18.799 0 1.715-.496 2.03-2.017 2.089-2.117.653-3.474.696-8.003-.03-11.945l.03.196c-.49-1.738-1.989-2.056-2.089-2.117-2.434-.661-16.298-.686-18.799 0-1.715.497-2.03 2.017-2.089 2.117-.699 3.651-.734 7.84 0 11.749zm9.086-2.223v-7.293l6.266 3.652z"
          fill="#e53935"
        />
      </SvgIcon>
    </>
  );
};

YoutubeIcon.defaultProps = {
  fontSize: 'large',
};

YoutubeIcon.propTypes = {
  fontSize: PropTypes.string,
};

export default YoutubeIcon;
