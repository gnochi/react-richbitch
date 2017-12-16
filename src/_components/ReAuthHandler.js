import React from 'react'
import {connect} from 'react-redux'
import {Dialog, TextField, FlatButton} from 'material-ui'
import {userActions} from "../_actions/userAction";

class ReAuthHandler extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: true,
            password: ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.reAuth = this.reAuth.bind(this);

    }

    handleClose(){
        console.log('modal close request');
    }



    handleChange(event) {
        const { value } = event.target;
        console.log(value)
        this.setState({
            password:  value
        });
    }

    reAuth(event){
        event.preventDefault()
        this.props.dispatch(userActions.reAuth(this.state.password));
    }

    render(){
        return (
          <div>
              <Dialog
                  title={this.props.title}
                  modal={false}
                  open={this.state.modalOpen}
                  onRequestClose={this.handleClose}
              >

                  {this.props.text}
                  <TextField
                      name="password"
                      floatingLabelText="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <FlatButton
                    onClick={this.reAuth}
                  >{this.props.button}</FlatButton>

              </Dialog>
          </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ReAuthHandler);
