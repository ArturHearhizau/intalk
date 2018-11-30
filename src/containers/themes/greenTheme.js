import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import indigo from 'material-ui/colors/indigo';

export default {
    palette: {
        primary: {
            // light: indigo[300],
            // main: indigo[500],
            // dark: indigo[700],
            light: green[300],
            main: green[500],
            dark: green[700],
            contrastText: '#fff'
        },
        secondary: {
            light: orange[300],
            main: orange['A700'],
            dark: orange[700],
        }
    },
    status: {
        danger: 'orange',
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize',
            color: 'white'
        },
    },
};
