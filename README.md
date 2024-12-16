# Account-Transfer-Task
small web app using Django that handles fund transfers between two accounts, the app should support importing a list of accounts with opening balances, querying these accounts, and transferring funds between any two accounts.

## Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd api
Create and activate a virtual environment:

For Windows:
 
venv\Scripts\activate
For macOS/Linux:
 
source venv/bin/activate
Install the required dependencies:

 
pip install -r requirements.txt
Update the .env file with your database credentials and other environment variables.

Apply migrations to set up the database:

 
python manage.py makemigrations
python manage.py migrate
Start the Django development server:

 
python manage.py runserver
Frontend Setup (React)
Navigate to the client directory:

 
cd client
Install the frontend dependencies:

 
npm install
Start the development server:

 
npm run dev
Update axiosInstance.js with your backend base URL for making API requests.
