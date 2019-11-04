import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import ConferenceDetails from 'components/ConferenceDetails';
import Notification from 'components/common/Notification';
import getConference from 'api/conference';

class ConferenceDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      conference: {},
      notificationStatus: null,
      notificationMessage: null,
    };

    this.theme = createMuiTheme();
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    const { id, onError } = this.props;

    if (id) {
      getConference({ id })
        .then(response => this.setState({
          notificationStatus: null,
          notificationMessage: null,
          conference: response
        }))
        .catch(e => {
          onError(e);
          this.setState({
            notificationStatus: 'error',
            notificationMessage: i18next.t('common.couldNotFetchData'),
          });
        })
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({
        loading: false,
        notificationStatus: 'error',
        notificationMessage: i18next.t('common.missingId'),
      });
    }
  }

  closeNotification() {
    this.setState({ error: null });
  }

  render() {
    const { conference, notificationStatus, notificationMessage, loading } = this.state;

    return (
      <ThemeProvider theme={this.theme}>
        {loading && i18next.t('common.loading')}
        {!loading && <ConferenceDetails conference={conference} />}
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </ThemeProvider>
    );
  }
}

ConferenceDetailsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  onError: PropTypes.func,
};

ConferenceDetailsContainer.defaultProps = {
  onError: () => {},
};

export default ConferenceDetailsContainer;
