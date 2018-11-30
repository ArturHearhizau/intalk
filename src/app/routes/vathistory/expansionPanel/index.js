import React from 'react';
import VatExpansionPanels from './vat';
import CardBox from 'components/CardBox';
import IntlMessages from 'util/IntlMessages';

const ExpansionPanel = ({match}) => {
    return (
        <div className="animated slideInUpTiny animation-duration-3">

            <div className="row mb-md-4">
                <CardBox
                  styleName="col-lg-12"
                  cardStyle="bg-transparent no-shadow p-0"
                  heading={<IntlMessages id="vathist.panel.vatHist" />}
                  headerOutside>
                    <VatExpansionPanels />
                </CardBox>
            </div>
        </div>
    );
};

export default ExpansionPanel;

