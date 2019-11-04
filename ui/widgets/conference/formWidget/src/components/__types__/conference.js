import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
  location: PropTypes.string,
});

export const formValues = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  name: PropTypes.bool,
  location: PropTypes.bool,
});

export const formErrors = PropTypes.shape({
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
