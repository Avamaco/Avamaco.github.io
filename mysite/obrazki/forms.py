from django import forms


class ProstokatForm(forms.Form):
    x = forms.IntegerField(label="X")
    y = forms.IntegerField(label="Y")
    width = forms.IntegerField(label="Width")
    height = forms.IntegerField(label="Height")
    color = forms.CharField(label="Color", max_length=100)
    czy_usuwamy = forms.BooleanField(label="Czy usunac wszystkie?", required=False)


class OpisForm(forms.Form):
    opis = forms.CharField(label="Opis", required=False)
