from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import LogoBox
from .serializers import LogoBoxSerializer
from bs4 import BeautifulSoup
from urllib.request import urlopen, Request
import urllib.parse

class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        logos = LogoBox.objects.all()
        serializer = LogoBoxSerializer(logos, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = LogoBoxSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        logos = LogoBox.objects.get(id=pk)
        serializer = LogoBoxSerializer(logos)
        return Response(serializer.data)

    def update(self, request, pk=None):
        logos = LogoBox.objects.get(id=pk)
        serializer = LogoBoxSerializer(instance=logos, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):
        logos = LogoBox.objects.get(id=pk)
        logos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetDataFromGG(viewsets.ViewSet):
    def list (self, request):
        url = request.data['url']
        req = Request(url, headers = {'User-agent': 'Super Bot Power Level Over 9000'})
#         req = Request(url, headers = {"User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"})
        html = urlopen(req).read()
        soup = BeautifulSoup(html)
        images = []
        for img in soup.findAll('img'):
            images.append(img.get('src'))

        og_image = soup.find("meta", property="og:image")
        rel_image = soup.find("link", rel="apple-touch-icon")
        rel_icon = soup.find("link", rel="icon")


        if rel_icon is not None:
             images.append(rel_icon['href'])
        if rel_image is not None:
            images.insert(0,rel_image['href'].replace("./", "/"))
        if og_image is not None :
            images.append(og_image['content'].replace("./", "/"))

        images = list(dict.fromkeys(images))
        return Response(images, status=status.HTTP_202_ACCEPTED)