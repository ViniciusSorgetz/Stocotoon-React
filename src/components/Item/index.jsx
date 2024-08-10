import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const Item = (props) => {
    
    const { type, setType, name, icon, handleClick, setPositionX, setPositionY, setContextMenu, setCurrentStory } = props;

    const handleOnContextMenu = (e) => {
        e.preventDefault();
        console.log(type);
        setCurrentStory(type);
        setContextMenu(true);
        setPositionX(e.clientX);
        setPositionY(e.clientY);
    }

    return (<>
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