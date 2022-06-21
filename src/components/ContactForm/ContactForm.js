import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Button } from 'react-bootstrap';

class ContactForm extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    name: '',
    number: '',
  };

  onChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value.toLowerCase() });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ id: nanoid(2), name, number });
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <Form onSubmit={onSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail" >
    <Form.Label> Name</Form.Label>
          <Form.Control value={name} type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" onChange={onChange} required/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Number</Form.Label>
    <Form.Control value={number} type="tel" name="number" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" onChange={onChange} required/>
  </Form.Group>
  <Button variant="outline-info" type="submit">
    Add contact
  </Button>
</Form>
    );
  }
}

export default ContactForm;
