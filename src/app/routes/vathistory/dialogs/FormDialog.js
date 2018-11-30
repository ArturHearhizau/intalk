import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import IntlMessages from 'util/IntlMessages';


export default class FormDialog extends React.Component {

  state = {
    email: ''
  }

  handlerChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Dialog
          fullWidth
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <IntlMessages id="vathist.dialog.title" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <IntlMessages id="vathist.dialog.descr" />
            </DialogContentText>
            <TextField
              value={this.state.email}
              onChange={this.handlerChange('email')}
              autoFocus
              margin="dense"
              id="name"
              label={<IntlMessages id="vathist.dialog.emailAddress" />}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              <IntlMessages id="vathist.dialog.cancel" />
            </Button>
            <Button
              onClick={() => this.props.handleSend(this.state.email)}
              color="primary"
            >
              <IntlMessages id="vathist.dialog.send" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}