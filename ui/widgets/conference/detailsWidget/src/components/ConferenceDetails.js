import React from 'react';
import i18next from 'i18next';
import Box from '@material-ui/core/Box';

import conferenceType from 'components/__types__/conference';
import ConferenceFieldTable from 'components/conference-field-table/ConferenceFieldTable';

const ConferenceDetails = ({ conference }) => {
  return (
    <Box>
      <h3>
        {i18next.t('common.widgetName', {
          widgetNamePlaceholder: 'Conference',
        })}
      </h3>
      <ConferenceFieldTable conference={conference} />
    </Box>
  );
};

ConferenceDetails.propTypes = {
  conference: conferenceType,
};

ConferenceDetails.defaultProps = {
  conference: {},
};

export default ConferenceDetails;
