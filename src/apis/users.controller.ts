import { Controller, Get, Query, Req } from "@nestjs/common";
import { Request } from "express";
@Controller("/users")
export class UserController {
  @Get()
  getUsersAllData() {
    return "This is the list of all users";
  }
  @Get("/profile")
  getUsersProfile(@Req() req: Request, @Query() query: any) {
    console.log("req:", req.query);
    console.log("req:", query);
    return "This is the profile of user";
  }
}
