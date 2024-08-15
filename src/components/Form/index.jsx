const Form = (props) => {

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
    } = props;

    return(
        <div className='mb-5 mt-nav'>
            <h2 className="text-center font-grand font-bold text-cyan">{title}</h2>
            <form className='my-form' onSubmit={handleSubmit}>
                <div className='form-item'>
                    <label htmlFor="name" className='text-light'>{nameLabel}</label>
                    <input 
                        type="text" 
                        className='bg-gray1 text-light' 
                        name="name" 
                        placeholder={namePlaceholder} 
                        onChange={(e) => setName(e.target.value)} required
                        value={name && name}
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
                            value={description && description}
                        />
                    </div>
                }
                <button type='submit' className="btn-cyan font-inter font-bold text-gray1">Criar</button>
                {message.length !== 0 && <p className='text-danger text-center lead error-message'>{message}</p>}
            </form>
        </div>
    )
}

export default Form;