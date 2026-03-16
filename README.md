## API Connection & Setup This project requires an **Airtable** account to function. 

1. **Airtable Base Requirements**:
- Create a base with a table (default name: `Projects`).

- The table must contain the following fields: 
    - `Project Name` (Single line text) 
    - `Brand` (Single line text) 
    - `Status` (Single line text) 

2. **Environment Variables**:
- Create a file named `.env.local` in the root directory. 
- Use the `.env.local.example` file as a template. 
- Fill in your specific Airtable credentials: 

`text 
    VITE_AIRTABLE_BASE_ID=your_base_id_here 
    VITE_AIRTABLE_TABLE_NAME=your_table_name_here 
    VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN=your_token_here

3. **Install Dependencies**
- npm install

4. **Start Server**
- npm run dev

5. **Build Production**
- npm run build