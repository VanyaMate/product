import React from 'react';


export type AdminAppProps = {};

const AdminApp: React.FC<AdminAppProps> = (props) => {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            Admin app
        </div>
    );
};

export default React.memo(AdminApp);