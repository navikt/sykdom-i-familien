import Adapter from 'enzyme-adapter-react-16';
import { configure} from 'enzyme';


configure({ adapter: new Adapter() });


global.___loader = {
    enqueue: jest.fn(),
};