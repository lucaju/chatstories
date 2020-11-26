import {
  Box,
  Button,
  Card,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useField } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 330,
    maxHeight: 140,
  },
  marginTop: { marginTop: theme.spacing(1) },
  hide: { display: 'none' },
  show: { display: 'block' },
  dropzone: {
    borderWidth: '2px',
    maxWidth: 330,
    minHeight: 140,
    backgroundColor: theme.palette.background.default,
  },
  dropzoneText: { fontSize: 16 },
  icon: { width: 40 },
}));

const FeaturedImage = ({ name }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [file, setFile] = useState(null);
  const [showDropzone, setShowDropzone] = useState(null);

  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    setImageToDisplay(value);
    setShowDropzone(value !== '' ? false : true);
    return () => {};
  }, []);

  const handleDropZoneChange = (files) => {
    console.log('Files:', files);
    setFile(files[0].file);
    const image = files[0].data;
    setValue(files[0].file.name);
    setImageToDisplay(image);
    setShowDropzone(false);
  };

  const handleRemoveImage = () => {
    setImageToDisplay(null);
    setValue('');
    setShowDropzone(true);
  };

  return (
    <Box p={2} mt={1} width={'100%'}>
      <Typography variant="h6" gutterBottom>
        Featured Image
      </Typography>
      {imageToDisplay && (
        <>
          <Card className={classes.Card}>
            <CardMedia
              component="img"
              image={
                file
                  ? imageToDisplay
                  : `/assets/stories/images/${imageToDisplay}`
              }
            />
          </Card>
          <Button
            className={classes.marginTop}
            size="small"
            onClick={handleRemoveImage}
          >
            Remove featured image
          </Button>
        </>
      )}

      <Box className={showDropzone ? classes.show : classes.hide}>
        <DropzoneAreaBase
          classes={{
            root: classes.dropzone,
            icon: classes.icon,
          }}
          acceptedFiles={['image/*']}
          dropzoneText={'Drag and drop an image here or click'}
          dropzoneParagraphClass={classes.dropzoneText}
          filesLimit={1}
          showAlerts={['error']}
          onAdd={(files) => handleDropZoneChange(files)}
          // onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
          showPreviewsInDropzone={false}
        />
      </Box>
    </Box>
  );
};

FeaturedImage.propTypes = {
  name: PropTypes.string,
};

export default FeaturedImage;