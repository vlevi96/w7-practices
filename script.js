/*
    function functionName(parameter)
    {
        parameter==="Argument as a string";
    };
    functionName("Argument as a string");

    const argument= "Argument saved in a variable";
    const functionName = function (parameter)
    {
        parameter==="Argument saved in a variable";
    };
    functionName(argument);

    const functionName = (parameter1,parameter2)=>{
        parameter1===1;
        parameter2===2;
    };
    functionName(1,2);
*/

const inputElement = (type, name, title, req = '') => {
    return `
    <div class="${type}">
        <label>${title}</label>
        <input type='${type}' name='${name}' ${req}>
    </div>
    `;
};

const selectElement = (type, name, title, options) => {
    let optionsToSelect = "";

    for (const o of options) {
        optionsToSelect +=
            `
        <option>
            ${o}
        </option>
        `;
    }

    return `
    <div>
        <label>${title}</label>
        <${type} name="${name}">
            ${optionsToSelect}
        </${type}>
    </div>
    `;
};

/*
    const formElement='<form>'+${inputElement('text', 'firstName')}+${inputElement('file', 'profilePicture')}+${inputElement('email', 'personalEmail')}+${inputElement('radio', 'newsLetter')}${inputElement('checkbox', 'terms')}+'<\form>';
*/

const nameData =
{
    type: 'text',
    name: 'firstName',
    label: 'Keresztneved'

};

const anotherFormFields =
    [
        {
            type: 'text',
            name: 'street',
            label: 'Közterület neve'

        },
        {
            type: 'number',
            name: 'houseNumber',
            label: 'Ház szám'

        },
        {
            type: 'number',
            name: 'zipCode',
            label: 'Írányítószám'

        },
        {
            type: 'text',
            name: 'city',
            label: 'Település neve'

        }
    ]

const formFields =
    [

        {
            type: 'text',
            name: 'firstName',
            label: 'Keresztneved'

        },
        {
            type: 'file',
            name: 'profilePicture',
            label: 'Profilképed'

        },
        {
            type: 'email',
            name: 'personalEmail',
            label: 'E-mail címed',
            required: 'required'

        },
        {
            type: 'checkbox',
            name: 'newsLetter',
            label: 'Hírlevelet szeretnél-e kapni?'

        },
        {
            type: 'checkbox',
            name: 'terms',
            label: 'Elfogadom a felhasználási feltételeket'

        }
    ]

/*
const formElement = `
    <form id='form'>
        ${inputElement(nameData.type, nameData.name, nameData.label)}
        ${inputElement('file', 'profilePicture', 'Profilképed')}
        ${inputElement('email', 'personalEmail', 'E-mail címed', 'required')}
        ${inputElement('checkbox', 'newsLetter', 'Hírlevelet szeretnél-e kapni?')}
        ${inputElement('checkbox', 'terms', 'Elfogadom a felhasználási feltételeket')}
        ${selectElement('select', 'where', 'Hol hallottál rólunk?', ["interneten", "ismerőstől", "egyéb"])}
        <button>Ok</button>
    </form>
`;*/

const formElement = (ffs, id) => {
    let inputs = '';
    for (const ff of ffs) {
        inputs += inputElement(ff.type, ff.name, ff.label, ff.required)
    };
    return `
    <form id="${id}">
    ${inputs}
    ${selectElement('select', 'where', 'Hol hallottál rólunk?', ["interneten", "ismerőstől", "egyéb"])}
    <button>Ok</button>
    </form>`;
}

const formSubmit = (event) => {
    event.preventDefault();
    const et = event.target;
    console.log(event);
    console.log(et);
    et.classList.add('Submitted');
    let selectValue = et.querySelector(`select[name="where"]`).value;
    console.log(selectValue);
};

const inputUpdate = (event) => {
    if (event.target.getAttribute("name") === 'firstName') {
        document.getElementById('inputValue').innerHTML = event.target.value;
    }
    if (event.target.getAttribute("name") === 'profilePicture') {
        console.log(event.target.files[0]);

        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById('inputValue').insertAdjacentHTML("beforeend", `<img src="${image}">`);
    }
    console.log(event.target.closest("#form"));
};

function loadEvent() {
    const root = document.getElementById("root");
    root.insertAdjacentHTML('afterbegin', formElement(formFields, "form"));
    //root.insertAdjacentHTML('afterbegin', formElement(anotherFormFields,"form2"));
    root.insertAdjacentHTML('afterbegin', `
        <div id='inputValue'></div>
    `);

    const form = document.getElementById("form");
    form.addEventListener('submit', formSubmit);

    console.log('the page has loaded');

    const inputList = form.querySelectorAll('input');

    for (const input of inputList) {
        input.addEventListener('input', inputUpdate);
    }
}

window.addEventListener("load", loadEvent);