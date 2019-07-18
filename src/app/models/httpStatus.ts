export const  OK = 200;
export const NOT_ACCEPTABLE = 406;
export const INTERNAL_SERVER_ERROR = 500;
export const HTTP_URL = 'https://sabbyapp.herokuapp.com';
// export const HTTP_URL = 'http://localhost:3000';
export const API_DOLLAR_URL = 'https://api.sunat.cloud/cambio';
export const DATE_FORMAT = 'yyyy-mm-dd';

//Valores para el routing

export const CLIENT_ROUTING = '/client';
export const PHONE_ROUTING = '/phone';
export const SALE_ROUTING = '/sale';

export const ERRORMESSAGES = {
    first_name: [
        {type: 'required', message: 'Campo obligatorio'}
    ], last_name: [
        {type: 'required', message: 'Campo obligatorio'}
    ], email_curser: [
        {type: 'pattern', message: 'Correo ingresado no es valido'}
    ], age_user: [
        {type: 'min', message: 'La edad debe ser mayor a 15'},
        {type: 'max', message: 'La edad debe ser menor a 90' }
    ], document_user: [
        {type: 'required', message: 'Campo obligatorio'},
        {type: 'maxLength', message: 'La longitud del documento no debe superar los 11 caracteres'},
        {type: 'minLength', message: 'La longitud del codumento no debe ser menor a los 8 caracteres'}
    ]
};




