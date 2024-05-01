const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');

const handleDelete = (e) => {
    e.preventDefault();
    helper.hideError();
    helper.sendPost(e.target.action);
    return false;
}

const handleResetPass = (e) => {
    e.preventDefault();
    helper.hideError();

    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const pass3 = e.target.querySelector('#pass3').value;

    if(!pass || !pass2 || !pass3) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    if(pass2 !== pass3){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {pass, pass2, pass3});
    return false;
}

const handlePremiumSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#name').value;
    const billingAddress = e.target.querySelector('#address').value;

    if(!name || !billingAddress) {
        helper.handleError('Name or billing address is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {name, billingAddress});
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

// const handleUpload = async (e) => {
//     e.preventDefault();
//     helper.hideError();

//     console.log(e.target);
//     const inputFiles = e.target.querySelector('#sampleFile').files[0];
//     console.log(inputFiles);

//     if(!inputFiles){
//         helper.handleError('No files were uploaded!')
//     }

//     const response = await fetch(e.target.action, {
//         method: 'POST',
//         body: new FormData(e.target),
//     });

//     return false;
// }

// const UploadWindow = (props) => {
//     return (
//         <form id='uploadForm' 
//           name='uploadForm' 
//           onSubmit={handleUpload}
//           action='/upload' 
//           method='POST' 
//           encType="multipart/form-data"
//           >
            
//             <div class="container">
//             <div class="drop-area" id="dropArea">
//               <h3 class="drop-text">Input Files Below</h3>
//               <input type="file" id="sampleFile" name="sampleFile" />
//             </div>
//           </div>
//             <input class="buttonStyle uploading" type='submit' value='Upload' />
//         </form> 
//     );
// };

const NotFound = () => {
    return (
      <div className="not-found">
        <h2>404 - Not Found</h2>
        <h3>The page you are looking for does not exist.</h3>
      </div>
    );
  };

const DeleteWindow = (props) => {
    return (
        <form id="deleteForm"
            name="deleteForm"
            onSubmit={handleDelete}
            action="/deleteAccount"
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
        <form id="premiumSignup"
            name="premiumSignup"
            onSubmit={handlePremiumSignup}
            action="/premiumSignup"
            method="POST"
            className="mainForm"
        >
            <label  htmlFor="name">Name: </label>
            <input  id="name" type="text" name="name" placeholder="name" />
            <label  htmlFor="billingAddress">Billing Address: </label>
            <input  id="address" type="text" name="address" placeholder="address" />
            <input className="formSubmit" type="submit" value="Confirm"/>
        </form>
    );
};

const AdSpaceWindow = (props) => {

    const [premium, setUserData] = useState(false);
    let resp;

    useEffect(() => {
        const fetchPremium = async () => {
            const response = await fetch('/getUserPremium');
            const data = await response.json();
            resp = data;
            setUserData(data.premium);
        }

        fetchPremium();
    }, []);
    console.log(premium);

    if (premium == false){
        return (
            <form id="nonPremium"
                name="nonPremium"
                onSubmit={handleNonPremium}
                action="/upload"
                method="POST"
                className="mainForm"
            >
                <h3>Upgrade to Premium to block ads!</h3>
                <img src="/assets/img/insert.png" class ="ad" alt="download icon"></img>
                <br/>
                <br/>
                <img src="/assets/img/insert.png" class ="ad" alt="download icon"></img>
                <br/>
                <br/>
                <img src="/assets/img/insert.png" class ="ad" alt="download icon"></img>
                <br/>
                <br/>
            </form>
        );
    }
    else{
        <form id="premium"
            name="premium"
            onSubmit={handlePremium}
            action="/upload"
            method="POST"
            className="mainForm"
        >
            <img src="/assets/img/excel.png" alt="excel icon"></img>
        </form>
    }
};

const init = () => {
    const resetPassButton = document.getElementById('resetPassButton');
    const deleteButton = document.getElementById('deleteButton');
    const premiumSignUpButton = document.getElementById('premiumSignUpButton');

    const root = createRoot(document.getElementById('content'));

    const right = createRoot(document.getElementById('border-left'));
    const left = createRoot(document.getElementById('border-right'));

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

    right.render( <AdSpaceWindow /> );
    left.render( <AdSpaceWindow /> );

    root.render(<UploadWindow />)
};

window.onload = init;