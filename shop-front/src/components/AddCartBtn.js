import React from 'react';

function AddCartBtn({onClick, id}) {
    return (
        <div>
            <button
                className='add__to__cart'
                style={{cursor: "pointer"}}
                onClick={() => onClick(id)}>
                <i className="fas fa-shopping-cart" style={{marginRight: '10px'}}/>
                Add to cart
            </button>
        </div>
    );
}

export default AddCartBtn;