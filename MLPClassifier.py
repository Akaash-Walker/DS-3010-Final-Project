# Imports
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