import { HttpStatus, Injectable } from "@nestjs/common";
import { exec } from 'child_process';
import { CommonFunction } from 'src/helpers/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { json } from 'express';

@Injectable()
export class VideoStremingService extends CommonFunction {
  async uploadVideo(file: any, res: any): Promise<void> {
    const lessonId: string = uuidv4();
    const videoPath = file.path;
    const outputPath = `./uploads/video/stream/${lessonId}`;
    const hlsPath = `${outputPath}/index.m3u8`;
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }
    // const ffmpegCommand = ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/stream%04d" -start_number 0 ${hlsPath}
    // ffmpeg streaming for multiple qualities
    const ffmpegCommand = `ffmpeg -i ${videoPath} \
      -vf "scale=w=426:h=240" -c:v libx264 -b:v 250k -c:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/240p_%03d.ch" -start_number 1 ${outputPath}/240p.m3u8 \
      -vf "scale=w=640:h=360" -c:v libx264 -b:v 400k -c:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/360p_%03d.ch" -start_number 1 ${outputPath}/360p.m3u8 \
      -vf "scale=w=854:h=480" -c:v libx264 -b:v 500k -c:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/480p_%03d.ch" -start_number 1 ${outputPath}/480p.m3u8 \
      -vf "scale=w=1280:h=720" -c:v libx264 -b:v 700k -c:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/720p_%03d.ch" -start_number 1 ${outputPath}/720p.m3u8 \
      -vf "scale=w=1920:h=1080" -c:v libx264 -b:v 800k -c:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/1080p_%03d.ch" -start_number 1 ${outputPath}/1080p.m3u8`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error: ${error}`);
      }
      const videoUrl = `http://148.72.168.56:8001/uploads/video/stream/${lessonId}/index.m3u8`;
      res.status(HttpStatus.OK).json(videoUrl);
    });
  }
}
