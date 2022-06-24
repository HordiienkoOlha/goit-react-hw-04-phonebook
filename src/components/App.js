import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contact = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contact);

    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = dataContact => {
    contacts.some(({ name }) => name === dataContact.name)
      ? Notify.failure(`Contact ${dataContact.name} already exists`)
      : setContacts([...contacts, dataContact]);
  };

  const getFilterValue = event => {
    setFilter(event.currentTarget.value);
  };

  const filteredContacts = () => {
    const newFilter = filter.toLowerCase();
    // if (contacts !== null) {
    console.log(contacts);
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(newFilter) ||
        contact.number.includes(newFilter)
    );
    // }
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const filterContacts = filteredContacts();
  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} changeFilter={getFilterValue} />
      <ContactList contacts={filterContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
