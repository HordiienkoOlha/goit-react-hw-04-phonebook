import PropTypes from 'prop-types';
import { Form} from 'react-bootstrap';

const Filter = ({ changeFilter }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Find contacts by name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search..."
          onChange={changeFilter}
        />
      </Form.Group>
    </Form>
  );
};

Filter.propTypes = {
  onSearch: PropTypes.func,
};

export default Filter;

