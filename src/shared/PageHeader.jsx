const PageHeader = ({title, subtitle}) => {
    return (
        <header style={{paddingBottom:'20px', borderBottom:'2px solid #eee', marginBottom: '20px'}}>
            <h1 style ={{color: '#333', margin: 0}}> {title} </h1>
            {subtitle && <p style={{color:'#666', marginTop:'5px'}}>{subtitle}</p>}
        </header>
    );
};

export default PageHeader;