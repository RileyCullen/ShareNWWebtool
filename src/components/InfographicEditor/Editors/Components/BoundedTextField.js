import { useState, useEffect, useRef } from 'react';

function BoundedTextField({index, rows, cols, onChange, initialValue, 
    isDisabled, lowerBound, upperBound}) 
{
    const [value, setValue] = useState(initialValue);
    const prevValue = usePrevious(initialValue);

    useEffect(() => {
        if (prevValue !== initialValue) setValue(initialValue);
    }, [initialValue]);


    function handleChange(e) {
        let value = e.target.value;

        let regex = value.match("\n+");

        // Error checks
        if (regex && regex.length >= 1) return;
        if (value.trim().length === 0 && value !== '') return;
        if (value === '' || isNaN(value)) return;

        // Bounded checks
        if (value > upperBound) value = upperBound;
        if (value < lowerBound) value = lowerBound;

        setValue(value);
        onChange(value, index);
    }

    return (
        <div className="input-container">
            <textarea 
                rows={rows}
                cols={cols}
                style={{resize: 'none', textAlign: 'center'}}
                onChange={handleChange}
                value={value}
                disabled={isDisabled}
            />
        </div>
    )
}

function usePrevious(value) 
{
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

BoundedTextField.defaultProps = {
    isDisabled: false,
}

export { BoundedTextField };