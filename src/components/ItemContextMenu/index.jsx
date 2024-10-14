import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


const ItemContextMenu = (props) => {

    const {
        name, type, 
        setContextMenu, 
        handleClick, handleDelete, 
        positionX, positionY,
        updateId
    } = props;
    
    const contextMenuRef = useRef();

    useEffect(() => {
        updateId();
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

    return(<>
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
                    onClick={() => {
                        handleDelete();
                        setContextMenu(false);
                    }}
                >
                    Excluir
                    <i className="bi bi-trash"></i>
                </div>
            </li>
        </ul>
    </>)
}

export default ItemContextMenu;