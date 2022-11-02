FROM python:3
WORKDIR /usr/src/django

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8001

CMD ["python", "manage.py", "runserver", "8001" ]