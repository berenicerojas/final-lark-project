const BudgetAnalysis = ({ totalEstimate }) => {
    return (
        <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px'}}>
            <h4> Budget Analysis Feature </h4>
            <p><strong> Total Account Exposure: </strong> ${totalEstimate.toLocaleString()} </p>
            <p><small> Calculated from all active records in Airtable. </small></p>
        </div>
    );
};

export default BudgetAnalysis;