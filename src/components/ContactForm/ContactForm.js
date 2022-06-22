import { nanoid } from 'nanoid';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value.toLowerCase());
        break;

      case 'number':
        setNumber(value.toLowerCase());
        break;

      default:
        return;
    }
  };

  const onHandleSubmit = event => {
    event.preventDefault();

    onSubmit({ id: nanoid(2), name, number });
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Name</Form.Label>
        <Form.Control
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Number</Form.Label>
        <Form.Control
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={onChange}
          required
        />
      </Form.Group>
      <Button variant="outline-info" type="submit">
        Add contact
      </Button>
    </Form>
  );
}
