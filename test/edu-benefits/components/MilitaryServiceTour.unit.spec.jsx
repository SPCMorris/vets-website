import React from 'react';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import sinon from 'sinon';

import MilitaryServiceTour from '../../../src/js/edu-benefits/components/MilitaryServiceTour';
import { createTour } from '../../../src/js/edu-benefits/utils/veteran';

describe('<MilitaryServiceTour>', () => {
  it('should render active duty section', () => {
    let tour = createTour();
    tour.doNotApplyPeriodToSelected = true;
    const onStateChange = sinon.spy();

    const tree = SkinDeep.shallowRender(
      <MilitaryServiceTour
          data={tour}
          view="expanded"
          onStateChange={onStateChange}/>
    );
    expect(tree.everySubTree('ErrorableCheckbox').some(box => box.props.name === 'applyToChapter30')).to.be.true;
  });
});