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

# @api_view(['GET'])
# def datasave(request):
#     symptomtable = SymptomTable.objects.all()
#     data = read_frame(symptomtable)
#     # model = SentenceTransformer('jhgan/ko-sroberta-multitask')
#     data['embedding'] = pd.Series([[]] * len(data))
#     data['embedding'] = data['indata'].map(lambda x: list(ChatbotsConfig.model.encode(x)))
#     idx = 0
#     for symptom in symptomtable:
#         symptom.embedding = data['embedding'][idx]
#         idx += 1
#         symptom.save()    
#     return
    
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
    lst = []

    flag = 0

    kkma_sentence = kkma.pos(checked_sent)
    no_st = []
    for i in range(len(kkma_sentence)):
        no_st.append(kkma_sentence[i][0])
        if flag == 1 and name == 1:
            st.append(kkma_sentence[i][0])
        elif flag == 1 and name == 0:
            st.append(kkma_sentence[i-2][0])
            st.append(kkma_sentence[i-1][0])
            st.append(kkma_sentence[i][0])
            name = 1
        if kkma_sentence[i][1] == 'JKS':
            flag = 1
            if notnamedata['name'].str.contains(kkma_sentence[i-1][0]).sum() >= 1:
                name = 0
            else:
                name = 1        
        if kkma_sentence[i][1] == 'ECE' or kkma_sentence[i][1] == 'JKM':
            if flag == 0:
                sentences.append(' '.join(no_st))
                no_st = []
            else:                
                sentences.append(' '.join(st))
                st = []
                flag = 0
    if flag == 0:
        sentences.append(' '.join(no_st))
    else:
        
        sentences.append(' '.join(st))
    print(sentences)
    answers = []
    intents = []
    for sentence in sentences:
        spelled_sent = spell_checker.check(sentence)
        checked_sent = spelled_sent.checked
        if sentence == '':
            continue
        print(checked_sent)
        max_val, question, answer = questions(checked_sent)
        print(max_val, question, answer)
        answers.append(answer)
    lst = []
    dic = dict()
    diseasetable = DiseaseTable.objects.all()
    disease = read_frame(diseasetable)
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
    symptomdata = SymptomData.objects.get(symptom=sym)
    lst = []
    disease_name = []
    disease_explane = []
    for i in range(len(data)):
        disease_name.append(data.iloc[i]['diseasename'])
        disease_explane.append(data.iloc[i]['explane'])
    symptomdata.disease = json.dumps(disease_name, ensure_ascii=False)
    symptomdata.symptomexplane = json.dumps(disease_explane, ensure_ascii = False)
    
    lst.append(symptomdata)
    serializer = SymptomSerializer(lst, many=True)    


    return Response(serializer.data)