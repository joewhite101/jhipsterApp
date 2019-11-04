import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import conferenceMocks from 'components/__mocks__/conferenceMocks';
import conferencesGet from 'api/conferences';
import 'components/__mocks__/i18nMock';
import ConferenceTableContainer from 'components/ConferenceTableContainer';

jest.mock('api/conferences');

describe('ConferenceTableContainer', () => {
    const errorMessageKey = 'common.couldNotFetchData';

    it('calls API', async () => {
        conferencesGet.mockImplementation(() => Promise.resolve(conferenceMocks));
        const { queryByText } = render(<ConferenceTableContainer />);

        await wait(() => {
            expect(conferencesGet).toHaveBeenCalledTimes(1);
            expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
        });
    });

    it('shows an error if the API call is not successful', async () => {
        const onErrorMock = jest.fn();
        conferencesGet.mockImplementation(() => Promise.reject());
        const { getByText } = render(<ConferenceTableContainer onError={onErrorMock} />);

        await wait(() => {
            expect(onErrorMock).toHaveBeenCalledTimes(1);
            expect(getByText(errorMessageKey)).toBeInTheDocument();
        });
    });
});
