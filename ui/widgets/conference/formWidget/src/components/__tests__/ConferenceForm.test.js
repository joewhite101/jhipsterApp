import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import 'components/__mocks__/i18nMock';
import conferenceMock from 'components/__mocks__/conferenceMocks';
// import { mockConferenceWithDateStrings } from 'components/__mocks__/conferenceMocks';
import ConferenceForm from 'components/ConferenceForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Conference Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <ConferenceForm conference={conferenceMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.conference.name').value).toBe(
      'Expedita occaecati quia vero atque voluptates. Velit eveniet commodi. Doloribus eligendi facere vel. At laborum aut sit. Eius voluptatem expedita nobis aut et sunt. Eos ea quisquam magnam.'
    );
  });
});
