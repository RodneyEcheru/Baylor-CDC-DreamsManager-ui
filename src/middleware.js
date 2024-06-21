
// Get the URL object from the request

// src/middleware.js
export function onRequest({ locals, request, context }, next) {

    // A function that decodes and verifies a JWT token
    function verifyToken(token) {

        if (!token) {
            // Token does not exist
            return false
        }

        if (new Date() > new Date(token.split('=')[1])) {
            // Token has expired, handle accordingly (e.g., redirect to login page)
            return false
        }

        // Decode the session cookie from Base64.
        const decodedSessionJson = atob(token);

        // Parse the JSON string.
        let userData = JSON.parse(decodedSessionJson);

        // if token is not valid, return null
        if (!userData) {
            return false
        }
        
        // set user home page
        console.log('userData:', userData)
        userData.homePage = userData.default_role === 'Guest' ? '/dashboard/guest' : '/dashboard/admin'

        // Return the user data if the token is valid
        locals.user = userData

        return userData;
    }

    // Define the routes for public and guest categories
    const publicRoutes = ["/404", "/about"];
    const guestRoutes = ["/", "", "/login", "/register", "/forgot-password"];
    const agentRoutes = ["/dashboard/guest"];

    const url = new URL(request.url);
    const pathname = url.pathname
    /*console.log('url:', url)
    console.log('pathname:', pathname)
    console.log('request:', request.url)*/

    // Get the cookie header
    const cookie = request.headers.get("cookie");

    // Parse the cookie and get the token value
    // const token = cookie ? cookie.split(";").find(c => c.trim().startsWith("token=")).split("=")[1] : null;
    // The optional chaining operator returns undefined if the preceding expression is null or undefined
    const token = cookie?.split(";")?.find(c => c.trim().startsWith("token="))?.split("=")[1] ?? null;


    // Check if the route is public
    if (publicRoutes.includes(pathname)) {
        // No need to check the token, just return the next response
        return next();
    }

    // Check if the route is guest
    if (guestRoutes.includes(pathname)) {
        // Check if the token exists and is valid
        if (token) {
            try {
                // Verify the token and get the payload
                const payload = verifyToken(token);

                // The user is already logged in, redirect to the admin home page
                return new Response(null, {
                    status: 302,
                    headers: {
                        Location: payload.homePage
                    }
                });
            } catch (error) {
                // The token is invalid or expired, ignore it
            }
        }
        // The user is not logged in, just return the next response
        return next();
    }

    // The route is admin, check the token
    if (token) {
        try {
            // Verify the token and get the payload
            const payload = verifyToken(token);

            // The user is logged in, store the role in the locals object
            locals.role = payload.default_role;

            // Check if the user has the admin role or if user is a school
            if (payload.default_role === "admin" || payload.default_role === "root" || payload.default_role === "agent") {
                // The user can access any admin page, just return the next response
                return next();
            }

            // The user has the guest role, check if the route is the admin home page
            if (pathname === payload.homePage) {
                // The user can access the admin home page, just return the next response
                return next();
            }

            // The user cannot access other admin pages, redirect to the admin home page
            return new Response(null, {
                status: 302,
                headers: {
                    Location: payload.homePage
                }
            });
        } catch (error) {
            // The token is invalid or expired, ignore it
        }
    }

    // The user is not logged in or the token is expired, redirect to the login page
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login"
        }
    });

    // Return the result of calling next() to continue the rendering process
    return next();
}
