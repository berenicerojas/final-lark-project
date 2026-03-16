import { useState } from "react";
import axios from "axios";
import styles from './ProjectLog.module.css';

const ProjectForm = ({ onProjectAdded}) => {
    const [name, setName] = useState ('');
    const [brand, setBrand] = useState ('');
    const [error, setError] = useState ('');

    const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
    const ACCESS_TOKEN = import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length < 3){
            setError ("Project name must be at least 3 characters")
            return;
        }
        if (!brand) {
            setError("Brand is required");
        }

        try {
            const response = await axios.post (
                `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
                {
                    fields : {
                        "Project_Name": name,
                        "Brand" : brand,
                        "Status" : "Pending"
                    }
                },
                {
                    headers : {
                        Authorization : `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type" : "application/json"
                    }
                }
            );

            if (response.data) {
                setName('');
                setBrand('');
                setError('');
                onProjectAdded(response.data);
                alert("Project Created Successfully!");
            }
        } catch (err) {
            console.error("Creation failed:", err.response?.data || err.message);
            setError("Failed to create project. Check console for details.");
        }
    };

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3> Add New Account Project</h3>

            <div className= {styles.inputGroup}>
                <label htmlFor="projectName"> Project Name: </label>
                <input
                id="projectName"
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                placeholder="e.g. Q4 Display Banner"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="brand"> Brand: </label>
                <input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g.Tumor"
                />
            </div>

            {error && <p className={styles.errorMsg}> {error} </p>}

            <button type="submit" className={styles.submitBtn}> Create Project </button>
        </form>
    );
};

export default ProjectForm;