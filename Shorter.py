import base64

class Shorter:
    def __init__(self):
        pass

    def encode(self, text):
        self.encoded = base64.b64encode(text.encode("utf-8"))
        return self.encoded.decode()
    def decode(self,text):
        self.decoded = base64.b64decode(text)
        return self.decoded.decode("utf-8")
