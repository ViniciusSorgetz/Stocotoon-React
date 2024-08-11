import React from 'react'
import { Link } from 'react-router-dom';

import Criar from "../../assets/Criar.svg";

const CreateItem = (props) => {
    
    const { handleClick, name } = props;

    return (<>
        <div className="col col-lg-2 col-sm-4 pb-5">
            <div className="component" onClick={handleClick}>
              <h2 className="text-light h6">Criar {name}</h2>
                <img src={Criar} alt="Criar" />
            </div>
        </div>
    </>)
}

export default CreateItem;