# Food Ecommerce Platform with Chatbot Integration
***
This repository contains the code for a food restaurant ecommerce platform developed using React for the frontend and Django for the backend. The project includes a Dialogflow chatbot for seamless customer 
support and automated order processing.

***

## Project Description
**_NOTE:_** This project is a full-stack ecommerce platform designed for a food restaurant. It allows users to browse and purchase food items online, with a user-friendly interface powered by React. 
The backend, built with Django, handles all the server-side operations, including order processing and data management. Additionally, a Dialogflow chatbot is integrated to provide customers with instant support and to automate the order process.

### Features
* User Authentication: Secure login and registration using Django's authentication system.
* Product Catalog: Display of food items with detailed descriptions, prices, and images.
* Shopping Cart: Functionality for adding, removing, and updating items in the cart.
* Order Management: Automated order processing and real-time order status updates.
* Chatbot Integration: A Dialogflow chatbot for customer support and automated order processing.

#### Prerequisites
* Node.js
* Python 3.x
* Django
* Dialogflow account



### Clone the repository
```
git clone https://github.com/Savoyevatel/food_chatbot
```
#### Frontend Setup

Navigate to the frontend directory

```
cd backend/frontend
```

Install the required packages
```
npm install
```

Start the React development server
```
npm start
```

#### Backend Setup

Navigate to the backend directory

```
cd backend
```

Create a virtual environment

```
python3 -m venv venv
source venv/bin/activate
```

Install the required packages
```
pip install -r requirements.txt
```

Apply migrations and start the Django development server
```
python manage.py migrate
python manage.py runserver
```

### Chatbot Integration

The Dialogflow chatbot is integrated into the platform to provide customer support and automate order processing.

Dialogflow Setup
* Create a new agent in Dialogflow.
* Define intents and entities to handle customer queries and order processing.
* Integrate the chatbot with the Django backend using Dialogflow's fulfillment feature.
### Running the Project
To run the project, ensure both the frontend and backend servers are running simultaneously. The React frontend will interact with the Django backend to process user requests and orders.
```
# In one terminal window, start the React frontend
cd frontend
npm start

# In another terminal window, start the Django backend
cd backend
source venv/bin/activate
python manage.py runserver
```





## References
<a id="1">[1]</a>
Ptak, R., Zygadlo, B., Unold, O. (2017). Projection-Based Text Line Segmentation with a Variable
Threshold.
International Journal of Applied Mathematics and Computer Science, 27, doi:10.1515/amcs-2017-0014.
[Django documentation](https://docs.djangoproject.com/en/3.2/))

<a id="2">[2]</a>
Berat Kurar, B., Cohen, R., Droby, A., Rabaev, I. & El-Sana, J. (2020). Learning-Free Text Line Segmentation for Historical
Handwritten Documents.
Applied Sciences, 10, 8276; doi:10.3390/app10228276.
[React documentation]((https://react.dev/)

<a id="3">[3]</a>
Dutta, Kartik & Krishnan, Praveen & Mathew, Minesh & Jawahar, C.V.. (2018). Improving CNN-RNN Hybrid Networks for Handwriting Recognition.
80-85, doi:10.1109/ICFHR-2018.2018.00023.
([Dialog flow documentation](https://cloud.google.com/dialogflow/docs/))
