import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { compose } from 'recompose'; // TODO: REMOVE compose/recompose

import { formValues, formTouched, formErrors } from 'components/__types__/conference';

const styles = theme => ({
  root: {
    margin: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
});

const ConferenceForm = props => {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const getHelperText = field => (errors[field] && touched[field] ? errors[field] : '');

  return (
      <form onSubmit={handleSubmit} className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="conference-name"
              error={errors.name && touched.name}
              helperText={getHelperText('name')}
              className={classes.textField}
              onBlur={handleBlur}
              value={values.name}
              name="name"
              onChange={handleChange}
              label={i18next.t('entities.conference.name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="conference-location"
              error={errors.name && touched.name}
              helperText={getHelperText('location')}
              className={classes.textField}
              onBlur={handleBlur}
              value={values.location}
              name="location"
              onChange={handleChange}
              label={i18next.t('entities.conference.location')}
            />
          </Grid>
          <Button type="submit" color="primary" data-testid="submit-btn">
            {i18next.t('common.save')}
          </Button>
        </Grid>
      </form>
  );
};

ConferenceForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    textField: PropTypes.string,
    submitButton: PropTypes.string,
  }),
  values: formValues,
  touched: formTouched,
  errors: formErrors,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

ConferenceForm.defaultProps = {
  classes: {},
  values: {},
  touched: {},
  errors: {},
};

const emptyConference = {
  name: '',
  location: '',
};

const validationSchema = yup.object().shape({
  name: yup.string(),
  location: yup.string(),
});

const formikBag = {
  mapPropsToValues: ({ conference }) => conference || emptyConference,

  enableReinitialize: true,

  validationSchema,

  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },

  displayName: 'ConferenceForm',
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withFormik(formikBag)
)(ConferenceForm);
