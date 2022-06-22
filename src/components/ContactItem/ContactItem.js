import PropTypes from 'prop-types';
import { ListGroup, Button, Stack } from 'react-bootstrap';

const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <ListGroup.Item>
      <Stack direction="horizontal" gap={2}>
      <p>
        {name} : {number}
      </p>
      <Button variant="outline-info" type="button" className="ms-auto" onClick={() => onDeleteContact(id)}>
        Delete
        </Button>
        </Stack>
    </ListGroup.Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
