/*

    ~   Cookies.js   ~
                                           ~    
    ~   Justin Bentley ~ 2023 ~ v1.2   ~
      ~               ~          
                       ~                                   ~
     ~             ~                    ~                   ~
   _____        ________                  ~              ~          
  / x   \      /  o     \            ~               ________  ~                    
 /     x \    /      o   \         _________        /   x    |__       (x) 
| o       |  |   x        |       /  x      \      |       o   |         /)/)   ##
 \   x   /    \       x  /       |  o    o   |     |  x        |        (^_-)   ##
  \_____/      \________/         \_________/       \_____o___/      (")(")_)_w ##
##################################################################################*/


let _cookie_expiration_days = 450;

let _cookie_samesite = 'Strict';

const _cookie_console_colors = [
    'font-weight: 900; font-style: italic; color: #a052ff;',
    'font-weight: 900; font-style: italic; color: rgb(64,192,255);'
];


/**
//~  set site cookie
//~  'value' can be any type but will be set as string
//~  (optional) path can be set to limit cookie to subdirectory (ie /shop/product)
//~  re-setting cookie with same 'name' & 'path' will overwrite
//~  note: in addition to clientside, cookies are sent to server on GET request
 * @param {string} name
 * @param {any} value
 * @param {string=} optional_path
 * @returns {boolean}
 */
function cookie_set(name, value, optional_path = '/') {

    const date = new Date();
    date.setTime(date.getTime() + (_cookie_expiration_days * 24 * 60 * 60 * 1000));
    let expires = date.toUTCString();
    document.cookie = `${name}=${value};SameSite=${_cookie_samesite};expires=${expires};path=${optional_path}`;

    return true;
}

/**
//~  get cookie using 'name'
//~  returns value OR
//~  if not present returns string "404"
//~  note: firefox (unlike chrome) will show all path data but only proper path data will be retrieved (May 23)
 * @param {string} name
 * @returns {string | "404"}
 */
function cookie_get(name) {

    if (
        document.cookie
            .split(";").some((item) => item.trim().startsWith(`${name}=`))
    ) {
        return document.cookie
            .split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
    }
    else
    {
        return "404";
        //return false;
        // debating this return type //
    }
}


/**
 *  delete 'name'ed site cookie
 *  (optional) path, will be needed if path set, must match
 *  * if correct path is not specified, delete will be unsucessfull,
 *  path cannot be accessed via JavaScript therefore the storage pane in console 
 *  has to be used if unsure *
 * @param {string} name
 * @param {string=} path
 */
function cookie_delete(name, path = '/') {

    document.cookie =
        `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;SameSite=${_cookie_samesite};path=${path};`;
}


/**
 * [Console Function]
 * Get all accesable cookies, prints 'no cookies' if none found.
 * @returns {boolean}
 */
function cookie_get_all() {

    if (document.cookie == "") {
        console.log(`%c⬘%c no cookies %c⬘%c`,
            _cookie_console_colors[0],
            _cookie_console_colors[1],
            _cookie_console_colors[0]);  
        return false;
    }

    let output = "";
    let num = 0;

    for (i of document.cookie.split(";")) {
        output += `%c⬘%c ${i.trim()}  `;
        num++;
    };

    console.log(output, ...Array(num).fill(_cookie_console_colors).flat());  

    return true;
}


/**
 *  [Console Function]
 *  cookie_consolelog (help)
 *  quick console printout of functions, for use inside the console
 * @returns {boolean}
 */
function cookie_consolelog() {

    console.clear();
    console.log(
`%ccookie_consolelog();

%c⬘%c cookie_set(name, value, path = '/')
%c⬘%c cookie_get(name)
%c⬘%c cookie_delete(name, path = '/')
%c⬘%c cookie_get_all()
%c⬘%c cookie_help()
`       , _cookie_console_colors[1],
        ...Array(5).fill(_cookie_console_colors).flat()
    );
    return true;
}


/**
 *  [Console Function]
 *  Prints cookie help screen.
 * @returns {boolean}
 */
function cookie_help() {

    // type cookie_help() in the console ;)

    console.log(`%c
                      /**/
        /*.     .-,  /  /     *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
       /   \\~~~/   \\/  /     |    i know everything about cookies       |
      |     \\_/     \\ /   O |  want to share in some of my knowledge?  |
     /|              |\\ o   *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~* 
__   | |   %cO    O%c     | |             _   ___    ___
%co%c \\  |  \\  ~~~~   /  /  |    ____  __| \\ /   \\  /%cx%c  \\
 x|   \\   \`-..- '\`.-'\`  /   |%cx%c   ||  x || o  | |  o |
_/     \`--.___.- '--'._./ o \\__ / \\__ / \\_x_/  \\___/ 
    %c
    document.cookies are stored like this: "val1=this;val2=that;val3=ilikecookies"
    HttpOnly: Sent to server only, not accesable clientside
    SameSite: Dont send with reqests from other sources (XSRF)
    Path:     Restrict to path ie ~/here/this_path_only (not gettable via JavaScript)
    Domain:   Can include or exclude subdomains
    Secure:   Use only HTTPS
    Expires:  set 0 seconds to delete, dont set for session or seconds till expiry

    %c*%c note on cookie_delete(name, path), if path is incorrect delete will be unsucessfull,
    path cannot be provided with JS so storage console has to be used to find path %c* 

    `,
        _cookie_console_colors[0],
        _cookie_console_colors[1],
        _cookie_console_colors[0],
        'font-weight: 900; font-style: italic; color: #0000FF;',
        _cookie_console_colors[0],
        'font-weight: 900; font-style: italic; color: #FF0000;',
        _cookie_console_colors[0],
        'font-weight: 900; font-style: italic; color: #00FF00;',
        _cookie_console_colors[0],
        _cookie_console_colors[1],
        'font-weight: 900; font-style: italic; color: #00FF00;',
        _cookie_console_colors[1],
        'font-weight: 900; font-style: italic; color: #00FF00;',
        );  


    return true;
}
    

                      /**/
        /*.     .-,  /  /      ____________________________________
       /   \~~~/   \/  /     /   i know eveything about cookies     \
      |     \_/     \ /   O | want to share in some of my knowledge? |
     /|              |\ o    \ ____________________________________ / 
_    | |    O    O    | |                 __    __
o\   |  \  ~~~~   /  /  |    ____  __|\  /  \  /x \
 x|   \   `-..-'`.-'`   /   |x   ||  x || o  ||  o ||\__   
_/     `--.___.-'--'._./   o \__/  \__/  \_x/  \__/ \_*/

/*
    document.cookies are stored like this: "val1=this;val2=that;val3=ilikecookies"
    HttpOnly: Sent to server only, not accesable clientside
    SameSite: Dont send with reqests from other sources (XSFR)
    Path:     Restrict to path ie ~/here/this_path_only
    Domain:   Can include or exclude subdomains
    Secure:   Use only HTTPS
    Expires:  set 0 seconds to delete, dont set for session or seconds till expiry
*/











