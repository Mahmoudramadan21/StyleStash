from django.shortcuts import render
import re
from django.db.models import Q

# rest-framework
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

# User model & serializers and models
from django.contrib.auth.models import User
from api.serializers import UserSerializer, UserSerializerWithToken, ProductSerializer
from api.models import *
# pagination
from django.core.paginator import Paginator, PageNotAnInteger, Page

#***************************************************************************#

# Get All Products
@api_view(['GET'])
def getProducts(request):
    try:
        query = request.query_params.get('q')
        if query is None:
            query = ''

        products = Product.objects.filter(
            name__icontains=query).order_by('-createdAt')

        # page = request.query_params.get('page')
        # paginator = Paginator(products, 4)

        # try:
        #     products = paginator.page(page)
        # except PageNotAnInteger:
        #     products = paginator.page(1)
        # except EmptyPage:
        #     products = paginator.page(paginator.num_pages)

        # if Page == None:
        #     page = 1

        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data})

    except:
        # Handle unexpected errors
        return Response('Unexpected error')

# Get Men Products
@api_view(['GET'])
def getMenProducts(request):
    try:
        query = request.query_params.get('q')
        if query is None:
            query = ''

        products = Product.objects.filter(
            name__icontains=query, typeOfProduct="Men").order_by('-createdAt')

        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data})

    except:
        # Handle unexpected errors
        return Response('Unexpected error')

# Get Women Products
@api_view(['GET'])
def getWomenProducts(request):
    try:
        query = request.query_params.get('q')
        if query is None:
            query = ''

        products = Product.objects.filter(
            name__icontains=query, typeOfProduct="Women").order_by('-createdAt')

        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data})

    except:
        # Handle unexpected errors
        return Response('Unexpected error')

# Get Unisex Products
@api_view(['GET'])
def getUnisexProducts(request):
    try:
        query = request.query_params.get('q')
        if query is None:
            query = ''

        products = Product.objects.filter(
            name__icontains=query, typeOfProduct="Unisex").order_by('-createdAt')

        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data})

    except:
        # Handle unexpected errors
        return Response('Unexpected error')

# Get Unisex Products
@api_view(['GET'])
def getChildrenProducts(request):
    try:
        query = request.query_params.get('q')
        if query is None:
            query = ''

        products = Product.objects.filter(
            name__icontains=query, typeOfProduct="Children").order_by('-createdAt')

        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data})

    except:
        # Handle unexpected errors
        return Response('Unexpected error')


# Get Top Products
@api_view(['GET'])
def getTopProducts(request):
    try:
        products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except:
        # Handle unexpected errors
        return Response('Unexpected error')


# Get a Product
@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    except:
        # Handle unexpected errors
        return Response('Unexpected error')


# Get a Product by using category and filter
@api_view(['GET'])
def getACtegoryOfProducts(request, name):
    try:
        query = request.query_params.get('q', '')
        product_category = request.query_params.get('category', '')
        size = request.query_params.get('size', '')
        color = request.query_params.get('color', '')
        min_price = request.query_params.get('min_price', '')
        max_price = request.query_params.get('max_price', '')

        products = Product.objects.filter(
            typeOfProduct__icontains=name,
            name__icontains=query
        )

        if product_category:
            products = products.filter(categoryOfProduct__icontains=product_category)

        if size:
            products = products.filter(sizeOfProduct__icontains=size)

        if color:
            products = products.filter(colorOfProduct__icontains=color)

        if min_price:
            products = products.filter(price__gte=min_price)

        if max_price:
            products = products.filter(price__lte=max_price)

        products = products.order_by('-createdAt')

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    except Exception as e:
        # Handle unexpected errors
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create a Product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    try:
        user = request.user
        data = request.data

        product = Product.objects.create(
            user = user,
            name = data['name'],
            image = request.FILES.get('image'),
            price = data['price'],
            description = data['description'],
            categoryOfProduct = data['category'],
            typeOfProduct = data['type'],
            sizeOfProduct = data['size'],
            countInStock = data['count'],
        )
        print(request.FILES.get('image'))
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    except Exception as e:
        # Handle unexpected errors
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        data = request.data

        # Update product attributes
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.description = data.get('description', product.description)
        product.categoryOfProduct = data.get('category', product.categoryOfProduct)
        product.typeOfProduct = data.get('type', product.typeOfProduct)
        product.sizeOfProduct = data.get('size', product.sizeOfProduct)
        product.colorOfProduct = data.get('color', product.colorOfProduct)
        product.countInStock = data.get('count-in-stock', product.countInStock)

        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


# Delete a Product
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response('Product was deleted successfully')

    except:
        # Handle unexpected errors
        return Response('Unexpected error')


# Create a Product Review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    try:
        user = request.user
        product = Product.objects.get(id=pk)
        data = request.data

        # 1 - Review already exists
        alreadyExists = product.review_set.filter(user=user).exists()
        if alreadyExists:
            content = {'detail': 'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # 2 - No Rating or 0
        elif data['rating'] == 0:
            content = {'detail': 'Please select a rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # 3 - Create review
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment'],
            )

            reviews = product.review_set.all()
            product.numOfReviews = len(reviews)

            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews)
            product.save()

            return Response('Review Added')
    except:
        # Handle unexpected errors
        return Response('Unexpected error')
