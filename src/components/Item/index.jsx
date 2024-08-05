import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const Item = (props) => {
    
    const { type, name, icon, handleClick, contextMenuOpen, setContextMenuOpen } = props;
    const [contextMenu, setContextMenu] = useState(false);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const contextMenuRef = useRef();

    const handleOnContextMenu = (e) => {
        e.preventDefault();
        console.log(contextMenuRef);
        setContextMenu(true);
        setPositionX(e.clientX);
        setPositionY(e.clientY);
        console.log(e.clientX);
        console.log(contextMenuRef.current);
    }

    useEffect(() => {
    }, [contextMenuOpen]);

    useEffect(() => {
        function handler(e){
            if(contextMenuRef.current){
                if(!contextMenuRef.current.contains(e.target)){
                    console.log(contextMenuRef.current);
                    setContextMenu(false);
                }
            }
        }
        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        }
    });

    return (<>
        {contextMenu && 
            <ul 
                className="list-group list-group-flush rounded-3 p-0 bg-dark" 
                style={{
                    width: "12rem", 
                    scale: "0.9",
                    position: "fixed",
                    top: positionY +  "px",
                    left: positionX + "px",
                    zIndex: 10
                }}
                ref={contextMenuRef}
            >
                <li className="list-group-item bg-dark">
                    <Link to={`/${name}/${type.id}`} style={{textDecoration: "none"}} className="text-light" target="_blank">
                        <div 
                            className="w-100 d-flex align-items-center justify-content-between p-1"
                            onClick={() => {setContextMenu(false)}}
                        >
                            Abrir
                            <i className="bi bi-box-arrow-up-right"></i>
                        </div>
                    </Link>
                </li>
                <li className="list-group-item text-bg-dark">
                    <div 
                        className="w-100 d-flex align-items-center justify-content-between p-1"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            handleClick();
                            setContextMenu(false);
                        }}
                    >
                        Editar
                        <i className="bi bi-pencil"></i>
                    </div>
                </li>
                <li className="list-group-item text-bg-dark">
                    <div 
                        className="w-100 d-flex align-items-center justify-content-between text-danger p-1"
                        style={{cursor: "pointer"}}
                    >
                        Excluir
                        <i className="bi bi-trash"></i>
                    </div>
                </li>
            </ul>
        }
        <div className="col col-lg-2 col-sm-4 pb-5" key={type.id}>
            <div className="component" onContextMenu={(e) => handleOnContextMenu(e)}>
                <h2 className="text-light h6">{type.name}</h2>
                <Link to={`/${name}/${type.id}`}>
                  <img src={icon} alt={`${name} icon`}/>
                </Link>
            </div>
        </div>
    </>)
}

export default Item;