import React from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import {QuestionOne} from '../question-one/QuestionOne'
import '../../setupTests';

test('should render QuestionOne correctly', () => {
    const wrapper = shallow(<QuestionOne />)
    expect(toJSON(wrapper)).toMatchSnapshot();
})


