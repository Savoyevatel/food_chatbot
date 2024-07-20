from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
import re
from django.views.decorators.http import require_http_methods
import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
import re

progress_order = {}

@csrf_exempt
@require_POST
def webhook(request):
    # Parse the incoming JSON
    data = json.loads(request.body)
    
    # Extract the intent and parameters
    intent = data['queryResult']['intent']['displayName']
    parameters = data['queryResult']['parameters']
    
    # Extract full context name as session ID
    session_id = None
    for context in data['queryResult']['outputContexts']:
        if 'ongoing-order' in context['name']:
            session_id = context['name']
            session_id = extract_session_id(session_id)
            break
    
    if not session_id:
        return JsonResponse({'fulfillmentText': 'Error: Context name not found'})

    # Route to the appropriate function based on intent
    if intent == 'order.add - context: ongoing-order':
        return handle_order_add(parameters, session_id)
    
    elif intent == 'order.complete - context: ongoing-order':
        return handle_order_complete(parameters, session_id)
    
    elif intent == 'order.remove - context: ongoing-order':
        return handle_order_remove(parameters, session_id)
    
    elif intent == 'track-order':
        return handle_order_track(parameters, session_id)

    else:
        return JsonResponse({'fulfillmentText': f'Intent {intent} not supported'})

def handle_order_add(parameters, session_id):
    # Log the received parameters
    logging.info(f"Received parameters: {parameters}")

    # Extract relevant parameters
    food_items = parameters.get('food-item', [])
    numbers = parameters.get('number', [])

    logging.info(f"Food items: {food_items}")
    logging.info(f"Numbers: {numbers}")

    # Ensure numbers list is at least as long as food_items list
    numbers = [int(n) if n else 1 for n in numbers]  # Convert to int, use 1 if empty
    numbers.extend([1] * (len(food_items) - len(numbers)))

    logging.info(f"Processed numbers: {numbers}")

    # If the session doesn't exist in progress_order, create it
    if session_id not in progress_order:
        progress_order[session_id] = {}

    added_items = []

    # Process each food item with its corresponding number
    for food_item, number in zip(food_items, numbers):
        # Update the quantity for the food item
        if food_item in progress_order[session_id]:
            progress_order[session_id][food_item] += number
        else:
            progress_order[session_id][food_item] = number
        
        added_items.append(f"{number} {food_item}")

    order_string = get_string_from_food_dict(progress_order[session_id])
    
    if added_items:
        added_items_str = ", ".join(added_items)
        response_text = f"Added {added_items_str} to your order. Anything else?"
        #response_text = f"Added {added_items_str} to your order. So far you have {order_string}. Anything else?"
    else:
        response_text = "I'm sorry, but I couldn't add any items to your order. Could you please specify the food items and quantities?"

    logging.info(f"Response text: {response_text}")
    return JsonResponse({
        'fulfillmentText': response_text
    })

def handle_order_remove(parameters, session_id):
    # Extract relevant parameters
    food_items = parameters.get('food-item', [])
    numbers = parameters.get('number', [])

    # Use the first food item and number if available, otherwise use defaults
    food_item = food_items[0] if food_items else ''
    number = int(numbers[0]) if numbers else 1

    if session_id not in progress_order:
        return JsonResponse({
            'fulfillmentText': f"I'm sorry, but you don't have an active order to remove items from. (Context: {session_id})"
        })

    if food_item not in progress_order[session_id]:
        return JsonResponse({
            'fulfillmentText': f"I'm sorry, but {food_item} is not in your current order."
        })

    current_quantity = progress_order[session_id][food_item]
    if number >= current_quantity:
        del progress_order[session_id][food_item]
        removed_quantity = current_quantity
    else:
        progress_order[session_id][food_item] -= number
        removed_quantity = number

    # If the order becomes empty after removal, delete the session entry
    if not progress_order[session_id]:
        del progress_order[session_id]
        return JsonResponse({
            'fulfillmentText': f"Removed {removed_quantity} {food_item} from your order. Your order is now empty."
        })

    # Get updated order string
    order_string = get_string_from_food_dict(progress_order[session_id])
    
    response_text = f"Removed {removed_quantity} {food_item} from your order."
    
    return JsonResponse({
        'fulfillmentText': response_text
    })


from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from base.models import Product

def handle_order_complete(parameters, session_id):
    response_text = ""
    
    order_string = get_string_from_food_dict(progress_order[session_id])
    
    response_text = f"Great! Your order is complete. Here's what you've ordered: {order_string}. (This is your id: {session_id})"
    
    action_complete = progress_order[session_id]



    # Create an empty dictionary to hold the new data
    #action_complete = {'Fanta': 5, 'Coca cola': 3}
    mapped_action_complete = map_product_names_to_ids(action_complete)
    action_complete = mapped_action_complete
    print(mapped_action_complete)
        
    # Send action_complete to the frontend via WebSocket
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "order_updates",
        {
            "type": "order_complete",
            "action_complete": action_complete,
            "session_id": session_id
        }
    )
    
    # Clear the order from progress_order after completing
    del progress_order[session_id]
    
    return JsonResponse({
        'fulfillmentText': response_text,
        'action_complete': action_complete
    })

def handle_order_track(parameters, session_id):
    if session_id in progress_order:
        order_string = get_string_from_food_dict(progress_order[session_id])
        response_text = f"Here's what you've ordered: {order_string}. (This is your id: {session_id})"
        
    else:
        response_text = f"I'm sorry, but I couldn't find an active order for this session. (this is your id: {session_id})"
    
    return JsonResponse({
        'fulfillmentText': response_text
    })


def extract_session_id(name):
    match = re.search(r'/sessions/(.*?)/contexts/', name)
    if match:
        extracted_string = match.group(1)
        return extracted_string     
    return ""

def get_string_from_food_dict(food_dict):
    return ", ".join([f"{quantity} {item}" for item, quantity in food_dict.items()])

def map_product_names_to_ids(action_complete):
    action_complete_with_ids = {}

    for product_name, v_value in action_complete.items():
        try:
            # Fetch the product object by name
            product = Product.objects.get(name=product_name)
            # Map the product id to the value
            action_complete_with_ids[product._id] = v_value
        except Product.DoesNotExist:
            # Handle the case where the product does not exist
            print(f"Product with name '{product_name}' does not exist.")
    
    return action_complete_with_ids

# Example usage:
