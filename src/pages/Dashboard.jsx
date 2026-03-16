import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../shared/PageHeader";
import researchImg from '../assets/research-cells.jpg';
import Container from '../shared/Card';

const Dashboard = () => {
    const [projects, setProjects] = useState ([]);

    const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
    const TOKEN = import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN;
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

    useEffect (() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(url, {
                    headers : { Authorization: `Bearer ${TOKEN}`}
            });
            setProjects(res.data.records);
        } catch (err) {
            console.error("Error fetching projects: ", err);
        }
    };
    fetchProjects();
}, [url, TOKEN]);

    useEffect (() => {
        document.title = 'Luminary Dashboard';

        return () => {
            console.log ("Leaving Dashboard");
        };
    }, []);

    
    return(
        <Container>
            <img
                src = {researchImg}
                alt = "Medical Research Cells"
                style = {{ width: '100%', maxHeight: '300px', objectFit:'cover', borderRadius: '12px' }}
            />
            <PageHeader title = "Agency Dashboard" subtitle = "High-level overview of agency health."/>

            <div 
            style = {{
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                width: '100%'
            }}>
            {projects.length > 0 ? (
                projects.map (( project) => (
                    <div 
                    key = {project.id}
                    style = {{
                        flex: '1 1 300px',
                        minWidth: '280px',
                        padding: '20px', 
                        border: '1px solid #ccc', 
                        borderRadius: '8px'
                    }}>
                    <h4> {project.fields.Brand || "New Project"} </h4>
                    <p> {project.fields.Project_Name || "No Name Provided"} </p>
                </div>
            ))
        ) : (
            <p>No active projects found.</p>
        )}

            </div>
        </Container>
    );
};
export default Dashboard;