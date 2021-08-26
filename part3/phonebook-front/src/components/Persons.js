const Persons = ({persons, onDelete}) => persons.map(p => 
<div key={p.id}>
    {p.name} {p.number}  
    <button onClick={() => onDelete(p.id)}> delete </button>
</div>
)

export default Persons