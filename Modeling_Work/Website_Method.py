# Imports
from pathlib import Path
import numpy as np
import joblib, re
from newspaper import Article
from sentence_transformers import SentenceTransformer
# skorch
# mlp classifier issue, not in __main___

# Load models (these should sit in memory rather than be loaded each time a user sends in a request)
embedding_model = SentenceTransformer("microsoft/harrier-oss-v1-270m", model_kwargs = {"dtype": "auto"})
BASE_DIR = Path(__file__).resolve().parent
prediction_model = joblib.load(BASE_DIR / "Multilayer_Perceptron.joblib")

def make_prediction(url):
    # We scrape the data from the website
    article = Article(url)
    article.download()
    article.parse()
    title = article.title
    text = article.text

    # Remove newlines as the training data did not include newlines
    title = re.sub(r"\n+", " ", title)
    text = re.sub(r"\n+", " ", text)

    # Strip whitespace
    title = title.strip()
    text = text.strip()

    # Replace URLs with [URL]
    url_pattern = r"https?://\S+|www\.\S+"
    title = re.sub(url_pattern, "[URL]", title)
    text = re.sub(url_pattern, "[URL]", text)

    # Combine title and text
    title_text = title + "\n" + text

    # Embed title and text
    embed_title_text = embedding_model.encode(title_text,
                                              prompt = f"Instruct: Represent this news article for classification based on its reliability and factual accuracy.\nQuery: ",
                                              show_progress_bar = False,
                                              convert_to_numpy = True,
                                              batch_size = 1)

    # Return prediction
    return prediction_model.predict_proba(embed_title_text[np.newaxis, :])[0, 1]
