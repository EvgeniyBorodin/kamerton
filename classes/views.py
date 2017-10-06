from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import datetime
from django.core.mail import send_mail, BadHeaderError

from django.views.decorators.csrf import csrf_exempt

from kamerton import settings


def index(request):
    current_year = datetime.datetime.now().year
    ctx = {'year': current_year}
    return render(request, 'classes/index.html', ctx)


def order(request):
    name = request.POST.get('name', None)
    email = request.POST.get('email', None)
    phone = request.POST.get('phone', None)
    age = request.POST.get('age', None)
    gender = request.POST.get('gender', None)
    studio = request.POST.get('studio', None)
    subject = 'Онлайн-заявка от родителя: %s' % name
    msg = '<div>Имя: %s</div><div>Телефон: %s</div><div>Электронная почта: %s</div><div>Возраст ребёнка: %s</div><div>Пол ребёнка: %s</div><div>Направление: %s</div>' % (name, phone, email, age, gender, studio)
    send_mail(subject, msg, settings.EMAIL_HOST_USER, ['borobit@gmail.com'], fail_silently=False, html_message=msg)
    return HttpResponse('success')