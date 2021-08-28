import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
