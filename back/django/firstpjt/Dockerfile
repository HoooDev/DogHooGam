FROM python:3
WORKDIR /usr/src/django

RUN pip install -r requirements.txt

WORKDIR /usr/src/django/chatbots/ppy-hanspell

RUN la -al

RUN python setup.py install

EXPOSE 8001

CMD ["python3", "manage.py", "runserver", "8001" ]