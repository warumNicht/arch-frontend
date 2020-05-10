import React from "react";
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();

    return (
        <div>
            <div>
                <p>{t('welcome', 'Hello there')}</p>
            </div>
            <h1>Home page for all users</h1>
        </div>
    );

}

export default Home;