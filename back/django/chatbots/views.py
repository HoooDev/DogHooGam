from django.shortcuts import render
from django_pandas.io import read_frame
from .models import SymptomTable, DiseaseTable, SymptomData, NotName
import pandas as pd
from sentence_transformers import SentenceTransformer
from konlpy.tag import Kkma
from .findintent.questions import questions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SymptomSerializer
from hanspell import spell_checker
from .apps import ChatbotsConfig
import json
import pprint
# from raw_api import validate_json
# Create your views here.


    
@api_view(['GET'])
def index(request):
    pass    
@api_view(['GET'])
def indata(request):
    # 데이터 받기
    sentence = request.GET['data']
    # 형태소 분석기 framework
    kkma = Kkma()
    
    # 띄어쓰기 체크
    spelled_sent = spell_checker.check(sentence)
    checked_sent = spelled_sent.checked
    
    # 증상데이터, 입력 증상 테이블 불러오기
    symptomtable = SymptomTable.objects.all()
    notname = NotName.objects.all()
    
    # 테이블 pandas로 읽기
    notnamedata = read_frame(notname)    
    data = read_frame(symptomtable)
    
    
    sentences = []
    st = []
    kkma_sentence = kkma.pos(checked_sent)
    no_st = []
    lst = []
    flag = 0
    sym = 0
    noname = 0
    answers = []
    intents = []
    for i in range(len(kkma_sentence)):
        print(kkma_sentence[i][0], kkma_sentence[i][1])
        if kkma_sentence[i][1] == 'UN' or kkma_sentence[i][1] == 'EMO' or kkma_sentence[i][1][0] == 'S' or kkma_sentence[i][1][0] == 'O':
            continue
        if kkma_sentence[i][1][0] == 'N':
            if notnamedata['name'].str.contains(kkma_sentence[i][0]).sum() ==0:
                continue
        if kkma_sentence[i][1] == 'JKS':
            if len(lst) != 0:
                lst.append(kkma_sentence[i][0])
            if len(no_st) == 0:
                continue
            else:
                no_st.append(kkma_sentence[i][0])
                continue
        if len(notnamedata[notnamedata['name'] == kkma_sentence[i][0]]):
                sym = 1
        no_st.append(kkma_sentence[i][0])
        if kkma_sentence[i][1][0] == 'V':
            sym = 1

        if kkma_sentence[i][1][0] == 'N':
            if len(notnamedata[notnamedata['name'] == kkma_sentence[i][0]]):
                sym = 1
                lst.append(kkma_sentence[i][0])
        elif kkma_sentence[i][0] == '열이' :
            sym = 1
            lst.append(kkma_sentence[i][0])
        elif sym == 1:
                lst.append(kkma_sentence[i][0])
        if kkma_sentence[i][1] == 'ECE' \
        or (kkma_sentence[i][1] == 'JKM' and (kkma_sentence[i][0] == '과' or kkma_sentence[i][0] == '와'))\
        or kkma_sentence[i][1] == 'JC':
            if sym == 1:
                sentences.append(' '.join(lst))
                lst = []
            
            else:
                sentences.append(' '.join(no_st))
            no_st = []
            sym = 0
    if sym == 1:
        print('증상잇을떄')
        sentences.append(' '.join(lst))
    # else:
    #     print('증상없을떄')
    #     if len(no_st) != 1 or len(no_st[0]) != 1:
    #         sentences.append(' '.join(no_st))
        
    print(sentences)
    for sentence in sentences:
        
        if sentence == '':
            continue
        
        print(sentence)
        max_val, question, answer = questions(sentence)
        print(max_val, question, answer)
        if answer not in answers:
            answers.append(answer)
    lst = []
    diseasetable = DiseaseTable.objects.all()
    disease = read_frame(diseasetable)
    if len(answers) == 0:
        symptomdata = SymptomData.objects.get(symptom='분류불가')
        lst.append(symptomdata)
        
    else:
        for i in answers:
            symptomdata = SymptomData.objects.get(symptom=i)
            a = disease[disease['symptomdata'].str.contains(i)]['ICD']
            b = disease[disease['symptomdata'].str.contains(i)]['diseasename']
            icd = []
            dis = []
            for r in range(len(a)):
                if a.iloc[r] not in icd:
                    icd.append(a.iloc[r])
            symptomdata.ICD = json.dumps(icd, ensure_ascii=False)     
            lst.append(symptomdata)
    serializer = SymptomSerializer(lst, many=True)    
    return Response(serializer.data)




@api_view(['GET'])
def select(request):
    sym = request.GET['symptom']
    icd = request.GET['icd']
    diseasetable = DiseaseTable.objects.all()
    disease = read_frame(diseasetable)
    data = disease[(disease['ICD']==icd) & (disease['symptomdata'].str.contains(sym))]
    print(data)
    symptomdata = SymptomData.objects.get(symptom=sym)
    lst = []
    disease_name = []
    disease_explane = []
    disease_sym = []
    disease_prevent = []
    disease_danger = []
    for i in range(len(data)):
        disease_name.append(data.iloc[i]['diseasename'])
        disease_explane.append(data.iloc[i]['explane'])
        disease_sym.append(data.iloc[i]['symptomdata'])
        disease_prevent.append(data.iloc[i]['prevent'])
        disease_danger.append(data.iloc[i]['danger'])
    symptomdata.disease = json.dumps(disease_name, ensure_ascii=False)
    symptomdata.symptomexplane = json.dumps(disease_explane, ensure_ascii = False)
    symptomdata.symptomdata = json.dumps(disease_sym, ensure_ascii = False)
    symptomdata.symptomprevent = json.dumps(disease_prevent, ensure_ascii = False)
    symptomdata.symptomdanger = json.dumps(disease_danger, ensure_ascii = False)
    lst.append(symptomdata)
    serializer = SymptomSerializer(lst, many=True)    


    return Response(serializer.data)

