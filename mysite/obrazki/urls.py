from django.urls import path

from . import views

urlpatterns = [
    # ex: /obrazki/
    path("", views.index, name="index"),
    # ex: /obrazki/1/
    path("<int:id>/", views.detail, name="detail"),
    # ex: /obrazki/1/edit/
    path("<int:id>/edit/", views.edit, name="edit"),
    # ex: /obrazki/page/1/
    path("page/<int:page_number>/", views.page, name="page"),
]