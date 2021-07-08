import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


function Remover(props)
{
    function handleClick()
    {
        props.toggleRemove();
    }

    return (
        <div className='remover'
            style={{position: 'fixed', top: 500 + 'px'}}>
            <button onClick={handleClick}>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
        </div>
    );
}

export { Remover };