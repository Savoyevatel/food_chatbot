from channels.generic.websocket import AsyncWebsocketConsumer
import json

class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("order_updates", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("order_updates", self.channel_name)

    async def order_complete(self, event):
        await self.send(text_data=json.dumps({
            'type': 'order_complete',
            'action_complete': event['action_complete'],
            'session_id': event['session_id']
        }))