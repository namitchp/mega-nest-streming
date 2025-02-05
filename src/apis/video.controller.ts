import { Controller } from "@nestjs/common";
import { StremingService } from "src/core/services/video.service";

export VideoController {

    @Controller('/video')
    class VideoController {
        constructor(private stremingService: StremingService)

        videoUpload() {
            this.videoService.upload()
        }
    }