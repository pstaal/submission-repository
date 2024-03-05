import { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ content: null, error: false });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = { name: newName, number };
    if (persons.some((person) => person.name === newName)) {
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        let id = persons.find((person) => person.name === newName).id;
        personService
          .update(id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setMessage({
              content: `${returnedPerson.name} number has been changed`,
              error: false,
            });
            setTimeout(() => {
              setMessage({ content: null, error: false });
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              content: `the person'${newPerson.name}' was already deleted from server`,
              error: true,
            });
            setTimeout(() => {
              setMessage({ content: null, error: false });
            }, 5000);
            setPersons(persons.filter((p) => p.id !== id));
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({ content: `${returnedPerson.name} added`, error: false });
        setTimeout(() => {
          setMessage({ content: null, error: false });
        }, 5000);
        setNewName("");
        setNumber("");
      });
    }
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
