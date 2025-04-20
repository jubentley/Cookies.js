# Cookies.js


![og-image](cookie_help.png)

## Functions

### cookie_set()
Set new cookie or overwrite cooking with the same name.
```JavaScript
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
```


### cookie_get()
```JavaScript

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
```
