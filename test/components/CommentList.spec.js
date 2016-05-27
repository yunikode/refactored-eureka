import React from 'react'

// Once we set up Karma to run our tests through webpack
// we will no longer need to have these long relative paths
import CommentList from '../../src/components/CommentList'
import {
  describeWithDOM,
  mount,
  shallow,
  spyLifecycle
} from 'enzyme'

describe('(Component) CommentList', () => {
  // using special describeWithDOM helper that enzyme
  // provides so if other devs on the team don't have JSDom
  // properly installed or are using old versions of node
  // their test suite still works
  //
  // All of our tests that depend on mounting should go inside
  // one of these special blocks
  describeWithDOM('Lifecycle methods', () => {
    it('calls componentDidMount', () => {
      spyLifecycle(CommentList)

      const props = {
        onMount: () => {},
        isActive: false
      }

      // using destructuring to pass props down
      // easily and then mounting the component
      mount(<CommentList {...props} />)

      // CommentList's componentDidMount should have been
      // called once. spyLifecycle attaches sinon spy so we can
      // make this assertion
      expect(CommentList.prototype.componentDidMount.calledOnce).to.be.true
    })

    it('calls onMount prop once it mounts', () => {
      // create a spy for the onMOunt function
      const props = { onMount: sinon.spy() }

      // mount the component
      mount(<CommentList {...props} />)

      // expect that onMount was called
      expect(props.onMount.calledOnce).to.be.true
    })

    it('should render as a <ul>', () => {
      const props = { onMount: () => {} }
      const wrapper = shallow(<CommentList {...props} />)
      expect(wrapper.type()).to.eql('ul')
    })

    describe('when active...', () => {
      const wrapper = shallow(
        // just passing isActive as an alias for true
        <CommentList onMount={() =>{}} isActive />
      )
      it ('should render with className active-list', () => {
        expect(wrapper.prop('className')).to.eql('active-list')
      })
    })

    describe('when inactive...', () => {
      const wrapper = shallow(
        <CommentList onMount={() =>{}} isActive={false} />
      )
      it('should render with className inactive-list', () => {
        expect(wrapper.prop('className')).to.eql('inactive-list')
      })
    })
  })
})
