import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import AddContacts from './AddContacts/AddContacts';
import ContactList from './ContactList/ContactList';
import ContactEll from './ContactEll/ContactEll';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: prevState.contacts.find(contact => {
        if (contact.name === newContact.name) {
          // newContact
          //  { prevState.contacts, newContact}
          // prevState.contacts = [newContact, ...prevState.contacts]
          // console.log(prevState.contacts);
          return alert('Contact is already in contacts!');
        } else {
          return null;
          //  this.state.contacts = [newContact, ...prevState.contacts]
        }
      }),
      // eslint-disable-next-line 
      contacts: [newContact, ...prevState.contacts],


      // contacts: [newContact, ...prevState.contacts],
    }));
    // console.log(this.state.contacts);
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          // justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 10,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <AddContacts onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList>
          <ContactEll
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </ContactList>
      </div>
    );
  }
}

export default App;
