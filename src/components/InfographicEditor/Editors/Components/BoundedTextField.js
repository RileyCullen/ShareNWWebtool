import { useState, useEffect, useRef } from 'react';

function BoundedTextField({index, rows, cols, onChange, initialValue, 
    isDisabled, lowerBound, upperBound}) 
{
    const [value, setValue] = useState(initialValue);
    const [focused, setFocus] = useState(false);
    const prevValue = usePrevious(initialValue);

    useEffect(() => {
        if (prevValue !== initialValue) setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (value < lowerBound) {
            setValue(lowerBound);
            onChange(lowerBound, index);
        }
        if (value > upperBound) {
            setValue(upperBound);
            onChange(upperBound, index);
        }
    }, [focused]);

    function handleChange(e) {
        let value = e.target.value;

        let regex = value.match("\n+");

        // Error checks
        if (regex && regex.length >= 1) return;
        if (value.trim().length === 0 && value !== '') return;
        if (value === '' || isNaN(value)) return;

        setValue(value);
        if (value < lowerBound || value > upperBound) return;
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
                onFocus={() => { setFocus(true); }}
                onBlur={() => { setFocus(false); }}
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