const Card = ({ children, className}) => (
    <div
        className = {className} 
        style = {{ 
            border: '1px solid #ddd', 
            padding: '1rem', 
            borderRadius: '8px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
        {children}
    </div>
);
 
export default Card;