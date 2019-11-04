import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import conferenceType from 'components/__types__/conference';

const styles = {
    root: {
        cursor: 'pointer',
    },
};

const ConferenceTable = ({ classes, conferences, onSelect }) => {
    const tableRows = conferences.map(conference => (
        <TableRow
            hover
            className={classes.root}
            key={conference.id}
            onClick={() => onSelect(conference)}
        >
            <TableCell><span>{conference.name}</span></TableCell>
            <TableCell><span>{conference.location}</span></TableCell>
        </TableRow>
    ));

    return (conferences.length ? (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <span>{ i18next.t('entities.conference.name') }</span>
                    </TableCell>
                    <TableCell>
                        <span>{ i18next.t('entities.conference.location') }</span>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { tableRows }
            </TableBody>
        </Table>
    ) : (
        i18next.t("entities.conference.noItems")
    ));
};

ConferenceTable.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }),
    conferences: conferenceType,
    onSelect: PropTypes.func,
};

ConferenceTable.defaultProps = {
    classes: {
        root: '',
    },
    onSelect: () => {},
};

export default withStyles(styles)(ConferenceTable);
