# Video Player Application

A modern video streaming application built with Express.js and Plyr video player, featuring automatic thumbnail generation and a clean, responsive interface.

## Features

- 🎥 **Plyr Video Player**: Modern, accessible video player with full controls
- 🖼️ **Auto Thumbnails**: Automatic thumbnail generation at 20% of video length using FFmpeg
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Dark Theme**: Clean, modern dark interface
- ⌨️ **Keyboard Controls**: Arrow keys for navigation, standard video controls
- 🔄 **Auto-play**: Automatically plays next video when current one ends
- 🐳 **Docker Ready**: Easy deployment with Docker and Docker Compose

## Project Structure

```
video-player-app/
├── server.js              # Express.js server
├── package.json           # Node.js dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── public/
│   ├── index.html         # Main web interface
│   └── thumbnails/        # Generated thumbnails (auto-created)
└── videos/                # Your MP4 video files
```

## Quick Start

### Method 1: Docker (Recommended)

1. **Clone/create the project structure** and add your files
2. **Create a videos folder** and add your MP4 files:
   ```bash
   mkdir videos
   # Copy your .mp4 files to the videos/ folder
   ```
3. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
4. **Access the app** at http://localhost:3020

### Method 2: Local Development

1. **Install Node.js** (version 18 or higher)
2. **Install FFmpeg** on your system:
    - **Windows**: Download from https://ffmpeg.org/
    - **macOS**: `brew install ffmpeg`
    - **Linux**: `sudo apt install ffmpeg` (Ubuntu/Debian)
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create videos folder** and add your MP4 files:
   ```bash
   mkdir videos
   # Copy your .mp4 files to the videos/ folder
   ```
5. **Start the server**:
   ```bash
   npm start
   ```
6. **Access the app** at http://localhost:3020

## Usage

- **Video Selection**: Click any video in the right sidebar to play it
- **Navigation**: Use ↑/↓ arrow keys to switch between videos
- **Video Controls**: Full Plyr controls (play/pause, volume, fullscreen, etc.)
- **Auto-play**: Videos automatically continue to the next one
- **Thumbnails**: Generated automatically on first access (may take a moment)

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3020)
- `NODE_ENV`: Environment mode (development/production)

### Video Requirements

- **Format**: MP4 files only
- **Location**: Place all videos in the `/videos/` folder
- **Naming**: Filenames will be used as display names (without extension)

## Docker Details

### Volumes

- `./videos:/app/videos:ro` - Mounts your local videos folder (read-only)
- `thumbnails:/app/public/thumbnails` - Persistent storage for generated thumbnails

### Networking

- Port 3020 is exposed and mapped to your host system
- Access via http://localhost:3020

## Troubleshooting

### Thumbnails Not Generating

- Ensure FFmpeg is installed in the container (included in Dockerfile)
- Check video file permissions and format
- View server logs: `docker-compose logs video-player`

### Videos Not Loading

- Verify MP4 files are in the `/videos/` folder
- Check file permissions (should be readable)
- Ensure proper volume mounting in docker-compose.yml

### Port Already in Use

- Change the port mapping in docker-compose.yml:
  ```yaml
  ports:
    - "3021:3020"  # Use port 3021 instead
  ```

## Development

For development with auto-restart:

```bash
npm install -g nodemon
npm run dev
```

## License

MIT License - feel free to use and modify as needed.