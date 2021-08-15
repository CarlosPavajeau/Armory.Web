import { render } from '@testing-library/react';
import DisplayDataHeader from '../../data/DisplayDataHeader';

describe('DisplayDataHeader tests', () => {
  test('Render display data header', () => {
    const placeholder = 'Test placeholder';
    let refresh = false;

    const handleRefresh = () => {
      refresh = !refresh;
    };

    const result = render(
      <DisplayDataHeader
        placeholder={placeholder}
        handleRefresh={handleRefresh}
      />,
    );
    expect(result).toBeTruthy();
    expect(result.getByPlaceholderText(placeholder)).toBeTruthy();
    expect(result.getByTitle('Refrescar datos')).toBeTruthy();

    const button = result.getByTitle('Refrescar datos') as HTMLButtonElement;
    button.click();

    expect(refresh).toEqual(true);
  });
});
