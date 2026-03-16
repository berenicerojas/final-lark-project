import PageHeader from "../shared/PageHeader";

const About = () => {
    return (
        <div>
            <PageHeader 
                title = "System Info" 
                subtitle = "About the Luminary Agency Platform" 
            />
                <p> This platform is designed to streamline healthcare marketing project tracking. </p>
                <p> Built with React, Vite, and Airtable API Intergration. </p>
        </div>
    );
};

export default About;