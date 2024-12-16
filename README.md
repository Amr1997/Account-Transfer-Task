# Account-Transfer-Task
small web app using Django that handles fund transfers between two accounts, the app should support importing a list of accounts with opening balances, querying these accounts, and transferring funds between any two accounts.

## Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd api
Create and activate a virtual environment:

For Windows:
bash
Copy code
venv\Scripts\activate
For macOS/Linux:
bash
Copy code
source venv/bin/activate
Install the required dependencies:

bash
Copy code
pip install -r requirements.txt
Update the .env file with your database credentials and other environment variables.

Apply migrations to set up the database:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Start the Django development server:

bash
Copy code
python manage.py runserver
Frontend Setup (React)
Navigate to the client directory:

bash
Copy code
cd client
Install the frontend dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Update axiosInstance.js with your backend base URL for making API requests.
