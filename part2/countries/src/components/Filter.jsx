const Filter = ({ searchTerm, handleChange }) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handleChange} />
    </div>
  );
};

export default Filter;
