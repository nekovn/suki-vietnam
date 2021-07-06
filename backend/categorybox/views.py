from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Category, CategoryItem
from .mypaginations import MyPageNumberPagination
from .searchpagination import SearchNumberPagination
from .serializers import CategorySerializer, CategoryItemSerializer
from rest_framework import filters
from rest_framework import generics
# category
class CategoryViewSet(generics.ListAPIView):
        queryset = Category.objects.filter(is_active=True)
        serializer_class = CategorySerializer
        pagination_class = MyPageNumberPagination
    # def update(self, request, pk=None):
    #     categories = Category.objects.get(id=pk)
    #     serializer = CategorySerializer(instance=categories, data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

# class CategoryViewSet(viewsets.GenericViewSet):
#
#     def list(self, request):
#         categories = Category.objects.filter(is_active=True)
#         serializer = CategorySerializer(categories, many=True)
#         return Response(serializer.data)


# category item


class CategoryItemViewSet(viewsets.GenericViewSet):

    def list(self, request):
        categories_item = CategoryItem.objects.filter(is_active=True)
        serializer = CategoryItemSerializer(categories_item, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        categories_item = CategoryItem.objects.filter(category=pk)
        serializer = CategoryItemSerializer(categories_item, many=True)
        return Response(serializer.data)
    #
    # def update(self, request, pk=None):
    #     categories_item = CategoryItem.objects.get(id=pk)
    #     serializer = CategoryItemSerializer(instance=categories_item, data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    #
    # def destroy(self, request, pk=None):
    #     categories_item = CategoryItem.objects.get(id=pk)
    #     categories_item.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

class ApiItemListView(generics.ListAPIView):
    queryset = CategoryItem.objects.filter(is_active=True)
    serializer_class = CategoryItemSerializer
    pagination_class = SearchNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
