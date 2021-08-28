import '@testing-library/jest-dom';

import { shallow } from 'enzyme';

import DisplayDataHeader from '../../data/DisplayDataHeader';

describe('DisplayDataHeader tests', () => {
  const placeholder = 'Test placeholder';
  let refresh = false;

  const handleRefresh = () => {
    refresh = !refresh;
  };
  let wrapper = shallow(
    <DisplayDataHeader
      placeholder={placeholder}
      handleRefresh={handleRefresh}
    />,
  );

  beforeEach(() => {
    wrapper = shallow(
      <DisplayDataHeader
        placeholder={placeholder}
        handleRefresh={handleRefresh}
      />,
    );
  });

  test('Should be render DisplayDataHeader', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
