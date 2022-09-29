import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";
import css from './ContactForm.module.css';

class ContactForm extends Component {
    nameInputId = nanoid();
    numberInputId = nanoid();

    state = {
        name: '',
        number: '',
      };


    handleInputChange = event => {
        const {name, value} = event.currentTarget;
        this.setState({ [name]: value })
    }
    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state);
        this.resetForm()
    }

    resetForm = () => {
        this.setState(() => ({
            name: '',
            number: '',
          }));
    }

    render() {
        return(
        <form onSubmit={this.handleSubmit} className={css.form}>
            <label htmlFor={this.nameInputId} className={css.label}>Name:
            <input
                className={css.inputName}
                type="text"
                id={this.nameInputId}
                value={this.state.name}
                onChange={this.handleInputChange} 
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            </label>

            <label htmlFor={this.numberInputId} className={css.label}>Number:
            <input 
                className={css.inputNumber}
                type="tel"
                id={this.numberInputId}
                value={this.state.number}
                onChange={this.handleInputChange} 
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            </label>
            <button type='submit' className={css.btn}>Add contact</button>
        </form>
        );
    }
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default ContactForm;