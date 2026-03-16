const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const TOKEN = import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN;

const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

export const updateProjectStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Active" : "Completed";

    const options = {
        method : 'Patch',
        headers : {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            fields : {
                "Status" : newStatus
            }
        })
    };

    try {
        const response = await fetch(`${url}/${id}`, options);
        if (!response.ok) throw new Error ("Update failed");
        return await response.json();
    } catch (error) {
        console.error("Update Error:", error);
        return null;
    }
};

export const createProject = async (projectData) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ fields: projectData})
    };

    try {
        const response = await fetch (url, options);
        if (!response.ok) throw new Error ("Failed to create project");
        return await response.json();
    } catch (error) {
        console.error ("Post Error:", error);
        return null;
    }
};

export const fetchProjects = async () => {
    const options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${TOKEN}`},
    };

    try {
        const response = await fetch (url, options);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        return data.records.map((record) => ({
            id: record.id,
            ...record.fields,
        }));
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
};