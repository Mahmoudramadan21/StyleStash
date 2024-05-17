from django.urls import path
from api.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),
    path('men', views.getMenProducts, name="men-products"),
    path('women', views.getWomenProducts, name="women-products"),
    path('unisex', views.getUnisexProducts, name="unisex-products"),
    path('children', views.getChildrenProducts, name="children-products"),
    path('top/', views.getTopProducts, name='top-products'),

    path('category/<str:name>/', views.getACtegoryOfProducts, name="product-category"),
    path('<int:pk>/', views.getProduct, name="product"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('update/<int:pk>/', views.updateProduct, name="product-update"),
    path('delete/<int:pk>/', views.deleteProduct, name="product-delete"),

    path('<int:pk>/reviews/', views.createProductReview, name="create-review"),
]