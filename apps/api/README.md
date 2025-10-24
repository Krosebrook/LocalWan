# Wan 2.1 API

FastAPI backend for AI video generation with GPU support.

## Features

- **Video Generation**: Text-to-video and image-to-video generation via Replicate
- **Authentication**: JWT-based authentication with Supabase
- **Rate Limiting**: Protect endpoints from abuse
- **Credit System**: Manage user credits for generations
- **Input Validation**: Pydantic models for request validation

## Getting Started

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Set Environment Variables

Copy `.env.example` to `.env` and fill in your credentials.

### Run the Server

```bash
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get access token
- `POST /api/auth/register` - Register new user
- `POST /api/auth/logout` - Logout user

### Generation
- `POST /api/generation/` - Create new video generation
- `GET /api/generation/{id}` - Get generation status
- `GET /api/generation/` - List user generations

### Credits
- `GET /api/credits/balance` - Get credit balance
- `POST /api/credits/purchase` - Purchase credits

## GPU Support

The API is designed to run on GPU-enabled infrastructure for optimal performance:

- Set `CUDA_VISIBLE_DEVICES` environment variable
- Configure `MODEL_CACHE_DIR` for model storage

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP (configurable)
- Redis optional for distributed rate limiting

## Development

### Run Tests

```bash
pytest
```

### Linting

```bash
black src/
ruff check src/
```

## Deployment

### Docker

```bash
docker build -t wan-api .
docker run -p 8000:8000 --env-file .env wan-api
```

### Cloud Deployment

Deploy to any cloud platform with GPU support:
- AWS EC2 with GPU instances
- Google Cloud Platform with GPUs
- Azure with GPU VMs
- RunPod, Vast.ai, or similar GPU cloud providers
