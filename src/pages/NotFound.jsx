import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{textAlign: 'center', padding: '50px'}}>
            <h1> 404 - Page Not Found </h1>
            <p> OOPS! The agency dashboard you're looking for doesn't exist. </p>
            <Link to="/" style={{color:'#1976d2', fontWeight: 'bold'}}> 
                Return to Dashboard 
            </Link>
        </div>
    );
};

export default NotFound;