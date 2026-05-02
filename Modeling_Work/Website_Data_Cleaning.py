# Imports
import re
from newspaper import Article
from sentence_transformers import SentenceTransformer

# Load embedding model (this should sit in memory rather than be loaded each time a user sends in a request)
model = SentenceTransformer("microsoft/harrier-oss-v1-270m", model_kwargs = {"dtype": "auto"})

# This would be some URL given by the user
url = "https://www.cnn.com/2026/04/28/politics/justice-department-indicts-ex-fbi-director-james-comey-again"

# Now we scrape the data from the website
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
embed_title_text = model.encode(title_text,
                                prompt = f"Instruct: Represent this news article for classification based on its reliability and factual accuracy.\nQuery: ",
                                show_progress_bar = False, convert_to_numpy = True, batch_size = 1)
