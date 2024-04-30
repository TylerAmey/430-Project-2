const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');

const handleDelete = (e) => {
    console.log('test');
    e.preventDefault();
    helper.hideError();
    helper.sendPost(e.target.action);
    return false;
}

const handleResetPass = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const pass3 = e.target.querySelector('#pass3').value;

    if(!username || !pass || !pass2 || !pass3) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    if(pass2 !== pass3){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});
    return false;
}

const handlePremiumSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username || !pass || !pass2) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    if(pass !== pass2){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});
    return false;
}

const handlePremium = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username || !pass || !pass2) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    if(pass !== pass2){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});
    return false;
}

const handleNonPremium = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username || !pass || !pass2) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    if(pass !== pass2){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});
    return false;
}






const DeleteWindow = (props) => {
    return (
        <form id="deleteForm"
            name="deleteForm"
            onSubmit={handleDelete}
            action="/delete"
            method="POST"
            className="mainForm"
        >
            <h3>Are you sure you'd like to delete your account?</h3>
            <input className="formSubmit" type="submit" value="Confirm"/>
        </form>
    );
};

const ResetPassWindow = (props) => {
    return (
        <form id="resetForm"
            name="resetForm"
            onSubmit={handleResetPass}
            action="/resetPass"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="pass">Old Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass">New Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="password" />
            <label htmlFor="pass">New Password: </label>
            <input id="pass3" type="password" name="pass3" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Reset Pass" />
        </form>
    );
};

const PremiumSignupWindow = (props) => {
    return (
        <form id="premiumSignUp"
            name="premiumSignUp"
            onSubmit={handlePremium}
            action="/premiumSignUp"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" name="name" placeholder="name" />
            <label htmlFor="billingAddress">Billing Address: </label>
            <input id="address" type="text" name="address" placeholder="address" />
            <input className="formSubmit" type="submit" value="Confirm"/>
        </form>
    );
};

const PremiumWindow = (props) => {
    return (
        <form id="premium"
            name="premium"
            onSubmit={handlePremium}
            action="/upload"
            method="POST"
            className="mainForm"
        >
        </form>
    );
};

const NonPremiumWindow = (props) => {
    return (
        <form id="nonPremium"
            name="nonPremium"
            onSubmit={handleNonPremium}
            action="/upload"
            method="POST"
            className="mainForm"
        >
            <h2>Upgrade to Premium to block ads!</h2>
            <img></img>
            <img></img>
            <img></img>
        </form>
    );
};

const init = () => {
    const resetPassButton = document.getElementById('resetPassButton');
    const deleteButton = document.getElementById('deleteButton');
    const premiumSignUpButton = document.getElementById('premiumSignUpButton');

    const root = createRoot(document.getElementById('content'));

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <DeleteWindow /> );
        return false;
    });

    premiumSignUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <PremiumSignupWindow /> );
        return false;
    });

    resetPassButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <ResetPassWindow /> );
        return false;
    });

    root.render( <LoginWindow />);
};

window.onload = init;