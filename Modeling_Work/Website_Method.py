# Imports
from pathlib import Path
import numpy as np
import joblib, re
from newspaper import Article
from sentence_transformers import SentenceTransformer
from torch.nn import Module, Linear, GELU, Dropout, Sequential

# Create our MLP architecture (so that the joblib import works correctly)
class MLPClassifier(Module):
    def __init__(self, input_dim, hidden_dim, dropout_rate, num_hidden_layers):
        super().__init__()

        # Where we store our layers
        layers = []

        # First set of layers
        layers.append(Linear(input_dim, hidden_dim))
        layers.append(GELU())
        layers.append(Dropout(dropout_rate))

        # Extra layers
        for i in range(num_hidden_layers - 1):
            next_dim = max(hidden_dim // 2, 2)
            layers.append(Linear(hidden_dim, next_dim))
            layers.append(GELU())
            layers.append(Dropout(dropout_rate))
            hidden_dim = next_dim

        # Final layer
        layers.append(Linear(hidden_dim, 1))

        # Add to our network
        self.network = Sequential(*layers)

    def forward(self, x):
        return self.network(x)

# Load models (these should sit in memory rather than be loaded each time a user sends in a request)
embedding_model = SentenceTransformer("microsoft/harrier-oss-v1-270m", model_kwargs = {"dtype": "auto"})
BASE_DIR = Path(__file__).resolve().parent
prediction_model = joblib.load(BASE_DIR / "Logistic_Regression.joblib")

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
