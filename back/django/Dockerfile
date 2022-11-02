FROM python:3

RUN ls -al

RUN pip install -r requirements.txt

RUN cd /chatbots/ppy-hanspell

RUN la -al

RUN python setup.py install

EXPOSE 8001

CMD ["python3", "manage.py", "runserver", "8001" ]