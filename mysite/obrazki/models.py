from datetime import datetime

from django.db import models
from django.contrib.auth.models import User


class ObrazekTag(models.Model):
    nazwa = models.CharField(max_length=50)


class Obrazek(models.Model):
    nazwa = models.CharField(max_length=200)
    width = models.IntegerField()
    height = models.IntegerField()
    autor = models.ManyToManyField(User)
    opis = models.CharField(max_length=200, default="")
    data_publikacji = models.DateTimeField(default=datetime.now)
    tags = models.ManyToManyField(ObrazekTag)


class Prostokat(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    color = models.CharField(max_length=100)
    obrazek = models.ForeignKey(Obrazek, on_delete=models.CASCADE)
