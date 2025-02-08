import { Controller, Get, Req, Res } from "@nestjs/common";
import { ImageService } from "../core/services/image.services";
import { VideoStremingService } from "../core/services/video.service";
import { Request, Response } from "express";
@Controller("/image")
export class ImageController {
  constructor(
    private imageService: ImageService,
    private readonly videoStremingService: VideoStremingService,
  ) {}
  @Get("")
  imageCompress(@Req() req: Request, @Res() res: Response): any {
    console.log(req.query);
    return this.imageService.imageCompress(req.query, res);

    // return { message: 'Image Compressed' };
  }
  @Get("/video")
  getHello(): string {
    return this.videoStremingService.getHello();
  }
}
