const PersonForm = ({onSubmit, onNameChange, onNumberChange}) => 
<form onSubmit={onSubmit}>
  <div>
    name: <input onChange={onNameChange}/>
  </div>
  <div>
    number: <input onChange={onNumberChange}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>

export default PersonForm