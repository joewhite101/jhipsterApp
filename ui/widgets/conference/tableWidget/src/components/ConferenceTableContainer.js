import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import ConferenceTable from 'components/ConferenceTable';
import conferencesGet from 'api/conferences';
import Notification from 'components/common/Notification';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

export default class ConferenceTableContainer extends PureComponent {
  theme = createMuiTheme();

  state = {
      conferences: [],
      notificationStatus: null,
      notificationMessage: null,
  };

  async componentDidMount() {
    try {
      const json = await conferencesGet();

      const conferences = json.map(conference => ({
        ...conference,
      }));
      this.setState({
        conferences,
        notificationStatus: null,
        notificationMessage: null,
      });
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification = () => {
    this.setState({error: null});
  };

  handleError(err) {
    const {onError} = this.props;
    onError(err);
    this.setState({
      notificationStatus: 'error',
      notificationMessage: i18next.t('common.couldNotFetchData'),
    });
  }

  render() {
    const {notificationStatus, notificationMessage, conferences} = this.state;
    const {onSelect} = this.props;
    return (
      <ThemeProvider theme={this.theme}>
        <ConferenceTable conferences={conferences} onSelect={onSelect}/>
        <Notification
          status={notificationStatus}
          message={notificationMessage}
          onClose={this.closeNotification}
        />
      </ThemeProvider>
    );
  }
}

ConferenceTableContainer.propTypes = {
  onError: PropTypes.func,
  onSelect: PropTypes.func,
};

ConferenceTableContainer.defaultProps = {
  onError: () => {
  },
  onSelect: () => {
  },
};
