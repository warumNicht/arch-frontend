import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import {getLangCookie} from '../util/LangPrefixUtil';

function PrefixRedirect(props: any) {

    console.log(props.cookies)
    console.log(props.match.path)
    return (
        <Redirect to={{ pathname: `/${getLangCookie(props)}/` }} />
    );
}

export default withCookies(PrefixRedirect);