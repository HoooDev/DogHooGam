from django.apps import AppConfig
from sentence_transformers import SentenceTransformer


class ChatbotsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chatbots'
    model = SentenceTransformer('jhgan/ko-sroberta-multitask')
