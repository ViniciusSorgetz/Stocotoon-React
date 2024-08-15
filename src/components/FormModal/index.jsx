import { useEffect } from "react";
import './FormModal.css';

const FormModal = (props) => {

    const closeModal = () => {
        props.hide();
    }

    const {
        name, setName, 
        description, setDescription,
        handleSubmit,
        title,
        nameLabel,
        descriptionLabel,
        namePlaceholder,
        descriptionPlaceholder,
        message,
        hasDescription,
        button,
    } = props;

    return(
        <>
            <div className="modal fade show" id="form-modal" style={{display: "block"}}>
                <div className="modal-dialog">
                    <div className="modal-content text-bg-dark" id="modal-content">
                        <div className="modal-header" id="form-modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-form">
                                <div className='form-item'>
                                    <label htmlFor="name" className='text-light'>{nameLabel}</label>
                                    <input 
                                        type="text" 
                                        className='bg-gray1 text-light' 
                                        name="name" 
                                        placeholder={namePlaceholder} 
                                        onChange={(e) => setName(e.target.value)} required
                                        value={name}
                                    />
                                </div>
                                {hasDescription && 
                                    <div className='form-item'>
                                        <label htmlFor="description" className='text-light'>{descriptionLabel}<span className="text-secondary">(opcional)</span> </label>
                                        <input 
                                            type="text" 
                                            className='bg-gray1 text-light' 
                                            name='description' 
                                            placeholder={descriptionPlaceholder} 
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                        />
                                    </div>}
                            </form>
                            {message.length !== 0 && <p className='text-danger text-center lead error-message'>{message}</p>}
                        </div>
                        <div className="modal-footer" id="form-modal-footer">
                            <button type="button" className="btn-outline-gray" onClick={closeModal}>Cancelar</button>
                            <button type="button" className="btn-cyan" onClick={handleSubmit}>{button}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormModal;