export const getConnectionId = function () {
    const createdConnectionId = localStorage.getItem('CONNECTION_ID');
    if (createdConnectionId) {
        return createdConnectionId;
    } else {
        const id = Math.random().toString();
        localStorage.setItem('CONNECTION_ID', id);
        return id;
    }
};