import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = dataContact => {
    this.state.contacts.some(({ name }) => name === dataContact.name)
      ? Notify.failure(`Contact ${dataContact.name} already exists`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, dataContact],
        }));
  };

  getFilterValue = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };
  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const newFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(newFilter) ||
        contact.number.includes(newFilter)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { formSubmitHandler, getFilterValue, deleteContact } = this;
    const { filter } = this.state;
    const filterContacts = this.filteredContacts();
    return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2 className={s.title}>Contacts</h2>
        <Filter value={filter} changeFilter={getFilterValue} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default App;
