FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . /app/

# Expose the port (if using Gunicorn)
EXPOSE 8000

COPY entrypoint.sh /app/
ENTRYPOINT ["/app/entrypoint.sh"]

# Run the application with Gunicorn (adjust 'erfapay.wsgi' if the project name differs)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "config.wsgi:application"]