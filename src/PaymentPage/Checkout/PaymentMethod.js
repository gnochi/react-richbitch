import React from 'react';
import {Elements} from 'react-stripe-elements';
import {connect} from 'react-redux';
import CheckoutForm from './CheckoutForm'


class PaymentMethod extends React.Component {
    render() {
               return (
            <div>
                <Elements>
                     <CheckoutForm amount={this.props.payment.amount} price={this.props.payment.price} handlePrev={this.props.handlePrev} testMode={this.props.testMode} />
                </Elements>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {payment} = state;
    return {
        payment
    }
}

export default connect(mapStateToProps)(PaymentMethod);