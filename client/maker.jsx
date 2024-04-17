
const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
//const { ModuleFilenameHelpers } = require('webpack');

const handleDomo =(e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const nickname= e.target.querySelector('#domoNickname').value;
    const age= e.target.querySelector('#domoAge').value;

    if(!name || !age){
        helper.handleError('All fields are requried');
        return false;
    }

    helper.sendPost(e.target.action, {name, nickname, age}, onDomoAdded);
    return false;
}

const DomoForm = (props) => {
    return(
        <form id="domoForm"
            onSubmit={(e) => handleDomo(e, props.triggerReload)}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >

            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="nickname">Nickname: </label>
            <input id="domoNickname" type="text" name="name" placeholder="Domo Nickname" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    if(domos.length === 0){
         return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
         );
    }

    const domoNodes = domos.map(domo => {
        return (
            <div key={domo.id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoNickname">Nickname: {domo.nickname}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;