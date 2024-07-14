import { useState, useEffect, createContext, useContext } from 'react';
import stocotoonAPI from '../axios/config';

import { UserContext } from './User';

export const DrawingContext = createContext({});

const DrawingProvider = ({children}) => {

    const {session, setSession} = useContext(UserContext);
    const [data, setData] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let pageId = window.location.href;
        pageId = pageId.split('/')[4];
        try {
            const data = await stocotoonAPI.get(`/picture/${pageId}`, {
                headers: {
                    Authorization: `Bearer ${session.UserToken}`,
                }
            });
            const content = data.data.content;
            setHistory([{...content}]);
            setData(content);
            setLayers(content.layers);
            setSelectedLayer(content.selectedLayer);
            setLayerIndex(content.layerIndex);
            setLayersQty(content.layersQty);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const [layers, setLayers] = useState([]);
    const [layersQty, setLayersQty] = useState(1);

    const [selectedLayer, setSelectedLayer] = useState({
        name: `Layer-${layersQty}`,
        id: layersQty,
        elements: [],
        hidden: false
    });

    const [layerIndex, setLayerIndex] = useState(0);
    const [selectedElements, setSelectedElements] = useState([]);
    const [action, setAction] = useState("none");
    const [tool, setTool] = useState("pencil");

    const [history, setHistory] = useState([{}]);

    const [historyIndex, setHistoryIndex] = useState(0);

    const [textConfigs, setTextConfigs] = useState({
        text: "",
        font: "Comic Sans MS",
        fontSize: 24,
        fillStyle: "#FFFFFF",
    });

    const [textModal, setTextModal] = useState(false);

    return(
        <DrawingContext.Provider
            value = {{
                layers, setLayers,
                layersQty, setLayersQty,
                selectedLayer, setSelectedLayer,
                layerIndex, setLayerIndex,
                action, setAction,
                tool, setTool,
                history, setHistory,
                historyIndex, setHistoryIndex,
                textConfigs, setTextConfigs,
                textModal, setTextModal,
                selectedElements, setSelectedElements
            }}
        >
            {children}
        </DrawingContext.Provider>
    )
}

export default DrawingProvider;