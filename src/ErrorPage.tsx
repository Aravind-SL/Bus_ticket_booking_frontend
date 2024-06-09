import {useRouteError} from 'react-router-dom';


const ErrorPage = () => {
    let error: any = useRouteError();
    return (
        <div>
            {error.status} {error.statusText}
        </div>
    );
};

export default ErrorPage;
