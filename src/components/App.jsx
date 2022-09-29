import React, { Component } from 'react';
import css from './App.module.css';
import Notification from './Notification/Notification';
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number
    }

    if (
      this.state.contacts.some(contact =>
        contact.name.toLowerCase().includes(name.toLocaleLowerCase()))
    ) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));

  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)

    if(parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

 render() {
  const {contacts, filter } = this.state;
  const visibleContacts = this.getVisibleContacts();

  return(
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={this.addContact}/>

      <h2>Contacts</h2>

      {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact}/>
          </>
        ) : (
          <Notification message="Contact list is empty! Please, add new contacts." />
        )}


      
      
    </div>
  );

 };
};

export default App;