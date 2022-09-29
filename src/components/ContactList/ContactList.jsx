import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({contacts, onDeleteContact}) => {
    return(

      <ul>

      {contacts.map(contacts => (
        <ContactItem
            key={contacts.id}
            id={contacts.id}
            name={contacts.name}
            number={contacts.number}
            onDeleteContact={onDeleteContact}/>
      ))}

    </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onDeleteContact: PropTypes.func.isRequired,
  };

export default ContactList