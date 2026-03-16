import PageHeader from '../shared/PageHeader';
import researchImg from '../assets/research-cells.jpg';
import Card from '../shared/Card';

const Home = () => {
    return(
        <Card>
            <div style = {{ width: '100%', textAlign: 'center'}}>
                <img 
                    src = {researchImg} 
                    alt = "Medical Research Background" 
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
                />
            </div>
            <PageHeader
                title = "Luminary Agency Dashboard"
                subtitle = "Welcome to your central hub for project and budget management."
            />
            <section>
                <h3> Getting Started </h3>
                <p> Use the navigation above to track active projects or review account analytics. </p>
            </section>
        </Card>
    );
};

export default Home;