type DropdownProps = {
    options : {id: string, label: string}[]
    onSelect: (id: string) => void
    label: string
}

function Dropdown ({options, onSelect, label}: DropdownProps) {
    return (
        <div>
            <label>{label}</label>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="">-- Choose --</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown