import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import i18next from 'i18next';
import { apiConferencePost } from 'api/conferences';
import ConferenceForm from 'components/ConferenceForm';
import Notification from 'components/common/Notification';

class ConferenceAddFormContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
    notificationMessage: null,
  };

  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeNotification() {
    this.setState({ notificationMessage: null, notificationStatus: null });
  }

  async handleSubmit(conference) {
    try {
      const createdConference = await apiConferencePost(conference);
      const { onCreate } = this.props;
      onCreate(createdConference);

      this.setState({
        notificationMessage: i18next.t('common.dataSaved'),
        notificationStatus: 'success',
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err) {
    const { onError } = this.props;
    onError(err);
    this.setState({
      notificationMessage: i18next.t('errors.dataLoading'),
      notificationStatus: 'error',
    });
  }

  render() {
    const { notificationMessage, notificationStatus } = this.state;
    return (
      <ThemeProvider theme={this.theme}>
        <ConferenceForm onSubmit={this.handleSubmit} />
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </ThemeProvider>
    );
  }
}

ConferenceAddFormContainer.propTypes = {
  onError: PropTypes.func,
  onCreate: PropTypes.func,
};

ConferenceAddFormContainer.defaultProps = {
  onError: () => {},
  onCreate: () => {},
};

export default ConferenceAddFormContainer;
