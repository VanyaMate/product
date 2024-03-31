import React from 'react';


export type AdminAppProps = {};

const AdminApp: React.FC<AdminAppProps> = (props) => {
    const {} = props;

    return (
        <div>
            { 'Admin app' }
        </div>
    );
};

export default React.memo(AdminApp);