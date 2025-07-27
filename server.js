const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 3020;
const VIDEOS_DIR = path.join(__dirname, 'videos');
const THUMBNAILS_DIR = path.join(__dirname, 'public', 'thumbnails');

// Ensure thumbnails directory exists
if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}

// Serve static files
app.use(express.static('public'));
app.use('/videos', express.static(VIDEOS_DIR));

// Function to get video duration using ffprobe
function getVideoDuration(videoPath) {
    try {
        const output = execSync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${videoPath}"`,
            { encoding: 'utf8' });
        return parseFloat(output.trim());
    } catch (error) {
        console.error(`Error getting duration for ${videoPath}:`, error.message);
        return 0;
    }
}

// Function to generate thumbnail
function generateThumbnail(videoPath, outputPath, timestamp) {
    try {
        execSync(`ffmpeg -i "${videoPath}" -ss ${timestamp} -vframes 1 -y "${outputPath}"`,
            { stdio: 'pipe' });
        return true;
    } catch (error) {
        console.error(`Error generating thumbnail for ${videoPath}:`, error.message);
        return false;
    }
}

// API endpoint to get videos list
app.get('/api/videos', (req, res) => {
    try {
        if (!fs.existsSync(VIDEOS_DIR)) {
            return res.json([]);
        }

        const files = fs.readdirSync(VIDEOS_DIR)
            .filter(file => file.toLowerCase().endsWith('.mp4'))
            .map(file => {
                const videoPath = path.join(VIDEOS_DIR, file);
                const thumbnailName = `${path.parse(file).name}.jpg`;
                const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);

                // Generate thumbnail if it doesn't exist
                if (!fs.existsSync(thumbnailPath)) {
                    console.log(`Generating thumbnail for ${file}...`);
                    const duration = getVideoDuration(videoPath);
                    if (duration > 0) {
                        const timestamp = duration * 0.2; // 20% of video length
                        generateThumbnail(videoPath, thumbnailPath, timestamp);
                    }
                }

                return {
                    name: path.parse(file).name,
                    filename: file,
                    thumbnail: fs.existsSync(thumbnailPath) ? `/thumbnails/${thumbnailName}` : null
                };
            });

        res.json(files);
    } catch (error) {
        console.error('Error reading videos directory:', error);
        res.status(500).json({ error: 'Failed to read videos directory' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Video server running at http://0.0.0.0:${PORT}`);
    console.log(`Videos directory: ${VIDEOS_DIR}`);
    console.log(`Thumbnails directory: ${THUMBNAILS_DIR}`);
});