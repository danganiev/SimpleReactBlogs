from django.db import models

# Create your models here.
class Post(models.Model):
    name = models.CharField(max_length = 1000)
    text = models.TextField()