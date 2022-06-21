import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  // console.log(contacts);

  useEffect(() => {
    const contact = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contact);

    setContacts(parsedContacts);
  }, []);

  // componentDidUpdate(prevProps, prevState) {
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = dataContact => {
    // console.log(contacts);
    // setContacts(JSON.parse(window.localStorage.getItem('contacts')));
    // console.log(contacts);
    // const contact = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contact);

    // setContacts(...contacts, parsedContacts);
    // console.log(contact);

    // contacts.some(({ name }) => name === dataContact.name)
    //   ? Notify.failure(`Contact ${dataContact.name} already exists`)
    //   : setContacts([...contacts, dataContact]);
    contacts.some(({ name }) => name === dataContact.name)
      ? Notify.failure(`Contact ${dataContact.name} already exists`)
      : setContacts([...contacts, dataContact]);
  };

  const getFilterValue = event => {
    setFilter(event.currentTarget.value);
  };

  const filteredContacts = () => {
    const newFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(newFilter) ||
        contact.number.includes(newFilter)
    );
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

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = dataContact => {
//     this.state.contacts.some(({ name }) => name === dataContact.name)
//       ? Notify.failure(`Contact ${dataContact.name} already exists`)
//       : this.setState(({ contacts }) => ({
//           contacts: [...contacts, dataContact],
//         }));
//   };

//   getFilterValue = event => {
//     this.setState({
//       filter: event.currentTarget.value,
//     });
//   };
//   filteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const newFilter = filter.toLowerCase();

//     return contacts.filter(
//       contact =>
//         contact.name.toLowerCase().includes(newFilter) ||
//         contact.number.includes(newFilter)
//     );
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { formSubmitHandler, getFilterValue, deleteContact } = this;
//     const { filter } = this.state;
//     const filterContacts = this.filteredContacts();
//     return (
//       <div className={s.container}>
//         <h1 className={s.title}>Phonebook</h1>
//         <ContactForm onSubmit={formSubmitHandler} />
//         <h2 className={s.title}>Contacts</h2>
//         <Filter value={filter} changeFilter={getFilterValue} />
//         <ContactList
//           contacts={filterContacts}
//           onDeleteContact={deleteContact}
//         />
//       </div>
//     );
//   }
// }
