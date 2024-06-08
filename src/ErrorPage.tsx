import {useRouteError} from 'react-router-dom';


const ErrorPage = () => {
    let error = useRouteError();
    console.error(error);
    return (
        <div>
            error
            <pre>
                <code>
                    {JSON.stringify(error, null, 4)};
                </code>
            </pre>
        </div>
    );
};

export default ErrorPage;
