import { Injectable } from "@nestjs/common";
import { ChildProcess } from "child_process";
import { CommonFunction } from "src/helpers/common";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VideoStremingService extends CommonFunction {
  async uploadVideo(file): Promise<void> {
    const lessonId: string = uuidv4();
    console.log(lessonId);
    console.log(file);

  }
}
