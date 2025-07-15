@echo off
echo Setting up Blog Summarizer Enhanced...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if we're in the correct directory
if not exist package.json (
    echo Error: package.json not found. Please run this from the project root.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

REM Create .env.local from .env.example if it doesn't exist
if not exist .env.local (
    if exist .env.example (
        echo Creating .env.local from .env.example...
        copy .env.example .env.local
        echo Please edit .env.local with your actual database credentials.
    ) else (
        echo Warning: .env.example not found.
    )
) else (
    echo .env.local already exists.
)

echo.
echo Setup complete! Next steps:
echo 1. Edit .env.local with your database credentials
echo 2. Set up your Supabase database using supabase-schema.sql
echo 3. Run 'npm run dev' to start the development server
echo.
pause
