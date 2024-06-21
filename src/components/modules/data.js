import {writable} from "svelte/store";

// default website details
export let website = {
    fullname: 'Dreams Manager',
    name: 'Dreams Manager',
    company: 'Dreams Manager',
    developed_by: 'Information Village',
    slogan: 'Sales Management',
    logo: '/img/logo.png',
    logo2: '/img/6.png'
}

// current year
export const currentYear = new Date().getFullYear();

// website colors
export const colors = {
    light_font: `text-green-200`,
    dark_font: `text-green-800`,
    dark_font_hover: `text-green-400`,
    light_body_background: `bg-green-100`,
    dark_body_background: `bg-green-800`,
    light_background: `bg-green-200`,
    dark_background: `bg-green-800`,
}

// website url's
//export const apiUrl = 'https://safechildapi.treatsnmore.ug/';
export const apiUrl = 'http://127.0.0.1:5001/';

// manage forms
export let form_response_state = writable(false)
export let form_is_submitting = writable(false)

export let form_response = writable({
    status: '',
    title: '',
    message: '',
})

export async function submitMultipartFormData(event) {

    event.preventDefault()

    form_is_submitting.set(true)
    const formElement = event.target;
    const formData = new FormData(formElement);
    const endpointURL = formElement.action;

    try {
        const data = await postData(endpointURL, formData);

        form_response_state.set(true);

        form_response.set({
            status: data.response_color,
            title: data.server_message,
            message: data.message_detail
        });

        // form finished submitting
        form_is_submitting.set(false)

        if(data.hasOwnProperty('response_action')){
            switch (data.response_action){
                case 'login_user':
                    // Assuming data.server_data contains valid information
                    const userJson = JSON.stringify(data.server_data);

// Encode the JSON string to Base64.
                    const encodedUserJson = btoa(userJson);

// Set the session cookie to the encoded JSON string.
                    document.cookie = `token=${encodedUserJson}; expires=${new Date(Date.now() + 30 * 60 * 1000).toUTCString()}; path=/; samesite=lax;`;

                    // admin home page
                    const adminHomePage = '/dashboard/admin';

                    let redirectTo = adminHomePage;

// Get the current URL
                    const currentUrl = new URL(window.location.href);

// Get the value of the 'redirectTo' parameter from the query string
                    const redirectToParam = currentUrl.searchParams.get('redirectTo');

// If the 'redirectTo' parameter is present and a valid URL
                    if (redirectToParam) {
                        try {
                            const redirectToUrl = new URL(decodeURIComponent(redirectToParam));
                            redirectTo = redirectToUrl.pathname + redirectToUrl.search + redirectToUrl.hash;
                        } catch (error) {
                            console.log(`Error - ${error}`);
                        }
                    }

                    try {
                        setTimeout(() => (window.location = redirectTo), 1000);
                    } catch (error) {
                        console.log(error);
                        setTimeout(() => (window.location = adminHomePage), 1000);
                    }

                    break

                case 'previous_page':
                    window.location.replace(document.referrer)
                    break

                case 'login_page':
                    setTimeout(()=> window.location='/login', 1000)
                    break

                case 'reload_page':
                    setTimeout(()=> location.reload(true), 1000)
                    break
            }
        }

        console.log(data);
    } catch (error) {

        // form finished submitting
        form_is_submitting.set(false)

        form_response_state.set(true);

        form_response.set({
            status: 'danger',
            title: 'Error',
            message: error
        });
    }
}

export async function submitGetForm(endpoint) {

    form_is_submitting.set(true);
    const endpointURL = new URL(endpoint);

    try {
        const response = await fetch(endpointURL.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        form_response_state.set(true);

        form_response.set({
            status: data.response_color,
            title: data.server_message,
            message: data.message_detail
        });

        // form finished submitting
        form_is_submitting.set(false);

        if (data.hasOwnProperty('response_action')) {
            switch (data.response_action) {

                case 'previous_page':
                    window.location.replace(document.referrer);
                    break;

                case 'reload_page':
                    setTimeout(() => location.reload(true), 1000);
                    break;
            }
        }

        console.log(data);
    } catch (error) {
        // form finished submitting
        form_is_submitting.set(false);

        form_response_state.set(true);

        form_response.set({
            status: 'danger',
            title: 'Error',
            message: error.message || error
        });
    }
}


export async function fetchData(url) {
    try {

        // Fetch data from the given endpoint
        const response = await fetch(url);

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            if(typeof window !== 'undefined'){
                alert(`error in fetching data from ${url}, check your internet connection`)
            }
            console.error('Error fetching data:', response.status);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        // Return the parsed data
        return await response.json();
    } catch (error) {
        // Handle any errors that occur during fetch or parsing
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error after logging it
    }
}

export async function postData(endpointURL, formData) {
    try {

        // Post data to the given endpoint
        const response = await fetch(endpointURL, {
            method: 'POST',
            body: formData
        });

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            if(typeof window !== 'undefined'){
                alert(`error in reaching ${endpointURL}, check your internet connection`)
            }
            console.error('Error fetching data:', response.status);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        // Return the parsed data
        return await response.json();
    } catch (error) {
        // Handle any errors that occur during fetch or parsing
        console.error('Error fetching data:', error);
        if(typeof window !== 'undefined'){
            alert(`error in reaching ${endpointURL}, error message: ${error}`)
        }
        throw error; // Rethrow the error after logging it
    }
}


// logout user
export const logout = () => {
    document.cookie = `token=''; expires=${new Date(0).toUTCString()}; path=/; samesite=lax;`;
    window.location.replace('/')
}
