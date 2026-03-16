import Container from '../shared/Card';
import ProjectForm from "../features/ProjectTracker/ProjectForm";
import { useState, useEffect, useCallback } from "react";
import PageHeader from "../shared/PageHeader";
import Loader from "../shared/Loader";
import BudgetAnalysis from "../features/Budget/BudgetAnalysis";
import { fetchProjects, updateProjectStatus } from "../airtable";
import styles from '../features/ProjectTracker/ProjectLog.module.css';

const ProjectLog = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const totalEstimate = projects.reduce ((sum, project) => sum + (Number(project.Estimate) || 0 ), 0);

    const handleStatusUpdate = async (id, currentStatus) => {
        const updatedRecord = await updateProjectStatus (id, currentStatus);
        if (updatedRecord) {
            setProjects ((prev) =>
                prev.map((p) => (p.id === id ? {...p, Status: updatedRecord.fields.Status} : p))
            );
        }
    };

    const handleProjectAdded = useCallback ((newProject) => {
        setProjects ((prev) => [newProject, ...prev]);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const getProjects = async () => {
            setIsLoading(true);
            const data = await fetchProjects();
            if (isMounted) {
                if (data) setProjects (data);
                else setError("Fail to load projects.")
                setIsLoading(false);
            }
        };
        getProjects();

        return () => {isMounted = false; };
    }, []);
    
    useEffect(() => {
        document.title = `Luminary - ${projects.length} Active Projects `
    }, [projects]);

    if (isLoading) return <Loader/>

    if (error) return <div className = {styles.error}> {error} </div>

    return (
        <Container className = {styles.container}>
            <PageHeader
                title = "Active Project & PO Tracker"
                subtitle = "Real-Time Status of Agency Billing and Project Milestones."
            />
            <ProjectForm onProjectAdded = {handleProjectAdded}/>
            <BudgetAnalysis totalEstimate = {totalEstimate}/>
            
            <div className = {styles.grid}>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key = {project.id} className={styles.card}>
                            <h3>{project.Project_Name}</h3>
                            <p><strong> Brand: </strong> {project.Brand} </p>
                            <p><strong> PO Number: </strong> {project.PO_Number}</p>
                            <p className = {styles.price}>
                                ${Number(project.Estimate).toLocaleString()}
                            </p>
                            <span className = {styles.statusBadge}> {project.Status} </span>
                            <button 
                                onClick={() => handleStatusUpdate(project.id, project.Status)}
                                style = {{ fontSize: '0.7rem', padding: '5px'}}
                            >
                                Advance Status
                            </button>
                        </div>
                    ))
                ):(
                    <p> No projects found. Time to open some POs! </p>
                )}
            </div>
        </Container>
    );
};

export default ProjectLog;