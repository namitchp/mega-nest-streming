import { Controller, Get } from '@nestjs/common';
// import { StremingService } from 'src/core/services/video.service';
@Controller('video')
export class VideoController {
    //  constructor(private readonly stremingService: StremingService) { }
    @Get()
    async getVideo() {
        return 'rfghj';
    }
}
