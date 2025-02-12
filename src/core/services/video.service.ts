import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { exec } from "child_process";
import { CommonFunction } from "src/helpers/common";
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
    // ffmpeg streaming
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/stream%03d" -start_number 0 ${hlsPath}`;
    // const ffmpegCommand = `ffmpeg -i ${videoPath} -c:v libx264 -preset veryfast -b:v 1000k -c:a aac -b:a 128k -hls_time 8 -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath} `;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error: ${error}`);
      }
      const videoUrl = `http://148.72.168.56:8001/uploads/video/stream/${lessonId}/index.m3u8`;
      res.status(HttpStatus.OK).json(videoUrl);
    });
  }
}
