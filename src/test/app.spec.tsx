import { h } from 'preact';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { ReactElement } from 'react';
import App from '../App';

describe('<App />', () => {
  it('should have <h1>', ()=> {
    const component = mount(<App /> as ReactElement );
    expect(component.find('h1').first().text()).to.equal('Hello World');
  });
});