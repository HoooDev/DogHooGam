from django.shortcuts import render
from django_pandas.io import read_frame
from ..models import SymptomTable, DiseaseTable
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from ..apps import ChatbotsConfig
from hanspell import spell_checker


def string_to_list(obj):
    obj = obj.split(', ')
    obj[0] = obj[0][1:]
    obj[-1] = obj[-1][:len(obj[-1])-1]
    obj = list(map(float, obj))
    return obj

def questions(sentence):
    
    sentences = [sentence]    
    embeddings = ChatbotsConfig.model.encode(sentences)
    symptomtable = SymptomTable.objects.all()
    data = read_frame(symptomtable)
    data['emb'] = pd.Series([[]] * len(data))
    for i in range(len(data)):
        data['emb'][i] = string_to_list(data['embedding'][i])
    data['distance'] = data['emb'].map(lambda x: cosine_similarity([embeddings[0]], [x]).squeeze())
    if data['distance'].max() < 0.8:
        return (data['distance'].max(), '좀더 정확히 입력해 주세요!', '분류불가')
    else:
        return (data['distance'].max(), data.loc[data['distance'].idxmax()]['indata'], data.loc[data['distance'].idxmax()]['symptom'])