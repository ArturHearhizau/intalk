import React, { Component } from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import IntlMessages from 'util/IntlMessages';



export default class Test extends Component {
  render() {
    return (
      <div>
        <IntlMessages id="aboutUs.readMore" />
        {/*<IntlMessages*/}
          {/*id='appModule.enterPasswordUnlock'*/}
        {/*/>*/}
      </div>
    );
  }
}
