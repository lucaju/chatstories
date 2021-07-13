import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import React, { FC } from 'react';
import ReactPlayer from 'react-player/youtube';
import { ActivityProps } from './Card';

interface ContentDialogProps {
  onClose: (value: string) => void;
  content: ActivityProps | undefined;
}

const ContentDialog: FC<ContentDialogProps> = ({ onClose, content }) => {
  const open = !!content;
  const { link } = content ?? {};

  const theme = useTheme();
  const isMobileSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog maxWidth={false} onClose={onClose} open={open} sx={{ overflow: 'hidden' }}>
      <ReactPlayer
        url={link}
        width={isMobileSM ? 480 : 640}
        height={isMobileSM ? 270 : 360}
      />
    </Dialog>
  );
};

export default ContentDialog;
