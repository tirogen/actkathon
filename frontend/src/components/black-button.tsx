import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const BlackButton = withStyles(() => ({
    root: {
        color: '#fff',
        backgroundColor: '#000',
        padding: 10,
        fontSize: 15,
    },
}))(Button);
