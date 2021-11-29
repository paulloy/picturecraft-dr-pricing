import React, { Fragment, useEffect } from "react";
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { RootState } from "../../reducers";


function Alerts() {
    const alert = useAlert();
    const messages = useSelector((state: RootState) => state.messages);

    useEffect(() => {
        if (messages.success) alert.success(messages.success);
        if (messages.error) alert.error(messages.error);
    }, [messages])

    return <Fragment />;
}

export default Alerts;
