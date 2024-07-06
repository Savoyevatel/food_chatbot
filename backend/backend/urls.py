from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.urls import path
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
    path('api/chatbot/', include('base.urls.chat_urls')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)