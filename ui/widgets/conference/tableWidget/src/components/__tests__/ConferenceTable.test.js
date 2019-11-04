import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18nMock';
import conferenceMocks from 'components/__mocks__/conferenceMocks';
import ConferenceTable from 'components/ConferenceTable';

describe('ConferenceTable', () => {
  it('shows conferences', () => {
    const { getByText } = render(<ConferenceTable conferences={conferenceMocks} />);
    expect(getByText('Expedita occaecati quia vero atque voluptates. Velit eveniet commodi. Doloribus eligendi facere vel. At laborum aut sit. Eius voluptatem expedita nobis aut et sunt. Eos ea quisquam magnam.')).toBeInTheDocument();
    expect(getByText('Similique est atque dolorem illum. Accusantium omnis ut sint magni. Culpa sequi esse soluta asperiores. Dolorem rerum velit suscipit sunt eos maiores laboriosam. In ut soluta sit voluptates eaque illo ullam enim quidem.')).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable conferences={[]} />);
    expect(queryByText('Expedita occaecati quia vero atque voluptates. Velit eveniet commodi. Doloribus eligendi facere vel. At laborum aut sit. Eius voluptatem expedita nobis aut et sunt. Eos ea quisquam magnam.')).not.toBeInTheDocument();
    expect(queryByText('Similique est atque dolorem illum. Accusantium omnis ut sint magni. Culpa sequi esse soluta asperiores. Dolorem rerum velit suscipit sunt eos maiores laboriosam. In ut soluta sit voluptates eaque illo ullam enim quidem.')).not.toBeInTheDocument();

    expect(queryByText('entities.conference.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <ConferenceTable conferences={conferenceMocks} onSelect={onSelectMock} />
    );
    fireEvent.click(getByText('Expedita occaecati quia vero atque voluptates. Velit eveniet commodi. Doloribus eligendi facere vel. At laborum aut sit. Eius voluptatem expedita nobis aut et sunt. Eos ea quisquam magnam.'));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
