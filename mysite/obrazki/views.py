from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from django.core.paginator import Paginator
from django.http import HttpResponseRedirect

from .models import Obrazek, Prostokat, ObrazekTag
from .forms import ProstokatForm, OpisForm
from django.utils.safestring import mark_safe


def _filter_tag(obrazki_list, tag):
    if tag == "":
        return obrazki_list
    result = []
    for o in obrazki_list:
        # print(o.tags)
        tag_names = [t.nazwa for t in o.tags.all()]
        if tag in tag_names:
            result.append(o)
    return result


def index(request):
    return page(request, 1)


def page(request, page_number):
    current_sorting = "less"
    if "sortowanie" in request.GET:
        current_sorting = request.GET["sortowanie"]
    current_tag = ""
    if "filtruj" in request.GET:
        current_tag = request.GET["filtruj"]
    obrazki_list = list(Obrazek.objects.all())
    obrazki_list.sort(key=lambda o: o.data_publikacji, reverse=(current_sorting == "less"))
    obrazki_list = _filter_tag(obrazki_list, current_tag)
    if not obrazki_list:
        return render(request, "obrazki/index.html", {"available_tags": [tag.nazwa for tag in ObrazekTag.objects.all()], "current_tag": current_tag})
    svg_list = []
    for obrazek in obrazki_list:
        prostkaty = Prostokat.objects.filter(obrazek=obrazek)
        svg_text = f'<svg width="100" height="100" viewBox="0 0 {obrazek.width} {obrazek.height}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'
        for p in prostkaty:
            svg_text += f'<rect x="{p.x}" y="{p.y}" width="{p.width}" height="{p.height}" fill="{p.color}"></rect>\n'
        svg_text += '</svg>'
        svg_list.append(mark_safe(svg_text))
    wpisy = list(zip(obrazki_list, svg_list))
    total_pages = Paginator(wpisy, 4).num_pages
    if page_number > total_pages:
        page_number = 1
    this_page = Paginator(wpisy, 4).page(page_number)
    next_page_nr = page_number + 1 if this_page.has_next() else page_number
    prev_page_nr = page_number - 1 if this_page.has_previous() else page_number
    sorting_name = "malejąco" if current_sorting == "less" else "rosnąco"
    available_tags = [tag.nazwa for tag in ObrazekTag.objects.all()]
    context = {"obrazki_list": this_page.object_list,
               "next_page_nr": next_page_nr,
               "prev_page_nr": prev_page_nr,
               "this_page_nr": page_number,
               "total_pages": total_pages,
               "sorting_name": sorting_name,
               "current_sorting": current_sorting,
               "available_tags": available_tags,
               "current_tag": current_tag}
    return render(request, "obrazki/index.html", context)

def detail(request, id):
    obrazek = Obrazek.objects.get(id=id)
    prostkaty = Prostokat.objects.filter(obrazek=obrazek)
    svg_text = f'<svg width="{obrazek.width}" height="{obrazek.height}" viewBox="0 0 {obrazek.width} {obrazek.height}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'
    for p in prostkaty:
        svg_text += f'<rect x="{p.x}" y="{p.y}" width="{p.width}" height="{p.height}" fill="{p.color}"></rect>\n'
    svg_text += '</svg>'
    context = {"obrazek": obrazek, "svg_text": mark_safe(svg_text)}
    return render(request, "obrazki/widok.html", context)


def edit(request, id):
    obrazek = Obrazek.objects.get(id=id)
    if request.user not in obrazek.autor.all():
        return HttpResponse('Nie masz dostępu. <a href="/obrazki/">Powrót do listy obrazków</a>', status=503)
    prostkaty = Prostokat.objects.filter(obrazek=obrazek)
    form = ProstokatForm()
    form2 = OpisForm()
    if request.method == "POST":
        if "opis" in request.POST.keys():
            print("hej")
            form2 = OpisForm(request.POST)
            if form2.is_valid():
                obrazek.opis = form2.cleaned_data["opis"]
                obrazek.save()
                return HttpResponseRedirect("")
        # create a form instance and populate it with data from the request:
        form = ProstokatForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            if "czy_usuwamy" in form.cleaned_data and form.cleaned_data["czy_usuwamy"]:
                prostkaty.delete()
            else:
                prostokat = Prostokat()
                prostokat.x = form.cleaned_data["x"]
                prostokat.y = form.cleaned_data["y"]
                prostokat.width = form.cleaned_data["width"]
                prostokat.height = form.cleaned_data["height"]
                prostokat.color = form.cleaned_data["color"]
                prostokat.obrazek = obrazek
                # obrazek.opis = form.cleaned_data["opis"]
                prostokat.save()
            return HttpResponseRedirect("")

    svg_text = f'<svg width="{obrazek.width}" height="{obrazek.height}" viewBox="0 0 {obrazek.width} {obrazek.height}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n'
    for p in prostkaty:
        svg_text += f'<rect x="{p.x}" y="{p.y}" width="{p.width}" height="{p.height}" fill="{p.color}"></rect>\n'
    svg_text += '</svg>'
    context = {"obrazek": obrazek, "svg_text": mark_safe(svg_text), "form": form, "form2": form2}
    return render(request, "obrazki/edit.html", context)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)