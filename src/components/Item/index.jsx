import React from 'react'
import { Link } from 'react-router-dom';

const Item = (props) => {
    
    const { type, name, icon, handleClick } = props;

    return (<>
        <ul className="list-group list-group-flush rounded-3 p-0" style={{width: "12rem", scale: "0.9"}}>
            <li className="list-group-item bg-dark">
                <Link to={`/${name}/${type.id}`} style={{textDecoration: "none"}} className="text-light">
                    <div className="w-100 d-flex align-items-center justify-content-between p-1">
                        Abrir
                        <i class="bi bi-box-arrow-up-right"></i>
                    </div>
                </Link>
            </li>
             <li className="list-group-item text-bg-dark">
                <div 
                    className="w-100 d-flex align-items-center justify-content-between p-1"
                    style={{cursor: "pointer"}}
                    onClick={handleClick}
                >
                    Editar
                    <i className="bi bi-pencil"></i>
                </div>
             </li>
             <li className="list-group-item text-bg-dark">
                <div className="w-100 d-flex align-items-center justify-content-between text-danger p-1">
                    Excluir
                    <i className="bi bi-trash"></i>
                </div>
             </li>
        </ul>
        <div className="col col-lg-2 col-sm-4 pb-5" key={type.id}>
            <div className="component">
                <h2 className="text-light h6">{type.name}</h2>
                <Link to={`/${name}/${type.id}`}>
                  <img src={icon} alt={`${name} icon`}/>
                </Link>
            </div>
        </div>
    </>)
}

export default Item;