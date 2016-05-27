import React from 'react'
import { shallow } from 'enzyme'
import Root from 'containers/Root'

describe('(Container) Root', () => {
  const wrapper = shallow(<Root />)

  it('renders as a <div>', () => {
    expect(wrapper.type()).to.be.eql('div')
  })

  it('has a style with height 100%', () => {
    const expectedStyles = {
      height: '100%',
      background: '#333'
    }
    expect(wrapper.prop('style')).to.be.eql(expectedStyles)
  })

  it('contains a header explaining the app', () => {
    expect(wrapper.find('.welcome-header')).to.have.length(1)
  })
})
