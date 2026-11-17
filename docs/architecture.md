# InspectAI - System Architecture

## Frontend
React + TypeScript

## Main Backend
Node.js + Express.js

## Database
PostgreSQL

## AI Service
Python + FastAPI

## AI Model
YOLO

## Image Processing
OpenCV

## Application Workflow

1. User uploads a product image.
2. Node.js validates the image.
3. Node.js sends an AI request.
4. FastAPI runs YOLO inference.
5. AI returns defect predictions.
6. Node.js stores inspection results.
7. React displays inspection results.