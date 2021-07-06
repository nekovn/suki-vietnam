from rest_framework.pagination import PageNumberPagination


class SearchNumberPagination(PageNumberPagination):
    page_size = 100