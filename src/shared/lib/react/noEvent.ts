import { MouseEventHandler } from 'react';


export const noEvent: MouseEventHandler = function (event) {
    event.preventDefault();
};