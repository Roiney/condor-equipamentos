# Usa imagem leve do Python
FROM python:3.10-slim

# Cria diretório de trabalho
WORKDIR /app

# Copia arquivos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia a aplicação
COPY . .

# Define porta padrão
ENV FLASK_RUN_PORT=3035
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Expõe a porta
EXPOSE 3035

# Comando de start
CMD ["python", "run.py"]
