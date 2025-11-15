First run the frontend part 
# cd/frontend
# npm run dev   //for cheaking the frontend

Now go to backend part
!! if python3 is not working try with python only 

# cd backend
// creating virtual environment
# python3  -m venv .venv
// Activate the environment
# source .venv/scripts/activate   //for windows
# source .venv/bin/activate    // for linux
// download the required packages
# pip install -r requirements.txt
// migrate it for db creation
# python3 manage.py migrate
// Run the server
# python3 manage.py runserver



After these step run with a single command 

make sure all the port is stopped

# cd frontend
# npm run dev-all




