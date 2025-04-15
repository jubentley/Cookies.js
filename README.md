# Cookies.js


![og-image](cookie_help.png)

## Functions
### cookie_set()
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

Set new cookie or overwrite cooking with the same name.
