import React, { useCallback, useState } from 'react';
import { sendMessage } from "../store/actions/users";
import { useDispatch } from "react-redux";
import Modal from "react-modal";

function EmailModal({open, user, onClose}) {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleSubmit = useCallback(() => {
        dispatch(sendMessage(text, user.email))
        setText('');
        onClose();
    }, [text]);

    return (
        <Modal
            isOpen={open}
            bodyOpenClassName="body__modal"
            overlayClassName="testOverlay"
            className="testContent"
            onRequestClose={onClose}
        >
            <div className='close_btn_block'>
                <button onClick={onClose}>X</button>
            </div>

            <div className='modal__container'>
                <form onSubmit={handleSubmit}>

                    <textarea
                        cols="30"
                        rows="10"
                        placeholder='message'
                        value={text}
                        onChange={(ev) => setText(ev.target.value)}
                        required
                    />

                    <div className='btn'>
                        <button >Send</button>
                    </div>

                </form>
            </div>

        </Modal>
    );
}

export default EmailModal;